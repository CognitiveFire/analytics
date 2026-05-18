import { NextRequest, NextResponse } from "next/server";

import { getWizardState, upsertWizardState } from "@/lib/server/connector-wizard-state-store";

export async function GET(request: NextRequest) {
  const clientId = request.nextUrl.searchParams.get("clientId");

  if (!clientId) {
    return NextResponse.json({ error: "clientId is required" }, { status: 400 });
  }

  try {
    const state = await getWizardState(clientId);
    return NextResponse.json({ clientId, state });
  } catch (error) {
    const message = error instanceof Error ? error.message : "unknown error";
    return NextResponse.json({ error: `Failed to load wizard state: ${message}` }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      clientId?: string;
      step?: number;
      completed?: boolean;
      state?: unknown;
    };

    if (!body.clientId || typeof body.step !== "number" || typeof body.completed !== "boolean" || !body.state) {
      return NextResponse.json({ error: "clientId, step, completed, and state are required" }, { status: 400 });
    }

    const saved = await upsertWizardState({
      clientId: body.clientId,
      step: body.step,
      completed: body.completed,
      state: body.state as Parameters<typeof upsertWizardState>[0]["state"],
    });

    return NextResponse.json({ state: saved });
  } catch (error) {
    const message = error instanceof Error ? error.message : "unknown error";
    return NextResponse.json({ error: `Failed to save wizard state: ${message}` }, { status: 500 });
  }
}
