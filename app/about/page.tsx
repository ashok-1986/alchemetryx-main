import type { Metadata } from "next";
import Link from "next/link";
import { SectionFullBleed } from "@/components/sections/section-full-bleed";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "About · Alchemetryx",
  description:
    "We fix the software mess teams inherit. Connected stack. Automated workflow. One dashboard to decide.",
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
        className="pt-40 pb-20 md:pt-56 md:pb-32 border-b border-[var(--color-pearl-line)]/20"
      >
        <Reveal>
          <div className="max-w-[70ch]">
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold)] mb-6">
              We fix the software mess teams inherit
            </p>
            <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-light leading-[1.05] tracking-[-0.03em] text-white">
              Your software doesn't talk. Your team does the work. You make every decision.
            </h1>
            <p className="mt-8 text-lg md:text-xl font-normal leading-relaxed text-white/80 max-w-[52ch]">
              We rebuild one critical process into a system that runs itself. Connected stack.
              Automated workflow. One dashboard to decide.
            </p>
            <div className="mt-10">
              <Link
                href="/proof"
                className="inline-flex items-center text-lg font-normal text-[var(--color-gold)] hover:text-white underline underline-offset-4 transition-colors cursor-pointer"
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
              <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-gold-deep)] mb-4 font-semibold">
                The Pattern
              </p>
              <h2 className="text-3xl md:text-5xl font-light tracking-[-0.02em] text-[var(--color-ink)] mb-8">
                Every growing business hits the same wall.
              </h2>
              <div className="space-y-6 text-base md:text-lg text-[var(--color-ink)]/85 leading-relaxed">
                <p>
                  They invest in software that doesn&apos;t work together. A CRM here. A
                  spreadsheet there. A tool for this, a tool for that. Each one solves one
                  problem. None of them talk to each other.
                </p>
                <p>
                  The result: decision-making slows down. Tools don&apos;t connect. Too much manual
                  work. Everything depends on the owner. The business grows, but the systems
                  don&apos;t grow with it.
                </p>
                <p className="font-semibold text-[var(--color-ink)]">
                  This is not a technology problem. It is a systems thinking problem.
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
              <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-gold)] mb-4 font-semibold">
                The Insight
              </p>
              <h2 className="text-3xl md:text-5xl font-light tracking-[-0.02em] text-white mb-8">
                What decision are you trying to make?
              </h2>
              <div className="space-y-6 text-base md:text-lg text-white/80 leading-relaxed">
                <p>
                  That single question changed everything. When we started asking it, the
                  conversations shifted. Instead of talking about software, we started talking
                  about decisions. Instead of talking about tools, we started talking about
                  systems.
                </p>
                <p>
                  The companies that succeeded didn&apos;t have more technology. They had clearer
                  systems. They knew what decision each tool was supposed to support, and they
                  built the workflow around that decision, not around the tool.
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
              <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-gold-deep)] mb-4 font-semibold">
                The Fix
              </p>
              <h2 className="text-3xl md:text-5xl font-light tracking-[-0.02em] text-[var(--color-ink)] mb-8">
                Four things we fix.
              </h2>
              <div className="space-y-6 text-base md:text-lg text-[var(--color-ink)]/85 leading-relaxed">
                <p>
                  <strong>Decision-making is slow.</strong> Information is scattered across tools. By
                  the time you gather it, the moment has passed.
                </p>
                <p>
                  <strong>Tools don&apos;t work together.</strong> Each system operates in isolation.
                  Data enters twice, exits nowhere, and nobody trusts the numbers.
                </p>
                <p>
                  <strong>Too much manual work.</strong> People do what software should do. The cost
                  is invisible until you count the hours.
                </p>
                <p>
                  <strong>Everything depends on the owner.</strong> The business cannot run without
                  you. That is not a sign of importance. It is a sign of fragility.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </SectionFullBleed>

      {/* 04 · WHAT WE DO (Previously 05) */}
      <SectionFullBleed id="04-what-we-do" tone="light" className="py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-8 md:gap-16">
          <Reveal>
            <div className="text-4xl md:text-5xl font-light text-[var(--color-ink)]/20 font-mono tracking-tight">
              04
            </div>
          </Reveal>
          <div className="w-full">
            <Reveal delay={0.1}>
              <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-gold-deep)] mb-4 font-semibold">
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
                    Decision Intelligence
                  </p>
                  <h3 className="text-xl md:text-2xl font-light tracking-[-0.02em] text-[var(--color-ink)] mb-4">
                    See clearly. Decide confidently.
                  </h3>
                  <p className="text-sm md:text-base text-[var(--color-ink)]/80 leading-relaxed">
                    Dashboards that show what matters. Reports that answer the question you
                    actually asked. Not more data. The right data.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.3}>
                <div className="border-t border-[var(--color-gold-deep)] pt-6">
                  <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold-deep)] mb-4">
                    Digital Platforms
                  </p>
                  <h3 className="text-xl md:text-2xl font-light tracking-[-0.02em] text-[var(--color-ink)] mb-4">
                    Tools that work together.
                  </h3>
                  <p className="text-sm md:text-base text-[var(--color-ink)]/80 leading-relaxed">
                    CRM, operations, finance; connected. One source of truth. No duplicate entry.
                    No arguing about which number is right.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.4}>
                <div className="border-t border-[var(--color-gold-deep)] pt-6">
                  <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold-deep)] mb-4">
                    Intelligent Automation
                  </p>
                  <h3 className="text-xl md:text-2xl font-light tracking-[-0.02em] text-[var(--color-ink)] mb-4">
                    Less manual work. More focus.
                  </h3>
                  <p className="text-sm md:text-base text-[var(--color-ink)]/80 leading-relaxed">
                    The repetitive tasks that consume your team; automated. Not replacing people.
                    Freeing them to do the work that matters.
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
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
              <Link
                href="/book"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-[var(--color-gold)] px-8 py-4 text-base font-semibold tracking-wide text-white transition-all hover:bg-[var(--color-gold-deep)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-gold)] shadow-sm hover:-translate-y-0.5"
              >
                Book a 30-minute call
              </Link>
              <Link
                href="/proof"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border border-[var(--color-gold)] px-8 py-4 text-base font-semibold tracking-wide text-[var(--color-gold)] transition-all hover:bg-[var(--color-gold)] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-gold)]"
              >
                View case studies
              </Link>
            </div>
            <p className="mt-16 text-xs text-white/40 tracking-wider uppercase">
              Alchemetryx Ltd &middot; Registered in England and Wales &middot; Company No. 17199377
            </p>
          </div>
        </Reveal>
      </SectionFullBleed>
    </>
  );
}
