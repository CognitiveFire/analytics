import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils/cn";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium tracking-wide",
  {
    variants: {
      variant: {
        neutral: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200",
        success: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300",
        warning: "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300",
        danger: "bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  }
);

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
