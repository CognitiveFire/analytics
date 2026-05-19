import { NextRequest, NextResponse } from "next/server";

import { detectScreamingFrogFileKey, processScreamingFrogExports } from "@/lib/seo/screaming-frog";
import { getSeoUploadState, upsertSeoUploadState } from "@/lib/server/seo-upload-state-store";

export async function GET(request: NextRequest) {
  const account = request.nextUrl.searchParams.get("account");

  if (!account) {
    return NextResponse.json({ error: "account is required" }, { status: 400 });
  }

  try {
    const result = await getSeoUploadState(account);
    return NextResponse.json({ account, result });
  } catch (error) {
    const message = error instanceof Error ? error.message : "unknown error";
    return NextResponse.json({ error: `Failed to load SEO upload state: ${message}` }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const accountValue = formData.get("account");
  const account = typeof accountValue === "string" ? accountValue.trim() : "";
  const files = formData.getAll("files");

  if (!account) {
    return NextResponse.json({ error: "account is required" }, { status: 400 });
  }

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
    const previous = await getSeoUploadState(account);
    const uploadFileNames = csvFiles.reduce<Record<string, string>>((acc, file) => {
      const detectedKey = detectScreamingFrogFileKey(file.name);
      if (detectedKey) {
        acc[detectedKey] = file.name;
      }
      return acc;
    }, {});

    const nextResult = {
      ...processScreamingFrogExports(csvFiles),
      uploadedFileNames: {
        ...(previous?.uploadedFileNames ?? {}),
        ...uploadFileNames,
      },
    };

    const mergedFiles = nextResult.files.map((file) => {
      const previousFile = previous?.files.find((item) => item.key === file.key);
      if (!previousFile) {
        return file;
      }

      if (file.status === "processed") {
        return file;
      }

      if (previousFile.status === "processed") {
        return previousFile;
      }

      return file;
    });

    const result = {
      ...nextResult,
      files: mergedFiles,
    };

    await upsertSeoUploadState({
      account,
      result,
    });

    return NextResponse.json({ result });
  } catch (error) {
    const message = error instanceof Error ? error.message : "unknown error";
    return NextResponse.json({ error: `Failed to process Screaming Frog exports: ${message}` }, { status: 500 });
  }
}
