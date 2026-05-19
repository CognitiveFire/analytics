"use client";

import { useEffect, useState } from "react";

import { PlatformShell } from "@/components/layout/platform-shell";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { resolveAdsLanguage } from "@/lib/ads/ui-language";
import { useTranslation } from "@/lib/translations/use-translation";

export default function VisibilityPage() {
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
            {t("pages.visibility.subtitle", "Organic Intelligence")}
          </p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
            {t("pages.visibility.title", "Search Demand & Visibility")}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-zinc-600 dark:text-zinc-300">
            {lang === "nb"
              ? "Organisk søkesynlighet, etterspørselsanalyse og teknisk helseinteliges."
              : "Organic search visibility, demand analysis, and technical health intelligence."}
          </p>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                {lang === "nb" ? "Søkesynlighetsscore" : "Search Visibility Score"}
              </p>
              <p className="text-3xl font-bold">68</p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">↓ 4 pts (algorithm impact)</p>
            </div>
          </Card>

          <Card>
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                {lang === "nb" ? "Høy-mulighet keywords" : "High-Opportunity Keywords"}
              </p>
              <p className="text-3xl font-bold">847</p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">ranking positions 5-10</p>
            </div>
          </Card>

          <Card>
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                {lang === "nb" ? "Indekseringshelse" : "Indexation Health"}
              </p>
              <p className="text-3xl font-bold">94%</p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">of crawled URLs indexed</p>
            </div>
          </Card>
        </div>

        {/* Visibility Drivers */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">
            {lang === "nb" ? "Synlighetsdrivere" : "Visibility Drivers"}
          </h2>

          <div className="space-y-3">
            {[
              {
                title: lang === "nb" ? "Innholdsjustering" : "Content Alignment",
                impact: "23% visibility improvement potential",
                description:
                  lang === "nb"
                    ? "23 av 40 høy-mulighet kommersielle keywords mangler tilpasset innhold. Content-tema utvidelse kan åpne 12-15% ytterligere synlighet."
                    : "23 of 40 high-opportunity commercial keywords lack aligned content. Content topic expansion can unlock 12-15% additional visibility.",
              },
              {
                title: lang === "nb" ? "Intern lenkearkitektur" : "Internal Link Architecture",
                impact: "15% crawl budget improvement potential",
                description:
                  lang === "nb"
                    ? "301 thin/duplisert sider og suboptimal lenkestruktur bruker 34% av crawl-budsjettet uten ranking-verdi. Konsolidering og strategisk lenking frigir budsjettet."
                    : "301 thin/duplicate pages and suboptimal link structure consume 34% of crawl budget with no ranking value. Consolidation and strategic linking frees budget.",
              },
              {
                title: lang === "nb" ? "Teknisk SEO" : "Technical SEO",
                impact: "8% performance improvement potential",
                description:
                  lang === "nb"
                    ? "Core Web Vitals forbedringer, spesielt på mobil. Load-tid optimalisering vil forbedre ranking-signaler og brukeropplevelse."
                    : "Core Web Vitals improvements, especially mobile. Load-time optimization will improve ranking signals and user experience.",
              },
            ].map((driver) => (
              <Card key={driver.title} className="border-zinc-200/80 bg-white/95 dark:border-zinc-800 dark:bg-zinc-900/90">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1">
                    <p className="font-semibold text-zinc-900 dark:text-zinc-100">{driver.title}</p>
                    <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{driver.description}</p>
                  </div>
                  <Badge className="whitespace-nowrap">{driver.impact}</Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Technical Health */}
        <Card className="border-zinc-200/80 bg-white/95 dark:border-zinc-800 dark:bg-zinc-900/90">
          <CardTitle>{lang === "nb" ? "Teknisk helse" : "Technical Health"}</CardTitle>
          <CardDescription className="mt-2">
            {lang === "nb"
              ? "Screaming Frog crawl-analyse og Search Console signals"
              : "Screaming Frog crawl analysis and Search Console signals"}
          </CardDescription>

          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between rounded-lg bg-zinc-50 p-3 dark:bg-zinc-800/50">
              <span className="text-sm font-medium">{lang === "nb" ? "Saknade titler" : "Missing Titles"}</span>
              <Badge variant="warning">31 pages</Badge>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-zinc-50 p-3 dark:bg-zinc-800/50">
              <span className="text-sm font-medium">{lang === "nb" ? "Dupliserte titler" : "Duplicate Titles"}</span>
              <Badge variant="warning">22 pages</Badge>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-zinc-50 p-3 dark:bg-zinc-800/50">
              <span className="text-sm font-medium">{lang === "nb" ? "Saknade H1" : "Missing H1"}</span>
              <Badge variant="warning">44 pages</Badge>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-zinc-50 p-3 dark:bg-zinc-800/50">
              <span className="text-sm font-medium">{lang === "nb" ? "Canonical-avvik" : "Canonical Issues"}</span>
              <Badge variant="warning">27 pages</Badge>
            </div>
          </div>
        </Card>
      </div>
    </PlatformShell>
  );
}
