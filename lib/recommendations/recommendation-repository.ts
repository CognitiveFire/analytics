import { Recommendation } from "@/types/ads";
import { prisma } from "@/lib/server/prisma";

const HAS_DATABASE = Boolean(process.env.DATABASE_URL);

function coercePriorityLevel(value: string): Recommendation["priorityLevel"] {
  if (value === "critical" || value === "high" || value === "medium" || value === "low") {
    return value;
  }

  return "medium";
}

function coerceStatus(value: string): Recommendation["status"] {
  if (value === "draft" || value === "approved" || value === "rejected" || value === "executed" || value === "rolled_back") {
    return value;
  }

  return "draft";
}

function toRecord(accountId: string, recommendation: Recommendation) {
  return {
    id: `${accountId}-${recommendation.id}`,
    accountId,
    title: recommendation.title,
    category: recommendation.category,
    reasoning: recommendation.reasoning,
    confidence: recommendation.confidence,
    impact: recommendation.impact,
    complexity: recommendation.complexity,
    estimatedBusinessEffect: recommendation.estimatedBusinessEffect,
    proposedActions: recommendation.proposedActions,
    status: recommendation.status,
    priorityScore: recommendation.priorityScore,
    priorityLevel: recommendation.priorityLevel,
  };
}

export async function saveRecommendations(accountId: string, recommendations: Recommendation[]) {
  if (!HAS_DATABASE) {
    return;
  }

  try {
    await prisma.$transaction([
      prisma.adsRecommendation.deleteMany({ where: { accountId } }),
      prisma.adsRecommendation.createMany({
        data: recommendations.map((recommendation) => toRecord(accountId, recommendation)),
      }),
    ]);
  } catch {
    // Local dev or CI can run without a configured database.
  }
}

export async function listRecommendations(accountId: string): Promise<Recommendation[]> {
  if (!HAS_DATABASE) {
    return [];
  }

  try {
    const rows = await prisma.adsRecommendation.findMany({
      where: { accountId },
      orderBy: { priorityScore: "desc" },
    });

    return rows.map((row) => ({
      id: row.id,
      title: row.title,
      category: row.category as Recommendation["category"],
      reasoning: row.reasoning,
      confidence: row.confidence,
      impact: row.impact as Recommendation["impact"],
      complexity: row.complexity as Recommendation["complexity"],
      estimatedBusinessEffect: row.estimatedBusinessEffect,
      affectedCampaigns: [],
      proposedActions: Array.isArray(row.proposedActions) ? row.proposedActions.map((item) => String(item)) : [],
      riskLevel: row.confidence >= 0.8 ? "low" : row.confidence >= 0.65 ? "medium" : "high",
      status: coerceStatus(row.status),
      priorityScore: row.priorityScore,
      priorityLevel: coercePriorityLevel(row.priorityLevel),
      aiReasoningSnapshot: row.reasoning,
    }));
  } catch {
    return [];
  }
}
