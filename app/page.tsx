import { Hero } from "@/components/sections/hero";
import { WhoThisIsFor } from "@/components/sections/who-this-is-for";
import { TheProblem } from "@/components/sections/the-problem";
import { GoldStatement } from "@/components/sections/gold-statement";
import { LevelRouter } from "@/components/sections/level-router";
import { HowWeWork } from "@/components/sections/how-we-work";
import ProofCard from "@/components/sections/proof-card";
import { WhoWeAre } from "@/components/sections/who-we-are";
import { CtaBlock } from "@/components/sections/cta-block";

export default function HomePage() {
  return (
    <>
      {/* Section 1 — Hero (Sapphire) */}
      <Hero />
      
      {/* Section 2 — Who this is for (Sapphire) */}
      <WhoThisIsFor />
      
      {/* Section 3 — The problem (Pearl) */}
      <TheProblem />
      
      {/* Section 4 — The statement (Gold) */}
      <GoldStatement />
      
      {/* Section 5 — Have you bought AI yet? (Pearl) */}
      <LevelRouter />
      
      {/* Section 6 — How we work (Pearl) */}
      <HowWeWork />
      
      {/* Section 7 — Proof: CareRota (Pearl) */}
      <ProofCard />
      
      {/* Section 8 — Who you'd be working with (Sapphire) */}
      <WhoWeAre />
      
      {/* Section 9 — Final CTA (Pearl) */}
      <CtaBlock />
    </>
  );
}