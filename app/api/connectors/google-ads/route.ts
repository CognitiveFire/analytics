import { NextRequest, NextResponse } from "next/server";

import {
  getGoogleAdsConnectorState,
  listGoogleAdsConnectorStates,
  upsertGoogleAdsConnectorState,
} from "@/lib/server/google-ads-connector-store";

export async function GET(request: NextRequest) {
  const clientId = request.nextUrl.searchParams.get("clientId");

  try {
    if (clientId) {
      const state = await getGoogleAdsConnectorState(clientId);
      return NextResponse.json({ clientId, state });
    }

    const states = await listGoogleAdsConnectorStates();
    return NextResponse.json({ states });
  } catch (error) {
    const message = error instanceof Error ? error.message : "unknown error";
    return NextResponse.json({ error: `Failed to load Google Ads connector state: ${message}` }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      clientId?: string;
      connected?: boolean;
      selectedAccounts?: string[];
    };

    if (!body.clientId || typeof body.connected !== "boolean" || !Array.isArray(body.selectedAccounts)) {
      return NextResponse.json({ error: "clientId, connected, and selectedAccounts are required" }, { status: 400 });
    }

    const saved = await upsertGoogleAdsConnectorState({
      clientId: body.clientId,
      connected: body.connected,
      selectedAccounts: body.selectedAccounts,
    });

    return NextResponse.json({ state: saved });
  } catch (error) {
    const message = error instanceof Error ? error.message : "unknown error";
    return NextResponse.json({ error: `Failed to save Google Ads connector state: ${message}` }, { status: 500 });
  }
}
