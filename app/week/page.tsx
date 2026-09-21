import type { Metadata } from "next";
import { SectionFullBleed } from "@/components/sections/section-full-bleed";
import { SplitLines } from "@/components/motion/split-lines";
import { Reveal } from "@/components/motion/reveal";
import { CircleExpandButton } from "@/components/ui/circle-expand-button";
import { AnimatedScoreCard } from "@/components/week/animated-score-card";

export const metadata: Metadata = {
  title: "Where's your week going? · Alchemetryx",
  description: "Nine questions, four minutes. Find out which of three things is costing your business the most time, and what to do about it.",
  openGraph: {
    title: "Where's your week going? · Alchemetryx",
    description: "Nine questions, four minutes. Find out which of three things is costing your business the most time, and what to do about it.",
    url: "https://alchemetryx.com/week",
  }
};

// Crisp SVG icons — geometric, one stroke weight, brand-consistent
function IconRework({ className }: { className?: string }) {
  return (
    <svg
      width="32" height="32" viewBox="0 0 32 32" fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Circular arrow — redo/repeat */}
      <path
        d="M26 16a10 10 0 1 1-2.93-7.07"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
      />
      <polyline
        points="22 6 23.07 8.93 26 10"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

function IconSlowAnswers({ className }: { className?: string }) {
  return (
    <svg
      width="32" height="32" viewBox="0 0 32 32" fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Clock face */}
      <circle cx="16" cy="16" r="10" stroke="currentColor" strokeWidth="1.5" />
      {/* Hour hand pointing to ~2 o'clock */}
      <line x1="16" y1="16" x2="21" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* Minute hand pointing to 12 */}
      <line x1="16" y1="16" x2="16" y2="9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* Centre dot */}
      <circle cx="16" cy="16" r="1.5" fill="currentColor" />
    </svg>
  );
}

function IconManualHandoffs({ className }: { className?: string }) {
  return (
    <svg
      width="32" height="32" viewBox="0 0 32 32" fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Two nodes connected by a line with an arrow — handoff */}
      <circle cx="7" cy="16" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="25" cy="16" r="4" stroke="currentColor" strokeWidth="1.5" />
      <line x1="11" y1="16" x2="19" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <polyline
        points="16.5 13 19.5 16 16.5 19"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

const THREE_THINGS = [
  {
    icon: IconRework,
    heading: "Rework.",
    body: "Work done twice because something was missing, wrong, or never passed on.",
  },
  {
    icon: IconSlowAnswers,
    heading: "Slow answers.",
    body: "How long it takes you to find out how the business is actually doing.",
  },
  {
    icon: IconManualHandoffs,
    heading: "Manual handoffs.",
    body: "A person carrying information from one system to the next because nothing else will.",
  },
];

export default function WeekPage() {
  return (
    <>
      {/* Section 1: Hero (Sapphire) */}
      <SectionFullBleed tone="dark" className="pt-40 pb-24 md:pt-56 md:pb-32">
        <div className="max-w-4xl">
          <SplitLines
            lines={["Where is your", "week going?"]}
            className="text-[clamp(3rem,7vw,6rem)] font-light leading-[1.02] tracking-[-0.04em] text-[var(--color-pearl)]"
          />

          <Reveal delay={0.3}>
            <p className="mt-8 text-lg md:text-xl font-light text-[var(--color-slate)] max-w-[520px] leading-relaxed">
              Nine questions. Four minutes. You get a score, the one thing costing you most, and a written assessment inside two working days. No charge, no login.
            </p>
          </Reveal>

          <Reveal delay={0.5}>
            <div className="mt-10">
              <CircleExpandButton
                href="https://tally.so/r/jajPEJ"
                variant="primary"
                size="lg"
              >
                Start
              </CircleExpandButton>
            </div>
          </Reveal>
        </div>
      </SectionFullBleed>

      {/* Section 2: The three things (Pearl) */}
      <SectionFullBleed tone="light" className="py-24 md:py-32">
        <Reveal>
          <h2 className="text-3xl md:text-5xl font-light tracking-tight mb-16 max-w-3xl">
            Three things eat the week
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 mb-16">
          {THREE_THINGS.map(({ icon: Icon, heading, body }, i) => (
            <Reveal key={heading} delay={0.1 * (i + 1)}>
              <div className="flex flex-col gap-5">
                {/* Icon badge */}
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-[var(--color-pearl-line)] text-[var(--color-gold-deep)]">
                  <Icon />
                </span>
                <h3 className="text-xl font-normal tracking-[-0.01em] text-[var(--color-ink)]">{heading}</h3>
                <p className="text-[var(--color-slate)] leading-relaxed">{body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.4}>
          <p className="text-lg md:text-xl text-[var(--color-slate)] max-w-3xl leading-relaxed">
            Most owner-led businesses lose the largest part of the week to one of these three. Almost none can say which one.
          </p>
        </Reveal>
      </SectionFullBleed>

      {/* Section 3: What you get (Pearl) */}
      <SectionFullBleed tone="light" className="py-24 md:py-32 border-t border-[var(--color-pearl-line)]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <Reveal>
              <h2 className="text-3xl md:text-5xl font-light tracking-tight mb-10">
                What arrives
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="space-y-8">
                <p className="text-lg md:text-xl text-[var(--color-slate)] leading-relaxed">
                  On screen, straight away: your score out of 100, the three areas scored separately, and which one is costing you most.
                </p>
                <p className="text-lg md:text-xl text-[var(--color-slate)] leading-relaxed">
                  By email inside two working days: a written assessment of why that area is your constraint, what it is likely costing, and what a fix looks like. Written for you, not a template.
                </p>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.3}>
            <AnimatedScoreCard />
          </Reveal>
        </div>
      </SectionFullBleed>

      {/* Section 4: How it works (Pearl) */}
      <SectionFullBleed tone="light" className="py-24 md:py-32">
        <Reveal>
          <h2 className="text-3xl md:text-5xl font-light tracking-tight mb-16">
            How it works
          </h2>
        </Reveal>

        <div className="space-y-12 max-w-3xl">
          <Reveal delay={0.1}>
            <div className="flex gap-6 md:gap-8">
              <div className="text-2xl font-light text-[var(--color-slate)] mt-1 shrink-0">One.</div>
              <p className="text-lg md:text-xl leading-relaxed text-[var(--color-ink)]">
                Nine questions about how work actually moves through your business. Four minutes, no preparation.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="flex gap-6 md:gap-8">
              <div className="text-2xl font-light text-[var(--color-slate)] mt-1 shrink-0">Two.</div>
              <p className="text-lg md:text-xl leading-relaxed text-[var(--color-ink)]">
                Your score, on screen, immediately.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="flex gap-6 md:gap-8">
              <div className="text-2xl font-light text-[var(--color-slate)] mt-1 shrink-0">Three.</div>
              <p className="text-lg md:text-xl leading-relaxed text-[var(--color-ink)]">
                Four more questions so the written assessment is about your business and not a generic one. Then it lands in your inbox.
              </p>
            </div>
          </Reveal>
        </div>
      </SectionFullBleed>

      {/* Section 5: The honest bit (Sapphire) */}
      <SectionFullBleed tone="dark" className="py-24 md:py-32 relative">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-[var(--color-gold)]" aria-hidden="true" />

        <Reveal>
          <h2 className="text-3xl md:text-5xl font-light tracking-tight mb-12 text-[var(--color-pearl)]">
            Two honest things
          </h2>
        </Reveal>

        <div className="space-y-8 max-w-3xl">
          <Reveal delay={0.1}>
            <p className="text-lg md:text-xl font-light text-[var(--color-slate)] leading-relaxed">
              If your business already runs well, we will say so. The top band reads: systems-led, you probably do not need us. That is a real result and some people get it.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-lg md:text-xl font-light text-[var(--color-slate)] leading-relaxed">
              Your answers are used to write your assessment and to improve the scoring. They are not sold, not shared, and not added to any list you did not ask for.
            </p>
          </Reveal>
        </div>
      </SectionFullBleed>

      {/* Section 6: CTA (Sapphire) */}
      <SectionFullBleed tone="dark" className="py-24 md:py-32">
        <div className="text-center flex flex-col items-center">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-light tracking-tight mb-10 text-[var(--color-pearl)]">
              Nine questions. Four minutes.
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <CircleExpandButton
              href="https://tally.so/r/jajPEJ"
              variant="primary"
              size="lg"
            >
              Start
            </CircleExpandButton>
          </Reveal>
        </div>
      </SectionFullBleed>
    </>
  );
}
