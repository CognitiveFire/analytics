import { getRuntimeEnv } from "@/lib/config/env";
import { CONNECTOR_SOURCES } from "@/lib/connectors/constants";
import { LiveDataApiConnector } from "@/lib/connectors/live-data-api";
import { MockConnector } from "@/lib/connectors/mock-factory";

function createConnectors() {
  const env = getRuntimeEnv();
  const baseUrl = env.dataApiBaseUrl;

  if (env.connectorMode === "live" && baseUrl) {
    return CONNECTOR_SOURCES.map(
      (source) =>
        new LiveDataApiConnector(source, {
          baseUrl,
          apiKey: env.dataApiKey,
          timeoutMs: env.requestTimeoutMs,
        })
    );
  }

  return CONNECTOR_SOURCES.map((source) => new MockConnector(source));
}

export const connectors = createConnectors();

export async function loadConnectorSnapshots(clientId: string) {
  const snapshots = await Promise.allSettled(
    connectors.map((connector) => connector.createSnapshot(clientId))
  );

  return snapshots
    .map((item, index) => {
      if (item.status === "fulfilled") {
        return item.value;
      }

      const source = CONNECTOR_SOURCES[index];
      return {
        source,
        account: `${source.toUpperCase()} / ${clientId}`,
        metrics: {},
        trendDelta: 0,
        anomalies: [`Live connector unavailable: ${item.reason instanceof Error ? item.reason.message : "unknown error"}`],
        historySummary: "Signal Room returned a safe fallback because this connector could not be reached.",
      };
    })
    .filter(Boolean);
}
