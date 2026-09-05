"use client";

import { useState } from "react";
import { SectionFullBleed } from "@/components/sections/section-full-bleed";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

const PANELS = {
  "not-yet": {
    label: "Not yet",
    line: "Start with one job. AI is what makes it run without you.",
    body: [
      "Nothing needs replacing on day one. We look at the jobs that run on memory and paper, and pick the one costing you most time.",
      "Then we rebuild that one job as a system. AI sits inside it where it earns its place, and nowhere else.",
    ],
  },
  "yes": {
    label: "Yes, we have",
    line: "You bought the AI. Did anything change?",
    body: [
      "Plenty of businesses have bought a tool and cannot say what it changed. That is usually not a bad tool. It is a tool sitting next to a job instead of inside one.",
      "We look at what you already pay for, what it actually does, and what would need to be true for it to matter.",
    ],
  },
} as const;

type PanelKey = keyof typeof PANELS;

export function LevelRouter() {
  const [active, setActive] = useState<PanelKey>("not-yet");
  const keys = Object.keys(PANELS) as PanelKey[];

  const handleKeyDown = (e: React.KeyboardEvent, currentKey: PanelKey) => {
    const currentIndex = keys.indexOf(currentKey);
    if (e.key === "ArrowRight") {
      e.preventDefault();
      const nextKey = keys[(currentIndex + 1) % keys.length];
      setActive(nextKey);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      const prevKey = keys[(currentIndex - 1 + keys.length) % keys.length];
      setActive(prevKey);
    }
  };

  return (
    <SectionFullBleed tone="light" className="border-t border-[var(--color-pearl-line)]">
      <Reveal>
        <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-light leading-tight tracking-[-0.03em] max-w-[20ch] text-[var(--color-ink)]">
          Have you bought AI yet?
        </h2>
      </Reveal>

      <Reveal delay={0.1}>
        <div
          role="tablist"
          aria-label="Have you bought AI yet?"
          className="mt-10 flex flex-col sm:flex-row gap-4"
        >
          {keys.map((key) => {
            const isActive = key === active;
            return (
              <button
                key={key}
                role="tab"
                type="button"
                id={`tab-${key}`}
                aria-selected={isActive}
                aria-controls={`panel-${key}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActive(key)}
                onKeyDown={(e) => handleKeyDown(e, key)}
                className={cn(
                  "flex-1 flex flex-col justify-between text-left rounded-md border p-6 cursor-pointer",
                  "transition-all duration-200 active:scale-[0.985] outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold-deep)] focus-visible:ring-offset-2",
                  isActive
                    ? "border-[var(--color-gold-deep)] bg-[var(--color-sapphire)] text-[var(--color-pearl)] shadow-[0_4px_16px_-4px_rgba(11,17,30,0.2)]"
                    : "border-[var(--color-pearl-line)] bg-transparent text-[var(--color-ink)] hover:border-[var(--color-gold-deep)]/70 hover:bg-[var(--color-ink)]/[0.015]"
                )}
              >
                <div className="flex items-center justify-between w-full">
                  <span className={cn(
                    "text-xs uppercase tracking-[0.16em]",
                    isActive ? "text-[var(--color-gold)] opacity-100" : "opacity-60"
                  )}>
                    {PANELS[key].label}
                  </span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)] animate-pulse" />
                  )}
                </div>
                <span className="mt-3 block text-lg font-light leading-snug">
                  {PANELS[key].line}
                </span>
              </button>
            );
          })}
        </div>
      </Reveal>

      <div
        id={`panel-${active}`}
        role="tabpanel"
        aria-labelledby={`tab-${active}`}
        key={active}
        className="mt-10 min-h-[140px] md:min-h-[110px] max-w-[65ch] space-y-4 transition-opacity duration-200 ease-out animate-[fadeIn_200ms_ease-out]"
      >
        {PANELS[active].body.map((para) => (
          <p key={para} className="text-base md:text-lg font-normal leading-relaxed text-[var(--color-ink)]">
            {para}
          </p>
        ))}
      </div>
    </SectionFullBleed>
  );
}
