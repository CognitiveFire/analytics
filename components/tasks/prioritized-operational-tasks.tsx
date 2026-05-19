import { AdsLanguage } from "@/lib/ads/ui-language";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

const tasksByLanguage: Record<AdsLanguage, Array<{ title: string; priority: string; owner: string }>> = {
  nb: [
    { title: "Legg til negative søkeord i klynger med lav intensjon", priority: "Kritisk", owner: "Paid Lead" },
    { title: "Reparer mapping for offline-konverteringsimport", priority: "Høy", owner: "Analytics Engineer" },
    { title: "Del styring av budsjett mellom merkevare og ikke-merkevare", priority: "Høy", owner: "Strategy Director" },
    { title: "Revider budskapsmatch på landingssider for kampanjer med høyest spend", priority: "Middels", owner: "CRO Strategist" },
  ],
  en: [
    { title: "Add negative keywords in low-intent clusters", priority: "Critical", owner: "Paid Lead" },
    { title: "Repair offline conversion import mapping", priority: "High", owner: "Analytics Engineer" },
    { title: "Split brand and non-brand budget governance", priority: "High", owner: "Strategy Director" },
    { title: "Audit landing-page message match for top spend campaigns", priority: "Medium", owner: "CRO Strategist" },
  ],
};

export function PrioritizedOperationalTasks({ lang = "nb" }: { lang?: AdsLanguage }) {
  const tasks = tasksByLanguage[lang];

  return (
    <Card className="border-zinc-200/90 bg-white/80 dark:bg-zinc-900/70">
      <CardTitle className="text-lg">{lang === "nb" ? "Prioriterte operative tiltak" : "Prioritized Operational Tasks"}</CardTitle>
      <CardDescription className="mt-2">
        {lang === "nb"
          ? "Planleggingskø for utførelse. Tiltak krever manuell godkjenning før kontoendringer."
          : "Execution planning queue. Actions require manual approval before any account mutation."}
      </CardDescription>
      <div className="mt-5 space-y-3">
        {tasks.map((task) => (
          <div className="rounded-2xl border border-zinc-200/80 bg-white/80 px-4 py-3" key={task.title}>
            <p className="text-sm font-semibold text-zinc-900">{task.title}</p>
            <p className="mt-1 text-xs text-zinc-600">{task.priority} {lang === "nb" ? "prioritet" : "priority"} · {task.owner}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
