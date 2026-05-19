"use client";

import { useMemo } from "react";

import { PlatformShell } from "@/components/layout/platform-shell";
import { ScreamingFrogUploader } from "@/components/seo/screaming-frog-uploader";
import { usePlatformStore } from "@/hooks/use-platform-store";
import { clients } from "@/lib/mock-data/clients";

export default function SeoPage() {
  const clientId = usePlatformStore((store) => store.clientId);
  const activeAccount = useMemo(() => {
    const selectedClient = clients.find((client) => client.id === clientId) ?? clients[0];
    return selectedClient?.name ?? clientId;
  }, [clientId]);

  return (
    <PlatformShell>
      <div className="rounded-[2rem] border border-zinc-200/60 bg-white/70 p-6 dark:border-zinc-800 dark:bg-zinc-900/55">
        <header className="flex flex-col gap-4 border-b border-zinc-200/60 pb-8 dark:border-zinc-800 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">Apriil signal room</p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">Importer Screaming Frog-eksporter</h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-zinc-600 dark:text-zinc-300">
              SEO-data leveres som et kuratert CSV-opplastingssett. Signal Room leser crawlen, standardiserer eksportene
              og omgjør dem til tydelig SEO-innsikt og operative anbefalinger.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-3xl border border-zinc-200/80 bg-white/80 px-4 py-3 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/80">
              <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-500">Konto</p>
              <p className="mt-2 text-sm font-medium">{activeAccount}</p>
            </div>
            <div className="rounded-3xl border border-zinc-200/80 bg-white/80 px-4 py-3 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/80">
              <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-500">Crawl-dato</p>
              <p className="mt-2 text-sm font-medium">12 May 2026</p>
            </div>
            <div className="rounded-3xl border border-zinc-200/80 bg-white/80 px-4 py-3 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/80">
              <p className="text-[10px] uppercase tracking-[0.16em] text-zinc-500">Opplastingsstatus</p>
              <p className="mt-2 text-sm font-medium text-emerald-700 dark:text-emerald-300">Siste crawl er behandlet</p>
            </div>
            <div className="rounded-3xl border border-zinc-200/80 bg-white/80 px-4 py-3 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/80">
              <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-500">Sammenligning</p>
              <p className="mt-2 text-sm font-medium">Sammenlignes med 30. apr 2026</p>
            </div>
          </div>
        </header>

        <section className="py-8">
          <div className="mb-4 rounded-3xl border border-zinc-200/80 bg-white/80 px-5 py-4 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/80">
            <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">Aktiv konto</p>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
              Screaming Frog-opplastinger knyttes til <span className="font-medium text-zinc-900 dark:text-zinc-100">{activeAccount}</span>.
            </p>
          </div>
          <ScreamingFrogUploader activeAccount={activeAccount} />
        </section>
      </div>
    </PlatformShell>
  );
}