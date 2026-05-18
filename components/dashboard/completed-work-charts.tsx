"use client";

import { useEffect, useMemo, useState } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsivePie } from "@nivo/pie";

import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { completedOperationalTasks } from "@/lib/mock-data/tasks";

const categoryColors = ["#0f766e", "#1d4ed8", "#7c3aed", "#ea580c", "#be123c", "#16a34a"];

function toMonthLabel(dateText: string) {
  const [year, month] = dateText.split("-");
  const monthNames = ["jan", "feb", "mar", "apr", "mai", "jun", "jul", "aug", "sep", "okt", "nov", "des"];
  const monthIndex = Number(month) - 1;
  const monthLabel = monthNames[monthIndex] ?? month;
  return `${monthLabel} ${year}`;
}

export function CompletedWorkCharts() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const completedByMonth = useMemo(() => {
    const grouped = completedOperationalTasks.reduce<Record<string, number>>((acc, item) => {
      const monthKey = item.completedDate.slice(0, 7);
      acc[monthKey] = (acc[monthKey] ?? 0) + 1;
      return acc;
    }, {});

    return Object.entries(grouped)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, count]) => ({ month: toMonthLabel(`${month}-01`), count }));
  }, []);

  const completedByCategory = useMemo(() => {
    const grouped = completedOperationalTasks.reduce<Record<string, number>>((acc, item) => {
      acc[item.category] = (acc[item.category] ?? 0) + 1;
      return acc;
    }, {});

    return Object.entries(grouped).map(([name, value]) => ({ name, value }));
  }, []);

  return (
    <section className="grid gap-6 xl:grid-cols-2">
      <Card className="h-[340px]">
        <CardTitle className="text-base">Fullfort arbeid per maned</CardTitle>
        <CardDescription className="mt-1">Viser hvor mange tiltak som er lukket i hver rapporteringsmaned.</CardDescription>
        <div className="mt-5 h-[250px]">
          {mounted ? (
            <ResponsiveBar
              data={completedByMonth}
              keys={["count"]}
              indexBy="month"
              margin={{ top: 10, right: 14, bottom: 52, left: 48 }}
              padding={0.35}
              valueScale={{ type: "linear" }}
              indexScale={{ type: "band", round: true }}
              colors={["#0f766e"]}
              borderRadius={10}
              enableLabel={false}
              axisTop={null}
              axisRight={null}
              axisBottom={{
                tickSize: 0,
                tickPadding: 10,
                legend: "",
                legendOffset: 36,
                legendPosition: "middle",
                truncateTickAt: 0,
              }}
              axisLeft={{
                tickSize: 0,
                tickPadding: 10,
                tickRotation: 0,
                legend: "",
                legendOffset: -40,
                legendPosition: "middle",
                truncateTickAt: 0,
              }}
              theme={{
                grid: { line: { stroke: "rgba(148, 163, 184, 0.22)", strokeDasharray: "3 3" } },
                axis: {
                  ticks: { text: { fill: "#71717a", fontSize: 12 } },
                  legend: { text: { fill: "#71717a", fontSize: 12 } },
                },
                tooltip: {
                  container: {
                    background: "rgba(255,255,255,0.96)",
                    border: "1px solid rgba(148, 163, 184, 0.35)",
                    borderRadius: "14px",
                    boxShadow: "0 10px 30px rgba(15,23,42,0.12)",
                    color: "#0f172a",
                  },
                },
              }}
              tooltip={({ value, indexValue }) => (
                <div className="rounded-2xl px-3 py-2 text-sm">
                  <p className="font-medium text-zinc-900">{indexValue as string}</p>
                  <p className="text-zinc-600">{value as number} fullforte tiltak</p>
                </div>
              )}
              role="application"
              ariaLabel="Fullfort arbeid per maned"
            />
          ) : (
            <div className="h-full w-full animate-pulse rounded-2xl bg-zinc-100 dark:bg-zinc-800" />
          )}
        </div>
      </Card>

      <Card className="h-[340px]">
        <CardTitle className="text-base">Fordeling av fullfort arbeid</CardTitle>
        <CardDescription className="mt-1">Kategorioversikt for tiltak som allerede er levert.</CardDescription>
        <div className="mt-5 h-[250px]">
          {mounted ? (
            <ResponsivePie
              data={completedByCategory.map((item, index) => ({
                id: item.name,
                label: item.name,
                value: item.value,
                color: categoryColors[index % categoryColors.length],
              }))}
              margin={{ top: 10, right: 12, bottom: 34, left: 12 }}
              innerRadius={0.58}
              padAngle={1.6}
              cornerRadius={4}
              activeOuterRadiusOffset={6}
              colors={{ datum: "data.color" }}
              borderWidth={1}
              borderColor={{ from: "color", modifiers: [["darker", 0.15]] }}
              arcLinkLabelsSkipAngle={12}
              arcLinkLabelsTextColor="#52525b"
              arcLinkLabelsThickness={1.5}
              arcLinkLabelsColor={{ from: "color" }}
              arcLabelsSkipAngle={10}
              arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2.4]] }}
              theme={{
                labels: { text: { fontSize: 11 } },
                tooltip: {
                  container: {
                    background: "rgba(255,255,255,0.96)",
                    border: "1px solid rgba(148, 163, 184, 0.35)",
                    borderRadius: "14px",
                    boxShadow: "0 10px 30px rgba(15,23,42,0.12)",
                    color: "#0f172a",
                  },
                },
              }}
              tooltip={({ datum }) => (
                <div className="rounded-2xl px-3 py-2 text-sm">
                  <p className="font-medium text-zinc-900">{datum.label as string}</p>
                  <p className="text-zinc-600">{datum.value as number} fullforte tiltak</p>
                </div>
              )}
            />
          ) : (
            <div className="h-full w-full animate-pulse rounded-2xl bg-zinc-100 dark:bg-zinc-800" />
          )}
        </div>
      </Card>
    </section>
  );
}
