import type { Metadata } from "next";
import { WhoWeAre } from "@/components/sections/who-we-are";
import { CtaBlock } from "@/components/sections/cta-block";

export const metadata: Metadata = {
  title: "About · Alchemetryx",
  description:
    "Led by Ashok Verma. We build the thing, not a deck about it.",
};

export default function AboutPage() {
  return (
    <>
      <WhoWeAre
        headingLevel="h1"
        eyebrow="WHO WE ARE"
        heading="Who we are."
        showCareRotaReference={false}
        showCta={false}
        bleedToTop
      />
      <CtaBlock />
    </>
  );
}
