import { NextRequest, NextResponse } from "next/server";

/**
 * READ-ONLY MODE: This endpoint is permanently disabled.
 *
 * Signal Room is a data collection and intelligence platform that:
 * - Collects and analyzes Google Ads performance data
 * - Generates AI-powered recommendations
 * - Creates prioritized tasks for manual implementation
 *
 * It NEVER modifies Google Ads accounts or campaigns.
 * All recommendations are for manual review and implementation by account managers only.
 */
export async function POST(request: NextRequest) {
  const lang = request.nextUrl.searchParams.get("lang") || "en";

  const messages = {
    en: {
      error: "Execution is disabled",
      message:
        "Signal Room is a read-only intelligence platform. It collects and analyzes data but never modifies Google Ads accounts. All recommendations must be manually implemented by account managers.",
      details:
        "This system generates AI-powered recommendations and creates operational tasks for human review. No automated changes are ever made to your advertising platforms."
    },
    nb: {
      error: "Gjennomføring er deaktivert",
      message:
        "Signal Room er en intelligensplattform som bare leser. Den samler inn og analyserer data, men gjør aldri endringer på Google Ads-kontoer. Alle anbefalinger må implementeres manuelt av kontoadministratorer.",
      details:
        "Dette systemet genererer AI-drevne anbefalinger og opprett operasjonelle oppgaver for menneskelig gjennomgang. Ingen automatiserte endringer gjøres noensinne på dine reklame plattformer."
    }
  };

  const selectedLang = (lang === "nb" ? "nb" : "en") as keyof typeof messages;

  return NextResponse.json(
    {
      error: messages[selectedLang].error,
      message: messages[selectedLang].message,
      details: messages[selectedLang].details,
      status: "read-only"
    },
    { status: 403 }
  );
}
