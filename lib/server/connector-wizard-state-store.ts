import "server-only";

import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

import { connectorWizardSources } from "@/lib/connectors/wizard";
import { ConnectorWizardSource } from "@/lib/connectors/wizard";

const DATA_DIR = path.join(process.cwd(), ".signal-room-data");
const DATA_FILE = path.join(DATA_DIR, "connector-wizard-state.json");

type SourceKey = ConnectorWizardSource["source"];

interface WizardStateItem {
  enabled: boolean;
  accessMode?: string;
  accessDetail: string;
  selectedAccounts: string[];
}

export type WizardState = Record<SourceKey, WizardStateItem>;

export interface PersistedWizardState {
  step: number;
  completed: boolean;
  state: WizardState;
}

export interface WizardStateRecord extends PersistedWizardState {
  clientId: string;
  updatedAt: string;
}

export interface WizardStateStorePayload {
  clientId: string;
  step: number;
  completed: boolean;
  state: WizardState;
}

function createInitialState(): WizardState {
  return connectorWizardSources.reduce<WizardState>((acc, source) => {
    acc[source.source] = {
      enabled: false,
      accessMode: source.accessModes[0],
      accessDetail: "",
      selectedAccounts: [],
    };

    return acc;
  }, {} as WizardState);
}

function normalizeRecord(record: Partial<WizardStateRecord> | undefined, clientId: string): WizardStateRecord {
  return {
    clientId,
    step: typeof record?.step === "number" ? record.step : 0,
    completed: Boolean(record?.completed),
    state: record?.state ?? createInitialState(),
    updatedAt: new Date().toISOString(),
  };
}

async function readStoreFile(): Promise<Record<string, WizardStateRecord>> {
  try {
    const raw = await readFile(DATA_FILE, "utf8");
    return JSON.parse(raw) as Record<string, WizardStateRecord>;
  } catch {
    return {};
  }
}

async function writeStoreFile(store: Record<string, WizardStateRecord>) {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(DATA_FILE, JSON.stringify(store, null, 2), "utf8");
}

export async function getWizardState(clientId: string): Promise<PersistedWizardState | null> {
  const store = await readStoreFile();
  const record = store[clientId];

  if (!record) {
    return null;
  }

  return {
    step: record.step,
    completed: record.completed,
    state: record.state,
  };
}

export async function upsertWizardState(payload: WizardStateStorePayload): Promise<WizardStateRecord> {
  const store = await readStoreFile();
  const record = normalizeRecord(
    {
      clientId: payload.clientId,
      step: payload.step,
      completed: payload.completed,
      state: payload.state,
    },
    payload.clientId
  );

  store[payload.clientId] = record;
  await writeStoreFile(store);
  return record;
}
