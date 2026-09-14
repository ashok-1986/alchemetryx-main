import type { Metadata } from "next";
import { CircleExpandButton } from "@/components/ui/circle-expand-button";
import { FeatureVelocity } from "@/components/ui/feature-velocity";
import { Repeat, Clock, ArrowRightLeft } from "lucide-react";
import { SectionFullBleed } from "@/components/sections/section-full-bleed";
export const metadata: Metadata = {
  title: { absolute: "Where's your week going? — Alchemetryx" },
  description:
    "Nine questions, four minutes. Find out which of three things is costing your business the most time, and what to do about it.",
  openGraph: {
    title: "Where's your week going? — Alchemetryx",
    description:
      "Nine questions, four minutes. Find out which of three things is costing your business the most time, and what to do about it.",
    images: [{ url: "/og/week.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Where's your week going? — Alchemetryx",
    description:
      "Nine questions, four minutes. Find out which of three things is costing your business the most time, and what to do about it.",
    images: ["/og/week.png"],
  },
};

export default function WeekMarketingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Systems Efficiency Diagnostic",
    provider: {
      "@type": "Organization",
      name: "Alchemetryx",
      url: "https://alchemetryx.com",
    },
    description:
      "A free, nine-question diagnostic to identify friction in your business routines.",
  };

  const tallyUrl = "https://tally.so/r/jajPEJ";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="w-full">
        {/* SECTION 1: HERO (Sapphire) */}
        <SectionFullBleed tone="dark" fullHeight={false} className="pt-40 pb-32 md:pt-56 md:pb-48">
          <div className="flex flex-col items-start gap-12 md:gap-16">
            <h1 className="font-urbanist font-light text-[clamp(3.5rem,8vw,7rem)] leading-[0.9] tracking-[-0.04em] max-w-[20ch]">
              Where is your week going?
            </h1>

            <p className="text-lg md:text-2xl font-normal leading-relaxed text-[var(--color-slate)] max-w-[55ch]">
              Nine questions. Four minutes. You get a score, the one thing
              costing you most, and a written assessment inside two working
              days. No charge, no login.
            </p>

            <CircleExpandButton
              href={tallyUrl}
              variant="primary"
              size="lg"
            >
              Start
            </CircleExpandButton>
          </div>
        </SectionFullBleed>

        {/* SECTION 2: THE THREE THINGS (Pearl) */}
        <FeatureVelocity
          title="Three things eat the week"
          description="Most owner-led businesses lose the largest part of the week to one of these three. Almost none can say which one."
          features={[
            {
              title: "Rework.",
              description: "Work done twice because something was missing, wrong, or never passed on.",
              icon: <Repeat className="size-6 text-[var(--color-ink)]" strokeWidth={1.5} />,
            },
            {
              title: "Slow answers.",
              description: "How long it takes you to find out how the business is actually doing.",
              icon: <Clock className="size-6 text-[var(--color-ink)]" strokeWidth={1.5} />,
            },
            {
              title: "Manual handoffs.",
              description: "A person carrying information from one system to the next because nothing else will.",
              icon: <ArrowRightLeft className="size-6 text-[var(--color-ink)]" strokeWidth={1.5} />,
            },
          ]}
          className="!py-20 md:!py-[120px]"
        />

        {/* SECTION 3: WHAT YOU GET (Pearl) */}
        <SectionFullBleed tone="light" fullHeight={false} className="pb-20 md:pb-[120px]">
          <div className="flex flex-col gap-12 md:gap-16">
            <h2 className="font-urbanist font-light text-[clamp(2rem,4vw,3.25rem)] tracking-tight max-w-[25ch]">
              What arrives
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-start">
              {/* Sample output visual - styled explicitly */}
              <div className="bg-[var(--color-sapphire)] rounded-lg p-8 md:p-12 flex flex-col justify-center gap-6 border border-[var(--color-sapphire-line)]">
                <p className="text-[var(--color-slate)] text-sm tracking-widest uppercase">
                  Your Systems Efficiency Score
                </p>
                <div className="font-urbanist font-light text-6xl md:text-[80px] leading-none text-[var(--color-gold)]">
                  43
                </div>
                <p className="font-urbanist font-light text-xl md:text-2xl text-[var(--color-pearl)] uppercase">
                  Connected, but you cannot see it
                </p>
              </div>

              <div className="flex flex-col gap-8 lg:pt-8">
                <p className="text-base md:text-lg font-normal leading-relaxed text-[var(--color-ink)] max-w-[55ch]">
                  On screen, straight away: your score out of 100, the three
                  areas scored separately, and which one is costing you most.
                </p>
                <p className="text-base md:text-lg font-normal leading-relaxed text-[var(--color-ink)] max-w-[55ch]">
                  By email inside two working days: a written assessment of why
                  that area is your constraint, what it is likely costing, and
                  what a fix looks like. Written for you, not a template.
                </p>
              </div>
            </div>
          </div>
        </SectionFullBleed>

        {/* SECTION 4: HOW IT WORKS (Pearl) */}
        <SectionFullBleed tone="light" fullHeight={false} className="pb-20 md:pb-[120px]">
          <div className="flex flex-col gap-12 md:gap-16">
            <h2 className="font-urbanist font-light text-[clamp(2rem,4vw,3.25rem)] tracking-tight max-w-[25ch]">
              How it works
            </h2>

            <div className="flex flex-col gap-8">
              <p className="text-base md:text-lg font-normal leading-relaxed text-[var(--color-ink)] max-w-[55ch]">
                <strong className="text-[var(--color-ink)] font-normal">One.</strong> Nine
                questions about how work actually moves through your business.
                Four minutes, no preparation.
              </p>
              <p className="text-base md:text-lg font-normal leading-relaxed text-[var(--color-ink)] max-w-[55ch]">
                <strong className="text-[var(--color-ink)] font-normal">Two.</strong> Your
                score, on screen, immediately.
              </p>
              <p className="text-base md:text-lg font-normal leading-relaxed text-[var(--color-ink)] max-w-[55ch]">
                <strong className="text-[var(--color-ink)] font-normal">Three.</strong> Four
                more questions so the written assessment is about your business
                and not a generic one. Then it lands in your inbox.
              </p>
            </div>
          </div>
        </SectionFullBleed>

        {/* SECTION 5: TWO HONEST THINGS (Sapphire) */}
        <SectionFullBleed tone="dark" fullHeight={false} className="py-20 md:py-[120px] border-t border-[var(--color-gold)]">
          <div className="flex flex-col gap-12 md:gap-16">
            <h2 className="font-urbanist font-light text-[clamp(2rem,4vw,3.25rem)] tracking-tight max-w-[25ch]">
              Two honest things
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
              <p className="text-base md:text-lg font-normal leading-relaxed text-[var(--color-slate)] max-w-[45ch]">
                If your business already runs well, we will say so. The top band
                reads: systems-led, you probably do not need us. That is a real
                result and some people get it.
              </p>
              <p className="text-base md:text-lg font-normal leading-relaxed text-[var(--color-slate)] max-w-[45ch]">
                Your answers are used to write your assessment and to improve
                the scoring. They are processed securely by Tally as our service
                provider, but are never sold and not added to any list you did
                not ask for.
              </p>
            </div>
          </div>
        </SectionFullBleed>

        {/* SECTION 6: CTA (Sapphire) */}
        <SectionFullBleed tone="dark" fullHeight={false} className="pb-24 md:pb-40">
          <div className="flex flex-col items-start gap-8">
            <p className="font-urbanist font-light text-[clamp(1.5rem,3vw,2.25rem)] tracking-tight text-[var(--color-pearl)] max-w-[25ch]">
              Nine questions. Four minutes.
            </p>

            <CircleExpandButton
              href={tallyUrl}
              variant="primary"
              size="lg"
            >
              Start
            </CircleExpandButton>
          </div>
        </SectionFullBleed>
      </main>
    </>
  );
}
