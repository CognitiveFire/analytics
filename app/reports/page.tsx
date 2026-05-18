import { ReportSections } from "@/components/reports/report-sections";
import { PlatformShell } from "@/components/layout/platform-shell";
import { Badge } from "@/components/ui/badge";
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

        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <Card>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <CardTitle>Latest board pack demo</CardTitle>
                <CardDescription className="mt-2">May 2026 executive deck preview for stakeholder review.</CardDescription>
              </div>
              <Badge variant="success">Ready for client</Badge>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-zinc-100 p-4 dark:bg-zinc-800/60">
                <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">Deck version</p>
                <p className="mt-2 text-xl font-semibold tracking-tight">v3.4</p>
              </div>
              <div className="rounded-2xl bg-zinc-100 p-4 dark:bg-zinc-800/60">
                <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">Slides</p>
                <p className="mt-2 text-xl font-semibold tracking-tight">32</p>
              </div>
              <div className="rounded-2xl bg-zinc-100 p-4 dark:bg-zinc-800/60">
                <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">Narrative confidence</p>
                <p className="mt-2 text-xl font-semibold tracking-tight">91%</p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-zinc-200/80 bg-white/75 p-4 dark:border-zinc-800 dark:bg-zinc-900/70">
              <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">Executive opening narrative</p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                Growth remains healthy, but margin efficiency softened in mid-funnel paid acquisition. The recommended
                plan is to reallocate budget into branded demand capture and high-intent non-brand clusters while
                accelerating SEO technical fixes on converting service templates.
              </p>
            </div>
          </Card>

          <Card>
            <CardTitle>Distribution and approvals</CardTitle>
            <CardDescription className="mt-2">Demo workflow status for report delivery and sign-off.</CardDescription>

            <div className="mt-5 space-y-3">
              <div className="rounded-2xl border border-zinc-200/80 p-4 dark:border-zinc-800">
                <p className="text-sm font-medium">Strategy lead review</p>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Approved 18 May 2026</p>
              </div>
              <div className="rounded-2xl border border-zinc-200/80 p-4 dark:border-zinc-800">
                <p className="text-sm font-medium">Client services QA</p>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Final checks in progress</p>
              </div>
              <div className="rounded-2xl border border-zinc-200/80 p-4 dark:border-zinc-800">
                <p className="text-sm font-medium">Scheduled distribution</p>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">20 May 2026, 08:30 CET</p>
              </div>
            </div>
          </Card>
        </div>

        <Card>
          <CardTitle>Executive reporting timeline</CardTitle>
          <CardDescription className="mt-2">
            Demo schedule for recurring board reporting and operational briefings.
          </CardDescription>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[820px] text-left text-sm">
              <thead className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                <tr>
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Report type</th>
                  <th className="pb-3">Audience</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Owner</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["20 May 2026", "Monthly board pack", "Executive leadership", "Scheduled", "Strategy Director"],
                  ["22 May 2026", "Weekly operations brief", "Channel leads", "Drafting", "Performance Lead"],
                  ["27 May 2026", "Attribution checkpoint", "Data and analytics", "In review", "Analytics Engineer"],
                  ["31 May 2026", "SEO technical briefing", "SEO and development", "Planned", "SEO Strategist"],
                ].map((row) => (
                  <tr className="border-t border-zinc-200/70 align-top dark:border-zinc-800" key={row[0] + row[1]}>
                    <td className="py-4 pr-3 text-zinc-700 dark:text-zinc-200">{row[0]}</td>
                    <td className="py-4 pr-3 font-medium text-zinc-900 dark:text-zinc-100">{row[1]}</td>
                    <td className="py-4 pr-3 text-zinc-600 dark:text-zinc-300">{row[2]}</td>
                    <td className="py-4 pr-3">
                      <Badge variant={row[3] === "Scheduled" ? "success" : row[3] === "Drafting" ? "warning" : "neutral"}>
                        {row[3]}
                      </Badge>
                    </td>
                    <td className="py-4 text-zinc-600 dark:text-zinc-300">{row[4]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <ReportSections />
      </section>
    </PlatformShell>
  );
}
