import { appendAuditLog } from "@/lib/audit/audit-log-service";
import { saveExecutionRecord } from "@/lib/execution/execution-repository";
import {
  addNegativeKeywords,
  pauseKeywords,
  updateAudienceTargets,
  updateBidStrategies,
  updateCampaignBudgets,
} from "@/lib/execution/google-ads-mutations";
import { mockExecutionPreview, mockRecommendations } from "@/lib/mock-data/ads";
import { listRecommendations } from "@/lib/recommendations/recommendation-repository";
import { enforceDualApprovalForHighRiskChanges, enforceExecutionSafety } from "@/lib/validation/safety";
import { AdsLanguage } from "@/lib/ads/ui-language";
import { ApprovalDecision, ExecutionPreview, RollbackRecord } from "@/types/ads";

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.map((item) => String(item));
}

async function applyPreviewChangeMutations(preview: ExecutionPreview, dryRun: boolean) {
  const appliedChanges = [];

  for (const change of preview.changes) {
    if (change.type === "add_negative_keywords") {
      appliedChanges.push(
        await addNegativeKeywords({
          campaignId: change.entityId,
          keywords: asStringArray((change.after as Record<string, unknown>).negativeKeywords),
          dryRun,
        })
      );
    }

    if (change.type === "update_campaign_budget") {
      appliedChanges.push(
        await updateCampaignBudgets({
          campaignId: change.entityId,
          from: Number((change.before as Record<string, unknown>).dailyBudget || 0),
          to: Number((change.after as Record<string, unknown>).dailyBudget || 0),
          dryRun,
        })
      );
    }

    if (change.type === "pause_keywords") {
      appliedChanges.push(
        await pauseKeywords({
          keywordIds: change.entityId.split(",").filter(Boolean),
          dryRun,
        })
      );
    }

    if (change.type === "update_bid_strategy") {
      appliedChanges.push(
        await updateBidStrategies({
          campaignId: change.entityId,
          from: String((change.before as Record<string, unknown>).strategy || "unknown"),
          to: String((change.after as Record<string, unknown>).strategy || "unknown"),
          dryRun,
        })
      );
    }

    if (change.type === "update_audience_target") {
      appliedChanges.push(
        await updateAudienceTargets({
          campaignId: change.entityId,
          audienceSegments: asStringArray((change.after as Record<string, unknown>).audiences),
          dryRun,
        })
      );
    }
  }

  return appliedChanges;
}

const fallbackPreviewByLanguage: Record<AdsLanguage, ExecutionPreview> = {
  nb: {
    recommendationId: "none",
    summary: "Ingen deterministisk forhåndsvisning er tilgjengelig for denne anbefalingen ennå.",
    changes: [],
    safetyChecks: ["Forhåndsvisningsgenerator brukt som reserve"],
    requiresManualApproval: true,
  },
  en: {
    recommendationId: "none",
    summary: "No deterministic preview is available for this recommendation yet.",
    changes: [],
    safetyChecks: ["Preview generator fallback applied"],
    requiresManualApproval: true,
  },
};

export async function buildExecutionPreview(recommendationId: string, lang: AdsLanguage = "nb"): Promise<ExecutionPreview> {
  if (recommendationId !== mockExecutionPreview.recommendationId) {
    return { ...fallbackPreviewByLanguage[lang], recommendationId };
  }

  if (lang === "nb") {
    return {
      ...mockExecutionPreview,
      summary: "Bruk negative søkeord og omfordel budsjett mot kampanjer med høy intensjon.",
      safetyChecks: [
        "Budsjettendring per kampanje er under 20% terskel",
        "Ingen pause av merkevarekampanjer oppdaget",
        "Anbefalingssikkerhet er over 0.7",
      ],
    };
  }

  return mockExecutionPreview;
}

export async function applyApprovedExecution(accountId: string, decision: ApprovalDecision, options?: { dryRun?: boolean }) {
  if (decision.decision !== "approve") {
    throw new Error("Execution blocked: decision is not approve.");
  }

  const storedRecommendations = await listRecommendations(accountId);
  const recommendation = storedRecommendations.find((item) => item.id.endsWith(decision.recommendationId))
    || storedRecommendations.find((item) => item.id === decision.recommendationId)
    || mockRecommendations.find((item) => item.id === decision.recommendationId);
  if (!recommendation) {
    throw new Error("Recommendation not found.");
  }

  const preview = await buildExecutionPreview(decision.recommendationId);
  enforceExecutionSafety(recommendation, preview);
  enforceDualApprovalForHighRiskChanges(preview, decision);

  const dryRun = options?.dryRun ?? true;
  const appliedChanges = await applyPreviewChangeMutations(preview, dryRun);

  const executionId = `exec-${Date.now()}`;
  const rollback: RollbackRecord = {
    executionId,
    changeSet: appliedChanges,
    rollbackInstructions: [
      "Restore previous budget values from changeSet.before",
      "Remove newly added negatives if quality drops",
      "Re-enable paused keywords where applicable",
    ],
  };

  await appendAuditLog({
    id: `audit-${executionId}`,
    type: "execution_applied",
    timestamp: new Date().toISOString(),
    accountId,
    userId: decision.reviewer,
    payload: {
      recommendationId: decision.recommendationId,
      notes: decision.notes,
      executionId,
      dryRun,
      changeCount: appliedChanges.length,
      rollback,
    },
  });

  await saveExecutionRecord({
    accountId,
    recommendationId: decision.recommendationId,
    approvedBy: decision.reviewer,
    changeSet: appliedChanges,
    rollback,
  });

  return {
    executionId,
    rollback,
    changes: appliedChanges,
    dryRun,
    applied: true,
  };
}
