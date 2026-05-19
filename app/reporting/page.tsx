"use client";

import { PlatformShell } from "@/components/layout/platform-shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

export default function ReportingPage() {
  return (
    <PlatformShell>
      <div className="mx-auto max-w-6xl space-y-10">
        <header className="space-y-3 border-b border-zinc-200/70 pb-8 dark:border-zinc-800">
          <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">Strategisk rapportering</p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Resultatrapport for ledelsen</h1>
          <p className="max-w-3xl text-base leading-8 text-zinc-600 dark:text-zinc-300">
            Samlet rapport med kanalovergripende innsikt, implementeringsstatus og forventet forretningseffekt.
          </p>
        </header>

        <Card className="border-2 border-orange-200/70 bg-orange-50/40 dark:border-orange-900/50 dark:bg-orange-950/20">
          <CardTitle className="text-orange-900 dark:text-orange-100">Sammendrag</CardTitle>
          <CardDescription className="mt-2 text-orange-800 dark:text-orange-200">
            Hovedfunn fra perioden og hva som bør prioriteres nå.
          </CardDescription>
          <p className="mt-4 leading-8 text-orange-900 dark:text-orange-100">
            Vi ser en sammenkoblet ytelsesnedgang mellom organisk synlighet, betalt anskaffelse og konverteringskvalitet. Fem
            prioriterte tiltak kan snu trenden og gi 45-60% samlet effektivitetsforbedring i neste kvartal.
          </p>
        </Card>

        <section className="grid gap-5 lg:grid-cols-2">
          <Card className="space-y-4">
            <CardTitle>Etterspørsel og synlighet</CardTitle>
            <CardDescription>Organisk synlighet og dekning av kommersiell etterspørsel.</CardDescription>
            <div className="space-y-3">
              <Row label="Søkesynlighet" value="68" delta="Ned 4 poeng" />
              <Row label="Høy-mulighetssøkeord" value="847" delta="Posisjon 5-10" />
              <Row label="Innholdsdekning" value="77%" delta="23% gap" />
            </div>
            <p className="text-sm leading-7 text-zinc-600 dark:text-zinc-400">
              Innholdsjustering og intern lenkestruktur vil kunne gi 15-20% synlighetsgevinst.
            </p>
          </Card>

          <Card className="space-y-4">
            <CardTitle>Anskaffelseseffektivitet</CardTitle>
            <CardDescription>Kostnad og kvalitet i betalt trafikk.</CardDescription>
            <div className="space-y-3">
              <Row label="ROAS" value="3,2x" delta="Ned 0,6x" />
              <Row label="Gjennomsnittlig CPA" value="kr 450" delta="Over målnivå" />
              <Row label="Optimaliseringspotensial" value="kr 125 000/mnd" delta="Ved strengere søkeordstyring" />
            </div>
            <p className="text-sm leading-7 text-zinc-600 dark:text-zinc-400">
              Bredt samsvar står for mesteparten av ineffektiviteten. Målrettet omfordeling vil bedre lønnsomheten uten vesentlig
              volumnedgang.
            </p>
          </Card>

          <Card className="space-y-4">
            <CardTitle>Landingsside og konvertering</CardTitle>
            <CardDescription>Friksjonspunkter som påvirker sluttføring.</CardDescription>
            <div className="space-y-3">
              <Row label="Mobil konverteringsrate" value="2,1%" delta="Ned 14%" />
              <Row label="Checkout-frafall mobil" value="35%" delta="Desktop: 18%" />
              <Row label="Forventet løft" value="12-15%" delta="Ved UX-forbedringer" />
            </div>
            <p className="text-sm leading-7 text-zinc-600 dark:text-zinc-400">
              Forenklede skjema, raskere lastetid og tydeligere handlingsknapper er de mest effektive tiltakene.
            </p>
          </Card>

          <Card className="space-y-4">
            <CardTitle>Attribusjon og beslutningsgrunnlag</CardTitle>
            <CardDescription>Hvor sikkert vi kan fordele verdi mellom kanaler.</CardDescription>
            <div className="space-y-3">
              <Row label="Attribusjonstillit" value="62%" delta="Ned 2 poeng" />
              <Row label="Undervurdering av organisk" value="65%" delta="I last-click-modell" />
              <Row label="Forbedringspotensial" value="18-25%" delta="Med datadrevet modell" />
            </div>
            <p className="text-sm leading-7 text-zinc-600 dark:text-zinc-400">
              En datadrevet attribusjonsmodell vil gi mer presis budsjettallokering og tydeligere effektmåling.
            </p>
          </Card>
        </section>

        <Card className="border-2 border-emerald-200/70 bg-emerald-50/40 dark:border-emerald-900/50 dark:bg-emerald-950/20">
          <CardTitle className="text-emerald-900 dark:text-emerald-100">Forventet forretningseffekt</CardTitle>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <ImpactRow label="ROAS-forbedring" value="+18-22%" />
            <ImpactRow label="Synlighetsgevinst" value="+15-20%" />
            <ImpactRow label="Konverteringsløft" value="+12-15%" />
            <ImpactRow label="Årlig verdipotensial" value="kr 470 000 - 625 000" />
          </div>
          <p className="mt-4 text-sm leading-7 text-emerald-800 dark:text-emerald-200">
            Med konsekvent gjennomføring av kritiske og høyprioriterte tiltak forventes markant forbedring i både lønnsomhet og
            veksttempo i kommende kvartal.
          </p>
        </Card>
      </div>
    </PlatformShell>
  );
}

function Row({ label, value, delta }: { label: string; value: string; delta: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-zinc-50 p-3 dark:bg-zinc-800/50">
      <span className="text-sm font-medium">{label}</span>
      <div className="text-right">
        <p className="text-lg font-bold">{value}</p>
        <p className="text-xs text-zinc-500">{delta}</p>
      </div>
    </div>
  );
}

function ImpactRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-white/60 p-3 dark:bg-zinc-800/30">
      <span className="text-sm font-medium text-emerald-900 dark:text-emerald-100">{label}</span>
      <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200">{value}</Badge>
    </div>
  );
}
