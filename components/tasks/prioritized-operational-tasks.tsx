import { Card, CardDescription, CardTitle } from "@/components/ui/card";

const tasks = [
  { title: "Add negative keywords in low-intent clusters", priority: "Critical", owner: "Paid Lead" },
  { title: "Repair offline conversion import mapping", priority: "High", owner: "Analytics Engineer" },
  { title: "Split brand and non-brand budget governance", priority: "High", owner: "Strategy Director" },
  { title: "Audit landing-page message match for top spend campaigns", priority: "Medium", owner: "CRO Strategist" },
];

export function PrioritizedOperationalTasks() {
  return (
    <Card className="border-zinc-200/90 bg-[#f2f0ea]">
      <CardTitle className="text-lg">Prioritized Operational Tasks</CardTitle>
      <CardDescription className="mt-2">Execution planning queue. Actions require manual approval before any account mutation.</CardDescription>
      <div className="mt-5 space-y-3">
        {tasks.map((task) => (
          <div className="rounded-2xl border border-zinc-200/80 bg-white/80 px-4 py-3" key={task.title}>
            <p className="text-sm font-semibold text-zinc-900">{task.title}</p>
            <p className="mt-1 text-xs text-zinc-600">{task.priority} priority · {task.owner}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
