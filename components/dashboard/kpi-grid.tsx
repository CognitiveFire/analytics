"use client";

import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";

import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { executiveKpis } from "@/lib/mock-data/metrics";

export function KpiGrid() {
  return (
    <section>
      <div className="mb-5">
        <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">Leder-KPI-lag</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {executiveKpis.map((kpi, index) => {
          const TrendIcon = kpi.trend === "up" ? ArrowUpRight : kpi.trend === "down" ? ArrowDownRight : Minus;
          const trendTone = kpi.trend === "up" ? "text-orange-600" : kpi.trend === "down" ? "text-zinc-700" : "text-zinc-500";

          return (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              key={kpi.id}
            >
              <Card className="h-full border-zinc-200/90 bg-[#ece9e1] p-7 shadow-[0_10px_28px_rgba(0,0,0,0.06)] dark:bg-[#ece9e1]">
                <div className="flex items-center justify-between gap-3">
                  <CardDescription className="font-medium uppercase tracking-[0.08em] text-zinc-700 dark:text-zinc-700">{kpi.label}</CardDescription>
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff4a0a]" />
                </div>
                <CardTitle className="mt-4 text-3xl font-semibold text-zinc-950 dark:text-zinc-950">{kpi.value}</CardTitle>
                <div className={`mt-4 flex items-center gap-1 text-sm ${trendTone}`}>
                  <TrendIcon className="h-4 w-4" />
                  <span className="font-medium">{Math.abs(kpi.delta)}%</span>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
