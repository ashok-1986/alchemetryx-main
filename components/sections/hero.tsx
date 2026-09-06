import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SectionFullBleed } from "@/components/sections/section-full-bleed";
import { SplitLines } from "@/components/motion/split-lines";
import { Reveal } from "@/components/motion/reveal";
import { SystemDiagram } from "@/components/sections/system-diagram";
import { COMPANY } from "@/lib/constants";

export function Hero() {
  return (
    <SectionFullBleed tone="dark" className="pt-24 pb-20 md:pt-32 md:pb-28">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left column: Value Proposition & CTA */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold)] mb-6 md:mb-8">
            Make the business easier to run
          </p>

          <SplitLines
            lines={[
              "Take a fortnight off",
              "without the business",
              "falling apart.",
            ]}
            className="text-[clamp(3rem,7vw,5.5rem)] font-light leading-[1.05] tracking-[-0.04em] max-w-[18ch]"
          />

          <Reveal delay={0.3}>
            <p className="mt-6 md:mt-8 text-lg md:text-xl font-light text-[var(--color-slate)] max-w-[48ch] leading-relaxed">
              Right now the job lives in your head and a spreadsheet only you understand. We rebuild it so it runs without you.
            </p>
          </Reveal>

          <Reveal delay={0.5}>
            <div className="mt-8 md:mt-10">
              <Button asChild variant="primary" size="lg">
                <Link href={COMPANY.primaryCtaHref}>{COMPANY.primaryCtaLabel}</Link>
              </Button>
            </div>
          </Reveal>
        </div>

        {/* Right column: System Architecture Diagram */}
        <div className="lg:col-span-6 flex items-center justify-center">
          <Reveal delay={0.3} className="w-full">
            <div className="w-full max-w-[620px] mx-auto">
              <SystemDiagram className="w-full h-auto" />
            </div>
          </Reveal>
        </div>
      </div>
    </SectionFullBleed>
  );
}
