import { NextRequest, NextResponse } from "next/server";

import { AdsAuthError, authorizeAdsRequest } from "@/lib/auth/ads-auth";
import { appendAuditLog } from "@/lib/audit/audit-log-service";
import { applyApprovedExecution } from "@/lib/execution/execution-service";
import { ApprovalDecision } from "@/types/ads";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as ApprovalDecision & { accountId?: string; dryRun?: boolean };
  const accountId = body.accountId || "demo-executive";

  try {
    const auth = authorizeAdsRequest(request, {
      allowedRoles: ["executor", "admin"],
      accountId,
    });

    if (!body.recommendationId || !body.decision || !body.reviewer) {
      return NextResponse.json({ error: "Missing required approval fields." }, { status: 400 });
    }

    await appendAuditLog({
      id: `audit-${Date.now()}`,
      type: "approval_recorded",
      timestamp: new Date().toISOString(),
      accountId,
      userId: auth.userId,
      payload: {
        recommendationId: body.recommendationId,
        decision: body.decision,
        secondaryReviewer: body.secondaryReviewer,
        notes: body.notes,
      },
    });

    if (body.decision === "reject") {
      return NextResponse.json({ applied: false, reason: "Recommendation rejected by reviewer." });
    }

    const result = await applyApprovedExecution(accountId, body, { dryRun: body.dryRun ?? true });
    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof AdsAuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    return NextResponse.json({ error: "Execution failed." }, { status: 500 });
  }
}
