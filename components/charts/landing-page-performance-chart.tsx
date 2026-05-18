"use client";

import { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { TrendPoint } from "@/types";

export function LandingPagePerformanceChart({ data }: { data: TrendPoint[] }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Card className="h-[320px] border-zinc-200/90 bg-[#f2f0ea] shadow-[0_10px_28px_rgba(0,0,0,0.06)] dark:bg-[#f2f0ea]">
      <CardTitle className="text-base text-zinc-950 dark:text-zinc-950">Ytelse pa landingsside</CardTitle>
      <CardDescription className="mt-1 text-zinc-700 dark:text-zinc-700">Trendprofil for engasjement og konverteringsfriksjon</CardDescription>
      <div className="mt-5 h-[230px]">
        {mounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="lpGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ff4a0a" stopOpacity={0.34} />
                  <stop offset="95%" stopColor="#ff4a0a" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(24, 24, 27, 0.12)" strokeDasharray="4 4" />
              <XAxis dataKey="date" tick={{ fontSize: 12, fill: "#3f3f46" }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#3f3f46" }} tickLine={false} axisLine={false} />
              <Tooltip
                labelFormatter={(value) => `Periode: ${value}`}
                contentStyle={{
                  borderRadius: "14px",
                  border: "1px solid rgba(24, 24, 27, 0.12)",
                  backgroundColor: "rgba(248,246,240,0.98)",
                }}
              />
              <Area type="monotone" dataKey="conversionQuality" stroke="#ff4a0a" fill="url(#lpGradient)" strokeWidth={2.7} />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full w-full animate-pulse rounded-2xl bg-zinc-100 dark:bg-zinc-800" />
        )}
      </div>
    </Card>
  );
}
