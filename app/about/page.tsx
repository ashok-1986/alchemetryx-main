import type { Metadata } from "next";
import Link from "next/link";
import { SectionFullBleed } from "@/components/sections/section-full-bleed";
import { Button } from "@/components/ui/button";
import { CtaBlock } from "@/components/sections/cta-block";
import { Reveal } from "@/components/motion/reveal";
import { COMPANY_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About — Alchemetryx",
  description: "Ashok, Nimish and Pravin. UK registered company 17199377.",
};

const FOUNDERS = [
  {
    name: "Ashok",
    role: "Commercial & Solutions Architecture",
    location: "London / Pune",
    bio: "Focuses on commercial structuring, regulatory alignment, and solution design across UK and India markets. Works directly with owners to define where automation provides measurable return.",
  },
  {
    name: "Nimish",
    role: "Systems & Technical Delivery",
    location: "London, UK",
    bio: "Leads systems engineering, custom API integrations, deterministic workflow automation, and infrastructure resilience. Responsible for end-to-end technical execution on UK client engagements.",
  },
  {
    name: "Pravin",
    role: "Process Engineering & Architecture",
    location: "Pune, India",
    bio: "Specialises in business process decomposition, data pipeline construction, testing telemetry, and long-term systems maintenance. Directs technical architecture and verification testing.",
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero: Sapphire */}
      <SectionFullBleed tone="dark" className="pt-24 pb-20 md:pt-32 md:pb-28">
        <Reveal>
          <div className="max-w-[850px] space-y-8">
            <div className="inline-block px-3 py-1 rounded-[6px] bg-[var(--color-sapphire-raised)] border border-[var(--color-sapphire-line)] text-xs font-mono text-[var(--color-gold)]">
              About Us
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-[72px] font-light tracking-[-0.04em] text-[var(--color-pearl)] leading-[1.02]">
              We make business processes run on their own.
            </h1>
            <p className="text-xl sm:text-2xl font-light text-[var(--color-pearl)]/90 leading-snug">
              With verified measurements before and after. You work directly with engineers and solution architects, not an account team.
            </p>
            <div className="pt-2">
              <Button asChild variant="primary" size="lg">
                <Link href={COMPANY_INFO.primaryCtaHref}>
                  {COMPANY_INFO.primaryCtaLabel}
                </Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </SectionFullBleed>

      {/* 2. The Three of Us: Pearl */}
      <SectionFullBleed tone="light">
        <div className="space-y-12">
          <Reveal>
            <div className="space-y-4 max-w-[700px]">
              <p className="text-xs font-normal uppercase tracking-wider text-[var(--color-gold-deep)]">
                Leadership
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-[-0.04em] text-[var(--color-ink)]">
                The three of us
              </h2>
              <p className="text-base text-[var(--color-ink)]/80 max-w-[65ch]">
                Three founders combining enterprise systems delivery, solutions architecture, and commercial rigor.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FOUNDERS.map((founder, idx) => (
              <Reveal key={founder.name} delay={idx * 0.08}>
                <div className="p-8 rounded-[9px] bg-white border border-[var(--color-pearl-line)] space-y-4 flex flex-col justify-between h-full transition-all duration-200 ease-out hover:border-[var(--color-gold)]/40 hover:-translate-y-0.5">
                  <div className="space-y-4">
                    <div className="w-16 h-16 rounded-full bg-[var(--color-pearl)] border border-[var(--color-pearl-line)] flex items-center justify-center text-xl font-light text-[var(--color-gold-deep)]">
                      {founder.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-2xl font-light text-[var(--color-ink)]">
                        {founder.name}
                      </h3>
                      <p className="text-xs font-mono text-[var(--color-gold-deep)] mt-0.5">
                        {founder.role}
                      </p>
                      <p className="text-xs text-[var(--color-slate)]">
                        {founder.location}
                      </p>
                    </div>
                    <p className="text-sm text-[var(--color-ink)]/75 leading-relaxed pt-2 border-t border-[var(--color-pearl-line)]">
                      {founder.bio}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </SectionFullBleed>

      {/* 3. How We Work: Pearl */}
      <SectionFullBleed tone="light" className="pt-0 md:pt-0">
        <Reveal>
          <div className="space-y-8 max-w-[850px]">
            <div className="space-y-4">
              <p className="text-xs font-normal uppercase tracking-wider text-[var(--color-gold-deep)]">
                Engineering Method
              </p>
              <h2 className="text-3xl sm:text-4xl font-light tracking-[-0.04em] text-[var(--color-ink)]">
                How we work
              </h2>
            </div>

            <div className="space-y-6 text-base text-[var(--color-ink)]/85 leading-relaxed">
              <p>
                We do not sell open-ended consulting retainers or bill by the hour. We believe business software should produce clear, measurable outcomes that show up on your profit and loss statement.
              </p>
              <p>
                Every engagement starts by identifying the single process costing you the most time and money. We audit the workflow, specify a deterministic build, and complete implementation within 4 to 8 weeks. Once live, we provide continuous monitoring on a transparent monthly retainer so you can verify that the system runs without manual intervention.
              </p>
              <p>
                We write deterministic code first, and use language models only where unstructured inputs or classification require human-like flexibility. This guarantees that your systems remain reliable, auditable, and secure.
              </p>
            </div>
          </div>
        </Reveal>
      </SectionFullBleed>

      {/* 4. Registration & Contact: Pearl */}
      <SectionFullBleed tone="light" className="pt-0 md:pt-0">
        <Reveal>
          <div className="p-8 sm:p-10 rounded-[9px] bg-white border border-[var(--color-pearl-line)] space-y-6">
            <div className="border-b border-[var(--color-pearl-line)] pb-4">
              <p className="text-xs font-normal uppercase tracking-wider text-[var(--color-gold-deep)]">
                Official Registration
              </p>
              <h3 className="text-2xl font-light text-[var(--color-ink)] mt-1">
                Corporate identity & locations
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
              <div className="space-y-1">
                <span className="text-xs text-[var(--color-slate)] block uppercase tracking-wider">
                  Registration
                </span>
                <span className="font-normal text-base text-[var(--color-ink)]">
                  {COMPANY_INFO.companyNumberLabel}
                </span>
                <p className="text-xs text-[var(--color-slate)]">Registered in England & Wales</p>
              </div>
              <div className="space-y-1">
                <span className="text-xs text-[var(--color-slate)] block uppercase tracking-wider">
                  United Kingdom
                </span>
                <span className="font-normal text-[var(--color-ink)] block">
                  {COMPANY_INFO.ukAddress}
                </span>
                <p className="text-xs text-[var(--color-slate)]">Executive & UK Client Services</p>
              </div>
              <div className="space-y-1">
                <span className="text-xs text-[var(--color-slate)] block uppercase tracking-wider">
                  India
                </span>
                <span className="font-normal text-[var(--color-ink)] block">
                  {COMPANY_INFO.indiaAddress}
                </span>
                <p className="text-xs text-[var(--color-slate)]">Engineering & Regional Solutions</p>
              </div>
            </div>
          </div>
        </Reveal>
      </SectionFullBleed>

      {/* 5. CTA: Sapphire */}
      <CtaBlock
        headline="Ready to talk directly to the engineers building your systems?"
        subhead="Book a 30-minute call with Ashok or Nimish to review your automation priorities."
      />
    </div>
  );
}
