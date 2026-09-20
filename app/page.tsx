import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/hero";
import { WhoThisIsFor } from "@/components/sections/who-this-is-for";
import { TheProblem } from "@/components/sections/the-problem";
import { GoldStatement } from "@/components/sections/gold-statement";
import { HowWeWork } from "@/components/sections/how-we-work";

export const metadata: Metadata = {
  openGraph: {
    title: "Alchemetryx · We rebuild the job in your head into a system that runs itself",
    description: "We rebuild the job that lives in one person's head, so it's clear, repeatable, and easy for anyone to run.",
    images: [{ url: "/og/home.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alchemetryx · We rebuild the job in your head into a system that runs itself",
    description: "We rebuild the job that lives in one person's head, so it's clear, repeatable, and easy for anyone to run.",
    images: ["/og/home.png"],
  },
};

// Below-the-fold sections code-split dynamically to reduce initial JS payload and TTI on mobile
const LevelRouter = dynamic(() => import("@/components/sections/level-router").then((mod) => mod.LevelRouter));
const ProofCard = dynamic(() => import("@/components/sections/proof-card"));
const TestimonialBlock = dynamic(() => import("@/components/sections/testimonial-block").then((mod) => mod.TestimonialBlock));
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
      
      {/* Section 8 — Testimonial (Pearl) */}
      <TestimonialBlock />

      {/* Section 9 — Who you'd be working with (Sapphire) */}
      <WhoWeAre />
      
      {/* Section 10 — Final CTA (Pearl) */}
      <CtaBlock />
    </>
  );
}