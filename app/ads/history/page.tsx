import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { listAuditLogs } from "@/lib/audit/audit-log-service";
import { mockAuditLogEntries } from "@/lib/mock-data/ads";
import { resolveAdsAccountId } from "@/lib/server/ads-active-account";

type AdsHistoryPageProps = {
  searchParams?: Promise<{ accountId?: string }>;
};

export default async function AdsHistoryPage({ searchParams }: AdsHistoryPageProps) {
  const params = await searchParams;
  const accountId = await resolveAdsAccountId(params?.accountId);
  const stored = await listAuditLogs(accountId);
  const entries = stored.length ? stored : mockAuditLogEntries;

  return (
    <Card className="border-zinc-200/90 bg-white/80 dark:bg-zinc-900/70">
      <CardTitle>Audit History</CardTitle>
      <CardDescription className="mt-2">Full traceability across recommendation generation, approvals, execution, and rollback metadata.</CardDescription>

      <div className="mt-5 space-y-3 text-sm">
        {entries.map((entry) => (
          <div className="rounded-2xl border border-zinc-200/80 bg-white/80 px-4 py-3" key={entry.id}>
            <p className="font-semibold">{entry.type}</p>
            <p className="text-zinc-600">{new Date(entry.timestamp).toLocaleString("en-GB")}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
