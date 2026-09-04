import { Hero } from "@/components/sections/hero";
import { LevelRouter } from "@/components/sections/level-router";
import { HowWeWork } from "@/components/sections/how-we-work";
import { Proof } from "@/components/sections/proof";
import { WhoWeAre } from "@/components/sections/who-we-are";
import { CtaBlock } from "@/components/sections/cta-block";

export default function HomePage() {
  return (
    <>
      <Hero />
      <LevelRouter />
      <HowWeWork />
      <Proof />
      <WhoWeAre />
      <CtaBlock />
    </>
  );
}
