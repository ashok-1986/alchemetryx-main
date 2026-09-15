import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SectionFullBleed } from "@/components/sections/section-full-bleed";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "About · Alchemetryx",
  description:
    "We rebuild fragmented business tools into systems that run on their own, removing manual data entry and bottlenecked decisions.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <>
      {/* TITLE PAGE */}
      <SectionFullBleed
        id="about-hero"
        tone="dark"
        className="pt-48 pb-20 md:pt-64 md:pb-32 border-b border-[var(--color-pearl-line)]/20"
      >
        <Reveal>
          <div className="flex flex-col items-start gap-12 md:gap-16">
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold)]">
              About Alchemetryx
            </p>
            <h1 className="font-urbanist font-light text-[clamp(3.5rem,8vw,7rem)] leading-[0.9] tracking-[-0.04em] max-w-[20ch] text-white">
              When software is disconnected, your team spends their day copying data and you carry every decision.
            </h1>
            <p className="text-lg md:text-2xl font-normal leading-relaxed text-[var(--color-slate)] max-w-[45ch]">
              We rebuild critical business routines into systems that run on their own, linking your existing tools so numbers update automatically.
            </p>
            <div>
              <Link
                href="/proof"
                className="inline-flex items-center text-lg md:text-xl font-normal text-[var(--color-gold)] hover:text-white underline underline-offset-4 transition-colors cursor-pointer focus-visible:outline-none focus-visible:outline-2 focus-visible:outline-[var(--color-gold)] focus-visible:outline-offset-2 rounded-sm"
              >
                See our work →
              </Link>
            </div>
          </div>
        </Reveal>
      </SectionFullBleed>

      {/* 01 · THE PATTERN */}
      <SectionFullBleed id="01-pattern" tone="light" className="py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-8 md:gap-16">
          <Reveal>
            <div className="text-4xl md:text-5xl font-light text-[var(--color-ink)]/20 font-mono tracking-tight">
              01
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="max-w-[65ch]">
              <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-gold-deep)] mb-4 font-normal">
                The Pattern
              </p>
              <h2 className="text-3xl md:text-5xl font-light tracking-[-0.02em] text-[var(--color-ink)] mb-8">
                Software spreads faster than the systems to connect it.
              </h2>
              <div className="space-y-6 text-base md:text-lg text-[var(--color-ink)]/85 leading-relaxed">
                <p>
                  Most growing businesses add tools as problems arise: a CRM for sales,
                  spreadsheets for jobs, and separate software for billing. Each tool solves
                  one immediate need, but they rarely share data.
                </p>
                <p>
                  The result is familiar: staff spend hours copying data between screens,
                  numbers differ depending on who you ask, and decisions wait on the owner
                  because nobody else has the full picture.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </SectionFullBleed>

      {/* 02 · THE INSIGHT */}
      <SectionFullBleed id="02-insight" tone="dark" className="py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-8 md:gap-16">
          <Reveal>
            <div className="text-4xl md:text-5xl font-light text-white/20 font-mono tracking-tight">
              02
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="max-w-[65ch]">
              <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-gold)] mb-4 font-normal">
                The Insight
              </p>
              <h2 className="text-3xl md:text-5xl font-light tracking-[-0.02em] text-white mb-8">
                Start with the decision, then wire the tools.
              </h2>
              <div className="space-y-6 text-base md:text-lg text-white/80 leading-relaxed">
                <p>
                  Software vendors focus on features. When we review a routine, we ask what
                  specific decision or handoff needs to happen. Once that outcome is clear, we
                  set up the tools to feed it directly.
                </p>
                <p>
                  Businesses that run smoothly do not necessarily own more software. They
                  have clear routines where each tool passes information forward without
                  someone having to retype it.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </SectionFullBleed>

      {/* 03 · THE FIX */}
      <SectionFullBleed id="03-fix" tone="light" className="py-24 md:py-32 border-b border-[var(--color-pearl-line)]">
        <div className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-8 md:gap-16">
          <Reveal>
            <div className="text-4xl md:text-5xl font-light text-[var(--color-ink)]/20 font-mono tracking-tight">
              03
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="max-w-[65ch]">
              <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-gold-deep)] mb-4 font-normal">
                The Fix
              </p>
              <h2 className="text-3xl md:text-5xl font-light tracking-[-0.02em] text-[var(--color-ink)] mb-8">
                Four common bottlenecks we remove.
              </h2>
              <div className="space-y-6 text-base md:text-lg text-[var(--color-ink)]/85 leading-relaxed">
                <p>
                  Delayed decisions happen when numbers sit scattered across multiple logins.
                  By the time someone pulls a report together, the week has moved on.
                </p>
                <p>
                  Disconnected tools force staff to enter the same client details, shift
                  hours, or invoice lines more than once. That creates typing mistakes and
                  confusion over which record is accurate.
                </p>
                <p>
                  Routine paperwork eats hours when staff have to manually chase updates,
                  send reminders, or verify coverage by eye.
                </p>
                <p>
                  Owner dependency builds up when the exact order of steps lives in one
                  person's head, leaving the business unable to run smoothly when they step
                  away.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </SectionFullBleed>

      {/* 04 · WHAT WE DO */}
      <SectionFullBleed id="04-what-we-do" tone="light" className="py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-8 md:gap-16">
          <Reveal>
            <div className="text-4xl md:text-5xl font-light text-[var(--color-ink)]/20 font-mono tracking-tight">
              04
            </div>
          </Reveal>
          <div className="w-full">
            <Reveal delay={0.1}>
              <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-gold-deep)] mb-4 font-normal">
                What We Do
              </p>
              <h2 className="text-3xl md:text-5xl font-light tracking-[-0.02em] text-[var(--color-ink)] mb-16">
                Three ways we help.
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <Reveal delay={0.2}>
                <div className="border-t border-[var(--color-gold-deep)] pt-6">
                  <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold-deep)] mb-4">
                    Live Numbers
                  </p>
                  <h3 className="text-xl md:text-2xl font-light tracking-[-0.02em] text-[var(--color-ink)] mb-4">
                    Reports you can act on.
                  </h3>
                  <p className="text-sm md:text-base text-[var(--color-ink)]/80 leading-relaxed">
                    Clear summaries that show current costs, active jobs, and capacity, so
                    you can make decisions while there is still time to adjust.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.3}>
                <div className="border-t border-[var(--color-gold-deep)] pt-6">
                  <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold-deep)] mb-4">
                    Connected Tools
                  </p>
                  <h3 className="text-xl md:text-2xl font-light tracking-[-0.02em] text-[var(--color-ink)] mb-4">
                    Data that moves on its own.
                  </h3>
                  <p className="text-sm md:text-base text-[var(--color-ink)]/80 leading-relaxed">
                    We link your scheduling, client records, and billing so information
                    enters once and updates across your existing software automatically.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.4}>
                <div className="border-t border-[var(--color-gold-deep)] pt-6">
                  <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold-deep)] mb-4">
                    Automated Admin
                  </p>
                  <h3 className="text-xl md:text-2xl font-light tracking-[-0.02em] text-[var(--color-ink)] mb-4">
                    Fewer manual handoffs.
                  </h3>
                  <p className="text-sm md:text-base text-[var(--color-ink)]/80 leading-relaxed">
                    Recurring check-ins, reminders, and intake forms that trigger on their
                    own, removing hours of chasing from your team's week.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </SectionFullBleed>

      {/* COLOPHON (CTA) */}
      <SectionFullBleed
        id="colophon"
        tone="dark"
        fullHeight={true}
        className="py-24 md:py-32"
      >
        <Reveal>
          <div className="max-w-[45ch] mx-auto text-center flex flex-col items-center">
            <h2 className="text-[clamp(1.75rem,3.5vw,3rem)] font-light leading-[1.2] tracking-[-0.02em] text-white mb-10">
              If we do not think there is a problem worth paying to solve, we will tell you that
              instead.
            </h2>
            {/* Ashok photo */}
            <div className="mb-10">
              <Image
                src="/brand/ashok-business.png"
                alt="Ashok Verma, Co-Founder & Principal Consultant"
                width={200}
                height={200}
                className="w-[120px] h-[120px] md:w-[160px] md:h-[160px] rounded-full object-cover border-2 border-[var(--color-gold)] mx-auto"
              />
              <p className="mt-4 text-sm font-light text-white/70">
                Ashok Verma — Co-Founder & Principal Consultant
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
              <Link
                href="/book"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-[var(--color-gold)] px-8 py-4 text-base font-normal tracking-wide text-white transition-all hover:bg-[var(--color-gold-deep)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-gold)] shadow-sm hover:-translate-y-0.5"
              >
                Book a 30-minute call
              </Link>
              <Link
                href="/proof"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border border-[var(--color-gold)] px-8 py-4 text-base font-normal tracking-wide text-[var(--color-gold)] transition-all hover:bg-[var(--color-gold)] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-gold)]"
              >
                View case studies
              </Link>
            </div>
          </div>
        </Reveal>
      </SectionFullBleed>
    </>
  );
}
