import { validateGoogleAdsMutatePayload } from "@/lib/google-ads/mutation-contract";

interface GoogleAdsMutationRequest {
  customerId: string;
  mutatePayload: Record<string, unknown>;
  dryRun?: boolean;
}

interface GoogleAdsMutationResult {
  requestId: string;
  raw: unknown;
}

function requiredEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }

  return value;
}

export function isLiveMutationMode() {
  return process.env.SIGNALROOM_ADS_MUTATION_MODE === "live";
}

export async function executeGoogleAdsMutation(request: GoogleAdsMutationRequest): Promise<GoogleAdsMutationResult> {
  validateGoogleAdsMutatePayload(request.mutatePayload);

  if (request.dryRun || !isLiveMutationMode()) {
    return {
      requestId: `dry-run-${Date.now()}`,
      raw: {
        dryRun: true,
        customerId: request.customerId,
        payload: request.mutatePayload,
      },
    };
  }

  const accessToken = requiredEnv("GOOGLE_ADS_ACCESS_TOKEN");
  const developerToken = requiredEnv("GOOGLE_ADS_DEVELOPER_TOKEN");
  const apiVersion = process.env.GOOGLE_ADS_API_VERSION || "v18";
  const loginCustomerId = process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID;

  const response = await fetch(`https://googleads.googleapis.com/${apiVersion}/customers/${request.customerId}/googleAds:mutate`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "developer-token": developerToken,
      "content-type": "application/json",
      ...(loginCustomerId ? { "login-customer-id": loginCustomerId } : {}),
    },
    body: JSON.stringify(request.mutatePayload),
  });

  const raw = await response.json();

  if (!response.ok) {
    throw new Error(`Google Ads mutation failed: ${JSON.stringify(raw)}`);
  }

  return {
    requestId: String((raw as Record<string, unknown>).requestId || `live-${Date.now()}`),
    raw,
  };
}
