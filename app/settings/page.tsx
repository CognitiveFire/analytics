import { PlatformShell } from "@/components/layout/platform-shell";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

const connectors = ["Google Ads", "GA4", "Search Console", "BigQuery", "CM360", "DV360", "Floodlight", "CRM Imports"];

export default function SettingsPage() {
  return (
    <PlatformShell>
      <section className="space-y-6">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">Platform Settings</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Data and experience configuration</h1>
        </div>

        <Card>
          <CardTitle>Connector orchestration</CardTitle>
          <CardDescription className="mt-2">
            Signal Room syncs processed data from existing reporting infrastructure and applies intelligence logic above it.
          </CardDescription>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {connectors.map((connector) => (
              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm dark:border-zinc-700 dark:bg-zinc-800/60" key={connector}>
                {connector}
              </div>
            ))}
          </div>
        </Card>
      </section>
    </PlatformShell>
  );
}
