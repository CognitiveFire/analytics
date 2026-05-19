"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

import { PlatformShell } from "@/components/layout/platform-shell";
import { Badge } from "@/components/ui/badge";
import { clients as staticClients } from "@/lib/mock-data/clients";
import { AdsLanguage, resolveAdsLanguage } from "@/lib/ads/ui-language";
import { cn } from "@/lib/utils/cn";
import { Client } from "@/types";

const navItems = [
  { href: "/ads/dashboard", label: { nb: "Oversikt", en: "Dashboard" } },
  { href: "/ads/recommendations", label: { nb: "Anbefalinger", en: "Recommendations" } },
  { href: "/ads/execution", label: { nb: "Utførelse", en: "Execution" } },
  { href: "/ads/campaigns", label: { nb: "Kampanjer", en: "Campaigns" } },
  { href: "/ads/history", label: { nb: "Historikk", en: "History" } },
  { href: "/ads/settings", label: { nb: "Innstillinger", en: "Settings" } },
];

export function AdsShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedAccountId = searchParams.get("accountId") ?? "";
  const lang = resolveAdsLanguage(searchParams.get("lang"));
  const [clients, setClients] = useState<Client[]>(staticClients);

  useEffect(() => {
    let mounted = true;

    async function loadClients() {
      try {
        const response = await fetch("/api/clients", { cache: "no-store" });
        if (!response.ok) {
          return;
        }

        const payload = (await response.json()) as { clients?: Client[] };
        if (!mounted || !payload.clients?.length) {
          return;
        }

        setClients(payload.clients);
      } catch {
        // Keep static fallback list.
      }
    }

    void loadClients();

    return () => {
      mounted = false;
    };
  }, []);

  function buildHref(href: string) {
    const params = new URLSearchParams();
    if (!selectedAccountId) {
      if (lang !== "nb") {
        params.set("lang", lang);
      }
      const suffix = params.toString();
      return suffix ? `${href}?${suffix}` : href;
    }

    params.set("accountId", selectedAccountId);
    if (lang !== "nb") {
      params.set("lang", lang);
    }

    return `${href}?${params.toString()}`;
  }

  function onAccountChange(nextAccountId: string) {
    const params = new URLSearchParams();
    if (lang !== "nb") {
      params.set("lang", lang);
    }

    if (!nextAccountId) {
      const suffix = params.toString();
      router.push(suffix ? `${pathname}?${suffix}` : pathname);
      return;
    }

    params.set("accountId", nextAccountId);
    router.push(`${pathname}?${params.toString()}`);
  }

  function onLanguageChange(nextLang: AdsLanguage) {
    const params = new URLSearchParams();
    if (selectedAccountId) {
      params.set("accountId", selectedAccountId);
    }
    if (nextLang !== "nb") {
      params.set("lang", nextLang);
    }

    const suffix = params.toString();
    router.push(suffix ? `${pathname}?${suffix}` : pathname);
  }

  return (
    <PlatformShell>
      <section className="space-y-6">
        <div className="rounded-[1.75rem] border border-zinc-200/80 bg-white/80 p-5 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/65">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Signal Room Ads</p>
              </div>
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:justify-end">
                <div className="rounded-full border border-zinc-300/80 bg-white px-3 py-1.5 dark:border-zinc-700 dark:bg-zinc-900">
                  <label className="mr-2 text-xs uppercase tracking-[0.16em] text-zinc-500" htmlFor="ads-account-filter">
                    {lang === "nb" ? "Kunde" : "Client"}
                  </label>
                  <select
                    className="min-w-0 bg-transparent text-sm text-zinc-700 outline-none sm:min-w-[220px] dark:text-zinc-200"
                    id="ads-account-filter"
                    onChange={(event) => onAccountChange(event.target.value)}
                    value={selectedAccountId}
                  >
                    <option value="">{lang === "nb" ? "Auto" : "Auto"}</option>
                    {clients.map((client) => (
                      <option key={client.id} value={client.id}>
                        {client.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="inline-flex w-fit rounded-full border border-zinc-300/80 bg-white p-1 dark:border-zinc-700 dark:bg-zinc-900">
                  {([
                    { value: "nb", label: "NO" },
                    { value: "en", label: "EN" },
                  ] as const).map((option) => (
                    <button
                      className={cn(
                        "rounded-full px-3 py-1 text-xs font-medium transition-colors",
                        lang === option.value
                          ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                          : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                      )}
                      key={option.value}
                      onClick={() => onLanguageChange(option.value)}
                      type="button"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
                <Badge className="bg-orange-100 text-orange-700" variant="neutral">
                  {lang === "nb" ? "Manuell godkjenning kreves" : "Manual approval required"}
                </Badge>
              </div>
            </div>

            <nav className="flex flex-wrap gap-2 border-t border-zinc-200/80 pt-4 dark:border-zinc-800">
              {navItems.map((item) => {
                const active = pathname.startsWith(item.href);

                return (
                  <Link
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                      active
                        ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
                        : "border-zinc-300/80 bg-white text-zinc-700 hover:border-orange-300 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"
                    )}
                    href={buildHref(item.href)}
                    key={item.href}
                  >
                    {item.href === "/ads/dashboard" ? <Sparkles className="h-4 w-4" /> : null}
                    {item.label[lang]}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {children}
      </section>
    </PlatformShell>
  );
}
