import { AiStrategicFindings } from "@/components/dashboard/ai-strategic-findings";
import { AdsKpiStrip } from "@/components/dashboard/ads-kpi-strip";
import { PrioritizedOperationalTasks } from "@/components/tasks/prioritized-operational-tasks";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { getPersistedOrGenerateRecommendations } from "@/lib/recommendations/recommendation-generator";

export default async function AdsDashboardPage() {
  const { summary } = await getPersistedOrGenerateRecommendations("demo-executive");

  return (
    <div className="space-y-6">
      <Card className="border-zinc-200/90 bg-[#ece9e1]">
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
