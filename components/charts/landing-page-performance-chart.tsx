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
    <Card className="h-[320px]">
      <CardTitle className="text-base">Landing Page Performance</CardTitle>
      <CardDescription className="mt-1">Engagement and conversion friction trend profile</CardDescription>
      <div className="mt-5 h-[230px]">
        {mounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="lpGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#334155" stopOpacity={0.42} />
                  <stop offset="95%" stopColor="#334155" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(148, 163, 184, 0.2)" strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fontSize: 12, fill: "#71717a" }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#71717a" }} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  borderRadius: "14px",
                  border: "1px solid rgba(148, 163, 184, 0.35)",
                  backgroundColor: "rgba(255,255,255,0.96)",
                }}
              />
              <Area type="monotone" dataKey="conversionQuality" stroke="#334155" fill="url(#lpGradient)" strokeWidth={2.5} />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full w-full animate-pulse rounded-2xl bg-zinc-100 dark:bg-zinc-800" />
        )}
      </div>
    </Card>
  );
}
