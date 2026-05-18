import { Card, CardDescription, CardTitle } from "@/components/ui/card";

const modules = [
  {
    title: "Forretningsutvikling siste 90 dager",
    items: [
      "ROAS har styrket seg gjennom bedre kanalprioritering og skarpere budsjettallokering",
      "Andel kvalifiserte leads har okt etter forbedret malgruppe- og landingssidekvalitet",
      "Organisk synlighet vokser jevnt i hoy-verdi segmenter",
      "Attribusjonskvalitet er forbedret etter datavask og hendelsesstandardisering",
    ],
  },
  {
    title: "Arbeid som er levert",
    items: [
      "Rydding av teknisk SEO-gjeld pa prioriterte landingssider",
      "Bedre kampanjestruktur for hoy-intensjonssegmenter i betalt sok",
      "Forsterket rapportering med manedlig sammenligning mot forrige periode",
      "Datagrunnlag harmonisert pa tvers av plattformene for tryggere beslutninger",
    ],
  },
  {
    title: "Neste strategiske prioriteringer",
    items: [
      "Skalere investering i segmenter med hoy dokumentert margin",
      "Bygge videre pa SEO-vinnere med innholds- og internlenkestrategi",
      "Redusere svingninger i CPA med tettere pacing og alerts",
      "Loft av konverteringsrate via prioriterte mobilforbedringer",
    ],
  },
];

export function IntelligenceModules() {
  return (
    <section className="grid gap-6 pt-2 xl:grid-cols-3">
      {modules.map((module) => (
        <Card className="p-7" key={module.title}>
          <CardTitle className="text-lg">{module.title}</CardTitle>
          <CardDescription className="mt-2">Lederoversikt over fremdrift, leveranser og neste tiltak.</CardDescription>
          <ul className="mt-4 space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
            {module.items.map((item) => (
              <li className="rounded-2xl bg-zinc-50 px-3 py-2 dark:bg-zinc-800/60" key={item}>
                {item}
              </li>
            ))}
          </ul>
        </Card>
      ))}
    </section>
  );
}
