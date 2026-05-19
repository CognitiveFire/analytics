import {
  AdsBidStrategySummary,
  AdsBudgetSummary,
  AdsCampaign,
  AdsConversionSummary,
  AdsKeyword,
  AdsLandingPageMetric,
  AdsSearchTerm,
  AuditLogEntry,
  ExecutionPreview,
  Recommendation,
} from "@/types/ads";

export const mockAdsCampaigns: AdsCampaign[] = [
  {
    id: "cmp-brand-no",
    accountId: "demo-executive",
    name: "Brand Search Norway",
    channel: "search",
    spend30d: 18000,
    conversions30d: 620,
    roas30d: 9.8,
    isBrand: true,
    budgetDaily: 850,
  },
  {
    id: "cmp-prospecting-no",
    accountId: "demo-executive",
    name: "Prospecting Search Norway",
    channel: "search",
    spend30d: 52000,
    conversions30d: 430,
    roas30d: 3.4,
    isBrand: false,
    budgetDaily: 2200,
  },
  {
    id: "cmp-pmax-no",
    accountId: "demo-executive",
    name: "Performance Max Core",
    channel: "performance_max",
    spend30d: 42000,
    conversions30d: 410,
    roas30d: 4.2,
    isBrand: false,
    budgetDaily: 1800,
  },
];

export const mockAdsKeywords: AdsKeyword[] = [
  { id: "kw-1", campaignId: "cmp-prospecting-no", text: "rorlegger oslo", matchType: "broad", spend30d: 8800, conversions30d: 42, qualityScore: 6 },
  { id: "kw-2", campaignId: "cmp-prospecting-no", text: "beste bad tips", matchType: "broad", spend30d: 7400, conversions30d: 7, qualityScore: 4 },
  { id: "kw-3", campaignId: "cmp-brand-no", text: "apriil signal room", matchType: "exact", spend30d: 1400, conversions30d: 92, qualityScore: 9 },
];

export const mockAdsSearchTerms: AdsSearchTerm[] = [
  { id: "st-1", campaignId: "cmp-prospecting-no", query: "hvordan reparere vask selv", spend30d: 3200, conversions30d: 3, commercialIntent: "low" },
  { id: "st-2", campaignId: "cmp-prospecting-no", query: "rorlegger pris oslo", spend30d: 4100, conversions30d: 52, commercialIntent: "high" },
  { id: "st-3", campaignId: "cmp-pmax-no", query: "billige ror deler", spend30d: 2700, conversions30d: 8, commercialIntent: "low" },
];

export const mockAdsConversions: AdsConversionSummary = {
  accountId: "demo-executive",
  conversionCount30d: 1560,
  primaryConversionCount30d: 910,
  duplicateConversionRate: 0.17,
  offlineImportCoverage: 0.42,
};

export const mockAdsBidStrategies: AdsBidStrategySummary[] = [
  { campaignId: "cmp-brand-no", strategy: "tROAS", learningDaysInLast30d: 3, roasStdDev: 0.18, conversionDensity: 5.3, budgetLimitedRate: 0.28 },
  { campaignId: "cmp-prospecting-no", strategy: "tROAS", learningDaysInLast30d: 11, roasStdDev: 0.54, conversionDensity: 1.9, budgetLimitedRate: 0.11 },
  { campaignId: "cmp-pmax-no", strategy: "maximize_conversions", learningDaysInLast30d: 8, roasStdDev: 0.39, conversionDensity: 2.3, budgetLimitedRate: 0.16 },
];

export const mockLandingPageMetrics: AdsLandingPageMetric[] = [
  { campaignId: "cmp-prospecting-no", landingPage: "/services/plumbing", mobileBounceRate: 0.71, conversionRate: 0.024, avgEngagedSeconds: 31, relevanceScore: 0.58 },
  { campaignId: "cmp-brand-no", landingPage: "/", mobileBounceRate: 0.39, conversionRate: 0.092, avgEngagedSeconds: 78, relevanceScore: 0.88 },
  { campaignId: "cmp-pmax-no", landingPage: "/contact", mobileBounceRate: 0.62, conversionRate: 0.028, avgEngagedSeconds: 36, relevanceScore: 0.63 },
];

export const mockBudgetSummaries: AdsBudgetSummary[] = [
  { campaignId: "cmp-brand-no", dailyBudget: 850, lostImpressionShareBudget: 0.19, spendPacingRate: 1.03 },
  { campaignId: "cmp-prospecting-no", dailyBudget: 2200, lostImpressionShareBudget: 0.05, spendPacingRate: 0.91 },
  { campaignId: "cmp-pmax-no", dailyBudget: 1800, lostImpressionShareBudget: 0.07, spendPacingRate: 0.94 },
];

export const mockRecommendations: Recommendation[] = [
  {
    id: "rec-1",
    title: "Reduce broad match exposure in prospecting",
    category: "search_terms",
    reasoning: "Broad-match queries show rising informational traffic with low downstream conversion density.",
    confidence: 0.84,
    impact: "high",
    complexity: "medium",
    estimatedBusinessEffect: "Lower wasted spend and better lead quality within 2-4 weeks.",
    affectedCampaigns: ["cmp-prospecting-no"],
    proposedActions: ["Add 25 high-risk negative terms", "Split low-intent query themes", "Shift 12% budget to high-intent ad groups"],
    riskLevel: "medium",
    status: "draft",
    priorityScore: 7.6,
    priorityLevel: "high",
    aiReasoningSnapshot: "Current broad expansion pattern is diluting conversion signals for bidding models.",
  },
];

export const mockExecutionPreview: ExecutionPreview = {
  recommendationId: "rec-1",
  summary: "Apply negative keywords and rebalance budget toward high-intent ad groups.",
  requiresManualApproval: true,
  safetyChecks: [
    "Budget change per campaign below 20% threshold",
    "No branded campaign pause detected",
    "Recommendation confidence above 0.7",
  ],
  changes: [
    {
      type: "add_negative_keywords",
      entityId: "cmp-prospecting-no",
      before: { negativeKeywords: 42 },
      after: { negativeKeywords: 67 },
    },
    {
      type: "update_campaign_budget",
      entityId: "cmp-prospecting-no",
      before: { dailyBudget: 2200 },
      after: { dailyBudget: 1936 },
    },
  ],
};

export const mockAuditLogEntries: AuditLogEntry[] = [
  {
    id: "audit-1",
    type: "recommendations_generated",
    timestamp: "2026-05-19T08:02:00.000Z",
    accountId: "demo-executive",
    userId: "system",
    payload: { recommendationCount: 6 },
  },
  {
    id: "audit-2",
    type: "approval_recorded",
    timestamp: "2026-05-19T08:11:00.000Z",
    accountId: "demo-executive",
    userId: "mrobinson",
    payload: { recommendationId: "rec-1", decision: "approve" },
  },
];
