import { AdsShell } from "@/components/layout/ads-shell";

export default function AdsLayout({ children }: { children: React.ReactNode }) {
  return <AdsShell>{children}</AdsShell>;
}
