import { Card, CardDescription, CardTitle } from "@/components/ui/card";

const safeguards = [
  "Maximum budget delta per execution: 20%",
  "Protected branded campaign logic enabled",
  "Low-confidence recommendations blocked from execution",
  "Manual approval required before all mutations",
  "Rollback metadata required for every execution batch",
];

export default function AdsSettingsPage() {
  return (
    <Card className="border-zinc-200/90 bg-[#ece9e1]">
      <CardTitle>Execution Safeguards</CardTitle>
      <CardDescription className="mt-2">Signal Room Ads is an intelligence and assisted execution layer, not autonomous account automation.</CardDescription>
      <ul className="mt-5 space-y-2 text-sm text-zinc-700">
        {safeguards.map((safeguard) => (
          <li className="rounded-xl bg-white/75 px-3 py-2" key={safeguard}>
            {safeguard}
          </li>
        ))}
      </ul>
    </Card>
  );
}
