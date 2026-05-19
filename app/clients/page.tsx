export const dynamic = "force-dynamic";

import { AddClientDialog } from "@/components/clients/add-client-dialog";
import { PlatformShell } from "@/components/layout/platform-shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { clients as staticClients } from "@/lib/mock-data/clients";
import { getStoredClients } from "@/lib/server/client-store";

export default async function ClientsPage() {
  const stored = await getStoredClients();
  const clients = [...staticClients, ...stored];

  return (
    <PlatformShell>
      <section className="space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">Kundeportefolje</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">Operasjonell innsikt pa tvers av kunder</h1>
          </div>
          <AddClientDialog />
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {clients.map((client) => (
            <Card key={client.id}>
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-900 text-sm font-semibold text-white dark:bg-zinc-100 dark:text-zinc-900">
                  {client.logoMark}
                </div>
                <Badge variant={client.accountHealth > 80 ? "success" : client.accountHealth > 70 ? "warning" : "danger"}>
                  Helse {client.accountHealth}
                </Badge>
              </div>
              <CardTitle className="mt-4 text-xl">{client.name}</CardTitle>
              <CardDescription className="mt-2">
                {client.industry} • {client.region}
              </CardDescription>
              <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-300">Rapportstatus: {client.reportStatus}</p>
            </Card>
          ))}
        </div>
      </section>
    </PlatformShell>
  );
}
