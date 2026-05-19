import { ExecutionChange } from "@/types/ads";
import { executeGoogleAdsMutation, isLiveMutationMode } from "@/lib/google-ads/google-ads-client";
import {
  buildAddNegativeKeywordsPayload,
  buildPauseKeywordsPayload,
  buildUpdateAudienceTargetsPayload,
  buildUpdateBidStrategyPayload,
  buildUpdateCampaignBudgetPayload,
} from "@/lib/google-ads/mutation-payloads";

// Mutation methods are intentionally explicit and human-triggered.
// They never run from GPT output directly.
export async function addNegativeKeywords(payload: { campaignId: string; keywords: string[]; dryRun?: boolean }): Promise<ExecutionChange> {
  await executeGoogleAdsMutation({
    customerId: payload.campaignId,
    dryRun: payload.dryRun,
    mutatePayload: buildAddNegativeKeywordsPayload(payload.keywords),
  });

  return {
    type: "add_negative_keywords",
    entityId: payload.campaignId,
    before: { negativeKeywords: "existing", mode: !payload.dryRun && isLiveMutationMode() ? "live" : "dry-run" },
    after: { negativeKeywords: payload.keywords, mode: !payload.dryRun && isLiveMutationMode() ? "live" : "dry-run" },
  };
}

export async function updateCampaignBudgets(payload: { campaignId: string; from: number; to: number; dryRun?: boolean }): Promise<ExecutionChange> {
  await executeGoogleAdsMutation({
    customerId: payload.campaignId,
    dryRun: payload.dryRun,
    mutatePayload: buildUpdateCampaignBudgetPayload(payload.to),
  });

  return {
    type: "update_campaign_budget",
    entityId: payload.campaignId,
    before: { dailyBudget: payload.from, mode: !payload.dryRun && isLiveMutationMode() ? "live" : "dry-run" },
    after: { dailyBudget: payload.to, mode: !payload.dryRun && isLiveMutationMode() ? "live" : "dry-run" },
  };
}

export async function pauseKeywords(payload: { keywordIds: string[]; dryRun?: boolean }): Promise<ExecutionChange> {
  await executeGoogleAdsMutation({
    customerId: payload.keywordIds[0] || "unknown",
    dryRun: payload.dryRun,
    mutatePayload: buildPauseKeywordsPayload(payload.keywordIds),
  });

  return {
    type: "pause_keywords",
    entityId: payload.keywordIds.join(","),
    before: { status: "enabled", mode: !payload.dryRun && isLiveMutationMode() ? "live" : "dry-run" },
    after: { status: "paused", mode: !payload.dryRun && isLiveMutationMode() ? "live" : "dry-run" },
  };
}

export async function updateBidStrategies(payload: { campaignId: string; from: string; to: string; dryRun?: boolean }): Promise<ExecutionChange> {
  await executeGoogleAdsMutation({
    customerId: payload.campaignId,
    dryRun: payload.dryRun,
    mutatePayload: buildUpdateBidStrategyPayload(payload.campaignId, payload.to),
  });

  return {
    type: "update_bid_strategy",
    entityId: payload.campaignId,
    before: { strategy: payload.from, mode: !payload.dryRun && isLiveMutationMode() ? "live" : "dry-run" },
    after: { strategy: payload.to, mode: !payload.dryRun && isLiveMutationMode() ? "live" : "dry-run" },
  };
}

export async function updateAudienceTargets(payload: { campaignId: string; audienceSegments: string[]; dryRun?: boolean }): Promise<ExecutionChange> {
  await executeGoogleAdsMutation({
    customerId: payload.campaignId,
    dryRun: payload.dryRun,
    mutatePayload: buildUpdateAudienceTargetsPayload(payload.campaignId, payload.audienceSegments),
  });

  return {
    type: "update_audience_target",
    entityId: payload.campaignId,
    before: { audiences: "existing", mode: !payload.dryRun && isLiveMutationMode() ? "live" : "dry-run" },
    after: { audiences: payload.audienceSegments, mode: !payload.dryRun && isLiveMutationMode() ? "live" : "dry-run" },
  };
}
