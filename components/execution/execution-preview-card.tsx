import { AdsLanguage } from "@/lib/ads/ui-language";
import { ExecutionPreview } from "@/types/ads";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

const changeTypeLabels: Record<AdsLanguage, Record<string, string>> = {
  nb: {
    budget_change: "Budsjettendring",
    pause_campaign: "Pause kampanje",
    pause_keywords: "Pause søkeord",
    resume_campaign: "Gjenoppta kampanje",
    update_bid_strategy: "Oppdater budstrategi",
    update_target_roas: "Oppdater mål-ROAS",
  },
  en: {
    budget_change: "Budget change",
    pause_campaign: "Pause campaign",
    pause_keywords: "Pause keywords",
    resume_campaign: "Resume campaign",
    update_bid_strategy: "Update bid strategy",
    update_target_roas: "Update target ROAS",
  },
};

export function ExecutionPreviewCard({ lang = "nb", preview }: { lang?: AdsLanguage; preview: ExecutionPreview }) {
  return (
    <Card className="border-zinc-200/90 bg-white/80 dark:bg-zinc-900/70">
      <CardTitle className="text-lg">{lang === "nb" ? "Forhåndsvisning av utførelse" : "Execution Preview"}</CardTitle>
      <CardDescription className="mt-2">{preview.summary}</CardDescription>

      <div className="mt-5 space-y-2 text-sm">
        {preview.changes.map((change) => (
          <div className="rounded-xl border border-zinc-200 bg-white/70 px-3 py-2" key={`${change.type}-${change.entityId}`}>
            <p className="font-semibold text-zinc-800">{changeTypeLabels[lang][change.type] ?? change.type}</p>
            <p className="text-zinc-600">{lang === "nb" ? "Enhet" : "Entity"}: {change.entityId}</p>
          </div>
        ))}
      </div>

      <ul className="mt-5 space-y-2 text-xs text-zinc-600">
        {preview.safetyChecks.map((check) => (
          <li key={check}>- {check}</li>
        ))}
      </ul>
    </Card>
  );
}
