import { SectionFullBleed } from "@/components/sections/section-full-bleed";
import { Reveal } from "@/components/motion/reveal";

const ROWS = [
  {
    label: "Time",
    copy: "Hours go into typing things twice, fixing what got typed wrong, and chasing people for updates.",
  },
  {
    label: "Money",
    copy: "You find out what a job actually cost after it's finished, not while you can still do something about it.",
  },
  {
    label: "You",
    copy: "Every decision comes back to you, because nothing else can carry it.",
  },
];

/**
 * Section 3 — The problem
 * Tone: Pearl
 * Layout: eyebrow and large ghosted numeral 01, headline left, supporting paragraph right,
 * then three stacked rows with a hairline between each.
 */
export function TheProblem() {
  return (
    <SectionFullBleed tone="light" className="border-t border-[var(--color-pearl-line)]">
      {/* Eyebrow & Ghosted Numeral */}
      <Reveal>
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-[0.2em] font-semibold text-[var(--color-gold-deep)]">
            THE PROBLEM
          </p>
          <span
            aria-hidden="true"
            className="text-5xl sm:text-6xl font-light text-[var(--color-ink)]/20 select-none"
          >
            01
          </span>
        </div>
      </Reveal>

      {/* Headline & Supporting paragraph */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-baseline">
        <div className="lg:col-span-6">
          <Reveal delay={0.1}>
            <h2 className="text-[clamp(2rem,4.5vw,3.75rem)] font-medium leading-[1.08] tracking-[-0.03em] max-w-[20ch] text-[var(--color-ink)]">
              The leak isn’t visible on your P&L.
            </h2>
          </Reveal>
        </div>
        <div className="lg:col-span-6">
          <Reveal delay={0.2}>
            <p className="text-lg md:text-xl font-normal leading-relaxed text-[var(--color-ink)]/90 max-w-[48ch]">
              It’s in the gap between the work you pay for and the work that actually moves the business forward.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Three stacked rows with hairline divider */}
      <div className="mt-16 md:mt-24 border-t border-[var(--color-pearl-line)]">
        {ROWS.map((row, i) => (
          <Reveal key={row.label} delay={0.1 * i}>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-10 md:py-12 border-b border-[var(--color-pearl-line)] items-baseline">
              <div className="md:col-span-4 lg:col-span-3">
                <h3 className="text-2xl md:text-3xl font-semibold tracking-[-0.02em] text-[var(--color-ink)]">
                  {row.label}
                </h3>
              </div>
              <div className="md:col-span-8 lg:col-span-9">
                <p className="text-lg md:text-xl font-normal leading-relaxed text-[var(--color-ink)] max-w-[55ch]">
                  {row.copy}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </SectionFullBleed>
  );
}
