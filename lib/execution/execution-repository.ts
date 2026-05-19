import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/server/prisma";
import { ExecutionChange, RollbackRecord } from "@/types/ads";

const HAS_DATABASE = Boolean(process.env.DATABASE_URL);

export async function saveExecutionRecord(input: {
  accountId: string;
  recommendationId: string;
  approvedBy: string;
  changeSet: ExecutionChange[];
  rollback: RollbackRecord;
}) {
  if (!HAS_DATABASE) {
    return;
  }

  try {
    await prisma.adsExecution.create({
      data: {
        accountId: input.accountId,
        recommendationId: input.recommendationId,
        approvedBy: input.approvedBy,
        changeSet: input.changeSet as unknown as Prisma.InputJsonValue,
        rollbackMeta: input.rollback as unknown as Prisma.InputJsonValue,
      },
    });
  } catch {
    // Keep API resilient when DB is not configured.
  }
}
