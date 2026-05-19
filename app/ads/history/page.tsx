import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { listAuditLogs } from "@/lib/audit/audit-log-service";
import { resolveAdsLanguage } from "@/lib/ads/ui-language";
import { isDemoAdsAccount, resolveAdsAccountId } from "@/lib/server/ads-active-account";
import { getTranslation } from "@/lib/translations/use-translation";

const auditTypeLabels = {
  nb: {
    recommendation_generated: "Anbefaling generert",
    ai_reasoning_snapshot: "AI-resonnering lagret",
    recommendation_approved: "Anbefaling godkjent",
    recommendation_rejected: "Anbefaling avvist",
    execution_previewed: "Utførelse forhåndsvist",
    execution_applied: "Utførelse gjennomført",
    rollback_created: "Rollback opprettet",
  },
  en: {
    recommendation_generated: "Recommendation generated",
    ai_reasoning_snapshot: "AI reasoning snapshot saved",
    recommendation_approved: "Recommendation approved",
    recommendation_rejected: "Recommendation rejected",
    execution_previewed: "Execution previewed",
    execution_applied: "Execution applied",
    rollback_created: "Rollback created",
  },
} as const;

type AdsHistoryPageProps = {
  searchParams?: Promise<{ accountId?: string; lang?: string }>;
};

export default async function AdsHistoryPage({ searchParams }: AdsHistoryPageProps) {
  const params = await searchParams;
  const accountId = await resolveAdsAccountId(params?.accountId);
  const lang = resolveAdsLanguage(params?.lang);
  const t = (key: string, fallback?: string) => getTranslation(lang, key, fallback);
  const stored = await listAuditLogs(accountId);

  if (!isDemoAdsAccount(accountId) || stored.length === 0) {
    return (
      <Card className="border-zinc-200/90 bg-white/80 dark:bg-zinc-900/70">
        <CardTitle>{t("ads.historyNoDataTitle", "No history available")}</CardTitle>
        <CardDescription className="mt-2">
          {t("ads.historyNoDataDescription", "The selected client has no Ads history in Signal Room yet.")}
        </CardDescription>
      </Card>
    );
  }

  return (
    <Card className="border-zinc-200/90 bg-white/80 dark:bg-zinc-900/70">
      <CardTitle>{t("history.title", "Audit History")}</CardTitle>
      <CardDescription className="mt-2">
        {t("ads.historyDescription", "Full traceability across recommendation generation, approvals, execution, and rollback metadata.")}
      </CardDescription>

      <div className="mt-5 space-y-3 text-sm">
        {stored.map((entry) => (
          <div className="rounded-2xl border border-zinc-200/80 bg-white/80 px-4 py-3" key={entry.id}>
            <p className="font-semibold">{auditTypeLabels[lang][entry.type as keyof typeof auditTypeLabels.nb] ?? entry.type}</p>
            <p className="text-zinc-600">{new Date(entry.timestamp).toLocaleString(lang === "nb" ? "nb-NO" : "en-GB")}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
