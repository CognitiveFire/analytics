import { AnalysisFinding } from "@/types/ads";
import { AdsLanguage } from "@/lib/ads/ui-language";

export function getRecommendationPrompt(findings: AnalysisFinding[], lang: AdsLanguage) {
  const languageInstruction = lang === "nb"
    ? "Write the recommendations in Norwegian Bokmål. Return strict JSON only."
    : "Write the recommendations in English. Return strict JSON only.";

  return [
    languageInstruction,
    "You are a senior PPC strategist in an operational intelligence platform.",
    "You must produce recommendations only. Do not claim direct execution.",
    "Return strict JSON array.",
    "Each object keys: title, reasoning, confidence, impact, complexity, estimatedBusinessEffect, proposedActions.",
    "Use commercial and operational language.",
    `Findings input: ${JSON.stringify(findings)}`,
  ].join("\n");
}

export function getExecutiveSummaryPrompt(findings: AnalysisFinding[], lang: AdsLanguage) {
  const languageInstruction = lang === "nb"
    ? "Write the executive summary in Norwegian Bokmål."
    : "Write the executive summary in English.";

  return [
    languageInstruction,
    "You are generating an executive monthly PPC operations summary.",
    "Be concise. Explain what changed, why, and what to prioritize next month.",
    `Findings input: ${JSON.stringify(findings)}`,
  ].join("\n");
}
