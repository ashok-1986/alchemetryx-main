"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { EASE, STAGGER } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const METRICS = [
  { label: "Rework", value: 50 },
  { label: "Slow answers", value: 50 },
  { label: "Manual handoffs", value: 25 },
];

const SCORE = 43;
const BAND = "Connected, but you cannot see it";

export function AnimatedScoreCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const scoreRef = useRef<HTMLSpanElement>(null);
  const barRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 80%",
            once: true,
          },
        });

        // Count score from 0 → SCORE
        const counter = { val: 0 };
        tl.to(
          counter,
          {
            val: SCORE,
            duration: 1.4,
            ease: EASE.expo,
            onUpdate() {
              if (scoreRef.current) {
                scoreRef.current.textContent = String(Math.round(counter.val));
              }
            },
          },
          0
        );

        // Bars grow from 0 → value%
        barRefs.current.forEach((bar, i) => {
          if (!bar) return;
          tl.fromTo(
            bar,
            { width: "0%" },
            {
              width: `${METRICS[i].value}%`,
              duration: 0.9,
              ease: EASE.out,
              delay: i * STAGGER.tight,
            },
            0.3
          );
        });
      });

      // Reduced-motion: paint final values immediately
      mm.add("(prefers-reduced-motion: reduce)", () => {
        if (scoreRef.current) scoreRef.current.textContent = String(SCORE);
        barRefs.current.forEach((bar, i) => {
          if (bar) bar.style.width = `${METRICS[i].value}%`;
        });
      });
    },
    { scope: cardRef }
  );

  return (
    <figure
      ref={cardRef}
      aria-label={`Example systems efficiency score: ${SCORE} out of 100. Manual handoffs identified as primary constraint.`}
      className="bg-[var(--color-sapphire)] rounded-2xl p-8 md:p-12 text-[var(--color-pearl)] shadow-xl relative overflow-hidden"
    >
      {/* Gold top rule */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-[var(--color-gold)]" aria-hidden="true" />

      {/* Label */}
      <p className="text-xs uppercase tracking-widest text-[var(--color-slate)] mb-6" aria-hidden="true">
        Your Systems Efficiency Score
      </p>

      {/* Animated score number */}
      <div
        className="text-[clamp(4rem,10vw,8rem)] font-light text-[var(--color-gold)] leading-none mb-3 tabular-nums"
        aria-hidden="true"
      >
        <span ref={scoreRef}>0</span>
      </div>

      {/* Band label */}
      <p
        className="text-base md:text-lg font-light tracking-tight mb-10 text-[var(--color-slate)] uppercase"
        aria-hidden="true"
      >
        {BAND}
      </p>

      {/* Animated metric bars */}
      <div className="space-y-5 mb-10 border-t border-[var(--color-slate)]/20 pt-6" aria-hidden="true">
        {METRICS.map((m, i) => (
          <div key={m.label} className="flex flex-col gap-1.5">
            <div className="flex justify-between items-baseline">
              <span className="text-xs uppercase tracking-[0.12em] text-[var(--color-slate)]">
                {m.label}
              </span>
              <span className="text-sm font-light text-[var(--color-gold)] tabular-nums">
                {m.value}
              </span>
            </div>
            {/* Track */}
            <div className="h-[3px] w-full bg-[var(--color-sapphire-line)] rounded-full overflow-hidden">
              <span
                ref={(el) => { barRefs.current[i] = el; }}
                className="block h-full rounded-full bg-[var(--color-gold)]"
                style={{ width: "0%" }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Summary rows */}
      <div className="text-sm space-y-3" aria-hidden="true">
        <div className="grid grid-cols-[140px_1fr] gap-4 items-baseline">
          <span className="text-[var(--color-slate)] uppercase tracking-wider text-xs">
            Costing you most
          </span>
          <span className="text-[var(--color-gold)] font-light">Manual handoffs</span>
        </div>
        <div className="grid grid-cols-[140px_1fr] gap-4 items-baseline">
          <span className="text-[var(--color-slate)] uppercase tracking-wider text-xs">
            Strongest
          </span>
          <span className="text-[var(--color-pearl)] font-light">Rework</span>
        </div>
      </div>
    </figure>
  );
}
