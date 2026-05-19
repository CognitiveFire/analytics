export function buildAddNegativeKeywordsPayload(keywords: string[]) {
  return {
    mutateOperations: keywords.map((keyword) => ({
      adGroupCriterionOperation: {
        create: {
          keyword: { text: keyword, matchType: "BROAD" },
          negative: true,
        },
      },
    })),
  };
}

export function buildUpdateCampaignBudgetPayload(to: number) {
  return {
    mutateOperations: [
      {
        campaignBudgetOperation: {
          update: {
            amountMicros: Math.round(to * 1_000_000),
          },
          updateMask: "amount_micros",
        },
      },
    ],
  };
}

export function buildPauseKeywordsPayload(keywordIds: string[]) {
  return {
    mutateOperations: keywordIds.map((keywordId) => ({
      adGroupCriterionOperation: {
        update: {
          resourceName: keywordId,
          status: "PAUSED",
        },
        updateMask: "status",
      },
    })),
  };
}

export function buildUpdateBidStrategyPayload(campaignResourceName: string, strategy: string) {
  return {
    mutateOperations: [
      {
        campaignOperation: {
          update: {
            resourceName: campaignResourceName,
            biddingStrategyType: strategy.toUpperCase(),
          },
          updateMask: "bidding_strategy_type",
        },
      },
    ],
  };
}

export function buildUpdateAudienceTargetsPayload(campaignResourceName: string, audienceSegments: string[]) {
  return {
    mutateOperations: audienceSegments.map((segment) => ({
      campaignCriterionOperation: {
        create: {
          campaign: campaignResourceName,
          userInterest: { userInterestCategory: segment },
        },
      },
    })),
  };
}
