"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
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
    cta: "See what starting with one job looked like →",
    href: "/#proof",
  },
  "yes": {
    label: "Yes, we have",
    line: "You bought the AI. Did anything change?",
    body: [
      "Plenty of businesses have bought a tool and cannot say what it changed. That is usually not a bad tool. It is a tool sitting next to a job instead of inside one.",
      "We look at what you already pay for, what it actually does, and what would need to be true for it to matter.",
    ],
    cta: "See what we look at first →",
    href: "/#how-we-work",
  },
} as const;

type PanelKey = keyof typeof PANELS;

export function LevelRouter() {
  const [active, setActive] = useState<PanelKey>("not-yet");
  const keys = Object.keys(PANELS) as PanelKey[];
  const dotRef = useRef<HTMLSpanElement>(null);
  const dotTweenRef = useRef<gsap.core.Tween | null>(null);

  useGSAP(() => {
    if (!dotRef.current) return;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      dotTweenRef.current?.kill();
      dotTweenRef.current = gsap.to(dotRef.current!, {
        scale: 1.4,
        opacity: 0.5,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });
  });

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
    <SectionFullBleed
      id="diagnostic"
      tone="dark"
      fullHeight={false}
      className="border-t border-[var(--color-sapphire-line)] py-20 md:py-28"
    >
      <Reveal>
        <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-light leading-tight tracking-[-0.03em] max-w-[20ch] text-[var(--color-pearl)]">
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
                  "flex-1 flex flex-col justify-between text-left rounded-lg p-6 cursor-pointer",
                  "transition-all duration-300 active:scale-[0.97] outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold-deep)] focus-visible:ring-offset-2",
                  isActive
                    ? "backdrop-blur-[12px] bg-[var(--color-sapphire-raised)]/50 border border-[var(--color-gold-deep)]/60 text-[var(--color-pearl)] shadow-[0_4px_24px_-4px_rgba(11,17,30,0.25),inset_0_1px_1px_0_rgba(255,255,255,0.04)]"
                    : "backdrop-blur-[8px] bg-[var(--color-sapphire-raised)]/20 border border-[var(--color-sapphire-line)]/40 text-[var(--color-pearl)] hover:border-[var(--color-gold-deep)]/50 hover:bg-[var(--color-sapphire-raised)]/35"
                )}
              >
                <div className="flex items-center justify-between w-full">
                  <span
                    className={cn(
                      "text-xs uppercase tracking-[0.16em]",
                      isActive
                        ? "text-[var(--color-gold)] opacity-100"
                        : "opacity-60"
                    )}
                  >
                    {PANELS[key].label}
                  </span>
                  {isActive && (
                    <span
                      ref={dotRef}
                      className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)]"
                    />
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
        className="mt-10 min-h-[140px] md:min-h-[110px] max-w-[65ch] space-y-4 transition-opacity duration-200 ease-out animate-[fade-in_200ms_ease-out]"
      >
        {PANELS[active].body.map((para) => (
          <p
            key={para}
            className="text-base md:text-lg font-normal leading-relaxed text-[var(--color-pearl)]/85"
          >
            {para}
          </p>
        ))}
        <div className="pt-3">
          <Link
            href={PANELS[active].href}
            className="inline-flex items-center text-base font-normal text-[var(--color-gold)] hover:text-[var(--color-pearl)] underline underline-offset-4 transition-colors cursor-pointer"
          >
            {PANELS[active].cta}
          </Link>
        </div>
      </div>
    </SectionFullBleed>
  );
}
