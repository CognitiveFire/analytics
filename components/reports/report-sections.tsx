import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { AdsLanguage } from "@/lib/ads/ui-language";

export interface ReportSection {
  heading: string;
  description: string;
  highlights: string[];
}

const defaultSectionsByLanguage: Record<AdsLanguage, ReportSection[]> = {
  en: [
    {
      heading: "Executive Summary",
      description: "Strategic narrative focused on what changed, why it changed, and what should happen next.",
      highlights: [
        "Paid efficiency softened while volume stayed stable across core campaigns.",
        "Brand demand capture remains the clearest short-term margin opportunity.",
      ],
    },
    {
      heading: "Paid Media KPI Report",
      description: "Detailed paid advertising performance metrics and efficiency indicators.",
      highlights: [
        "Monthly spend: kr 289k, up 5.8% from previous period.",
        "ROAS performance: 4.9x, down 6.3% - optimization needed in broad match campaigns.",
        "Cost per acquisition (CPA): kr 42.10, up 3.1% across all channels.",
        "Conversion quality score: 79/100, down 4.6% - review lead scoring criteria.",
        "Automation dependency at 67% with increasing reliance on bid strategies.",
        "Budget allocation showing optimal performance in branded and remarketing segments.",
      ],
    },
    {
      heading: "Paid Media Recommendations",
      description: "AI-assisted recommendations backed by deterministic signals for campaign optimization.",
      highlights: [
        "Current conversion tracking appears overly dependent on low-intent lead submissions.",
        "Target ROAS campaigns lack sufficient conversion density for stable optimization.",
        "Broad match expansion is increasingly matching informational queries with declining efficiency.",
        "Shift 12% budget from low-intent prospecting to branded and remarketing campaigns.",
        "Implement tighter audience exclusions based on downstream quality signals.",
        "Increase daily budget for campaigns with ROAS above 5.0x threshold.",
      ],
    },
    {
      heading: "SEO Performance Report",
      description: "Organic search visibility, technical health, and content performance metrics.",
      highlights: [
        "SEO visibility score: 63.4, up 8.7% - organic channel gaining momentum.",
        "Crawl analysis shows 287 total URLs with 261 indexable pages (90.9% coverage).",
        "Critical issues: 3 missing titles, 7 duplicate titles, 4 canonical conflicts identified.",
        "Technical health: 18 noindex pages, 8 redirects, strong internal link graph with 4,521 inlinks.",
        "Top opportunity: Fix duplicate H1 tags (12 instances) and missing meta descriptions.",
        "Landing page friction on mobile remains conversion leakage point - 5 critical fixes identified.",
      ],
    },
    {
      heading: "Operational Recommendations",
      description: "Prioritised actions with expected commercial impact and confidence levels.",
      highlights: [
        "Shift 12% budget from low-intent prospecting to branded and remarketing campaigns.",
        "Implement SEO fixes on high-converting service templates before next crawl cycle.",
        "Resolve canonical conflicts and standardize title tag formatting for indexability.",
        "Improve mobile landing page experience to reduce conversion friction.",
        "Consolidate automation strategy with manual control gates for brand safety.",
      ],
    },
    {
      heading: "Cross-Channel Intelligence",
      description: "Unified interpretation across paid media, SEO, analytics, and CRM outcomes.",
      highlights: [
        "Lead quality variance is concentrated in mobile paid traffic from broad match groups.",
        "Organic landing pages with strongest engagement are under-supported by paid campaigns.",
        "SEO gains aligned with improved brand awareness metrics from paid media.",
        "Gap analysis shows 23% of high-intent organic traffic not captured by paid brand campaigns.",
        "CRM data confirms lower quality from informational match campaigns vs branded intent.",
        "Attribution shows 34% assisted conversions from organic despite 22% traffic share.",
      ],
    },
    {
      heading: "Client-Ready Commentary",
      description: "Premium consultancy-style language designed for stakeholder communication.",
      highlights: [
        "Margin pressure is manageable with targeted budget correction and tracking hygiene.",
        "The next 30-day plan prioritises efficient growth and confidence in attribution.",
        "Organic visibility is strengthening while paid efficiency requires tactical optimization.",
        "Quality improvements in lead scoring and audience targeting unlock 15-18% ROAS potential.",
        "Technical SEO foundation is sound - remaining work is high-ROI fixes on templates.",
        "Recommended focus: discipline paid budget allocation + accelerate SEO content expansion.",
      ],
    },
  ],
  nb: [
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
  ],
};

export function getDefaultReportSections(lang: AdsLanguage = "nb"): ReportSection[] {
  return defaultSectionsByLanguage[lang] ?? defaultSectionsByLanguage.nb;
}

export function ReportSections({ lang = "nb", sections }: { lang?: AdsLanguage; sections?: ReportSection[] }) {
  const sectionsToRender = sections ?? getDefaultReportSections(lang);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {sectionsToRender.map((section) => (
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
