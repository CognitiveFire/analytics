"use client";

import { AlertTriangle, TrendingDown, Lightbulb, CheckCircle2 } from "lucide-react";

import { PlatformShell } from "@/components/layout/platform-shell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  getDemoOperationalAlerts,
  getDemoOperationalMetrics,
  getDemoOperationalRecommendations,
} from "@/lib/mock-data/operational-recommendations";

export default function OverviewPage() {
  const alerts = getDemoOperationalAlerts();
  const metrics = getDemoOperationalMetrics();
  const recommendations = getDemoOperationalRecommendations();

  const criticalAlerts = alerts.filter((a) => a.severity === "critical");
  const highOpportunities = alerts.filter((a) => a.type === "opportunity" && a.severity === "high");

  return (
    <PlatformShell>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="border-b border-zinc-200/60 pb-6 dark:border-zinc-800">
          <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">Strategisk innsikt</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">Operasjonell oversikt for ledelsen</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-zinc-600 dark:text-zinc-300">
            Sanntidssammendrag av operasjonelle risikoer, muligheter og implementeringsfremdrift på tvers av kanaler.
          </p>
        </div>

        {/* Critical Alerts Section */}
        {criticalAlerts.length > 0 && (
          <div className="space-y-4">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">Kritiske risikoer</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight">Operasjonelle varsler</h2>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              {criticalAlerts.map((alert) => (
                <div
                  key={alert.title}
                  className="flex flex-col gap-4 rounded-[1.75rem] border border-rose-200/70 bg-rose-50/40 p-5 dark:border-rose-900/50 dark:bg-rose-950/20"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="mt-1 h-5 w-5 flex-shrink-0 text-rose-600 dark:text-rose-500" />
                      <div>
                        <p className="font-semibold text-rose-900 dark:text-rose-100">{alert.title}</p>
                        <p className="mt-1 text-sm leading-relaxed text-rose-800 dark:text-rose-200">{alert.description}</p>
                      </div>
                    </div>
                    <Badge className="bg-rose-200 text-rose-900 dark:bg-rose-900/50 dark:text-rose-200">Kritisk</Badge>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {alert.affectedChannels.map((channel) => (
                      <Badge key={channel} variant="neutral" className="text-xs">
                        {channel === "organic"
                          ? "Organisk"
                          : channel === "paid"
                          ? "Betalt"
                          : channel === "conversion"
                          ? "Konvertering"
                          : "Attribusjon"}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Strategic Opportunities */}
        {highOpportunities.length > 0 && (
          <div className="space-y-4">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">Unyttet potensial</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight">Strategiske muligheter</h2>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              {highOpportunities.map((opp) => (
                <div
                  key={opp.title}
                  className="flex flex-col gap-4 rounded-[1.75rem] border border-amber-200/70 bg-amber-50/40 p-5 dark:border-amber-900/50 dark:bg-amber-950/20"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <Lightbulb className="mt-1 h-5 w-5 flex-shrink-0 text-amber-600 dark:text-amber-500" />
                      <div>
                        <p className="font-semibold text-amber-900 dark:text-amber-100">{opp.title}</p>
                        <p className="mt-1 text-sm leading-relaxed text-amber-800 dark:text-amber-200">{opp.description}</p>
                      </div>
                    </div>
                    <Badge className="bg-amber-200 text-amber-900 dark:bg-amber-900/50 dark:text-amber-200">Mulighet</Badge>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {opp.affectedChannels.map((channel) => (
                      <Badge key={channel} variant="neutral" className="text-xs">
                        {channel === "organic"
                          ? "Organisk"
                          : channel === "paid"
                          ? "Betalt"
                          : channel === "conversion"
                          ? "Konvertering"
                          : "Attribusjon"}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Performance Intelligence Summary */}
        <div className="space-y-4">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">Ytelsesoppsummering</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">Operasjonelle nøkkelmål</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Organic Visibility */}
            <Card className="flex flex-col">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Søkesynlighet</p>
                  <p className="text-3xl font-bold tracking-tight">{metrics.organicVisibility.currentScore}</p>
                </div>
                <TrendingDown className="h-5 w-5 text-rose-500" />
              </div>
              <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                <Badge variant="warning" className="text-xs">
                  {metrics.organicVisibility.trend === "down" ? "↓ -4 pts" : "↑"}
                </Badge>
                <p className="mt-2 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">{metrics.organicVisibility.opportunity}</p>
              </div>
            </Card>

            {/* Paid Efficiency */}
            <Card className="flex flex-col">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">ROAS</p>
                  <p className="text-3xl font-bold tracking-tight">{metrics.paidEfficiency.currentRoas.toFixed(1)}x</p>
                </div>
                <TrendingDown className="h-5 w-5 text-rose-500" />
              </div>
              <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                <Badge variant="warning" className="text-xs">
                  {metrics.paidEfficiency.trend === "down" ? "↓ -0.6x" : "↑"}
                </Badge>
                <p className="mt-2 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">{metrics.paidEfficiency.opportunity}</p>
              </div>
            </Card>

            {/* Conversion Quality */}
            <Card className="flex flex-col">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Konverteringsrate</p>
                  <p className="text-3xl font-bold tracking-tight">{metrics.conversionQuality.currentRate.toFixed(2)}%</p>
                </div>
                <TrendingDown className="h-5 w-5 text-rose-500" />
              </div>
              <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                <Badge variant="warning" className="text-xs">
                  {metrics.conversionQuality.trend === "down" ? "↓ -14%" : "↑"}
                </Badge>
                <p className="mt-2 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">{metrics.conversionQuality.opportunity}</p>
              </div>
            </Card>

            {/* Attribution Confidence */}
            <Card className="flex flex-col">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Attribusjonstillit</p>
                  <p className="text-3xl font-bold tracking-tight">{metrics.attributionConfidence.currentScore}%</p>
                </div>
                <TrendingDown className="h-5 w-5 text-rose-500" />
              </div>
              <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                <Badge variant="warning" className="text-xs">
                  {metrics.attributionConfidence.trend === "down" ? "↓ -2 pts" : "↑"}
                </Badge>
                <p className="mt-2 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">{metrics.attributionConfidence.opportunity}</p>
              </div>
            </Card>
          </div>
        </div>

        {/* Top Recommendations */}
        <div className="space-y-4">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">Prioritet</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">Tre viktigste anbefalinger</h2>
          </div>

          <div className="space-y-3">
            {recommendations.slice(0, 3).map((rec) => (
              <div
                key={rec.id}
                className="flex flex-col gap-3 rounded-[1.5rem] border border-zinc-200/80 bg-white/90 p-5 dark:border-zinc-800 dark:bg-zinc-900/80"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3">
                      {rec.priority === "critical" ? (
                        <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-rose-600" />
                      ) : (
                        <Lightbulb className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600" />
                      )}
                      <div className="flex-1">
                        <p className="font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">{rec.title}</p>
                        <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{rec.businessProblem}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge className={rec.priority === "critical" ? "bg-rose-100 text-rose-700 dark:bg-rose-900/50" : ""}>
                      {rec.priority === "critical" ? "Kritisk" : "Høy"}
                    </Badge>
                    <Badge variant="neutral" className="text-xs">
                      {rec.confidenceScore}% sikkerhet
                    </Badge>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {rec.affectedChannels.map((channel) => (
                    <Badge key={channel} variant="neutral" className="text-xs">
                      {channel === "organic"
                        ? "Organisk"
                        : channel === "paid"
                        ? "Betalt"
                        : channel === "conversion"
                        ? "Konvertering"
                        : "Attribusjon"}
                    </Badge>
                  ))}
                </div>

                <div className="mt-2 flex items-center justify-between text-xs">
                  <span className="text-zinc-500">
                    {`Påvirker: ${rec.businessImpact.substring(0, 50)}...`}
                  </span>
                  {rec.implementationTracking.progressPercent > 0 && (
                    <span className="text-emerald-600">
                      {rec.implementationTracking.progressPercent}% fullført
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Completed Improvements */}
        <div className="rounded-[1.75rem] border border-emerald-200/70 bg-emerald-50/40 p-6 dark:border-emerald-900/50 dark:bg-emerald-950/20">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600" />
            <div>
              <p className="font-semibold text-emerald-900 dark:text-emerald-100">
                Fullførte forbedringer denne måneden
              </p>
              <p className="mt-2 text-sm leading-relaxed text-emerald-800 dark:text-emerald-200">
                2 større initiativer fullført: konsolidering av duplisert innhold (18% gevinst i crawl-effektivitet) og implementering av negative søkeord (22% forbedring i CPA).
              </p>
            </div>
          </div>
        </div>
      </div>
    </PlatformShell>
  );
}
