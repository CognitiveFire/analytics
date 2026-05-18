import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { operationalTasks } from "@/lib/mock-data/tasks";
import { scoreTasks } from "@/lib/scoring/task-priority";

const categoryLabels: Record<string, string> = {
  seo: "SEO",
  ppc: "PPC",
  tracking: "Sporing",
  attribution: "Attribusjon",
  "landing-page": "Landingsside",
  bidding: "Budgivning",
};

const priorityLabels: Record<string, string> = {
  high: "Høy",
  medium: "Middels",
  low: "Lav",
};

export function TaskTable() {
  const tasks = scoreTasks(operationalTasks);

  return (
    <Card>
      <CardTitle className="text-lg">Operasjonell oppgavemotor</CardTitle>
      <CardDescription className="mt-2">
        Prioritetsscore = (Effekt x Sikkerhet x Skala) / Kompleksitet
      </CardDescription>

      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="text-xs uppercase tracking-[0.2em] text-zinc-500">
            <tr>
              <th className="pb-3">Oppgave</th>
              <th className="pb-3">Kategori</th>
              <th className="pb-3">Prioritet</th>
              <th className="pb-3">Score</th>
              <th className="pb-3">Forretningseffekt</th>
              <th className="pb-3">Begrunnelse</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr className="border-t border-zinc-200/70 align-top dark:border-zinc-800" key={task.id}>
                <td className="py-4 pr-3 font-medium text-zinc-900 dark:text-zinc-100">{task.title}</td>
                <td className="py-4 pr-3 text-zinc-600 dark:text-zinc-300">{categoryLabels[task.category] ?? task.category}</td>
                <td className="py-4 pr-3">
                  <Badge
                    variant={
                      task.priorityLevel === "high" ? "danger" : task.priorityLevel === "medium" ? "warning" : "neutral"
                    }
                  >
                    {priorityLabels[task.priorityLevel] ?? task.priorityLevel}
                  </Badge>
                </td>
                <td className="py-4 pr-3 text-zinc-700 dark:text-zinc-200">{task.priorityScore}</td>
                <td className="py-4 pr-3 text-zinc-600 dark:text-zinc-300">{task.estimatedBusinessEffect}</td>
                <td className="py-4 text-zinc-500 dark:text-zinc-400">{task.reasoning}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
