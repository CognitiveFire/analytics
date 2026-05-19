import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { resolveAdsLanguage } from "@/lib/ads/ui-language";
import { fetchCampaigns } from "@/lib/google-ads/services";
import { isDemoAdsAccount, resolveAdsAccountId } from "@/lib/server/ads-active-account";
import { getTranslation } from "@/lib/translations/use-translation";

type AdsCampaignsPageProps = {
  searchParams?: Promise<{ accountId?: string; lang?: string }>;
};

export default async function AdsCampaignsPage({ searchParams }: AdsCampaignsPageProps) {
  const params = await searchParams;
  const accountId = await resolveAdsAccountId(params?.accountId);
  const lang = resolveAdsLanguage(params?.lang);
  const t = (key: string, fallback?: string) => getTranslation(lang, key, fallback);
  const campaigns = await fetchCampaigns(accountId);

  if (!isDemoAdsAccount(accountId) || campaigns.length === 0) {
    return (
      <Card className="border-zinc-200/90 bg-white/80 dark:bg-zinc-900/70">
        <CardTitle>{t("ads.campaignsNoDataTitle", "No campaign data available")}</CardTitle>
        <CardDescription className="mt-2">
          {t("ads.campaignsNoDataDescription", "The selected client has no Ads campaign data in Signal Room yet.")}
        </CardDescription>
      </Card>
    );
  }

  return (
    <Card className="border-zinc-200/90 bg-white/80 dark:bg-zinc-900/70">
      <CardTitle>{t("ads.campaignsTitle", "Campaign Diagnostic Layer")}</CardTitle>
      <CardDescription className="mt-2">
        {t("ads.campaignsDescription", "Operational campaign diagnostics across spend efficiency and structure quality.")}
      </CardDescription>

      <div className="mt-5 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-xs uppercase tracking-[0.16em] text-zinc-500">
            <tr>
              <th className="pb-3">{t("ads.campaignColumn", "Campaign")}</th>
              <th className="pb-3">{t("ads.spend30d", "Spend 30d")}</th>
              <th className="pb-3">{t("ads.roas30d", "ROAS 30d")}</th>
              <th className="pb-3">{t("ads.conversions30d", "Conversions 30d")}</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((campaign) => (
              <tr className="border-t border-zinc-200/80" key={campaign.id}>
                <td className="py-3 font-medium">{campaign.name}</td>
                <td className="py-3">{lang === "nb" ? "kr" : "$"} {campaign.spend30d.toLocaleString(lang === "nb" ? "nb-NO" : "en-GB")}</td>
                <td className="py-3">{campaign.roas30d.toFixed(1)}x</td>
                <td className="py-3">{campaign.conversions30d}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
