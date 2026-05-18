"use client";

import { useEffect, useState } from "react";
import {
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

export function TrendChart({ title, description, color, dataKey, data }: TrendChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Card className="h-[320px]">
      <CardTitle className="text-base">{title}</CardTitle>
      <CardDescription className="mt-1">{description}</CardDescription>
      <div className="mt-5 h-[230px]">
        {mounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid stroke="rgba(148, 163, 184, 0.2)" strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fontSize: 12, fill: "#71717a" }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#71717a" }} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  borderRadius: "14px",
                  border: "1px solid rgba(148, 163, 184, 0.35)",
                  backgroundColor: "rgba(255,255,255,0.96)",
                  boxShadow: "0 10px 30px rgba(15,23,42,0.12)",
                }}
              />
              <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full w-full animate-pulse rounded-2xl bg-zinc-100 dark:bg-zinc-800" />
        )}
      </div>
    </Card>
  );
}
