import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="min-h-screen bg-[#f7f5f0] px-6 py-8 dark:bg-zinc-950 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-6">
        <Skeleton className="h-32 w-full rounded-[2rem]" />
        <div className="grid gap-4 xl:grid-cols-2">
          {Array.from({ length: 7 }).map((_, index) => (
            <Skeleton className="h-48 w-full rounded-[1.75rem]" key={index} />
          ))}
        </div>
      </div>
    </main>
  );
}