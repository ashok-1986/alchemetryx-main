import { CircleExpandButton } from "@/components/ui/circle-expand-button";
import { SectionFullBleed } from "@/components/sections/section-full-bleed";
import { Reveal } from "@/components/motion/reveal";
import { COMPANY } from "@/lib/constants";

export function CtaBlock() {
  return (
    <SectionFullBleed id="book" tone="light" fullHeight={false} className="border-t border-[var(--color-pearl-line)] py-20 md:py-32">
      <Reveal>
        <div className="relative">
          {/* Subtle gold accent line — vertical, left of content */}
          <div
            aria-hidden="true"
            className="absolute -left-6 top-0 w-px h-full bg-gradient-to-b from-transparent via-[var(--color-gold-deep)]/20 to-transparent hidden lg:block"
          />
          <div className="max-w-[48ch]">
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold-deep)] mb-6">
              NEXT STEP
            </p>
            <h2 className="text-[clamp(2.25rem,4.5vw,3.75rem)] font-light leading-[1.08] tracking-[-0.035em] text-[var(--color-ink)]">
              Stop the leaks.
            </h2>
            <p className="mt-6 text-lg md:text-xl font-normal leading-relaxed text-[var(--color-ink)]">
              Tell us which job you would hand over first. Half an hour, no deck. If there is nothing here worth building, we will say so on the call.
            </p>
            <div className="mt-8 md:mt-10">
              <CircleExpandButton
                href={COMPANY.primaryCtaHref}
                variant="primary"
                size="lg"
              >
                {COMPANY.primaryCtaLabel}
              </CircleExpandButton>
            </div>
          </div>
        </div>
      </Reveal>
    </SectionFullBleed>
  );
}
