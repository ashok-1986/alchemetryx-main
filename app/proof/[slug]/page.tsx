import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionFullBleed } from "@/components/sections/section-full-bleed";
import { Button } from "@/components/ui/button";
import { CtaBlock } from "@/components/sections/cta-block";
import { Reveal } from "@/components/motion/reveal";
import {
  getCaseStudyBySlug,
  getPublishedSixBlockStudies,
} from "@/content/case-studies-full";
import { COMPANY_INFO } from "@/lib/constants";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

interface CaseStudyPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const studies = getPublishedSixBlockStudies();
  return studies.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    return {
      title: "Case Study Not Found — Alchemetryx",
    };
  }

  return {
    title: `${study.title} — Proof — Alchemetryx`,
    description: `How we automated ${study.category.toLowerCase()} for ${study.clientAndContext.client}. Measured numbers before and after.`,
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    notFound();
  }

  // Compile-time & runtime validation that all 6 required blocks exist (FR-6)
  const {
    clientAndContext,
    situation,
    numberBefore,
    whatWasBuilt,
    numberAfter,
    quote,
  } = study;

  if (
    !clientAndContext ||
    !situation ||
    !numberBefore ||
    !whatWasBuilt ||
    !numberAfter ||
    !quote
  ) {
    throw new Error(`Case study "${slug}" is missing one of the 6 required blocks.`);
  }

  return (
    <div className="flex flex-col w-full">
      {/* Header Breadcrumb & Title: Sapphire */}
      <SectionFullBleed tone="dark" className="pt-20 pb-16 md:pt-28 md:pb-24">
        <Reveal>
          <div className="max-w-[850px] space-y-6">
            <Link
              href="/proof"
              className="inline-flex items-center gap-1.5 text-xs text-[var(--color-slate)] hover:text-[var(--color-pearl)] transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to all proof</span>
            </Link>

            <div className="flex items-center gap-3">
              <span className="px-2.5 py-0.5 rounded-[6px] bg-[var(--color-sapphire-raised)] border border-[var(--color-sapphire-line)] text-xs font-mono text-[var(--color-gold)]">
                {study.type}
              </span>
              <span className="text-xs text-[var(--color-slate)]">
                {study.category}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-[-0.04em] text-[var(--color-pearl)] leading-tight">
              {study.title}
            </h1>

            <p className="text-lg font-light text-[var(--color-slate)] max-w-[65ch]">
              {clientAndContext.description}
            </p>
          </div>
        </Reveal>
      </SectionFullBleed>

      {/* The 6-Block Core Body: Pearl */}
      <SectionFullBleed tone="light">
        <div className="max-w-[800px] space-y-16">
          {/* Block 1: Client and context */}
          <Reveal>
            <section className="space-y-4 border-b border-[var(--color-pearl-line)] pb-12">
              <p className="text-xs font-normal uppercase tracking-wider text-[var(--color-gold-deep)]">
                Block 1 · Client & Context
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 rounded-[9px] bg-white border border-[var(--color-pearl-line)] text-sm">
                <div>
                  <span className="text-xs text-[var(--color-slate)] block">Organisation</span>
                  <span className="font-normal text-[var(--color-ink)]">{clientAndContext.client}</span>
                </div>
                <div>
                  <span className="text-xs text-[var(--color-slate)] block">Scale</span>
                  <span className="font-normal text-[var(--color-ink)]">{clientAndContext.size}</span>
                </div>
                <div>
                  <span className="text-xs text-[var(--color-slate)] block">Sector</span>
                  <span className="font-normal text-[var(--color-ink)]">{clientAndContext.industry}</span>
                </div>
              </div>
            </section>
          </Reveal>

          {/* Block 2: The situation */}
          <Reveal>
            <section className="space-y-4 border-b border-[var(--color-pearl-line)] pb-12">
              <p className="text-xs font-normal uppercase tracking-wider text-[var(--color-gold-deep)]">
                Block 2 · The Situation
              </p>
              <h2 className="text-2xl font-light text-[var(--color-ink)]">
                What was broken
              </h2>
              <p className="text-base text-[var(--color-ink)]/85 leading-relaxed">
                {situation.overview}
              </p>
              <ul className="space-y-2 pt-2">
                {situation.frictionPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[var(--color-ink)]/80">
                    <span className="text-[var(--color-gold-deep)] font-mono text-xs mt-0.5">—</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>

          {/* Block 3: The number before */}
          <Reveal>
            <section className="space-y-4 border-b border-[var(--color-pearl-line)] pb-12">
              <p className="text-xs font-normal uppercase tracking-wider text-[var(--color-gold-deep)]">
                Block 3 · The Number Before
              </p>
              <h2 className="text-2xl font-light text-[var(--color-ink)]">
                The measurement that made it a problem
              </h2>
              <div className="p-8 rounded-[9px] bg-white border border-[var(--color-pearl-line)] space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <span className="text-xs text-[var(--color-slate)] uppercase tracking-wider block">
                      Primary Friction
                    </span>
                    <p className="text-3xl sm:text-4xl font-light text-[var(--color-ink)] mt-1">
                      {numberBefore.primaryMetric}
                    </p>
                    <p className="text-xs text-[var(--color-ink)]/70 mt-1">
                      {numberBefore.primaryLabel}
                    </p>
                  </div>
                  {numberBefore.secondaryMetric ? (
                    <div>
                      <span className="text-xs text-[var(--color-slate)] uppercase tracking-wider block">
                        Direct Financial Cost
                      </span>
                      <p className="text-3xl sm:text-4xl font-light text-[var(--color-ink)] mt-1">
                        {numberBefore.secondaryMetric}
                      </p>
                      <p className="text-xs text-[var(--color-ink)]/70 mt-1">
                        {numberBefore.secondaryLabel}
                      </p>
                    </div>
                  ) : null}
                </div>
                <p className="text-sm text-[var(--color-slate)] pt-4 border-t border-[var(--color-pearl-line)]">
                  {numberBefore.costImpact}
                </p>
              </div>
            </section>
          </Reveal>

          {/* Block 4: What was built */}
          <Reveal>
            <section className="space-y-4 border-b border-[var(--color-pearl-line)] pb-12">
              <p className="text-xs font-normal uppercase tracking-wider text-[var(--color-gold-deep)]">
                Block 4 · What Was Built
              </p>
              <h2 className="text-2xl font-light text-[var(--color-ink)]">
                The system architecture
              </h2>
              <p className="text-base text-[var(--color-ink)]/85 leading-relaxed">
                {whatWasBuilt.architecture}
              </p>

              <div className="space-y-2 pt-2">
                <span className="text-xs font-mono uppercase tracking-wider text-[var(--color-slate)]">
                  Implementation Steps
                </span>
                <ul className="space-y-2">
                  {whatWasBuilt.steps.map((step, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-[var(--color-ink)]/80">
                      <CheckCircle2 className="h-4 w-4 text-[var(--color-gold-deep)] shrink-0 mt-0.5" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4">
                <span className="text-xs font-mono uppercase tracking-wider text-[var(--color-slate)] block mb-2">
                  Tools & Components
                </span>
                <div className="flex flex-wrap gap-2">
                  {whatWasBuilt.toolsUsed.map((tool, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-[6px] bg-white border border-[var(--color-pearl-line)] text-xs text-[var(--color-ink)]"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </section>
          </Reveal>

          {/* Block 5: The number after */}
          <Reveal>
            <section className="space-y-4 border-b border-[var(--color-pearl-line)] pb-12">
              <p className="text-xs font-normal uppercase tracking-wider text-[var(--color-gold-deep)]">
                Block 5 · The Number After
              </p>
              <h2 className="text-2xl font-light text-[var(--color-ink)]">
                The verified result
              </h2>
              <div className="p-8 rounded-[9px] bg-white border border-[var(--color-pearl-line)] space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <span className="text-xs text-[var(--color-slate)] uppercase tracking-wider block">
                      Post-Build Measurement
                    </span>
                    <p className="text-3xl sm:text-4xl font-light text-[var(--color-gold-deep)] mt-1">
                      {numberAfter.primaryMetric}
                    </p>
                    <p className="text-xs text-[var(--color-ink)]/70 mt-1">
                      {numberAfter.primaryLabel}
                    </p>
                  </div>
                  {numberAfter.secondaryMetric ? (
                    <div>
                      <span className="text-xs text-[var(--color-slate)] uppercase tracking-wider block">
                        Cost Reduction
                      </span>
                      <p className="text-3xl sm:text-4xl font-light text-[var(--color-gold-deep)] mt-1">
                        {numberAfter.secondaryMetric}
                      </p>
                      <p className="text-xs text-[var(--color-ink)]/70 mt-1">
                        {numberAfter.secondaryLabel}
                      </p>
                    </div>
                  ) : null}
                </div>
                <p className="text-sm text-[var(--color-slate)] pt-4 border-t border-[var(--color-pearl-line)]">
                  {numberAfter.measuredOutcome}
                </p>
              </div>
            </section>
          </Reveal>

          {/* Block 6: What they said */}
          <Reveal>
            <section className="space-y-4">
              <p className="text-xs font-normal uppercase tracking-wider text-[var(--color-gold-deep)]">
                Block 6 · What They Said
              </p>
              <blockquote className="p-8 rounded-[9px] bg-white border-l-2 border-[var(--color-gold-deep)] border-y border-r border-[var(--color-pearl-line)] space-y-4">
                <p className="text-lg font-light text-[var(--color-ink)] italic leading-relaxed">
                  "{quote.text}"
                </p>
                <footer className="text-sm text-[var(--color-slate)]">
                  <strong className="font-normal text-[var(--color-ink)] block">{quote.author}</strong>
                  <span>{quote.role}</span>
                </footer>
              </blockquote>
            </section>
          </Reveal>
        </div>
      </SectionFullBleed>

      {/* Final CTA: Sapphire */}
      <CtaBlock
        headline="Have a workflow that needs to run on its own?"
        subhead="Book a 30-minute call to evaluate your process numbers and assess automation feasibility."
      />
    </div>
  );
}
