import { PlatformShell } from "@/components/layout/platform-shell";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <PlatformShell>
      <div className="space-y-5">
        <Skeleton className="h-44 w-full" />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton className="h-36 w-full" key={index} />
          ))}
        </div>
      </div>
    </PlatformShell>
  );
}
