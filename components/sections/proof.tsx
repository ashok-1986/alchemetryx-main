"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { SectionFullBleed } from "@/components/sections/section-full-bleed";
import { Reveal } from "@/components/motion/reveal";
import { CARE_ROTA } from "@/content/case-studies";

export function Proof() {
  const cs = CARE_ROTA;
  const [activeImage, setActiveImage] = useState<(typeof cs.build.items)[0] | null>(null);

  // Close lightbox on Escape key
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveImage(null);
      }
    };
    if (activeImage) {
      window.addEventListener("keydown", onKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeImage]);

  return (
    <SectionFullBleed tone="light" className="border-t border-[var(--color-pearl-line)]">
      <Reveal>
        <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold-deep)] mb-6">
          {cs.eyebrow}
        </p>
        <h2 className="text-[clamp(2.25rem,4.5vw,3.75rem)] font-light leading-[1.08] tracking-[-0.035em] text-[var(--color-ink)] max-w-[24ch]">
          {cs.title}
        </h2>
        <p className="mt-6 max-w-[60ch] text-lg md:text-xl font-normal leading-relaxed text-[var(--color-ink)]">
          {cs.standfirst}
        </p>
        <p className="mt-4 text-sm font-normal text-[var(--color-ink)]/70">{cs.attribution}</p>
      </Reveal>

      {/* The before */}
      <Reveal delay={0.1}>
        <div className="mt-16 max-w-[65ch]">
          <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-gold-deep)] font-normal">
            01 / The before
          </p>
          <h3 className="mt-3 text-2xl sm:text-3xl font-normal text-[var(--color-ink)] tracking-[-0.02em]">
            {cs.before.heading}
          </h3>
          <p className="mt-4 text-base md:text-lg font-normal leading-relaxed text-[var(--color-ink)]">
            {cs.before.body}
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
            {cs.build.heading}
          </h3>
          <p className="mt-4 text-base md:text-lg font-normal leading-relaxed text-[var(--color-ink)]">
            {cs.build.body}
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
                  onClick={() => setActiveImage(item)}
                  aria-label={`Expand and inspect ${item.title}`}
                  className="group relative block w-full overflow-hidden rounded-md border border-[var(--color-pearl-line)] bg-[var(--color-sapphire)] cursor-zoom-in text-left focus-visible:outline-2 focus-visible:outline-[var(--color-gold)]"
                >
                  <Image
                    src={item.image}
                    alt={item.alt}
                    width={1500}
                    height={979}
                    className="w-full h-auto transition-transform duration-300 ease-out group-hover:scale-[1.015]"
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

      {/* The honesty block */}
      <Reveal delay={0.1}>
        <div className="mt-20 max-w-[65ch] border-t border-[var(--color-pearl-line)] pt-10">
          <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-gold-deep)] font-normal">
            What this is, and what it isn’t
          </p>
          <h3 className="mt-3 text-2xl sm:text-3xl font-normal text-[var(--color-ink)] tracking-[-0.02em]">
            {cs.honesty.heading}
          </h3>
          <p className="mt-4 text-base md:text-lg font-normal leading-relaxed text-[var(--color-ink)]">
            {cs.honesty.body}
          </p>
          <p className="mt-8 text-lg md:text-xl font-normal text-[var(--color-ink)]">
            If your rota still lives in a spreadsheet, that is a conversation worth having.
          </p>
        </div>
      </Reveal>

      {/* Lightbox Modal for 1:1 image inspection */}
      {activeImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeImage.title}
          onClick={() => setActiveImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-sapphire)]/90 backdrop-blur-md p-4 sm:p-6 md:p-10 cursor-zoom-out animate-[fadeIn_150ms_ease-out]"
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
                type="button"
                onClick={() => setActiveImage(null)}
                aria-label="Close modal"
                className="text-xs uppercase tracking-wider text-[var(--color-slate)] hover:text-[var(--color-pearl)] px-3 py-1.5 rounded border border-[var(--color-sapphire-line)] hover:border-[var(--color-gold)] transition-colors cursor-pointer"
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
            </div>
            <p className="mt-4 text-xs sm:text-sm text-[var(--color-slate)] leading-relaxed">
              {activeImage.caption}
            </p>
          </div>
        </div>
      )}
    </SectionFullBleed>
  );
}
