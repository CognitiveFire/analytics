import { PlatformShell } from "@/components/layout/platform-shell";
import { CompletedTaskList } from "@/components/tasks/completed-task-list";
import { TaskTable } from "@/components/tasks/task-table";

export default function TasksPage() {
  return (
    <PlatformShell>
      <section className="space-y-6">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">Oppgavemotor</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Operasjonell oppgaveprioritering</h1>
          <p className="mt-3 max-w-3xl text-zinc-600 dark:text-zinc-300">
            Prioriterte SEO-, PPC-, sporing-, attribusjons- og landingsside-tiltak med effektbasert rangering.
          </p>
        </div>

        <TaskTable />
        <CompletedTaskList />
      </section>
    </PlatformShell>
  );
}
