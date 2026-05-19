"use client";

import { useEffect, useMemo, useState } from "react";

import { resolveAdsLanguage } from "@/lib/ads/ui-language";
import { PlatformShell } from "@/components/layout/platform-shell";
import { ScreamingFrogUploader } from "@/components/seo/screaming-frog-uploader";
import { usePlatformStore } from "@/hooks/use-platform-store";
import { clients } from "@/lib/mock-data/clients";

export default function SeoPage() {
  const [lang, setLang] = useState<"nb" | "en">("nb");

  useEffect(() => {
    const updateLang = () => {
      const params = new URLSearchParams(window.location.search);
      const queryLang = resolveAdsLanguage(params.get("lang"));
      const stored = window.localStorage.getItem("signal-room-language");
      setLang(stored === "en" ? "en" : queryLang);
    };

    updateLang();
    window.addEventListener("storage", updateLang);
    window.addEventListener("popstate", updateLang);
    
    return () => {
      window.removeEventListener("storage", updateLang);
      window.removeEventListener("popstate", updateLang);
    };
  }, []);

  const clientId = usePlatformStore((store) => store.clientId);
  const activeAccountName = useMemo(() => {
    const selectedClient = clients.find((client) => client.id === clientId) ?? clients[0];
    return selectedClient?.name ?? clientId;
  }, [clientId]);

  return (
    <PlatformShell>
      <div className="rounded-[2rem] border border-zinc-200/60 bg-white/70 p-6 dark:border-zinc-800 dark:bg-zinc-900/55">
        <header className="flex flex-col gap-4 border-b border-zinc-200/60 pb-8 dark:border-zinc-800 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">{lang === "nb" ? "Apriil signal room" : "Apriil signal room"}</p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">{lang === "nb" ? "Importer Screaming Frog-eksporter" : "Import Screaming Frog exports"}</h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-zinc-600 dark:text-zinc-300">
              {lang === "nb"
                ? "SEO-data leveres som et kuratert CSV-opplastingssett. Signal Room leser crawlen, standardiserer eksportene og omgjør dem til tydelig SEO-innsikt og operative anbefalinger."
                : "SEO data is delivered as a curated CSV upload set. Signal Room reads the crawl, standardizes the exports, and converts them into clear SEO insights and operational recommendations."}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-3xl border border-zinc-200/80 bg-white/80 px-4 py-3 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/80">
              <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-500">Konto</p>
              <p className="mt-2 text-sm font-medium">{activeAccountName}</p>
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
              Screaming Frog-opplastinger knyttes til <span className="font-medium text-zinc-900 dark:text-zinc-100">{activeAccountName}</span>.
            </p>
          </div>
          <ScreamingFrogUploader activeAccountId={clientId} />
        </section>
      </div>
    </PlatformShell>
  );
}