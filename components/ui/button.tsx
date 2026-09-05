import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-normal transition-colors focus-visible:outline-2 focus-visible:outline-[var(--color-gold)] focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.97] transition-transform duration-100 ease-out",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--color-gold)] text-[var(--color-ink)] hover:brightness-105 border border-transparent shadow-none font-normal",
        sapphire:
          "bg-[var(--color-sapphire)] text-[var(--color-pearl)] hover:bg-[var(--color-sapphire-raised)] border border-transparent shadow-none font-normal focus-visible:outline-[var(--color-sapphire)]",
        "outline-dark":
          "bg-transparent text-[var(--color-pearl)] border border-[var(--color-sapphire-line)] hover:bg-[var(--color-sapphire-raised)]",
        "outline-light":
          "bg-transparent text-[var(--color-ink)] border border-[var(--color-pearl-line)] hover:bg-[var(--color-pearl)]",
        ghost:
          "hover:bg-[var(--color-pearl)] text-[var(--color-ink)]",
        link:
          "text-[var(--color-gold-deep)] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 py-2 rounded-[6px]",
        sm: "h-9 rounded-[6px] px-4 text-xs",
        lg: "h-12 rounded-[6px] px-8 text-base",
        icon: "h-10 w-10 rounded-[6px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
