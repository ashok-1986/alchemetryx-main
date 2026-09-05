import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SectionFullBleed } from "@/components/sections/section-full-bleed";
import { Reveal } from "@/components/motion/reveal";

/**
 * Section 4 — The statement
 * Tone: Gold. The only gold section on the whole page.
 * Colour rule: Text is Ink/Sapphire on Gold (7.13:1 to 8.34:1 contrast).
 * Never Pearl (white) on Gold.
 * Button: Sapphire on Gold, moves reader to Section 6 (#how-we-work).
 */
export function GoldStatement() {
  return (
    <SectionFullBleed
      id="statement"
      tone="gold"
      fullHeight={false}
      className="py-20 md:py-28"
    >
      <Reveal>
        <div className="max-w-[48ch]">
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-sapphire)]/80 font-normal mb-6">
            THE POINT
          </p>
          <h2 className="text-[clamp(2.25rem,4.5vw,3.75rem)] font-light leading-[1.08] tracking-[-0.035em] text-[var(--color-ink)]">
            Your tools are not a system.
          </h2>
          <p className="mt-6 text-lg md:text-xl font-normal leading-relaxed text-[var(--color-ink)]/90">
            Buying software is not the same as having something that runs. Most businesses have plenty of the first and none of the second.
          </p>
          <div className="mt-8 md:mt-10">
            <Button asChild variant="sapphire" size="lg" className="shadow-[0_4px_16px_-4px_rgba(11,17,30,0.25)]">
              <Link href="/#how-we-work">
                See how we work →
              </Link>
            </Button>
          </div>
        </div>
      </Reveal>
    </SectionFullBleed>
  );
}
