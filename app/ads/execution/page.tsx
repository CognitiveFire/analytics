import { ApprovalWorkflow } from "@/components/execution/approval-workflow";
import { ExecutionPreviewCard } from "@/components/execution/execution-preview-card";
import { resolveAdsLanguage } from "@/lib/ads/ui-language";
import { buildExecutionPreview } from "@/lib/execution/execution-service";
import { isDemoAdsAccount, resolveAdsAccountId } from "@/lib/server/ads-active-account";
import { getTranslation } from "@/lib/translations/use-translation";

type AdsExecutionPageProps = {
  searchParams?: Promise<{ accountId?: string; lang?: string }>;
};

export default async function AdsExecutionPage({ searchParams }: AdsExecutionPageProps) {
  const params = await searchParams;
  const accountId = await resolveAdsAccountId(params?.accountId);
  const lang = resolveAdsLanguage(params?.lang);
  const t = (key: string, fallback?: string) => getTranslation(lang, key, fallback);

  if (!isDemoAdsAccount(accountId)) {
    return (
      <div className="grid gap-6 xl:grid-cols-2">
        <ExecutionPreviewCard
          lang={lang}
          preview={{
            recommendationId: "none",
            summary: t("ads.executionNoPreview", "No execution preview is available for this client yet."),
            changes: [],
            safetyChecks: [t("ads.executionNoChanges", "No changes available")],
            requiresManualApproval: true,
          }}
        />
        <ApprovalWorkflow lang={lang} />
      </div>
    );
  }

  const preview = await buildExecutionPreview("rec-1", lang);

  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <ExecutionPreviewCard lang={lang} preview={preview} />
      <ApprovalWorkflow lang={lang} />
    </div>
  );
}
