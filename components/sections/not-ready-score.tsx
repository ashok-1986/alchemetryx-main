import { SectionFullBleed } from "@/components/sections/section-full-bleed";
import { Reveal } from "@/components/motion/reveal";
import { AnimatedScoreCard } from "@/components/week/animated-score-card";
import { CircleExpandButton } from "@/components/ui/circle-expand-button";

export function NotReadyScore() {
  return (
    <SectionFullBleed tone="light" className="py-24 md:py-32 border-t border-[var(--color-pearl-line)]">
      <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
        <Reveal>
          <h2 className="text-3xl md:text-5xl font-light tracking-tight mb-8 text-[var(--color-ink)]">
            Not ready to book a call? Start here.
          </h2>
        </Reveal>
        
        <Reveal delay={0.1}>
          <p className="text-lg md:text-xl font-normal text-[var(--color-slate)] leading-relaxed mb-16 max-w-[42ch]">
            Nine questions, four minutes. See your score and the one thing costing you the most, on screen straight away.
          </p>
        </Reveal>

        <Reveal delay={0.2} className="w-full">
          <div className="w-full max-w-xl mx-auto transform scale-90 sm:scale-100 origin-top mb-16">
            <AnimatedScoreCard isExample={true} className="pointer-events-none" />
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <CircleExpandButton
            href="/week"
            variant="primary"
            size="lg"
          >
            Check your score
          </CircleExpandButton>
        </Reveal>
      </div>
    </SectionFullBleed>
  );
}
