import "server-only";

import { DEMO_ACCOUNT_ID } from "@/lib/demo-account";
import { listGoogleAdsConnectorStates } from "@/lib/server/google-ads-connector-store";

export const DEFAULT_ADS_ACCOUNT_ID = DEMO_ACCOUNT_ID;

export function isDemoAdsAccount(accountId: string): boolean {
  return accountId === DEFAULT_ADS_ACCOUNT_ID;
}

export async function resolveActiveAdsAccountId(): Promise<string> {
  const states = await listGoogleAdsConnectorStates();
  const connected = states.find((state) => state.connected && state.selectedAccounts.length > 0);
  return connected?.clientId ?? DEFAULT_ADS_ACCOUNT_ID;
}

export async function resolveAdsAccountId(maybeAccountId: string | null | undefined): Promise<string> {
  const candidate = maybeAccountId?.trim();
  if (candidate) {
    return candidate;
  }

  return resolveActiveAdsAccountId();
}
