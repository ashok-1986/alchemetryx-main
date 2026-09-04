import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SectionFullBleed } from "@/components/sections/section-full-bleed";
import { Reveal } from "@/components/motion/reveal";
import { COMPANY } from "@/lib/constants";

export function CtaBlock() {
  return (
    <SectionFullBleed tone="light" className="border-t border-[var(--color-pearl-line)]">
      <Reveal>
        <div className="max-w-[46ch]">
          <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-light leading-tight tracking-[-0.03em]">
            Stop the leaks.
          </h2>
          <p className="mt-5 text-base md:text-lg font-light leading-relaxed text-[var(--color-ink)]/80">
            Tell us which job you would hand over first. Half an hour, no deck. If there is nothing here worth building, we will say so on the call.
          </p>
          <div className="mt-8">
            <Button asChild variant="primary" size="lg">
              <Link href={COMPANY.primaryCtaHref}>{COMPANY.primaryCtaLabel}</Link>
            </Button>
          </div>
        </div>
      </Reveal>
    </SectionFullBleed>
  );
}
