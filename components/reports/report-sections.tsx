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
    heading: "Operasjonelle anbefalinger",
    description: "Prioriterte tiltak med forventet forretningseffekt og vurdert sikkerhetsniva.",
    highlights: [
      "Flytt 12% av budsjettet fra lav-intensjons prospektering til merkevare og remarketing.",
      "Gjennomfor SEO-forbedringer pa tjenestesider med hoy konvertering for neste crawl-syklus.",
    ],
  },
  {
    heading: "Kanalovergripende innsikt",
    description: "Samlet tolkning pa tvers av betalte kanaler, SEO, analyse og CRM-resultater.",
    highlights: [
      "Variasjonen i lead-kvalitet er konsentrert i mobil, betalt trafikk fra brede samsvar.",
      "Organiske landingssider med hoyest engasjement er underprioritert i betalte kampanjer.",
    ],
  },
  {
    heading: "Kundevennlig kommentar",
    description: "Tydelig kommentar til interessenter som forklarer resultater, arsaker og neste steg.",
    highlights: [
      "Marginpresset kan handteres med malrettet budsjettjustering og bedre sporingskvalitet.",
      "Planen for de neste 30 dagene prioriterer effektiv vekst og tillit til attribusjon.",
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
