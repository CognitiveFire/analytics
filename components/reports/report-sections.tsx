import { Card, CardDescription, CardTitle } from "@/components/ui/card";

export interface ReportSection {
  heading: string;
  description: string;
  highlights: string[];
}

const defaultSections: ReportSection[] = [
  {
    heading: "Sammendrag for ledelsen",
    description: "Strategisk sammendrag med fokus pa hva som har endret seg, hvorfor det har skjedd, og hva som bor gjores videre.",
    highlights: [
      "Effektiviteten i betalt annonsering er svakere, mens volumet er stabilt i hovedkampanjer.",
      "Merkevareettersporsel er fortsatt den tydeligste kortsiktige muligheten for bedre margin.",
    ],
  },
  {
    heading: "Betalt medierapport - KPI",
    description: "Detaljer om betalt annonseringsytelse og effektivitetsindikatorer.",
    highlights: [
      "Månedlig kostnad: kr 289k, opp 5,8% fra forrige periode.",
      "ROAS-ytelse: 4,9x, ned 6,3% - optimalisering er nødvendig i brede match-kampanjer.",
      "Kostnad per anskaffelse (CPA): kr 42,10, opp 3,1% på tvers av alle kanaler.",
      "Konverteringskvalitets-score: 79/100, ned 4,6% - gjennomgå lead-scoringskriterier.",
      "Automatiseringsavhengighet på 67% med økende avhengighet av budsjettstrategier.",
      "Budsjettfordeling viser optimal ytelse i merkevare- og remarketing-segmenter.",
    ],
  },
  {
    heading: "Betalte medier-anbefalinger",
    description: "AI-assisterte anbefalinger støttet av deterministiske signaler for kampanjeoptimalisering.",
    highlights: [
      "Nåværende konverteringssporing virker altfor avhengig av lead-innsendinger med lav intensjon.",
      "Target ROAS-kampanjer mangler tilstrekkelig konverteringstetthet for stabil optimalisering.",
      "Broad match-utvidelse matcher i økende grad informasjonsdrevne søk med synkende effektivitet.",
      "Flytt 12% av budsjettet fra lav-intensjons prospektering til merkevare og remarketing.",
      "Gjennomfør strengere publikumseksklusjoner basert på nedstrøms kvalitetssignaler.",
      "Øk daglig budsjett for kampanjer med ROAS over 5,0x terskel.",
    ],
  },
  {
    heading: "SEO-resultatrapport",
    description: "Organisk søk-synlighet, teknisk helse og innholdsytelses-metrikker.",
    highlights: [
      "SEO-synlighetsscore: 63,4, opp 8,7% - organisk kanal får fart.",
      "Crawl-analyse viser 287 totale URLs med 261 indekserbare sider (90,9% dekning).",
      "Kritiske problemer: 3 manglende titler, 7 dupliserte titler, 4 kanoniske konflikter identifisert.",
      "Teknisk helse: 18 noindex-sider, 8 omdirigeringer, sterk intern linkgraf med 4 521 inlinks.",
      "Toppprioritet: Fiks dupliserte H1-tagger (12 instanser) og manglende meta-beskrivelser.",
      "Landingssidefraksjon på mobil gjenstår konverteringslekkasjepunkt - 5 kritiske rettelser identifisert.",
    ],
  },
  {
    heading: "Operasjonelle anbefalinger",
    description: "Prioriterte tiltak med forventet forretningseffekt og vurdert sikkerhetsniva.",
    highlights: [
      "Flytt 12% av budsjettet fra lav-intensjons prospektering til merkevare og remarketing.",
      "Gjennomfor SEO-forbedringer pa tjenestesider med hoy konvertering for neste crawl-syklus.",
      "Løs kanoniske konflikter og standardiser titteltagg-formatering for indekserbarshet.",
      "Bedre mobil-landingsside-opplevelse for å redusere konverteringsfriksjon.",
      "Konsolider automatiseringsstrategi med manuelle kontrollporter for merkevaresikkerhet.",
    ],
  },
  {
    heading: "Kanalovergripende innsikt",
    description: "Samlet tolkning pa tvers av betalte kanaler, SEO, analyse og CRM-resultater.",
    highlights: [
      "Variasjonen i lead-kvalitet er konsentrert i mobil, betalt trafikk fra brede samsvar.",
      "Organiske landingssider med hoyest engasjement er underprioritert i betalte kampanjer.",
      "SEO-gevinster er alignert med forbedrede merkevarebevissthetsmålinger fra betalt media.",
      "Gap-analyse viser 23% av høy-intensjons organisk trafikk ikke fanget av betalte merkevarekampanjer.",
      "CRM-data bekrefter lavere kvalitet fra informasjonsmatch-kampanjer vs merkevareintensjon.",
      "Attribusjon viser 34% assisterte konversjoner fra organisk tross 22% trafikk-andel.",
    ],
  },
  {
    heading: "Kundevennlig kommentar",
    description: "Tydelig kommentar til interessenter som forklarer resultater, arsaker og neste steg.",
    highlights: [
      "Marginpresset kan handteres med malrettet budsjettjustering og bedre sporingskvalitet.",
      "Planen for de neste 30 dagene prioriterer effektiv vekst og tillit til attribusjon.",
      "Organisk synlighet styrkes mens betalt effektivitet krever taktisk optimalisering.",
      "Kvalitetsforbedringer i lead-scoring og publikumsanvisning låser opp 15-18% ROAS-potensial.",
      "Teknisk SEO-grunnlag er solid - gjenværende arbeid er høy-ROI-rettelser på templates.",
      "Anbefalt fokus: disiplin betalt budsjettfordeling + akselerere SEO-innholdsutvidelse.",
    ],
  },
];

export function ReportSections({ sections = defaultSections }: { sections?: ReportSection[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {sections.map((section) => (
        <Card key={section.heading}>
          <CardTitle className="text-lg">{section.heading}</CardTitle>
          <CardDescription className="mt-3">{section.description}</CardDescription>

          <div className="mt-5 space-y-2">
            {section.highlights.map((highlight) => (
              <p className="rounded-2xl bg-zinc-100 px-4 py-3 text-sm text-zinc-600 dark:bg-zinc-800/70 dark:text-zinc-300" key={highlight}>
                {highlight}
              </p>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}
