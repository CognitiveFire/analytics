import { ConnectorMode } from "@/types";

interface RuntimeEnv {
  connectorMode: ConnectorMode;
  dataApiBaseUrl: string | null;
  dataApiKey: string | null;
  requestTimeoutMs: number;
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

export function getRuntimeEnv(): RuntimeEnv {
  return {
    connectorMode: parseConnectorMode(process.env.SIGNALROOM_CONNECTOR_MODE),
    dataApiBaseUrl: process.env.SIGNALROOM_DATA_API_BASE_URL ?? null,
    dataApiKey: process.env.SIGNALROOM_DATA_API_KEY ?? null,
    requestTimeoutMs: parseTimeout(process.env.SIGNALROOM_CONNECTOR_TIMEOUT_MS),
  };
}
