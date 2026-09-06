import type { Metadata } from "next";
import Link from "next/link";
import { SectionFullBleed } from "@/components/sections/section-full-bleed";
import { Reveal } from "@/components/motion/reveal";
import { CircleExpandButton } from "@/components/ui/circle-expand-button";

export const metadata: Metadata = {
  title: "Not bought AI yet? · Alchemetryx",
  description:
    "You have not bought any AI or automation tool yet. That might be the right call. Here is how to think about when to start.",
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
            Start with one job. Not a tool.
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
              Every business has one. The weekly rota. The invoicing that
              happens when someone remembers. The onboarding step that takes an
              afternoon because nobody wrote down how it works. The quoting
              process that lives in someone&apos;s head.
            </p>
            <p className="mt-4 text-base md:text-lg font-normal leading-relaxed text-[var(--color-ink)]">
              We start with that one job. Not the whole business. Not a
              platform. One process that costs you real time every week, and an
              honest look at what it would take to make it run as a system
              instead of a habit.
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
              We rebuilt it as one system that handles shifts, cost, coverage
              and compliance in a single place. It is running now.
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
              If there is no process right now that is costing you real time or
              real money, you do not need us yet. That is an honest answer, not
              a sales tactic.
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
