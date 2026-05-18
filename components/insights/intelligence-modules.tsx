import { Card, CardDescription, CardTitle } from "@/components/ui/card";

const modules = [
  {
    title: "Innsikt i betalt sok",
    items: [
      "Stabilitet i budstrategi og avhengighet av automatisering",
      "Effektivitet i broad match og konsentrasjon av bortkastet budsjett",
      "Tap av impression share og kampanjevolatilitet",
      "Monstre i konverteringskvalitet per intensjonssegment",
    ],
  },
  {
    title: "SEO-innsikt",
    items: [
      "Synlighetstrender og dekning for ikke-merkevarevekst",
      "Tekniske SEO-avvik og crawl-helse",
      "Indeksering av landingssider og innholdsmuligheter",
      "Ytelse pa maleniva og mulighetsklynger",
    ],
  },
  {
    title: "Landingssideytelse",
    items: [
      "Budskapsrelevans og engasjementskvalitet",
      "Bounce-monstre og mobil UX-friksjon",
      "Diagnostikk for fall i konvertering",
      "Sidehastighet og flaskehalser i interaksjon",
    ],
  },
];

export function IntelligenceModules() {
  return (
    <section className="grid gap-4 xl:grid-cols-3">
      {modules.map((module) => (
        <Card key={module.title}>
          <CardTitle className="text-lg">{module.title}</CardTitle>
          <CardDescription className="mt-2">Operasjonell diagnostikk og prioritert tolkning</CardDescription>
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
