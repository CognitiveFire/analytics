"use client";

import { useMemo } from "react";
import { Group } from "@visx/group";
import { ParentSize } from "@visx/responsive";
import { scaleBand, scaleLinear } from "@visx/scale";
import { Bar } from "@visx/shape";
import { AxisBottom, AxisLeft } from "@visx/axis";

import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { completedOperationalTasks } from "@/lib/mock-data/tasks";

const chartColor = "#1d4ed8";

function toMonthLabel(monthKey: string) {
  const [year, month] = monthKey.split("-");
  const monthNames = ["jan", "feb", "mar", "apr", "mai", "jun", "jul", "aug", "sep", "okt", "nov", "des"];
  const monthLabel = monthNames[Number(month) - 1] ?? month;
  return `${monthLabel} ${year}`;
}

export function CompletedWorkVisxPilot() {
  const data = useMemo(() => {
    const grouped = completedOperationalTasks.reduce<Record<string, number>>((acc, item) => {
      const monthKey = item.completedDate.slice(0, 7);
      acc[monthKey] = (acc[monthKey] ?? 0) + 1;
      return acc;
    }, {});

    return Object.entries(grouped)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([monthKey, count]) => ({
        month: toMonthLabel(monthKey),
        count,
      }));
  }, []);

  return (
    <Card className="h-[360px]">
      <CardTitle className="text-base">Visx pilot: fullfort arbeid per maned</CardTitle>
      <CardDescription className="mt-1">A/B-spike for a sammenligne Visx mot Nivo pa samme datasett.</CardDescription>

      <div className="mt-5 h-[268px]">
        <ParentSize>
          {({ width, height }) => {
            const margin = { top: 12, right: 16, bottom: 58, left: 48 };
            const innerWidth = Math.max(width - margin.left - margin.right, 0);
            const innerHeight = Math.max(height - margin.top - margin.bottom, 0);
            const maxValue = Math.max(...data.map((d) => d.count), 1);

            const xScale = scaleBand<string>({
              domain: data.map((d) => d.month),
              range: [0, innerWidth],
              padding: 0.34,
            });

            const yScale = scaleLinear<number>({
              domain: [0, maxValue],
              range: [innerHeight, 0],
              nice: true,
            });

            return (
              <svg width={width} height={height} role="img" aria-label="Visx pilot for fullfort arbeid per maned">
                <Group top={margin.top} left={margin.left}>
                  {data.map((item) => {
                    const barWidth = xScale.bandwidth();
                    const barX = xScale(item.month) ?? 0;
                    const barY = yScale(item.count);
                    const barHeight = innerHeight - barY;

                    return (
                      <Bar
                        key={item.month}
                        x={barX}
                        y={barY}
                        width={barWidth}
                        height={barHeight}
                        fill={chartColor}
                        rx={10}
                        ry={10}
                      />
                    );
                  })}

                  <AxisLeft
                    scale={yScale}
                    numTicks={4}
                    tickLabelProps={{ fill: "#71717a", fontSize: 12, textAnchor: "end", dy: "0.33em" }}
                    stroke="rgba(148, 163, 184, 0.4)"
                    tickStroke="rgba(148, 163, 184, 0.35)"
                  />

                  <AxisBottom
                    top={innerHeight}
                    scale={xScale}
                    tickLabelProps={{ fill: "#71717a", fontSize: 12, textAnchor: "middle", dy: "0.6em" }}
                    stroke="rgba(148, 163, 184, 0.4)"
                    tickStroke="rgba(148, 163, 184, 0.35)"
                  />
                </Group>
              </svg>
            );
          }}
        </ParentSize>
      </div>
    </Card>
  );
}
