import { Client } from "@/types";

export const clients: Client[] = [
  {
    id: "nordic-retail",
    name: "Nordic Retail Group",
    industry: "Retail",
    region: "Nordics",
    accountHealth: 82,
    reportStatus: "ready",
    logoMark: "NR",
  },
  {
    id: "fjord-finance",
    name: "Fjord Finance",
    industry: "Finance",
    region: "Scandinavia",
    accountHealth: 73,
    reportStatus: "refreshing",
    logoMark: "FF",
  },
  {
    id: "skala-b2b",
    name: "Skala Industrial",
    industry: "B2B",
    region: "Europe",
    accountHealth: 67,
    reportStatus: "scheduled",
    logoMark: "SI",
  },
];
