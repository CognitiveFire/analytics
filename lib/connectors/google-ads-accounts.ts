export interface GoogleAdsAccount {
  customerId: string;
  label: string;
  managerId?: string;
  role: "manager" | "client";
  accessNotes: string;
}

export const googleAdsAccounts: GoogleAdsAccount[] = [
  {
    customerId: "180-521-0492",
    label: "Sotra Rør",
    managerId: "180-521-0492",
    role: "client",
    accessNotes: "Managed through the 180-521-0492 Google Ads manager account.",
  },
  {
    customerId: "180-521-0492",
    label: "Melk.no",
    managerId: "180-521-0492",
    role: "client",
    accessNotes: "Separate account context from Sotra Rør, currently linked under the same manager login.",
  },
  {
    customerId: "180-521-0492",
    label: "AdWords manager account",
    role: "manager",
    accessNotes: "Manager account for Sotra Rør and Melk.no.",
  },
  {
    customerId: "421-149-7144",
    label: "Morrow Bank",
    role: "client",
    accessNotes: "Standalone Google Ads client account.",
  },
  {
    customerId: "614-408-3689",
    label: "A-Viva Media manager account",
    role: "manager",
    accessNotes: "Manager account used for downstream client access.",
  },
  {
    customerId: "913-039-5488",
    label: "Sound People",
    managerId: "614-408-3689",
    role: "client",
    accessNotes: "Client account under the A-Viva Media manager account.",
  },
  {
    customerId: "TBD-UNIK-VVS",
    label: "Unik VVS",
    role: "client",
    accessNotes: "Google Ads account is approved and awaiting final customer ID confirmation.",
  },
];

export function getGoogleAdsManagerAccounts() {
  return googleAdsAccounts.filter((account) => account.role === "manager");
}

export function getGoogleAdsClientAccounts(managerId?: string) {
  if (!managerId) {
    return googleAdsAccounts.filter((account) => account.role === "client");
  }

  return googleAdsAccounts.filter((account) => account.managerId === managerId);
}
