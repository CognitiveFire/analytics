import { BaseConnector } from "@/lib/connectors/base";
import { DataSource } from "@/types";

const DEMO_CLIENT_ID = "demo-executive";

const demoConnectorSnapshots: Record<
  DataSource,
  {
    metrics: Record<string, number>;
    trendDelta: number;
    anomalies: string[];
    account: string;
    historySummary: string;
  }
> = {
  googleAds: {
    metrics: { spend: 812000, roas: 5.4, conversions: 9820, quality: 88 },
    trendDelta: 7.2,
    anomalies: ["Brand campaign volatility normalized after budget rebalance"],
    account: "GOOGLE ADS / Executive account",
    historySummary: "Stable growth across branded and high-intent clusters with lower CPA variance.",
  },
  ga4: {
    metrics: { sessions: 442000, conversions: 13620, engagementRate: 68, quality: 86 },
    trendDelta: 5.8,
    anomalies: ["Attribution lag reduced after event taxonomy cleanup"],
    account: "GA4 / Executive account",
    historySummary: "Engagement and qualified conversion trends improved consistently over the last 6 months.",
  },
  searchConsole: {
    metrics: { clicks: 218000, impressions: 6120000, ctr: 3.6, quality: 84 },
    trendDelta: 6.1,
    anomalies: ["Indexation pressure resolved on core commercial templates"],
    account: "SEARCH CONSOLE / Executive account",
    historySummary: "Organic visibility expanded with stronger click-through on high-value query groups.",
  },
  bigQuery: {
    metrics: { modeledRevenue: 4630000, marginIndex: 112, quality: 90 },
    trendDelta: 8.4,
    anomalies: ["Warehouse refresh latency dropped below SLA threshold"],
    account: "BIGQUERY / Executive account",
    historySummary: "Modeled revenue and margin indicators are stable with improved daily data freshness.",
  },
  cm360: {
    metrics: { impressions: 14200000, clicks: 194000, floodlightConversions: 6280, quality: 82 },
    trendDelta: 4.9,
    anomalies: ["Creative fatigue detected and mitigated in top audience segment"],
    account: "CM360 / Executive account",
    historySummary: "Display delivery remained efficient with stronger post-click quality.",
  },
  dv360: {
    metrics: { spend: 364000, viewability: 74, cpm: 92, quality: 81 },
    trendDelta: 3.7,
    anomalies: ["Inventory quality improved after private deal reallocation"],
    account: "DV360 / Executive account",
    historySummary: "Programmatic quality and pacing remained controlled during seasonal demand peaks.",
  },
  floodlight: {
    metrics: { mappedEvents: 172, matchRate: 96, attributionCoverage: 93, quality: 89 },
    trendDelta: 2.9,
    anomalies: ["Event mapping variance reduced after naming standardization"],
    account: "FLOODLIGHT / Executive account",
    historySummary: "Tag integrity and event consistency support reliable cross-platform attribution.",
  },
  crm: {
    metrics: { qualifiedLeads: 4280, winRate: 27, pipelineValue: 12800000, quality: 87 },
    trendDelta: 6.8,
    anomalies: ["Lead-stage lag reduced after lifecycle automation updates"],
    account: "CRM / Executive account",
    historySummary: "Pipeline health improved with stronger qualification and faster stage progression.",
  },
};

export class MockConnector extends BaseConnector {
  source: DataSource;

  constructor(source: DataSource) {
    super();
    this.source = source;
  }

  async fetchMetrics(clientId: string) {
    if (clientId === DEMO_CLIENT_ID) {
      return demoConnectorSnapshots[this.source].metrics;
    }

    return {
      spend: clientId.length * 102,
      roas: Number((4 + clientId.length / 10).toFixed(2)),
      conversions: clientId.length * 40,
      quality: 72 + (clientId.length % 14),
    };
  }

  async compareTrends(clientId: string) {
    if (clientId === DEMO_CLIENT_ID) {
      return demoConnectorSnapshots[this.source].trendDelta;
    }

    return Number((Math.random() * 12 - 4).toFixed(1));
  }

  async detectAnomalies(clientId: string) {
    if (clientId === DEMO_CLIENT_ID) {
      return demoConnectorSnapshots[this.source].anomalies;
    }

    return [`${this.source} anomaly watch on ${clientId}`];
  }

  async getAccountMetadata(clientId: string) {
    if (clientId === DEMO_CLIENT_ID) {
      return demoConnectorSnapshots[this.source].account;
    }

    return `${this.source.toUpperCase()} / ${clientId}`;
  }

  async getHistoricalAnalysis(clientId: string) {
    if (clientId === DEMO_CLIENT_ID) {
      return demoConnectorSnapshots[this.source].historySummary;
    }

    return "Stable with selective volatility in mobile acquisition and non-brand auctions.";
  }

}
