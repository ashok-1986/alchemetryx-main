import type { Metadata } from "next";
import Link from "next/link";
import { SectionFullBleed } from "@/components/sections/section-full-bleed";
import { Button } from "@/components/ui/button";
import { ProofCard } from "@/components/sections/proof-card";
import { CtaBlock } from "@/components/sections/cta-block";
import { FaqSection } from "@/components/sections/faq-section";
import { ServiceJsonLd } from "@/components/seo/structured-data";
import { Reveal } from "@/components/motion/reveal";
import { CASE_STUDIES } from "@/content/case-studies-data";
import { COMPANY_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "The Diagnostic — Alchemetryx",
  description: "Two weeks. Know which process is costing you most and what fixing it is worth.",
};

const DIAGNOSTIC_FAQS = [
  {
    question: "How much time does the Diagnostic require from our team?",
    answer:
      "Roughly 3 to 5 hours across the 2-week period. We shadow the specific staff members running the process, conduct two 45-minute interviews, and analyze workflow records without disrupting your day-to-day business.",
  },
  {
    question: "What happens if the Diagnostic finds automation is not commercially viable?",
    answer:
      "We tell you plainly. If automating the bottleneck will not deliver a positive return on investment, we document that finding and recommend against commissioning a build. You retain the full workflow audit and cost calculation.",
  },
  {
    question: "Do we need to grant live production database credentials?",
    answer:
      "No. During the Diagnostic, read-only access, sample data exports, or screen-share walk-throughs are completely sufficient. Production credentials are only configured after a formal build blueprint is agreed.",
  },
];

export default function DiagnosticPage() {
  const proofStudy = CASE_STUDIES.find((cs) => cs.slug === "care-rota")!;

  return (
    <div className="flex flex-col w-full">
      <ServiceJsonLd
        name="The Diagnostic"
        description="Two weeks. Know which process is costing you most and what fixing it is worth."
        serviceType="Business Process Audit & Automation Architecture"
        url="https://alchemetryx.com/diagnostic"
      />

      {/* 1. Hero: Sapphire */}
      <SectionFullBleed tone="dark" className="pt-24 pb-20 md:pt-32 md:pb-28">
        <div className="max-w-[850px] space-y-8">
          <div className="inline-block px-3 py-1 rounded-[6px] bg-[var(--color-sapphire-raised)] border border-[var(--color-sapphire-line)] text-xs font-mono text-[var(--color-gold)]">
            Service 01 · 2 Weeks
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-[72px] font-light tracking-[-0.04em] text-[var(--color-pearl)] leading-[1.02]">
            The Diagnostic
          </h1>
          <p className="text-xl sm:text-2xl font-light text-[var(--color-pearl)]/90 leading-snug">
            Know which process is costing you most, and what fixing it is worth.
          </p>
          <div className="pt-2">
            <Button asChild variant="primary" size="lg">
              <Link href={COMPANY_INFO.primaryCtaHref}>
                {COMPANY_INFO.primaryCtaLabel}
              </Link>
            </Button>
          </div>
        </div>
      </SectionFullBleed>

      {/* 2. What it is: Pearl */}
      <Reveal>
        <SectionFullBleed tone="light">
          <div className="space-y-12">
            <div className="space-y-4 max-w-[700px]">
              <p className="text-xs font-normal uppercase tracking-wider text-[var(--color-gold-deep)]">
                The Process
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-[-0.04em] text-[var(--color-ink)]">
                What happens, in order
              </h2>
              <p className="text-base text-[var(--color-ink)]/80 max-w-[65ch]">
                A structured two-week audit of your everyday business tasks. We work directly alongside your team to measure reality rather than assumptions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-[9px] bg-white border border-[var(--color-pearl-line)] space-y-3">
                <span className="text-xs font-mono text-[var(--color-slate)]">01 / Intake</span>
                <h3 className="text-xl font-light text-[var(--color-ink)]">Workflow Mapping</h3>
                <p className="text-sm text-[var(--color-ink)]/75 leading-relaxed">
                  We shadow the staff running your rota, invoicing, or client onboarding. Every handoff, spreadsheet entry, and verification step is documented.
                </p>
              </div>
              <div className="p-6 rounded-[9px] bg-white border border-[var(--color-pearl-line)] space-y-3">
                <span className="text-xs font-mono text-[var(--color-slate)]">02 / Accounting</span>
                <h3 className="text-xl font-light text-[var(--color-ink)]">Hours & Cost Audit</h3>
                <p className="text-sm text-[var(--color-ink)]/75 leading-relaxed">
                  We tally the exact hours spent every week on administrative tasks, error correction, and manual chasing, quantifying the real cost in pounds or rupees.
                </p>
              </div>
              <div className="p-6 rounded-[9px] bg-white border border-[var(--color-pearl-line)] space-y-3">
                <span className="text-xs font-mono text-[var(--color-slate)]">03 / Engineering</span>
                <h3 className="text-xl font-light text-[var(--color-ink)]">System Blueprint</h3>
                <p className="text-sm text-[var(--color-ink)]/75 leading-relaxed">
                  We design the exact architecture to make the workflow run on its own: webhook triggers, database integrations, validation rules, and human check points.
                </p>
              </div>
              <div className="p-6 rounded-[9px] bg-white border border-[var(--color-pearl-line)] space-y-3">
                <span className="text-xs font-mono text-[var(--color-slate)]">04 / Delivery</span>
                <h3 className="text-xl font-light text-[var(--color-ink)]">Commercial Decision</h3>
                <p className="text-sm text-[var(--color-ink)]/75 leading-relaxed">
                  You receive a clear technical specification with guaranteed timelines, fixed delivery scope, and calculated return on investment before commissioning build work.
                </p>
              </div>
            </div>
          </div>
        </SectionFullBleed>
      </Reveal>

      {/* 3. Two Framings (Side by side): Pearl */}
      <Reveal>
        <SectionFullBleed tone="light" className="pt-0 md:pt-0">
          <div className="space-y-12">
            <div className="space-y-4 max-w-[700px]">
              <p className="text-xs font-normal uppercase tracking-wider text-[var(--color-gold-deep)]">
                Two Starting Situations
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-[-0.04em] text-[var(--color-ink)]">
                What the Diagnostic solves for your situation
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 rounded-[9px] bg-white border border-[var(--color-pearl-line)] space-y-4">
                <div className="inline-block px-2.5 py-1 rounded-[6px] bg-[var(--color-pearl)] text-[var(--color-gold-deep)] text-xs font-mono">
                  Adoption · Have not bought AI yet
                </div>
                <h3 className="text-2xl font-light tracking-[-0.02em] text-[var(--color-ink)]">
                  Find the one process costing you most
                </h3>
                <p className="text-base text-[var(--color-ink)]/80 leading-relaxed">
                  Avoid buying subscriptions in search of a problem. We pinpoint the specific workflow where automation pays back immediately, ensuring you never invest in technology your business does not require.
                </p>
              </div>

              <div className="p-8 rounded-[9px] bg-white border border-[var(--color-pearl-line)] space-y-4">
                <div className="inline-block px-2.5 py-1 rounded-[6px] bg-[var(--color-pearl)] text-[var(--color-gold-deep)] text-xs font-mono">
                  Usage · Already bought AI tools
                </div>
                <h3 className="text-2xl font-light tracking-[-0.02em] text-[var(--color-ink)]">
                  Audit what your AI spend actually returned
                </h3>
                <p className="text-base text-[var(--color-ink)]/80 leading-relaxed">
                  You already pay for user seats and software licenses. We audit whether staff are actually using them, calculate how many hours are actually saved, and show how to turn disconnected tools into a single working system.
                </p>
              </div>
            </div>
          </div>
        </SectionFullBleed>
      </Reveal>

      {/* 4. What you get: Pearl */}
      <Reveal>
        <SectionFullBleed tone="light" className="pt-0 md:pt-0">
          <div className="p-8 sm:p-12 rounded-[9px] bg-white border border-[var(--color-pearl-line)] space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--color-pearl-line)] pb-6">
              <div>
                <p className="text-xs font-normal uppercase tracking-wider text-[var(--color-gold-deep)]">
                  Deliverables & Timeline
                </p>
                <h3 className="text-2xl sm:text-3xl font-light text-[var(--color-ink)]">
                  What you receive
                </h3>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-xs text-[var(--color-slate)] uppercase tracking-wider block">
                  Timeframe
                </span>
                <span className="text-2xl font-light text-[var(--color-ink)]">2 Weeks</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-[var(--color-ink)]/85">
              <div className="space-y-2">
                <h4 className="font-normal text-[var(--color-ink)]">1. Workflow Friction Map</h4>
                <p className="leading-relaxed text-[var(--color-ink)]/75">
                  Complete documentation of the selected process, identifying manual touchpoints, verification delays, and integration failures.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-normal text-[var(--color-ink)]">2. Quantitative Cost & Hours Calculation</h4>
                <p className="leading-relaxed text-[var(--color-ink)]/75">
                  An exact accounting of hours lost weekly, salary spend allocated to manual busywork, and financial cost of delayed turnaround.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-normal text-[var(--color-ink)]">3. Technical Architecture Blueprint</h4>
                <p className="leading-relaxed text-[var(--color-ink)]/75">
                  Full engineering specification detailing data schemas, API connections, automated rules, and human-in-the-loop fallback procedures.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-normal text-[var(--color-ink)]">4. Commercial Business Case</h4>
                <p className="leading-relaxed text-[var(--color-ink)]/75">
                  Projected return on investment, implementation timeline, and exact scope for The Build phase.
                </p>
              </div>
            </div>
          </div>
        </SectionFullBleed>
      </Reveal>

      {/* 5. Proof: Pearl */}
      <Reveal>
        <SectionFullBleed tone="light" className="pt-0 md:pt-0">
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-xs font-normal uppercase tracking-wider text-[var(--color-gold-deep)]">
                Related Proof
              </p>
              <h3 className="text-2xl font-light text-[var(--color-ink)]">
                Case study from our work
              </h3>
            </div>
            <div className="max-w-[600px]">
              <ProofCard study={proofStudy} />
            </div>
          </div>
        </SectionFullBleed>
      </Reveal>

      {/* 6. FAQ Block: Pearl */}
      <Reveal>
        <FaqSection
          title="Diagnostic questions answered"
          subtitle="Common questions regarding what the audit covers, staff time requirements, and final deliverables."
          items={DIAGNOSTIC_FAQS}
        />
      </Reveal>

      {/* 7. CTA: Sapphire */}
      <Reveal>
        <CtaBlock
          headline="Find the process costing your business most."
          subhead="Book a 30-minute call to discuss your current workflows and see if a Diagnostic makes sense."
        />
      </Reveal>
    </div>
  );
}
