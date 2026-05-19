import { ScreamingFrogUploadResult } from "@/types";

const DEMO_FILES = [
  { key: "crawl_overview", label: "Crawl Overview", rows: 1, status: "processed" },
  { key: "internal_html", label: "Internal HTML", rows: 1248, status: "processed" },
  { key: "response_codes", label: "Response Codes", rows: 1248, status: "processed" },
  { key: "page_titles", label: "Page Titles", rows: 1248, status: "processed" },
  { key: "h1", label: "H1", rows: 1248, status: "processed" },
  { key: "canonicals", label: "Canonicals", rows: 1248, status: "processed" },
  { key: "inlinks", label: "Inlinks", rows: 6832, status: "processed" },
] as const;

const DEMO_FILE_NAMES = {
  crawl_overview: "crawl_overview.csv",
  internal_html: "internal_html.csv",
  response_codes: "response_codes.csv",
  page_titles: "page_titles.csv",
  h1: "h1.csv",
  canonicals: "canonicals.csv",
  inlinks: "inlinks.csv",
} as const;

export function getDemoScreamingFrogResult(accountId: string): ScreamingFrogUploadResult {
  const accountSuffix = accountId?.slice(-4).toUpperCase() || "DEMO";

  return {
    projectName: `signal-room-${accountSuffix}-crawl`,
    crawlDate: "2026-05-12",
    compareLabel: "Sammenlign med forrige crawl",
    fileCount: DEMO_FILES.length,
    files: DEMO_FILES.map((file) => ({ ...file })),
    uploadedFileNames: { ...DEMO_FILE_NAMES },
    summary: {
      totalUrls: 1248,
      indexableUrls: 1112,
      noindexUrls: 89,
      redirectUrls: 47,
      missingTitles: 31,
      duplicateTitles: 22,
      missingH1: 44,
      duplicateH1: 19,
      canonicalIssues: 27,
      inlinks: 6832,
    },
    notes: [
      "Flere kategori- og filtreringssider mangler unike titler og bor prioriteres i neste innholdsoppdatering.",
      "Canonical-signaler er inkonsistente pa paginerte URL-er, noe som kan splitte rangeringssignaler.",
      "Internlenker fra toppnavigasjon treffer godt, men flere viktige landingssider har for lav lenkedybde.",
    ],
  };
}