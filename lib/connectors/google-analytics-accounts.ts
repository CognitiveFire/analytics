export interface GoogleAnalyticsAccount {
  propertyId: string;
  label: string;
  accountId?: string;
  accessNotes: string;
}

export const googleAnalyticsAccounts: GoogleAnalyticsAccount[] = [
  {
    propertyId: "G-DEMO-EXEC",
    label: "Demo Executive Account",
    accountId: "999-000-0001",
    accessNotes: "Demo property mapped to the executive demo account for end-to-end walkthroughs.",
  },
];
