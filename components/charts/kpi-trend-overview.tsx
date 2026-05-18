"use client";

import { useEffect, useState } from "react";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { TrendPoint } from "@/types";

interface KpiTrendOverviewProps {
  data: TrendPoint[];
}

function formatKroner(value: number) {
  return `kr ${value.toLocaleString("en-GB", { maximumFractionDigits: 1 })}`;
}

export function KpiTrendOverview({ data }: KpiTrendOverviewProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Card className="h-[360px]">
      <CardTitle className="text-base">KPI-trend over tid</CardTitle>
      <CardDescription className="mt-1">
        Manedlig trend for sentrale finansielle KPI-er med automatisk sammenligning mot forrige maned.
      </CardDescription>

      <div className="mt-5 h-[270px]">
        {mounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid stroke="rgba(148, 163, 184, 0.2)" strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fontSize: 12, fill: "#71717a" }} tickLine={false} axisLine={false} />
              <YAxis yAxisId="financial" tick={{ fontSize: 12, fill: "#71717a" }} tickLine={false} axisLine={false} />
              <YAxis yAxisId="ratio" orientation="right" tick={{ fontSize: 12, fill: "#71717a" }} tickLine={false} axisLine={false} />
              <Tooltip
                formatter={(value, name) => {
                  if (name === "ROAS") {
                    return `${(value as number).toFixed(1)}x`;
                  }

                  return formatKroner(value as number);
                }}
                contentStyle={{
                  borderRadius: "14px",
                  border: "1px solid rgba(148, 163, 184, 0.35)",
                  backgroundColor: "rgba(255,255,255,0.96)",
                  boxShadow: "0 10px 30px rgba(15,23,42,0.12)",
                }}
              />
              <Legend />
              <Line yAxisId="financial" type="monotone" dataKey="spend" name="Spend" stroke="#1d4ed8" strokeWidth={2.6} dot={false} />
              <Line yAxisId="financial" type="monotone" dataKey="attributedRevenue" name="Attribuert omsetning" stroke="#0f766e" strokeWidth={2.6} dot={false} />
              <Line yAxisId="ratio" type="monotone" dataKey="roas" name="ROAS" stroke="#7c3aed" strokeWidth={2.3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full w-full animate-pulse rounded-2xl bg-zinc-100 dark:bg-zinc-800" />
        )}
      </div>
    </Card>
  );
}
