import React from "react";
import { cn } from "@/lib/utils";

interface SectionFullBleedProps extends React.HTMLAttributes<HTMLElement> {
  tone?: "dark" | "light" | "gold";
  as?: "section" | "div" | "header" | "footer";
  containerClassName?: string;
  noPadding?: boolean;
  /** Set false for a section that should hug its content instead of filling the viewport. */
  fullHeight?: boolean;
}

/**
 * Canvas rules, set in one place:
 *   min-height 100svh  — fills at least the viewport, grows when content needs more
 *   width      100%    — edge-to-edge
 *   padding    1em to 2em — fluid edge padding
 */
export function SectionFullBleed({
  tone = "light",
  as: Component = "section",
  className,
  containerClassName,
  noPadding = false,
  fullHeight = true,
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
        "w-full flex flex-col justify-center",
        fullHeight && "min-h-[100svh]",
        toneClasses,
        !noPadding && "py-16 md:py-24 lg:py-28",
        className
      )}
      {...props}
    >
      <div className={cn("w-full px-[1em] lg:px-[2em]", containerClassName)}>
        {children}
      </div>
    </Component>
  );
}
