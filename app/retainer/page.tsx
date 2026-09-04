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
  title: "The Retainer — Alchemetryx",
  description: "It keeps running, and you can see that it does.",
};

const RETAINER_FAQS = [
  {
    question: "What is your response time SLA for critical workflow issues?",
    answer:
      "Our retainer guarantees priority engineer response. If an external API changes or a system exception occurs, we diagnose and apply hotfixes immediately to prevent business disruption.",
  },
  {
    question: "Can we use retainer capacity to automate adjacent processes?",
    answer:
      "Yes. Once your core system is rock-solid, included monthly engineering hours are allocated to analyzing, designing, and automating the next highest-cost bottleneck in your business.",
  },
  {
    question: "Are we locked into an annual contract?",
    answer:
      "No. The Retainer runs on transparent monthly terms with 30 days notice. We earn our place every month by keeping systems reliable and delivering documented hours saved.",
  },
];

export default function RetainerPage() {
  const proofStudy = CASE_STUDIES.find((cs) => cs.slug === "care-rota")!;

  return (
    <div className="flex flex-col w-full">
      <ServiceJsonLd
        name="The Retainer"
        description="It keeps running, and you can see that it does."
        serviceType="Ongoing Systems Monitoring, SLA & Process Optimization"
        url="https://alchemetryx.com/retainer"
      />

      {/* 1. Hero: Sapphire */}
      <SectionFullBleed tone="dark" className="pt-24 pb-20 md:pt-32 md:pb-28">
        <Reveal>
          <div className="max-w-[850px] space-y-8">
            <div className="inline-block px-3 py-1 rounded-[6px] bg-[var(--color-sapphire-raised)] border border-[var(--color-sapphire-line)] text-xs font-mono text-[var(--color-gold)]">
              Service 03 · Monthly Retainer
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-[72px] font-light tracking-[-0.04em] text-[var(--color-pearl)] leading-[1.02]">
              The Retainer
            </h1>
            <p className="text-xl sm:text-2xl font-light text-[var(--color-pearl)]/90 leading-snug">
              It keeps running, and you can see that it does.
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
                The Retainer Scope
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-[-0.04em] text-[var(--color-ink)]">
                Continuous maintenance and expansion
              </h2>
              <p className="text-base text-[var(--color-ink)]/80 max-w-[65ch]">
                Software workflows break when third-party APIs update, regulatory rules change, or business volumes scale. We ensure your systems remain durable, verified, and continuously improved.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Reveal delay={0.05}>
              <div className="p-6 rounded-[9px] bg-white border border-[var(--color-pearl-line)] space-y-3 h-full">
                <span className="text-xs font-mono text-[var(--color-slate)]">01 / Telemetry</span>
                <h3 className="text-xl font-light text-[var(--color-ink)]">Uptime & Monitoring</h3>
                <p className="text-sm text-[var(--color-ink)]/75 leading-relaxed">
                  24/7 automated monitoring of API endpoints, database synchronization, and workflow queues to catch anomalies immediately.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="p-6 rounded-[9px] bg-white border border-[var(--color-pearl-line)] space-y-3 h-full">
                <span className="text-xs font-mono text-[var(--color-slate)]">02 / Maintenance</span>
                <h3 className="text-xl font-light text-[var(--color-ink)]">Proactive Patching</h3>
                <p className="text-sm text-[var(--color-ink)]/75 leading-relaxed">
                  When external vendors change their webhook payloads or authentication methods, we update the codebase before disruption occurs.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="p-6 rounded-[9px] bg-white border border-[var(--color-pearl-line)] space-y-3 h-full">
                <span className="text-xs font-mono text-[var(--color-slate)]">03 / Optimization</span>
                <h3 className="text-xl font-light text-[var(--color-ink)]">Throughput Tuning</h3>
                <p className="text-sm text-[var(--color-ink)]/75 leading-relaxed">
                  We review system logs monthly, reduce unnecessary processing overhead, optimize execution speeds, and eliminate latency.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="p-6 rounded-[9px] bg-white border border-[var(--color-pearl-line)] space-y-3 h-full">
                <span className="text-xs font-mono text-[var(--color-slate)]">04 / Growth</span>
                <h3 className="text-xl font-light text-[var(--color-ink)]">Next Bottlenecks</h3>
                <p className="text-sm text-[var(--color-ink)]/75 leading-relaxed">
                  Dedicated monthly engineering capacity to connect adjacent workflows and automate subsequent administrative tasks.
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
                What the Retainer ensures over time
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Reveal delay={0.05}>
              <div className="p-8 rounded-[9px] bg-white border border-[var(--color-pearl-line)] space-y-4 h-full">
                <div className="inline-block px-2.5 py-1 rounded-[6px] bg-[var(--color-pearl)] text-[var(--color-gold-deep)] text-xs font-mono">
                  Adoption · Level 1
                </div>
                <h3 className="text-2xl font-light tracking-[-0.02em] text-[var(--color-ink)]">
                  Keep it running and add the next one
                </h3>
                <p className="text-base text-[var(--color-ink)]/80 leading-relaxed">
                  Protect the process you rebuilt. We guarantee high uptime and error resolution so you never revert to manual spreadsheets, while methodically scoping and automating your next administrative bottleneck.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="p-8 rounded-[9px] bg-white border border-[var(--color-pearl-line)] space-y-4 h-full">
                <div className="inline-block px-2.5 py-1 rounded-[6px] bg-[var(--color-pearl)] text-[var(--color-gold-deep)] text-xs font-mono">
                  Usage · Level 2
                </div>
                <h3 className="text-2xl font-light tracking-[-0.02em] text-[var(--color-ink)]">
                  Keep measuring, keep tuning
                </h3>
                <p className="text-base text-[var(--color-ink)]/80 leading-relaxed">
                  Prevent workflow decay. We monitor real usage metrics, tune automated classifications against edge cases, and ensure your team consistently relies on the system rather than building shadow manual habits.
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
                  Deliverables & Commitment
                </p>
                <h3 className="text-2xl sm:text-3xl font-light text-[var(--color-ink)]">
                  What is included every month
                </h3>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-xs text-[var(--color-slate)] uppercase tracking-wider block">
                  Cadence
                </span>
                <span className="text-2xl font-light text-[var(--color-ink)]">Monthly</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-[var(--color-ink)]/85">
              <div className="space-y-2">
                <h4 className="font-normal text-[var(--color-ink)]">1. Guaranteed Uptime SLA</h4>
                <p className="leading-relaxed text-[var(--color-ink)]/75">
                  Priority engineer response on any workflow failure or integration exception within agreed business hours.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-normal text-[var(--color-ink)]">2. Monthly Performance & Hours Audit</h4>
                <p className="leading-relaxed text-[var(--color-ink)]/75">
                  Transparent monthly accounting showing system throughput, exceptions handled, and confirmed hours saved.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-normal text-[var(--color-ink)]">3. Ongoing API & Dependency Maintenance</h4>
                <p className="leading-relaxed text-[var(--color-ink)]/75">
                  Proactive adjustments to schema changes, provider rate limits, and authentication updates.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-normal text-[var(--color-ink)]">4. Continuous Workflow Enhancements</h4>
                <p className="leading-relaxed text-[var(--color-ink)]/75">
                  Dedicated engineering capacity allocated to adjusting rules, adding notification channels, or automating adjacent tasks.
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
                Ongoing system stability
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
        title="Retainer questions answered"
        subtitle="Details on response SLAs, capacity allocation, and contract terms."
        items={RETAINER_FAQS}
      />

      {/* 7. CTA: Sapphire */}
      <CtaBlock
        headline="It keeps running, and you can see that it does."
        subhead="Book a 30-minute call to discuss your ongoing systems support and maintenance requirements."
      />
    </div>
  );
}
