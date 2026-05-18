"use client";

import { useMemo } from "react";

import { usePlatformStore } from "@/hooks/use-platform-store";
import { clients } from "@/lib/mock-data/clients";
import { ReportSections } from "@/components/reports/report-sections";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

type ReportStatus = "Scheduled" | "Drafting" | "In review" | "Planned" | "Approved";

interface ReportSection {
  heading: string;
  description: string;
  highlights: string[];
}

interface ApprovalItem {
  title: string;
  detail: string;
}

interface TimelineItem {
  date: string;
  reportType: string;
  audience: string;
  status: ReportStatus;
  owner: string;
}

interface ClientReportPortalContent {
  deckVersion: string;
  slideCount: number;
  narrativeConfidence: number;
  readiness: string;
  boardPackDescription: string;
  openingNarrative: string;
  approvals: ApprovalItem[];
  timeline: TimelineItem[];
  sections: ReportSection[];
}

const defaultSections: ReportSection[] = [
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

const reportContentByClientId: Record<string, ClientReportPortalContent> = {
  "sotra-ror": {
    deckVersion: "v3.8",
    slideCount: 34,
    narrativeConfidence: 93,
    readiness: "Ready for client",
    boardPackDescription: "May 2026 board pack preview for Sotra Ror leadership.",
    openingNarrative:
      "Service-demand capture is improving, but margin on non-brand acquisition remains under pressure. The next cycle should prioritise branded intent coverage and SEO technical cleanup on high-converting plumbing service templates.",
    approvals: [
      { title: "Strategy lead review", detail: "Approved 18 May 2026" },
      { title: "Client services QA", detail: "Approved 18 May 2026" },
      { title: "Scheduled distribution", detail: "20 May 2026, 08:30 CET" },
    ],
    timeline: [
      { date: "20 May 2026", reportType: "Monthly board pack", audience: "Executive leadership", status: "Scheduled", owner: "Strategy Director" },
      { date: "22 May 2026", reportType: "Weekly operations brief", audience: "Channel leads", status: "Drafting", owner: "Performance Lead" },
      { date: "27 May 2026", reportType: "SEO technical briefing", audience: "SEO and development", status: "Planned", owner: "SEO Strategist" },
    ],
    sections: defaultSections,
  },
  "melk-no": {
    deckVersion: "v2.9",
    slideCount: 29,
    narrativeConfidence: 88,
    readiness: "In review",
    boardPackDescription: "May 2026 board pack preview for Melk.no ecommerce stakeholders.",
    openingNarrative:
      "Revenue growth is stable, while paid prospecting quality has started to drift. Immediate focus is improving feed quality, strengthening branded capture, and tightening attribution alignment between GA4 and CRM.",
    approvals: [
      { title: "Commerce strategy review", detail: "Approved 17 May 2026" },
      { title: "Analytics QA", detail: "Final checks in progress" },
      { title: "Scheduled distribution", detail: "21 May 2026, 09:00 CET" },
    ],
    timeline: [
      { date: "21 May 2026", reportType: "Monthly board pack", audience: "CMO and ecommerce lead", status: "In review", owner: "Commerce Director" },
      { date: "23 May 2026", reportType: "Growth pulse", audience: "Performance team", status: "Scheduled", owner: "Paid Media Lead" },
      { date: "29 May 2026", reportType: "Attribution checkpoint", audience: "Data and analytics", status: "Drafting", owner: "Analytics Engineer" },
    ],
    sections: [
      {
        heading: "Executive Summary",
        description: "Commercial momentum and efficiency health across paid and organic channels.",
        highlights: [
          "Net revenue rose while new-customer efficiency flattened.",
          "Category-level search demand remains strongest in branded and near-brand terms.",
        ],
      },
      {
        heading: "Operational Recommendations",
        description: "Actions to improve acquisition quality and profitable growth.",
        highlights: [
          "Tighten prospecting match strategy and rebalance remarketing investment.",
          "Improve product feed metadata for best-selling SKUs before next campaign burst.",
        ],
      },
      {
        heading: "Cross-Channel Intelligence",
        description: "Integrated signals from media, site behavior, and conversion quality.",
        highlights: [
          "Landing page engagement is high but assisted conversion lag indicates sequencing gaps.",
          "Organic winners are not fully reflected in shopping and paid search budgets.",
        ],
      },
      {
        heading: "Client-Ready Commentary",
        description: "Board-level narrative for stakeholder distribution.",
        highlights: [
          "Current performance supports measured scaling with guardrails on quality.",
          "A tighter creative-feed-media loop is expected to improve contribution margin next month.",
        ],
      },
    ],
  },
  "sound-people": {
    deckVersion: "v2.4",
    slideCount: 27,
    narrativeConfidence: 84,
    readiness: "Drafting",
    boardPackDescription: "May 2026 reporting preview for Sound People growth team.",
    openingNarrative:
      "Awareness performance is healthy, but conversion efficiency remains uneven across audience clusters. The upcoming cycle should consolidate budget into high-intent segments and reduce overlap between platforms.",
    approvals: [
      { title: "Media strategy review", detail: "In progress" },
      { title: "Client services QA", detail: "Pending" },
      { title: "Scheduled distribution", detail: "23 May 2026, 10:00 CET" },
    ],
    timeline: [
      { date: "23 May 2026", reportType: "Executive snapshot", audience: "Leadership", status: "Drafting", owner: "Performance Lead" },
      { date: "26 May 2026", reportType: "Weekly operations brief", audience: "Campaign team", status: "Planned", owner: "Channel Strategist" },
      { date: "30 May 2026", reportType: "Creative efficiency review", audience: "Creative and media", status: "Scheduled", owner: "Account Director" },
    ],
    sections: defaultSections,
  },
  "morrow-bank": {
    deckVersion: "v4.1",
    slideCount: 36,
    narrativeConfidence: 92,
    readiness: "Approved",
    boardPackDescription: "May 2026 executive reporting preview for Morrow Bank.",
    openingNarrative:
      "Lead volume remains resilient and risk controls are stable, but acquisition cost increased in two high-volume segments. The recommendation is targeted bid restructuring and stricter audience exclusions tied to downstream quality.",
    approvals: [
      { title: "Compliance review", detail: "Approved 18 May 2026" },
      { title: "Executive comms QA", detail: "Approved 18 May 2026" },
      { title: "Scheduled distribution", detail: "20 May 2026, 07:45 CET" },
    ],
    timeline: [
      { date: "20 May 2026", reportType: "Monthly board pack", audience: "Executive committee", status: "Approved", owner: "Strategy Director" },
      { date: "24 May 2026", reportType: "Portfolio performance brief", audience: "Commercial leadership", status: "Scheduled", owner: "Performance Director" },
      { date: "28 May 2026", reportType: "Attribution integrity review", audience: "Data governance", status: "In review", owner: "Analytics Engineer" },
    ],
    sections: defaultSections,
  },
  "unik-vvs": {
    deckVersion: "v1.7",
    slideCount: 24,
    narrativeConfidence: 80,
    readiness: "Drafting",
    boardPackDescription: "May 2026 reporting preview for Unik VVS leadership.",
    openingNarrative:
      "Local demand capture is trending positively, but conversion leakage on mobile pages still limits total qualified leads. Priority actions focus on landing-page friction and improved lead-routing consistency.",
    approvals: [
      { title: "Channel lead review", detail: "In progress" },
      { title: "Operations QA", detail: "Pending" },
      { title: "Scheduled distribution", detail: "24 May 2026, 08:15 CET" },
    ],
    timeline: [
      { date: "24 May 2026", reportType: "Executive summary", audience: "Founder and operations", status: "Drafting", owner: "Account Manager" },
      { date: "27 May 2026", reportType: "SEO and CRO brief", audience: "SEO and web team", status: "Planned", owner: "SEO Strategist" },
      { date: "31 May 2026", reportType: "Weekly operations brief", audience: "Performance team", status: "Scheduled", owner: "Paid Media Lead" },
    ],
    sections: defaultSections,
  },
};

function getBadgeVariant(status: ReportStatus) {
  if (status === "Approved" || status === "Scheduled") {
    return "success" as const;
  }

  if (status === "Drafting") {
    return "warning" as const;
  }

  return "neutral" as const;
}

const readinessLabels: Record<string, string> = {
  "Ready for client": "Klar for kunde",
  "In review": "Til vurdering",
  Drafting: "Utkast",
  Approved: "Godkjent",
};

const statusLabels: Record<ReportStatus, string> = {
  Scheduled: "Planlagt",
  Drafting: "Utkast",
  "In review": "Til vurdering",
  Planned: "Planlagt",
  Approved: "Godkjent",
};

const approvalTitleLabels: Record<string, string> = {
  "Strategy lead review": "Strategifaglig gjennomgang",
  "Client services QA": "Kvalitetssikring",
  "Scheduled distribution": "Planlagt utsending",
  "Commerce strategy review": "Kommersiell strategigjennomgang",
  "Analytics QA": "Analyse- og datakvalitet",
  "Media strategy review": "Mediestrategisk gjennomgang",
  "Compliance review": "Compliance-gjennomgang",
  "Executive comms QA": "Kvalitetssikring av lederkommunikasjon",
  "Channel lead review": "Kanalansvarlig gjennomgang",
  "Operations QA": "Operasjonell kvalitetssikring",
};

const openingNarrativeByClientId: Record<string, string> = {
  "sotra-ror": "Rapporten viser stabil ettersporsel, men svakere effektivitet i ikke-merkevarekampanjer. Anbefalt neste steg er a styrke merkevarefangst og prioritere tekniske SEO-forbedringer pa tjenestesider med hoy konvertering.",
  "melk-no": "Rapporten viser stabil omsetningsvekst, samtidig som kvaliteten i nykundetrafikken varierer mer enn onsket. Neste steg er bedre feed-kvalitet, tydeligere prioritering av merkevaretrafikk og strammere attribusjonskobling.",
  "sound-people": "Rapporten viser god rekkeviddeutvikling, men ujevn konvertering mellom malgrupper. Neste steg er a samle investering rundt hoy-intensjonssegmenter og redusere kanaloverlapp.",
  "morrow-bank": "Rapporten viser robust leadvolum og stabile kontrollmekanismer, men okte kostnader i utvalgte segmenter. Neste steg er mer presis budjustering og strengere ekskludering basert pa nedstromskvalitet.",
  "unik-vvs": "Rapporten viser positiv lokal ettersporsel, men konverteringslekkasje pa mobil begrenser antall kvalifiserte leads. Neste steg er forbedret landingssideflyt og mer stabil lead-ruting.",
};

function getReadinessVariant(readiness: string) {
  if (/ready|approved/i.test(readiness)) {
    return "success" as const;
  }

  if (/review/i.test(readiness)) {
    return "warning" as const;
  }

  return "neutral" as const;
}

export function ExecutiveReportPortal() {
  const { clientId } = usePlatformStore();

  const currentClient = useMemo(() => clients.find((client) => client.id === clientId) ?? clients[0], [clientId]);
  const content = reportContentByClientId[currentClient.id] ?? reportContentByClientId["sotra-ror"];
  const openingNarrative = openingNarrativeByClientId[currentClient.id] ?? openingNarrativeByClientId["sotra-ror"];

  return (
    <>
      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <CardTitle>{currentClient.name} manedsrapport</CardTitle>
              <CardDescription className="mt-2">Forhandsvisning av manedsrapport for {currentClient.name}.</CardDescription>
            </div>
            <Badge variant={getReadinessVariant(content.readiness)}>{readinessLabels[content.readiness] ?? content.readiness}</Badge>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-zinc-100 p-4 dark:bg-zinc-800/60">
              <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">Rapportversjon</p>
              <p className="mt-2 text-xl font-semibold tracking-tight">{content.deckVersion}</p>
            </div>
            <div className="rounded-2xl bg-zinc-100 p-4 dark:bg-zinc-800/60">
              <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">Slides</p>
              <p className="mt-2 text-xl font-semibold tracking-tight">{content.slideCount}</p>
            </div>
            <div className="rounded-2xl bg-zinc-100 p-4 dark:bg-zinc-800/60">
              <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">Rapportsikkerhet</p>
              <p className="mt-2 text-xl font-semibold tracking-tight">{content.narrativeConfidence}%</p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-zinc-200/80 bg-white/75 p-4 dark:border-zinc-800 dark:bg-zinc-900/70">
            <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">Innledende oppsummering</p>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">{openingNarrative}</p>
          </div>
        </Card>

        <Card>
          <CardTitle>Distribusjon og godkjenninger</CardTitle>
          <CardDescription className="mt-2">Status for kvalitetssikring og planlagt utsending for valgt kunde.</CardDescription>

          <div className="mt-5 space-y-3">
            {content.approvals.map((item) => (
              <div className="rounded-2xl border border-zinc-200/80 p-4 dark:border-zinc-800" key={item.title + item.detail}>
                <p className="text-sm font-medium">{approvalTitleLabels[item.title] ?? item.title}</p>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{item.detail}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <CardTitle>Rapportkalender</CardTitle>
        <CardDescription className="mt-2">Rapporteringsplan for {currentClient.name}.</CardDescription>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="text-xs uppercase tracking-[0.2em] text-zinc-500">
              <tr>
                <th className="pb-3">Dato</th>
                <th className="pb-3">Rapporttype</th>
                <th className="pb-3">Mottaker</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Ansvarlig</th>
              </tr>
            </thead>
            <tbody>
              {content.timeline.map((row) => (
                <tr className="border-t border-zinc-200/70 align-top dark:border-zinc-800" key={row.date + row.reportType}>
                  <td className="py-4 pr-3 text-zinc-700 dark:text-zinc-200">{row.date}</td>
                  <td className="py-4 pr-3 font-medium text-zinc-900 dark:text-zinc-100">{row.reportType}</td>
                  <td className="py-4 pr-3 text-zinc-600 dark:text-zinc-300">{row.audience}</td>
                  <td className="py-4 pr-3">
                    <Badge variant={getBadgeVariant(row.status)}>{statusLabels[row.status]}</Badge>
                  </td>
                  <td className="py-4 text-zinc-600 dark:text-zinc-300">{row.owner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <ReportSections />
    </>
  );
}
