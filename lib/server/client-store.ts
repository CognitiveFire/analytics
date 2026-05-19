import "server-only";

import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

import { Client } from "@/types";

const DATA_DIR = path.join(process.cwd(), ".signal-room-data");
const DATA_FILE = path.join(DATA_DIR, "clients.json");

export async function getStoredClients(): Promise<Client[]> {
  try {
    const raw = await readFile(DATA_FILE, "utf-8");
    return JSON.parse(raw) as Client[];
  } catch {
    return [];
  }
}

export async function saveClient(client: Client): Promise<Client> {
  await mkdir(DATA_DIR, { recursive: true });
  const existing = await getStoredClients();
  const updated = [...existing.filter((item) => item.id !== client.id), client];
  await writeFile(DATA_FILE, JSON.stringify(updated, null, 2), "utf-8");
  return client;
}
