"use client";

import { useMemo } from "react";

import { KpiGrid } from "@/components/dashboard/kpi-grid";
import { KpiTrendOverview } from "@/components/charts/kpi-trend-overview";
import { LandingPagePerformanceChart } from "@/components/charts/landing-page-performance-chart";
import { TrendChart } from "@/components/charts/trend-chart";
import { AIInsightPanel } from "@/components/insights/ai-insight-panel";
import { IntelligenceModules } from "@/components/insights/intelligence-modules";
import { PlatformShell } from "@/components/layout/platform-shell";
import { usePlatformStore } from "@/hooks/use-platform-store";
import { clients } from "@/lib/mock-data/clients";
import { trendHistory } from "@/lib/mock-data/metrics";

export default function DashboardPage() {
  const clientId = usePlatformStore((store) => store.clientId);
  const client = useMemo(() => clients.find((item) => item.id === clientId) ?? clients[0], [clientId]);

  return (
    <PlatformShell>
      <div className="space-y-12 pb-10">
        <AIInsightPanel clientName={client.name} />
        <KpiGrid />
        <KpiTrendOverview data={trendHistory} />

        <section className="grid gap-6 xl:grid-cols-3">
          <TrendChart
            title="ROAS-trend"
            description="Effektivitetskurve for rapporteringsperioden"
            color="#111111"
            data={trendHistory}
            dataKey="roas"
          />
          <TrendChart
            title="Kostnadseffektivitet"
            description="Kostnadsutvikling og budsjettkontroll"
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
