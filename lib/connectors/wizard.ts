import { DataSource } from "@/types";
import { getGoogleAdsClientAccounts, getGoogleAdsManagerAccounts } from "@/lib/connectors/google-ads-accounts";
import { googleAnalyticsAccounts } from "@/lib/connectors/google-analytics-accounts";

export type ConnectorAccessMode = "oauth" | "service-account" | "api-key" | "csv-upload" | "manual-import";

export interface ConnectorWizardSource {
  source: DataSource | "screamingFrog";
  label: string;
  description: string;
  accessModes: ConnectorAccessMode[];
  requiredFields: string[];
  helperText: string;
}

export const connectorWizardSources: ConnectorWizardSource[] = [
  {
    source: "googleAds",
    label: "Google Ads",
    description: "Kampanje-, nokkelord-, konverterings- og budsjetdata.",
    accessModes: ["oauth", "service-account"],
    requiredFields: ["Managerkonto", "Kundekonto", "Tilgangsomrade"],
    helperText: "Bruk oppfort manager-/kundestruktur og aktiver kun kunde-IDene som horer til denne kunden.",
  },
  {
    source: "ga4",
    label: "GA4",
    description: "Atferd, okter, konverteringer og hendelsesdata.",
    accessModes: ["oauth", "service-account"],
    requiredFields: ["Property", "Malingstilgang"],
    helperText: "Koble kun GA4-properties som horer til gjeldende kontosett.",
  },
  {
    source: "searchConsole",
    label: "Search Console",
    description: "Indeksering, sokesporsmal, sider og synlighet.",
    accessModes: ["oauth"],
    requiredFields: ["Property-URL", "Verifisert eierskap"],
    helperText: "Search Console er kun tilgjengelig for verifiserte properties.",
  },
  {
    source: "bigQuery",
    label: "BigQuery",
    description: "Bearbeidede rapporteringstabeller og datavarehusmodeller.",
    accessModes: ["service-account"],
    requiredFields: ["Prosjekt-ID", "Dataset", "Tabell eller SQL-view"],
    helperText: "Brukes nar data allerede er transformert i datavarehuset.",
  },
  {
    source: "screamingFrog",
    label: "Screaming Frog CSV",
    description: "SEO-crawl-eksporter lastes opp som CSV-filer.",
    accessModes: ["csv-upload"],
    requiredFields: ["internal_html.csv", "response_codes.csv", "page_titles.csv", "h1.csv", "canonicals.csv", "inlinks.csv", "crawl_overview.csv"],
    helperText: "Hver crawl kan lastes opp separat og sammenlignes mot forrige crawl.",
  },
  {
    source: "cm360",
    label: "Campaign Manager 360",
    description: "Floodlight, plasseringer, kreativer og attribusjonslag.",
    accessModes: ["oauth", "service-account"],
    requiredFields: ["Annonsor-ID", "Floodlight-konfigurasjon"],
    helperText: "Ta kun med annonsorer teamet aktivt forvalter.",
  },
  {
    source: "dv360",
    label: "DV360",
    description: "Mediakjop, inventar, pacing og malgruppesignaler.",
    accessModes: ["oauth", "service-account"],
    requiredFields: ["Partner-ID", "Annonsor-ID", "Tilgangsniva"],
    helperText: "Noen kunder har kun partnertilgang, andre har annonsorniva.",
  },
  {
    source: "floodlight",
    label: "Floodlight",
    description: "Konverteringstags og attribusjonshendelser.",
    accessModes: ["service-account", "manual-import"],
    requiredFields: ["Konfigurasjons-ID", "Hendelsesmapping"],
    helperText: "Floodlight kan leveres direkte via en bearbeidet mappingtabell.",
  },
  {
    source: "crm",
    label: "CRM-import",
    description: "Lead-kvalitet, muligheter, lukket omsetning og kontostadier.",
    accessModes: ["csv-upload", "manual-import"],
    requiredFields: ["Objektmapping", "Mapping av livssyklusstadier", "Kildefelt"],
    helperText: "Bruk CSV-opplasting eller strukturert manuell mapping avhengig av kundens CRM.",
  },
];

export const googleAdsWizardAccounts = {
  managers: getGoogleAdsManagerAccounts(),
  clients: getGoogleAdsClientAccounts(),
};

export const googleAnalyticsWizardAccounts = googleAnalyticsAccounts;

export const connectorWizardSteps = [
  {
    title: "Velg tilgjengelige kilder",
    description: "Velg kun systemene denne kunden faktisk har tilgang til.",
  },
  {
    title: "Konfigurer tilgangsdetaljer",
    description: "Legg inn nodvendige identifikatorer, autentiseringsmetode eller opplastingsmetode for hver valgt kilde.",
  },
  {
    title: "Gjennomga og aktiver",
    description: "Bekreft koblingssettet og aktiver kun kildene som skal gjelde for denne kontoen.",
  },
];
