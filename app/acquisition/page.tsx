"use client";

import { useEffect, useState } from "react";
import { TrendingDown } from "lucide-react";

import { PlatformShell } from "@/components/layout/platform-shell";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { resolveAdsLanguage } from "@/lib/ads/ui-language";
import { useTranslation } from "@/lib/translations/use-translation";

export default function AcquisitionPage() {
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

  return (
    <PlatformShell>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="border-b border-zinc-200/60 pb-6 dark:border-zinc-800">
          <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">
            {t("pages.acquisition.subtitle", "Conversion Intelligence")}
          </p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
            {t("pages.acquisition.title", "Paid Acquisition Efficiency")}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-zinc-600 dark:text-zinc-300">
            {lang === "nb"
              ? "Effektivitet for betalte kanaler, konverteringskvalitet og kommersiel intentjustering."
              : "Paid channel efficiency, conversion quality, and commercial intent alignment."}
          </p>
        </div>

        {/* Key Efficiency Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">ROAS</p>
              <div className="flex items-baseline justify-between">
                <p className="text-3xl font-bold">3.2x</p>
                <TrendingDown className="h-5 w-5 text-rose-500" />
              </div>
              <p className="text-sm text-rose-600">↓ 0.6x (broad match impact)</p>
            </div>
          </Card>

          <Card>
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Average CPA</p>
              <p className="text-3xl font-bold">$42</p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Exact: $28 | Broad: $65</p>
            </div>
          </Card>

          <Card>
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                {lang === "nb" ? "Konverteringssats" : "Conversion Rate"}
              </p>
              <p className="text-3xl font-bold">2.8%</p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">↓ 0.3% (mobile friction)</p>
            </div>
          </Card>

          <Card>
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Wasted Spend</p>
              <p className="text-3xl font-bold">$12K</p>
              <p className="text-sm text-rose-600">monthly opportunity</p>
            </div>
          </Card>
        </div>

        {/* Acquisition Efficiency Analysis */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">
            {lang === "nb" ? "Effektivitetsdrivere" : "Efficiency Drivers"}
          </h2>

          <div className="space-y-3">
            {[
              {
                title: lang === "nb" ? "Bredt samsvar-inneffektivitet" : "Broad Match Inefficiency",
                status: "critical",
                metric: "35% of conversions",
                description:
                  lang === "nb"
                    ? "Bredt samsvar-kampanjer fanger lav-intent spørsmål med CPA 2.3x høyere enn exact match. Negativ keyword-strategi og budget-reallokering kan forbedre ROAS med 18-22%."
                    : "Broad match campaigns capture low-intent queries at 2.3x CPA vs exact match. Negative keyword strategy and budget reallocation can improve ROAS by 18-22%.",
              },
              {
                title: lang === "nb" ? "Landing page-friksjon" : "Landing Page Friction",
                status: "critical",
                metric: "2.1% mobile conversion",
                description:
                  lang === "nb"
                    ? "Mobile checkout-oppgivelse på 35% vs 18% på desktop. Form-optimalisering, payment-alternativer og load-tid-forbedringer kan forbedre konvertering med 12-15%."
                    : "Mobile checkout abandonment at 35% vs 18% desktop. Form optimization, payment options, and load-time improvements can improve conversion by 12-15%.",
              },
              {
                title: lang === "nb" ? "Kommersiell intent-justering" : "Commercial Intent Alignment",
                status: "high",
                metric: "$8K monthly savings",
                description:
                  lang === "nb"
                    ? "Ikke-kommersielle søk (informasjon, navigasjon) bruker 45% av betalte budsjettet. Tetting av targeting mot kommersielle varianter frigjør $8K månedlig for høy-intent spørsmål."
                    : "Non-commercial searches (informational, navigational) consume 45% of paid budget. Tightening targeting to commercial variants frees $8K monthly for high-intent queries.",
              },
            ].map((driver) => (
              <Card key={driver.title} className="border-zinc-200/80 bg-white/95 dark:border-zinc-800 dark:bg-zinc-900/90">
                <div className="flex flex-col gap-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-semibold text-zinc-900 dark:text-zinc-100">{driver.title}</p>
                      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{driver.description}</p>
                    </div>
                    <Badge
                      className={
                        driver.status === "critical"
                          ? "bg-rose-100 text-rose-700 dark:bg-rose-900/30"
                          : "bg-amber-100 text-amber-700 dark:bg-amber-900/30"
                      }
                    >
                      {driver.status === "critical" ? "Critical" : "High"}
                    </Badge>
                  </div>
                  <div className="text-xs text-zinc-500">{driver.metric}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Budget Allocation */}
        <Card className="border-zinc-200/80 bg-white/95 dark:border-zinc-800 dark:bg-zinc-900/90">
          <CardTitle>{lang === "nb" ? "Budsjettfordeling" : "Budget Allocation"}</CardTitle>
          <CardDescription className="mt-2">
            {lang === "nb"
              ? "Anbefalt reallokering basert på effektivitetsanalyse"
              : "Recommended reallocation based on efficiency analysis"}
          </CardDescription>

          <div className="mt-6 space-y-3">
            {[
              { label: "Exact Match (High Intent)", current: "35%", recommended: "55%", change: "+20%" },
              { label: "Phrase Match (Commercial)", current: "25%", recommended: "30%", change: "+5%" },
              { label: "Broad Match (Awareness)", current: "40%", recommended: "15%", change: "-25%" },
            ].map((item) => (
              <div key={item.label} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{item.label}</span>
                  <Badge variant="neutral" className="text-xs">
                    {item.change}
                  </Badge>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-8 flex-1 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                    <div
                      className="h-full bg-zinc-400 dark:bg-zinc-600"
                      style={{ width: item.current }}
                    />
                  </div>
                  <div className="w-16 text-right">
                    <p className="text-xs text-zinc-500">{item.current} → {item.recommended}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Conversion Quality Signals */}
        <Card className="border-zinc-200/80 bg-white/95 dark:border-zinc-800 dark:bg-zinc-900/90">
          <CardTitle>{lang === "nb" ? "Konverteringskvalitet" : "Conversion Quality"}</CardTitle>
          <CardDescription className="mt-2">
            {lang === "nb"
              ? "Signaler som påvirker konverteringseffektivitet på tvers av kanaler"
              : "Signals impacting conversion efficiency across channels"}
          </CardDescription>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              {
                metric: lang === "nb" ? "Mobile opplevelse" : "Mobile Experience",
                score: 32,
                context: "35% checkout abandonment",
              },
              {
                metric: lang === "nb" ? "Søketerm-relevans" : "Search Term Relevance",
                score: 78,
                context: "Exact match performs well",
              },
              {
                metric: lang === "nb" ? "Landing page-innhold" : "Landing Page Content",
                score: 65,
                context: "23% content gap for commercial terms",
              },
              {
                metric: lang === "nb" ? "Call-to-Action klarhet" : "CTA Clarity",
                score: 72,
                context: "Mobile CTA sizing improvements needed",
              },
            ].map((signal) => (
              <div key={signal.metric} className="rounded-lg bg-zinc-50 p-4 dark:bg-zinc-800/50">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{signal.metric}</span>
                  <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{signal.score}</span>
                </div>
                <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">{signal.context}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </PlatformShell>
  );
}
