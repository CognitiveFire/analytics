"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";

import { resolveAdsLanguage } from "@/lib/ads/ui-language";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

const featureItems = [
  "AI-drevet strategisk innsikt",
  "Operasjonell oppgaveprioritering",
  "Lederrettet rapportering",
  "Premium merkede oversikter",
  "Kanalovergripende innsikt",
  "Tilpassede visualiseringer",
];

export default function Home() {
  const [lang, setLang] = useState<"nb" | "en">("nb");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const queryLang = resolveAdsLanguage(params.get("lang"));
    const stored = window.localStorage.getItem("signal-room-language");
    setLang(stored === "en" ? "en" : queryLang);
  }, []);

  const dashboardHref = lang === "en" ? "/dashboard?lang=en" : "/dashboard";

  return (
    <div className="relative overflow-hidden bg-[radial-gradient(circle_at_0%_10%,rgba(226,232,240,0.7),transparent_40%),radial-gradient(circle_at_90%_0%,rgba(212,212,216,0.55),transparent_45%),#f8fafc] dark:bg-[radial-gradient(circle_at_0%_0%,rgba(39,39,42,0.6),transparent_40%),radial-gradient(circle_at_85%_0%,rgba(63,63,70,0.4),transparent_42%),#09090b]">
      <div className="mx-auto min-h-screen max-w-7xl px-6 pb-24 pt-10 lg:px-10">
        <header className="mb-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative h-11 w-11 overflow-hidden rounded-2xl ring-1 ring-zinc-900/10 dark:ring-zinc-100/10">
              <Image alt="Apriil A" fill priority sizes="44px" src="/apriil-a-mark.svg" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">{lang === "nb" ? "Apriil presenterer" : "Presented by Apriil"}</p>
              <p className="mt-2 text-2xl font-semibold tracking-tight">Signal Room</p>
            </div>
          </div>
          <Link className={cn(buttonVariants({ variant: "outline" }))} href={dashboardHref}>
            {lang === "nb" ? "Apne plattform" : "Open platform"}
          </Link>
        </header>

        <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <p className="inline-flex items-center rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs uppercase tracking-[0.2em] text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900">
              {lang === "nb" ? "Operasjonell innsiktsplattform" : "Operational intelligence platform"}
            </p>
            <h1 className="mt-6 max-w-2xl text-5xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
              {lang === "nb" ? "Operasjonell innsikt for moderne markedsforingsteam." : "Operational intelligence for modern marketing teams."}
            </h1>
            <p className="mt-6 max-w-xl text-lg text-zinc-600 dark:text-zinc-300">
              {lang === "nb" ? "Signal Room gjor fragmentert rapportering om til tydelig strategisk retning." : "Signal Room turns fragmented reporting into clear strategic direction."}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button className={cn(buttonVariants({ size: "lg" }))}>{lang === "nb" ? "Bestill demo" : "Book demo"}</button>
              <Link className={cn(buttonVariants({ size: "lg", variant: "outline" }))} href={dashboardHref}>
                {lang === "nb" ? "Apne plattform" : "Open platform"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="rounded-[2rem] border border-zinc-200/80 bg-white/90 p-6 shadow-[0_30px_80px_rgba(15,23,42,0.12)] dark:border-zinc-800 dark:bg-zinc-900/85"
          >
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-medium">Forhandsvisning</p>
              <Sparkles className="h-4 w-4 text-zinc-500" />
            </div>
            <div className="space-y-3">
              <div className="rounded-2xl bg-zinc-100 p-4 dark:bg-zinc-800">
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">AI-oppsummering</p>
                <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
                  Utvidet broad match ga mer trafikk med lav intensjon, mens merkevareettersporselen fortsatt er underfinansiert.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-zinc-100 p-3 dark:bg-zinc-800">
                  <p className="text-xs text-zinc-500">ROAS</p>
                  <p className="mt-1 text-2xl font-semibold">4.9x</p>
                </div>
                <div className="rounded-2xl bg-zinc-100 p-3 dark:bg-zinc-800">
                  <p className="text-xs text-zinc-500">Mulighet</p>
                  <p className="mt-1 text-2xl font-semibold">86</p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="mt-24 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {[
            "For mange dashboards",
            "Fragmentert analyse",
            "Svak rapporteringsopplevelse",
            "Lav strategisk synlighet",
          ].map((problem) => (
            <div className="rounded-3xl border border-zinc-200 bg-white/90 p-5 dark:border-zinc-800 dark:bg-zinc-900/80" key={problem}>
              <p className="text-sm text-zinc-700 dark:text-zinc-300">{problem}</p>
            </div>
          ))}
        </section>

        <section className="mt-20 grid gap-8 lg:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">Verdiforslag</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">Fra rapporteringsstoy til operasjonell klarhet</h2>
            <p className="mt-4 max-w-xl text-zinc-600 dark:text-zinc-300">
              Signal Room hjelper team med a forsta hva som har endret seg, hvorfor det har skjedd, prioritere det som
              betyr mest og kommunisere resultat tydelig til interessenter.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {featureItems.map((feature) => (
              <div className="rounded-2xl bg-zinc-100 px-4 py-3 text-sm text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200" key={feature}>
                {feature}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20 rounded-3xl border border-zinc-200 bg-white/85 p-8 dark:border-zinc-800 dark:bg-zinc-900/75">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Posisjonering</p>
          <p className="mt-3 max-w-4xl text-2xl leading-relaxed tracking-tight text-zinc-800 dark:text-zinc-100">
            Bygget for byraer og in-house-team som trenger operasjonell klarhet fremfor mer dashboard-stoy.
          </p>
        </section>
      </div>
    </div>
  );
}
