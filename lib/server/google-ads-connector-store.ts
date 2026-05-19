import "server-only";

import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

export interface GoogleAdsConnectorRecord {
  clientId: string;
  connected: boolean;
  selectedAccounts: string[];
  updatedAt: string;
}

interface UpsertGoogleAdsConnectorPayload {
  clientId: string;
  connected: boolean;
  selectedAccounts: string[];
}

const DATA_DIR = path.join(process.cwd(), ".signal-room-data");
const DATA_FILE = path.join(DATA_DIR, "google-ads-connector-state.json");

async function readStoreFile(): Promise<Record<string, GoogleAdsConnectorRecord>> {
  try {
    const raw = await readFile(DATA_FILE, "utf8");
    return JSON.parse(raw) as Record<string, GoogleAdsConnectorRecord>;
  } catch {
    return {};
  }
}

async function writeStoreFile(store: Record<string, GoogleAdsConnectorRecord>) {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(DATA_FILE, JSON.stringify(store, null, 2), "utf8");
}

export async function getGoogleAdsConnectorState(clientId: string): Promise<GoogleAdsConnectorRecord | null> {
  const store = await readStoreFile();
  return store[clientId] ?? null;
}

export async function listGoogleAdsConnectorStates(): Promise<GoogleAdsConnectorRecord[]> {
  const store = await readStoreFile();
  return Object.values(store).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export async function upsertGoogleAdsConnectorState(payload: UpsertGoogleAdsConnectorPayload): Promise<GoogleAdsConnectorRecord> {
  const store = await readStoreFile();

  const record: GoogleAdsConnectorRecord = {
    clientId: payload.clientId,
    connected: payload.connected,
    selectedAccounts: payload.selectedAccounts,
    updatedAt: new Date().toISOString(),
  };

  store[payload.clientId] = record;
  await writeStoreFile(store);
  return record;
}
