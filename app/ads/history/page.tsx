import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { listAuditLogs } from "@/lib/audit/audit-log-service";
import { resolveAdsLanguage } from "@/lib/ads/ui-language";
import { isDemoAdsAccount, resolveAdsAccountId } from "@/lib/server/ads-active-account";

type AdsHistoryPageProps = {
  searchParams?: Promise<{ accountId?: string; lang?: string }>;
};

export default async function AdsHistoryPage({ searchParams }: AdsHistoryPageProps) {
  const params = await searchParams;
  const accountId = await resolveAdsAccountId(params?.accountId);
  const lang = resolveAdsLanguage(params?.lang);
  const stored = await listAuditLogs(accountId);

  if (!isDemoAdsAccount(accountId) || stored.length === 0) {
    return (
      <Card className="border-zinc-200/90 bg-white/80 dark:bg-zinc-900/70">
        <CardTitle>{lang === "nb" ? "Ingen historikk tilgjengelig" : "No history available"}</CardTitle>
        <CardDescription className="mt-2">
          {lang === "nb"
            ? "Valgt kunde har ingen Ads-historikk i Signal Room ennå."
            : "The selected client has no Ads history in Signal Room yet."}
        </CardDescription>
      </Card>
    );
  }

  return (
    <Card className="border-zinc-200/90 bg-white/80 dark:bg-zinc-900/70">
      <CardTitle>{lang === "nb" ? "Revisjonshistorikk" : "Audit History"}</CardTitle>
      <CardDescription className="mt-2">
        {lang === "nb"
          ? "Full sporbarhet på tvers av anbefalingsgenerering, godkjenninger, utførelse og rollback-metadata."
          : "Full traceability across recommendation generation, approvals, execution, and rollback metadata."}
      </CardDescription>

      <div className="mt-5 space-y-3 text-sm">
        {stored.map((entry) => (
          <div className="rounded-2xl border border-zinc-200/80 bg-white/80 px-4 py-3" key={entry.id}>
            <p className="font-semibold">{entry.type}</p>
            <p className="text-zinc-600">{new Date(entry.timestamp).toLocaleString("en-GB")}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
