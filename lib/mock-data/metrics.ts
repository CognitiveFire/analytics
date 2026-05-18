import { KPI, TrendPoint } from "@/types";

export const executiveKpis: KPI[] = [
  { id: "spend", label: "Spend", value: "$1.24M", delta: 5.8, trend: "up" },
  { id: "roas", label: "ROAS", value: "4.9x", delta: -6.3, trend: "down" },
  { id: "cpa", label: "CPA", value: "$42.10", delta: 3.1, trend: "down" },
  { id: "conversion-quality", label: "Conversion Quality", value: "79", delta: -4.6, trend: "down" },
  { id: "seo-visibility", label: "SEO Visibility", value: "63.4", delta: 8.7, trend: "up" },
  { id: "lead-quality", label: "Lead Quality", value: "74", delta: -3.4, trend: "down" },
  { id: "revenue-attribution", label: "Revenue Attribution", value: "$3.89M", delta: 7.9, trend: "up" },
  { id: "opportunity-score", label: "Opportunity Score", value: "86", delta: 5.1, trend: "up" },
];

export const trendHistory: TrendPoint[] = [
  { date: "Week 1", spend: 238, roas: 5.6, cpa: 36, seoVisibility: 54, conversionQuality: 84, attributedRevenue: 1120 },
  { date: "Week 2", spend: 244, roas: 5.4, cpa: 37, seoVisibility: 56, conversionQuality: 83, attributedRevenue: 1138 },
  { date: "Week 3", spend: 251, roas: 5.2, cpa: 39, seoVisibility: 58, conversionQuality: 82, attributedRevenue: 1163 },
  { date: "Week 4", spend: 259, roas: 5.1, cpa: 39, seoVisibility: 59, conversionQuality: 80, attributedRevenue: 1181 },
  { date: "Week 5", spend: 267, roas: 4.9, cpa: 41, seoVisibility: 61, conversionQuality: 79, attributedRevenue: 1202 },
  { date: "Week 6", spend: 274, roas: 4.8, cpa: 42, seoVisibility: 62, conversionQuality: 78, attributedRevenue: 1220 },
  { date: "Week 7", spend: 281, roas: 4.9, cpa: 42, seoVisibility: 63, conversionQuality: 79, attributedRevenue: 1264 },
  { date: "Week 8", spend: 289, roas: 4.9, cpa: 42, seoVisibility: 64, conversionQuality: 79, attributedRevenue: 1289 },
];
