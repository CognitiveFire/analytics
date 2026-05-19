import { RecommendationReviewCard } from "@/components/recommendations/recommendation-review-card";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { getPersistedOrGenerateRecommendations } from "@/lib/recommendations/recommendation-generator";

export default async function AdsRecommendationsPage() {
  const { recommendations } = await getPersistedOrGenerateRecommendations("demo-executive");

  return (
    <div className="space-y-6">
      <Card className="border-zinc-200/90 bg-[#f2f0ea]">
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
