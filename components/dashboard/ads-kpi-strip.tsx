import { Card, CardDescription, CardTitle } from "@/components/ui/card";

const kpis = [
  { label: "Spend efficiency", value: "4.8x", delta: "+0.3" },
  { label: "Conversion quality", value: "78/100", delta: "-2" },
  { label: "Wasted spend risk", value: "kr 42k", delta: "+9%" },
  { label: "Automation dependency", value: "67%", delta: "+4%" },
];

export function AdsKpiStrip() {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {kpis.map((kpi) => (
        <Card className="border-zinc-200/90 bg-[#ece9e1]" key={kpi.label}>
          <CardDescription className="uppercase tracking-[0.08em] text-zinc-600">{kpi.label}</CardDescription>
          <CardTitle className="mt-3 text-3xl text-zinc-950">{kpi.value}</CardTitle>
          <p className="mt-3 text-sm font-medium text-orange-700">{kpi.delta} vs previous period</p>
        </Card>
      ))}
    </section>
  );
}
