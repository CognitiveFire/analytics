import { ApprovalWorkflow } from "@/components/execution/approval-workflow";
import { ExecutionPreviewCard } from "@/components/execution/execution-preview-card";
import { buildExecutionPreview } from "@/lib/execution/execution-service";

export default async function AdsExecutionPage() {
  const preview = await buildExecutionPreview("rec-1");

  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <ExecutionPreviewCard preview={preview} />
      <ApprovalWorkflow />
    </div>
  );
}
