import { AdsLanguage } from "@/lib/ads/ui-language";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

const findingsByLanguage: Record<AdsLanguage, string[]> = {
  nb: [
    "Nåværende konverteringssporing ser ut til å være for avhengig av leads med lav intensjon.",
    "Target ROAS-kampanjer kan mangle tilstrekkelig konverteringstetthet for stabil optimalisering.",
    "Broad match-utvidelse matcher i økende grad informasjonsdrevne søk med fallende effektivitet.",
    "Merkevarekampanjer er fortsatt budsjettbegrenset mens ineffektiv prospektering fortsetter å skalere.",
  ],
  en: [
    "Current conversion tracking appears overly dependent on low-intent lead submissions.",
    "Target ROAS campaigns may lack sufficient conversion density for stable optimisation.",
    "Broad match expansion is increasingly matching informational queries with declining efficiency.",
    "Branded campaigns remain budget constrained while low-efficiency prospecting campaigns continue scaling.",
  ],
};

export function AiStrategicFindings({ lang = "nb" }: { lang?: AdsLanguage }) {
  const findings = findingsByLanguage[lang];

  return (
    <Card className="border-zinc-200/90 bg-white/80 dark:bg-zinc-900/70">
      <CardTitle className="text-lg">{lang === "nb" ? "Strategiske funn" : "AI Strategic Findings"}</CardTitle>
      <CardDescription className="mt-2">
        {lang === "nb"
          ? "Kommersielt fokuserte funn utformet for menneskestyrt planlegging av utførelse."
          : "Commercially focused findings designed for human-supervised execution planning."}
      </CardDescription>
      <ul className="mt-5 space-y-3 text-sm text-zinc-700">
        {findings.map((finding) => (
          <li className="rounded-2xl border border-zinc-200/80 bg-white/70 px-4 py-3" key={finding}>
            {finding}
          </li>
        ))}
      </ul>
    </Card>
  );
}
