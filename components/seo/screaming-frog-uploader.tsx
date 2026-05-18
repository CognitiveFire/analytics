"use client";

import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import { UploadCloud, CheckCircle2, AlertTriangle, FileUp } from "lucide-react";

import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import { ScreamingFrogUploadResult } from "@/types";

const exportSpecs = [
  {
    key: "internal_html",
    label: "Internal HTML",
    fileName: "internal_html.csv",
    description: "All crawled internal pages with status codes, indexability, and page metrics.",
  },
  {
    key: "response_codes",
    label: "Response Codes",
    fileName: "response_codes.csv",
    description: "HTTP response codes for every URL including redirects, client and server errors.",
  },
  {
    key: "page_titles",
    label: "Page Titles",
    fileName: "page_titles.csv",
    description: "Title tags, lengths, and duplicate detection across the crawled URL set.",
  },
  {
    key: "h1",
    label: "H1",
    fileName: "h1.csv",
    description: "Heading structure, missing headers, and duplicate H1 patterns.",
  },
  {
    key: "canonicals",
    label: "Canonicals",
    fileName: "canonicals.csv",
    description: "Canonical tags and self-referencing or conflicting canonical states.",
  },
  {
    key: "inlinks",
    label: "Inlinks",
    fileName: "inlinks.csv",
    description: "Internal link graph showing source, destination, anchor text, and link type.",
  },
  {
    key: "crawl_overview",
    label: "Crawl Overview",
    fileName: "crawl_overview.csv",
    description: "Top-level crawl summary including total URLs, depths, and response breakdowns.",
  },
] as const;

const initialFiles = exportSpecs.reduce<Record<string, File | null>>((acc, item) => {
  acc[item.key] = null;
  return acc;
}, {});

const initialFileNames = exportSpecs.reduce<Record<string, string | null>>((acc, item) => {
  acc[item.key] = null;
  return acc;
}, {});

interface ScreamingFrogUploaderProps {
  activeAccount: string;
}

function getResultStorageKey(activeAccount: string) {
  return `signalroom:seo:upload-result:${encodeURIComponent(activeAccount)}`;
}

function getFileNamesStorageKey(activeAccount: string) {
  return `signalroom:seo:file-names:${encodeURIComponent(activeAccount)}`;
}

export function ScreamingFrogUploader({ activeAccount }: ScreamingFrogUploaderProps) {
  const [files, setFiles] = useState<Record<string, File | null>>(initialFiles);
  const [fileNames, setFileNames] = useState<Record<string, string | null>>(initialFileNames);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<ScreamingFrogUploadResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const readyCount = useMemo(() => Object.values(files).filter(Boolean).length, [files]);

  const onFileChange = (key: string) => (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setFiles((current) => ({ ...current, [key]: file }));
    setFileNames((current) => ({ ...current, [key]: file?.name ?? null }));
    setError(null);
  };

  useEffect(() => {
    const storedResult = window.localStorage.getItem(getResultStorageKey(activeAccount));
    const storedFileNames = window.localStorage.getItem(getFileNamesStorageKey(activeAccount));

    if (storedResult) {
      try {
        const parsed = JSON.parse(storedResult) as ScreamingFrogUploadResult;
        setResult(parsed);
      } catch {
        setResult(null);
      }
    } else {
      setResult(null);
    }

    if (storedFileNames) {
      try {
        const parsed = JSON.parse(storedFileNames) as Record<string, string | null>;
        setFileNames({ ...initialFileNames, ...parsed });
      } catch {
        setFileNames(initialFileNames);
      }
    } else {
      setFileNames(initialFileNames);
    }

    setFiles(initialFiles);
    setError(null);
  }, [activeAccount]);

  useEffect(() => {
    if (result) {
      window.localStorage.setItem(getResultStorageKey(activeAccount), JSON.stringify(result));
    } else {
      window.localStorage.removeItem(getResultStorageKey(activeAccount));
    }
  }, [activeAccount, result]);

  useEffect(() => {
    window.localStorage.setItem(getFileNamesStorageKey(activeAccount), JSON.stringify(fileNames));
  }, [activeAccount, fileNames]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const formData = new FormData();
      Object.values(files)
        .filter((file): file is File => Boolean(file))
        .forEach((file) => formData.append("files", file));

      const response = await fetch("/api/seo/screamingfrog/upload", {
        method: "POST",
        body: formData,
      });

      const payload = (await response.json()) as { result?: ScreamingFrogUploadResult; error?: string };

      if (!response.ok) {
        throw new Error(payload.error ?? "Unable to process Screaming Frog exports.");
      }

      setResult(payload.result ?? null);
      setFiles(initialFiles);
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Unexpected upload failure.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-zinc-200/80 bg-white/95 dark:border-zinc-800 dark:bg-zinc-900/90">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">Upload workspace</p>
            <CardTitle className="mt-2 text-3xl">Ingest Screaming Frog exports</CardTitle>
            <CardDescription className="mt-3 max-w-3xl">
              Drag in multiple CSV exports, validate the set, process the crawl, and move directly into the executive dashboard.
            </CardDescription>
          </div>
          <div className="flex flex-wrap gap-3 text-sm">
            <Badge variant="neutral">{readyCount} / {exportSpecs.length} files ready</Badge>
            <Badge variant={readyCount === exportSpecs.length ? "success" : "warning"}>
              {readyCount === exportSpecs.length ? "Ready to process" : "Awaiting uploads"}
            </Badge>
          </div>
        </div>
      </Card>

      <form className="space-y-5" onSubmit={onSubmit}>
        <div className="grid gap-4 xl:grid-cols-2">
          {exportSpecs.map((spec) => {
            const file = files[spec.key];
            return (
              <label
                className={cn(
                  "group flex min-h-[180px] cursor-pointer flex-col justify-between rounded-[1.75rem] border border-zinc-200/80 bg-white/90 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-[0_16px_45px_rgba(15,23,42,0.07)] dark:border-zinc-800 dark:bg-zinc-900/80 dark:hover:border-zinc-700",
                  file && "border-emerald-300/70 bg-emerald-50/40 dark:border-emerald-900/70 dark:bg-emerald-950/20"
                )}
                key={spec.key}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-medium tracking-tight text-zinc-900 dark:text-zinc-100">{spec.label}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.18em] text-zinc-500">{spec.fileName}</p>
                    </div>
                    {file ? <CheckCircle2 className="h-5 w-5 text-emerald-600" /> : <FileUp className="h-5 w-5 text-zinc-400" />}
                  </div>
                  <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">{spec.description}</p>
                </div>

                <div className="mt-5 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Selected file</p>
                    <p className="mt-1 truncate text-sm text-zinc-700 dark:text-zinc-200">{file?.name ?? fileNames[spec.key] ?? "No file selected"}</p>
                  </div>
                  <div className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-600 shadow-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
                    <UploadCloud className="mr-2 inline h-4 w-4" />
                    Select file
                  </div>
                </div>

                <input accept=".csv,text/csv" className="sr-only" name={spec.key} onChange={onFileChange(spec.key)} type="file" />
              </label>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center gap-3 rounded-[1.75rem] border border-zinc-200/70 bg-white/80 p-4 dark:border-zinc-800 dark:bg-zinc-900/75">
          <Button disabled={isSubmitting || readyCount === 0} type="submit">
            {isSubmitting ? "Processing exports..." : "Process exports"}
          </Button>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {readyCount === 0 ? "Upload at least one Screaming Frog export to begin." : "Signal Room will normalize titles, H1s, canonicals, response codes, and crawl summaries."}
          </p>
        </div>
      </form>

      {error ? (
        <Card className="border-rose-200 bg-rose-50/80 dark:border-rose-900/70 dark:bg-rose-950/30">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 text-rose-600" />
            <div>
              <CardTitle className="text-base text-rose-900 dark:text-rose-100">Upload failed</CardTitle>
              <p className="mt-2 text-sm text-rose-700 dark:text-rose-200">{error}</p>
            </div>
          </div>
        </Card>
      ) : null}

      {result ? (
        <div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
          <Card>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">Crawl summary</p>
                <CardTitle className="mt-2 text-2xl">{result.projectName ?? "Screaming Frog import"}</CardTitle>
                <CardDescription className="mt-2">
                  Crawl date: {result.crawlDate ?? "unknown"} · {result.compareLabel ?? "Compare crawl"}
                </CardDescription>
              </div>
              <Badge variant="neutral">{result.fileCount} processed</Badge>
            </div>

            <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {[
                { label: "URLs", value: result.summary.totalUrls },
                { label: "Indexable", value: result.summary.indexableUrls },
                { label: "Noindex", value: result.summary.noindexUrls },
                { label: "Redirects", value: result.summary.redirectUrls },
                { label: "Missing titles", value: result.summary.missingTitles },
                { label: "Canonical issues", value: result.summary.canonicalIssues },
              ].map((item) => (
                <div className="rounded-2xl bg-zinc-50 p-4 dark:bg-zinc-800/60" key={item.label}>
                  <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">{item.label}</p>
                  <p className="mt-2 text-2xl font-semibold tracking-tight">{item.value}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <CardTitle className="text-lg">AI-style SEO notes</CardTitle>
            <CardDescription className="mt-2">
              Screaming Frog exports are converted into executive-grade crawl observations.
            </CardDescription>

            <div className="mt-5 space-y-3">
              {result.notes.map((note) => (
                <div className="rounded-2xl bg-zinc-50 px-4 py-3 text-sm leading-relaxed text-zinc-600 dark:bg-zinc-800/60 dark:text-zinc-300" key={note}>
                  {note}
                </div>
              ))}
            </div>
          </Card>
        </div>
      ) : null}

      <Card>
        <CardTitle className="text-lg">Processed file map</CardTitle>
        <CardDescription className="mt-2">
          Signal Room expects Screaming Frog exports as a CSV upload set rather than an API connector.
        </CardDescription>

        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {exportSpecs.map((spec) => {
            const current = result?.files.find((item) => item.key === spec.key);
            return (
              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-800/50" key={spec.key}>
                <p className="font-medium text-zinc-900 dark:text-zinc-100">{spec.label}</p>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{spec.description}</p>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="text-zinc-500 dark:text-zinc-400">{current?.status ?? "waiting"}</span>
                  <span className="text-zinc-700 dark:text-zinc-200">{current?.rows ?? 0} rows</span>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
