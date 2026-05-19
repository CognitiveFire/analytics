"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { resolveAdsLanguage } from "@/lib/ads/ui-language";

const STORAGE_KEY = "signal-room-language";

type AppLanguage = "nb" | "en";

export function LanguageToggle() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [language, setLanguage] = useState<AppLanguage>("nb");

  const currentQueryLang = useMemo(() => {
    return resolveAdsLanguage(searchParams.get("lang"));
  }, [searchParams]);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const nextLanguage = stored === "en" ? "en" : currentQueryLang;
    setLanguage(nextLanguage);
    document.documentElement.lang = nextLanguage === "en" ? "en" : "nb";
  }, [currentQueryLang]);

  function applyLanguage(nextLanguage: AppLanguage) {
    setLanguage(nextLanguage);
    document.documentElement.lang = nextLanguage === "en" ? "en" : "nb";
    window.localStorage.setItem(STORAGE_KEY, nextLanguage);

    const params = new URLSearchParams(searchParams.toString());
    if (nextLanguage === "en") {
      params.set("lang", "en");
    } else {
      params.delete("lang");
    }

    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  }

  return (
    <div className="inline-flex rounded-full border border-zinc-200 bg-white p-1 dark:border-zinc-700 dark:bg-zinc-900">
      <Button
        className="rounded-full px-3 py-1 text-xs"
        onClick={() => applyLanguage("nb")}
        size="sm"
        variant={language === "nb" ? "default" : "ghost"}
      >
        NO
      </Button>
      <Button
        className="rounded-full px-3 py-1 text-xs"
        onClick={() => applyLanguage("en")}
        size="sm"
        variant={language === "en" ? "default" : "ghost"}
      >
        EN
      </Button>
    </div>
  );
}
