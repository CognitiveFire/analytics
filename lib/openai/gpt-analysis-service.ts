import OpenAI from "openai";

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

export async function generateRecommendationDrafts(findings: AnalysisFinding[]): Promise<RecommendationJsonOutput[]> {
  const client = getClient();

  if (!client) {
    return findings.slice(0, 4).map((finding) => ({
      title: finding.title,
      reasoning: `${finding.description} Likely cause: ${finding.likelyCause}`,
      confidence: finding.confidence,
      impact: finding.impact,
      complexity: finding.impact === "high" ? "medium" : "low",
      estimatedBusinessEffect: "Improved spend efficiency and stronger conversion quality over 2-6 weeks.",
      proposedActions: ["Review with account lead", "Validate in execution preview", "Require manual approval before apply"],
    }));
  }

  const response = await client.responses.create({
    model: "gpt-5-mini",
    input: getRecommendationPrompt(findings),
  });

  const text = response.output_text?.trim();
  if (!text) {
    throw new Error("GPT returned an empty recommendation payload.");
  }

  return parseRecommendationJson(text);
}

export async function generateExecutiveSummary(findings: AnalysisFinding[]): Promise<string> {
  const client = getClient();
  if (!client) {
    return "Deterministic analysis indicates rising wasted spend from low-intent traffic, unstable bidding in two campaigns, and weak offline conversion coverage. Priority should focus on query hygiene, bidding stabilization, and conversion signal quality.";
  }

  const response = await client.responses.create({
    model: "gpt-5-mini",
    input: getExecutiveSummaryPrompt(findings),
  });

  return response.output_text?.trim() || "Executive summary unavailable.";
}
