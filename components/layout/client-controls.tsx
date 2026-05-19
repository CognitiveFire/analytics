"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { clients as staticClients } from "@/lib/mock-data/clients";
import { usePlatformStore } from "@/hooks/use-platform-store";
import { getMonthlyPeriods } from "@/lib/reporting/month-periods";
import { Client } from "@/types";

const periods = getMonthlyPeriods(12);

export function ClientControls() {
  const { clientId, setClientId, period, comparePeriod, setPeriod } = usePlatformStore();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [clients, setClients] = useState<Client[]>(staticClients);

  useEffect(() => {
    let mounted = true;

    async function loadClients() {
      try {
        const response = await fetch("/api/clients", { cache: "no-store" });
        if (!response.ok) {
          return;
        }

        const payload = (await response.json()) as { clients?: Client[] };
        if (!mounted || !payload.clients || payload.clients.length === 0) {
          return;
        }

        setClients(payload.clients);
      } catch {
        // Keep static fallback list.
      }
    }

    void loadClients();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!clients.some((client) => client.id === clientId) && clients.length > 0) {
      setClientId(clients[0].id);
    }
  }, [clientId, clients, setClientId]);

  useEffect(() => {
    if (!pathname.startsWith("/ads")) {
      return;
    }

    const currentAccountId = searchParams.get("accountId") ?? "";
    if (currentAccountId === clientId) {
      return;
    }

    const params = new URLSearchParams(searchParams.toString());
    params.set("accountId", clientId);
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
  }, [clientId, pathname, router, searchParams]);

  const currentClient = useMemo(() => clients.find((c) => c.id === clientId) ?? clients[0], [clientId, clients]);

  const healthVariant = currentClient.accountHealth > 80 ? "success" : currentClient.accountHealth > 70 ? "warning" : "danger";

  return (
    <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center">
      <select
        className="w-full min-w-0 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-700 outline-none focus:ring-2 focus:ring-zinc-300 sm:w-auto sm:min-w-[220px] dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"
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
        className="w-full min-w-0 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-700 outline-none focus:ring-2 focus:ring-zinc-300 sm:w-auto sm:min-w-[160px] dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"
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
