import { NextRequest, NextResponse } from "next/server";

import { AdsAuthError, authorizeAdsRequest } from "@/lib/auth/ads-auth";
import { buildExecutionPreview } from "@/lib/execution/execution-service";
import { resolveAdsAccountId } from "@/lib/server/ads-active-account";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as { recommendationId?: string; accountId?: string };
  const recommendationId = body.recommendationId || "rec-1";
  const accountId = await resolveAdsAccountId(body.accountId);

  try {
    authorizeAdsRequest(request, {
      allowedRoles: ["reviewer", "executor", "admin"],
      accountId,
    });

    const preview = await buildExecutionPreview(recommendationId);
    return NextResponse.json(preview);
  } catch (error) {
    if (error instanceof AdsAuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    return NextResponse.json({ error: "Unable to build execution preview." }, { status: 500 });
  }
}
