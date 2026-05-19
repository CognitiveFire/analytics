import {
  AdsBidStrategySummary,
  AdsBudgetSummary,
  AdsCampaign,
  AdsConversionSummary,
  AdsKeyword,
  AdsLandingPageMetric,
  AdsSearchTerm,
} from "@/types/ads";
import {
  mockAdsBidStrategies,
  mockBudgetSummaries,
  mockAdsCampaigns,
  mockAdsConversions,
  mockAdsKeywords,
  mockAdsSearchTerms,
  mockLandingPageMetrics,
} from "@/lib/mock-data/ads";
import { isDemoAdsAccount } from "@/lib/server/ads-active-account";

function byAccount<T extends { accountId?: string }>(rows: T[], accountId: string): T[] {
  return rows.filter((row) => !row.accountId || row.accountId === accountId);
}

export async function fetchCampaigns(accountId: string): Promise<AdsCampaign[]> {
  return byAccount(mockAdsCampaigns, accountId);
}

export async function fetchKeywords(accountId: string): Promise<AdsKeyword[]> {
  const campaigns = await fetchCampaigns(accountId);
  const campaignIds = new Set(campaigns.map((campaign) => campaign.id));
  return mockAdsKeywords.filter((keyword) => campaignIds.has(keyword.campaignId));
}

export async function fetchSearchTerms(accountId: string): Promise<AdsSearchTerm[]> {
  const campaigns = await fetchCampaigns(accountId);
  const campaignIds = new Set(campaigns.map((campaign) => campaign.id));
  return mockAdsSearchTerms.filter((term) => campaignIds.has(term.campaignId));
}

export async function fetchConversions(accountId: string): Promise<AdsConversionSummary> {
  if (mockAdsConversions.accountId === accountId) {
    return mockAdsConversions;
  }

  if (!isDemoAdsAccount(accountId)) {
    return {
      accountId,
      conversionCount30d: 0,
      primaryConversionCount30d: 0,
      duplicateConversionRate: 0,
      offlineImportCoverage: 0,
    };
  }

  return {
    ...mockAdsConversions,
    accountId,
  };
}

export async function fetchBidStrategies(accountId: string): Promise<AdsBidStrategySummary[]> {
  const campaigns = await fetchCampaigns(accountId);
  const campaignIds = new Set(campaigns.map((campaign) => campaign.id));
  return mockAdsBidStrategies.filter((strategy) => campaignIds.has(strategy.campaignId));
}

export async function fetchLandingPageMetrics(accountId: string): Promise<AdsLandingPageMetric[]> {
  const campaigns = await fetchCampaigns(accountId);
  const campaignIds = new Set(campaigns.map((campaign) => campaign.id));
  return mockLandingPageMetrics.filter((metric) => campaignIds.has(metric.campaignId));
}

export async function fetchBudgets(accountId: string): Promise<AdsBudgetSummary[]> {
  const campaigns = await fetchCampaigns(accountId);
  const campaignIds = new Set(campaigns.map((campaign) => campaign.id));
  return mockBudgetSummaries.filter((budget) => campaignIds.has(budget.campaignId));
}
