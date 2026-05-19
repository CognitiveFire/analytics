import { BarChart3, Brain, CheckSquare, Database, FileText, GitMerge, Shield } from "lucide-react";

import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const dataSources = [
  { label: "Google Ads", description: "Kampanjeytelse, ROAS, CPA, budsjettbruk og konverteringsdata per kampanje og annonsegruppe." },
  { label: "GA4", description: "Øktanalyse, engasjementsrate, brukerflyt og konverteringsattribusjon for alle kanaler." },
  { label: "Search Console", description: "Organisk søkesynlighet, klikk, visninger og posisjonstrend per URL og søkefrase." },
  { label: "Screaming Frog", description: "Teknisk SEO-helse: indekserbarhet, titler, H1-er, canonicals og intern lenkegraf." },
  { label: "CRM", description: "Lead-kvalitet nedstrøms, lukkerate per kanal og forbindelsesstyrke mellom betalte klikk og faktisk salg." },
  { label: "BigQuery / DV360 / CM360", description: "Medieutgifter på tvers av plattformer, impressjonsdata og frekvenskontroll for premium-kampanjer." },
];

const scoringFactors = [
  {
    label: "Datakomplethet",
    weight: "30 %",
    description: "Andel tilkoblede datakilder som leverer fullstendige og aktuelle data. Manglende kilder senker scoren.",
  },
  {
    label: "Kanaloverlapp",
    weight: "25 %",
    description: "Grad av samsvar mellom signaler fra ulike kanaler. Høy samsvar øker tilliten til konklusjoner.",
  },
  {
    label: "Attribusjonskvalitet",
    weight: "25 %",
    description: "Hvor godt konverteringer er sporbart koblet til annonsering og organisk innsats i CRM og GA4.",
  },
  {
    label: "Narrativ konsistens",
    weight: "20 %",
    description: "Vurdering av om dataene forteller en sammenhengende historie uten vesentlige motstridende signaler.",
  },
];

const sectionLogic = [
  {
    heading: "Sammendrag for ledelsen",
    icon: FileText,
    description:
      "Syntetiserer de viktigste endringene på tvers av alle tilkoblede datakilder til ett klart budskap. Formulert for beslutningstakere som ikke leser detaljerte kanalrapporter.",
    inputs: ["GA4 konverteringsdata", "Google Ads effektivitet", "CRM-lukkerate"],
  },
  {
    heading: "Operasjonelle anbefalinger",
    icon: CheckSquare,
    description:
      "Rangert liste over konkrete tiltak basert på prioritetsscore: (Effekt × Sikkerhet × Skala) / Kompleksitet. Kun tiltak med score over terskelverdi inkluderes.",
    inputs: ["Prioritetsscore fra oppgavemotoren", "Budsjettfrirom", "Historisk effekt"],
  },
  {
    heading: "Kanalovergripende innsikt",
    icon: GitMerge,
    description:
      "Kobler signaler fra betalt media, organisk søk, nettstedsatferd og CRM for å identifisere mønstre som ikke er synlige innenfor en enkelt kanal.",
    inputs: ["Search Console + Google Ads overlapp", "GA4 sesjonsflyt", "CRM nedstrømsdata"],
  },
  {
    heading: "Kundevennlig kommentar",
    icon: Brain,
    description:
      "Oversetter tekniske funn til klar og konkret lederkommunikasjon. Språket er kalibrert for styrerom og klientmøter, ikke for interne fagteam.",
    inputs: ["Alle seksjoner ovenfor", "Kundens strategiske prioriteringer", "Forrige måneds baseline"],
  },
];

const approvalSteps = [
  { step: "1", label: "Strategifaglig gjennomgang", detail: "Ansvarlig strateg verifiserer at anbefalinger samsvarer med kundens mål og avtalte rammeverk." },
  { step: "2", label: "Kvalitetssikring", detail: "Tverrfaglig gjennomgang av datagrunnlag, attribusjon og narrativ konsistens." },
  { step: "3", label: "Godkjenning og distribusjon", detail: "Godkjent rapport sendes til planlagt mottakerliste på avtalt dato og tidspunkt." },
];

export function ReportMethodologyGuide() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Shield className="h-5 w-5 text-orange-500" />
        <h2 className="text-lg font-semibold tracking-tight">Rapportmetodikk</h2>
        <Badge variant="neutral">Slik fungerer det</Badge>
      </div>

      {/* Data sources */}
      <Card>
        <div className="flex items-start gap-3">
          <Database className="mt-0.5 h-5 w-5 shrink-0 text-orange-500" />
          <div>
            <CardTitle className="text-base">Datakilder</CardTitle>
            <CardDescription className="mt-1">
              Rapporten samler signaler fra alle tilkoblede plattformer og veier dem mot hverandre for å gi et helhetlig bilde.
            </CardDescription>
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {dataSources.map((src) => (
            <div className="rounded-2xl border border-zinc-200/80 bg-zinc-50/60 p-4 dark:border-zinc-800 dark:bg-zinc-800/40" key={src.label}>
              <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{src.label}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">{src.description}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Narrative confidence scoring */}
      <Card>
        <div className="flex items-start gap-3">
          <BarChart3 className="mt-0.5 h-5 w-5 shrink-0 text-orange-500" />
          <div>
            <CardTitle className="text-base">Rapportsikkerhet — slik beregnes scoren</CardTitle>
            <CardDescription className="mt-1">
              Sikkerhetsprosenten viser hvor godt datagrunnlaget støtter konklusjonene i rapporten. Under 80 % utløser varselflagg.
            </CardDescription>
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {scoringFactors.map((factor) => (
            <div className="flex items-start gap-3 rounded-2xl border border-zinc-200/80 bg-zinc-50/60 p-4 dark:border-zinc-800 dark:bg-zinc-800/40" key={factor.label}>
              <span className="shrink-0 rounded-full bg-orange-100 px-2 py-0.5 text-xs font-semibold text-orange-700 dark:bg-orange-950/40 dark:text-orange-300">
                {factor.weight}
              </span>
              <div>
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{factor.label}</p>
                <p className="mt-1 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">{factor.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Section logic */}
      <Card>
        <div className="flex items-start gap-3">
          <GitMerge className="mt-0.5 h-5 w-5 shrink-0 text-orange-500" />
          <div>
            <CardTitle className="text-base">Rapportstruktur — hva er logikken bak hver seksjon?</CardTitle>
            <CardDescription className="mt-1">
              Hver seksjon er drevet av spesifikke datasignaler og bygger på seksjonen over for å skape en sammenhengende fortelling.
            </CardDescription>
          </div>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {sectionLogic.map((section) => {
            const Icon = section.icon;
            return (
              <div className="rounded-2xl border border-zinc-200/80 bg-zinc-50/60 p-5 dark:border-zinc-800 dark:bg-zinc-800/40" key={section.heading}>
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-orange-500" />
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{section.heading}</p>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">{section.description}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {section.inputs.map((input) => (
                    <span
                      className="rounded-full border border-zinc-200 bg-white px-2.5 py-0.5 text-xs text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400"
                      key={input}
                    >
                      {input}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Approval workflow */}
      <Card>
        <div className="flex items-start gap-3">
          <Shield className="mt-0.5 h-5 w-5 shrink-0 text-orange-500" />
          <div>
            <CardTitle className="text-base">Godkjennings- og distribusjonsflyt</CardTitle>
            <CardDescription className="mt-1">
              Alle rapporter gjennomgår tre kontrolltrinn før distribusjon til kunden.
            </CardDescription>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-0">
          {approvalSteps.map((item, i) => (
            <div className="flex items-start gap-4" key={item.step}>
              <div className="flex flex-col items-center">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-100 text-sm font-bold text-orange-700 dark:bg-orange-950/40 dark:text-orange-300">
                  {item.step}
                </div>
                {i < approvalSteps.length - 1 && (
                  <div className="mt-1 h-8 w-px bg-zinc-200 dark:bg-zinc-700" />
                )}
              </div>
              <div className="pb-6">
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{item.label}</p>
                <p className="mt-1 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
