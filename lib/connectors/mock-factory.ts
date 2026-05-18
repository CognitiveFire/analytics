import { BaseConnector } from "@/lib/connectors/base";
import { DataSource } from "@/types";

export class MockConnector extends BaseConnector {
  source: DataSource;

  constructor(source: DataSource) {
    super();
    this.source = source;
  }

  async fetchMetrics(clientId: string) {
    return {
      spend: clientId.length * 102,
      roas: Number((4 + clientId.length / 10).toFixed(2)),
      conversions: clientId.length * 40,
      quality: 72 + (clientId.length % 14),
    };
  }

  async compareTrends() {
    return Number((Math.random() * 12 - 4).toFixed(1));
  }

  async detectAnomalies(clientId: string) {
    return [`${this.source} anomaly watch on ${clientId}`];
  }

  async getAccountMetadata(clientId: string) {
    return `${this.source.toUpperCase()} / ${clientId}`;
  }

  async getHistoricalAnalysis() {
    return "Stable with selective volatility in mobile acquisition and non-brand auctions.";
  }
}
