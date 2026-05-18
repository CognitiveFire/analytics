import { NextRequest, NextResponse } from "next/server";

import { processScreamingFrogExports } from "@/lib/seo/screaming-frog";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const files = formData.getAll("files");

  const csvFiles = await Promise.all(
    files
      .filter((value): value is File => value instanceof File)
      .map(async (file) => ({
        name: file.name,
        content: await file.text(),
      }))
  );

  if (csvFiles.length === 0) {
    return NextResponse.json({ error: "Upload at least one Screaming Frog CSV export." }, { status: 400 });
  }

  try {
    const result = processScreamingFrogExports(csvFiles);
    return NextResponse.json({ result });
  } catch (error) {
    const message = error instanceof Error ? error.message : "unknown error";
    return NextResponse.json({ error: `Failed to process Screaming Frog exports: ${message}` }, { status: 500 });
  }
}
