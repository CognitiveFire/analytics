import { AdsBidStrategySummary, AnalysisFinding } from "@/types/ads";

export function runBidStrategyAnalysis(strategies: AdsBidStrategySummary[]): AnalysisFinding[] {
  return strategies
    .filter((strategy) => strategy.roasStdDev > 0.4 || strategy.learningDaysInLast30d > 9 || strategy.conversionDensity < 2)
    .map((strategy) => ({
      id: `bid-${strategy.campaignId}`,
      type: "bidding" as const,
      title: "Bid strategy shows instability",
      description: "Current automated bidding configuration appears under-supported by stable conversion density.",
      likelyCause: "Frequent budget/target changes and insufficient consistent conversion signal volume.",
      impact: "medium" as const,
      confidence: 0.77,
      affectedCampaignIds: [strategy.campaignId],
      deterministicSignals: [
        `strategy=${strategy.strategy}`,
        `learningDays=${strategy.learningDaysInLast30d}`,
        `roasStdDev=${strategy.roasStdDev.toFixed(2)}`,
        `conversionDensity=${strategy.conversionDensity.toFixed(2)}`,
      ],
    }));
}
