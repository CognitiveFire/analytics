import { AlertTriangle, CheckCircle2, TrendingUp, XCircle } from "lucide-react";

import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScreamingFrogUploadResult } from "@/types";

interface Props {
  result: ScreamingFrogUploadResult;
}

function computeHealthScore(result: ScreamingFrogUploadResult): number {
  const s = result.summary;
  if (s.totalUrls === 0) return 0;

  const indexableRatio = s.indexableUrls / s.totalUrls;
  const redirectPenalty = Math.min(s.redirectUrls / s.totalUrls, 0.2) * 2;
  const missingTitlePenalty = Math.min(s.missingTitles / s.totalUrls, 0.2) * 2;
  const canonicalPenalty = Math.min(s.canonicalIssues / s.totalUrls, 0.2) * 1.5;
  const missingH1Penalty = Math.min(s.missingH1 / s.totalUrls, 0.15) * 1;

  const raw = indexableRatio - redirectPenalty - missingTitlePenalty - canonicalPenalty - missingH1Penalty;
  return Math.round(Math.max(0, Math.min(1, raw)) * 100);
}

function scoreVariant(score: number): "success" | "warning" | "danger" {
  if (score >= 75) return "success";
  if (score >= 50) return "warning";
  return "danger";
}

interface HealthItem {
  label: string;
  value: number;
  total: number;
  invert: boolean; // true = lower is better
  description: string;
}

export function SeoHealthPanel({ result }: Props) {
  const score = computeHealthScore(result);
  const s = result.summary;

  const items: HealthItem[] = [
    {
      label: "Indekserbare URL-er",
      value: s.indexableUrls,
      total: s.totalUrls,
      invert: false,
      description: "Sider søkemotorer kan crawle og indeksere",
    },
    {
      label: "Omdirigeringer",
      value: s.redirectUrls,
      total: s.totalUrls,
      invert: true,
      description: "3xx-svar som kan skape lenkevekt-tap",
    },
    {
      label: "Manglende titler",
      value: s.missingTitles,
      total: s.totalUrls,
      invert: true,
      description: "Sider uten title-tagg",
    },
    {
      label: "Manglende H1",
      value: s.missingH1,
      total: s.totalUrls,
      invert: true,
      description: "Sider uten H1-overskrift",
    },
    {
      label: "Canonical-avvik",
      value: s.canonicalIssues,
      total: s.totalUrls,
      invert: true,
      description: "Selvmotstridende eller manglende canonical-tagger",
    },
    {
      label: "Dupliserte titler",
      value: s.duplicateTitles,
      total: s.totalUrls,
      invert: true,
      description: "Identiske title-tagger på tvers av sider",
    },
  ];

  return (
    <div className="space-y-4">
      {/* Overall score */}
      <Card>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">SEO Helsescore</p>
            <CardTitle className="mt-2 text-4xl font-bold tracking-tight">{score}</CardTitle>
            <CardDescription className="mt-1">av 100 — basert på indekserbarhet, titler, H1-er og canonicals</CardDescription>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge variant={scoreVariant(score)}>
              {score >= 75 ? "God helse" : score >= 50 ? "Trenger oppmerksomhet" : "Kritiske problemer"}
            </Badge>
            <div className="h-3 w-48 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  score >= 75 ? "bg-emerald-500" : score >= 50 ? "bg-amber-400" : "bg-rose-500"
                }`}
                style={{ width: `${score}%` }}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Per-metric breakdown */}
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => {
          const pct = item.total > 0 ? Math.round((item.value / item.total) * 100) : 0;
          const isGood = item.invert ? pct < 5 : pct >= 80;
          const isWarn = item.invert ? pct >= 5 && pct < 15 : pct >= 60 && pct < 80;
          const Icon = isGood ? CheckCircle2 : isWarn ? AlertTriangle : XCircle;
          const iconColor = isGood
            ? "text-emerald-500"
            : isWarn
            ? "text-amber-500"
            : "text-rose-500";

          return (
            <div
              className="flex flex-col justify-between rounded-[1.5rem] border border-zinc-200/80 bg-white/90 p-5 dark:border-zinc-800 dark:bg-zinc-900/80"
              key={item.label}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">{item.label}</p>
                  <p className="mt-2 text-2xl font-semibold tracking-tight">{item.value.toLocaleString("nb-NO")}</p>
                  <p className="mt-0.5 text-sm text-zinc-500">{pct}% av totalt</p>
                </div>
                <Icon className={`mt-0.5 h-5 w-5 flex-shrink-0 ${iconColor}`} />
              </div>
              <p className="mt-4 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">{item.description}</p>
            </div>
          );
        })}
      </div>

      {/* Trend/action summary */}
      <Card>
        <div className="flex items-center gap-3">
          <TrendingUp className="h-5 w-5 text-orange-500" />
          <div>
            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
              {s.totalUrls.toLocaleString("nb-NO")} URL-er crawlet ·{" "}
              {s.indexableUrls.toLocaleString("nb-NO")} indekserbare ·{" "}
              {(s.missingTitles + s.canonicalIssues + s.missingH1 + s.duplicateTitles).toLocaleString("nb-NO")} totale problemer oppdaget
            </p>
            <p className="mt-0.5 text-xs text-zinc-500">
              Se oppgavepanelet nedenfor for prioriterte tiltak basert på denne crawlen.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
