"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

const featureItems = [
  "AI strategic insights",
  "Operational task prioritisation",
  "Executive reporting",
  "Premium branded dashboards",
  "Cross-channel intelligence",
  "Custom visualisations",
];

export default function Home() {
  return (
    <div className="relative overflow-hidden bg-[radial-gradient(circle_at_0%_10%,rgba(226,232,240,0.7),transparent_40%),radial-gradient(circle_at_90%_0%,rgba(212,212,216,0.55),transparent_45%),#f8fafc] dark:bg-[radial-gradient(circle_at_0%_0%,rgba(39,39,42,0.6),transparent_40%),radial-gradient(circle_at_85%_0%,rgba(63,63,70,0.4),transparent_42%),#09090b]">
      <div className="mx-auto min-h-screen max-w-7xl px-6 pb-24 pt-10 lg:px-10">
        <header className="mb-14 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">Apriil presents</p>
            <p className="mt-2 text-2xl font-semibold tracking-tight">Signal Room</p>
          </div>
          <Link className={cn(buttonVariants({ variant: "outline" }))} href="/dashboard">
            View Platform
          </Link>
        </header>

        <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <p className="inline-flex items-center rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs uppercase tracking-[0.2em] text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900">
              Operational intelligence platform
            </p>
            <h1 className="mt-6 max-w-2xl text-5xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
              Operational intelligence for modern marketing teams.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-zinc-600 dark:text-zinc-300">
              Signal Room transforms fragmented reporting into strategic clarity.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button className={cn(buttonVariants({ size: "lg" }))}>Request Demo</button>
              <Link className={cn(buttonVariants({ size: "lg", variant: "outline" }))} href="/dashboard">
                View Platform
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
              <p className="text-sm font-medium">Executive Preview</p>
              <Sparkles className="h-4 w-4 text-zinc-500" />
            </div>
            <div className="space-y-3">
              <div className="rounded-2xl bg-zinc-100 p-4 dark:bg-zinc-800">
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">AI Summary</p>
                <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
                  Broad match expansion introduced low-intent traffic while branded demand stayed underfunded.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-zinc-100 p-3 dark:bg-zinc-800">
                  <p className="text-xs text-zinc-500">ROAS</p>
                  <p className="mt-1 text-2xl font-semibold">4.9x</p>
                </div>
                <div className="rounded-2xl bg-zinc-100 p-3 dark:bg-zinc-800">
                  <p className="text-xs text-zinc-500">Opportunity</p>
                  <p className="mt-1 text-2xl font-semibold">86</p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="mt-24 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {[
            "Dashboard overload",
            "Disconnected analytics",
            "Weak reporting UX",
            "Poor strategic visibility",
          ].map((problem) => (
            <div className="rounded-3xl border border-zinc-200 bg-white/90 p-5 dark:border-zinc-800 dark:bg-zinc-900/80" key={problem}>
              <p className="text-sm text-zinc-700 dark:text-zinc-300">{problem}</p>
            </div>
          ))}
        </section>

        <section className="mt-20 grid gap-8 lg:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">Value proposition</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">From reporting noise to operational clarity</h2>
            <p className="mt-4 max-w-xl text-zinc-600 dark:text-zinc-300">
              Signal Room helps teams understand what changed, why it changed, prioritise what matters, and communicate
              performance clearly to stakeholders.
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
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Positioning</p>
          <p className="mt-3 max-w-4xl text-2xl leading-relaxed tracking-tight text-zinc-800 dark:text-zinc-100">
            Built for agencies and in-house teams that need operational clarity rather than more dashboard noise.
          </p>
        </section>
      </div>
    </div>
  );
}
