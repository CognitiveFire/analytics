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
    <Card className="h-[360px] border-zinc-200/90 bg-[#ebe8df] shadow-[0_10px_28px_rgba(0,0,0,0.06)] dark:bg-[#ebe8df]">
      <CardTitle className="text-base text-zinc-950 dark:text-zinc-950">KPI-trend over tid</CardTitle>
      <CardDescription className="mt-1">
        Manedlig trend for sentrale finansielle KPI-er med automatisk sammenligning mot forrige maned.
      </CardDescription>

      <div className="mt-5 h-[270px]">
        {mounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid stroke="rgba(24, 24, 27, 0.12)" strokeDasharray="4 4" />
              <XAxis dataKey="date" tick={{ fontSize: 12, fill: "#3f3f46" }} tickLine={false} axisLine={false} />
              <YAxis yAxisId="financial" tick={{ fontSize: 12, fill: "#3f3f46" }} tickLine={false} axisLine={false} />
              <YAxis yAxisId="ratio" orientation="right" tick={{ fontSize: 12, fill: "#3f3f46" }} tickLine={false} axisLine={false} />
              <Tooltip
                formatter={(value, name) => {
                  if (name === "ROAS") {
                    return `${(value as number).toFixed(1)}x`;
                  }

                  return formatKroner(value as number);
                }}
                contentStyle={{
                  borderRadius: "14px",
                  border: "1px solid rgba(24, 24, 27, 0.12)",
                  backgroundColor: "rgba(248,246,240,0.98)",
                  boxShadow: "0 10px 28px rgba(0,0,0,0.1)",
                }}
              />
              <Legend wrapperStyle={{ fontSize: 12, color: "#3f3f46" }} />
              <Line yAxisId="financial" type="monotone" dataKey="spend" name="Kostnad" stroke="#ff4a0a" strokeWidth={2.8} dot={false} />
              <Line yAxisId="financial" type="monotone" dataKey="attributedRevenue" name="Attribuert omsetning" stroke="#111111" strokeWidth={2.8} dot={false} />
              <Line yAxisId="ratio" type="monotone" dataKey="roas" name="ROAS" stroke="#f97316" strokeWidth={2.4} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full w-full animate-pulse rounded-2xl bg-zinc-100 dark:bg-zinc-800" />
        )}
      </div>
    </Card>
  );
}
