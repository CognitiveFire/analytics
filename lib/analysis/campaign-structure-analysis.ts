import { AdsCampaign, AnalysisFinding } from "@/types/ads";

export function runCampaignStructureAnalysis(campaigns: AdsCampaign[]): AnalysisFinding[] {
  const branded = campaigns.filter((campaign) => campaign.isBrand);
  const nonBranded = campaigns.filter((campaign) => !campaign.isBrand);

  if (!branded.length || !nonBranded.length) {
    return [];
  }

  const brandSpend = branded.reduce((sum, campaign) => sum + campaign.spend30d, 0);
  const nonBrandSpend = nonBranded.reduce((sum, campaign) => sum + campaign.spend30d, 0);
  const imbalance = brandSpend / Math.max(nonBrandSpend, 1);

  if (imbalance >= 0.5) {
    return [];
  }

  return [
    {
      id: "structure-brand-underfunded",
      type: "campaign_structure",
      title: "Branded demand capture appears budget-constrained",
      description: "Brand campaigns are underfunded relative to their efficiency profile.",
      likelyCause: "Budget allocation favors broad prospecting while high-intent brand demand remains capped.",
      impact: "high",
      confidence: 0.81,
      affectedCampaignIds: branded.map((campaign) => campaign.id),
      deterministicSignals: [`brandSpend=${brandSpend}`, `nonBrandSpend=${nonBrandSpend}`],
    },
  ];
}
