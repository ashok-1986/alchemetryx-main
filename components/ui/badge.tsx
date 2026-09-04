import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-[6px] border px-2.5 py-0.5 text-xs font-normal transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-[var(--color-pearl-line)] bg-[var(--color-pearl)] text-[var(--color-ink)]",
        sapphire:
          "border-[var(--color-sapphire-line)] bg-[var(--color-sapphire-raised)] text-[var(--color-pearl)]",
        gold:
          "border-[var(--color-gold-deep)] bg-[var(--color-gold)] text-[var(--color-ink)]",
        outline:
          "border-[var(--color-pearl-line)] text-[var(--color-ink)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
