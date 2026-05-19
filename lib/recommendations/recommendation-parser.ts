import { RecommendationJsonOutput } from "@/types/ads";

function isImpact(value: string): value is RecommendationJsonOutput["impact"] {
  return value === "high" || value === "medium" || value === "low";
}

function isComplexity(value: string): value is RecommendationJsonOutput["complexity"] {
  return value === "high" || value === "medium" || value === "low";
}

export function parseRecommendationJson(raw: string): RecommendationJsonOutput[] {
  const parsed = JSON.parse(raw) as unknown;
  if (!Array.isArray(parsed)) {
    throw new Error("Recommendation output must be an array.");
  }

  return parsed.map((item, index) => {
    if (typeof item !== "object" || item === null) {
      throw new Error(`Invalid recommendation at index ${index}`);
    }

    const candidate = item as Record<string, unknown>;
    const confidence = Number(candidate.confidence);
    const impact = String(candidate.impact ?? "");
    const complexity = String(candidate.complexity ?? "");

    if (!isImpact(impact)) {
      throw new Error(`Invalid impact at index ${index}`);
    }

    if (!isComplexity(complexity)) {
      throw new Error(`Invalid complexity at index ${index}`);
    }

    return {
      title: String(candidate.title ?? "Untitled recommendation"),
      reasoning: String(candidate.reasoning ?? "No reasoning provided."),
      confidence: Number.isFinite(confidence) ? Math.min(Math.max(confidence, 0), 1) : 0.5,
      impact,
      complexity,
      estimatedBusinessEffect: String(candidate.estimatedBusinessEffect ?? "Business impact currently unknown."),
      proposedActions: Array.isArray(candidate.proposedActions)
        ? candidate.proposedActions.map((action) => String(action))
        : [],
    };
  });
}
