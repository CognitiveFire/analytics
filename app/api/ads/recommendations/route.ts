import { NextRequest, NextResponse } from "next/server";

import { AdsAuthError, authorizeAdsRequest } from "@/lib/auth/ads-auth";
import { appendAuditLog } from "@/lib/audit/audit-log-service";
import { getPersistedOrGenerateRecommendations } from "@/lib/recommendations/recommendation-generator";
import { resolveAdsAccountId } from "@/lib/server/ads-active-account";

export async function GET(request: NextRequest) {
  const accountId = await resolveAdsAccountId(request.nextUrl.searchParams.get("accountId"));

  try {
    const auth = authorizeAdsRequest(request, {
      allowedRoles: ["viewer", "reviewer", "executor", "admin"],
      accountId,
    });

    const payload = await getPersistedOrGenerateRecommendations(accountId);

    await appendAuditLog({
      id: `audit-${Date.now()}`,
      type: "recommendations_generated",
      timestamp: new Date().toISOString(),
      accountId,
      userId: auth.userId,
      payload: { recommendationCount: payload.recommendations.length },
    });

    return NextResponse.json(payload);
  } catch (error) {
    if (error instanceof AdsAuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    return NextResponse.json({ error: "Failed to generate recommendations." }, { status: 500 });
  }
}
