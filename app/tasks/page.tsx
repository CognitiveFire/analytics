import { PlatformShell } from "@/components/layout/platform-shell";
import { CompletedTaskList } from "@/components/tasks/completed-task-list";
import { TaskTable } from "@/components/tasks/task-table";
import { resolveAdsLanguage } from "@/lib/ads/ui-language";
import { getTranslation } from "@/lib/translations/use-translation";

type TasksPageProps = {
  searchParams?: Promise<{ lang?: string }>;
};

export default async function TasksPage({ searchParams }: TasksPageProps) {
  const params = await searchParams;
  const lang = resolveAdsLanguage(params?.lang);
  const t = (key: string, fallback?: string) => getTranslation(lang, key, fallback);

  return (
    <PlatformShell>
      <section className="space-y-6">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">{t("pages.tasks.subtitle", "Task engine")}</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">{t("pages.tasks.title", "Operational task prioritization")}</h1>
          <p className="mt-3 max-w-3xl text-zinc-600 dark:text-zinc-300">
            {t("pages.tasks.description", "Prioritized SEO, PPC, tracking, attribution, and landing-page actions ranked by impact.")}
          </p>
        </div>

        <TaskTable />
        <CompletedTaskList />
      </section>
    </PlatformShell>
  );
}
