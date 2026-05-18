"use client";

import { useMemo } from "react";

import { Badge } from "@/components/ui/badge";
import { clients } from "@/lib/mock-data/clients";
import { usePlatformStore } from "@/hooks/use-platform-store";
import { getMonthlyPeriods } from "@/lib/reporting/month-periods";

const periods = getMonthlyPeriods(12);

export function ClientControls() {
  const { clientId, setClientId, period, comparePeriod, setPeriod } = usePlatformStore();

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

      <Badge variant="neutral">Sammenlignes med: {comparePeriod}</Badge>

      <Badge variant={healthVariant}>Kontohelse: {currentClient.accountHealth}</Badge>
      <Badge variant="neutral">Rapport: {currentClient.reportStatus}</Badge>
    </div>
  );
}
