import { Suspense } from "react";

import { AdsShell } from "@/components/layout/ads-shell";

export default function AdsLayout({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<div className="mx-auto w-full max-w-7xl px-6 py-10 lg:px-10">{children}</div>}><AdsShell>{children}</AdsShell></Suspense>;
}
