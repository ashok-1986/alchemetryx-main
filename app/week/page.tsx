import type { Metadata } from "next";
import { CircleExpandButton } from "@/components/ui/circle-expand-button";
import { FeatureVelocity } from "@/components/ui/feature-velocity";
import { Repeat, Clock, ArrowRightLeft } from "lucide-react";
export const metadata: Metadata = {
  title: "Where's your week going? — Alchemetryx",
  description:
    "Nine questions, four minutes. Find out which of three things is costing your business the most time, and what to do about it.",
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
        <section className="bg-sapphire text-pearl pt-32 pb-20 md:pt-40 md:pb-32 px-6">
          <div className="max-w-7xl mx-auto flex flex-col items-start gap-8">
            <h1 className="font-urbanist font-light text-[length:var(--text-display-xl)] leading-[0.9] tracking-[-0.04em] max-w-4xl">
              Where is your week going?
            </h1>

            <p className="text-body font-normal text-slate max-w-[520px]">
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
        </section>

        {/* SECTION 2: THE THREE THINGS (Pearl) */}
        <FeatureVelocity
          title="Three things eat the week"
          description="Most owner-led businesses lose the largest part of the week to one of these three. Almost none can say which one."
          features={[
            {
              title: "Rework.",
              description: "Work done twice because something was missing, wrong, or never passed on.",
              icon: <Repeat className="size-5 text-ink" strokeWidth={1.5} />,
            },
            {
              title: "Slow answers.",
              description: "How long it takes you to find out how the business is actually doing.",
              icon: <Clock className="size-5 text-ink" strokeWidth={1.5} />,
            },
            {
              title: "Manual handoffs.",
              description: "A person carrying information from one system to the next because nothing else will.",
              icon: <ArrowRightLeft className="size-5 text-ink" strokeWidth={1.5} />,
            },
          ]}
          className="px-6 !py-20 md:!py-[120px]"
        />

        {/* SECTION 3: WHAT YOU GET (Pearl) */}
        <section className="bg-pearl text-ink pb-20 md:pb-[120px] px-6">
          <div className="max-w-7xl mx-auto flex flex-col gap-12 md:gap-16">
            <h2 className="font-urbanist font-light text-3xl md:text-5xl tracking-tight">
              What arrives
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-start">
              {/* Sample output visual - styled explicitly */}
              <div className="bg-sapphire rounded-lg p-8 md:p-12 flex flex-col justify-center gap-6">
                <p className="text-pearl/60 text-sm tracking-widest uppercase">
                  Your Systems Efficiency Score
                </p>
                <div className="font-urbanist font-light text-6xl md:text-[80px] leading-none text-gold">
                  43
                </div>
                <p className="font-urbanist font-light text-xl md:text-2xl text-pearl uppercase">
                  Connected, but you cannot see it
                </p>
              </div>

              <div className="flex flex-col gap-8 lg:pt-8">
                <p className="text-body text-ink-light">
                  On screen, straight away: your score out of 100, the three
                  areas scored separately, and which one is costing you most.
                </p>
                <p className="text-body text-ink-light">
                  By email inside two working days: a written assessment of why
                  that area is your constraint, what it is likely costing, and
                  what a fix looks like. Written for you, not a template.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: HOW IT WORKS (Pearl) */}
        <section className="bg-pearl text-ink pb-20 md:pb-[120px] px-6">
          <div className="max-w-7xl mx-auto flex flex-col gap-12 md:gap-16">
            <h2 className="font-urbanist font-light text-3xl md:text-5xl tracking-tight">
              How it works
            </h2>

            <div className="flex flex-col gap-8 max-w-2xl">
              <p className="text-body text-ink-light">
                <strong className="text-ink font-semibold">One.</strong> Nine
                questions about how work actually moves through your business.
                Four minutes, no preparation.
              </p>
              <p className="text-body text-ink-light">
                <strong className="text-ink font-semibold">Two.</strong> Your
                score, on screen, immediately.
              </p>
              <p className="text-body text-ink-light">
                <strong className="text-ink font-semibold">Three.</strong> Four
                more questions so the written assessment is about your business
                and not a generic one. Then it lands in your inbox.
              </p>
            </div>
          </div>
        </section>

        {/* Rule above section 5 */}
        <div className="w-full h-[1px] bg-gold" />

        {/* SECTION 5: TWO HONEST THINGS (Sapphire) */}
        <section className="bg-sapphire text-pearl py-20 md:py-[120px] px-6">
          <div className="max-w-7xl mx-auto flex flex-col gap-12 md:gap-16">
            <h2 className="font-urbanist font-light text-3xl md:text-5xl tracking-tight">
              Two honest things
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 max-w-4xl">
              <p className="text-body text-slate">
                If your business already runs well, we will say so. The top band
                reads: systems-led, you probably do not need us. That is a real
                result and some people get it.
              </p>
              <p className="text-body text-slate">
                Your answers are used to write your assessment and to improve
                the scoring. They are processed securely by Tally as our service
                provider, but are never sold and not added to any list you did
                not ask for.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 6: CTA (Sapphire) */}
        <section className="bg-sapphire text-pearl pb-24 md:pb-40 px-6">
          <div className="max-w-7xl mx-auto flex flex-col items-start gap-8">
            <p className="font-urbanist font-light text-2xl md:text-3xl tracking-tight text-pearl">
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
        </section>
      </main>
    </>
  );
}
