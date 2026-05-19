import {
  fetchBidStrategies,
  fetchCampaigns,
  fetchConversions,
  fetchLandingPageMetrics,
  fetchSearchTerms,
} from "@/lib/google-ads/services";
import { runBidStrategyAnalysis } from "@/lib/analysis/bid-strategy-analysis";
import { runCampaignStructureAnalysis } from "@/lib/analysis/campaign-structure-analysis";
import { runLandingPageAnalysis } from "@/lib/analysis/landing-page-analysis";
import { runSearchTermAnalysis } from "@/lib/analysis/search-term-analysis";
import { runTrackingQualityAnalysis } from "@/lib/analysis/tracking-quality-analysis";
import { AnalysisFinding } from "@/types/ads";

export async function runAdsAnalysis(accountId: string): Promise<AnalysisFinding[]> {
  const [campaigns, searchTerms, conversions, strategies, landingPages] = await Promise.all([
    fetchCampaigns(accountId),
    fetchSearchTerms(accountId),
    fetchConversions(accountId),
    fetchBidStrategies(accountId),
    fetchLandingPageMetrics(accountId),
  ]);

  return [
    ...runTrackingQualityAnalysis(conversions),
    ...runBidStrategyAnalysis(strategies),
    ...runSearchTermAnalysis(searchTerms),
    ...runLandingPageAnalysis(landingPages),
    ...runCampaignStructureAnalysis(campaigns),
  ];
}
