import { MockConnector } from "@/lib/connectors/mock-factory";
import { DataSource } from "@/types";

const sources: DataSource[] = [
  "googleAds",
  "ga4",
  "searchConsole",
  "bigQuery",
  "cm360",
  "dv360",
  "floodlight",
  "crm",
];

export const connectors = sources.map((source) => new MockConnector(source));

export async function loadConnectorSnapshots(clientId: string) {
  return Promise.all(connectors.map((connector) => connector.createSnapshot(clientId)));
}
