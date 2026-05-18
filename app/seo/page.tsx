import { ScreamingFrogUploader } from "@/components/seo/screaming-frog-uploader";

export default function SeoPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_0%_0%,rgba(244,244,245,0.95),transparent_42%),radial-gradient(circle_at_90%_0%,rgba(231,229,228,0.6),transparent_42%),#f7f5f0] text-zinc-900 dark:bg-[radial-gradient(circle_at_0%_0%,rgba(39,39,42,0.6),transparent_42%),radial-gradient(circle_at_90%_0%,rgba(24,24,27,0.5),transparent_42%),#09090b] dark:text-zinc-100">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
        <header className="flex flex-col gap-4 border-b border-zinc-200/60 pb-8 dark:border-zinc-800 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">Apriil signal room</p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">Ingest Screaming Frog exports</h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-zinc-600 dark:text-zinc-300">
              SEO data arrives as a curated CSV upload set. Signal Room reads the crawl, standardizes the exports, and
              turns them into executive SEO intelligence and operational recommendations.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-3xl border border-zinc-200/80 bg-white/80 px-4 py-3 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/80">
              <p className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">Project</p>
              <p className="mt-2 text-sm font-medium">melk.no</p>
            </div>
            <div className="rounded-3xl border border-zinc-200/80 bg-white/80 px-4 py-3 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/80">
              <p className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">Crawl date</p>
              <p className="mt-2 text-sm font-medium">12 May 2026</p>
            </div>
            <div className="rounded-3xl border border-zinc-200/80 bg-white/80 px-4 py-3 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/80">
              <p className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">Upload workspace</p>
              <p className="mt-2 text-sm font-medium text-emerald-700 dark:text-emerald-300">Latest crawl processed</p>
            </div>
            <div className="rounded-3xl border border-zinc-200/80 bg-white/80 px-4 py-3 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/80">
              <p className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">Compare</p>
              <p className="mt-2 text-sm font-medium">Compare to 30 Apr 2026</p>
            </div>
          </div>
        </header>

        <section className="py-8">
          <ScreamingFrogUploader />
        </section>
      </div>
    </main>
  );
}