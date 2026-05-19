"use client";

import { ArrowRight, Zap } from "lucide-react";

import { PlatformShell } from "@/components/layout/platform-shell";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

export default function IntelligencePage() {
  const sections = [
    {
      title: "Analyse av søkeintensjon",
      description: "Fordeling mellom informasjonsbehov, navigasjon og kommersiell intensjon.",
      insights: [
        {
          label: "Kommersielle konverteringer",
          value: "12%",
          context: "Lav konverteringsandel på kommersielle søk tyder på friksjon i landingssideopplevelsen.",
        },
        {
          label: "Udekket etterspørsel",
          value: "23%",
          context: "En betydelig del av høyvolums søk mangler målrettet innhold.",
        },
      ],
    },
    {
      title: "Etterspørsel og synlighet",
      description: "Sammenheng mellom søkevolum og faktisk synlighetsbidrag.",
      insights: [
        {
          label: "Prioriterte søkeord",
          value: "847",
          context: "Søkeord i posisjon 5-10 representerer rask gevinst ved riktig optimalisering.",
        },
        {
          label: "Crawl-budsjett brukt feil",
          value: "34%",
          context: "For mye kapasitet går til sider med lav kommersiell verdi.",
        },
      ],
    },
    {
      title: "Konverteringskvalitet",
      description: "Hvordan trafikk kvalitet omsettes til faktiske handlinger.",
      insights: [
        {
          label: "Mobil konverteringsrate",
          value: "2,1%",
          context: "Mobil ligger betydelig under desktop og trekker total effektivitet ned.",
        },
        {
          label: "Checkout-frafall",
          value: "35%",
          context: "Skjema og ytelse er de største friksjonspunktene i kjøpsflyten.",
        },
      ],
    },
    {
      title: "Attribusjonstillit",
      description: "Hvor presist verdi tilskrives mellom berøringspunkter i kundereisen.",
      insights: [
        {
          label: "Organisk først-touch",
          value: "48%",
          context: "Organisk initierer mange konverteringer, men får for lav verdiandel i dagens modell.",
        },
        {
          label: "Undervurdert landingssideeffekt",
          value: "62%",
          context: "Landingssidens rolle i beslutning tas ikke godt nok med i attribusjonen.",
        },
      ],
    },
  ];

  return (
    <PlatformShell>
      <div className="mx-auto max-w-6xl space-y-10">
        <header className="space-y-3 border-b border-zinc-200/70 pb-8 dark:border-zinc-800">
          <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">Strategisk resonnement</p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Kanalovergripende ytelsesintelligens</h1>
          <p className="max-w-3xl text-base leading-8 text-zinc-600 dark:text-zinc-300">
            Kobler signaler på tvers av organisk, betalt, konvertering og attribusjon for å forklare årsak, ikke bare resultat.
          </p>
        </header>

        <Card className="border-2 border-orange-200/70 bg-orange-50/40 dark:border-orange-900/50 dark:bg-orange-950/20">
          <div className="flex items-start gap-3">
            <Zap className="mt-0.5 h-5 w-5 flex-shrink-0 text-orange-600" />
            <div>
              <p className="font-semibold text-orange-900 dark:text-orange-100">Hovedfunn: Sammenkoblet ytelsesfall</p>
              <p className="mt-2 text-sm leading-7 text-orange-800 dark:text-orange-200">
                Organisk synlighet holder seg, men anskaffelseseffektiviteten svekkes av bredt samsvar og svak mobil konvertering.
                Isolert kanaloptimalisering er ikke nok; tiltak må koordineres på tvers av systemer.
              </p>
            </div>
          </div>
        </Card>

        <section className="space-y-8">
          {sections.map((section) => (
            <div key={section.title} className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold tracking-tight">{section.title}</h2>
                <p className="mt-2 text-sm leading-7 text-zinc-600 dark:text-zinc-400">{section.description}</p>
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                {section.insights.map((insight) => (
                  <Card key={insight.label} className="rounded-2xl">
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">{insight.label}</p>
                      <p className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">{insight.value}</p>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-400">{insight.context}</p>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </section>

        <Card className="border-zinc-200/80 bg-white/95 dark:border-zinc-800 dark:bg-zinc-900/90">
          <CardTitle>Kanalovergripende sammenhenger</CardTitle>
          <CardDescription className="mt-2">Nøkkelrelasjoner som forklarer hvorfor tallene beveger seg samlet.</CardDescription>

          <div className="mt-6 space-y-4">
            <Connection
              title="Organisk til landingsside"
              text="Når innhold og søkeintensjon ikke matcher, øker friksjonen i neste steg av reisen."
            />
            <Connection
              title="Betalt til organisk"
              text="Bredt samsvar på lav-intensjonssøk skjuler hvilke organiske muligheter som faktisk kan dekke behovet."
            />
            <Connection
              title="Attribusjon til budsjett"
              text="Når først-touch undervurderes, blir budsjettet flyttet bort fra tiltak som skaper etterspørsel tidlig i reisen."
            />
          </div>
        </Card>
      </div>
    </PlatformShell>
  );
}

function Connection({ title, text }: { title: string; text: string }) {
  return (
    <div className="flex items-center gap-4 rounded-xl bg-zinc-50 p-4 dark:bg-zinc-800/50">
      <div className="flex-1">
        <p className="font-medium text-zinc-900 dark:text-zinc-100">{title}</p>
        <p className="mt-1 text-sm leading-7 text-zinc-600 dark:text-zinc-400">{text}</p>
      </div>
      <ArrowRight className="h-4 w-4 flex-shrink-0 text-orange-600" />
    </div>
  );
}
