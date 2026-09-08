"use client";

/**
 * components/sections/case-study-detail.tsx
 *
 * The full case study page body — before / build / honesty, with an immersive
 * lightbox for inspecting each screenshot at size.
 *
 * UX Flow:
 * Case study -> Large contextual image -> "View full image" -> Immersive lightbox
 * with counter (e.g. 03 / 07), rich contextual caption, full keyboard navigation,
 * touch gestures, and WCAG 2.2 AA accessibility.
 */

import { useState, useRef } from "react";
import Image from "next/image";
import { Maximize2 } from "lucide-react";
import { CircleExpandButton } from "@/components/ui/circle-expand-button";
import { SectionFullBleed } from "@/components/sections/section-full-bleed";
import { Reveal } from "@/components/motion/reveal";
import { CaseStudyLightbox } from "@/components/ui/case-study-lightbox";
import { COMPANY } from "@/lib/constants";
import type { CaseStudy } from "@/content/case-studies";

export function CaseStudyDetail({ study: cs }: { study: CaseStudy }) {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleCloseLightbox = () => {
    const closedIndex = activeImageIndex;
    setActiveImageIndex(null);
    if (closedIndex !== null && triggerRefs.current[closedIndex]) {
      triggerRefs.current[closedIndex]?.focus();
    }
  };

  return (
    <SectionFullBleed id="proof" tone="light" className="pt-24 md:pt-28 border-t border-[var(--color-pearl-line)]">
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
        <p className="mt-4 text-sm font-normal text-[var(--color-ink)]/70">
          {cs.attribution}
        </p>
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
              {/* Contextual Narrative Column */}
              <div className="lg:col-span-4">
                <div className="inline-flex items-center gap-2 mb-2">
                  <span className="font-mono text-xs text-[var(--color-gold-deep)] font-semibold tracking-wider">
                    {String(i + 1).padStart(2, "0")} / {String(cs.build.items.length).padStart(2, "0")}
                  </span>
                </div>
                <h4 className="text-xl sm:text-2xl font-normal text-[var(--color-ink)] tracking-[-0.02em]">
                  {item.title}
                </h4>
                <p className="mt-3 text-sm md:text-base font-normal leading-relaxed text-[var(--color-ink)]/85 max-w-[42ch]">
                  {item.caption}
                </p>
              </div>

              {/* Large Contextual Image Column with "View full image" affordance */}
              <div className="lg:col-span-8">
                <div className="group relative rounded-xl border border-[var(--color-pearl-line)] bg-[var(--color-sapphire)] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_12px_40px_rgba(26,38,66,0.14)] hover:border-[var(--color-gold-deep)]/40 transition-all duration-300">
                  <button
                    ref={(el) => {
                      triggerRefs.current[i] = el;
                    }}
                    type="button"
                    onClick={() => setActiveImageIndex(i)}
                    aria-label={`View full image: ${item.title} (${String(i + 1).padStart(2, "0")} / ${String(cs.build.items.length).padStart(2, "0")})`}
                    className="relative block w-full text-left cursor-zoom-in focus-visible:outline-2 focus-visible:outline-[var(--color-gold)] focus-visible:outline-offset-2"
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--color-sapphire)]">
                      <Image
                        src={item.image}
                        alt={item.alt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 66vw"
                        className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                      />
                      {/* Vignette on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1d]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* "View full image" affordance badge */}
                    <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 flex items-center gap-2">
                      <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#11192B]/90 text-white text-xs font-medium backdrop-blur-md border border-white/20 shadow-lg group-hover:border-[var(--color-gold)]/60 group-hover:bg-[#1A2642]/95 transition-all">
                        <Maximize2 className="w-3.5 h-3.5 text-[var(--color-gold)] transition-transform group-hover:scale-110" aria-hidden="true" />
                        <span>View full image</span>
                        <span className="font-mono text-[10px] text-[var(--color-gold)] bg-white/10 px-1.5 py-0.5 rounded tabular-nums">
                          {String(i + 1).padStart(2, "0")} / {String(cs.build.items.length).padStart(2, "0")}
                        </span>
                      </span>
                    </div>
                  </button>
                </div>
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
                What this is, and what it isn't — &quot;{cs.honesty.heading}&quot;
              </p>
              <h3 className="mt-3 text-2xl sm:text-3xl font-normal text-[var(--color-ink)] tracking-[-0.025em] leading-snug">
                {cs.honesty.heading}
              </h3>
              <p className="mt-6 text-lg sm:text-xl font-normal text-[var(--color-ink)]">
                {cs.closingLine}
              </p>
              <div className="mt-8">
                <CircleExpandButton
                  href={COMPANY.primaryCtaHref}
                  variant="primary"
                  size="lg"
                >
                  {COMPANY.primaryCtaLabel}
                </CircleExpandButton>
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

      {/* Immersive Lightbox Modal */}
      {activeImageIndex !== null && (
        <CaseStudyLightbox
          isOpen={activeImageIndex !== null}
          onClose={handleCloseLightbox}
          items={cs.build.items}
          currentIndex={activeImageIndex}
          onIndexChange={(newIdx) => setActiveImageIndex(newIdx)}
          systemLabel={cs.screenshotLabel}
        />
      )}
    </SectionFullBleed>
  );
}
