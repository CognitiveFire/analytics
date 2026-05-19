import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function ApprovalWorkflow() {
  return (
    <Card className="border-zinc-200/90 bg-[#ece9e1]">
      <CardTitle className="text-lg">Approval Workflow</CardTitle>
      <CardDescription className="mt-2">
        Execution remains human-supervised. Changes are never auto-applied from AI output.
      </CardDescription>

      <ol className="mt-4 space-y-2 text-sm text-zinc-700">
        <li>1. Review recommendation reasoning and deterministic evidence.</li>
        <li>2. Inspect execution preview and safety checks.</li>
        <li>3. Approve, reject, or edit changes before execution.</li>
        <li>4. Log approval decision and rollback metadata.</li>
      </ol>

      <div className="mt-5 flex gap-2">
        <Button size="sm">Approve</Button>
        <Button size="sm" variant="outline">Reject</Button>
      </div>
    </Card>
  );
}
