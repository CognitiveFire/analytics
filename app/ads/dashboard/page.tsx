import { AiStrategicFindings } from "@/components/dashboard/ai-strategic-findings";
import { AdsKpiStrip } from "@/components/dashboard/ads-kpi-strip";
import { PrioritizedOperationalTasks } from "@/components/tasks/prioritized-operational-tasks";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { resolveAdsLanguage } from "@/lib/ads/ui-language";
import { getPersistedOrGenerateRecommendations } from "@/lib/recommendations/recommendation-generator";
import { isDemoAdsAccount, resolveAdsAccountId } from "@/lib/server/ads-active-account";

type AdsDashboardPageProps = {
  searchParams?: Promise<{ accountId?: string; lang?: string }>;
};

export default async function AdsDashboardPage({ searchParams }: AdsDashboardPageProps) {
  const params = await searchParams;
  const accountId = await resolveAdsAccountId(params?.accountId);
  const lang = resolveAdsLanguage(params?.lang);
  const { summary } = await getPersistedOrGenerateRecommendations(accountId);

  if (!isDemoAdsAccount(accountId)) {
    return (
      <Card className="border-zinc-200/90 bg-white/80 dark:bg-zinc-900/70">
        <CardTitle>{lang === "nb" ? "Ingen Ads-data for valgt kunde" : "No Ads data for selected client"}</CardTitle>
        <CardDescription className="mt-2 text-zinc-700">
          {lang === "nb"
            ? "Ads-innhold er foreløpig bare tilgjengelig for Demo Executive Account. Velg demo-kontoen for å se innsikt, KPI-er og anbefalinger."
            : "Ads content is currently only available for the Demo Executive Account. Select the demo account to view insights, KPIs, and recommendations."}
        </CardDescription>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="border-zinc-200/90 bg-white/80 dark:bg-zinc-900/70">
        <CardTitle>{lang === "nb" ? "Operasjonell lederinnsikt" : "Executive Operational Intelligence"}</CardTitle>
        <CardDescription className="mt-2 text-zinc-700">{summary}</CardDescription>
      </Card>

      <AdsKpiStrip lang={lang} />

      <section className="grid gap-6 xl:grid-cols-2">
        <AiStrategicFindings lang={lang} />
        <PrioritizedOperationalTasks lang={lang} />
      </section>
    </div>
  );
}
