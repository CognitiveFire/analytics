import { KPI } from "@/types";

export function computeAccountHealth(kpis: KPI[]): number {
  const score = kpis.reduce((acc, item) => {
    const directionalScore = item.trend === "up" ? item.delta : -item.delta;
    return acc + directionalScore;
  }, 72);

  return Math.max(40, Math.min(96, Math.round(score)));
}
