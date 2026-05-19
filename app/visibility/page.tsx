"use client";

import { PlatformShell } from "@/components/layout/platform-shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

export default function VisibilityPage() {
  return (
    <PlatformShell>
      <div className="mx-auto max-w-6xl space-y-10">
        <header className="space-y-3 border-b border-zinc-200/70 pb-8 dark:border-zinc-800">
          <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">Organisk intelligens</p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Etterspørsel og synlighet i søk</h1>
          <p className="max-w-3xl text-base leading-8 text-zinc-600 dark:text-zinc-300">
            Helhetlig bilde av organisk synlighet, innholdsdekning og teknisk helsetilstand.
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <MetricCard title="Synlighetsscore" value="68" note="Ned 4 poeng siste periode" />
          <MetricCard title="Høy-mulighetssøkeord" value="847" note="Mest i posisjon 5-10" />
          <MetricCard title="Indekseringshelse" value="94%" note="Andel indekserte URL-er" />
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">Hva som driver synlighet</h2>
          <div className="space-y-3">
            {[
              {
                title: "Innholdsjustering",
                impact: "12-15% potensial",
                description:
                  "23 av 40 kommersielle nøkkelord mangler tydelig innholdsmatch. Utvidelse av temasider vil løfte relevans og klikkrate.",
              },
              {
                title: "Intern lenkestruktur",
                impact: "15% bedre crawl-effektivitet",
                description:
                  "Duplikatsider og svak intern lenkeflyt bruker unødvendig crawl-budsjett. Konsolidering gir bedre prioritering av viktige sider.",
              },
              {
                title: "Teknisk kvalitet",
                impact: "8% ytelsesgevinst",
                description:
                  "Core Web Vitals på mobil trekker ned rangeringssignaler. Lastetid og stabilitet bør prioriteres i neste sprint.",
              },
            ].map((driver) => (
              <Card key={driver.title} className="border-zinc-200/80 bg-white/95 dark:border-zinc-800 dark:bg-zinc-900/90">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="space-y-2">
                    <p className="font-semibold text-zinc-900 dark:text-zinc-100">{driver.title}</p>
                    <p className="text-sm leading-7 text-zinc-600 dark:text-zinc-400">{driver.description}</p>
                  </div>
                  <Badge className="whitespace-nowrap bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-200">{driver.impact}</Badge>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <Card className="border-zinc-200/80 bg-white/95 dark:border-zinc-800 dark:bg-zinc-900/90">
          <CardTitle>Teknisk helse</CardTitle>
          <CardDescription className="mt-2">Kritiske punkter fra crawl-analyse og Search Console.</CardDescription>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Issue label="Manglende titler" value="31 sider" />
            <Issue label="Dupliserte titler" value="22 sider" />
            <Issue label="Manglende H1" value="44 sider" />
            <Issue label="Canonical-avvik" value="27 sider" />
          </div>
        </Card>
      </div>
    </PlatformShell>
  );
}

function MetricCard({ title, value, note }: { title: string; value: string; note: string }) {
  return (
    <Card className="space-y-2">
      <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">{title}</p>
      <p className="text-3xl font-bold">{value}</p>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">{note}</p>
    </Card>
  );
}

function Issue({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-zinc-50 p-3 dark:bg-zinc-800/50">
      <span className="text-sm font-medium">{label}</span>
      <Badge variant="warning">{value}</Badge>
    </div>
  );
}
