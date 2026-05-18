"use client";

import { Check, ChevronDown } from "lucide-react";
import { useMemo } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { clients } from "@/lib/mock-data/clients";
import { usePlatformStore } from "@/hooks/use-platform-store";

const periods = ["Last 7 days", "Last 30 days", "Quarter to date", "Year to date"];

export function ClientControls() {
  const { clientId, setClientId, period, setPeriod, comparePrevious, toggleComparePrevious } = usePlatformStore();

  const currentClient = useMemo(() => clients.find((c) => c.id === clientId) ?? clients[0], [clientId]);

  const healthVariant = currentClient.accountHealth > 80 ? "success" : currentClient.accountHealth > 70 ? "warning" : "danger";

  return (
    <div className="flex flex-wrap items-center gap-3">
      <select
        className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-700 outline-none focus:ring-2 focus:ring-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"
        onChange={(event) => setClientId(event.target.value)}
        value={clientId}
      >
        {clients.map((client) => (
          <option key={client.id} value={client.id}>
            {client.name}
          </option>
        ))}
      </select>

      <select
        className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-700 outline-none focus:ring-2 focus:ring-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"
        onChange={(event) => setPeriod(event.target.value)}
        value={period}
      >
        {periods.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <Button onClick={toggleComparePrevious} size="sm" variant="outline">
        {comparePrevious ? <Check className="mr-2 h-4 w-4" /> : <ChevronDown className="mr-2 h-4 w-4" />}
        Compare previous period
      </Button>

      <Badge variant={healthVariant}>Account health: {currentClient.accountHealth}</Badge>
      <Badge variant="neutral">Report: {currentClient.reportStatus}</Badge>
    </div>
  );
}
