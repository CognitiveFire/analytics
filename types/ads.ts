export type AdsImpactLevel = "high" | "medium" | "low";
export type AdsComplexityLevel = "low" | "medium" | "high";
export type AdsRiskLevel = "low" | "medium" | "high";
export type RecommendationStatus = "draft" | "approved" | "rejected" | "executed" | "rolled_back";

export type RecommendationCategory =
  | "tracking"
  | "bidding"
  | "search_terms"
  | "landing_page"
  | "campaign_structure"
  | "budget"
  | "audience";

export interface AdsCampaign {
  id: string;
  accountId: string;
  name: string;
  channel: "search" | "performance_max" | "display";
  spend30d: number;
  conversions30d: number;
  roas30d: number;
  isBrand: boolean;
  budgetDaily: number;
}

export interface AdsKeyword {
  id: string;
  campaignId: string;
  text: string;
  matchType: "broad" | "phrase" | "exact";
  spend30d: number;
  conversions30d: number;
  qualityScore: number;
}

export interface AdsSearchTerm {
  id: string;
  campaignId: string;
  query: string;
  spend30d: number;
  conversions30d: number;
  commercialIntent: "high" | "medium" | "low";
}

export interface AdsConversionSummary {
  accountId: string;
  conversionCount30d: number;
  primaryConversionCount30d: number;
  duplicateConversionRate: number;
  offlineImportCoverage: number;
}

export interface AdsBidStrategySummary {
  campaignId: string;
  strategy: "maximize_conversions" | "tCPA" | "tROAS" | "manual_cpc";
  learningDaysInLast30d: number;
  roasStdDev: number;
  conversionDensity: number;
  budgetLimitedRate: number;
}

export interface AdsLandingPageMetric {
  campaignId: string;
  landingPage: string;
  mobileBounceRate: number;
  conversionRate: number;
  avgEngagedSeconds: number;
  relevanceScore: number;
}

export interface AdsBudgetSummary {
  campaignId: string;
  dailyBudget: number;
  lostImpressionShareBudget: number;
  spendPacingRate: number;
}

export interface AnalysisFinding {
  id: string;
  type: RecommendationCategory;
  title: string;
  description: string;
  likelyCause: string;
  impact: AdsImpactLevel;
  confidence: number;
  affectedCampaignIds: string[];
  deterministicSignals: string[];
}

export interface Recommendation {
  id: string;
  title: string;
  category: RecommendationCategory;
  reasoning: string;
  confidence: number;
  impact: AdsImpactLevel;
  complexity: AdsComplexityLevel;
  estimatedBusinessEffect: string;
  affectedCampaigns: string[];
  proposedActions: string[];
  riskLevel: AdsRiskLevel;
  status: RecommendationStatus;
  priorityScore: number;
  priorityLevel: "critical" | "high" | "medium" | "low";
  aiReasoningSnapshot?: string;
}

export interface ExecutionChange {
  type:
    | "add_negative_keywords"
    | "update_campaign_budget"
    | "pause_keywords"
    | "update_bid_strategy"
    | "update_audience_target";
  entityId: string;
  before: Record<string, unknown>;
  after: Record<string, unknown>;
}

export interface ExecutionPreview {
  recommendationId: string;
  summary: string;
  changes: ExecutionChange[];
  safetyChecks: string[];
  requiresManualApproval: true;
}

export interface ApprovalDecision {
  recommendationId: string;
  decision: "approve" | "reject";
  reviewer: string;
  secondaryReviewer?: string;
  notes?: string;
}

export interface RollbackRecord {
  executionId: string;
  changeSet: ExecutionChange[];
  rollbackInstructions: string[];
}

export interface AuditLogEntry {
  id: string;
  type:
    | "recommendations_generated"
    | "ai_reasoning_snapshot"
    | "approval_recorded"
    | "execution_applied"
    | "rollback_recorded";
  timestamp: string;
  accountId: string;
  userId: string;
  payload: Record<string, unknown>;
}

export interface RecommendationJsonOutput {
  title: string;
  reasoning: string;
  confidence: number;
  impact: AdsImpactLevel;
  complexity: AdsComplexityLevel;
  estimatedBusinessEffect: string;
  proposedActions: string[];
}
