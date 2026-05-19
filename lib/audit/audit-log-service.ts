import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/server/prisma";
import { AuditLogEntry } from "@/types/ads";

const LOG_DIR = path.join(process.cwd(), ".signal-room-data");
const LOG_FILE = path.join(LOG_DIR, "ads-audit-log.json");
const HAS_DATABASE = Boolean(process.env.DATABASE_URL);

async function readLogs(): Promise<AuditLogEntry[]> {
  try {
    const raw = await readFile(LOG_FILE, "utf8");
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? (parsed as AuditLogEntry[]) : [];
  } catch {
    return [];
  }
}

export async function appendAuditLog(entry: AuditLogEntry) {
  if (HAS_DATABASE) {
    try {
      await prisma.adsAuditLog.create({
        data: {
          accountId: entry.accountId,
          userId: entry.userId,
          type: entry.type,
          payload: entry.payload as Prisma.InputJsonValue,
        },
      });
    } catch {
      // Keep API resilient if database is unavailable.
    }
  }

  await mkdir(LOG_DIR, { recursive: true });
  const current = await readLogs();
  const next = [entry, ...current].slice(0, 5000);
  await writeFile(LOG_FILE, JSON.stringify(next, null, 2), "utf8");
}

export async function listAuditLogs(accountId?: string) {
  if (HAS_DATABASE) {
    try {
      const rows = await prisma.adsAuditLog.findMany({
        where: accountId ? { accountId } : undefined,
        orderBy: { createdAt: "desc" },
        take: 200,
      });

      if (rows.length) {
        return rows.map((row) => ({
          id: row.id,
          type: row.type as AuditLogEntry["type"],
          timestamp: row.createdAt.toISOString(),
          accountId: row.accountId,
          userId: row.userId,
          payload: typeof row.payload === "object" && row.payload !== null ? (row.payload as Record<string, unknown>) : {},
        }));
      }
    } catch {
      // Fall through to file-based logs.
    }
  }

  const logs = await readLogs();
  if (!accountId) {
    return logs;
  }

  return logs.filter((entry) => entry.accountId === accountId);
}
