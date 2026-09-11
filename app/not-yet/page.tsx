import type { Metadata } from "next";
import Link from "next/link";
import { SectionFullBleed } from "@/components/sections/section-full-bleed";
import { Reveal } from "@/components/motion/reveal";
import { CircleExpandButton } from "@/components/ui/circle-expand-button";

export const metadata: Metadata = {
  title: "Not bought AI yet? · Alchemetryx",
  description:
    "You have not bought any AI or automation tool yet. That might be the right call. Here is how to think about when to start.",
  alternates: {
    canonical: "/not-yet",
  },
};

export default function NotYetPage() {
  return (
    <>
      {/* ── Hero ── */}
      <SectionFullBleed tone="dark" className="pt-24 pb-20 md:pt-32 md:pb-28">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold)] mb-6">
            NOT BOUGHT AI YET?
          </p>
          <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-light leading-[1.06] tracking-[-0.04em] max-w-[18ch] text-[var(--color-pearl)]">
            Start with one job before buying more software.
          </h1>
          <p className="mt-6 text-lg md:text-xl font-normal leading-relaxed text-[var(--color-slate)] max-w-[55ch]">
            You do not need to buy software to fix a problem you have not priced
            yet. Start with the job that costs you the most time, and figure out
            what it would take to make that one run without you.
          </p>
        </Reveal>
      </SectionFullBleed>

      {/* ── What "one job" means ── */}
      <SectionFullBleed tone="light" fullHeight={false} className="py-20 md:py-28">
        <Reveal>
          <div className="max-w-[65ch]">
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-gold-deep)] font-normal mb-4">
              WHAT THIS LOOKS LIKE IN PRACTICE
            </p>
            <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-light leading-[1.08] tracking-[-0.03em] text-[var(--color-ink)]">
              Pick the job that still runs on memory and paper.
            </h2>
            <p className="mt-6 text-base md:text-lg font-normal leading-relaxed text-[var(--color-ink)]">
              Every business has one: the monthly rota, invoicing that happens
              whenever someone remembers, onboarding steps that take an afternoon
              because nobody wrote them down, or quotes that live in someone's head.
            </p>
            <p className="mt-4 text-base md:text-lg font-normal leading-relaxed text-[var(--color-ink)]">
              We focus on that one job, looking at what it actually costs you in
              hours and what it takes to make it run reliably on its own.
            </p>
          </div>
        </Reveal>
      </SectionFullBleed>

      {/* ── One case study ── */}
      <SectionFullBleed tone="dark" fullHeight={false} className="py-20 md:py-28">
        <Reveal>
          <div className="max-w-[65ch]">
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-gold)] font-normal mb-4">
              PROOF THIS IS A METHOD
            </p>
            <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-light leading-[1.08] tracking-[-0.03em] text-[var(--color-pearl)]">
              A care home&apos;s rota lived in a spreadsheet. We rebuilt it as a
              system.
            </h2>
            <p className="mt-6 text-base md:text-lg font-normal leading-relaxed text-[var(--color-pearl)]/85">
              The home planned every month in one shared Excel file. Staff were
              typed into a grid by hand. Nobody could see the wage bill against
              budget until the month was already spent.
            </p>
            <p className="mt-4 text-base md:text-lg font-normal leading-relaxed text-[var(--color-pearl)]/85">
              We rebuilt it as one system that tracks shifts, staffing levels,
              and running wage costs in one place. It is running now.
            </p>
            <div className="mt-6">
              <Link
                href="/proof/care-rota"
                className="inline-flex items-center text-base font-normal text-[var(--color-gold)] hover:text-[var(--color-pearl)] underline underline-offset-4 transition-colors cursor-pointer"
              >
                Read the full case study →
              </Link>
            </div>
          </div>
        </Reveal>
      </SectionFullBleed>

      {/* ── Honest close ── */}
      <SectionFullBleed tone="light" fullHeight={false} className="py-20 md:py-28">
        <Reveal>
          <div className="max-w-[55ch]">
            <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-light leading-[1.08] tracking-[-0.03em] text-[var(--color-ink)]">
              This may not be the right moment. That is fine.
            </h2>
            <p className="mt-6 text-base md:text-lg font-normal leading-relaxed text-[var(--color-ink)]">
              If no single routine is costing you substantial time or money right
              now, you do not need outside help yet.
            </p>
            <p className="mt-4 text-base md:text-lg font-normal leading-relaxed text-[var(--color-ink)]">
              When a job starts eating hours you could spend on the work you
              actually do, that is the right moment to look at it. We will be
              here.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-col sm:flex-row gap-4 items-start">
            <Link
              href="/proof"
              className="inline-flex items-center h-12 px-[28px] rounded-full border border-[var(--color-sapphire-line)] text-[var(--color-ink)] text-base font-normal hover:bg-[var(--color-pearl)] transition-colors cursor-pointer"
            >
              Browse case studies
            </Link>
            <CircleExpandButton href="/book" variant="primary" size="lg">
              Book a 30-minute call
            </CircleExpandButton>
          </div>
        </Reveal>
      </SectionFullBleed>
    </>
  );
}
