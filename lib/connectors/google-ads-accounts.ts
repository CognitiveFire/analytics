export interface GoogleAdsAccount {
  customerId: string;
  label: string;
  managerId?: string;
  role: "manager" | "client";
  accessNotes: string;
}

export const googleAdsAccounts: GoogleAdsAccount[] = [
  {
    customerId: "888-000-0001",
    label: "Manager account",
    role: "manager",
    accessNotes: "Demonstrates full account hierarchy access for product walkthroughs.",
  },
  {
    customerId: "999-000-0001",
    label: "Executive account",
    managerId: "888-000-0001",
    role: "client",
    accessNotes: "Primary account used to showcase all connector surfaces and executive reporting outputs.",
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
