import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/hero";
import { WhoThisIsFor } from "@/components/sections/who-this-is-for";
import { TheProblem } from "@/components/sections/the-problem";
import { GoldStatement } from "@/components/sections/gold-statement";
import { HowWeWork } from "@/components/sections/how-we-work";

// Below-the-fold sections code-split dynamically to reduce initial JS payload and TTI on mobile
const LevelRouter = dynamic(() => import("@/components/sections/level-router").then((mod) => mod.LevelRouter));
const ProofCard = dynamic(() => import("@/components/sections/proof-card"));
const WhoWeAre = dynamic(() => import("@/components/sections/who-we-are").then((mod) => mod.WhoWeAre));
const CtaBlock = dynamic(() => import("@/components/sections/cta-block").then((mod) => mod.CtaBlock));

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