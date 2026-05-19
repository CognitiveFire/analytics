export interface GoogleAnalyticsAccount {
  propertyId: string;
  label: string;
  accountId?: string;
  accessNotes: string;
}

export const googleAnalyticsAccounts: GoogleAnalyticsAccount[] = [
  {
    propertyId: "G-DEMO-EXEC",
    label: "Executive account",
    accountId: "999-000-0001",
    accessNotes: "Primary property mapped to the executive account for end-to-end walkthroughs.",
  },
];
