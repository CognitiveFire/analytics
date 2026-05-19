import { NextRequest, NextResponse } from "next/server";

import { saveClient } from "@/lib/server/client-store";
import { Client } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Partial<Client>;

    const name = typeof body.name === "string" ? body.name.trim() : "";
    const industry = typeof body.industry === "string" ? body.industry.trim() : "";
    const region = typeof body.region === "string" ? body.region.trim() : "";

    if (!name || !industry || !region) {
      return NextResponse.json({ error: "name, industry, and region are required" }, { status: 400 });
    }

    const logoMark =
      typeof body.logoMark === "string" && body.logoMark.trim()
        ? body.logoMark.trim().slice(0, 2).toUpperCase()
        : name
            .split(" ")
            .slice(0, 2)
            .map((w) => w[0])
            .join("")
            .toUpperCase();

    const client: Client = {
      id: name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, ""),
      name,
      industry,
      region,
      accountHealth: 75,
      reportStatus: "scheduled",
      logoMark,
    };

    const saved = await saveClient(client);
    return NextResponse.json({ client: saved }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "unknown error";
    return NextResponse.json({ error: `Failed to save client: ${message}` }, { status: 500 });
  }
}
