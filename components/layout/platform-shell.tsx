import Link from "next/link";
import Image from "next/image";

import { ClientControls } from "@/components/layout/client-controls";
import { PlatformNav } from "@/components/layout/platform-nav";
import { ThemeToggle } from "@/components/layout/theme-toggle";

export function PlatformShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_10%_0%,rgba(226,232,240,0.8),transparent_45%),radial-gradient(circle_at_90%_10%,rgba(241,245,249,0.8),transparent_42%),#f8fafc] text-zinc-900 dark:bg-[radial-gradient(circle_at_10%_0%,rgba(39,39,42,0.6),transparent_42%),radial-gradient(circle_at_90%_0%,rgba(24,24,27,0.6),transparent_44%),#09090b] dark:text-zinc-100">
      <header className="sticky top-0 z-30 border-b border-zinc-200/70 bg-white/75 backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-950/70">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-4 lg:px-10">
          <div className="flex items-center justify-between gap-4">
            <Link className="flex items-center gap-3" href="/">
              <div className="relative h-10 w-10 overflow-hidden rounded-2xl ring-1 ring-zinc-900/10 dark:ring-zinc-100/10">
                <Image alt="Apriil A" fill priority sizes="40px" src="/apriil-a-mark.svg" />
              </div>
              <div>
                <p className="font-semibold tracking-tight">Signal Room</p>
                <p className="text-xs text-zinc-500">Operational intelligence by Apriil</p>
              </div>
            </Link>
            <ThemeToggle />
          </div>

          <PlatformNav />
          <ClientControls />
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-6 py-10 lg:px-10">{children}</main>
    </div>
  );
}
