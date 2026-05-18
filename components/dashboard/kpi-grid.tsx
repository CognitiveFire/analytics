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
          const trendTone = kpi.trend === "up" ? "text-emerald-600" : kpi.trend === "down" ? "text-rose-600" : "text-zinc-500";

          return (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              key={kpi.id}
            >
              <Card className="h-full">
                <CardDescription>{kpi.label}</CardDescription>
                <CardTitle className="mt-3 text-2xl">{kpi.value}</CardTitle>
                <div className={`mt-4 flex items-center gap-1 text-sm ${trendTone}`}>
                  <TrendIcon className="h-4 w-4" />
                  {Math.abs(kpi.delta)}%
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
