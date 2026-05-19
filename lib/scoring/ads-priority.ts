import { AdsComplexityLevel, AdsImpactLevel, Recommendation } from "@/types/ads";

function impactWeight(impact: AdsImpactLevel) {
  if (impact === "high") return 3;
  if (impact === "medium") return 2;
  return 1;
}

function complexityWeight(complexity: AdsComplexityLevel) {
  if (complexity === "low") return 1;
  if (complexity === "medium") return 2;
  return 3;
}

export function calculatePriorityScore(input: {
  impact: AdsImpactLevel;
  confidence: number;
  scale: number;
  complexity: AdsComplexityLevel;
}) {
  const score = (impactWeight(input.impact) * input.confidence * input.scale) / complexityWeight(input.complexity);
  return Number(score.toFixed(2));
}

export function toPriorityLevel(score: number): Recommendation["priorityLevel"] {
  if (score >= 2.2) return "critical";
  if (score >= 1.5) return "high";
  if (score >= 0.8) return "medium";
  return "low";
}
