import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { listAuditLogs } from "@/lib/audit/audit-log-service";
import { mockAuditLogEntries } from "@/lib/mock-data/ads";

export default async function AdsHistoryPage() {
  const stored = await listAuditLogs("demo-executive");
  const entries = stored.length ? stored : mockAuditLogEntries;

  return (
    <Card className="border-zinc-200/90 bg-[#f2f0ea]">
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
