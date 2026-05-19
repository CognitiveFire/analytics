import { RecommendationReviewCard } from "@/components/recommendations/recommendation-review-card";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { getPersistedOrGenerateRecommendations } from "@/lib/recommendations/recommendation-generator";
import { resolveAdsAccountId } from "@/lib/server/ads-active-account";

type AdsRecommendationsPageProps = {
  searchParams?: Promise<{ accountId?: string }>;
};

export default async function AdsRecommendationsPage({ searchParams }: AdsRecommendationsPageProps) {
  const params = await searchParams;
  const accountId = await resolveAdsAccountId(params?.accountId);
  const { recommendations } = await getPersistedOrGenerateRecommendations(accountId);

  return (
    <div className="space-y-6">
      <Card className="border-zinc-200/90 bg-white/80 dark:bg-zinc-900/70">
        <CardTitle>Recommendation Review</CardTitle>
        <CardDescription className="mt-2">
          Recommendations are AI-assisted and deterministic-signal-backed. Manual approval is always required before execution.
        </CardDescription>
      </Card>

      <div className="grid gap-4">
        {recommendations.map((recommendation) => (
          <RecommendationReviewCard key={recommendation.id} recommendation={recommendation} />
        ))}
      </div>
    </div>
  );
}
