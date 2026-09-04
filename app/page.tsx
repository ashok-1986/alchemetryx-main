import { Hero } from "@/components/sections/hero";
import { WhoThisIsFor } from "@/components/sections/who-this-is-for";
import { TheProblem } from "@/components/sections/the-problem";
import { LevelRouter } from "@/components/sections/level-router";
import { HowWeWork } from "@/components/sections/how-we-work";
import { Proof } from "@/components/sections/proof";
import { WhoWeAre } from "@/components/sections/who-we-are";
import { CtaBlock } from "@/components/sections/cta-block";

export default function HomePage() {
  return (
    <>
      {/* Section 1 — Hero */}
      <Hero />
      {/* Section 2 — Who this is for */}
      <WhoThisIsFor />
      {/* Section 3 — The problem */}
      <TheProblem />
      {/* Section 4 — Have you bought AI yet? */}
      <LevelRouter />
      {/* Section 5 — How we work */}
      <HowWeWork />
      {/* Section 6 — Proof: CareRota */}
      <Proof />
      {/* Section 7 — Who you'd be working with */}
      <WhoWeAre />
      {/* Section 8 — Final CTA */}
      <CtaBlock />
    </>
  );
}
