import type { Metadata } from "next";
import { SectionFullBleed } from "@/components/sections/section-full-bleed";
import { SplitLines } from "@/components/motion/split-lines";
import { Reveal } from "@/components/motion/reveal";
import { CircleExpandButton } from "@/components/ui/circle-expand-button";
import { TallyEmbed } from "@/components/forms/tally-embed";

export const metadata: Metadata = {
  title: "Where's your week going? — Alchemetryx",
  description: "Nine questions, four minutes. Find out which of three things is costing your business the most time, and what to do about it.",
  openGraph: {
    title: "Where's your week going? — Alchemetryx",
    description: "Nine questions, four minutes. Find out which of three things is costing your business the most time, and what to do about it.",
    url: "https://alchemetryx.com/week",
  }
};

export default function WeekPage() {
  return (
    <>
      {/* Section 1: Hero (Sapphire) */}
      <SectionFullBleed tone="dark" className="pt-40 pb-24 md:pt-56 md:pb-32">
        <div className="max-w-4xl">
          <SplitLines
            lines={["Where is your", "week going?"]}
            className="text-[clamp(3rem,7vw,6rem)] font-light leading-[1.02] tracking-[-0.04em] text-[var(--color-pearl)]"
          />
          
          <Reveal delay={0.3}>
            <p className="mt-8 text-lg md:text-xl font-light text-[var(--color-slate)] max-w-[520px] leading-relaxed">
              Nine questions. Four minutes. You get a score, the one thing costing you most, and a written assessment inside two working days. No charge, no login.
            </p>
          </Reveal>

          <Reveal delay={0.5}>
            <div className="mt-10">
              <CircleExpandButton
                href="#assessment"
                variant="primary"
                size="lg"
              >
                Start
              </CircleExpandButton>
            </div>
          </Reveal>
        </div>
      </SectionFullBleed>

      {/* Section 2: The three things (Pearl) */}
      <SectionFullBleed tone="light" className="py-24 md:py-32">
        <Reveal>
          <h2 className="text-3xl md:text-5xl font-light tracking-tight mb-16 max-w-3xl">
            Three things eat the week
          </h2>
        </Reveal>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 mb-16">
          <Reveal delay={0.1}>
            <div>
              <h3 className="text-xl font-medium mb-4">Rework.</h3>
              <p className="text-[var(--color-slate)] leading-relaxed">
                Work done twice because something was missing, wrong, or never passed on.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div>
              <h3 className="text-xl font-medium mb-4">Slow answers.</h3>
              <p className="text-[var(--color-slate)] leading-relaxed">
                How long it takes you to find out how the business is actually doing.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <div>
              <h3 className="text-xl font-medium mb-4">Manual handoffs.</h3>
              <p className="text-[var(--color-slate)] leading-relaxed">
                A person carrying information from one system to the next because nothing else will.
              </p>
            </div>
          </Reveal>
        </div>
        
        <Reveal delay={0.4}>
          <p className="text-lg md:text-xl text-[var(--color-slate)] max-w-3xl leading-relaxed">
            Most owner-led businesses lose the largest part of the week to one of these three. Almost none can say which one.
          </p>
        </Reveal>
      </SectionFullBleed>

      {/* Section 3: What you get (Pearl) */}
      <SectionFullBleed tone="light" className="py-24 md:py-32 bg-[var(--color-ink)]/5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <Reveal>
              <h2 className="text-3xl md:text-5xl font-light tracking-tight mb-10">
                What arrives
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="space-y-8">
                <p className="text-lg md:text-xl text-[var(--color-slate)] leading-relaxed">
                  On screen, straight away: your score out of 100, the three areas scored separately, and which one is costing you most.
                </p>
                <p className="text-lg md:text-xl text-[var(--color-slate)] leading-relaxed">
                  By email inside two working days: a written assessment of why that area is your constraint, what it is likely costing, and what a fix looks like. Written for you, not a template.
                </p>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.3}>
            {/* Sample output placeholder */}
            <div className="bg-[var(--color-sapphire)] rounded-2xl p-8 md:p-12 text-[var(--color-pearl)] shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-[var(--color-gold)] opacity-50"></div>
              <p className="text-xs uppercase tracking-widest text-[var(--color-slate)] mb-6">Your Systems Efficiency Score</p>
              <div className="text-[clamp(4rem,10vw,8rem)] font-light text-[var(--color-gold)] leading-none mb-6">43</div>
              <p className="text-xl md:text-2xl font-light tracking-tight mb-12 uppercase text-[var(--color-slate)]">Connected, but you cannot see it</p>
              
              <div className="space-y-4 mb-12 font-mono text-sm border-t border-[var(--color-slate)]/20 pt-6">
                <div className="flex justify-between"><span>Rework</span><span className="text-[var(--color-gold)]">50</span></div>
                <div className="flex justify-between"><span>Slow answers</span><span className="text-[var(--color-gold)]">50</span></div>
                <div className="flex justify-between"><span>Manual handoffs</span><span className="text-[var(--color-gold)]">25</span></div>
              </div>
              
              <div className="text-sm">
                <div className="grid grid-cols-[140px_1fr] gap-4 mb-3">
                  <span className="text-[var(--color-slate)] uppercase tracking-wider text-xs">Costing you most</span>
                  <span className="text-[var(--color-gold)]">Manual handoffs</span>
                </div>
                <div className="grid grid-cols-[140px_1fr] gap-4">
                  <span className="text-[var(--color-slate)] uppercase tracking-wider text-xs">Strongest</span>
                  <span className="text-[var(--color-pearl)]">Rework</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </SectionFullBleed>

      {/* Section 4: How it works (Pearl) */}
      <SectionFullBleed tone="light" className="py-24 md:py-32">
        <Reveal>
          <h2 className="text-3xl md:text-5xl font-light tracking-tight mb-16">
            How it works
          </h2>
        </Reveal>
        
        <div className="space-y-12 max-w-3xl">
          <Reveal delay={0.1}>
            <div className="flex gap-6 md:gap-8">
              <div className="text-2xl font-light text-[var(--color-slate)] mt-1">One.</div>
              <p className="text-lg md:text-xl leading-relaxed text-[var(--color-ink)]">
                Nine questions about how work actually moves through your business. Four minutes, no preparation.
              </p>
            </div>
          </Reveal>
          
          <Reveal delay={0.2}>
            <div className="flex gap-6 md:gap-8">
              <div className="text-2xl font-light text-[var(--color-slate)] mt-1">Two.</div>
              <p className="text-lg md:text-xl leading-relaxed text-[var(--color-ink)]">
                Your score, on screen, immediately.
              </p>
            </div>
          </Reveal>
          
          <Reveal delay={0.3}>
            <div className="flex gap-6 md:gap-8">
              <div className="text-2xl font-light text-[var(--color-slate)] mt-1">Three.</div>
              <p className="text-lg md:text-xl leading-relaxed text-[var(--color-ink)]">
                Four more questions so the written assessment is about your business and not a generic one. Then it lands in your inbox.
              </p>
            </div>
          </Reveal>
        </div>
      </SectionFullBleed>

      {/* Section 5: The honest bit (Sapphire) */}
      <SectionFullBleed tone="dark" className="py-24 md:py-32 border-t border-[var(--color-gold)]/30 relative">
        {/* Hairline rule requested by brief above Section 5 */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-[var(--color-gold)]"></div>
        
        <Reveal>
          <h2 className="text-3xl md:text-5xl font-light tracking-tight mb-12 text-[var(--color-pearl)]">
            Two honest things
          </h2>
        </Reveal>
        
        <div className="space-y-8 max-w-3xl">
          <Reveal delay={0.1}>
            <p className="text-lg md:text-xl font-light text-[var(--color-slate)] leading-relaxed">
              If your business already runs well, we will say so. The top band reads: systems-led, you probably do not need us. That is a real result and some people get it.
            </p>
          </Reveal>
          
          <Reveal delay={0.2}>
            <p className="text-lg md:text-xl font-light text-[var(--color-slate)] leading-relaxed">
              Your answers are used to write your assessment and to improve the scoring. They are not sold, not shared, and not added to any list you did not ask for.
            </p>
          </Reveal>
        </div>
      </SectionFullBleed>

      {/* Tally Embed Form Section */}
      <section id="assessment" className="py-24 md:py-32 bg-[var(--color-pearl)] text-[var(--color-ink)]">
        <div className="container mx-auto px-6">
          <TallyEmbed />
        </div>
      </section>

      {/* Section 6: CTA (Sapphire) */}
      <SectionFullBleed tone="dark" className="py-24 md:py-32">
        <div className="text-center flex flex-col items-center">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-light tracking-tight mb-10 text-[var(--color-pearl)]">
              Nine questions. Four minutes.
            </h2>
          </Reveal>
          
          <Reveal delay={0.2}>
            <CircleExpandButton
              href="#assessment"
              variant="primary"
              size="lg"
            >
              Start
            </CircleExpandButton>
          </Reveal>
        </div>
      </SectionFullBleed>
    </>
  );
}
