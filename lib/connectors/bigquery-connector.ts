import "server-only";

import { BaseConnector } from "@/lib/connectors/base";
import { BigQuerySnapshotService } from "@/lib/connectors/bigquery-service";
import { ConnectorSnapshot, DataSource } from "@/types";

export class BigQueryConnector extends BaseConnector {
  source: DataSource;
  private readonly service: BigQuerySnapshotService;
  private readonly snapshotCache = new Map<string, Promise<ConnectorSnapshot>>();

  constructor(source: DataSource, service: BigQuerySnapshotService) {
    super();
    this.source = source;
    this.service = service;
  }

  private getSnapshot(clientId: string): Promise<ConnectorSnapshot> {
    if (!this.snapshotCache.has(clientId)) {
      this.snapshotCache.set(clientId, this.service.getSnapshot(clientId, this.source));
    }

    return this.snapshotCache.get(clientId)!;
  }

  async fetchMetrics(clientId: string) {
    const snapshot = await this.getSnapshot(clientId);
    return snapshot.metrics;
  }

  async compareTrends(clientId: string) {
    const snapshot = await this.getSnapshot(clientId);
    return snapshot.trendDelta;
  }

  async detectAnomalies(clientId: string) {
    const snapshot = await this.getSnapshot(clientId);
    return snapshot.anomalies;
  }

  async getAccountMetadata(clientId: string) {
    const snapshot = await this.getSnapshot(clientId);
    return snapshot.account;
  }

  async getHistoricalAnalysis(clientId: string) {
    const snapshot = await this.getSnapshot(clientId);
    return snapshot.historySummary;
  }
}
