"use client";

import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import { UploadCloud, CheckCircle2, AlertTriangle, FileUp } from "lucide-react";

import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import { ScreamingFrogUploadResult } from "@/types";
import { SeoHealthPanel } from "@/components/seo/seo-health-panel";
import { SeoTaskPanel } from "@/components/seo/seo-task-panel";

const exportSpecs = [
  {
    key: "internal_html",
    label: "Intern HTML",
    fileName: "internal_html.csv",
    description: "Alle crawlte interne sider med statuskoder, indekserbarhet og sidemetrikker.",
  },
  {
    key: "response_codes",
    label: "Statuskoder",
    fileName: "response_codes.csv",
    description: "HTTP-statuskoder for alle URL-er, inkludert omdirigeringer samt klient- og serverfeil.",
  },
  {
    key: "page_titles",
    label: "Sidetitler",
    fileName: "page_titles.csv",
    description: "Titteltagger, lengde og deteksjon av duplikater pa tvers av crawlte URL-er.",
  },
  {
    key: "h1",
    label: "H1",
    fileName: "h1.csv",
    description: "Overskriftsstruktur, manglende overskrifter og dupliserte H1-monstre.",
  },
  {
    key: "canonicals",
    label: "Canonicaler",
    fileName: "canonicals.csv",
    description: "Canonical-tagger samt selvrefererende eller konfliktende canonical-tilstander.",
  },
  {
    key: "inlinks",
    label: "Inngaaende lenker",
    fileName: "inlinks.csv",
    description: "Intern lenkegraf med kilde, destinasjon, ankertekst og lenketype.",
  },
  {
    key: "crawl_overview",
    label: "Crawl-oversikt",
    fileName: "crawl_overview.csv",
    description: "Overordnet crawl-oppsummering med totale URL-er, dybde og fordeling av statuskoder.",
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
  activeAccountId: string;
}

export function ScreamingFrogUploader({ activeAccountId }: ScreamingFrogUploaderProps) {
  const [files, setFiles] = useState<Record<string, File | null>>(initialFiles);
  const [fileNames, setFileNames] = useState<Record<string, string | null>>(initialFileNames);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<ScreamingFrogUploadResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const pendingCount = useMemo(() => Object.values(files).filter(Boolean).length, [files]);
  const uploadedCount = useMemo(() => Object.values(fileNames).filter(Boolean).length, [fileNames]);
  const readyCount = Math.max(pendingCount, uploadedCount);

  const statusLabels: Record<string, string> = {
    processed: "behandlet",
    missing: "mangler",
    invalid: "ugyldig",
    waiting: "venter",
  };

  const onFileChange = (key: string) => (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setFiles((current) => ({ ...current, [key]: file }));
    setFileNames((current) => ({ ...current, [key]: file?.name ?? null }));
    setError(null);
  };

  useEffect(() => {
    async function loadAccountState() {
      try {
        const response = await fetch(`/api/seo/screamingfrog/upload?account=${encodeURIComponent(activeAccountId)}`);
        const payload = (await response.json()) as {
          result?: ScreamingFrogUploadResult | null;
          error?: string;
        };

        if (!response.ok) {
          throw new Error(payload.error ?? "Kunne ikke laste tidligere SEO-opplasting.");
        }

        const nextResult = payload.result ?? null;
        setResult(nextResult);
        setFileNames({
          ...initialFileNames,
          ...(nextResult?.uploadedFileNames ?? {}),
        });
      } catch {
        setResult(null);
        setFileNames(initialFileNames);
      }
    }

    void loadAccountState();
    setFiles(initialFiles);
    setError(null);
  }, [activeAccountId]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("account", activeAccountId);
      Object.values(files)
        .filter((file): file is File => Boolean(file))
        .forEach((file) => formData.append("files", file));

      const response = await fetch("/api/seo/screamingfrog/upload", {
        method: "POST",
        body: formData,
      });

      const payload = (await response.json()) as { result?: ScreamingFrogUploadResult; error?: string };

      if (!response.ok) {
        throw new Error(payload.error ?? "Kunne ikke behandle Screaming Frog-eksporter.");
      }

      const nextResult = payload.result ?? null;
      setResult(nextResult);
      setFileNames({
        ...initialFileNames,
        ...(nextResult?.uploadedFileNames ?? {}),
      });
      setFiles(initialFiles);
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Uventet feil ved opplasting.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-zinc-200/80 bg-white/95 dark:border-zinc-800 dark:bg-zinc-900/90">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Opplastingsstatus</p>
            <CardTitle className="mt-2 text-3xl">Behandle Screaming Frog-eksporter</CardTitle>
            <CardDescription className="mt-3 max-w-3xl">
              Last opp flere CSV-eksporter, valider settet, behandle crawlen og ga videre til oversikten.
            </CardDescription>
          </div>
          <div className="flex flex-wrap gap-3 text-sm">
            <Badge variant="neutral">{readyCount} / {exportSpecs.length} filer klare</Badge>
            <Badge variant={readyCount === exportSpecs.length ? "success" : "warning"}>
              {readyCount === exportSpecs.length
                ? "Klar til behandling"
                : readyCount > 0
                  ? "Delvis opplastet"
                  : "Venter pa opplasting"}
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
                    <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Valgt fil</p>
                    <p className="mt-1 truncate text-sm text-zinc-700 dark:text-zinc-200">{file?.name ?? fileNames[spec.key] ?? "Ingen fil valgt"}</p>
                  </div>
                  <div className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-600 shadow-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
                    <UploadCloud className="mr-2 inline h-4 w-4" />
                    Velg fil
                  </div>
                </div>

                <input accept=".csv,text/csv" className="sr-only" name={spec.key} onChange={onFileChange(spec.key)} type="file" />
              </label>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center gap-3 rounded-[1.75rem] border border-zinc-200/70 bg-white/80 p-4 dark:border-zinc-800 dark:bg-zinc-900/75">
          <Button disabled={isSubmitting || readyCount === 0} type="submit">
            {isSubmitting ? "Behandler eksporter..." : "Behandle eksporter"}
          </Button>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {readyCount === 0 ? "Last opp minst en Screaming Frog-eksport for a starte." : "Signal Room normaliserer titler, H1, canonicals, statuskoder og crawl-oppsummeringer."}
          </p>
        </div>
      </form>

      {error ? (
        <Card className="border-rose-200 bg-rose-50/80 dark:border-rose-900/70 dark:bg-rose-950/30">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 text-rose-600" />
            <div>
              <CardTitle className="text-base text-rose-900 dark:text-rose-100">Opplasting feilet</CardTitle>
              <p className="mt-2 text-sm text-rose-700 dark:text-rose-200">{error}</p>
            </div>
          </div>
        </Card>
      ) : null}

      {result ? (
        <div className="space-y-6">
          {/* Step indicator */}
          <div className="flex items-center gap-3 rounded-[1.5rem] border border-emerald-200/70 bg-emerald-50/50 px-5 py-3.5 dark:border-emerald-900/50 dark:bg-emerald-950/20">
            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            <div>
              <p className="text-sm font-medium text-emerald-900 dark:text-emerald-100">Crawl behandlet</p>
              <p className="text-xs text-emerald-700/70 dark:text-emerald-300/60">
                {result.projectName ?? "Screaming Frog-import"} · {result.crawlDate ?? "ukjent dato"} · {result.fileCount} filer behandlet
              </p>
            </div>
          </div>

          {/* Crawl summary + AI notes */}
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.22em] text-zinc-500">Crawl-resultater</p>
            <div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
          <Card>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">Crawl-oppsummering</p>
                <CardTitle className="mt-2 text-2xl">{result.projectName ?? "Screaming Frog-import"}</CardTitle>
                <CardDescription className="mt-2">
                  Crawl-dato: {result.crawlDate ?? "ukjent"} · {result.compareLabel ?? "Sammenlign crawl"}
                </CardDescription>
              </div>
              <Badge variant="neutral">{result.fileCount} behandlet</Badge>
            </div>

            <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {[
                { label: "URLs", value: result.summary.totalUrls },
                { label: "Indekserbare", value: result.summary.indexableUrls },
                { label: "Noindex", value: result.summary.noindexUrls },
                { label: "Omdirigeringer", value: result.summary.redirectUrls },
                { label: "Manglende titler", value: result.summary.missingTitles },
                { label: "Canonical-avvik", value: result.summary.canonicalIssues },
              ].map((item) => (
                <div className="rounded-2xl bg-zinc-50 p-4 dark:bg-zinc-800/60" key={item.label}>
                  <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">{item.label}</p>
                  <p className="mt-2 text-2xl font-semibold tracking-tight">{item.value}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <CardTitle className="text-lg">AI-baserte SEO-notater</CardTitle>
            <CardDescription className="mt-2">
              Screaming Frog-eksporter omgjores til tydelige crawl-observasjoner.
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
          </div>

          {/* SEO Health */}
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.22em] text-zinc-500">SEO-helse</p>
            <SeoHealthPanel result={result} />
          </div>

          {/* SEO Tasks */}
          <div>
            <SeoTaskPanel />
          </div>
        </div>
      ) : null}

      <Card>
        <CardTitle className="text-lg">Oversikt over behandlede filer</CardTitle>
        <CardDescription className="mt-2">
          Signal Room forventer Screaming Frog-eksporter som CSV-opplasting, ikke som API-kobling.
        </CardDescription>

        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {exportSpecs.map((spec) => {
            const current = result?.files.find((item) => item.key === spec.key);
            return (
              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-800/50" key={spec.key}>
                <p className="font-medium text-zinc-900 dark:text-zinc-100">{spec.label}</p>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{spec.description}</p>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="text-zinc-500 dark:text-zinc-400">{statusLabels[current?.status ?? "waiting"] ?? (current?.status ?? "venter")}</span>
                  <span className="text-zinc-700 dark:text-zinc-200">{current?.rows ?? 0} rader</span>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
