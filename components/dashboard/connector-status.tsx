import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { loadConnectorSnapshots } from "@/lib/connectors";

export async function ConnectorStatus({ clientId }: { clientId: string }) {
  const snapshots = await loadConnectorSnapshots(clientId);

  return (
    <Card>
      <CardTitle className="text-lg">Datalag for koblinger</CardTitle>
      <CardDescription className="mt-2">
        Eksisterende Looker Studio/BigQuery-rapportering brukes som datagrunnlag i Signal Room.
      </CardDescription>

      <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {snapshots.map((snapshot) => (
          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-700 dark:bg-zinc-800/60" key={snapshot.source}>
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">{snapshot.source}</p>
            <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-200">{snapshot.account}</p>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Trendendring: {snapshot.trendDelta}%</p>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">Avvik: {snapshot.anomalies.length}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
