import { PlatformShell } from "@/components/layout/platform-shell";
import { TaskTable } from "@/components/tasks/task-table";

export default function TasksPage() {
  return (
    <PlatformShell>
      <section className="space-y-6">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">Task Engine</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Operational task prioritisation</h1>
          <p className="mt-3 max-w-3xl text-zinc-600 dark:text-zinc-300">
            Prioritised SEO, PPC, tracking, attribution, and landing-page actions with impact-driven ranking.
          </p>
        </div>

        <TaskTable />
      </section>
    </PlatformShell>
  );
}
