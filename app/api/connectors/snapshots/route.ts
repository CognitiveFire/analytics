import { NextRequest, NextResponse } from "next/server";

import { loadConnectorSnapshots } from "@/lib/connectors";

export async function GET(request: NextRequest) {
  const clientId = request.nextUrl.searchParams.get("clientId") ?? "nordic-retail";

  try {
    const snapshots = await loadConnectorSnapshots(clientId);
    return NextResponse.json({ clientId, snapshots });
  } catch (error) {
    const message = error instanceof Error ? error.message : "unknown error";
    return NextResponse.json({ error: `Failed to load connector snapshots: ${message}` }, { status: 500 });
  }
}
