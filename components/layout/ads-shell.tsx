"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Sparkles } from "lucide-react";

import { PlatformShell } from "@/components/layout/platform-shell";
import { Badge } from "@/components/ui/badge";
import { resolveAdsLanguage } from "@/lib/ads/ui-language";
import { useTranslation } from "@/lib/translations/use-translation";
import { cn } from "@/lib/utils/cn";

const navItems = [
  { href: "/ads/dashboard", labelKey: "ads.dashboard", fallback: "Dashboard" },
  { href: "/ads/recommendations", labelKey: "ads.recommendations", fallback: "Recommendations" },
  { href: "/ads/execution", labelKey: "ads.execution", fallback: "Execution" },
  { href: "/ads/campaigns", labelKey: "ads.campaigns", fallback: "Campaigns" },
  { href: "/ads/history", labelKey: "ads.history", fallback: "History" },
  { href: "/ads/settings", labelKey: "ads.settings", fallback: "Settings" },
];

export function AdsShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selectedAccountId = searchParams.get("accountId") ?? "";
  const lang = resolveAdsLanguage(searchParams.get("lang"));
  const { t } = useTranslation(lang);

  function buildHref(href: string) {
    const params = new URLSearchParams();
    if (selectedAccountId) {
      params.set("accountId", selectedAccountId);
    }
    if (lang !== "nb") {
      params.set("lang", lang);
    }

    const suffix = params.toString();
    return suffix ? `${href}?${suffix}` : href;
  }

  return (
    <PlatformShell>
      <section className="space-y-6">
        <div className="rounded-[1.75rem] border border-zinc-200/80 bg-white/80 p-5 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/65">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                  {lang === "nb" ? "Signal Room annonsering" : "Signal Room Ads"}
                </p>
              </div>
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:justify-end">
                <Badge className="bg-orange-100 text-orange-700" variant="neutral">
                  {lang === "nb" ? "Manuell godkjenning kreves" : "Manual approval required"}
                </Badge>
                <Badge variant="neutral">{lang === "nb" ? "Konto fra hovednavigasjon" : "Account from main navigation"}</Badge>
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
                    {t(item.labelKey, item.fallback)}
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
