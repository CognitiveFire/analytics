import { AdsLanguage } from "@/lib/ads/ui-language";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function ApprovalWorkflow({ lang = "nb" }: { lang?: AdsLanguage }) {
  return (
    <Card className="border-zinc-200/90 bg-white/80 dark:bg-zinc-900/70">
      <CardTitle className="text-lg">{lang === "nb" ? "Godkjenningsflyt" : "Approval Workflow"}</CardTitle>
      <CardDescription className="mt-2">
        {lang === "nb"
          ? "Utførelse er fortsatt menneskestyrt. Endringer blir aldri automatisk brukt fra AI-utdata."
          : "Execution remains human-supervised. Changes are never auto-applied from AI output."}
      </CardDescription>

      <ol className="mt-4 space-y-2 text-sm text-zinc-700">
        <li>{lang === "nb" ? "1. Gå gjennom anbefalingsbegrunnelse og deterministiske bevis." : "1. Review recommendation reasoning and deterministic evidence."}</li>
        <li>{lang === "nb" ? "2. Inspiser utførelsesforhåndsvisning og sikkerhetssjekker." : "2. Inspect execution preview and safety checks."}</li>
        <li>{lang === "nb" ? "3. Godkjenn, avvis eller rediger endringer før utførelse." : "3. Approve, reject, or edit changes before execution."}</li>
        <li>{lang === "nb" ? "4. Loggfør beslutning og rollback-metadata." : "4. Log approval decision and rollback metadata."}</li>
      </ol>

      <div className="mt-5 flex gap-2">
        <Button size="sm">{lang === "nb" ? "Godkjenn" : "Approve"}</Button>
        <Button size="sm" variant="outline">{lang === "nb" ? "Avvis" : "Reject"}</Button>
      </div>
    </Card>
  );
}
