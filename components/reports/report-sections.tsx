import { Card, CardDescription, CardTitle } from "@/components/ui/card";

const sections = [
  {
    heading: "Executive Summary",
    description: "Strategic narrative focused on what changed, why it changed, and what should happen next.",
  },
  {
    heading: "Operational Recommendations",
    description: "Prioritised actions with expected commercial impact and confidence levels.",
  },
  {
    heading: "Cross-Channel Intelligence",
    description: "Unified interpretation across paid media, SEO, analytics, and CRM outcomes.",
  },
  {
    heading: "Client-Ready Commentary",
    description: "Premium consultancy-style language designed for stakeholder communication.",
  },
];

export function ReportSections() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {sections.map((section) => (
        <Card key={section.heading}>
          <CardTitle className="text-lg">{section.heading}</CardTitle>
          <CardDescription className="mt-3">{section.description}</CardDescription>
        </Card>
      ))}
    </div>
  );
}
