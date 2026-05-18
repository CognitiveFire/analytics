import "server-only";

import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

import { ScreamingFrogUploadResult, ScreamingFrogUploadedFileNames } from "@/types";

const DATA_DIR = path.join(process.cwd(), ".signal-room-data");
const DATA_FILE = path.join(DATA_DIR, "seo-upload-state.json");

interface SeoUploadRecord {
  account: string;
  result: ScreamingFrogUploadResult;
  updatedAt: string;
}

interface SeoUploadStateStorePayload {
  account: string;
  result: ScreamingFrogUploadResult;
}

function normalizeUploadedFileNames(fileNames: ScreamingFrogUploadedFileNames | undefined): ScreamingFrogUploadedFileNames {
  if (!fileNames) {
    return {};
  }

  return fileNames;
}

function normalizeRecord(record: Partial<SeoUploadRecord> | undefined, account: string): SeoUploadRecord {
  const result = record?.result;

  return {
    account,
    result: {
      projectName: result?.projectName ?? null,
      crawlDate: result?.crawlDate ?? null,
      compareLabel: result?.compareLabel ?? null,
      fileCount: typeof result?.fileCount === "number" ? result.fileCount : 0,
      files: result?.files ?? [],
      uploadedFileNames: normalizeUploadedFileNames(result?.uploadedFileNames),
      summary: result?.summary ?? {
        totalUrls: 0,
        indexableUrls: 0,
        noindexUrls: 0,
        redirectUrls: 0,
        missingTitles: 0,
        duplicateTitles: 0,
        missingH1: 0,
        duplicateH1: 0,
        canonicalIssues: 0,
        inlinks: 0,
      },
      notes: result?.notes ?? [],
    },
    updatedAt: new Date().toISOString(),
  };
}

async function readStoreFile(): Promise<Record<string, SeoUploadRecord>> {
  try {
    const raw = await readFile(DATA_FILE, "utf8");
    return JSON.parse(raw) as Record<string, SeoUploadRecord>;
  } catch {
    return {};
  }
}

async function writeStoreFile(store: Record<string, SeoUploadRecord>) {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(DATA_FILE, JSON.stringify(store, null, 2), "utf8");
}

export async function getSeoUploadState(account: string): Promise<ScreamingFrogUploadResult | null> {
  const store = await readStoreFile();
  const record = store[account];

  if (!record) {
    return null;
  }

  return record.result;
}

export async function upsertSeoUploadState(payload: SeoUploadStateStorePayload): Promise<SeoUploadRecord> {
  const store = await readStoreFile();
  const record = normalizeRecord(
    {
      account: payload.account,
      result: payload.result,
    },
    payload.account
  );

  store[payload.account] = record;
  await writeStoreFile(store);
  return record;
}
