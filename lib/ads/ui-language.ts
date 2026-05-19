export type AdsLanguage = "nb" | "en";

export function resolveAdsLanguage(value: string | null | undefined): AdsLanguage {
  return value === "en" ? "en" : "nb";
}
