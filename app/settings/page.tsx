import Link from "next/link";

import { resolveAdsLanguage } from "@/lib/ads/ui-language";
import { getTranslation } from "@/lib/translations/use-translation";
import { PlatformShell } from "@/components/layout/platform-shell";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

const connectors = [
  "Google Ads",
  "GA4",
  "Search Console",
  "BigQuery",
  "Screaming Frog CSV",
  "CM360",
  "DV360",
  "Floodlight",
  "CRM-import",
];

type SettingsPageProps = {
  searchParams?: Promise<{ lang?: string }>;
};

export default async function SettingsPage({ searchParams }: SettingsPageProps) {
  const params = await searchParams;
  const lang = resolveAdsLanguage(params?.lang);
  const t = (key: string, fallback?: string) => getTranslation(lang, key, fallback);

  return (
    <PlatformShell>
      <section className="space-y-6">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">{t("pages.settings.subtitle", "Platform settings")}</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">{t("pages.settings.title", "Data and experience configuration")}</h1>
        </div>

        <Card>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <CardTitle>{t("connectors.orchestration", "Connector orchestration")}</CardTitle>
              <CardDescription className="mt-2 max-w-3xl">
                {lang === "nb"
                  ? "Signal Room synkroniserer bearbeidede data fra eksisterende rapporteringsinfrastruktur og legger innsiktslogikk over. Hver konto kan kun aktivere kildene den faktisk har tilgang til, inkludert Google Ads, GA4 og Screaming Frog-opplastinger."
                  : "Signal Room syncs processed data from existing reporting infrastructure and layers insight logic on top. Each account can only activate sources it actually has access to, including Google Ads, GA4, and Screaming Frog uploads."}
              </CardDescription>
            </div>
            <Link
              className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
              href="/settings/connectors"
            >
              {t("connectors.openWizard", "Open connector wizard")}
            </Link>
          </div>
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
