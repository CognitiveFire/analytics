import { ExecutiveReportPortal } from "@/components/reports/executive-report-portal";
import { ReportMethodologyGuide } from "@/components/reports/report-methodology-guide";
import { PlatformShell } from "@/components/layout/platform-shell";
import { resolveAdsLanguage } from "@/lib/ads/ui-language";

type ReportsPageProps = {
  searchParams?: Promise<{ lang?: string }>;
};

export default async function ReportsPage({ searchParams }: ReportsPageProps) {
  const params = await searchParams;
  const lang = resolveAdsLanguage(params?.lang);

  return (
    <PlatformShell>
      <section className="space-y-6">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">{lang === "nb" ? "Rapporteringsoversikt" : "Reporting overview"}</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">{lang === "nb" ? "Lederportal for rapportering" : "Executive reporting portal"}</h1>
          <p className="mt-3 max-w-3xl text-zinc-600 dark:text-zinc-300">
            {lang === "nb"
              ? "Denne rapporten viser resultatutvikling, kanalendringer, viktigste risikoer og anbefalte neste tiltak for valgt kunde."
              : "This report shows performance trends, channel changes, key risks, and recommended next actions for the selected client."}
          </p>
        </div>

        <ReportMethodologyGuide lang={lang} />
        <ExecutiveReportPortal />
      </section>
    </PlatformShell>
  );
}
