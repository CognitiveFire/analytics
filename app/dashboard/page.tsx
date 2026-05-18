import { AccountRoster } from "@/components/dashboard/account-roster";
import { ConnectorStatus } from "@/components/dashboard/connector-status";
import { KpiGrid } from "@/components/dashboard/kpi-grid";
import { KpiTrendOverview } from "@/components/charts/kpi-trend-overview";
import { LandingPagePerformanceChart } from "@/components/charts/landing-page-performance-chart";
import { TrendChart } from "@/components/charts/trend-chart";
import { AIInsightPanel } from "@/components/insights/ai-insight-panel";
import { IntelligenceModules } from "@/components/insights/intelligence-modules";
import { PlatformShell } from "@/components/layout/platform-shell";
import { clients } from "@/lib/mock-data/clients";
import { trendHistory } from "@/lib/mock-data/metrics";

export default function DashboardPage() {
  const client = clients[0];

  return (
    <PlatformShell>
      <div className="space-y-8">
        <AccountRoster />
        <AIInsightPanel clientName={client.name} />
        <KpiGrid />
        <KpiTrendOverview data={trendHistory} />

        <section className="grid gap-4 xl:grid-cols-3">
          <TrendChart
            title="ROAS Trend"
            description="Efficiency curve across reporting period"
            color="#0f172a"
            data={trendHistory}
            dataKey="roas"
          />
          <TrendChart
            title="Spend Efficiency"
            description="Cost trajectory and spend discipline"
            color="#1d4ed8"
            data={trendHistory}
            dataKey="spend"
          />
          <TrendChart
            title="SEO Visibility"
            description="Search visibility momentum"
            color="#0f766e"
            data={trendHistory}
            dataKey="seoVisibility"
          />
          <TrendChart
            title="Conversion Quality"
            description="Lead quality and conversion health"
            color="#9f1239"
            data={trendHistory}
            dataKey="conversionQuality"
          />
          <TrendChart
            title="Attribution Trend"
            description="Attributed revenue pathway"
            color="#6d28d9"
            data={trendHistory}
            dataKey="attributedRevenue"
          />
          <LandingPagePerformanceChart data={trendHistory} />
        </section>

        <IntelligenceModules />
        <ConnectorStatus clientId={client.id} />
      </div>
    </PlatformShell>
  );
}
