export type DataSource =
  | "googleAds"
  | "ga4"
  | "searchConsole"
  | "bigQuery"
  | "cm360"
  | "dv360"
  | "floodlight"
  | "crm";

export type PriorityLevel = "high" | "medium" | "low";
export type ConnectorMode = "mock" | "live";

export interface Client {
  id: string;
  name: string;
  industry: string;
  region: string;
  accountHealth: number;
  reportStatus: "ready" | "refreshing" | "scheduled";
  logoMark: string;
}

export interface KPI {
  id: string;
  label: string;
  value: string;
  delta: number;
  trend: "up" | "down" | "flat";
}

export interface TrendPoint {
  date: string;
  spend: number;
  roas: number;
  cpa: number;
  seoVisibility: number;
  conversionQuality: number;
  attributedRevenue: number;
}

export interface StrategicInsight {
  id: string;
  title: string;
  summary: string;
  confidence: number;
  sourceChannels: DataSource[];
}

export interface OperationalTask {
  id: string;
  title: string;
  category: "seo" | "ppc" | "tracking" | "landing-page" | "attribution" | "bidding";
  impact: number;
  confidence: number;
  complexity: number;
  scale: number;
  estimatedBusinessEffect: string;
  reasoning: string;
  owner: string;
  dueDate: string;
}

export interface ScoredTask extends OperationalTask {
  priorityScore: number;
  priorityLevel: PriorityLevel;
}

export interface ConnectorSnapshot {
  source: DataSource;
  account: string;
  metrics: Record<string, number>;
  trendDelta: number;
  anomalies: string[];
  historySummary: string;
}

export interface ConnectorSnapshotResponse {
  snapshot: ConnectorSnapshot;
}
