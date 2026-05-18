import { Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { generateStrategicInsights } from "@/lib/ai/insight-engine";

export function AIInsightPanel({ clientName }: { clientName: string }) {
  const insights = generateStrategicInsights(clientName);

  return (
    <Card className="relative overflow-hidden border-zinc-300/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.97),rgba(244,244,245,0.9))] dark:border-zinc-700 dark:bg-[linear-gradient(145deg,rgba(24,24,27,0.96),rgba(9,9,11,0.9))]">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">Strategic Intelligence</p>
          <CardTitle className="mt-2 text-2xl">AI Strategic Insights</CardTitle>
          <CardDescription className="mt-2 max-w-2xl">
            Executive narrative generated from cross-channel reporting signals and operational context.
          </CardDescription>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-3 dark:border-zinc-700 dark:bg-zinc-900">
          <Sparkles className="h-6 w-6" />
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {insights.map((insight) => (
          <Card className="border-zinc-200/80 bg-white/90 p-5 dark:border-zinc-700 dark:bg-zinc-900/90" key={insight.id}>
            <div className="flex items-center justify-between gap-3">
              <CardTitle className="text-base">{insight.title}</CardTitle>
              <Badge variant="neutral">{insight.confidence}% confidence</Badge>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">{insight.summary}</p>
          </Card>
        ))}
      </div>
    </Card>
  );
}
