"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { COMPANY } from "@/lib/constants";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "The Problem", href: "/#problem" },
  { label: "How We Work", href: "/#how-we-work" },
  { label: "Proof", href: "/proof" },
  { label: "About", href: "/about" },
];

export function Nav() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const activeIndex = hoveredIndex ?? focusedIndex;

  return (
    <header className="sticky top-0 z-50 w-full bg-[var(--color-sapphire)]/80 backdrop-blur-[24px] supports-[backdrop-filter]:bg-[var(--color-sapphire)]/75 border-b border-[var(--color-sapphire-line)]/60 transition-colors duration-200">
      <div className="w-full max-w-[1440px] mx-auto px-[10px] h-16 flex items-center justify-between gap-6">
        <Link
          href="/"
          className="text-xl font-light tracking-[-0.04em] text-[var(--color-pearl)] hover:opacity-90 transition-all duration-150 cursor-pointer shrink-0"
        >
          {COMPANY.name}
        </Link>

        <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-4">
          {NAV_ITEMS.map((item, index) => (
            <div
              key={item.label}
              className="relative group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onFocus={() => setFocusedIndex(index)}
              onBlur={() => setFocusedIndex(null)}
            >
              <Link
                href={item.href}
                className="flex items-center gap-2 px-2 py-3 transition-colors duration-150 cursor-pointer"
              >
                <span
                  className={cn(
                    "h-[1px] w-8 bg-[var(--color-sapphire-line)] transition-all duration-300 ease-out origin-left",
                    activeIndex === index && "w-32 bg-[var(--color-gold)]"
                  )}
                  aria-hidden="true"
                />
                <span
                  className={cn(
                    "text-sm font-light text-transparent transition-all duration-300 ease-out whitespace-nowrap",
                    activeIndex === index && "text-[var(--color-pearl)]"
                  )}
                >
                  {item.label}
                </span>
              </Link>
            </div>
          ))}
        </nav>

        <div className="shrink-0">
          <Button asChild variant="primary" size="sm">
            <Link href={COMPANY.primaryCtaHref}>{COMPANY.primaryCtaLabel}</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}