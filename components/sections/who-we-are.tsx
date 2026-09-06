import { SectionFullBleed } from "@/components/sections/section-full-bleed";
import { Reveal } from "@/components/motion/reveal";

interface WhoWeAreProps {
  headingLevel?: "h1" | "h2";
  eyebrow?: string;
  heading?: string;
  showCareRotaReference?: boolean;
}

export function WhoWeAre({
  headingLevel = "h2",
  eyebrow = "WHO YOU WOULD BE WORKING WITH",
  heading = "A firm that builds the thing, not a deck about it.",
  showCareRotaReference = true,
}: WhoWeAreProps = {}) {
  const HeadingTag = headingLevel;

  return (
    <SectionFullBleed id="who-we-are" tone="dark" fullHeight={false} className="py-20 md:py-28">
      <Reveal>
        <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold)] mb-6">
          {eyebrow}
        </p>
        <HeadingTag className="text-[clamp(1.75rem,4vw,3rem)] font-light leading-tight tracking-[-0.03em] max-w-[22ch]">
          {heading}
        </HeadingTag>
      </Reveal>

      <div className="mt-12">
        <Reveal delay={0.1}>
          <div className="max-w-[65ch]">
            <p className="text-base md:text-lg font-light leading-relaxed text-[var(--color-slate)]">
              Alchemetryx is led by Ashok Verma. We take on one job at a time, build it properly, and stay while it settles. The systems we hand over keep running.
              {showCareRotaReference && (
                <> The CareRota system above runs on our own infrastructure.</>
              )}
            </p>
            <p className="mt-4 text-base md:text-lg font-light leading-relaxed text-[var(--color-slate)]">
              If we do not think there is a problem worth paying to solve, we will tell you that instead.
            </p>
          </div>
        </Reveal>
      </div>
    </SectionFullBleed>
  );
}
