import { ConnectorWizard } from "@/components/connectors/connector-wizard";
import { PlatformShell } from "@/components/layout/platform-shell";

export default function ConnectorSettingsPage() {
  return (
    <PlatformShell>
      <ConnectorWizard />
    </PlatformShell>
  );
}
