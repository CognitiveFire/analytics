import { AiStrategicFindings } from "@/components/dashboard/ai-strategic-findings";
import { AdsKpiStrip } from "@/components/dashboard/ads-kpi-strip";
import { PrioritizedOperationalTasks } from "@/components/tasks/prioritized-operational-tasks";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { getPersistedOrGenerateRecommendations } from "@/lib/recommendations/recommendation-generator";
import { resolveAdsAccountId } from "@/lib/server/ads-active-account";

type AdsDashboardPageProps = {
  searchParams?: Promise<{ accountId?: string }>;
};

export default async function AdsDashboardPage({ searchParams }: AdsDashboardPageProps) {
  const params = await searchParams;
  const accountId = await resolveAdsAccountId(params?.accountId);
  const { summary } = await getPersistedOrGenerateRecommendations(accountId);

  return (
    <div className="space-y-6">
      <Card className="border-zinc-200/90 bg-white/80 dark:bg-zinc-900/70">
        <CardTitle>Executive Operational Intelligence</CardTitle>
        <CardDescription className="mt-2 text-zinc-700">{summary}</CardDescription>
      </Card>

      <AdsKpiStrip />

      <section className="grid gap-6 xl:grid-cols-2">
        <AiStrategicFindings />
        <PrioritizedOperationalTasks />
      </section>
    </div>
  );
}
