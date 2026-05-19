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

export default function DashboardPage() {
  const [lang, setLang] = useState<"nb" | "en">("nb");

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
          <CardTitle>{lang === "nb" ? "Ingen seeded data for valgt kunde" : "No seeded data for selected client"}</CardTitle>
          <CardDescription className="mt-2">
            {lang === "nb"
              ? "Demo-kontoen er den eneste kontoen som leveres med eksempeldata. Nye kunder kan fortsatt brukes for oppsett, SEO-opplastinger og videre konfigurasjon."
              : "The demo account is the only account shipped with sample data. New clients can still be used for setup, SEO uploads, and configuration."}
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
            title={lang === "nb" ? "ROAS-trend" : "ROAS trend"}
            description={lang === "nb" ? "Effektivitetskurve for rapporteringsperioden" : "Efficiency curve for the reporting period"}
            color="#111111"
            data={trendHistory}
            dataKey="roas"
          />
          <TrendChart
            title={lang === "nb" ? "Kostnadseffektivitet" : "Cost efficiency"}
            description={lang === "nb" ? "Kostnadsutvikling og budsjettkontroll" : "Cost development and budget control"}
            color="#ff4a0a"
            data={trendHistory}
            dataKey="spend"
          />
          <TrendChart
            title="SEO-synlighet"
            description="Utvikling i organisk synlighet"
            color="#ff7a45"
            data={trendHistory}
            dataKey="seoVisibility"
          />
          <TrendChart
            title="Konverteringskvalitet"
            description="Lead-kvalitet og konverteringshelse"
            color="#1f2937"
            data={trendHistory}
            dataKey="conversionQuality"
          />
          <TrendChart
            title="Attribusjonstrend"
            description="Utvikling i attribuert omsetning"
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
