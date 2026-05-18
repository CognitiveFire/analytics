"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Building2, ClipboardCheck, FileText, Settings } from "lucide-react";

import { cn } from "@/lib/utils/cn";

const items = [
  { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
  { href: "/clients", label: "Clients", icon: Building2 },
  { href: "/reports", label: "Reports", icon: FileText },
  { href: "/tasks", label: "Tasks", icon: ClipboardCheck },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function PlatformNav() {
  const pathname = usePathname();

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
            href={item.href}
            key={item.href}
          >
            <Icon className="h-4 w-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
