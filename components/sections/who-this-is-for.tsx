import { SectionFullBleed } from "@/components/sections/section-full-bleed";
import { Reveal } from "@/components/motion/reveal";

/**
 * Section 2 — Who this is for
 * Tone: Sapphire, immediately under the hero, one line, no heading
 * Status: LOCKED. One sentence, no decoration.
 */
export function WhoThisIsFor() {
  return (
    <SectionFullBleed
      tone="dark"
      fullHeight={false}
      className="py-14 md:py-20 border-t border-[var(--color-sapphire-line)]/40"
    >
      <Reveal>
        <p className="text-xl sm:text-2xl md:text-3xl font-light text-[var(--color-pearl)] max-w-[42ch] leading-relaxed tracking-[-0.02em]">
          Owner-led businesses that have grown past the point where everything can run through one person.
        </p>
      </Reveal>
    </SectionFullBleed>
  );
}
