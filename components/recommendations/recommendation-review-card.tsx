import { Recommendation } from "@/types/ads";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

interface RecommendationReviewCardProps {
  recommendation: Recommendation;
}

export function RecommendationReviewCard({ recommendation }: RecommendationReviewCardProps) {
  return (
    <Card className="border-zinc-200/90 bg-[#ece9e1]">
      <CardTitle className="text-lg">{recommendation.title}</CardTitle>
      <CardDescription className="mt-2">{recommendation.reasoning}</CardDescription>

      <div className="mt-4 flex flex-wrap gap-2">
        <Badge variant="warning">Impact: {recommendation.impact}</Badge>
        <Badge variant="neutral">Confidence: {Math.round(recommendation.confidence * 100)}%</Badge>
        <Badge variant="neutral">Complexity: {recommendation.complexity}</Badge>
        <Badge variant="neutral">Priority: {recommendation.priorityLevel}</Badge>
      </div>

      <p className="mt-4 text-sm text-zinc-700">{recommendation.estimatedBusinessEffect}</p>

      <ul className="mt-4 space-y-2 text-sm text-zinc-700">
        {recommendation.proposedActions.map((action) => (
          <li className="rounded-xl bg-white/80 px-3 py-2" key={action}>
            {action}
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap gap-2">
        <Button size="sm" variant="outline">Review Changes</Button>
        <Button size="sm" variant="outline">Edit Recommendation</Button>
        <Button size="sm">Approve Execution</Button>
        <Button size="sm" variant="ghost">Reject</Button>
      </div>
    </Card>
  );
}
