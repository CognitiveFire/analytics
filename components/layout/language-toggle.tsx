"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";

const STORAGE_KEY = "signal-room-language";

type AppLanguage = "no" | "en";

export function LanguageToggle() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [language, setLanguage] = useState<AppLanguage>("no");

  const currentQueryLang = useMemo(() => {
    const value = searchParams.get("lang");
    return value === "en" ? "en" : "no";
  }, [searchParams]);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const nextLanguage = stored === "en" ? "en" : currentQueryLang;
    setLanguage(nextLanguage);
    document.documentElement.lang = nextLanguage === "en" ? "en" : "no";
  }, [currentQueryLang]);

  function applyLanguage(nextLanguage: AppLanguage) {
    setLanguage(nextLanguage);
    document.documentElement.lang = nextLanguage === "en" ? "en" : "no";
    window.localStorage.setItem(STORAGE_KEY, nextLanguage);

    if (!pathname.startsWith("/ads")) {
      return;
    }

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
        onClick={() => applyLanguage("no")}
        size="sm"
        variant={language === "no" ? "default" : "ghost"}
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
