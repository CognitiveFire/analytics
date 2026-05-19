import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/ads/dashboard", label: "Dashboard" },
  { href: "/ads/recommendations", label: "Recommendations" },
  { href: "/ads/execution", label: "Execution" },
  { href: "/ads/campaigns", label: "Campaigns" },
  { href: "/ads/history", label: "History" },
  { href: "/ads/settings", label: "Settings" },
];

export function AdsShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f4f2ec] text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <header className="sticky top-0 z-30 border-b border-zinc-200/80 bg-[#f4f2ec]/95 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/90">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-6 py-5 lg:px-10">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="flex items-center gap-1.5 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
              >
                <ArrowLeft className="h-4 w-4" />
                Signal Room
              </Link>
              <div className="h-5 w-px bg-zinc-300 dark:bg-zinc-700" />
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Signal Room Ads</p>
                <h1 className="text-xl font-semibold tracking-tight">GPT-powered Operational Intelligence</h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-orange-100 text-orange-700" variant="neutral">
                Manual Approval Required
              </Badge>
              <Button size="sm" variant="outline">No Auto-Execute</Button>
            </div>
          </div>

          <nav className="flex flex-wrap gap-2">
            {navItems.map((item) => (
              <Link
                className="rounded-full border border-zinc-300/80 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:border-orange-300 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-6 py-10 lg:px-10">{children}</main>
    </div>
  );
}
