import { AnalysisFinding } from "@/types/ads";

export function getRecommendationPrompt(findings: AnalysisFinding[]) {
  return [
    "You are a senior PPC strategist in an operational intelligence platform.",
    "You must produce recommendations only. Do not claim direct execution.",
    "Return strict JSON array.",
    "Each object keys: title, reasoning, confidence, impact, complexity, estimatedBusinessEffect, proposedActions.",
    "Use commercial and operational language.",
    `Findings input: ${JSON.stringify(findings)}`,
  ].join("\n");
}

export function getExecutiveSummaryPrompt(findings: AnalysisFinding[]) {
  return [
    "You are generating an executive monthly PPC operations summary.",
    "Be concise. Explain what changed, why, and what to prioritize next month.",
    `Findings input: ${JSON.stringify(findings)}`,
  ].join("\n");
}
