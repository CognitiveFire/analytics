"use client";

import { Suspense } from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

import { ClientControls } from "@/components/layout/client-controls";
import { PlatformNav } from "@/components/layout/platform-nav";
import { Button } from "@/components/ui/button";

export function PlatformShell({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_10%_0%,rgba(226,232,240,0.8),transparent_45%),radial-gradient(circle_at_90%_10%,rgba(241,245,249,0.8),transparent_42%),#f8fafc] text-zinc-900">
      <header className="sticky top-0 z-30 border-b border-zinc-200/70 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-4 lg:px-10">
          <div className="flex items-center justify-between gap-4">
            <Link className="flex items-center gap-3" href="/">
              <div className="relative h-10 w-10 overflow-hidden rounded-2xl ring-1 ring-zinc-900/10">
                <Image alt="Apriil A" fill priority sizes="40px" src="/apriil-a-mark.svg" />
              </div>
              <div>
                <p className="font-semibold tracking-tight">Signal Room</p>
                <p className="text-xs text-zinc-500">Operasjonell innsikt fra Apriil</p>
              </div>
            </Link>

            <Button
              aria-label={mobileMenuOpen ? "Lukk meny" : "Åpne meny"}
              className="md:hidden"
              onClick={() => setMobileMenuOpen((open) => !open)}
              size="sm"
              variant="outline"
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>

          <div className="hidden md:block">
            <Suspense fallback={null}>
              <PlatformNav />
            </Suspense>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden">
              <Suspense fallback={null}>
                <PlatformNav />
              </Suspense>
            </div>
          )}

          <Suspense fallback={null}>
            <ClientControls />
          </Suspense>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-6 py-10 lg:px-10">{children}</main>
    </div>
  );
}
