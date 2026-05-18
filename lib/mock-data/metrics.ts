import { KPI, TrendPoint } from "@/types";

export const executiveKpis: KPI[] = [
  { id: "spend", label: "Kostnad", value: "kr 1.24M", delta: 5.8, trend: "up" },
  { id: "roas", label: "ROAS", value: "4.9x", delta: -6.3, trend: "down" },
  { id: "cpa", label: "CPA", value: "kr 42.10", delta: 3.1, trend: "down" },
  { id: "conversion-quality", label: "Konverteringskvalitet", value: "79", delta: -4.6, trend: "down" },
  { id: "seo-visibility", label: "SEO-synlighet", value: "63.4", delta: 8.7, trend: "up" },
  { id: "lead-quality", label: "Lead-kvalitet", value: "74", delta: -3.4, trend: "down" },
  { id: "revenue-attribution", label: "Attribuert omsetning", value: "kr 3.89M", delta: 7.9, trend: "up" },
  { id: "opportunity-score", label: "Mulighetsscore", value: "86", delta: 5.1, trend: "up" },
];

export const trendHistory: TrendPoint[] = [
  { date: "Oct 2025", spend: 238, roas: 5.6, cpa: 36, seoVisibility: 54, conversionQuality: 84, attributedRevenue: 1120 },
  { date: "Nov 2025", spend: 244, roas: 5.4, cpa: 37, seoVisibility: 56, conversionQuality: 83, attributedRevenue: 1138 },
  { date: "Dec 2025", spend: 251, roas: 5.2, cpa: 39, seoVisibility: 58, conversionQuality: 82, attributedRevenue: 1163 },
  { date: "Jan 2026", spend: 259, roas: 5.1, cpa: 39, seoVisibility: 59, conversionQuality: 80, attributedRevenue: 1181 },
  { date: "Feb 2026", spend: 267, roas: 4.9, cpa: 41, seoVisibility: 61, conversionQuality: 79, attributedRevenue: 1202 },
  { date: "Mar 2026", spend: 274, roas: 4.8, cpa: 42, seoVisibility: 62, conversionQuality: 78, attributedRevenue: 1220 },
  { date: "Apr 2026", spend: 281, roas: 4.9, cpa: 42, seoVisibility: 63, conversionQuality: 79, attributedRevenue: 1264 },
  { date: "May 2026", spend: 289, roas: 4.9, cpa: 42, seoVisibility: 64, conversionQuality: 79, attributedRevenue: 1289 },
];
