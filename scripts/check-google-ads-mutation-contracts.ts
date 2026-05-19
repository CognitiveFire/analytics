import {
  buildAddNegativeKeywordsPayload,
  buildPauseKeywordsPayload,
  buildUpdateAudienceTargetsPayload,
  buildUpdateBidStrategyPayload,
  buildUpdateCampaignBudgetPayload,
} from "@/lib/google-ads/mutation-payloads";
import { validateGoogleAdsMutatePayload } from "@/lib/google-ads/mutation-contract";

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(message);
  }
}

function runContractChecks() {
  const payloads = [
    buildAddNegativeKeywordsPayload(["free", "tutorial"]),
    buildUpdateCampaignBudgetPayload(1350),
    buildPauseKeywordsPayload(["customers/123/adGroupCriteria/12", "customers/123/adGroupCriteria/13"]),
    buildUpdateBidStrategyPayload("customers/123/campaigns/998", "tROAS"),
    buildUpdateAudienceTargetsPayload("customers/123/campaigns/998", ["in_market_home_services", "custom_segment_plumbing"]),
  ];

  payloads.forEach((payload, index) => {
    validateGoogleAdsMutatePayload(payload);
    assert(Array.isArray(payload.mutateOperations), `Payload ${index} missing mutateOperations array`);
    assert(payload.mutateOperations.length > 0, `Payload ${index} has empty mutateOperations`);
  });

  let invalidCheckTriggered = false;
  try {
    validateGoogleAdsMutatePayload({ mutateOperations: [] });
  } catch {
    invalidCheckTriggered = true;
  }

  assert(invalidCheckTriggered, "Invalid payload did not fail validation as expected.");
  console.log("Google Ads mutation contract checks passed.");
}

runContractChecks();
