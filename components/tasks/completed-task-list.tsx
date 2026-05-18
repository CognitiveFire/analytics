import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { completedOperationalTasks } from "@/lib/mock-data/tasks";

export function CompletedTaskList() {
  return (
    <Card>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <CardTitle className="text-lg">Tasks completed</CardTitle>
          <CardDescription className="mt-2">
            Closed initiatives and verified impact from recent execution cycles.
          </CardDescription>
        </div>
        <Badge variant="success">{completedOperationalTasks.length} completed</Badge>
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[860px] text-left text-sm">
          <thead className="text-xs uppercase tracking-[0.2em] text-zinc-500">
            <tr>
              <th className="pb-3">Task</th>
              <th className="pb-3">Category</th>
              <th className="pb-3">Owner</th>
              <th className="pb-3">Completed</th>
              <th className="pb-3">Outcome</th>
            </tr>
          </thead>
          <tbody>
            {completedOperationalTasks.map((task) => (
              <tr className="border-t border-zinc-200/70 align-top dark:border-zinc-800" key={task.id}>
                <td className="py-4 pr-3 font-medium text-zinc-900 dark:text-zinc-100">{task.title}</td>
                <td className="py-4 pr-3 capitalize text-zinc-600 dark:text-zinc-300">{task.category}</td>
                <td className="py-4 pr-3 text-zinc-600 dark:text-zinc-300">{task.owner}</td>
                <td className="py-4 pr-3 text-zinc-700 dark:text-zinc-200">{task.completedDate}</td>
                <td className="py-4 text-zinc-500 dark:text-zinc-400">{task.outcome}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
