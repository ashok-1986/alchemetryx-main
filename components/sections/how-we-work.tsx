"use client";

import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SectionFullBleed } from "@/components/sections/section-full-bleed";
import { Reveal } from "@/components/motion/reveal";
import { ArrowRight, Search, Brain, TrendingUp } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STEPS: Array<{
  step: string;
  label: string;
  service: string;
  icon: "search" | "brain" | "trendingUp";
  body: string;
}> = [
  {
    step: "01",
    label: "Look",
    service: "The Diagnostic",
    icon: "search",
    body: "We work out what is actually happening. Which jobs run on memory, what they cost you in hours, and which one is worth changing first.",
  },
  {
    step: "02",
    label: "Decide",
    service: "The Build",
    icon: "brain",
    body: "We rebuild that one job as a working system, inside the tools you already have where that makes sense. You see it running before it takes over.",
  },
  {
    step: "03",
    label: "Improve",
    service: "The Retainer",
    icon: "trendingUp",
    body: "We stay while it settles, fix what the real world breaks, and pick up the next job when you are ready. If there is nothing worth doing, we say so.",
  },
];

const ICON_MAP = {
  search: Search,
  brain: Brain,
  trendingUp: TrendingUp,
} as const;

function StepIcon({ name }: { name: keyof typeof ICON_MAP }) {
  const IconComponent = ICON_MAP[name];
  return <IconComponent className="w-5 h-5" strokeWidth={1.5} aria-hidden="true" />;
}

export function HowWeWork() {
  const railRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!railRef.current) return;
    const mm = gsap.matchMedia();

    // One authored motion moment, desktop only: the connecting thread draws
    // left-to-right, then the three steps step in as an ordered sequence.
    // Under prefers-reduced-motion (or on mobile) the content stays visible
    // and static — the timeline is never created.
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const gf = gsap.utils.selector(railRef);
      const thread = gf("[data-thread-path]")[0] as unknown as SVGPathElement | undefined;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: railRef.current,
          start: "top 82%",
          toggleActions: "play none none none",
          once: true,
        },
        defaults: { ease: "power2.out" },
      });

      // Draw the SVG map-thread (geometry, not a picture).
      if (thread) {
        const length = thread.getTotalLength();
        gsap.set(thread, { strokeDasharray: length, strokeDashoffset: length });
        tl.to(thread, { strokeDashoffset: 0, duration: 1.0, ease: "expo.out" }, 0);
      }

      // Ordered sequence: index chip, then card head, then body.
      tl.from(gf("[data-step-index]"), {
        opacity: 0,
        y: 10,
        duration: 0.35,
        stagger: { each: 0.14, from: "start" },
      }, 0.15)
        .from(gf("[data-step-card-head]"), {
          y: 16,
          duration: 0.5,
          stagger: { each: 0.14, from: "start" },
        }, 0.3)
        .from(gf("[data-step-body]"), {
          opacity: 0,
          y: 12,
          duration: 0.4,
          stagger: { each: 0.14, from: "start" },
        }, 0.55)
        .from(gf("[data-look-badge]"), {
          opacity: 0,
          y: 8,
          duration: 0.4,
        }, 0.85);
    });
  }, { scope: railRef });

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

      {/* Bento: Sapphire hero card (left, tall) + two Pearl cards (right rail) */}
      <div
        ref={railRef}
        className="relative mt-14 grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-5"
      >
        {/* Connecting thread — the authored geometry moment */}
        <svg
          className="hidden md:block absolute inset-0 w-full h-full text-[var(--color-gold-deep)]/35 pointer-events-none"
          viewBox="0 0 1200 800"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            data-thread-path
            d="M 780 130 C 900 130, 980 150, 1050 190"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>

        {/* Step 1 — The Diagnostic: Sapphire hero, spans both rail rows */}
        <div className="md:row-span-2 relative">
          <div
            className="group relative h-full flex flex-col justify-between overflow-hidden rounded-lg p-8 md:p-10 text-[var(--color-pearl)] bg-[var(--color-sapphire)] border border-[var(--color-sapphire-line)]/60 transition-all duration-300 ease-out motion-safe:hover:-translate-y-[2px]"
          >
            <div className="relative z-10" data-step-card-head>
              <div data-step-index className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="grid place-items-center shrink-0 w-6 h-6 rounded-full text-[11px] leading-none text-[var(--color-ink)] bg-[var(--color-gold)]"
                >
                  {STEPS[0].step}
                </span>
                <span className="grid place-items-center w-9 h-9 rounded-full border border-[var(--color-pearl)]/25 text-[var(--color-gold)]">
                  <StepIcon name={STEPS[0].icon} />
                </span>
                <p className="text-xs font-normal uppercase tracking-[0.16em] text-[var(--color-pearl)]/70">
                  {STEPS[0].label}
                </p>
              </div>
              <h3 className="mt-7 text-2xl sm:text-3xl md:text-4xl font-light text-[var(--color-pearl)] tracking-[-0.02em]">
                {STEPS[0].service}
              </h3>
            </div>
            <p
              data-step-body
              className="relative z-10 mt-8 max-w-[42ch] text-base md:text-lg font-normal leading-relaxed text-[var(--color-pearl)]/80"
            >
              {STEPS[0].body}
            </p>
            <div
              data-look-badge
              className="hidden md:inline-flex items-center gap-3 self-start mt-10 text-xs uppercase tracking-[0.18em] text-[var(--color-gold)]"
            >
              <span className="inline-block w-6 h-px bg-[var(--color-gold)]/60" aria-hidden="true" />
              Where it starts
            </div>
          </div>
        </div>

        {/* Step 2 — Decide / The Build: top-right rail */}
        <div className="md:col-start-2 md:row-start-1">
          <div className="group relative h-full flex flex-col justify-between overflow-hidden rounded-lg p-7 md:p-8 text-[var(--color-ink)] bg-[var(--color-pearl)] border border-[var(--color-pearl-line)] transition-all duration-300 ease-out motion-safe:hover:-translate-y-[2px]">
            <div className="relative z-10" data-step-card-head>
            <div data-step-index className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="grid place-items-center shrink-0 w-6 h-6 rounded-full text-[11px] leading-none text-[var(--color-pearl)] bg-[var(--color-gold-deep)]"
              >
                {STEPS[1].step}
              </span>
              <span className="grid place-items-center w-9 h-9 rounded-full border border-[var(--color-pearl-line)] text-[var(--color-gold-deep)]">
                <StepIcon name={STEPS[1].icon} />
              </span>
              <p className="text-xs font-normal uppercase tracking-[0.16em] text-[var(--color-gold-deep)]">
                {STEPS[1].label}
              </p>
            </div>
            <h3 className="mt-6 text-xl sm:text-2xl font-light tracking-[-0.02em] text-[var(--color-ink)]">
              {STEPS[1].service}
            </h3>
            </div>
            <p
              data-step-body
              className="relative z-10 mt-4 text-base font-normal leading-relaxed text-[var(--color-ink)]/80"
            >
              {STEPS[1].body}
            </p>
          </div>
        </div>

        {/* Step 3 — Improve: bottom-right rail */}
        <div className="md:col-start-2 md:row-start-2">
          <div className="group relative h-full flex flex-col justify-between overflow-hidden rounded-lg p-7 md:p-8 text-[var(--color-ink)] bg-[var(--color-pearl)] border border-[var(--color-pearl-line)] transition-all duration-300 ease-out motion-safe:hover:-translate-y-[2px]">
            <div className="relative z-10" data-step-card-head>
            <div data-step-index className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="grid place-items-center shrink-0 w-6 h-6 rounded-full text-[11px] leading-none text-[var(--color-pearl)] bg-[var(--color-gold-deep)]"
              >
                {STEPS[2].step}
              </span>
              <span className="grid place-items-center w-9 h-9 rounded-full border border-[var(--color-pearl-line)] text-[var(--color-gold-deep)]">
                <StepIcon name={STEPS[2].icon} />
              </span>
              <p className="text-xs font-normal uppercase tracking-[0.16em] text-[var(--color-gold-deep)]">
                {STEPS[2].label}
              </p>
            </div>
            <h3 className="mt-6 text-xl sm:text-2xl font-light tracking-[-0.02em] text-[var(--color-ink)]">
              {STEPS[2].service}
            </h3>
            </div>
            <p
              data-step-body
              className="relative z-10 mt-4 text-base font-normal leading-relaxed text-[var(--color-ink)]/80"
            >
              {STEPS[2].body}
            </p>
          </div>
        </div>
      </div>

      {/* Closer: proof link + the real method route */}
      <Reveal delay={0.35}>
        <div className="mt-12 md:mt-16 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Link
            href="/#proof-card"
            className="group inline-flex items-center gap-2 text-base sm:text-lg font-normal text-[var(--color-ink)] hover:text-[var(--color-gold-deep)] transition-colors cursor-pointer"
          >
            See it on a real one
            <ArrowRight className="w-4 h-4 transition-transform duration-200 motion-safe:group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
          <Link
            href="/how-we-work"
            className="text-sm font-normal text-[var(--color-ink)]/60 hover:text-[var(--color-gold-deep)] underline underline-offset-4 transition-colors cursor-pointer"
          >
            The full method
          </Link>
        </div>
      </Reveal>
    </SectionFullBleed>
  );
}
