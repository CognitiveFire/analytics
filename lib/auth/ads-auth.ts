import { NextRequest } from "next/server";

export type AdsRole = "viewer" | "reviewer" | "executor" | "admin";

export interface AdsRequestContext {
  userId: string;
  role: AdsRole;
  accountIds: string[];
}

export class AdsAuthError extends Error {
  status: number;

  constructor(message: string, status = 403) {
    super(message);
    this.name = "AdsAuthError";
    this.status = status;
  }
}

function parseRole(value: string | null): AdsRole {
  if (value === "viewer" || value === "reviewer" || value === "executor" || value === "admin") {
    return value;
  }

  return "viewer";
}

function parseAccountIds(value: string | null): string[] {
  if (!value) {
    return ["demo-executive"];
  }

  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function getAdsRequestContext(request: NextRequest): AdsRequestContext {
  const userId = request.headers.get("x-signalroom-user-id") || process.env.SIGNALROOM_ADS_DEV_USER || "dev-user";
  const role = parseRole(request.headers.get("x-signalroom-role") || process.env.SIGNALROOM_ADS_DEV_ROLE || "admin");
  const accountIds = parseAccountIds(request.headers.get("x-signalroom-account-ids") || process.env.SIGNALROOM_ADS_DEV_ACCOUNTS || "demo-executive");

  if (!userId) {
    throw new AdsAuthError("Missing user identity for Ads API.", 401);
  }

  return { userId, role, accountIds };
}

export function requireRole(context: AdsRequestContext, allowedRoles: AdsRole[]) {
  if (!allowedRoles.includes(context.role)) {
    throw new AdsAuthError("User role not permitted for this operation.", 403);
  }
}

export function requireAccountAccess(context: AdsRequestContext, accountId: string) {
  if (!context.accountIds.includes(accountId) && context.role !== "admin") {
    throw new AdsAuthError("Account access denied for this user.", 403);
  }
}

export function authorizeAdsRequest(
  request: NextRequest,
  options: {
    allowedRoles: AdsRole[];
    accountId: string;
  }
): AdsRequestContext {
  const context = getAdsRequestContext(request);
  requireRole(context, options.allowedRoles);
  requireAccountAccess(context, options.accountId);
  return context;
}
