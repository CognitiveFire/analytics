import { ConnectorMode } from "@/types";

interface RuntimeEnv {
  connectorMode: ConnectorMode;
  dataApiBaseUrl: string | null;
  dataApiKey: string | null;
  requestTimeoutMs: number;
  bigQueryProjectId: string | null;
  bigQueryLocation: string;
  bigQuerySnapshotsTable: string | null;
  bigQuerySnapshotQuery: string | null;
  bigQueryClientEmail: string | null;
  bigQueryPrivateKey: string | null;
}

function parseConnectorMode(value: string | undefined): ConnectorMode {
  return value === "live" ? "live" : "mock";
}

function parseTimeout(value: string | undefined): number {
  const parsed = Number(value ?? "8000");
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return 8000;
  }

  return Math.floor(parsed);
}

function parseLocation(value: string | undefined): string {
  if (!value?.trim()) {
    return "EU";
  }

  return value.trim();
}

function parsePrivateKey(value: string | undefined): string | null {
  if (!value) {
    return null;
  }

  return value.replace(/\\n/g, "\n").trim();
}

export function canUseBigQuery(env: RuntimeEnv): boolean {
  return Boolean(env.bigQuerySnapshotQuery || env.bigQuerySnapshotsTable);
}

export function getRuntimeEnv(): RuntimeEnv {
  return {
    connectorMode: parseConnectorMode(process.env.SIGNALROOM_CONNECTOR_MODE),
    dataApiBaseUrl: process.env.SIGNALROOM_DATA_API_BASE_URL ?? null,
    dataApiKey: process.env.SIGNALROOM_DATA_API_KEY ?? null,
    requestTimeoutMs: parseTimeout(process.env.SIGNALROOM_CONNECTOR_TIMEOUT_MS),
    bigQueryProjectId: process.env.SIGNALROOM_BIGQUERY_PROJECT_ID ?? null,
    bigQueryLocation: parseLocation(process.env.SIGNALROOM_BIGQUERY_LOCATION),
    bigQuerySnapshotsTable: process.env.SIGNALROOM_BQ_SNAPSHOTS_TABLE ?? null,
    bigQuerySnapshotQuery: process.env.SIGNALROOM_BQ_SNAPSHOT_QUERY ?? null,
    bigQueryClientEmail: process.env.SIGNALROOM_BIGQUERY_CLIENT_EMAIL ?? null,
    bigQueryPrivateKey: parsePrivateKey(process.env.SIGNALROOM_BIGQUERY_PRIVATE_KEY),
  };
}
