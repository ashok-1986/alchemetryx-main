"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TocItem {
  id: string;
  label: string;
}

interface TocNavProps {
  items: TocItem[];
  className?: string;
  /** Offset from top of viewport for section detection (e.g., fixed header height) */
  offset?: number;
}

export function TocNav({ items, className, offset = 100 }: TocNavProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (!items.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: `-${offset}px 0px -${window.innerHeight - offset - 50}px 0px`,
        threshold: 0,
      }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items, offset]);

  return (
    <nav
      aria-label="Page sections"
      className={cn(
        "fixed right-6 top-1/2 -translate-y-1/2 flex flex-col items-end gap-4 z-40",
        "p-5 rounded-3xl bg-[var(--color-pearl)]/30 backdrop-blur-md border border-white/50 shadow-[4px_4px_10px_rgba(0,0,0,0.05),-4px_-4px_10px_rgba(255,255,255,0.6)]",
        className
      )}
    >
      {items.map((item) => {
        const isActive = activeId === item.id;
        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={cn(
              "flex items-center gap-3 group",
              "focus-visible:outline-none focus-visible:outline-2 focus-visible:outline-[var(--color-gold)] focus-visible:outline-offset-2"
            )}
            onClick={(e) => {
              e.preventDefault();
              const target = document.getElementById(item.id);
              if (target) {
                target.scrollIntoView({ behavior: "smooth", block: "start" });
                setActiveId(item.id);
              }
            }}
          >
            <span
              className={cn(
                "h-px shrink-0 transition-all duration-300 ease-out",
                isActive
                  ? "w-12 bg-[var(--color-ink)]"
                  : "w-6 bg-[var(--color-ink)]/30 group-hover:w-10 group-hover:bg-[var(--color-ink)]/60"
              )}
              aria-hidden="true"
            />
            <span
              className={cn(
                "text-xs font-normal uppercase tracking-[0.12em] whitespace-nowrap opacity-0 transition-opacity duration-200",
                isActive
                  ? "opacity-100 text-[var(--color-ink)]"
                  : "text-[var(--color-ink)]/70 group-hover:opacity-100 group-hover:text-[var(--color-ink)]"
              )}
            >
              {item.label}
            </span>
          </a>
        );
      })}
      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          .group-hover\:w-10,
          .group-hover\:w-12 {
            transition: none !important;
          }
        }
      `}</style>
    </nav>
  );
}