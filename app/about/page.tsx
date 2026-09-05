import type { Metadata } from "next";
import { WhoWeAre } from "@/components/sections/who-we-are";
import { CtaBlock } from "@/components/sections/cta-block";

export const metadata: Metadata = {
  title: "About · Alchemetryx",
  description:
    "A small firm led by Ashok Verma that builds the thing, not a deck about it.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <div className="pt-10">
        <WhoWeAre />
      </div>
      <CtaBlock />
    </main>
  );
}
