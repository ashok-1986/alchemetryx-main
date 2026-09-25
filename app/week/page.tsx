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

const THREE_THINGS = [
  {
    heading: "Rework",
    body: "Work redone because something was missing or wrong the first time.",
  },
  {
    heading: "Slow answers",
    body: "You wait days to find out how the business is really doing.",
  },
  {
    heading: "Manual handoffs",
    body: "Someone carries information from one system to another by hand.",
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8 mb-16">
          {THREE_THINGS.map(({ heading, body }, i) => (
            <Reveal key={heading} delay={0.1 * (i + 1)}>
              <div className="flex flex-col gap-4 bg-[var(--color-pearl)] p-8 rounded-xl border border-[var(--color-pearl-line)] h-full">
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
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-light tracking-tight mb-8">
              What arrives
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg md:text-xl text-[var(--color-slate)] leading-relaxed mb-16">
              On screen straight away: your score, the three areas, and which one is costing you most. In your inbox within two working days: a written assessment of why, what it is likely costing, and what a fix looks like.
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.3}>
          <div className="max-w-3xl mx-auto">
            <AnimatedScoreCard />
          </div>
        </Reveal>
      </SectionFullBleed>

      {/* Section 4: How it works (Sapphire) */}
      <SectionFullBleed tone="dark" className="py-24 md:py-32">
        <Reveal>
          <h2 className="text-3xl md:text-5xl font-light tracking-tight mb-16 text-[var(--color-pearl)] text-center">
            How it works
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 max-w-5xl mx-auto">
          {[
            { num: "1", text: "Nine questions about how work moves through your business." },
            { num: "2", text: "Your score, on screen, immediately." },
            { num: "3", text: "Four more questions, then your assessment lands in your inbox." }
          ].map((step, i) => (
            <Reveal key={step.num} delay={0.1 * (i + 1)}>
              <div className="flex flex-col items-center text-center gap-6">
                <span className="flex items-center justify-center w-12 h-12 rounded-full bg-[var(--color-gold)] text-[var(--color-ink)] text-xl font-medium shrink-0">
                  {step.num}
                </span>
                <p className="text-lg md:text-xl font-light leading-relaxed text-[var(--color-pearl)]">
                  {step.text}
                </p>
              </div>
            </Reveal>
          ))}
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

        <div className="space-y-6 max-w-3xl">
          <Reveal delay={0.1}>
            <p className="text-lg md:text-xl font-light text-[var(--color-slate)] leading-relaxed">
              If your business already runs well, we will say so. Some people get that result, and it is a real one.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-lg md:text-xl font-light text-[var(--color-slate)] leading-relaxed">
              Your answers are used only to write your assessment. Not sold, not shared, not added to any list.
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
