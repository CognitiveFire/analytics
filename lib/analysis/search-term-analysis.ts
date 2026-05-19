import { AdsSearchTerm, AnalysisFinding } from "@/types/ads";

export function runSearchTermAnalysis(searchTerms: AdsSearchTerm[]): AnalysisFinding[] {
  const lowIntentWaste = searchTerms.filter((term) => term.commercialIntent === "low").reduce((sum, term) => sum + term.spend30d, 0);

  if (lowIntentWaste < 5000) {
    return [];
  }

  return [
    {
      id: "searchterm-low-intent-waste",
      type: "search_terms",
      title: "Low-intent query exposure is increasing",
      description: "A meaningful share of spend is flowing into informational search terms with low conversion density.",
      likelyCause: "Broad match expansion and missing negative keyword maintenance cadence.",
      impact: "high",
      confidence: 0.84,
      affectedCampaignIds: [...new Set(searchTerms.filter((term) => term.commercialIntent === "low").map((term) => term.campaignId))],
      deterministicSignals: [`lowIntentWaste=${lowIntentWaste.toFixed(0)}`],
    },
  ];
}
