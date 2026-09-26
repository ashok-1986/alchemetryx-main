import { SectionFullBleed } from "@/components/sections/section-full-bleed";
import { SplitLines } from "@/components/motion/split-lines";
import { Reveal } from "@/components/motion/reveal";
import { SystemDiagram } from "@/components/sections/system-diagram";
import { CircleExpandButton } from "@/components/ui/circle-expand-button";
import { COMPANY } from "@/lib/constants";
import Link from "next/link";

export function Hero() {
  return (
    <SectionFullBleed tone="dark" className="pt-40 pb-32 md:pt-56 md:pb-40">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
        {/* Left column: Value Proposition & CTA */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold)] mb-8 md:mb-12">
            For UK owner-led businesses, 10 to 50 staff
          </p>

          <SplitLines
            lines={[
              "Take a day off.",
              "Your business keeps running.",
            ]}
            className="text-[clamp(3.5rem,8vw,7rem)] font-light leading-[1.02] tracking-[-0.04em] max-w-[28ch] sm:max-w-[35ch] lg:max-w-[42ch]"
          />

          <Reveal delay={0.3}>
            <p className="mt-6 md:mt-8 text-lg md:text-xl font-light text-[var(--color-slate)] max-w-[48ch] leading-relaxed">
              One in six UK small business owners take no full days off in a year. We build the systems behind three things: routine work handled, numbers on demand and tools connected, without you in the middle. Nine questions show how much of your business already runs without you.
            </p>
            <p className="mt-4 text-sm font-light text-[var(--color-slate)]/70 max-w-[65ch]">
              Source: <a href="https://www.tide.co/blog/tide-update/the-holiday-gap/" target="_blank" rel="noopener" className="underline underline-offset-2 hover:text-[var(--color-gold)] transition-colors">Tide Business Benchmark Index 2026</a>, Censuswide survey of 500 UK small business owners, December 2025.
            </p>
          </Reveal>

          <Reveal delay={0.5}>
            <div className="mt-8 md:mt-10 flex flex-wrap items-center gap-6">
              <CircleExpandButton
                href="/week"
                variant="primary"
                size="lg"
              >
                Check your score
              </CircleExpandButton>
              <Link 
                href={COMPANY.primaryCtaHref}
                className="text-base font-normal text-[var(--color-pearl)] hover:text-[var(--color-gold)] underline underline-offset-4 transition-colors"
              >
                Book a call
              </Link>
            </div>
          </Reveal>
        </div>

        {/* Right column: System Architecture Diagram */}
        <div className="lg:col-span-6 flex items-center justify-center relative">
          <Reveal delay={0.6} y={40} className="w-full relative z-10">
            <div className="w-full max-w-[620px] mx-auto transform transition-transform duration-700 hover:scale-[1.02]">
              <SystemDiagram className="w-full h-auto drop-shadow-2xl" />
            </div>
          </Reveal>
        </div>
      </div>
    </SectionFullBleed>
  );
}
