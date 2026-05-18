import { Client } from "@/types";

export const clients: Client[] = [
  {
    id: "sotra-ror",
    name: "Sotra Rør",
    industry: "Services",
    region: "Norway",
    accountHealth: 82,
    reportStatus: "ready",
    logoMark: "SR",
  },
  {
    id: "melk-no",
    name: "Melk.no",
    industry: "Ecommerce",
    region: "Norway",
    accountHealth: 73,
    reportStatus: "refreshing",
    logoMark: "MK",
  },
  {
    id: "sound-people",
    name: "Sound People",
    industry: "Entertainment",
    region: "Nordics",
    accountHealth: 67,
    reportStatus: "scheduled",
    logoMark: "SP",
  },
  {
    id: "morrow-bank",
    name: "Morrow Bank",
    industry: "Finance",
    region: "Nordics",
    accountHealth: 78,
    reportStatus: "ready",
    logoMark: "MB",
  },
  {
    id: "unik-vvs",
    name: "Unik VVS",
    industry: "Services",
    region: "Norway",
    accountHealth: 71,
    reportStatus: "scheduled",
    logoMark: "UV",
  },
];
