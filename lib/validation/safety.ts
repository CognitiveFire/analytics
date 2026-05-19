import { ApprovalDecision, ExecutionPreview, Recommendation } from "@/types/ads";

const MAX_BUDGET_DELTA_RATIO = 0.2;

export function enforceExecutionSafety(recommendation: Recommendation, preview: ExecutionPreview) {
  if (recommendation.confidence < 0.65) {
    throw new Error("Blocked: recommendation confidence below execution threshold.");
  }

  for (const change of preview.changes) {
    if (change.type === "update_campaign_budget") {
      const before = Number(change.before.dailyBudget ?? 0);
      const after = Number(change.after.dailyBudget ?? 0);
      const ratio = before > 0 ? Math.abs(after - before) / before : 0;
      if (ratio > MAX_BUDGET_DELTA_RATIO) {
        throw new Error("Blocked: budget change exceeds 20% safeguard.");
      }
    }

    if (change.type === "pause_keywords" && String(change.entityId).toLowerCase().includes("brand")) {
      throw new Error("Blocked: pausing branded assets is protected.");
    }
  }

  if (!preview.requiresManualApproval) {
    throw new Error("Blocked: manual approval is mandatory for execution.");
  }
}

export function enforceDualApprovalForHighRiskChanges(preview: ExecutionPreview, decision: ApprovalDecision) {
  const hasHighRiskMutation = preview.changes.some(
    (change) => change.type === "update_campaign_budget" || change.type === "update_bid_strategy"
  );

  if (!hasHighRiskMutation) {
    return;
  }

  if (!decision.secondaryReviewer) {
    throw new Error("Blocked: secondary approval required for budget and bid strategy changes.");
  }

  if (decision.secondaryReviewer === decision.reviewer) {
    throw new Error("Blocked: primary and secondary approvers must be different users.");
  }
}
