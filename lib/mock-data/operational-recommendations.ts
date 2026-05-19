import { OperationalRecommendation, DataSource, RecommendationChannel } from "@/types";

export function getDemoOperationalRecommendations(): OperationalRecommendation[] {
  return [
    {
      id: "rec-001",
      title: "Improve Commercial Intent Capture in Organic Search",
      businessProblem: "High-volume, low-intent organic traffic is consuming crawl budget and ranking real estate without contributing to revenue.",
      strategicExplanation:
        "Search demand analysis shows 40% of organic impressions target informational queries, but only 12% convert to qualified leads. Consolidating content and improving internal linking hierarchy can redirect crawl budget toward commercial intent pages.",
      connectedSystems: ["searchConsole", "ga4", "bigQuery"],
      businessImpact: "Estimated 25-30% improvement in organic lead generation; reduce content maintenance burden by 15%.",
      complexity: "medium",
      confidenceScore: 87,
      affectedChannels: ["organic", "conversion"],
      expectedOutcome:
        "Consolidated content structure targeting commercial keywords; improved Click-Through Rate (CTR) on high-intent queries; increased qualified lead volume from organic channel.",
      implementationTracking: {
        startDate: "2026-05-15",
        progressPercent: 0,
      },
      priority: "high",
      owner: "Content Strategy",
      createdDate: "2026-05-12",
    },
    {
      id: "rec-002",
      title: "Reduce Low-Intent Paid Acquisition Spend",
      businessProblem:
        "Broad match campaigns are capturing low-intent queries at high cost-per-acquisition (CPA), reducing overall return on ad spend (ROAS).",
      strategicExplanation:
        "Paid channel analysis indicates 35% of conversions come from broad match terms with CPA 2.3x higher than exact match equivalents. Implementing negative keyword strategy and shifting budget toward high-intent search terms will improve efficiency without losing volume.",
      connectedSystems: ["googleAds", "ga4", "bigQuery"],
      businessImpact: "Expected 18-22% ROAS improvement; reduce wasted spend by ~$12K per month.",
      complexity: "low",
      confidenceScore: 92,
      affectedChannels: ["paid", "conversion"],
      expectedOutcome:
        "Tighter keyword targeting; improved CPA by 20-25%; shift in budget allocation from broad to exact-match strategies; maintained conversion volume with reduced spend.",
      implementationTracking: {
        startDate: "2026-05-10",
        progressPercent: 35,
      },
      priority: "critical",
      owner: "PPC Management",
      createdDate: "2026-05-08",
    },
    {
      id: "rec-003",
      title: "Strengthen Landing Page Conversion Quality",
      businessProblem:
        "Mobile conversion rate has declined 14% over the past 8 weeks; checkout abandonment on mobile is 35% vs. 18% on desktop.",
      strategicExplanation:
        "Cross-channel analysis reveals that both organic and paid traffic conversion quality is degrading on mobile experiences. Form friction, image optimization, and load-time improvements are critical conversion blockers. Fixing mobile UX will unlock ~8K additional monthly conversions.",
      connectedSystems: ["ga4", "bigQuery", "crm"],
      businessImpact: "Estimated 12-15% improvement in overall conversion rate; ~8K additional monthly conversions; improved user experience signals for organic ranking.",
      complexity: "medium",
      confidenceScore: 89,
      affectedChannels: ["conversion", "organic", "paid"],
      expectedOutcome:
        "Mobile-first form optimization; improved Core Web Vitals; reduced checkout abandonment from 35% to <20%; improved organic signals and paid conversion efficiency.",
      implementationTracking: {
        startDate: "2026-05-18",
        progressPercent: 0,
      },
      priority: "critical",
      owner: "Product & UX",
      createdDate: "2026-05-15",
    },
    {
      id: "rec-004",
      title: "Improve Attribution Confidence in Multi-Touch Journey",
      businessProblem:
        "Current last-click attribution model is undervaluing organic and landing page performance, leading to misallocated budget and inaccurate ROI calculations.",
      strategicExplanation:
        "Data integrity analysis shows that organic search and landing pages play critical first-touch and consideration roles, but receive <15% of attributed value. Implementing data-driven attribution model will improve budget allocation accuracy and reveal true channel contribution to revenue.",
      connectedSystems: ["ga4", "bigQuery", "crm", "googleAds"],
      businessImpact:
        "Improved budget allocation accuracy; 18-25% better visibility into true channel contribution; reduced attribution blind spots affecting 40% of conversions.",
      complexity: "high",
      confidenceScore: 78,
      affectedChannels: ["attribution", "organic", "paid", "conversion"],
      expectedOutcome:
        "Data-driven attribution model implemented; improved visibility into multi-touch journey; more accurate ROI reporting; better-informed budget allocation decisions.",
      implementationTracking: {
        progressPercent: 0,
      },
      priority: "high",
      owner: "Analytics",
      createdDate: "2026-05-12",
    },
    {
      id: "rec-005",
      title: "Optimize Internal Linking for Search Visibility",
      businessProblem:
        "Mid-tier commercial pages (product category pages, comparison pages) are receiving insufficient internal link equity, limiting their ranking potential for high-value queries.",
      strategicExplanation:
        "Technical SEO audit and crawl analysis identify 28 high-opportunity commercial pages with link depth >4 levels. Implementing strategic internal linking from high-authority pages to these mid-tier pages will improve crawlability and ranking potential. Combined with content consolidation, this will unlock 15-20% visibility improvement.",
      connectedSystems: ["searchConsole", "ga4"],
      businessImpact: "Estimated 15-20% increase in organic visibility for mid-tier commercial keywords; improve crawl efficiency by 12%.",
      complexity: "medium",
      confidenceScore: 84,
      affectedChannels: ["organic"],
      expectedOutcome:
        "Improved internal link distribution; reduced link depth for commercial pages; improved ranking for target mid-tier keywords; enhanced crawl efficiency.",
      implementationTracking: {
        progressPercent: 0,
      },
      priority: "medium",
      owner: "Technical SEO",
      createdDate: "2026-05-14",
    },
  ];
}

export function getDemoCompletedRecommendations(): OperationalRecommendation[] {
  return [
    {
      id: "rec-completed-001",
      title: "Reduce Duplicate Content and Consolidate Thin Content Pages",
      businessProblem: "301 thin/duplicate content pages consuming crawl budget without ranking intent.",
      strategicExplanation: "Identified and consolidated 301 pages with duplicate meta descriptions, thin content, and low search volume.",
      connectedSystems: ["searchConsole"],
      businessImpact: "Improved crawl efficiency by 18%; consolidated ranking signals.",
      complexity: "low",
      confidenceScore: 95,
      affectedChannels: ["organic"],
      expectedOutcome: "Consolidated 301 thin pages; improved crawl efficiency and ranking consolidation.",
      implementationTracking: {
        startDate: "2026-03-01",
        completionDate: "2026-04-15",
        progressPercent: 100,
      },
      priority: "high",
      owner: "Technical SEO",
      createdDate: "2026-02-28",
    },
    {
      id: "rec-completed-002",
      title: "Implement Negative Keywords for Brand Protection",
      businessProblem: "Non-branded paid campaigns bidding on branded keywords at high CPA.",
      strategicExplanation: "Added 450 negative keywords to reduce brand-term waste and improve non-branded ROAS.",
      connectedSystems: ["googleAds"],
      businessImpact: "Reduced CPA on non-branded campaigns by 22%; improved overall ROAS by 8%.",
      complexity: "low",
      confidenceScore: 98,
      affectedChannels: ["paid"],
      expectedOutcome: "Reduced brand-keyword waste; improved non-branded campaign efficiency.",
      implementationTracking: {
        startDate: "2026-04-01",
        completionDate: "2026-04-30",
        progressPercent: 100,
      },
      priority: "high",
      owner: "PPC Management",
      createdDate: "2026-03-25",
    },
  ];
}

export function getDemoOperationalAlerts(): Array<{
  type: "risk" | "opportunity" | "alert";
  title: string;
  description: string;
  severity: "critical" | "high" | "medium" | "low";
  affectedChannels: RecommendationChannel[];
  dataSources: DataSource[];
}> {
  return [
    {
      type: "risk",
      title: "Mobile Conversion Quality Declining",
      description:
        "Mobile conversion rate has dropped 14% over 8 weeks. Mobile checkout abandonment at 35% vs. desktop at 18%.",
      severity: "critical",
      affectedChannels: ["conversion"],
      dataSources: ["ga4"],
    },
    {
      type: "opportunity",
      title: "Organic Visibility Opportunity in Commercial Keywords",
      description:
        "40 mid-tier commercial keywords have ranking positions 5-10 with strong search volume. Content and internal linking improvements could unlock 12-15% visibility increase.",
      severity: "high",
      affectedChannels: ["organic"],
      dataSources: ["searchConsole", "ga4"],
    },
    {
      type: "alert",
      title: "Attribution Model Not Capturing True Channel Value",
      description:
        "Last-click attribution undervalues organic first-touch by 65% and landing page consideration role by 48%. Data-driven attribution model recommended.",
      severity: "high",
      affectedChannels: ["attribution"],
      dataSources: ["ga4", "bigQuery"],
    },
    {
      type: "risk",
      title: "Paid Acquisition Efficiency Below Benchmark",
      description:
        "Broad match campaigns operating at CPA 2.3x above exact match. Estimated $12K/month in optimization opportunity through keyword refinement.",
      severity: "critical",
      affectedChannels: ["paid"],
      dataSources: ["googleAds", "ga4"],
    },
  ];
}

export function getDemoOperationalMetrics() {
  return {
    organicVisibility: {
      currentScore: 68,
      previousScore: 72,
      trend: "down",
      keyMetric: "Search visibility decline due to algorithm updates and increased competition",
      opportunity: "15-20% recovery potential through content consolidation and internal linking optimization",
    },
    paidEfficiency: {
      currentRoas: 3.2,
      previousRoas: 3.8,
      trend: "down",
      keyMetric: "ROAS decline driven by broad match inefficiency",
      opportunity: "18-22% improvement potential through negative keywords and tighter targeting",
    },
    conversionQuality: {
      currentRate: 2.1,
      previousRate: 2.45,
      trend: "down",
      keyMetric: "Mobile conversion decline of 14% over 8 weeks",
      opportunity: "12-15% improvement through mobile UX optimization",
    },
    attributionConfidence: {
      currentScore: 62,
      previousScore: 64,
      trend: "down",
      keyMetric: "Multi-touch attribution model identifies blind spots in 40% of conversions",
      opportunity: "Implement data-driven attribution for 18-25% better accuracy",
    },
  };
}
