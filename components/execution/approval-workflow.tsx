import { AdsLanguage } from "@/lib/ads/ui-language";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

export function ApprovalWorkflow({ lang = "nb" }: { lang?: AdsLanguage }) {
  return (
    <Card className="border-zinc-200/90 bg-white/80 dark:bg-zinc-900/70">
      <CardTitle className="text-lg">{lang === "nb" ? "Read-Only Mode" : "Read-Only Mode"}</CardTitle>
      <CardDescription className="mt-2">
        {lang === "nb"
          ? "Signal Room opererer i read-only-modus. Systemet analyserer data men bruker aldri Google Ads-API til å gjøre endringer. Alle anbefalinger er for manuell gjennomgang."
          : "Signal Room operates in read-only mode. The system analyzes data but never uses the Google Ads API to make changes. All recommendations are for manual review."}
      </CardDescription>

      <div className="mt-4 rounded-2xl border border-orange-200/80 bg-orange-50/80 p-4 dark:border-orange-900/40 dark:bg-orange-950/20">
        <p className="text-sm font-medium text-orange-900 dark:text-orange-100">
          {lang === "nb"
            ? "Analyse- og samlingsfunksjonalitet er aktivert. Utførelseskapabilitet er deaktivert."
            : "Analysis and collection functionality is enabled. Execution capability is disabled."}
        </p>
        <p className="mt-2 text-xs text-orange-700 dark:text-orange-300">
          {lang === "nb"
            ? "For å implementere anbefalinger, eksporter resultatene og gå gjennom dem manuelt i Google Ads-grensesnittet."
            : "To implement recommendations, export the results and review them manually in the Google Ads interface."}
        </p>
      </div>

      <ol className="mt-5 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
        <li>{lang === "nb" ? "1. Gjennomgå analysegrunnlag og deterministiske indikatorer." : "1. Review analysis reasoning and deterministic indicators."}</li>
        <li>{lang === "nb" ? "2. Inspiser anbefalingsdetaljer og sikkerhetssjekker." : "2. Inspect recommendation details and safety checks."}</li>
        <li>{lang === "nb" ? "3. Vurdere hvordan endringene bør implementeres manuelt." : "3. Decide how changes should be manually implemented."}</li>
        <li>{lang === "nb" ? "4. Eksporter rapport og gjennomgå i Google Ads-grensesnittet." : "4. Export report and review in the Google Ads interface."}</li>
      </ol>
    </Card>
  );
}
