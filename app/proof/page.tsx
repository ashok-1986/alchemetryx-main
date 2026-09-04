import type { Metadata } from "next";
import Link from "next/link";
import { SectionFullBleed } from "@/components/sections/section-full-bleed";
import { Button } from "@/components/ui/button";
import { ProofCard } from "@/components/sections/proof-card";
import { CtaBlock } from "@/components/sections/cta-block";
import { Reveal } from "@/components/motion/reveal";
import { getPublishedCaseStudies } from "@/content/case-studies-data";
import { COMPANY_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Proof — Alchemetryx",
  description: "What we have actually built, with the numbers before and after.",
};

export default function ProofPage() {
  const publishedStudies = getPublishedCaseStudies();

  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero: Sapphire */}
      <SectionFullBleed tone="dark" className="pt-24 pb-20 md:pt-32 md:pb-28">
        <Reveal>
          <div className="max-w-[850px] space-y-8">
            <div className="inline-block px-3 py-1 rounded-[6px] bg-[var(--color-sapphire-raised)] border border-[var(--color-sapphire-line)] text-xs font-mono text-[var(--color-gold)]">
              Verified Deliveries
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-[72px] font-light tracking-[-0.04em] text-[var(--color-pearl)] leading-[1.02]">
              What we have actually built
            </h1>
            <p className="text-xl sm:text-2xl font-light text-[var(--color-pearl)]/90 leading-snug">
              Every case study below carries real measurements before and after. No marketing claims, no unverified statistics.
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

      {/* 2. Grid: Pearl */}
      <SectionFullBleed tone="light">
        <div className="space-y-8">
          <Reveal>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--color-pearl-line)] pb-6">
              <div>
                <p className="text-xs font-normal uppercase tracking-wider text-[var(--color-gold-deep)]">
                  Delivered Work
                </p>
                <h2 className="text-2xl sm:text-3xl font-light text-[var(--color-ink)]">
                  Published Case Studies
                </h2>
              </div>
              <p className="text-xs text-[var(--color-slate)]">
                Showing {publishedStudies.length} cleared cases. Drafts pending client sign-off remain unpublished.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {publishedStudies.map((study, idx) => (
              <Reveal key={study.slug} delay={idx * 0.08}>
                <ProofCard study={study} />
              </Reveal>
            ))}
          </div>
        </div>
      </SectionFullBleed>

      {/* 3. CTA: Sapphire */}
      <CtaBlock
        headline="Have a process with measurable friction?"
        subhead="Book a 30-minute call to review your workflow numbers and evaluate potential automation returns."
      />
    </div>
  );
}
