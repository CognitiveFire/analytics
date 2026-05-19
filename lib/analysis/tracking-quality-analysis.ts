import { AdsConversionSummary, AnalysisFinding } from "@/types/ads";

export function runTrackingQualityAnalysis(conversions: AdsConversionSummary): AnalysisFinding[] {
  const findings: AnalysisFinding[] = [];

  if (conversions.duplicateConversionRate > 0.12) {
    findings.push({
      id: "tracking-duplicate-signals",
      type: "tracking",
      title: "Duplicate conversion signals detected",
      description: "Conversion event duplication is inflating optimization signals and reporting consistency risk.",
      likelyCause: "Parallel conversion actions and duplicate tag triggers on lead confirmation flows.",
      impact: "high",
      confidence: 0.88,
      affectedCampaignIds: [],
      deterministicSignals: [
        `duplicateConversionRate=${conversions.duplicateConversionRate.toFixed(2)}`,
        `conversionCount30d=${conversions.conversionCount30d}`,
      ],
    });
  }

  if (conversions.offlineImportCoverage < 0.6) {
    findings.push({
      id: "tracking-offline-import-gap",
      type: "tracking",
      title: "Offline conversion import coverage is weak",
      description: "Campaign optimization relies heavily on low-intent front-end events.",
      likelyCause: "Insufficient CRM-to-Google Ads upload cadence and incomplete mapping for qualified outcomes.",
      impact: "high",
      confidence: 0.83,
      affectedCampaignIds: [],
      deterministicSignals: [`offlineImportCoverage=${conversions.offlineImportCoverage.toFixed(2)}`],
    });
  }

  return findings;
}
