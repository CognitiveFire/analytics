"use client";

import { useEffect, useState } from "react";

import { PlatformShell } from "@/components/layout/platform-shell";
import { ScreamingFrogUploader } from "@/components/seo/screaming-frog-uploader";
import { getGoogleAdsClientAccounts } from "@/lib/connectors/google-ads-accounts";

const seoAccountOptions = getGoogleAdsClientAccounts();
const SEO_ACTIVE_ACCOUNT_STORAGE_KEY = "signalroom:seo:active-account";

export default function SeoPage() {
  const [activeAccount, setActiveAccount] = useState(seoAccountOptions[0]?.label ?? "Melk.no");

  useEffect(() => {
    const storedAccount = window.localStorage.getItem(SEO_ACTIVE_ACCOUNT_STORAGE_KEY);
    if (!storedAccount) {
      return;
    }

    const isKnownAccount = seoAccountOptions.some((account) => account.label === storedAccount);
    if (isKnownAccount) {
      setActiveAccount(storedAccount);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(SEO_ACTIVE_ACCOUNT_STORAGE_KEY, activeAccount);
  }, [activeAccount]);

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
              <p className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">Prosjekt</p>
              <select
                className="mt-2 w-full bg-transparent text-sm font-medium outline-none"
                onChange={(event) => setActiveAccount(event.target.value)}
                value={activeAccount}
              >
                {seoAccountOptions.map((account) => (
                  <option key={`${account.customerId}-${account.label}`} value={account.label}>
                    {account.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="rounded-3xl border border-zinc-200/80 bg-white/80 px-4 py-3 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/80">
              <p className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">Crawl-dato</p>
              <p className="mt-2 text-sm font-medium">12 May 2026</p>
            </div>
            <div className="rounded-3xl border border-zinc-200/80 bg-white/80 px-4 py-3 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/80">
              <p className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">Opplastingsomrade</p>
              <p className="mt-2 text-sm font-medium text-emerald-700 dark:text-emerald-300">Siste crawl er behandlet</p>
            </div>
            <div className="rounded-3xl border border-zinc-200/80 bg-white/80 px-4 py-3 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/80">
              <p className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">Sammenligning</p>
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