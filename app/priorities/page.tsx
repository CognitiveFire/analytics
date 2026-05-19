"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, CheckCircle2, Zap } from "lucide-react";

import { PlatformShell } from "@/components/layout/platform-shell";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { resolveAdsLanguage } from "@/lib/ads/ui-language";
import { useTranslation } from "@/lib/translations/use-translation";
import { OperationalRecommendation } from "@/types";
import {
  getDemoOperationalRecommendations,
  getDemoCompletedRecommendations,
} from "@/lib/mock-data/operational-recommendations";

export default function PrioritiesPage() {
  const [lang, setLang] = useState<"nb" | "en">("nb");
  const { t } = useTranslation(lang);

  useEffect(() => {
    const updateLang = () => {
      const params = new URLSearchParams(window.location.search);
      const queryLang = resolveAdsLanguage(params.get("lang"));
      const stored = window.localStorage.getItem("signal-room-language");
      setLang(stored === "en" ? "en" : queryLang);
    };

    updateLang();
    window.addEventListener("storage", updateLang);
    window.addEventListener("popstate", updateLang);

    return () => {
      window.removeEventListener("storage", updateLang);
      window.removeEventListener("popstate", updateLang);
    };
  }, []);

  const recommendations = getDemoOperationalRecommendations();
  const completedRecommendations = getDemoCompletedRecommendations();

  const criticalRecs = recommendations.filter((r) => r.priority === "critical").sort((a, b) => b.confidenceScore - a.confidenceScore);
  const highRecs = recommendations.filter((r) => r.priority === "high").sort((a, b) => b.confidenceScore - a.confidenceScore);
  const mediumRecs = recommendations.filter((r) => r.priority === "medium").sort((a, b) => b.confidenceScore - a.confidenceScore);

  const getComplexityColor = (complexity: string) => {
    return complexity === "low" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30" : complexity === "medium" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30" : "bg-rose-100 text-rose-700 dark:bg-rose-900/30";
  };

  const getChannelColor = (channel: string) => {
    return channel === "organic"
      ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30"
      : channel === "paid"
      ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30"
      : channel === "conversion"
      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30"
      : "bg-orange-100 text-orange-700 dark:bg-orange-900/30";
  };

  const renderRecommendationCard = (rec: OperationalRecommendation) => (
    <div key={rec.id} className="space-y-4 rounded-[1.75rem] border border-zinc-200/80 bg-white/90 p-5 dark:border-zinc-800 dark:bg-zinc-900/80">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-start gap-3">
            {rec.priority === "critical" ? (
              <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-rose-600" />
            ) : (
              <Zap className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600" />
            )}
            <div className="flex-1">
              <h3 className="font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">{rec.title}</h3>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{rec.businessProblem}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <Badge
            className={rec.priority === "critical" ? "bg-rose-100 text-rose-700 dark:bg-rose-900/30" : "bg-amber-100 text-amber-700 dark:bg-amber-900/30"}
          >
            {rec.priority === "critical" ? "Critical" : "High"}
          </Badge>
        </div>
      </div>

      <div className="space-y-3 border-t border-zinc-200 pt-4 dark:border-zinc-800">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Strategic Explanation</p>
          <p className="mt-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{rec.strategicExplanation}</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg bg-zinc-50 p-3 dark:bg-zinc-800/50">
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">{lang === "nb" ? "Forretningseffekt" : "Business Impact"}</p>
            <p className="mt-1 text-sm font-medium text-zinc-900 dark:text-zinc-100">{rec.businessImpact}</p>
          </div>
          <div className="rounded-lg bg-zinc-50 p-3 dark:bg-zinc-800/50">
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">{lang === "nb" ? "Forventet resultat" : "Expected Outcome"}</p>
            <p className="mt-1 text-sm font-medium text-zinc-900 dark:text-zinc-100">{rec.expectedOutcome}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 border-t border-zinc-200 pt-4 dark:border-zinc-800">
        <div className="flex flex-wrap gap-2">
          <Badge className={getComplexityColor(rec.complexity)} variant="neutral">
            {lang === "nb"
              ? rec.complexity === "low"
                ? "Lav kompleksitet"
                : rec.complexity === "medium"
                ? "Medium kompleksitet"
                : "Høy kompleksitet"
              : rec.complexity === "low"
              ? "Low Complexity"
              : rec.complexity === "medium"
              ? "Medium Complexity"
              : "High Complexity"}
          </Badge>
          <Badge variant="neutral" className="text-xs">
            {rec.confidenceScore}% confidence
          </Badge>
          {rec.implementationTracking?.startDate && (
            <Badge variant="neutral" className="text-xs">
              {lang === "nb" ? "I gang" : "In Progress"} • {rec.implementationTracking.progressPercent}%
            </Badge>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {rec.affectedChannels.map((channel: string) => (
          <Badge key={channel} className={getChannelColor(channel)} variant="neutral">
            {lang === "nb"
              ? channel === "organic"
                ? "Organisk"
                : channel === "paid"
                ? "Betalt"
                : channel === "conversion"
                ? "Konvertering"
                : "Attribusjon"
              : channel}
          </Badge>
        ))}
      </div>
    </div>
  );

  return (
    <PlatformShell>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="border-b border-zinc-200/60 pb-6 dark:border-zinc-800">
          <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">
            {t("pages.priorities.subtitle", "Prioritized Actions")}
          </p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
            {t("pages.priorities.title", "Operational Recommendations")}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-zinc-600 dark:text-zinc-300">
            {lang === "nb"
              ? "Strategiske anbefalinger knyttet til forretningsproblemer, ikke kanaler. Rangert etter forretningseffekt og sikkerhetsnivå."
              : "Strategic recommendations tied to business problems, not channels. Ranked by business impact and confidence level."}
          </p>
        </div>

        {/* Critical Recommendations */}
        {criticalRecs.length > 0 && (
          <div className="space-y-4">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">{lang === "nb" ? "Kritisk prioritet" : "Critical Priority"}</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                {lang === "nb" ? "Umiddelbare tiltak" : "Immediate Actions"}
              </h2>
            </div>
            <div className="space-y-3">{criticalRecs.map(renderRecommendationCard)}</div>
          </div>
        )}

        {/* High Priority Recommendations */}
        {highRecs.length > 0 && (
          <div className="space-y-4">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">{lang === "nb" ? "Høy prioritet" : "High Priority"}</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                {lang === "nb" ? "Neste kvartal" : "Next Quarter"}
              </h2>
            </div>
            <div className="space-y-3">{highRecs.map(renderRecommendationCard)}</div>
          </div>
        )}

        {/* Medium Priority Recommendations */}
        {mediumRecs.length > 0 && (
          <div className="space-y-4">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">{lang === "nb" ? "Medium prioritet" : "Medium Priority"}</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                {lang === "nb" ? "Strategisk backlog" : "Strategic Backlog"}
              </h2>
            </div>
            <div className="space-y-3">{mediumRecs.map(renderRecommendationCard)}</div>
          </div>
        )}

        {/* Completed Recommendations */}
        {completedRecommendations.length > 0 && (
          <div className="space-y-4">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">{lang === "nb" ? "Fullførte initiativer" : "Completed"}</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                {lang === "nb" ? "Implementerte forbedringer" : "Implemented Improvements"}
              </h2>
            </div>

            <div className="space-y-3">
              {completedRecommendations.map((rec) => (
                <div
                  key={rec.id}
                  className="space-y-3 rounded-[1.75rem] border border-emerald-200/70 bg-emerald-50/40 p-5 dark:border-emerald-900/50 dark:bg-emerald-950/20"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600" />
                      <div className="flex-1">
                        <h3 className="font-semibold tracking-tight text-emerald-900 dark:text-emerald-100">{rec.title}</h3>
                        <p className="mt-1 text-sm text-emerald-800 dark:text-emerald-200">{rec.businessProblem}</p>
                      </div>
                    </div>
                    <Badge className="bg-emerald-200 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-200">Completed</Badge>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-lg bg-white/50 p-3 dark:bg-zinc-800/30">
                      <p className="text-xs uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-200">
                        {lang === "nb" ? "Oppnådd effekt" : "Achieved Impact"}
                      </p>
                      <p className="mt-1 text-sm font-medium text-emerald-900 dark:text-emerald-100">{rec.businessImpact}</p>
                    </div>
                    <div className="rounded-lg bg-white/50 p-3 dark:bg-zinc-800/30">
                      <p className="text-xs uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-200">
                        {lang === "nb" ? "Fullført" : "Completed"}
                      </p>
                      <p className="mt-1 text-sm font-medium text-emerald-900 dark:text-emerald-100">
                        {rec.implementationTracking.completionDate}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {rec.affectedChannels.map((channel: string) => (
                      <Badge key={channel} className={getChannelColor(channel)} variant="neutral">
                        {lang === "nb"
                          ? channel === "organic"
                            ? "Organisk"
                            : channel === "paid"
                            ? "Betalt"
                            : channel === "conversion"
                            ? "Konvertering"
                            : "Attribusjon"
                          : channel}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </PlatformShell>
  );
}
