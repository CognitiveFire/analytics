import { NextRequest, NextResponse } from "next/server";

const ROLE_RANK: Record<string, number> = {
  viewer: 1,
  reviewer: 2,
  executor: 3,
  admin: 4,
};

function resolveRole(request: NextRequest) {
  return request.headers.get("x-signalroom-role") || process.env.SIGNALROOM_ADS_DEV_ROLE || "viewer";
}

function resolveUserId(request: NextRequest) {
  return request.headers.get("x-signalroom-user-id") || process.env.SIGNALROOM_ADS_DEV_USER || "";
}

function requiredRoleForPath(pathname: string) {
  if (pathname.includes("/api/ads/execution/apply")) return "executor";
  if (pathname.includes("/api/ads/execution/preview")) return "reviewer";
  return "viewer";
}

export function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith("/api/ads/")) {
    return NextResponse.next();
  }

  const userId = resolveUserId(request);
  if (!userId) {
    return NextResponse.json({ error: "Missing Ads API user identity." }, { status: 401 });
  }

  const role = resolveRole(request);
  const required = requiredRoleForPath(request.nextUrl.pathname);
  const roleRank = ROLE_RANK[role] || 0;
  const requiredRank = ROLE_RANK[required] || 99;

  if (roleRank < requiredRank) {
    return NextResponse.json({ error: "Insufficient role for Ads API endpoint." }, { status: 403 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/ads/:path*"],
};
