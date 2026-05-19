"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { BarChart3, Building2, FileText, Search, Settings, Sparkles } from "lucide-react";

import { resolveAdsLanguage } from "@/lib/ads/ui-language";
import { cn } from "@/lib/utils/cn";

const items = [
  { href: "/dashboard", label: { nb: "Oversikt", en: "Overview" }, icon: BarChart3 },
  { href: "/ads/dashboard", label: { nb: "Ads", en: "Ads" }, icon: Sparkles },
  { href: "/seo", label: { nb: "SEO", en: "SEO" }, icon: Search },
  { href: "/clients", label: { nb: "Kunder", en: "Clients" }, icon: Building2 },
  { href: "/reports", label: { nb: "Rapporter", en: "Reports" }, icon: FileText },
  { href: "/settings", label: { nb: "Innstillinger", en: "Settings" }, icon: Settings },
];

export function PlatformNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lang = resolveAdsLanguage(searchParams.get("lang"));

  function buildHref(href: string) {
    if (lang !== "en") {
      return href;
    }

    return `${href}?lang=en`;
  }

  return (
    <nav className="flex flex-wrap items-center gap-2">
      {items.map((item) => {
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
            {item.label[lang]}
          </Link>
        );
      })}
    </nav>
  );
}
