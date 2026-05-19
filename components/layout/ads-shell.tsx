"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Sparkles } from "lucide-react";

import { PlatformShell } from "@/components/layout/platform-shell";
import { Badge } from "@/components/ui/badge";
import { clients } from "@/lib/mock-data/clients";
import { cn } from "@/lib/utils/cn";

const navItems = [
  { href: "/ads/dashboard", label: "Dashboard" },
  { href: "/ads/recommendations", label: "Recommendations" },
  { href: "/ads/execution", label: "Execution" },
  { href: "/ads/campaigns", label: "Campaigns" },
  { href: "/ads/history", label: "History" },
  { href: "/ads/settings", label: "Settings" },
];

export function AdsShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedAccountId = searchParams.get("accountId") ?? "";

  function buildHref(href: string) {
    if (!selectedAccountId) {
      return href;
    }

    return `${href}?accountId=${encodeURIComponent(selectedAccountId)}`;
  }

  function onAccountChange(nextAccountId: string) {
    if (!nextAccountId) {
      router.push(pathname);
      return;
    }

    router.push(`${pathname}?accountId=${encodeURIComponent(nextAccountId)}`);
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
              <div className="flex items-center gap-3">
                <div className="rounded-full border border-zinc-300/80 bg-white px-3 py-1.5 dark:border-zinc-700 dark:bg-zinc-900">
                  <label className="mr-2 text-xs uppercase tracking-[0.16em] text-zinc-500" htmlFor="ads-account-filter">
                    Kunde
                  </label>
                  <select
                    className="bg-transparent text-sm text-zinc-700 outline-none dark:text-zinc-200"
                    id="ads-account-filter"
                    onChange={(event) => onAccountChange(event.target.value)}
                    value={selectedAccountId}
                  >
                    <option value="">Auto</option>
                    {clients.map((client) => (
                      <option key={client.id} value={client.id}>
                        {client.name}
                      </option>
                    ))}
                  </select>
                </div>
                <Badge className="bg-orange-100 text-orange-700" variant="neutral">
                  Manual Approval Required
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
                    {item.label}
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
