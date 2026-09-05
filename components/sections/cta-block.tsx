import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SectionFullBleed } from "@/components/sections/section-full-bleed";
import { Reveal } from "@/components/motion/reveal";
import { COMPANY } from "@/lib/constants";

export function CtaBlock() {
  return (
    <SectionFullBleed id="book" tone="light" fullHeight={false} className="border-t border-[var(--color-pearl-line)] py-20 md:py-32">
      <Reveal>
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
            <Button asChild variant="primary" size="lg" className="shadow-[0_4px_16px_-4px_rgba(200,168,107,0.3)]">
              <Link href={COMPANY.primaryCtaHref}>
                {COMPANY.primaryCtaLabel}
              </Link>
            </Button>
          </div>
        </div>
      </Reveal>
    </SectionFullBleed>
  );
}
