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

  return (
    <SectionFullBleed tone="light">
      <Reveal>
        <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-light leading-tight tracking-[-0.03em] max-w-[20ch]">
          Have you bought AI yet?
        </h2>
      </Reveal>

      <Reveal delay={0.1}>
        <div
          role="tablist"
          aria-label="Have you bought AI yet?"
          className="mt-10 flex flex-col sm:flex-row gap-3"
        >
          {(Object.keys(PANELS) as PanelKey[]).map((key) => {
            const isActive = key === active;
            return (
              <button
                key={key}
                role="tab"
                type="button"
                aria-selected={isActive}
                onClick={() => setActive(key)}
                className={cn(
                  "flex-1 text-left rounded-md border px-6 py-5 cursor-pointer",
                  "transition-colors duration-200 active:scale-[0.99]",
                  isActive
                    ? "border-[var(--color-gold-deep)] bg-[var(--color-sapphire)] text-[var(--color-pearl)]"
                    : "border-[var(--color-pearl-line)] bg-transparent text-[var(--color-ink)] hover:border-[var(--color-gold-deep)]"
                )}
              >
                <span className="block text-xs uppercase tracking-[0.16em] opacity-70">
                  {PANELS[key].label}
                </span>
                <span className="mt-2 block text-lg font-light leading-snug">
                  {PANELS[key].line}
                </span>
              </button>
            );
          })}
        </div>
      </Reveal>

      <div className="mt-10 max-w-[65ch] space-y-4">
        {PANELS[active].body.map((para) => (
          <p key={para} className="text-base md:text-lg font-light leading-relaxed text-[var(--color-ink)]/80">
            {para}
          </p>
        ))}
      </div>
    </SectionFullBleed>
  );
}
