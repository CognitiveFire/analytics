import { BaseConnector } from "@/lib/connectors/base";
import { ConnectorSnapshot, ConnectorSnapshotResponse, DataSource } from "@/types";

interface LiveConnectorConfig {
  baseUrl: string;
  apiKey?: string | null;
  timeoutMs: number;
}

export class LiveDataApiConnector extends BaseConnector {
  source: DataSource;
  private readonly baseUrl: string;
  private readonly apiKey?: string | null;
  private readonly timeoutMs: number;

  constructor(source: DataSource, config: LiveConnectorConfig) {
    super();
    this.source = source;
    this.baseUrl = config.baseUrl;
    this.apiKey = config.apiKey;
    this.timeoutMs = config.timeoutMs;
  }

  private async fetchSnapshot(clientId: string): Promise<ConnectorSnapshot> {
    const url = new URL(`/v1/connectors/${this.source}/snapshot`, this.baseUrl);
    url.searchParams.set("clientId", clientId);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.timeoutMs);

    try {
      const response = await fetch(url.toString(), {
        headers: {
          "Content-Type": "application/json",
          ...(this.apiKey ? { Authorization: `Bearer ${this.apiKey}` } : {}),
        },
        signal: controller.signal,
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(`Connector API returned ${response.status} for ${this.source}`);
      }

      const body = (await response.json()) as ConnectorSnapshotResponse;
      return body.snapshot;
    } finally {
      clearTimeout(timeout);
    }
  }

  async fetchMetrics(clientId: string) {
    const snapshot = await this.fetchSnapshot(clientId);
    return snapshot.metrics;
  }

  async compareTrends(clientId: string) {
    const snapshot = await this.fetchSnapshot(clientId);
    return snapshot.trendDelta;
  }

  async detectAnomalies(clientId: string) {
    const snapshot = await this.fetchSnapshot(clientId);
    return snapshot.anomalies;
  }

  async getAccountMetadata(clientId: string) {
    const snapshot = await this.fetchSnapshot(clientId);
    return snapshot.account;
  }

  async getHistoricalAnalysis(clientId: string) {
    const snapshot = await this.fetchSnapshot(clientId);
    return snapshot.historySummary;
  }
}
