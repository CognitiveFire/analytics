import { Card, CardDescription, CardTitle } from "@/components/ui/card";

const findings = [
  "Current conversion tracking appears overly dependent on low-intent lead submissions.",
  "Target ROAS campaigns may lack sufficient conversion density for stable optimisation.",
  "Broad match expansion is increasingly matching informational queries with declining efficiency.",
  "Branded campaigns remain budget constrained while low-efficiency prospecting campaigns continue scaling.",
];

export function AiStrategicFindings() {
  return (
    <Card className="border-zinc-200/90 bg-white/80 dark:bg-zinc-900/70">
      <CardTitle className="text-lg">AI Strategic Findings</CardTitle>
      <CardDescription className="mt-2">Commercially focused findings designed for human-supervised execution planning.</CardDescription>
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
