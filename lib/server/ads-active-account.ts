import "server-only";

import { listGoogleAdsConnectorStates } from "@/lib/server/google-ads-connector-store";

export const DEFAULT_ADS_ACCOUNT_ID = "demo-executive";

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
