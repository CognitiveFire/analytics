import * as React from "react";

import { cn } from "@/lib/utils/cn";

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-zinc-200/70 bg-white/95 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/90",
        className
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return <h3 className={cn("font-medium tracking-tight text-zinc-900 dark:text-zinc-100", className)} {...props} />;
}

function CardDescription({ className, ...props }: React.ComponentProps<"p">) {
  return <p className={cn("text-sm leading-relaxed text-zinc-500 dark:text-zinc-400", className)} {...props} />;
}

export { Card, CardDescription, CardTitle };
