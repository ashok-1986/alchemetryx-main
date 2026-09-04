import React from "react";
import { cn } from "@/lib/utils";

interface SectionFullBleedProps extends React.HTMLAttributes<HTMLElement> {
  tone?: "dark" | "light" | "gold";
  as?: "section" | "div" | "header" | "footer";
  containerClassName?: string;
  noPadding?: boolean;
}

export function SectionFullBleed({
  tone = "light",
  as: Component = "section",
  className,
  containerClassName,
  noPadding = false,
  children,
  ...props
}: SectionFullBleedProps) {
  const toneClasses = {
    dark: "section-dark bg-[var(--color-sapphire)] text-[var(--color-pearl)]",
    light: "bg-[var(--color-pearl)] text-[var(--color-ink)]",
    gold: "section-gold bg-[var(--color-gold)] text-[var(--color-ink)]",
  }[tone];

  return (
    <Component
      className={cn(
        "w-full",
        toneClasses,
        !noPadding && "py-16 md:py-[120px]",
        className
      )}
      {...props}
    >
      <div className={cn("max-w-[1200px] mx-auto px-6 sm:px-8", containerClassName)}>
        {children}
      </div>
    </Component>
  );
}
