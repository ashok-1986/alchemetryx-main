"use client";

import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SectionFullBleed } from "@/components/sections/section-full-bleed";
import { Reveal } from "@/components/motion/reveal";

const STEPS = [
  {
    step: "01",
    label: "Look",
    service: "The Diagnostic",
    body: "We work out what is actually happening. Which jobs run on memory, what they cost you in hours, and which one is worth changing first.",
  },
  {
    step: "02",
    label: "Decide",
    service: "The Build",
    body: "We rebuild that one job as a working system, inside the tools you already have where that makes sense. You see it running before it takes over.",
  },
  {
    step: "03",
    label: "Improve",
    service: "The Retainer",
    body: "We stay while it settles, fix what the real world breaks, and pick up the next job when you are ready. If there is nothing worth doing, we say so.",
  },
];

export function HowWeWork() {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!gridRef.current) return;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const cards = gridRef.current!.querySelectorAll<HTMLElement>(
        "[data-step-card]"
      );

      cards.forEach((card) => {
        const border = card.querySelector<HTMLElement>("[data-glow-border]");
        if (!border) return;

        let glowTween: gsap.core.Tween | null = null;

        card.addEventListener("mouseenter", () => {
          glowTween?.kill();
          glowTween = gsap.to(border, {
            opacity: 0.5,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        });

        card.addEventListener("mouseleave", () => {
          glowTween?.kill();
          gsap.to(border, { opacity: 0, duration: 0.4, ease: "power2.out" });
        });
      });
    });
  }, { scope: gridRef });

  return (
    <SectionFullBleed
      id="how-we-work"
      tone="light"
      className="border-t border-[var(--color-pearl-line)]"
    >
      <Reveal>
        <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold-deep)] mb-6">
          HOW WE WORK
        </p>
        <h2 className="text-[clamp(2.25rem,4.5vw,3.75rem)] font-light leading-[1.08] tracking-[-0.035em] text-[var(--color-ink)] max-w-[22ch]">
          Look. Decide. Improve.
        </h2>
        <p className="mt-6 max-w-[65ch] text-lg md:text-xl font-normal leading-relaxed text-[var(--color-ink)]">
          <strong className="font-normal text-[var(--color-ink)]">
            If a person is copying data between three tabs, a system should be
            doing it.
          </strong>{" "}
          We map the repetitive work that eats hours every week and engineer it
          out, without breaking what already works.
        </p>
      </Reveal>

      {/* Asymmetric bento grid */}
      <div
        ref={gridRef}
        className="mt-14 grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-5"
      >
        {/* Step 1: Look — spans 2 rows, left column */}
        <Reveal delay={0.08} className="md:row-span-2">
          <div
            data-step-card
            className="group relative h-full flex flex-col justify-between rounded-lg p-8 md:p-10 transition-all duration-300 ease-out hover:-translate-y-[2px] overflow-hidden backdrop-blur-[12px] bg-[var(--color-pearl)]/70 border border-white/20 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.08),0_4px_24px_-8px_rgba(17,25,43,0.06)]"
          >
            {/* Glass glow border — animated on hover */}
            <div
              data-glow-border
              className="absolute inset-0 rounded-lg border border-[var(--color-gold-deep)]/0 opacity-0 pointer-events-none transition-colors duration-300 group-hover:border-[var(--color-gold-deep)]/30"
              aria-hidden="true"
            />
            {/* Noise texture */}
            <div
              className="absolute inset-0 opacity-[0.015] pointer-events-none rounded-lg"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
              }}
              aria-hidden="true"
            />
            <div className="relative z-10">
              <div className="flex items-start justify-between">
                <p className="text-xs font-normal uppercase tracking-[0.16em] text-[var(--color-gold-deep)]">
                  {STEPS[0].step} / {STEPS[0].label}
                </p>
              </div>
              <h3 className="mt-6 text-2xl sm:text-3xl font-light text-[var(--color-ink)] tracking-[-0.02em]">
                {STEPS[0].service}
              </h3>
            </div>
            <p className="relative z-10 mt-8 text-base md:text-lg font-normal leading-relaxed text-[var(--color-ink)]/80">
              {STEPS[0].body}
            </p>
            {/* Large decorative step number */}
            <span
              className="absolute -bottom-6 -right-4 text-[80px] md:text-[120px] font-light leading-none text-[var(--color-gold-deep)]/[0.06] select-none pointer-events-none"
              aria-hidden="true"
            >
              {STEPS[0].step}
            </span>
          </div>
        </Reveal>

        {/* Step 3: Improve — top right */}
        <Reveal delay={0.2}>
          <div
            data-step-card
            className="group relative h-full flex flex-col justify-between rounded-lg p-8 transition-all duration-300 ease-out hover:-translate-y-[2px] overflow-hidden backdrop-blur-[12px] bg-gradient-to-br from-[var(--color-pearl)]/80 to-[var(--color-pearl)]/50 border border-white/15 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.06),0_4px_16px_-8px_rgba(17,25,43,0.04)]"
          >
            <div
              data-glow-border
              className="absolute inset-0 rounded-lg border border-[var(--color-gold-deep)]/0 opacity-0 pointer-events-none transition-colors duration-300 group-hover:border-[var(--color-gold-deep)]/30"
              aria-hidden="true"
            />
            <div
              className="absolute inset-0 opacity-[0.015] pointer-events-none rounded-lg"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
              }}
              aria-hidden="true"
            />
            <div className="relative z-10">
              <p className="text-xs font-normal uppercase tracking-[0.16em] text-[var(--color-gold-deep)]">
                {STEPS[2].step} / {STEPS[2].label}
              </p>
              <h3 className="mt-5 text-xl sm:text-2xl font-light text-[var(--color-ink)] tracking-[-0.02em]">
                {STEPS[2].service}
              </h3>
            </div>
            <p className="relative z-10 mt-5 text-base font-normal leading-relaxed text-[var(--color-ink)]/80">
              {STEPS[2].body}
            </p>
            <span
              className="absolute -bottom-4 -right-3 text-[60px] md:text-[80px] font-light leading-none text-[var(--color-gold-deep)]/[0.06] select-none pointer-events-none"
              aria-hidden="true"
            >
              {STEPS[2].step}
            </span>
          </div>
        </Reveal>

        {/* Step 2: Decide — bottom right */}
        <Reveal delay={0.3}>
          <div
            data-step-card
            className="group relative h-full flex flex-col justify-between rounded-lg p-8 transition-all duration-300 ease-out hover:-translate-y-[2px] overflow-hidden backdrop-blur-[12px] bg-[var(--color-pearl)]/70 border-l-[3px] border-l-[var(--color-gold-deep)]/40 border border-white/15 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.06),0_4px_16px_-8px_rgba(17,25,43,0.04)]"
          >
            <div
              data-glow-border
              className="absolute inset-0 rounded-lg border border-[var(--color-gold-deep)]/0 opacity-0 pointer-events-none transition-colors duration-300 group-hover:border-[var(--color-gold-deep)]/30"
              aria-hidden="true"
            />
            <div
              className="absolute inset-0 opacity-[0.015] pointer-events-none rounded-lg"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
              }}
              aria-hidden="true"
            />
            <div className="relative z-10">
              <p className="text-xs font-normal uppercase tracking-[0.16em] text-[var(--color-gold-deep)]">
                {STEPS[1].step} / {STEPS[1].label}
              </p>
              <h3 className="mt-5 text-xl sm:text-2xl font-light text-[var(--color-ink)] tracking-[-0.02em]">
                {STEPS[1].service}
              </h3>
            </div>
            <p className="relative z-10 mt-5 text-base font-normal leading-relaxed text-[var(--color-ink)]/80">
              {STEPS[1].body}
            </p>
            <span
              className="absolute -bottom-4 -right-3 text-[60px] md:text-[80px] font-light leading-none text-[var(--color-gold-deep)]/[0.06] select-none pointer-events-none"
              aria-hidden="true"
            >
              {STEPS[1].step}
            </span>
          </div>
        </Reveal>
      </div>

      {/* CTA ladder: Text link to CareRota */}
      <Reveal delay={0.35}>
        <div className="mt-12 md:mt-16 flex items-center">
          <Link
            href="/#proof"
            className="inline-flex items-center text-base sm:text-lg font-normal text-[var(--color-ink)] hover:text-[var(--color-gold-deep)] underline underline-offset-4 transition-colors cursor-pointer"
          >
            See it on a real one →
          </Link>
        </div>
      </Reveal>
    </SectionFullBleed>
  );
}
