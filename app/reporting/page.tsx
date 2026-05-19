"use client";

import { useEffect, useState } from "react";

import { PlatformShell } from "@/components/layout/platform-shell";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { resolveAdsLanguage } from "@/lib/ads/ui-language";
import { useTranslation } from "@/lib/translations/use-translation";

export default function ReportingPage() {
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
            {t("pages.reporting.subtitle", "Strategic Reporting")}
          </p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
            {t("pages.reporting.title", "Executive Performance Report")}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-zinc-600 dark:text-zinc-300">
            {lang === "nb"
              ? "Ledersammendrag med kanalovergripende innsikt, implementeringssporing og forretningseffekt."
              : "Executive summary with cross-channel insights, implementation tracking, and business impact."}
          </p>
        </div>

        {/* Executive Summary */}
        <Card className="border-2 border-orange-200/60 bg-orange-50/40 p-6 dark:border-orange-900/50 dark:bg-orange-950/20">
          <CardTitle className="text-orange-900 dark:text-orange-100">
            {lang === "nb" ? "Sammendrag for ledelsen" : "Executive Summary"}
          </CardTitle>
          <CardDescription className="mt-2 text-orange-800 dark:text-orange-200">
            {lang === "nb"
              ? "Strategisk oversikt over ytelse, endringer og anbefalte tiltak"
              : "Strategic overview of performance, changes, and recommended actions"}
          </CardDescription>

          <p className="mt-4 leading-relaxed text-orange-900 dark:text-orange-100">
            {lang === "nb"
              ? "Signal Room har identifisert en sammenkoblet ytelsesnedgang over organisk søk, betalt anskaffelse og konvertering. Organisk synlighet forbedret for kommersielle serviceider, men anskaffelseseffektiviteten svekket på grunn av bredt samsvar-utvidelse og redusert landing page-konverteringskvalitet. Disse systemene er koblet. Fem kritiske og høyprioritet-anbefalinger kan rette trend og låse opp 45-60% effektivitetsgevinster over neste kvartal."
              : "Signal Room has identified an interconnected performance decline across organic search, paid acquisition, and conversion. Organic visibility improved for commercial service pages, but acquisition efficiency weakened due to broad match expansion and reduced landing page conversion quality. These systems are interconnected. Five critical and high-priority recommendations can reverse trends and unlock 45-60% efficiency gains over next quarter."}
          </p>
        </Card>

        {/* Report Sections */}
        <div className="space-y-6">
          {/* Demand & Visibility */}
          <Card className="border-zinc-200/80 bg-white/95 dark:border-zinc-800 dark:bg-zinc-900/90">
            <CardTitle>{lang === "nb" ? "Etterspørsel og synlighet" : "Demand & Visibility"}</CardTitle>
            <CardDescription className="mt-2">
              {lang === "nb" ? "Organisk søkeytelses- og synlighetsinteliges" : "Organic search performance and visibility intelligence"}
            </CardDescription>

            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between rounded-lg bg-zinc-50 p-3 dark:bg-zinc-800/50">
                <span className="text-sm font-medium">{lang === "nb" ? "Søkesynlighetsscore" : "Search Visibility Score"}</span>
                <div className="text-right">
                  <p className="text-lg font-bold">68</p>
                  <p className="text-xs text-rose-600">↓ 4 pts</p>
                </div>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-zinc-50 p-3 dark:bg-zinc-800/50">
                <span className="text-sm font-medium">{lang === "nb" ? "Høy-mulighet keywords" : "High-Opportunity Keywords"}</span>
                <p className="text-lg font-bold">847 keywords</p>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-zinc-50 p-3 dark:bg-zinc-800/50">
                <span className="text-sm font-medium">{lang === "nb" ? "Innholdsdekning" : "Content Coverage"}</span>
                <Badge variant="warning">23% gap</Badge>
              </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {lang === "nb"
                ? "Algoritmeendringer og økt konkurranse påvirket synligheten. 847 høy-mulighet keywords identifisert for ranking-forbedringer. Content-justering og intern lenke-arkitektur-optimalisering kan låse opp 15-20% visninggevinst."
                : "Algorithm updates and increased competition impacted visibility. 847 high-opportunity keywords identified for ranking improvements. Content alignment and internal link architecture optimization can unlock 15-20% visibility gain."}
            </p>
          </Card>

          {/* Acquisition Efficiency */}
          <Card className="border-zinc-200/80 bg-white/95 dark:border-zinc-800 dark:bg-zinc-900/90">
            <CardTitle>{lang === "nb" ? "Anskaffelseseffektivitet" : "Acquisition Efficiency"}</CardTitle>
            <CardDescription className="mt-2">
              {lang === "nb" ? "Ytelse for betalte kanaler og konverteringskvalitet" : "Paid channel performance and conversion quality"}
            </CardDescription>

            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between rounded-lg bg-zinc-50 p-3 dark:bg-zinc-800/50">
                <span className="text-sm font-medium">ROAS</span>
                <div className="text-right">
                  <p className="text-lg font-bold">3.2x</p>
                  <p className="text-xs text-rose-600">↓ 0.6x</p>
                </div>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-zinc-50 p-3 dark:bg-zinc-800/50">
                <span className="text-sm font-medium">{lang === "nb" ? "Gjennomsnittlig CPA" : "Average CPA"}</span>
                <p className="text-lg font-bold">$42</p>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-zinc-50 p-3 dark:bg-zinc-800/50">
                <span className="text-sm font-medium">{lang === "nb" ? "Sløsert utgift" : "Wasted Spend"}</span>
                <Badge className="bg-rose-100 text-rose-700 dark:bg-rose-900/30">$12K/month</Badge>
              </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {lang === "nb"
                ? "Bred-samsvar-kampanjer fanger lav-intent spørsmål til 2.3x høyere CPA. Negativ keyword-strategi og budsjett-reallokering mot exact-match kan forbedre ROAS med 18-22% uten volum-tap."
                : "Broad-match campaigns capture low-intent queries at 2.3x higher CPA. Negative keyword strategy and budget reallocation to exact match can improve ROAS by 18-22% without volume loss."}
            </p>
          </Card>

          {/* Landing Page Performance */}
          <Card className="border-zinc-200/80 bg-white/95 dark:border-zinc-800 dark:bg-zinc-900/90">
            <CardTitle>{lang === "nb" ? "Landing side-ytelse" : "Landing Page Performance"}</CardTitle>
            <CardDescription className="mt-2">
              {lang === "nb" ? "Konverteringskvalitet og brukeropplevelsesmål" : "Conversion quality and user experience metrics"}
            </CardDescription>

            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between rounded-lg bg-zinc-50 p-3 dark:bg-zinc-800/50">
                <span className="text-sm font-medium">{lang === "nb" ? "Mobil konverteringssats" : "Mobile Conversion Rate"}</span>
                <div className="text-right">
                  <p className="text-lg font-bold">2.1%</p>
                  <p className="text-xs text-rose-600">↓ 14%</p>
                </div>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-zinc-50 p-3 dark:bg-zinc-800/50">
                <span className="text-sm font-medium">{lang === "nb" ? "Checkout-oppgivelse" : "Checkout Abandonment"}</span>
                <Badge variant="warning">35% mobile</Badge>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-zinc-50 p-3 dark:bg-zinc-800/50">
                <span className="text-sm font-medium">{lang === "nb" ? "Desktop sammenligning" : "Desktop Comparison"}</span>
                <p className="text-lg font-bold">4.2% | 18% abandon</p>
              </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {lang === "nb"
                ? "Mobile konvertering har falt 14% over 8 uker. Hovedfriksjoner: form-kompleksitet, payment-metode-alternativer, loading-tid. UX-optimalisering kan forbedre mobil konvertering med 12-15%."
                : "Mobile conversion declined 14% over 8 weeks. Primary friction points: form complexity, payment method options, load time. UX optimization can improve mobile conversion by 12-15%."}
            </p>
          </Card>

          {/* Attribution Confidence */}
          <Card className="border-zinc-200/80 bg-white/95 dark:border-zinc-800 dark:bg-zinc-900/90">
            <CardTitle>{lang === "nb" ? "Attribusjonstillit" : "Attribution Confidence"}</CardTitle>
            <CardDescription className="mt-2">
              {lang === "nb" ? "Nøyaktighet for kanalovergripende attribusjon og inntektssporing" : "Cross-channel attribution accuracy and revenue tracking"}
            </CardDescription>

            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between rounded-lg bg-zinc-50 p-3 dark:bg-zinc-800/50">
                <span className="text-sm font-medium">{lang === "nb" ? "Attribusjontillit" : "Attribution Confidence"}</span>
                <div className="text-right">
                  <p className="text-lg font-bold">62%</p>
                  <p className="text-xs text-amber-600">↓ 2 pts</p>
                </div>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-zinc-50 p-3 dark:bg-zinc-800/50">
                <span className="text-sm font-medium">{lang === "nb" ? "Organisk først-touch" : "Organic First-Touch"}</span>
                <Badge variant="warning">48% of conversions</Badge>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-zinc-50 p-3 dark:bg-zinc-800/50">
                <span className="text-sm font-medium">{lang === "nb" ? "Last-click undervurdering" : "Last-Click Undervaluation"}</span>
                <p className="text-lg font-bold">65% undervalued</p>
              </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {lang === "nb"
                ? "Last-click attributions-modellen undervurderer organisk søk (65%) og first-touch-rolle (48%). Data-driven attribusjon kan forbedre budsjett-allokerings-nøyaktighet med 18-25%."
                : "Last-click attribution model undervalues organic search (65%) and first-touch role (48%). Data-driven attribution can improve budget allocation accuracy by 18-25%."}
            </p>
          </Card>

          {/* Implementation Tracking */}
          <Card className="border-zinc-200/80 bg-white/95 dark:border-zinc-800 dark:bg-zinc-900/90">
            <CardTitle>{lang === "nb" ? "Implementeringssporing" : "Implementation Tracking"}</CardTitle>
            <CardDescription className="mt-2">
              {lang === "nb" ? "Status og forventet forretningseffekt av prioriterte tiltak" : "Status and expected business impact of prioritized actions"}
            </CardDescription>

            <div className="mt-6 space-y-3">
              {[
                {
                  title: lang === "nb" ? "I gang (35% fullført)" : "In Progress (35% complete)",
                  items: ["Reduser bredt-samsvar-utgifter", "Implementer negative keywords", "Budget-justering til exact match"],
                },
                {
                  title: lang === "nb" ? "Planlagt (startes denne uken)" : "Planned (starting this week)",
                  items: ["Mobile UX-optimalisering", "Landing page-innhold justeres", "Intern link-arkitektur-restrukturering"],
                },
                {
                  title: lang === "nb" ? "Fullført denne måneden" : "Completed This Month",
                  items: ["Dupliser innhold-konsolidering (18% crawl-gevinst)", "Negative keyword-implementering (22% CPA-forbedring)"],
                },
              ].map((section) => (
                <div key={section.title} className="space-y-2">
                  <p className="font-medium text-zinc-900 dark:text-zinc-100">{section.title}</p>
                  <ul className="space-y-1">
                    {section.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Card>

          {/* Business Impact Summary */}
          <Card className="border-2 border-emerald-200/70 bg-emerald-50/40 p-6 dark:border-emerald-900/50 dark:bg-emerald-950/20">
            <CardTitle className="text-emerald-900 dark:text-emerald-100">
              {lang === "nb" ? "Forventet forretningseffekt" : "Expected Business Impact"}
            </CardTitle>

            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between rounded-lg bg-white/50 p-3 dark:bg-zinc-800/30">
                <span className="text-sm font-medium text-emerald-900 dark:text-emerald-100">
                  {lang === "nb" ? "Gjennomsnittlig ROAS-forbedring" : "Average ROAS Improvement"}
                </span>
                <p className="text-lg font-bold text-emerald-700 dark:text-emerald-200">+18-22%</p>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-white/50 p-3 dark:bg-zinc-800/30">
                <span className="text-sm font-medium text-emerald-900 dark:text-emerald-100">
                  {lang === "nb" ? "Organisk synlighetssgevinst" : "Organic Visibility Gain"}
                </span>
                <p className="text-lg font-bold text-emerald-700 dark:text-emerald-200">+15-20%</p>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-white/50 p-3 dark:bg-zinc-800/30">
                <span className="text-sm font-medium text-emerald-900 dark:text-emerald-100">
                  {lang === "nb" ? "Konverteringskvalitets-forbedring" : "Conversion Quality Lift"}
                </span>
                <p className="text-lg font-bold text-emerald-700 dark:text-emerald-200">+12-15%</p>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-white/50 p-3 dark:bg-zinc-800/30">
                <span className="text-sm font-medium text-emerald-900 dark:text-emerald-100">
                  {lang === "nb" ? "Månedlig utgiftsbesparing" : "Monthly Spend Savings"}
                </span>
                <p className="text-lg font-bold text-emerald-700 dark:text-emerald-200">$12-15K</p>
              </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-emerald-800 dark:text-emerald-200">
              {lang === "nb"
                ? "Med prioritert implementering av kritiske og høyprioritet-anbefalinger, kan kumulativ effekt oppnå 45-60% samlet effektivitetsgevinst over neste kvartal, med estimert $45-60K årlig verdiskapning."
                : "With prioritized implementation of critical and high-priority recommendations, cumulative impact can achieve 45-60% combined efficiency gain over next quarter, with estimated $45-60K annual value creation."}
            </p>
          </Card>
        </div>
      </div>
    </PlatformShell>
  );
}
