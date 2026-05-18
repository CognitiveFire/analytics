import { Card, CardDescription, CardTitle } from "@/components/ui/card";

const modules = [
  {
    title: "Paid Search Intelligence",
    items: [
      "Bid strategy stability and automation dependency",
      "Broad match efficiency and wasted spend concentration",
      "Impression share loss and campaign volatility",
      "Conversion quality patterns by intent segment",
    ],
  },
  {
    title: "SEO Intelligence",
    items: [
      "Visibility trends and non-brand growth coverage",
      "Technical SEO issues and crawl health",
      "Landing page indexation and content opportunities",
      "Template-level performance and opportunity clusters",
    ],
  },
  {
    title: "Landing Page Performance",
    items: [
      "Message relevance and engagement quality",
      "Bounce patterns and mobile UX friction",
      "Conversion drop-off diagnostics",
      "Page speed and interaction bottlenecks",
    ],
  },
];

export function IntelligenceModules() {
  return (
    <section className="grid gap-4 xl:grid-cols-3">
      {modules.map((module) => (
        <Card key={module.title}>
          <CardTitle className="text-lg">{module.title}</CardTitle>
          <CardDescription className="mt-2">Operational diagnostics and prioritised interpretation</CardDescription>
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
