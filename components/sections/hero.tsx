import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SectionFullBleed } from "@/components/sections/section-full-bleed";
import { SplitLines } from "@/components/motion/split-lines";
import { Reveal } from "@/components/motion/reveal";
import { COMPANY } from "@/lib/constants";

export function Hero() {
  return (
    <SectionFullBleed tone="dark" className="pt-24 pb-20 md:pt-36 md:pb-32">
      <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold)] mb-8">
        Make the business easier to run
      </p>

      <SplitLines
        lines={[
          "The job still lives",
          "in a spreadsheet. And you’re",
          "the only one who knows how.",
        ]}
        className="text-[clamp(2.25rem,6vw,4.5rem)] font-light leading-[1.05] tracking-[-0.04em] max-w-[18ch]"
      />

      <Reveal delay={0.4}>
        <p className="mt-8 text-lg md:text-xl font-light text-[var(--color-slate)] max-w-[52ch] leading-relaxed">
          We rebuild it as a system, so it runs without you.
        </p>
      </Reveal>

      <Reveal delay={0.6}>
        <div className="mt-10">
          <Button asChild variant="primary" size="lg">
            <Link href={COMPANY.primaryCtaHref}>{COMPANY.primaryCtaLabel}</Link>
          </Button>
        </div>
      </Reveal>
    </SectionFullBleed>
  );
}
