"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SectionFullBleed } from "@/components/sections/section-full-bleed";
import { Reveal } from "@/components/motion/reveal";
import { CARE_ROTA } from "@/content/case-studies";
import { COMPANY } from "@/lib/constants";

export default function ProofCareRotaPage() {
  const cs = CARE_ROTA;
  const [activeImage, setActiveImage] = useState<(typeof cs.build.items)[0] | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  // Manage keyboard focus and body overflow when dialog is opened/closed
  useEffect(() => {
    if (!activeImage) return;

    // Capture existing inline overflow value and set to hidden
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Move focus to Close button when opened
    const timer = setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 50);

    // Trap Tab and Shift+Tab among dialog controls and close on Escape
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveImage(null);
        return;
      }
      if (e.key === "Tab") {
        if (!dialogRef.current) return;
        const focusableElements = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
      // Restore focus to the triggering image button
      triggerRef.current?.focus();
    };
  }, [activeImage]);

  return (
    <SectionFullBleed id="proof" tone="light" className="pt-24 md:pt-28 border-t border-[var(--color-pearl-line)]">
      <Reveal>
        <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold-deep)] mb-6">
          Case study · Care operations
        </p>
        <h2 className="text-[clamp(2.25rem,4.5vw,3.75rem)] font-light leading-[1.08] tracking-[-0.035em] text-[var(--color-ink)] max-w-[24ch]">
          A care home's rota lived in a spreadsheet. We rebuilt it as a system.
        </h2>
        <p className="mt-6 max-w-[60ch] text-lg md:text-xl font-normal leading-relaxed text-[var(--color-ink)]">
          How a fragmented monthly roster for a UK care home became one place to plan shifts, watch cost, and stay compliant.
        </p>
        <p className="mt-4 text-sm font-normal text-[var(--color-ink)]/70">
          Built by Alchemetryx · Real UK care home · Site and staff names anonymised
        </p>
      </Reveal>

      {/* The before */}
      <Reveal delay={0.1}>
        <div className="mt-16 max-w-[65ch]">
          <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-gold-deep)] font-normal">
            01 / The before
          </p>
          <h3 className="mt-3 text-2xl sm:text-3xl font-normal text-[var(--color-ink)] tracking-[-0.02em]">
            Five tabs, and a lot of trust.
          </h3>
          <p className="mt-4 text-base md:text-lg font-normal leading-relaxed text-[var(--color-ink)]">
            The home planned every month in one shared Excel file. Five tabs, one per area. Staff were typed into a grid by hand, week after week stretched across ninety columns, and the file was updated whenever someone remembered.
          </p>
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {cs.before.points.map((p) => (
            <div
              key={p.label}
              className="rounded-md border border-[var(--color-pearl-line)] p-6 bg-[var(--color-pearl)] flex flex-col justify-between"
            >
              <p className="text-base font-normal text-[var(--color-ink)] tracking-[-0.01em]">{p.label}</p>
              <p className="mt-3 text-sm md:text-base font-normal leading-relaxed text-[var(--color-ink)]/80">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </Reveal>

      {/* The build */}
      <Reveal delay={0.1}>
        <div className="mt-20 max-w-[65ch]">
          <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-gold-deep)] font-normal">
            02 / The build
          </p>
          <h3 className="mt-3 text-2xl sm:text-3xl font-normal text-[var(--color-ink)] tracking-[-0.02em]">
            One system that understands a care home.
          </h3>
          <p className="mt-4 text-base md:text-lg font-normal leading-relaxed text-[var(--color-ink)]">
            Not a generic scheduler. A tool shaped around how a care home actually runs: floors, bank staff, statutory leave and a live budget. Built and hosted by Alchemetryx.
          </p>
        </div>
      </Reveal>

      <div className="mt-12 space-y-16">
        {cs.build.items.map((item, i) => (
          <Reveal key={item.title} delay={i * 0.05}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-4">
                <h4 className="text-xl sm:text-2xl font-normal text-[var(--color-ink)] tracking-[-0.02em]">
                  {item.title}
                </h4>
                <p className="mt-3 text-sm md:text-base font-normal leading-relaxed text-[var(--color-ink)]/85 max-w-[42ch]">
                  {item.caption}
                </p>
              </div>
              <div className="lg:col-span-8">
                <button
                  type="button"
                  onClick={(e) => {
                    triggerRef.current = e.currentTarget;
                    setActiveImage(item);
                  }}
                  aria-label={`Expand and inspect ${item.title}`}
                  className="group relative block w-full overflow-hidden rounded-md border border-[var(--color-pearl-line)] bg-[var(--color-sapphire)] cursor-zoom-in text-left focus-visible:outline-2 focus-visible:outline-[var(--color-gold)]"
                >
                  <Image
                    src={item.image}
                    alt={item.alt}
                    width={1500}
                    height={979}
                    className="w-full h-auto"
                    sizes="(max-width: 1024px) 100vw, 66vw"
                  />
                  <div className="absolute bottom-3 right-3 rounded-full bg-[var(--color-sapphire)]/85 px-3 py-1 text-xs text-[var(--color-pearl)] opacity-0 backdrop-blur-md transition-opacity duration-200 group-hover:opacity-100 flex items-center gap-1.5 border border-[var(--color-sapphire-line)]">
                    <svg
                      className="w-3.5 h-3.5 text-[var(--color-gold)]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <circle cx="11" cy="11" r="7" />
                      <path d="M21 21l-4.35-4.35" />
                    </svg>
                    <span>Click to inspect</span>
                  </div>
                </button>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* The honesty block — Two-column block */}
      <Reveal delay={0.1}>
        <div className="mt-20 md:mt-24 border-t border-[var(--color-pearl-line)] pt-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-5">
              <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-gold-deep)] font-normal">
                What this is, and what it isn't — "A capability build, not a savings headline."
              </p>
              <h3 className="mt-3 text-2xl sm:text-3xl font-normal text-[var(--color-ink)] tracking-[-0.025em] leading-snug">
                {cs.honesty.heading}
              </h3>
              <p className="mt-6 text-lg sm:text-xl font-normal text-[var(--color-ink)]">
                If your rota still lives in a spreadsheet, that is a conversation worth having.
              </p>
              <div className="mt-8">
                <Button asChild variant="primary" size="lg">
                  <Link href={COMPANY.primaryCtaHref}>
                    {COMPANY.primaryCtaLabel}
                  </Link>
                </Button>
              </div>
            </div>
            <div className="lg:col-span-7">
              <p className="text-base sm:text-lg font-normal leading-relaxed text-[var(--color-ink)]">
                {cs.honesty.body}
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    
    {/* Lightbox Modal for 1:1 image inspection */}
    {activeImage && (
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={activeImage.title}
        onClick={() => setActiveImage(null)}
        className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-sapphire)]/90 backdrop-blur-md p-4 sm:p-6 md:p-10 cursor-zoom-out"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-6xl w-full bg-[var(--color-sapphire-raised)] rounded-lg border border-[var(--color-gold)]/40 p-4 sm:p-6 shadow-2xl overflow-hidden cursor-default"
        >
          <div className="flex items-center justify-between pb-4 border-b border-[var(--color-sapphire-line)]">
            <div>
              <h4 className="text-lg sm:text-xl font-light text-[var(--color-pearl)]">
                {activeImage.title}
              </h4>
              <p className="text-xs sm:text-sm text-[var(--color-slate)] mt-1">
                CareRota Live Screenshot (Real system UI)
              </p>
            </div>
            <button
              ref={closeBtnRef}
              type="button"
              onClick={() => setActiveImage(null)}
              aria-label="Close dialog"
              className="text-xs uppercase tracking-wider text-[var(--color-slate)] hover:text-[var(--color-pearl)] px-3 py-1.5 rounded border border-[var(--color-sapphire-line)] hover:border-[var(--color-gold)] transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
            >
              Close [Esc]
            </button>
          </div>
          <div className="mt-4 overflow-auto max-h-[75vh] rounded border border-[var(--color-sapphire-line)]/50">
            <Image
              src={activeImage.image}
              alt={activeImage.alt}
              width={1800}
              height={1175}
              className="w-full h-auto"
              priority
            />
            <p className="mt-4 text-xs sm:text-sm text-[var(--color-slate)] leading-relaxed">
              {activeImage.caption}
            </p>
          </div>
        </div>
      </div>
    )}
    </SectionFullBleed>
  );
}