import OpenAI from "openai";

import { AdsLanguage } from "@/lib/ads/ui-language";
import { getExecutiveSummaryPrompt, getRecommendationPrompt } from "@/lib/prompts/prompt-templates";
import { parseRecommendationJson } from "@/lib/recommendations/recommendation-parser";
import { AnalysisFinding, RecommendationJsonOutput } from "@/types/ads";

function getClient() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return null;
  }

  return new OpenAI({ apiKey });
}

const fallbackSummary: Record<AdsLanguage, string> = {
  nb: "Deterministisk analyse peker på økende bortkastet spend fra trafikk med lav intensjon, ustabil budgivning i to kampanjer og svak dekning av offline-konverteringer. Prioritet bør være søkeordhygiene, stabilisering av budstrategi og bedre kvalitet på konverteringssignaler.",
  en: "Deterministic analysis indicates rising wasted spend from low-intent traffic, unstable bidding in two campaigns, and weak offline conversion coverage. Priority should focus on query hygiene, bidding stabilization, and conversion signal quality.",
};

export async function generateRecommendationDrafts(findings: AnalysisFinding[], lang: AdsLanguage = "nb"): Promise<RecommendationJsonOutput[]> {
  const client = getClient();

  if (!client) {
    return findings.slice(0, 4).map((finding) => ({
      title: lang === "nb" ? finding.title.replace("Duplicate conversion signals detected", "Dupliserte konverteringssignaler oppdaget") : finding.title,
      reasoning: lang === "nb"
        ? `${finding.description} Sannsynlig årsak: ${finding.likelyCause}`
        : `${finding.description} Likely cause: ${finding.likelyCause}`,
      confidence: finding.confidence,
      impact: finding.impact,
      complexity: finding.impact === "high" ? "medium" : "low",
      estimatedBusinessEffect: lang === "nb"
        ? "Bedre spend-effektivitet og sterkere konverteringskvalitet over 2-6 uker."
        : "Improved spend efficiency and stronger conversion quality over 2-6 weeks.",
      proposedActions:
        lang === "nb"
          ? ["Gjennomgå med kundeansvarlig", "Verifiser i utførelsesforhåndsvisning", "Krev manuell godkjenning før bruk"]
          : ["Review with account lead", "Validate in execution preview", "Require manual approval before apply"],
    }));
  }

  const response = await client.responses.create({
    model: "gpt-5-mini",
    input: getRecommendationPrompt(findings, lang),
  });

  const text = response.output_text?.trim();
  if (!text) {
    throw new Error("GPT returned an empty recommendation payload.");
  }

  return parseRecommendationJson(text);
}

export async function generateExecutiveSummary(findings: AnalysisFinding[], lang: AdsLanguage = "nb"): Promise<string> {
  const client = getClient();
  if (!client) {
    return fallbackSummary[lang];
  }

  const response = await client.responses.create({
    model: "gpt-5-mini",
    input: getExecutiveSummaryPrompt(findings, lang),
  });

  return response.output_text?.trim() || (lang === "nb" ? "Lederoppsummering er ikke tilgjengelig." : "Executive summary unavailable.");
}
