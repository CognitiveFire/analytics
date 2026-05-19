import { RecommendationReviewCard } from "@/components/recommendations/recommendation-review-card";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { resolveAdsLanguage } from "@/lib/ads/ui-language";
import { getPersistedOrGenerateRecommendations } from "@/lib/recommendations/recommendation-generator";
import { isDemoAdsAccount, resolveAdsAccountId } from "@/lib/server/ads-active-account";
import { getTranslation } from "@/lib/translations/use-translation";

type AdsRecommendationsPageProps = {
  searchParams?: Promise<{ accountId?: string; lang?: string }>;
};

export default async function AdsRecommendationsPage({ searchParams }: AdsRecommendationsPageProps) {
  const params = await searchParams;
  const accountId = await resolveAdsAccountId(params?.accountId);
  const lang = resolveAdsLanguage(params?.lang);
  const t = (key: string, fallback?: string) => getTranslation(lang, key, fallback);
  const { recommendations } = await getPersistedOrGenerateRecommendations(accountId, lang);

  if (!isDemoAdsAccount(accountId) || recommendations.length === 0) {
    return (
      <Card className="border-zinc-200/90 bg-white/80 dark:bg-zinc-900/70">
        <CardTitle>{t("ads.recommendationsNoDataTitle", "No recommendations available")}</CardTitle>
        <CardDescription className="mt-2">
          {t("ads.recommendationsNoDataDescription", "This client has no Ads recommendations yet. The demo account is the only account with sample content right now.")}
        </CardDescription>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="border-zinc-200/90 bg-white/80 dark:bg-zinc-900/70">
        <CardTitle>{t("ads.recommendationsReviewTitle", "Recommendation Review")}</CardTitle>
        <CardDescription className="mt-2">
          {t("ads.recommendationsReviewDescription", "Recommendations are AI-assisted and deterministic-signal-backed. Manual approval is always required before execution.")}
        </CardDescription>
      </Card>

      <div className="grid gap-4">
        {recommendations.map((recommendation) => (
          <RecommendationReviewCard key={recommendation.id} lang={lang} recommendation={recommendation} />
        ))}
      </div>
    </div>
  );
}
