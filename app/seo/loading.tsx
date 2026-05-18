import { PlatformShell } from "@/components/layout/platform-shell";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <PlatformShell>
      <div className="space-y-6">
        <Skeleton className="h-32 w-full rounded-[2rem]" />
        <div className="grid gap-4 xl:grid-cols-2">
          {Array.from({ length: 7 }).map((_, index) => (
            <Skeleton className="h-48 w-full rounded-[1.75rem]" key={index} />
          ))}
        </div>
      </div>
    </PlatformShell>
  );
}