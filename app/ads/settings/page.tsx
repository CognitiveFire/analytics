import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { resolveAdsLanguage } from "@/lib/ads/ui-language";
import { clients } from "@/lib/mock-data/clients";
import { listGoogleAdsConnectorStates } from "@/lib/server/google-ads-connector-store";

const safeguardsByLanguage = {
  nb: [
    "Maksimal budsjettendring per utførelse: 20%",
    "Beskyttet logikk for merkevarekampanjer er aktiv",
    "Anbefalinger med lav sikkerhet blokkeres fra utførelse",
    "Manuell godkjenning kreves før alle endringer",
    "Rollback-metadata kreves for hver utførelsespakke",
  ],
  en: [
    "Maximum budget delta per execution: 20%",
    "Protected branded campaign logic enabled",
    "Low-confidence recommendations blocked from execution",
    "Manual approval required before all mutations",
    "Rollback metadata required for every execution batch",
  ],
} as const;

type AdsSettingsPageProps = {
  searchParams?: Promise<{ lang?: string }>;
};

export default async function AdsSettingsPage({ searchParams }: AdsSettingsPageProps) {
  const params = await searchParams;
  const lang = resolveAdsLanguage(params?.lang);
  const connectorStates = await listGoogleAdsConnectorStates();
  const safeguards = safeguardsByLanguage[lang];

  return (
    <div className="space-y-4">
      <Card className="border-zinc-200/90 bg-white/80 dark:bg-zinc-900/70">
        <CardTitle>{lang === "nb" ? "Sikkerhetsmekanismer for utførelse" : "Execution Safeguards"}</CardTitle>
        <CardDescription className="mt-2">
          {lang === "nb"
            ? "Signal Room Ads er et lag for innsikt og assistert utførelse, ikke autonom kontoautomatisering."
            : "Signal Room Ads is an intelligence and assisted execution layer, not autonomous account automation."}
        </CardDescription>
        <ul className="mt-5 space-y-2 text-sm text-zinc-700">
          {safeguards.map((safeguard) => (
            <li className="rounded-xl bg-white/75 px-3 py-2" key={safeguard}>
              {safeguard}
            </li>
          ))}
        </ul>
      </Card>

      <Card>
        <CardTitle>{lang === "nb" ? "Status for Google Ads-kobling" : "Google Ads connector status"}</CardTitle>
        <CardDescription className="mt-2">
          {lang === "nb"
            ? "Denne statusen lagres fra Innstillinger / Koblingsveiviser og viser hvilke kontoer som faktisk er koblet."
            : "This status is stored from Settings / Connector Wizard and shows which accounts are actually connected."}
        </CardDescription>

        <div className="mt-5 space-y-3">
          {connectorStates.length === 0 ? (
            <div className="rounded-xl border border-dashed border-zinc-300 px-4 py-3 text-sm text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
              {lang === "nb"
                ? <>Ingen Google Ads-koblinger er lagret ennå. Gå til Innstillinger / Koblingsveiviser for å aktivere.</>
                : <>No Google Ads connectors are saved yet. Go to Settings / Connector Wizard to activate one.</>}
            </div>
          ) : (
            connectorStates.map((state) => {
              const client = clients.find((item) => item.id === state.clientId);
              return (
                <div className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900/50" key={state.clientId}>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{client?.name ?? state.clientId}</p>
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        state.connected
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
                          : "bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                      }`}
                    >
                      {state.connected ? (lang === "nb" ? "Koblet til" : "Connected") : (lang === "nb" ? "Ikke koblet til" : "Not connected")}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                    {lang === "nb" ? "Valgte kontoer" : "Selected accounts"}: {state.selectedAccounts.length > 0 ? state.selectedAccounts.join(", ") : lang === "nb" ? "Ingen" : "None"}
                  </p>
                </div>
              );
            })
          )}
        </div>
      </Card>
    </div>
  );
}
