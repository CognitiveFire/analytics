import { ExecutiveReportPortal } from "@/components/reports/executive-report-portal";
import { ReportMethodologyGuide } from "@/components/reports/report-methodology-guide";
import { PlatformShell } from "@/components/layout/platform-shell";

export default function ReportsPage() {
  return (
    <PlatformShell>
      <section className="space-y-6">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">Rapporteringsoversikt</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Lederportal for rapportering</h1>
          <p className="mt-3 max-w-3xl text-zinc-600 dark:text-zinc-300">
            Denne rapporten viser resultatutvikling, kanalendringer, viktigste risikoer og anbefalte neste tiltak for
            valgt kunde.
          </p>
        </div>

        <ReportMethodologyGuide />
        <ExecutiveReportPortal />
      </section>
    </PlatformShell>
  );
}
