import type { Metadata } from "next";
import Link from "next/link";
import { SectionFullBleed } from "@/components/sections/section-full-bleed";
import { Button } from "@/components/ui/button";
import { ProofCard } from "@/components/sections/proof-card";
import { CtaBlock } from "@/components/sections/cta-block";
import { Reveal } from "@/components/motion/reveal";
import { CASE_STUDIES } from "@/content/case-studies-data";
import { MANDATES } from "@/content/mandates";
import { COMPANY_INFO } from "@/lib/constants";
import { AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Alchemetryx India — e-invoicing from 1 April 2026",
  description: "The GST e-invoicing threshold drops to ₹5 Cr. Your invoice systems need to be ready.",
};

export default function IndiaPage() {
  const fitosysStudy = CASE_STUDIES.find((cs) => cs.slug === "fitosys")!;
  const indiaMandate = MANDATES.find((m) => m.id === "in-e-invoicing")!;

  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero: Sapphire */}
      <SectionFullBleed tone="dark" className="pt-24 pb-20 md:pt-32 md:pb-28">
        <Reveal>
          <div className="max-w-[850px] space-y-8">
            <div className="inline-block px-3 py-1 rounded-[6px] bg-[var(--color-sapphire-raised)] border border-[var(--color-sapphire-line)] text-xs font-mono text-[var(--color-gold)]">
              Alchemetryx India · Regulatory Readiness
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-[72px] font-light tracking-[-0.04em] text-[var(--color-pearl)] leading-[1.02]">
              GST e-Invoicing ₹5 Cr Threshold
            </h1>
            <p className="text-xl sm:text-2xl font-light text-[var(--color-pearl)]/90 leading-snug">
              The 30-day IRP reporting requirement makes manual invoice generation and reconciliation a direct compliance risk for growing Indian businesses.
            </p>
            <div className="pt-2">
              <Button asChild variant="primary" size="lg">
                <Link href={`${COMPANY_INFO.primaryCtaHref}?region=IN`}>
                  {COMPANY_INFO.primaryCtaLabel}
                </Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </SectionFullBleed>

      {/* Regulatory Verification Banner (FR-8 Gating transparency) */}
      {!indiaMandate.published ? (
        <aside className="w-full bg-[var(--color-sapphire-raised)] border-b border-[var(--color-sapphire-line)] py-3">
          <div className="max-w-[1200px] mx-auto px-6 sm:px-8 flex items-center gap-3 text-xs text-[var(--color-slate)]">
            <AlertCircle className="h-4 w-4 text-[var(--color-gold)] shrink-0" />
            <span>
              <strong>Regulatory Notice:</strong> The ₹5 Cr threshold implementation timeline (effective {indiaMandate.date}) is undergoing final CBIC notification number verification with tax counsel before formal public deployment.
            </span>
          </div>
        </aside>
      ) : null}

      {/* 2. The Deadline: Pearl */}
      <SectionFullBleed tone="light">
        <div className="space-y-12">
          <Reveal>
            <div className="space-y-4 max-w-[700px]">
              <p className="text-xs font-normal uppercase tracking-wider text-[var(--color-gold-deep)]">
                Statutory Requirement
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-[-0.04em] text-[var(--color-ink)]">
                What the mandate requires
              </h2>
              <p className="text-base text-[var(--color-ink)]/80 max-w-[65ch]">
                Indian businesses with aggregate turnover exceeding ₹5 Crore face mandatory electronic invoicing through the Invoice Registration Portal (IRP).
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Reveal delay={0.05}>
              <div className="p-8 rounded-[9px] bg-white border border-[var(--color-pearl-line)] space-y-3 h-full">
                <span className="text-xs font-mono text-[var(--color-gold-deep)]">Requirement 01</span>
                <h3 className="text-2xl font-light text-[var(--color-ink)]">30-Day Reporting Rule</h3>
                <p className="text-sm text-[var(--color-ink)]/75 leading-relaxed">
                  Invoices must be reported to the IRP within 30 days of the invoice date. Late filings reject input tax credit (ITC) claims for your corporate clients.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="p-8 rounded-[9px] bg-white border border-[var(--color-pearl-line)] space-y-3 h-full">
                <span className="text-xs font-mono text-[var(--color-gold-deep)]">Requirement 02</span>
                <h3 className="text-2xl font-light text-[var(--color-ink)]">Real-Time IRN & QR</h3>
                <p className="text-sm text-[var(--color-ink)]/75 leading-relaxed">
                  Every B2B tax invoice and credit note must carry a verified Invoice Reference Number (IRN) and signed QR code generated directly by the government portal.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="p-8 rounded-[9px] bg-white border border-[var(--color-pearl-line)] space-y-3 h-full">
                <span className="text-xs font-mono text-[var(--color-gold-deep)]">Requirement 03</span>
                <h3 className="text-2xl font-light text-[var(--color-ink)]">E-Way Bill Sync</h3>
                <p className="text-sm text-[var(--color-ink)]/75 leading-relaxed">
                  Goods dispatches require automated reconciliation between e-invoicing data and Part-A of e-Way bills to prevent transit delays and penalty detentions.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </SectionFullBleed>

      {/* 3. What We Do About It: Pearl */}
      <SectionFullBleed tone="light" className="pt-0 md:pt-0">
        <div className="space-y-12">
          <Reveal>
            <div className="space-y-4 max-w-[700px]">
              <p className="text-xs font-normal uppercase tracking-wider text-[var(--color-gold-deep)]">
                Automated Architecture
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-[-0.04em] text-[var(--color-ink)]">
                How we automate your invoice compliance
              </h2>
              <p className="text-base text-[var(--color-ink)]/80 max-w-[65ch]">
                We link your current accounting software (Tally, Zoho Books, SAP, custom databases) directly to GSP/IRP APIs so compliance runs silently behind every transaction.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Reveal delay={0.05}>
              <div className="p-8 rounded-[9px] bg-white border border-[var(--color-pearl-line)] space-y-4 h-full">
                <h3 className="text-2xl font-light text-[var(--color-ink)]">
                  The Diagnostic (2 Weeks)
                </h3>
                <p className="text-sm text-[var(--color-ink)]/75 leading-relaxed">
                  We audit your invoice volume, master data integrity (customer GSTINs, HSN codes, tax classifications), and current billing bottlenecks. You receive an exact blueprint for API integration and cutoff readiness.
                </p>
                <div className="pt-2">
                  <Button asChild variant="outline-light" size="sm">
                    <Link href="/diagnostic">Explore The Diagnostic</Link>
                  </Button>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="p-8 rounded-[9px] bg-white border border-[var(--color-pearl-line)] space-y-4 h-full">
                <h3 className="text-2xl font-light text-[var(--color-ink)]">
                  The Build (4 to 8 Weeks)
                </h3>
                <p className="text-sm text-[var(--color-ink)]/75 leading-relaxed">
                  We engineer automated IRP transmission, IRN generation, digital PDF signing, customer dispatch, and ERP ledger synchronization. Your billing staff never leave their primary software.
                </p>
                <div className="pt-2">
                  <Button asChild variant="outline-light" size="sm">
                    <Link href="/build">Explore The Build</Link>
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </SectionFullBleed>

      {/* 4. Proof: Pearl */}
      <SectionFullBleed tone="light" className="pt-0 md:pt-0">
        <Reveal>
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-xs font-normal uppercase tracking-wider text-[var(--color-gold-deep)]">
                India Engineering Proof
              </p>
              <h3 className="text-2xl font-light text-[var(--color-ink)]">
                Automated financial workflows in production
              </h3>
            </div>
            <div className="max-w-[600px]">
              <ProofCard study={fitosysStudy} />
            </div>
          </div>
        </Reveal>
      </SectionFullBleed>

      {/* 5. CTA: Sapphire (Routed to Ashok) */}
      <CtaBlock
        headline="Ensure your billing systems are compliant before the deadline."
        subhead="Book a 30-minute call with Ashok in our Pune/London office to review your GST e-invoicing readiness."
      />
    </div>
  );
}
