import { ExecutionPreview } from "@/types/ads";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

export function ExecutionPreviewCard({ preview }: { preview: ExecutionPreview }) {
  return (
    <Card className="border-zinc-200/90 bg-[#f2f0ea]">
      <CardTitle className="text-lg">Execution Preview</CardTitle>
      <CardDescription className="mt-2">{preview.summary}</CardDescription>

      <div className="mt-5 space-y-2 text-sm">
        {preview.changes.map((change) => (
          <div className="rounded-xl border border-zinc-200 bg-white/70 px-3 py-2" key={`${change.type}-${change.entityId}`}>
            <p className="font-semibold text-zinc-800">{change.type}</p>
            <p className="text-zinc-600">Entity: {change.entityId}</p>
          </div>
        ))}
      </div>

      <ul className="mt-5 space-y-2 text-xs text-zinc-600">
        {preview.safetyChecks.map((check) => (
          <li key={check}>- {check}</li>
        ))}
      </ul>
    </Card>
  );
}
