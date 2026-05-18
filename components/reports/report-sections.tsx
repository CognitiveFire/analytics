import { Card, CardDescription, CardTitle } from "@/components/ui/card";

const sections = [
  {
    heading: "Executive Summary",
    description: "Strategic narrative focused on what changed, why it changed, and what should happen next.",
    highlights: [
      "Paid efficiency softened while volume stayed stable across core campaigns.",
      "Brand demand capture remains the clearest short-term margin opportunity.",
    ],
  },
  {
    heading: "Operational Recommendations",
    description: "Prioritised actions with expected commercial impact and confidence levels.",
    highlights: [
      "Shift 12% budget from low-intent prospecting to branded and remarketing campaigns.",
      "Implement SEO fixes on high-converting service templates before next crawl cycle.",
    ],
  },
  {
    heading: "Cross-Channel Intelligence",
    description: "Unified interpretation across paid media, SEO, analytics, and CRM outcomes.",
    highlights: [
      "Lead quality variance is concentrated in mobile paid traffic from broad match groups.",
      "Organic landing pages with strongest engagement are under-supported by paid campaigns.",
    ],
  },
  {
    heading: "Client-Ready Commentary",
    description: "Premium consultancy-style language designed for stakeholder communication.",
    highlights: [
      "Margin pressure is manageable with targeted budget correction and tracking hygiene.",
      "The next 30-day plan prioritises efficient growth and confidence in attribution.",
    ],
  },
];

export function ReportSections() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {sections.map((section) => (
        <Card key={section.heading}>
          <CardTitle className="text-lg">{section.heading}</CardTitle>
          <CardDescription className="mt-3">{section.description}</CardDescription>

          <div className="mt-5 space-y-2">
            {section.highlights.map((highlight) => (
              <p className="rounded-2xl bg-zinc-100 px-4 py-3 text-sm text-zinc-600 dark:bg-zinc-800/70 dark:text-zinc-300" key={highlight}>
                {highlight}
              </p>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}
