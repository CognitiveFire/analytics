import { NextRequest, NextResponse } from "next/server";

import { AdsAuthError, authorizeAdsRequest } from "@/lib/auth/ads-auth";
import { appendAuditLog } from "@/lib/audit/audit-log-service";
import { getPersistedOrGenerateRecommendations } from "@/lib/recommendations/recommendation-generator";

export async function GET(request: NextRequest) {
  const accountId = request.nextUrl.searchParams.get("accountId") || "demo-executive";

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
