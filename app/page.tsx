import { Hero } from "@/components/sections/hero";
import { LevelRouter } from "@/components/sections/level-router";
import { Ladder } from "@/components/sections/ladder";
import { GoldPin } from "@/components/motion/gold-pin";
import { ProofSection } from "@/components/sections/proof-section";
import { DeadlineBlock } from "@/components/sections/deadline-block";
import { WhoWeAre } from "@/components/sections/who-we-are";
import { FaqSection } from "@/components/sections/faq-section";
import { CtaBlock } from "@/components/sections/cta-block";
import { Reveal } from "@/components/motion/reveal";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero: Sapphire (Line-by-line split reveal) */}
      <Hero
        headline="One process. Running without you. In 90 days."
        subhead="We find the process costing you most, rebuild it so it runs on its own, and stay to prove it worked."
        isHomeHero
      />

      {/* 2. Level Router: Pearl */}
      <Reveal>
        <LevelRouter />
      </Reveal>

      {/* 3. The Ladder: Pearl */}
      <Reveal>
        <Ladder />
      </Reveal>

      {/* 4. Gold Statement: Gold (Pinned 60vh, scrubbed word illumination) */}
      <GoldPin statement="Your tools are not a system." />

      {/* 5. Proof: Pearl */}
      <Reveal>
        <ProofSection />
      </Reveal>

      {/* 6. Deadline Block: Pearl */}
      <Reveal>
        <DeadlineBlock />
      </Reveal>

      {/* 7. Who We Are: Sapphire */}
      <Reveal>
        <WhoWeAre />
      </Reveal>

      {/* 8. FAQ Section: Pearl */}
      <Reveal>
        <FaqSection />
      </Reveal>

      {/* 9. Final CTA: Sapphire */}
      <Reveal>
        <CtaBlock
          headline="One process running without you. In 90 days."
          subhead="Book an initial 30-minute call. We will review your current workflow and determine whether automation makes commercial sense for your business."
        />
      </Reveal>
    </div>
  );
}
