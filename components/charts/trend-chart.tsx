"use client";

import { useEffect, useState } from "react";
import {
  Area,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { TrendPoint } from "@/types";

interface TrendChartProps {
  title: string;
  description: string;
  color: string;
  dataKey: keyof TrendPoint;
  data: TrendPoint[];
}

function formatMetricValue(dataKey: keyof TrendPoint, value: number | string) {
  if (typeof value !== "number") {
    return value;
  }

  if (dataKey === "spend" || dataKey === "cpa" || dataKey === "attributedRevenue") {
    return `kr ${value.toLocaleString("en-GB", { maximumFractionDigits: 1 })}`;
  }

  return value.toLocaleString("en-GB", { maximumFractionDigits: 1 });
}

export function TrendChart({ title, description, color, dataKey, data }: TrendChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Card className="h-[320px] border-zinc-200/90 bg-[#f2f0ea] shadow-[0_10px_28px_rgba(0,0,0,0.06)] dark:bg-[#f2f0ea]">
      <CardTitle className="text-base text-zinc-950 dark:text-zinc-950">{title}</CardTitle>
      <CardDescription className="mt-1 text-zinc-700 dark:text-zinc-700">{description}</CardDescription>
      <div className="mt-5 h-[230px]">
        {mounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <defs>
                <linearGradient id={`trendGradient-${String(dataKey)}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.32} />
                  <stop offset="95%" stopColor={color} stopOpacity={0.04} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(24, 24, 27, 0.12)" strokeDasharray="4 4" />
              <XAxis dataKey="date" tick={{ fontSize: 12, fill: "#3f3f46" }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#3f3f46" }} tickLine={false} axisLine={false} />
              <Tooltip
                formatter={(value) => formatMetricValue(dataKey, value as number)}
                labelFormatter={(value) => `Periode: ${value}`}
                contentStyle={{
                  borderRadius: "14px",
                  border: "1px solid rgba(24, 24, 27, 0.12)",
                  backgroundColor: "rgba(248,246,240,0.98)",
                  boxShadow: "0 10px 28px rgba(0,0,0,0.1)",
                }}
              />
              <Area type="monotone" dataKey={dataKey} fill={`url(#trendGradient-${String(dataKey)})`} stroke="none" />
              <Line
                type="monotone"
                dataKey={dataKey}
                stroke={color}
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 4, fill: color, stroke: "#fff", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full w-full animate-pulse rounded-2xl bg-zinc-100 dark:bg-zinc-800" />
        )}
      </div>
    </Card>
  );
}
