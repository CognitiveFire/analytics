"use client";

import { useMemo } from "react";

import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { usePlatformStore } from "@/hooks/use-platform-store";
import { clients } from "@/lib/mock-data/clients";

export function AccountRoster() {
  const clientId = usePlatformStore((store) => store.clientId);
  const current = useMemo(() => clients.find((client) => client.id === clientId) ?? clients[0], [clientId]);

  return (
    <Card>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">Kontounivers</p>
          <CardTitle className="mt-2 text-xl">Tilkoblede kontoer</CardTitle>
          <CardDescription className="mt-2">
            Oversikten viser de samme fem aktive kontoene som brukes i koblinger og SEO-opplasting.
          </CardDescription>
        </div>
        <Badge variant="success">Aktiv: {current.name}</Badge>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {clients.map((client) => (
          <div
            className={`rounded-2xl border px-4 py-3 text-sm transition-colors ${
              client.id === current.id
                ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
                : "border-zinc-200 bg-zinc-50 text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-200"
            }`}
            key={client.id}
          >
            <p className="font-medium">{client.name}</p>
            <p className="mt-1 text-xs opacity-80">{client.industry}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
