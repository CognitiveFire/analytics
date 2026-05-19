import { runAdsAnalysis } from "@/lib/analysis/run-ads-analysis";
import { AdsLanguage } from "@/lib/ads/ui-language";
import { generateExecutiveSummary, generateRecommendationDrafts } from "@/lib/openai/gpt-analysis-service";
import { listRecommendations, saveRecommendations } from "@/lib/recommendations/recommendation-repository";
import { calculatePriorityScore, toPriorityLevel } from "@/lib/scoring/ads-priority";
import { isDemoAdsAccount } from "@/lib/server/ads-active-account";
import { Recommendation } from "@/types/ads";

function mapCategory(title: string): Recommendation["category"] {
  const normalized = title.toLowerCase();
  if (normalized.includes("tracking") || normalized.includes("offline")) return "tracking";
  if (normalized.includes("bid") || normalized.includes("roas") || normalized.includes("tcpa")) return "bidding";
  if (normalized.includes("landing")) return "landing_page";
  if (normalized.includes("budget")) return "budget";
  if (normalized.includes("audience")) return "audience";
  if (normalized.includes("brand") || normalized.includes("campaign")) return "campaign_structure";
  return "search_terms";
}

function riskFromConfidence(confidence: number): Recommendation["riskLevel"] {
  if (confidence >= 0.8) return "low";
  if (confidence >= 0.65) return "medium";
  return "high";
}

function complexityScale(complexity: Recommendation["complexity"]) {
  if (complexity === "low") return 3;
  if (complexity === "medium") return 2;
  return 1;
}

const persistedSummaryByLanguage: Record<AdsLanguage, string> = {
  nb: "Lagrede anbefalinger ble lastet fra PostgreSQL.",
  en: "Loaded persisted recommendations from PostgreSQL.",
};

export async function generateRecommendations(accountId: string, lang: AdsLanguage = "nb"): Promise<{ recommendations: Recommendation[]; summary: string }> {
  const findings = await runAdsAnalysis(accountId);
  const [drafts, summary] = await Promise.all([
    generateRecommendationDrafts(findings, lang),
    generateExecutiveSummary(findings, lang),
  ]);

  const recommendations = drafts.map((draft, index) => {
    const scale = complexityScale(draft.complexity);
    const priorityScore = calculatePriorityScore({
      impact: draft.impact,
      confidence: draft.confidence,
      scale,
      complexity: draft.complexity,
    });

    return {
      id: `rec-${index + 1}`,
      title: draft.title,
      category: mapCategory(draft.title),
      reasoning: draft.reasoning,
      confidence: draft.confidence,
      impact: draft.impact,
      complexity: draft.complexity,
      estimatedBusinessEffect: draft.estimatedBusinessEffect,
      affectedCampaigns: [],
      proposedActions: draft.proposedActions,
      riskLevel: riskFromConfidence(draft.confidence),
      status: "draft" as const,
      priorityScore,
      priorityLevel: toPriorityLevel(priorityScore),
      aiReasoningSnapshot: draft.reasoning,
    };
  });

  await saveRecommendations(accountId, recommendations);

  return { recommendations, summary };
}

export async function getPersistedOrGenerateRecommendations(accountId: string, lang: AdsLanguage = "nb"): Promise<{ recommendations: Recommendation[]; summary: string }> {
  if (!isDemoAdsAccount(accountId)) {
    return {
      recommendations: [],
      summary: lang === "nb" ? "Ingen Ads-data er tilgjengelig for denne kunden ennå." : "No Ads data is available for this client yet.",
    };
  }

  const stored = await listRecommendations(accountId);
  if (stored.length > 0) {
    return {
      recommendations: stored,
      summary: persistedSummaryByLanguage[lang],
    };
  }

  return generateRecommendations(accountId, lang);
}
