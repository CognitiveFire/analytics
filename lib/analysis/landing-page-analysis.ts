import { AdsLandingPageMetric, AnalysisFinding } from "@/types/ads";

export function runLandingPageAnalysis(metrics: AdsLandingPageMetric[]): AnalysisFinding[] {
  return metrics
    .filter((metric) => metric.mobileBounceRate > 0.65 || metric.relevanceScore < 0.65)
    .map((metric) => ({
      id: `lp-${metric.campaignId}`,
      type: "landing_page" as const,
      title: "Landing page friction is suppressing conversion quality",
      description: "High mobile bounce and low relevance alignment suggest reduced post-click efficiency.",
      likelyCause: "Message mismatch between ad intent and landing page proposition, plus mobile UX friction.",
      impact: "medium" as const,
      confidence: 0.75,
      affectedCampaignIds: [metric.campaignId],
      deterministicSignals: [
        `mobileBounceRate=${metric.mobileBounceRate.toFixed(2)}`,
        `relevanceScore=${metric.relevanceScore.toFixed(2)}`,
      ],
    }));
}
