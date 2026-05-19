"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Zap, Brain, CheckSquare, Eye, Zap as Acquisition, FileText, Building2, Settings } from "lucide-react";

import { resolveAdsLanguage } from "@/lib/ads/ui-language";
import { cn } from "@/lib/utils/cn";
import { useTranslation } from "@/lib/translations/use-translation";

const navItems = [
  { href: "/overview", labelKey: "nav.overview", icon: Zap },
  { href: "/intelligence", labelKey: "nav.intelligence", icon: Brain },
  { href: "/priorities", labelKey: "nav.priorities", icon: CheckSquare },
  { href: "/visibility", labelKey: "nav.visibility", icon: Eye },
  { href: "/acquisition", labelKey: "nav.acquisition", icon: Acquisition },
  { href: "/reporting", labelKey: "nav.reporting", icon: FileText },
  { href: "/clients", labelKey: "nav.clients", icon: Building2 },
  { href: "/settings", labelKey: "nav.settings", icon: Settings },
];

export function PlatformNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lang = resolveAdsLanguage(searchParams.get("lang"));
  const { t } = useTranslation(lang);

  function buildHref(href: string) {
    if (lang !== "en") {
      return href;
    }

    return `${href}?lang=en`;
  }

  return (
    <nav className="flex flex-wrap items-center gap-2">
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = pathname.startsWith(item.href);

        return (
          <Link
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-colors",
              active
                ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                : "bg-transparent text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
            )}
            href={buildHref(item.href)}
            key={item.href}
          >
            <Icon className="h-4 w-4" />
            {t(item.labelKey, item.labelKey)}
          </Link>
        );
      })}
    </nav>
  );
}
