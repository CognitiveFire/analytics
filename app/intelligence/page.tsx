"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Zap } from "lucide-react";

import { PlatformShell } from "@/components/layout/platform-shell";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { resolveAdsLanguage } from "@/lib/ads/ui-language";
import { useTranslation } from "@/lib/translations/use-translation";

export default function IntelligencePage() {
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

  const sections = [
    {
      title: lang === "nb" ? "Søkeintent-analyse" : "Search Intent Analysis",
      description:
        lang === "nb"
          ? "Klassifisering av organisk trafikk etter intentsignal: 40% informativ, 35% navigasjon, 25% kommersiell."
          : "Classification of organic traffic by intent signal: 40% informational, 35% navigational, 25% commercial.",
      insights: [
        {
          label: lang === "nb" ? "Kommersielle konverteringer" : "Commercial Conversions",
          value: "12%",
          context:
            lang === "nb"
              ? "Kun 12% av kommersielle spørsmål konverteres til leads - konverteringsfriksjon på mobile enheter er hovedproblemet."
              : "Only 12% of commercial queries convert to leads - mobile conversion friction is the primary issue.",
        },
        {
          label: lang === "nb" ? "Uutnyttet etterspørsel" : "Untapped Demand",
          value: "23%",
          context:
            lang === "nb"
              ? "23% av høy-volum kommersielle søk er ikke dekket av gjeldende innhold."
              : "23% of high-volume commercial searches lack current content coverage.",
        },
      ],
    },
    {
      title: lang === "nb" ? "Etterspørselssynlighetsanalyse" : "Demand Visibility Analysis",
      description:
        lang === "nb"
          ? "Korrelasjon mellom søkeetterspørsel og organisk synlighetsbidrag. 15% av søkevolumet genererer 68% av click-through."
          : "Correlation between search demand and organic visibility contribution. 15% of search volume drives 68% of clicks.",
      insights: [
        {
          label: lang === "nb" ? "Prioriterte keywords" : "Priority Keywords",
          value: "847",
          context:
            lang === "nb"
              ? "847 høy-mulighetssøkord identifisert for ranking-forbedringer. Estimert 25-30% synlighetsgevinst."
              : "847 high-opportunity keywords identified for ranking improvements. Estimated 25-30% visibility gain.",
        },
        {
          label: lang === "nb" ? "Crawl-budsjett-sløsing" : "Crawl Budget Waste",
          value: "34%",
          context:
            lang === "nb"
              ? "34% av crawl-budsjettet brukes på low-intent og duplisert innhold."
              : "34% of crawl budget spent on low-intent and duplicate content.",
        },
      ],
    },
    {
      title: lang === "nb" ? "Konverteringskvalitetsanalyse" : "Conversion Quality Analysis",
      description:
        lang === "nb"
          ? "Multi-kanalkonverteringsfunnel med fokus på mobile- og landing page-problemer."
          : "Multi-channel conversion funnel focused on mobile and landing page friction.",
      insights: [
        {
          label: lang === "nb" ? "Mobil konverteringskvalitet" : "Mobile Conversion Quality",
          value: "2.1%",
          context:
            lang === "nb"
              ? "2.1% konverteringssats på mobil vs 4.2% på desktop. 14% nedgang over 8 uker."
              : "2.1% conversion rate on mobile vs 4.2% on desktop. 14% decline over 8 weeks.",
        },
        {
          label: lang === "nb" ? "Checkout-oppgivelse" : "Checkout Abandonment",
          value: "35%",
          context:
            lang === "nb"
              ? "35% av mobile checkouts oppgis vs 18% på desktop. Primære friksjonspunkter: form, paymentmetoder, loading-tid."
              : "35% mobile checkout abandonment vs 18% desktop. Primary friction: form, payment methods, load time.",
        },
      ],
    },
    {
      title: lang === "nb" ? "Attribusjonstillitsanalyse" : "Attribution Confidence Analysis",
      description:
        lang === "nb"
          ? "Multi-touch attribusjon over 40% av konversjoner som ikke er fanget av last-click-modellen."
          : "Multi-touch attribution reveals 40% of conversions missed by last-click model.",
      insights: [
        {
          label: lang === "nb" ? "Organisk først-touch" : "Organic First-Touch",
          value: "48%",
          context:
            lang === "nb"
              ? "Organisk søk initierer 48% av konversjoner, men tilskrives kun 15% av verdien i last-click-modellen."
              : "Organic search initiates 48% of conversions but receives only 15% of value in last-click model.",
        },
        {
          label: lang === "nb" ? "Landing page-rolle" : "Landing Page Role",
          value: "62%",
          context:
            lang === "nb"
              ? "Landing page-kvalitet påvirker 62% av konversjoner, men er ikke eksplisitt atribuert."
              : "Landing page quality impacts 62% of conversions but isn't explicitly attributed.",
        },
      ],
    },
  ];

  return (
    <PlatformShell>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="border-b border-zinc-200/60 pb-6 dark:border-zinc-800">
          <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">{t("pages.intelligence.subtitle", "Strategic Reasoning")}</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
            {t("pages.intelligence.title", "Cross-Channel Performance Intelligence")}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-zinc-600 dark:text-zinc-300">
            {lang === "nb"
              ? "Integrert analyse av ytelseskausalitet, signalforhold og operasjonelle mønstre på tvers av organisk, betalt, konvertering og attribusjon."
              : "Integrated analysis of performance causality, signal relationships, and operational patterns across organic, paid, conversion, and attribution."}
          </p>
        </div>

        {/* Key Strategic Insight */}
        <Card className="border-2 border-orange-200/60 bg-orange-50/40 p-6 dark:border-orange-900/50 dark:bg-orange-950/20">
          <div className="flex items-start gap-3">
            <Zap className="mt-0.5 h-5 w-5 flex-shrink-0 text-orange-600" />
            <div>
              <p className="font-semibold text-orange-900 dark:text-orange-100">
                {lang === "nb" ? "Hovedoppdagelse: Sammenkoblet ytelsesnedgang" : "Key Finding: Interconnected Performance Decline"}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-orange-800 dark:text-orange-200">
                {lang === "nb"
                  ? "Organisk synlighet forbedret for kommersielle serviceider, men anskaffelseseffektiviteten svekket på grunn av bredt samsvar-utvidelse og redusert landing page-konverteringskvalitet. Disse systemene er koblet - enkeltkanals optimalisering uten kryss-kanalresonnement slår ikke til."
                  : "Organic visibility improved for commercial service pages, but acquisition efficiency weakened due to broad match expansion and reduced landing page conversion quality. These systems are interconnected—single-channel optimization without cross-channel reasoning fails."}
              </p>
            </div>
          </div>
        </Card>

        {/* Intelligence Sections */}
        <div className="space-y-6">
          {sections.map((section) => (
            <div key={section.title} className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold tracking-tight">{section.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{section.description}</p>
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                {section.insights.map((insight) => (
                  <div key={insight.label} className="rounded-[1.5rem] border border-zinc-200/80 bg-white/90 p-5 dark:border-zinc-800 dark:bg-zinc-900/80">
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">{insight.label}</p>
                      <p className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">{insight.value}</p>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{insight.context}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Cross-Channel Connection Map */}
        <Card className="border-zinc-200/80 bg-white/95 dark:border-zinc-800 dark:bg-zinc-900/90">
          <CardTitle className="text-lg">{lang === "nb" ? "Kanalovergripende forbindelser" : "Cross-Channel Connections"}</CardTitle>
          <CardDescription className="mt-2">
            {lang === "nb"
              ? "Hvordan organisk, betalt, konvertering og attribusjon-signaler påvirker hverandre."
              : "How organic, paid, conversion, and attribution signals impact each other."}
          </CardDescription>

          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-4 rounded-lg bg-zinc-50 p-4 dark:bg-zinc-800/50">
              <div className="flex-1">
                <p className="font-medium text-zinc-900 dark:text-zinc-100">
                  {lang === "nb" ? "Organisk → Landing Page Konvertering" : "Organic → Landing Page Conversion"}
                </p>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  {lang === "nb"
                    ? "Organisk søkere forventer høy relevanssamsvar. Hvis landing page-innhold ikke matcher søkekontekst, øker konverteringsfriksjon 3.2x."
                    : "Organic searchers expect high relevance match. If landing page content doesn't match search context, conversion friction increases 3.2x."}
                </p>
              </div>
              <ArrowRight className="h-4 w-4 flex-shrink-0 text-orange-600" />
            </div>

            <div className="flex items-center gap-4 rounded-lg bg-zinc-50 p-4 dark:bg-zinc-800/50">
              <div className="flex-1">
                <p className="font-medium text-zinc-900 dark:text-zinc-100">
                  {lang === "nb" ? "Betalt (bredt) → Organisk Konkurranse" : "Paid (Broad) → Organic Competition"}
                </p>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  {lang === "nb"
                    ? "Bredt-samsvar-annonsering på lav-intent ord skjuler organiske liste-muligheter. Reduksjon av betalt low-intent-volum åpner opp organisk synlighetspotensial."
                    : "Broad-match ad spending on low-intent terms obscures organic listing opportunities. Reducing paid low-intent volume unlocks organic visibility potential."}
                </p>
              </div>
              <ArrowRight className="h-4 w-4 flex-shrink-0 text-orange-600" />
            </div>

            <div className="flex items-center gap-4 rounded-lg bg-zinc-50 p-4 dark:bg-zinc-800/50">
              <div className="flex-1">
                <p className="font-medium text-zinc-900 dark:text-zinc-100">
                  {lang === "nb" ? "Attribusjon → Budsjett-allokering" : "Attribution → Budget Allocation"}
                </p>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  {lang === "nb"
                    ? "Last-click attribusjon undervurderer organisk og first-touch-rollen. Hvis organisk ikke er atribuert riktig, under-finansieres organisk strategi med 40-60%."
                    : "Last-click attribution undervalues organic and first-touch role. If organic isn't properly attributed, organic strategy is underfunded by 40-60%."}
                </p>
              </div>
              <ArrowRight className="h-4 w-4 flex-shrink-0 text-orange-600" />
            </div>
          </div>
        </Card>
      </div>
    </PlatformShell>
  );
}
