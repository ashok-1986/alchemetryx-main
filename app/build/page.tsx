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
  title: "The Build — Alchemetryx",
  description: "We rebuild the process so it runs without you. Four to eight weeks.",
};

const BUILD_FAQS = [
  {
    question: "Do our staff need technical or programming experience to run the system?",
    answer:
      "No. The system operates autonomously in the background. We build clean operator dashboards where your team can review exceptions, approve actions, or adjust settings with simple visual controls.",
  },
  {
    question: "How do you ensure the automated system will not make errors?",
    answer:
      "We build deterministic validation rules and execute shadow testing. The automated system runs in parallel with your manual process on live transactions until we confirm 100% accuracy before production cutover.",
  },
  {
    question: "Who owns the code and system architecture once built?",
    answer:
      "You do. Everything is constructed directly inside your company cloud accounts, databases, and software environments. You retain 100% intellectual property ownership of your systems, code, and documentation.",
  },
];

export default function BuildPage() {
  const proofStudy = CASE_STUDIES.find((cs) => cs.slug === "fitosys")!;

  return (
    <div className="flex flex-col w-full">
      <ServiceJsonLd
        name="The Build"
        description="We rebuild the process so it runs without you. Four to eight weeks."
        serviceType="Custom Process Automation & Systems Engineering"
        url="https://alchemetryx.com/build"
      />

      {/* 1. Hero: Sapphire */}
      <SectionFullBleed tone="dark" className="pt-24 pb-20 md:pt-32 md:pb-28">
        <Reveal>
          <div className="max-w-[850px] space-y-8">
            <div className="inline-block px-3 py-1 rounded-[6px] bg-[var(--color-sapphire-raised)] border border-[var(--color-sapphire-line)] text-xs font-mono text-[var(--color-gold)]">
              Service 02 · 4 to 8 Weeks
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-[72px] font-light tracking-[-0.04em] text-[var(--color-pearl)] leading-[1.02]">
              The Build
            </h1>
            <p className="text-xl sm:text-2xl font-light text-[var(--color-pearl)]/90 leading-snug">
              The process runs on its own.
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

      {/* 2. What it is: Pearl */}
      <SectionFullBleed tone="light">
        <div className="space-y-12">
          <Reveal>
            <div className="space-y-4 max-w-[700px]">
              <p className="text-xs font-normal uppercase tracking-wider text-[var(--color-gold-deep)]">
                The Engineering
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-[-0.04em] text-[var(--color-ink)]">
                How the build is executed
              </h2>
              <p className="text-base text-[var(--color-ink)]/80 max-w-[65ch]">
                We build directly inside your environment. No third-party lock-in, no generic templates. Custom integrations built on verified deterministic code.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Reveal delay={0.05}>
              <div className="p-6 rounded-[9px] bg-white border border-[var(--color-pearl-line)] space-y-3 h-full">
                <span className="text-xs font-mono text-[var(--color-slate)]">01 / Foundation</span>
                <h3 className="text-xl font-light text-[var(--color-ink)]">API & Database Links</h3>
                <p className="text-sm text-[var(--color-ink)]/75 leading-relaxed">
                  We establish secure connections across your software stack (CRM, accounting, custom databases, messaging channels).
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="p-6 rounded-[9px] bg-white border border-[var(--color-pearl-line)] space-y-3 h-full">
                <span className="text-xs font-mono text-[var(--color-slate)]">02 / Construction</span>
                <h3 className="text-xl font-light text-[var(--color-ink)]">Deterministic Logic</h3>
                <p className="text-sm text-[var(--color-ink)]/75 leading-relaxed">
                  We build the automation rules, data transformers, and validation layers. AI models are applied only where unstructured text or decision tasks demand it.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="p-6 rounded-[9px] bg-white border border-[var(--color-pearl-line)] space-y-3 h-full">
                <span className="text-xs font-mono text-[var(--color-slate)]">03 / Verification</span>
                <h3 className="text-xl font-light text-[var(--color-ink)]">Shadow Validation</h3>
                <p className="text-sm text-[var(--color-ink)]/75 leading-relaxed">
                  The automated system runs concurrently with your manual process on live transactions to prove 100% accuracy before taking over.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="p-6 rounded-[9px] bg-white border border-[var(--color-pearl-line)] space-y-3 h-full">
                <span className="text-xs font-mono text-[var(--color-slate)]">04 / Cutover</span>
                <h3 className="text-xl font-light text-[var(--color-ink)]">Production Handover</h3>
                <p className="text-sm text-[var(--color-ink)]/75 leading-relaxed">
                  Live cutover with zero downtime. Your staff are trained on telemetry dashboards, exception approvals, and system controls.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </SectionFullBleed>

      {/* 3. Two Framings: Pearl */}
      <SectionFullBleed tone="light" className="pt-0 md:pt-0">
        <div className="space-y-12">
          <Reveal>
            <div className="space-y-4 max-w-[700px]">
              <p className="text-xs font-normal uppercase tracking-wider text-[var(--color-gold-deep)]">
                Two Starting Situations
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-[-0.04em] text-[var(--color-ink)]">
                What the Build accomplishes for your business
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Reveal delay={0.05}>
              <div className="p-8 rounded-[9px] bg-white border border-[var(--color-pearl-line)] space-y-4 h-full">
                <div className="inline-block px-2.5 py-1 rounded-[6px] bg-[var(--color-pearl)] text-[var(--color-gold-deep)] text-xs font-mono">
                  Adoption · Have not bought AI yet
                </div>
                <h3 className="text-2xl font-light tracking-[-0.02em] text-[var(--color-ink)]">
                  Make that process run without you
                </h3>
                <p className="text-base text-[var(--color-ink)]/80 leading-relaxed">
                  Take the single highest-friction process identified in your business and turn it into a self-running system. You reclaim hours of daily administration and eliminate human scheduling or invoicing errors.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="p-8 rounded-[9px] bg-white border border-[var(--color-pearl-line)] space-y-4 h-full">
                <div className="inline-block px-2.5 py-1 rounded-[6px] bg-[var(--color-pearl)] text-[var(--color-gold-deep)] text-xs font-mono">
                  Usage · Already bought AI tools
                </div>
                <h3 className="text-2xl font-light tracking-[-0.02em] text-[var(--color-ink)]">
                  Rebuild the tool into a working system
                </h3>
                <p className="text-base text-[var(--color-ink)]/80 leading-relaxed">
                  Replace copy-pasting into chat interfaces with production software. We connect your existing subscriptions and custom AI prompts directly to your database and notification channels so staff no longer have to babysit the process.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </SectionFullBleed>

      {/* 4. What you get: Pearl */}
      <SectionFullBleed tone="light" className="pt-0 md:pt-0">
        <Reveal>
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
                <span className="text-2xl font-light text-[var(--color-ink)]">4 to 8 Weeks</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-[var(--color-ink)]/85">
              <div className="space-y-2">
                <h4 className="font-normal text-[var(--color-ink)]">1. Production-Ready System</h4>
                <p className="leading-relaxed text-[var(--color-ink)]/75">
                  Fully functional automation running directly inside your cloud or on-premise accounts with documented access credentials.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-normal text-[var(--color-ink)]">2. Error Handling & Human Override</h4>
                <p className="leading-relaxed text-[var(--color-ink)]/75">
                  Configured alerting that routes edge cases and unusual requests to human operators with one-click resolution.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-normal text-[var(--color-ink)]">3. Telemetry & Metric Dashboard</h4>
                <p className="leading-relaxed text-[var(--color-ink)]/75">
                  A live dashboard displaying throughput, execution time, error rates, and measured hours saved every week.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-normal text-[var(--color-ink)]">4. Team Handover & Documentation</h4>
                <p className="leading-relaxed text-[var(--color-ink)]/75">
                  Step-by-step operational documentation and hands-on staff training on system management.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </SectionFullBleed>

      {/* 5. Proof: Pearl */}
      <SectionFullBleed tone="light" className="pt-0 md:pt-0">
        <Reveal>
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-xs font-normal uppercase tracking-wider text-[var(--color-gold-deep)]">
                Related Proof
              </p>
              <h3 className="text-2xl font-light text-[var(--color-ink)]">
                Delivered build in production
              </h3>
            </div>
            <div className="max-w-[600px]">
              <ProofCard study={proofStudy} />
            </div>
          </div>
        </Reveal>
      </SectionFullBleed>

      {/* 6. FAQ Block: Pearl */}
      <FaqSection
        title="Build questions answered"
        subtitle="Key questions about engineering timelines, ownership, and testing standards."
        items={BUILD_FAQS}
      />

      {/* 7. CTA: Sapphire */}
      <CtaBlock
        headline="Make that process run without you."
        subhead="Book a 30-minute call to discuss your build requirements and review delivery timeframes."
      />
    </div>
  );
}
