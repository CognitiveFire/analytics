import { NextRequest, NextResponse } from "next/server";

import { AdsAuthError, authorizeAdsRequest } from "@/lib/auth/ads-auth";
import { listAuditLogs } from "@/lib/audit/audit-log-service";

export async function GET(request: NextRequest) {
  const accountId = request.nextUrl.searchParams.get("accountId") || "demo-executive";

  try {
    authorizeAdsRequest(request, {
      allowedRoles: ["viewer", "reviewer", "executor", "admin"],
      accountId,
    });

    const entries = await listAuditLogs(accountId);
    return NextResponse.json({ entries });
  } catch (error) {
    if (error instanceof AdsAuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    return NextResponse.json({ error: "Failed to load audit history." }, { status: 500 });
  }
}
