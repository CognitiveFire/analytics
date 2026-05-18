import { ConnectorSnapshot, DataSource } from "@/types";

export interface Connector {
  source: DataSource;
  fetchMetrics(clientId: string): Promise<Record<string, number>>;
  compareTrends(clientId: string): Promise<number>;
  detectAnomalies(clientId: string): Promise<string[]>;
  getAccountMetadata(clientId: string): Promise<string>;
  getHistoricalAnalysis(clientId: string): Promise<string>;
  createSnapshot(clientId: string): Promise<ConnectorSnapshot>;
}

export abstract class BaseConnector implements Connector {
  abstract source: DataSource;

  abstract fetchMetrics(clientId: string): Promise<Record<string, number>>;
  abstract compareTrends(clientId: string): Promise<number>;
  abstract detectAnomalies(clientId: string): Promise<string[]>;
  abstract getAccountMetadata(clientId: string): Promise<string>;
  abstract getHistoricalAnalysis(clientId: string): Promise<string>;

  async createSnapshot(clientId: string): Promise<ConnectorSnapshot> {
    const [metrics, trendDelta, anomalies, account, historySummary] = await Promise.all([
      this.fetchMetrics(clientId),
      this.compareTrends(clientId),
      this.detectAnomalies(clientId),
      this.getAccountMetadata(clientId),
      this.getHistoricalAnalysis(clientId),
    ]);

    return {
      source: this.source,
      account,
      metrics,
      trendDelta,
      anomalies,
      historySummary,
    };
  }
}
