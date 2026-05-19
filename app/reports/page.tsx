import { ExecutiveReportPortal } from "@/components/reports/executive-report-portal";
import { ReportMethodologyGuide } from "@/components/reports/report-methodology-guide";
import { PlatformShell } from "@/components/layout/platform-shell";
import { resolveAdsLanguage } from "@/lib/ads/ui-language";
import { getTranslation } from "@/lib/translations/use-translation";

type ReportsPageProps = {
  searchParams?: Promise<{ lang?: string }>;
};

export default async function ReportsPage({ searchParams }: ReportsPageProps) {
  const params = await searchParams;
  const lang = resolveAdsLanguage(params?.lang);
  const t = (key: string, fallback?: string) => getTranslation(lang, key, fallback);

  return (
    <PlatformShell>
      <section className="space-y-6">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">{t("pages.reports.subtitle", "Reporting overview")}</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">{t("pages.reports.title", "Executive reporting portal")}</h1>
          <p className="mt-3 max-w-3xl text-zinc-600 dark:text-zinc-300">
            {t("pages.reports.description", "This report shows performance trends, channel changes, key risks, and recommended next actions for the selected client.")}
          </p>
        </div>

        <ReportMethodologyGuide lang={lang} />
        <ExecutiveReportPortal lang={lang} />
      </section>
    </PlatformShell>
  );
}
