export interface GoogleAnalyticsAccount {
  propertyId: string;
  label: string;
  accountId?: string;
  accessNotes: string;
}

export const googleAnalyticsAccounts: GoogleAnalyticsAccount[] = [
  {
    propertyId: "G-XXXXXXX-SOTRA",
    label: "Sotra Rør",
    accountId: "180-521-0492",
    accessNotes: "Use the GA4 property attached to the Sotra Rør reporting stack.",
  },
  {
    propertyId: "G-XXXXXXX-MELK",
    label: "Melk.no",
    accountId: "180-521-0492",
    accessNotes: "Use the GA4 property attached to the Melk.no reporting stack.",
  },
  {
    propertyId: "G-XXXXXXX-MORROW",
    label: "Morrow Bank",
    accountId: "421-149-7144",
    accessNotes: "Use the GA4 property that matches the Morrow Bank account level reporting.",
  },
  {
    propertyId: "G-XXXXXXX-SOUND",
    label: "Sound People",
    accountId: "913-039-5488",
    accessNotes: "Use the GA4 property tied to the Sound People client account.",
  },
  {
    propertyId: "G-XXXXXXX-UNIK",
    label: "Unik VVS",
    accountId: "TBD-UNIK-VVS",
    accessNotes: "Use the GA4 property tied to the Unik VVS account once shared.",
  },
];
