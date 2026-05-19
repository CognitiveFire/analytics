import { useMemo } from "react";
import enTranslations from "./en.json";
import nbTranslations from "./nb.json";
import { AdsLanguage } from "@/lib/ads/ui-language";


export const translations = {
  en: enTranslations,
  nb: nbTranslations,
};

export function useTranslation(lang: AdsLanguage) {
  return useMemo(() => {
    const t = (key: string, defaultValue?: string): string => {
      const keys = key.split(".");
      let current: Record<string, unknown> | unknown = translations[lang];

      for (const k of keys) {
        if (current && typeof current === "object" && k in current) {
          current = (current as Record<string, unknown>)[k];
        } else {
          current = undefined;
        }
      }

      return typeof current === "string" ? current : defaultValue || key;
    };

    return { t };
  }, [lang]);
}

/**
 * Get a translation string directly without a hook
 * Useful for server-side or non-component code
 */
export function getTranslation(
  lang: AdsLanguage,
  key: string,
  defaultValue?: string
): string {
  const keys = key.split(".");
  let current: Record<string, unknown> | unknown = translations[lang];

  for (const k of keys) {
    if (current && typeof current === "object" && k in current) {
      current = (current as Record<string, unknown>)[k];
    } else {
      current = undefined;
    }
  }

  return typeof current === "string" ? current : defaultValue || key;
}
