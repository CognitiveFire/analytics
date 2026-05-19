import { RecommendationReviewCard } from "@/components/recommendations/recommendation-review-card";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { resolveAdsLanguage } from "@/lib/ads/ui-language";
import { getPersistedOrGenerateRecommendations } from "@/lib/recommendations/recommendation-generator";
import { isDemoAdsAccount, resolveAdsAccountId } from "@/lib/server/ads-active-account";

type AdsRecommendationsPageProps = {
  searchParams?: Promise<{ accountId?: string; lang?: string }>;
};

export default async function AdsRecommendationsPage({ searchParams }: AdsRecommendationsPageProps) {
  const params = await searchParams;
  const accountId = await resolveAdsAccountId(params?.accountId);
  const lang = resolveAdsLanguage(params?.lang);
  const { recommendations } = await getPersistedOrGenerateRecommendations(accountId, lang);

  if (!isDemoAdsAccount(accountId) || recommendations.length === 0) {
    return (
      <Card className="border-zinc-200/90 bg-white/80 dark:bg-zinc-900/70">
        <CardTitle>{lang === "nb" ? "Ingen anbefalinger tilgjengelig" : "No recommendations available"}</CardTitle>
        <CardDescription className="mt-2">
          {lang === "nb"
            ? "Denne kunden har ingen Ads-anbefalinger ennå. Demo-kontoen er den eneste kontoen med eksempelinnhold akkurat nå."
            : "This client has no Ads recommendations yet. The demo account is the only account with sample content right now."}
        </CardDescription>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="border-zinc-200/90 bg-white/80 dark:bg-zinc-900/70">
        <CardTitle>{lang === "nb" ? "Gjennomgang av anbefalinger" : "Recommendation Review"}</CardTitle>
        <CardDescription className="mt-2">
          {lang === "nb"
            ? "Anbefalingene er AI-assisterte og støttet av deterministiske signaler. Manuell godkjenning kreves alltid før utførelse."
            : "Recommendations are AI-assisted and deterministic-signal-backed. Manual approval is always required before execution."}
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
