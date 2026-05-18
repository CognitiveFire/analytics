import { parse } from "csv-parse/sync";

import {
  ScreamingFrogFileKey,
  ScreamingFrogFileResult,
  ScreamingFrogSummary,
  ScreamingFrogUploadResult,
} from "@/types";

interface ParsedFile {
  key: ScreamingFrogFileKey;
  label: string;
  rows: Record<string, string>[];
}

const FILE_DEFINITIONS: Array<{ key: ScreamingFrogFileKey; label: string; patterns: RegExp[] }> = [
  { key: "crawl_overview", label: "Crawl Overview", patterns: [/crawl[_-]?overview/i, /overview/i] },
  { key: "internal_html", label: "Internal HTML", patterns: [/internal[_-]?html/i] },
  { key: "response_codes", label: "Response Codes", patterns: [/response[_-]?codes/i] },
  { key: "page_titles", label: "Page Titles", patterns: [/page[_-]?titles/i, /titles?/i] },
  { key: "h1", label: "H1", patterns: [/^h1/i, /h1/i] },
  { key: "canonicals", label: "Canonicals", patterns: [/canonicals?/i, /canonical/i] },
  { key: "inlinks", label: "Inlinks", patterns: [/inlinks?/i] },
];

function normalize(value: string | undefined): string {
  return value?.trim().toLowerCase() ?? "";
}

function cleanNumber(value: unknown): number {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : 0;
  }

  if (typeof value === "string") {
    const parsed = Number(value.replace(/,/g, ""));
    return Number.isFinite(parsed) ? parsed : 0;
  }

  return 0;
}

function hasValue(value: unknown): boolean {
  return typeof value === "string" ? value.trim().length > 0 : Boolean(value);
}

function detectFileKey(fileName: string): ParsedFile | null {
  const definition = FILE_DEFINITIONS.find((item) => item.patterns.some((pattern) => pattern.test(fileName)));
  if (!definition) {
    return null;
  }

  return {
    key: definition.key,
    label: definition.label,
    rows: [],
  };
}

export function detectScreamingFrogFileKey(fileName: string): ScreamingFrogFileKey | null {
  return detectFileKey(fileName)?.key ?? null;
}

function parseCsvFile(fileName: string, fileContent: string): ParsedFile | null {
  const detected = detectFileKey(fileName);
  if (!detected) {
    return null;
  }

  const rows = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
    relax_quotes: true,
    relax_column_count: true,
    trim: true,
  }) as Record<string, string>[];

  return {
    ...detected,
    rows,
  };
}

function getFirstMatching(row: Record<string, string>, keys: string[]): string | undefined {
  for (const key of keys) {
    const matched = Object.entries(row).find(([rowKey]) => normalize(rowKey) === normalize(key));
    if (matched) {
      return matched[1];
    }
  }

  return undefined;
}

function countDuplicates(rows: Record<string, string>[], fieldCandidates: string[]): number {
  const seen = new Map<string, number>();

  for (const row of rows) {
    const field = getFirstMatching(row, fieldCandidates);
    if (!field) {
      continue;
    }

    const normalized = field.trim().toLowerCase();
    seen.set(normalized, (seen.get(normalized) ?? 0) + 1);
  }

  return Array.from(seen.values()).filter((count) => count > 1).length;
}

function countMissing(rows: Record<string, string>[], fieldCandidates: string[]) {
  return rows.filter((row) => {
    const value = getFirstMatching(row, fieldCandidates);
    return !hasValue(value);
  }).length;
}

function buildSummary(files: ParsedFile[]): ScreamingFrogSummary {
  const internalHtml = files.find((file) => file.key === "internal_html")?.rows ?? [];
  const responseCodes = files.find((file) => file.key === "response_codes")?.rows ?? [];
  const pageTitles = files.find((file) => file.key === "page_titles")?.rows ?? [];
  const h1Rows = files.find((file) => file.key === "h1")?.rows ?? [];
  const canonicals = files.find((file) => file.key === "canonicals")?.rows ?? [];
  const inlinks = files.find((file) => file.key === "inlinks")?.rows ?? [];

  const indexableUrls = internalHtml.filter((row) => {
    const status = getFirstMatching(row, ["Indexability", "indexability"]);
    return status ? /indexable/i.test(status) : false;
  }).length;

  const noindexUrls = internalHtml.filter((row) => {
    const status = getFirstMatching(row, ["Indexability", "indexability"]);
    return status ? /non-indexable|noindex/i.test(status) : false;
  }).length;

  const redirectUrls = responseCodes.filter((row) => {
    const statusCode = cleanNumber(getFirstMatching(row, ["Status Code", "status code"]));
    const statusText = getFirstMatching(row, ["Status", "status"]);
    return (statusCode >= 300 && statusCode < 400) || (statusText ? /redirect/i.test(statusText) : false);
  }).length;

  const missingTitles = countMissing(pageTitles, ["Title 1", "title 1", "title"]);
  const duplicateTitles = countDuplicates(pageTitles, ["Title 1", "title 1", "title"]);
  const missingH1 = countMissing(h1Rows, ["H1-1", "H1 1", "h1"]);
  const duplicateH1 = countDuplicates(h1Rows, ["H1-1", "H1 1", "h1"]);
  const canonicalIssues = canonicals.filter((row) => {
    const status = getFirstMatching(row, ["Canonical Link Element 1 Status", "Status", "status"]);
    const canonical = getFirstMatching(row, ["Canonical Link Element 1", "canonical link element 1", "canonical"]);
    return !hasValue(canonical) || (status ? /non-canonical|missing|incorrect/i.test(status) : false);
  }).length;

  return {
    totalUrls: internalHtml.length,
    indexableUrls,
    noindexUrls,
    redirectUrls,
    missingTitles,
    duplicateTitles,
    missingH1,
    duplicateH1,
    canonicalIssues,
    inlinks: inlinks.length,
  };
}

function buildNotes(summary: ScreamingFrogSummary): string[] {
  const notes: string[] = [];

  if (summary.missingTitles > 0 || summary.duplicateTitles > 0) {
    notes.push("Title issues require immediate prioritisation because they affect crawl interpretation and click-through quality.");
  }

  if (summary.missingH1 > 0 || summary.duplicateH1 > 0) {
    notes.push("Heading structure needs review across templated pages and high-value landing pages.");
  }

  if (summary.canonicalIssues > 0) {
    notes.push("Canonical inconsistencies may be suppressing indexation and consolidating signals poorly.");
  }

  if (summary.redirectUrls > 0) {
    notes.push("Redirect volume should be reviewed for unnecessary hops and crawl budget loss.");
  }

  if (notes.length === 0) {
    notes.push("The Screaming Frog export set appears structurally healthy based on the uploaded files.");
  }

  return notes;
}

export function processScreamingFrogExports(files: Array<{ name: string; content: string }>): ScreamingFrogUploadResult {
  const parsedFiles: ParsedFile[] = [];
  const fileResults: ScreamingFrogFileResult[] = FILE_DEFINITIONS.map((definition) => ({
    key: definition.key,
    label: definition.label,
    rows: 0,
    status: "missing",
  }));

  for (const file of files) {
    const parsed = parseCsvFile(file.name, file.content);
    const matchedIndex = FILE_DEFINITIONS.findIndex((definition) => definition.patterns.some((pattern) => pattern.test(file.name)));

    if (matchedIndex >= 0 && parsed) {
      parsedFiles.push(parsed);
      fileResults[matchedIndex] = {
        key: FILE_DEFINITIONS[matchedIndex].key,
        label: FILE_DEFINITIONS[matchedIndex].label,
        rows: parsed.rows.length,
        status: "processed",
      };
    } else if (matchedIndex >= 0) {
      fileResults[matchedIndex] = {
        key: FILE_DEFINITIONS[matchedIndex].key,
        label: FILE_DEFINITIONS[matchedIndex].label,
        rows: 0,
        status: "invalid",
      };
    }
  }

  const summary = buildSummary(parsedFiles);
  const projectName = files.length > 0 ? files[0].name.replace(/\.csv$/i, "") : null;
  const crawlDate = new Date().toISOString().slice(0, 10);

  return {
    projectName,
    crawlDate,
    compareLabel: "Compare to previous crawl",
    fileCount: parsedFiles.length,
    files: fileResults,
    uploadedFileNames: {},
    summary,
    notes: buildNotes(summary),
  };
}
