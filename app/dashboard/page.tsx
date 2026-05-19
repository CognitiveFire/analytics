"use client";

import { useEffect, useMemo, useState } from "react";

import { KpiGrid } from "@/components/dashboard/kpi-grid";
import { KpiTrendOverview } from "@/components/charts/kpi-trend-overview";
import { LandingPagePerformanceChart } from "@/components/charts/landing-page-performance-chart";
import { TrendChart } from "@/components/charts/trend-chart";
import { AIInsightPanel } from "@/components/insights/ai-insight-panel";
import { IntelligenceModules } from "@/components/insights/intelligence-modules";
import { PlatformShell } from "@/components/layout/platform-shell";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { usePlatformStore } from "@/hooks/use-platform-store";
import { resolveAdsLanguage } from "@/lib/ads/ui-language";
import { DEMO_ACCOUNT_ID } from "@/lib/demo-account";
import { clients } from "@/lib/mock-data/clients";
import { trendHistory } from "@/lib/mock-data/metrics";
import { useTranslation } from "@/lib/translations/use-translation";

export default function DashboardPage() {
  const [lang, setLang] = useState<"nb" | "en">("nb");
  const { t } = useTranslation(lang);

  useEffect(() => {
    const updateLang = () => {
      const params = new URLSearchParams(window.location.search);
      const queryLang = resolveAdsLanguage(params.get("lang"));
      const stored = window.localStorage.getItem("signal-room-language");
      setLang(stored === "en" ? "en" : queryLang);
    };

    updateLang();
    window.addEventListener("storage", updateLang);
    window.addEventListener("popstate", updateLang);
    
    return () => {
      window.removeEventListener("storage", updateLang);
      window.removeEventListener("popstate", updateLang);
    };
  }, []);

  const clientId = usePlatformStore((store) => store.clientId);
  const client = useMemo(() => clients.find((item) => item.id === clientId) ?? clients[0], [clientId]);

  if (clientId !== DEMO_ACCOUNT_ID) {
    return (
      <PlatformShell>
        <Card className="border-zinc-200/90 bg-white/80 dark:bg-zinc-900/70">
          <CardTitle>{t("dashboard.noData")}</CardTitle>
          <CardDescription className="mt-2">
            {t("common.noData")}
          </CardDescription>
        </Card>
      </PlatformShell>
    );
  }

  return (
    <PlatformShell>
      <div className="space-y-12 pb-10">
        <AIInsightPanel clientName={client.name} />
        <KpiGrid />
        <KpiTrendOverview data={trendHistory} />

        <section className="grid gap-6 xl:grid-cols-3">
          <TrendChart
            title={t("dashboard.roas")}
            description={t("dashboard.roasDesc", "Efficiency curve for the reporting period")}
            color="#111111"
            data={trendHistory}
            dataKey="roas"
          />
          <TrendChart
            title={t("dashboard.monthlySpend")}
            description={t("dashboard.spendDesc", "Cost development and budget control")}
            color="#ff4a0a"
            data={trendHistory}
            dataKey="spend"
          />
          <TrendChart
            title={t("seo.title")}
            description={t("dashboard.seoDesc", "Development in organic visibility")}
            color="#ff7a45"
            data={trendHistory}
            dataKey="seoVisibility"
          />
          <TrendChart
            title={t("dashboard.conversionQuality")}
            description={t("dashboard.conversionQualityDesc", "Lead quality and conversion health")}
            color="#1f2937"
            data={trendHistory}
            dataKey="conversionQuality"
          />
          <TrendChart
            title={t("tasks.categories.attribution")}
            description={t("dashboard.attributionDesc", "Development in attributed revenue")}
            color="#d9470f"
            data={trendHistory}
            dataKey="attributedRevenue"
          />
          <LandingPagePerformanceChart data={trendHistory} />
        </section>

        <IntelligenceModules />
      </div>
    </PlatformShell>
  );
}
