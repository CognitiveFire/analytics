"use client";

import { TrendingDown } from "lucide-react";

import { PlatformShell } from "@/components/layout/platform-shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

export default function AcquisitionPage() {
  return (
    <PlatformShell>
      <div className="mx-auto max-w-6xl space-y-10">
        <header className="space-y-3 border-b border-zinc-200/70 pb-8 dark:border-zinc-800">
          <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">Konverteringsintelligens</p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Effektivitet i betalt anskaffelse</h1>
          <p className="max-w-3xl text-base leading-8 text-zinc-600 dark:text-zinc-300">
            Oversikt over kostnadseffektivitet, konverteringskvalitet og kvaliteten i kommersiell målretting.
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Card className="space-y-2">
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">ROAS</p>
            <div className="flex items-baseline justify-between">
              <p className="text-3xl font-bold">3,2x</p>
              <TrendingDown className="h-5 w-5 text-rose-500" />
            </div>
            <p className="text-sm text-rose-600">Ned 0,6x siste 30 dager</p>
          </Card>

          <Card className="space-y-2">
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Gjennomsnittlig CPA</p>
            <p className="text-3xl font-bold">kr 450</p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Eksakt: kr 300 • Bredt: kr 700</p>
          </Card>

          <Card className="space-y-2">
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Konverteringsrate</p>
            <p className="text-3xl font-bold">2,8%</p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Ned 0,3 prosentpoeng</p>
          </Card>

          <Card className="space-y-2">
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Optimaliseringspotensial</p>
            <p className="text-3xl font-bold">kr 125 000</p>
            <p className="text-sm text-rose-600">Estimert månedlig besparelse</p>
          </Card>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">Effektivitetsdrivere</h2>
          <div className="space-y-3">
            {[
              {
                title: "Ineffektivitet i bredt samsvar",
                status: "Kritisk",
                metric: "35% av konverteringer",
                description:
                  "Bredt samsvar fanger lav-intensjonssøk med CPA på 2,3x av eksakt samsvar. Strammere negativ søkeordstrategi kan løfte ROAS med 18-22%.",
              },
              {
                title: "Friksjon på landingssider",
                status: "Kritisk",
                metric: "2,1% mobil konvertering",
                description:
                  "Mobil checkout-avbrudd ligger på 35% mot 18% på desktop. Forenklet skjema, raskere lastetid og tydeligere kjøpsflyt vil redusere frafall.",
              },
              {
                title: "Svak kommersiell intensjon",
                status: "Høy",
                metric: "kr 85 000 per måned",
                description:
                  "45% av budsjettet går til informasjonssøk. Omfordeling mot høy-intensjonssøk frigjør betydelig budsjett uten volumtap.",
              },
            ].map((driver) => (
              <Card key={driver.title} className="border-zinc-200/80 bg-white/95 dark:border-zinc-800 dark:bg-zinc-900/90">
                <div className="flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2">
                      <p className="font-semibold text-zinc-900 dark:text-zinc-100">{driver.title}</p>
                      <p className="text-sm leading-7 text-zinc-600 dark:text-zinc-400">{driver.description}</p>
                    </div>
                    <Badge
                      className={
                        driver.status === "Kritisk"
                          ? "bg-rose-100 text-rose-700 dark:bg-rose-900/30"
                          : "bg-amber-100 text-amber-700 dark:bg-amber-900/30"
                      }
                    >
                      {driver.status}
                    </Badge>
                  </div>
                  <p className="text-xs uppercase tracking-[0.12em] text-zinc-500">{driver.metric}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="grid gap-4 xl:grid-cols-2">
          <Card className="border-zinc-200/80 bg-white/95 dark:border-zinc-800 dark:bg-zinc-900/90">
            <CardTitle>Budsjettfordeling</CardTitle>
            <CardDescription className="mt-2">Anbefalt allokering basert på effektivitet og konverteringskvalitet.</CardDescription>

            <div className="mt-6 space-y-4">
              {[
                { label: "Eksakt samsvar", current: "35%", recommended: "55%", change: "+20%" },
                { label: "Frasesamsvar", current: "25%", recommended: "30%", change: "+5%" },
                { label: "Bredt samsvar", current: "40%", recommended: "15%", change: "-25%" },
              ].map((item) => (
                <div key={item.label} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{item.label}</span>
                    <Badge variant="neutral" className="text-xs">
                      {item.change}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-8 flex-1 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                      <div className="h-full bg-zinc-500 dark:bg-zinc-600" style={{ width: item.current }} />
                    </div>
                    <p className="w-20 text-right text-xs text-zinc-500">
                      {item.current} til {item.recommended}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="border-zinc-200/80 bg-white/95 dark:border-zinc-800 dark:bg-zinc-900/90">
            <CardTitle>Signaler for konverteringskvalitet</CardTitle>
            <CardDescription className="mt-2">Kvalitetsindikatorer som forklarer hvorfor anskaffelseskostnaden øker.</CardDescription>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                { metric: "Mobilopplevelse", score: 32, context: "Høyt frafall i checkout" },
                { metric: "Søketerm-relevans", score: 78, context: "Eksakt samsvar leverer stabilt" },
                { metric: "Landingsside-innhold", score: 65, context: "Manglende dekning på kommersielle termer" },
                { metric: "Tydelighet i CTA", score: 72, context: "Forbedringsbehov på mobil" },
              ].map((signal) => (
                <div key={signal.metric} className="rounded-xl bg-zinc-50 p-4 dark:bg-zinc-800/50">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{signal.metric}</span>
                    <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{signal.score}</span>
                  </div>
                  <p className="mt-2 text-xs leading-6 text-zinc-600 dark:text-zinc-400">{signal.context}</p>
                </div>
              ))}
            </div>
          </Card>
        </section>
      </div>
    </PlatformShell>
  );
}
