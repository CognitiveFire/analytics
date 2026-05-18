import { DataSource } from "@/types";
import { getGoogleAdsClientAccounts, getGoogleAdsManagerAccounts } from "@/lib/connectors/google-ads-accounts";

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
    description: "Campaign, keyword, conversion, and budget data.",
    accessModes: ["oauth", "service-account"],
    requiredFields: ["Manager account", "Client account", "Access scope"],
    helperText: "Use the listed manager/client account structure and only activate the customer IDs that belong to this client.",
  },
  {
    source: "ga4",
    label: "GA4",
    description: "Behaviour, sessions, conversions, and event data.",
    accessModes: ["oauth", "service-account"],
    requiredFields: ["Property ID", "Measurement access"],
    helperText: "Only connect properties the client has explicitly granted access to.",
  },
  {
    source: "searchConsole",
    label: "Search Console",
    description: "Indexing, queries, pages, and visibility.",
    accessModes: ["oauth"],
    requiredFields: ["Property URL", "Verified ownership"],
    helperText: "Search Console is only available for verified properties.",
  },
  {
    source: "bigQuery",
    label: "BigQuery",
    description: "Processed reporting tables and warehouse models.",
    accessModes: ["service-account"],
    requiredFields: ["Project ID", "Dataset", "Table or SQL view"],
    helperText: "Use when data is already transformed in the warehouse.",
  },
  {
    source: "screamingFrog",
    label: "Screaming Frog CSV",
    description: "SEO crawl exports uploaded as CSV files.",
    accessModes: ["csv-upload"],
    requiredFields: ["internal_html.csv", "response_codes.csv", "page_titles.csv", "h1.csv", "canonicals.csv", "inlinks.csv", "crawl_overview.csv"],
    helperText: "Each crawl can be uploaded independently and compared to the previous crawl.",
  },
  {
    source: "cm360",
    label: "Campaign Manager 360",
    description: "Floodlight, placements, creatives, and attribution layers.",
    accessModes: ["oauth", "service-account"],
    requiredFields: ["Advertiser ID", "Floodlight configuration"],
    helperText: "Only include advertisers the team actively manages.",
  },
  {
    source: "dv360",
    label: "DV360",
    description: "Media buy, inventory, pacing, and audience signals.",
    accessModes: ["oauth", "service-account"],
    requiredFields: ["Partner ID", "Advertiser ID", "Access level"],
    helperText: "Some clients only expose partner-level access, others expose advertiser-level access.",
  },
  {
    source: "floodlight",
    label: "Floodlight",
    description: "Conversion tags and attribution events.",
    accessModes: ["service-account", "manual-import"],
    requiredFields: ["Configuration ID", "Event mapping"],
    helperText: "Floodlight may be provided directly via a processed mapping table.",
  },
  {
    source: "crm",
    label: "CRM Import",
    description: "Lead quality, opportunities, closed revenue, and account stages.",
    accessModes: ["csv-upload", "manual-import"],
    requiredFields: ["Object mapping", "Lifecycle stage mapping", "Source field"],
    helperText: "Use CSV upload or structured manual mapping depending on the client CRM.",
  },
];

export const googleAdsWizardAccounts = {
  managers: getGoogleAdsManagerAccounts(),
  clients: getGoogleAdsClientAccounts(),
};

export const connectorWizardSteps = [
  {
    title: "Select accessible sources",
    description: "Pick only the systems this client actually has access to.",
  },
  {
    title: "Configure access details",
    description: "Provide the required identifiers, auth mode, or upload method for each selected source.",
  },
  {
    title: "Review and activate",
    description: "Confirm the connector set and activate only the sources included in this account.",
  },
];
