import { ReportSections } from "@/components/reports/report-sections";
import { PlatformShell } from "@/components/layout/platform-shell";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

export default function ReportsPage() {
  return (
    <PlatformShell>
      <section className="space-y-6">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">Reporting Experience</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Executive reporting portal</h1>
          <p className="mt-3 max-w-3xl text-zinc-600 dark:text-zinc-300">
            Signal Room provides premium branded reporting layered over existing analytics infrastructure, built for
            strategic clarity and stakeholder communication.
          </p>
        </div>

        <Card>
          <CardTitle>Report Navigation</CardTitle>
          <CardDescription className="mt-2">
            Monthly board packs, weekly operational briefs, anomaly alerts, and strategic opportunity snapshots.
          </CardDescription>
        </Card>

        <ReportSections />
      </section>
    </PlatformShell>
  );
}
