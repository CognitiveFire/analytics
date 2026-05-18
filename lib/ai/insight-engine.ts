import { strategicInsightsSeed } from "@/lib/mock-data/tasks";
import { StrategicInsight } from "@/types";

export function generateStrategicInsights(clientName: string): StrategicInsight[] {
  return strategicInsightsSeed.map((insight) => ({
    ...insight,
    summary: insight.summary.replace("kampanjer", `${clientName.toLowerCase()}-kampanjer`),
  }));
}
