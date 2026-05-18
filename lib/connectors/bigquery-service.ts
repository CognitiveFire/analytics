import "server-only";

import { QueryParameter } from "@google-cloud/bigquery";

import { getBigQueryClient } from "@/lib/bigquery/client";
import { getRuntimeEnv } from "@/lib/config/env";
import { ConnectorSnapshot, DataSource } from "@/types";

interface SnapshotRow {
  account: string | null;
  trend_delta: number | string | null;
  history_summary: string | null;
  anomalies_json: string | null;
  metrics_json: string | null;
}

function toNumber(value: number | string | null | undefined): number {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : 0;
  }

  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  return 0;
}

function parseJsonArray(value: string | null): string[] {
  if (!value) {
    return [];
  }

  try {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter((item): item is string => typeof item === "string");
  } catch {
    return [];
  }
}

function parseJsonRecord(value: string | null): Record<string, number> {
  if (!value) {
    return {};
  }

  try {
    const parsed = JSON.parse(value) as Record<string, unknown>;
    return Object.entries(parsed).reduce<Record<string, number>>((acc, [key, raw]) => {
      if (typeof raw === "number" && Number.isFinite(raw)) {
        acc[key] = raw;
      }

      if (typeof raw === "string") {
        const numeric = Number(raw);
        if (Number.isFinite(numeric)) {
          acc[key] = numeric;
        }
      }

      return acc;
    }, {});
  } catch {
    return {};
  }
}

function getDefaultSnapshotQuery(table: string): string {
  return `
    SELECT
      COALESCE(account, CONCAT(UPPER(source), ' / ', @clientId)) AS account,
      COALESCE(trend_delta, 0) AS trend_delta,
      COALESCE(history_summary, 'No historical summary available.') AS history_summary,
      TO_JSON_STRING(COALESCE(anomalies, [])) AS anomalies_json,
      TO_JSON_STRING(COALESCE(metrics, STRUCT())) AS metrics_json
    FROM \
\`${table}\`
    WHERE client_id = @clientId
      AND source = @source
    ORDER BY snapshot_at DESC
    LIMIT 1
  `;
}

function buildQueryAndParams(clientId: string, source: DataSource) {
  const env = getRuntimeEnv();

  const query = env.bigQuerySnapshotQuery?.trim()
    ? env.bigQuerySnapshotQuery
    : env.bigQuerySnapshotsTable
      ? getDefaultSnapshotQuery(env.bigQuerySnapshotsTable)
      : null;

  if (!query) {
    throw new Error(
      "BigQuery is enabled but no query is configured. Set SIGNALROOM_BQ_SNAPSHOT_QUERY or SIGNALROOM_BQ_SNAPSHOTS_TABLE."
    );
  }

  const params: QueryParameter[] = [
    { name: "clientId", parameterType: { type: "STRING" }, parameterValue: { value: clientId } },
    { name: "source", parameterType: { type: "STRING" }, parameterValue: { value: source } },
  ];

  return { query, params, location: env.bigQueryLocation };
}

export class BigQuerySnapshotService {
  async getSnapshot(clientId: string, source: DataSource): Promise<ConnectorSnapshot> {
    const client = getBigQueryClient();
    const queryConfig = buildQueryAndParams(clientId, source);

    const [rows] = await client.query(queryConfig);
    const typedRows = rows as SnapshotRow[];
    const firstRow = typedRows[0] ?? null;

    if (!firstRow) {
      return {
        source,
        account: `${source.toUpperCase()} / ${clientId}`,
        metrics: {},
        trendDelta: 0,
        anomalies: ["No snapshot row returned from BigQuery for this source/client."],
        historySummary: "No historical summary was available in BigQuery.",
      };
    }

    return {
      source,
      account: firstRow.account ?? `${source.toUpperCase()} / ${clientId}`,
      metrics: parseJsonRecord(firstRow.metrics_json),
      trendDelta: toNumber(firstRow.trend_delta),
      anomalies: parseJsonArray(firstRow.anomalies_json),
      historySummary: firstRow.history_summary ?? "No historical summary available.",
    };
  }
}
