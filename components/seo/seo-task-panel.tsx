import { ClipboardCheck } from "lucide-react";

import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { operationalTasks, completedOperationalTasks } from "@/lib/mock-data/tasks";
import { scoreTasks } from "@/lib/scoring/task-priority";

const priorityLabels: Record<string, string> = {
  high: "Høy",
  medium: "Middels",
  low: "Lav",
};

const seoTasks = scoreTasks(operationalTasks.filter((t) => t.category === "seo"));
const seoCompleted = completedOperationalTasks.filter((t) => t.category === "seo");

export function SeoTaskPanel() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <ClipboardCheck className="h-5 w-5 text-orange-500" />
        <h2 className="text-lg font-semibold tracking-tight">SEO-oppgaver</h2>
        <Badge variant="neutral">{seoTasks.length} aktive</Badge>
      </div>

      {/* Active SEO tasks */}
      <Card>
        <CardTitle className="text-base">Prioriterte tiltak</CardTitle>
        <CardDescription className="mt-1">
          Rangert etter prioritetsscore = (Effekt × Sikkerhet × Skala) / Kompleksitet
        </CardDescription>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[700px] text-left text-sm">
            <thead className="text-xs uppercase tracking-[0.2em] text-zinc-500">
              <tr>
                <th className="pb-3 pr-4">Oppgave</th>
                <th className="pb-3 pr-4">Prioritet</th>
                <th className="pb-3 pr-4">Score</th>
                <th className="pb-3 pr-4">Forretningseffekt</th>
                <th className="pb-3 pr-4">Ansvarlig</th>
                <th className="pb-3">Frist</th>
              </tr>
            </thead>
            <tbody>
              {seoTasks.length === 0 ? (
                <tr>
                  <td className="py-6 text-zinc-500" colSpan={6}>
                    Ingen aktive SEO-oppgaver.
                  </td>
                </tr>
              ) : (
                seoTasks.map((task) => (
                  <tr className="border-t border-zinc-200/70 align-top dark:border-zinc-800" key={task.id}>
                    <td className="py-4 pr-4 font-medium text-zinc-900 dark:text-zinc-100">{task.title}</td>
                    <td className="py-4 pr-4">
                      <Badge
                        variant={
                          task.priorityLevel === "high"
                            ? "danger"
                            : task.priorityLevel === "medium"
                            ? "warning"
                            : "neutral"
                        }
                      >
                        {priorityLabels[task.priorityLevel] ?? task.priorityLevel}
                      </Badge>
                    </td>
                    <td className="py-4 pr-4 text-zinc-700 dark:text-zinc-200">{task.priorityScore}</td>
                    <td className="py-4 pr-4 text-zinc-600 dark:text-zinc-300">{task.estimatedBusinessEffect}</td>
                    <td className="py-4 pr-4 text-zinc-500 dark:text-zinc-400">{task.owner}</td>
                    <td className="py-4 text-zinc-500 dark:text-zinc-400">{task.dueDate}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Completed SEO tasks */}
      {seoCompleted.length > 0 && (
        <Card>
          <CardTitle className="text-base">Fullførte SEO-tiltak</CardTitle>
          <CardDescription className="mt-1">Dokumenterte resultater fra gjennomførte tiltak.</CardDescription>

          <div className="mt-5 space-y-3">
            {seoCompleted.map((task) => (
              <div
                className="flex flex-col gap-1 rounded-2xl bg-zinc-50 px-4 py-3 dark:bg-zinc-800/60 sm:flex-row sm:items-start sm:justify-between"
                key={task.id}
              >
                <div>
                  <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{task.title}</p>
                  <p className="mt-1 text-xs text-zinc-500">{task.outcome}</p>
                </div>
                <p className="shrink-0 text-xs text-zinc-400">{task.completedDate}</p>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
