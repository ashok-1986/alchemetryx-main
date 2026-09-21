import type { Metadata } from "next";
import Link from "next/link";
import { CircleExpandButton } from "@/components/ui/circle-expand-button";
import { SectionFullBleed } from "@/components/sections/section-full-bleed";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: { absolute: "Alchemetryx vs. Traditional Agencies and Zapier Consultants · Alchemetryx" },
  description:
    "How Alchemetryx compares to traditional digital agencies, Zapier consultants, and no-code automation freelancers for UK owner-led SMEs who need one process fixed properly.",
  alternates: {
    canonical: "/compare",
  },
  openGraph: {
    title: "Alchemetryx vs. Traditional Agencies and Zapier Consultants",
    description:
      "How Alchemetryx compares to traditional digital agencies, Zapier consultants, and no-code automation freelancers for UK owner-led SMEs.",
    images: [{ url: "/og/home.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alchemetryx vs. Traditional Agencies and Zapier Consultants",
    description:
      "How Alchemetryx compares to traditional digital agencies, Zapier consultants, and no-code automation freelancers for UK owner-led SMEs.",
    images: ["/og/home.png"],
  },
};

const COMPARISON_ROWS = [
  {
    dimension: "Scope of engagement",
    alchemetryx: "One process. Scoped tightly before any work starts.",
    agency: "Broad retainers or project specs that expand mid-engagement.",
    zapier: "Tool-by-tool automation with no process design underneath.",
  },
  {
    dimension: "Pricing model",
    alchemetryx: "Fixed project fee. You know the number before we start.",
    agency: "Day rates or monthly retainers. Longer projects cost more.",
    zapier: "Hourly freelance rates. Scope creep is common.",
  },
  {
    dimension: "Who owns the output",
    alchemetryx: "You own everything. The system, the docs, the credentials.",
    agency: "Often built on agency platforms or proprietary stacks.",
    zapier: "Zaps live in your account, but only the consultant knows how they work.",
  },
  {
    dimension: "Data layer",
    alchemetryx: "We fix the data underneath first. Automation runs on clean data.",
    agency: "Rarely touches the data layer. Assumes it is already clean.",
    zapier: "Automates whatever data exists, clean or not.",
  },
  {
    dimension: "AI use",
    alchemetryx: "AI added only where it earns its place. Never as a feature.",
    agency: "Often sold as an AI project regardless of fit.",
    zapier: "AI steps bolted on top of Zapier workflows.",
  },
  {
    dimension: "Proof of results",
    alchemetryx: "Baseline measured before we start. Same metric after. Real numbers.",
    agency: "Outputs delivered. Whether the number moved is rarely tracked.",
    zapier: "Automations built. Business impact rarely measured.",
  },
  {
    dimension: "Best for",
    alchemetryx: "UK owner-led SMEs with one high-friction process eating time and money.",
    agency: "Businesses that need broad marketing, brand, or tech programmes.",
    zapier: "Businesses that know exactly what to automate and just need it wired up.",
  },
];

const FAQ_ITEMS = [
  {
    q: "What makes Alchemetryx different from a digital agency?",
    a: "A traditional agency takes on broad programmes: brand, marketing, technology. Alchemetryx does one thing only — picks the single highest-friction process inside your business and rebuilds it as a working system. The scope is tighter, the fee is fixed, and the result is something your team uses every day, not a slide deck.",
  },
  {
    q: "How is Alchemetryx different from a Zapier consultant?",
    a: "A Zapier consultant automates what is already there. If the data is messy, the automation makes messy things happen faster. Alchemetryx fixes the data layer first, then automates. The result is a system that stays reliable rather than one that breaks quietly.",
  },
  {
    q: "Is Alchemetryx more expensive than a freelance automation consultant?",
    a: "Alchemetryx charges a fixed project fee, not an hourly rate. A freelancer charging by the day has an incentive to go slow. We do not. The total cost is agreed before any work starts.",
  },
  {
    q: "Can Alchemetryx work alongside our existing agency?",
    a: "Yes. We work at the process and data layer, not at the brand or marketing layer. Most clients already have an agency. We fix the operational side that the agency was never set up to touch.",
  },
];

export default function ComparePage() {
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Alchemetryx vs. Traditional Agencies and Zapier Consultants",
    description:
      "A comparison of Alchemetryx with traditional digital agencies and Zapier consultants across scope, pricing, ownership, data approach, AI use, and proof of results.",
    numberOfItems: COMPARISON_ROWS.length,
    itemListElement: COMPARISON_ROWS.map((row, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: row.dimension,
      description: `Alchemetryx: ${row.alchemetryx} | Traditional agency: ${row.agency} | Zapier consultant: ${row.zapier}`,
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main className="w-full">

        {/* Hero */}
        <SectionFullBleed tone="dark" fullHeight={false} className="pt-40 pb-24 md:pt-56 md:pb-40">
          <Reveal>
            <div className="flex flex-col items-start gap-10 md:gap-14">
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold-deep)]">
                How we compare
              </p>
              <h1 className="font-urbanist font-light text-[clamp(3rem,7vw,6rem)] leading-[0.95] tracking-[-0.04em] max-w-[22ch] text-[var(--color-pearl)]">
                Alchemetryx vs. agencies and automation consultants
              </h1>
              <p className="text-lg md:text-xl font-normal leading-relaxed text-[var(--color-slate)] max-w-[48ch]">
                Most consultants automate what is already broken. We fix the thing underneath first, then make it run without you.
              </p>
            </div>
          </Reveal>
        </SectionFullBleed>

        {/* Comparison table */}
        <SectionFullBleed tone="light" fullHeight={false} className="py-20 md:py-[120px]">
          <Reveal>
            <div className="flex flex-col gap-12">
              <h2 className="font-urbanist font-light text-[clamp(2rem,4vw,3.5rem)] tracking-tight text-[var(--color-ink)] max-w-[30ch]">
                Side by side
              </h2>

              {/* Table — desktop */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[var(--color-pearl-line)]">
                      <th className="pb-4 pr-8 text-xs uppercase tracking-[0.14em] text-[var(--color-slate)] font-normal w-[22%]">
                        Dimension
                      </th>
                      <th className="pb-4 pr-8 text-xs uppercase tracking-[0.14em] text-[var(--color-gold-deep)] font-normal w-[26%]">
                        Alchemetryx
                      </th>
                      <th className="pb-4 pr-8 text-xs uppercase tracking-[0.14em] text-[var(--color-slate)] font-normal w-[26%]">
                        Traditional agency
                      </th>
                      <th className="pb-4 text-xs uppercase tracking-[0.14em] text-[var(--color-slate)] font-normal w-[26%]">
                        Zapier consultant
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARISON_ROWS.map((row, i) => (
                      <tr
                        key={i}
                        className="border-b border-[var(--color-pearl-line)] last:border-0"
                      >
                        <td className="py-5 pr-8 text-sm font-medium text-[var(--color-ink)] align-top">
                          {row.dimension}
                        </td>
                        <td className="py-5 pr-8 text-sm leading-relaxed text-[var(--color-ink)] align-top">
                          {row.alchemetryx}
                        </td>
                        <td className="py-5 pr-8 text-sm leading-relaxed text-[var(--color-ink)]/60 align-top">
                          {row.agency}
                        </td>
                        <td className="py-5 text-sm leading-relaxed text-[var(--color-ink)]/60 align-top">
                          {row.zapier}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Cards — mobile */}
              <div className="flex flex-col gap-6 md:hidden">
                {COMPARISON_ROWS.map((row, i) => (
                  <div
                    key={i}
                    className="flex flex-col gap-4 border border-[var(--color-pearl-line)] rounded-sm p-5"
                  >
                    <p className="text-xs uppercase tracking-[0.14em] text-[var(--color-slate)]">
                      {row.dimension}
                    </p>
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-col gap-1">
                        <span className="text-xs uppercase tracking-[0.12em] text-[var(--color-gold-deep)]">
                          Alchemetryx
                        </span>
                        <p className="text-sm leading-relaxed text-[var(--color-ink)]">
                          {row.alchemetryx}
                        </p>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-xs uppercase tracking-[0.12em] text-[var(--color-slate)]">
                          Traditional agency
                        </span>
                        <p className="text-sm leading-relaxed text-[var(--color-ink)]/60">
                          {row.agency}
                        </p>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-xs uppercase tracking-[0.12em] text-[var(--color-slate)]">
                          Zapier consultant
                        </span>
                        <p className="text-sm leading-relaxed text-[var(--color-ink)]/60">
                          {row.zapier}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </SectionFullBleed>

        {/* FAQ section */}
        <SectionFullBleed tone="dark" fullHeight={false} className="py-20 md:py-[120px]">
          <Reveal>
            <div className="flex flex-col gap-12 md:gap-16">
              <h2 className="font-urbanist font-light text-[clamp(2rem,4vw,3.5rem)] tracking-tight text-[var(--color-pearl)] max-w-[30ch]">
                Common questions
              </h2>

              <div className="flex flex-col gap-8 md:gap-12">
                {FAQ_ITEMS.map((item, i) => (
                  <Reveal key={i} delay={i * 0.1}>
                    <div className="flex flex-col gap-3 max-w-[65ch] border-b border-[var(--color-slate)]/20 pb-8 last:border-0 last:pb-0">
                      <h3 className="text-lg md:text-xl font-urbanist font-light tracking-[-0.02em] text-[var(--color-pearl)]">
                        {item.q}
                      </h3>
                      <p className="text-base leading-relaxed text-[var(--color-slate)]">
                        {item.a}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>
        </SectionFullBleed>

        {/* CTA */}
        <SectionFullBleed tone="light" fullHeight={false} className="py-24 md:py-40">
          <Reveal>
            <div className="flex flex-col items-start gap-10 md:gap-14">
              <p className="font-urbanist font-light text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] tracking-tight text-[var(--color-ink)] max-w-[25ch]">
                One process. Fixed fee. Yours when we are done.
              </p>
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <CircleExpandButton href="/book" variant="primary" size="lg">
                  Book a 30-minute call
                </CircleExpandButton>
                <Link
                  href="/how-we-work"
                  className="text-sm text-[var(--color-ink)] underline underline-offset-4 decoration-[var(--color-pearl-line)] hover:decoration-[var(--color-ink)] transition-colors duration-200 self-center focus-visible:outline-none focus-visible:outline-2 focus-visible:outline-[var(--color-gold)] focus-visible:outline-offset-2 rounded-sm"
                >
                  See how we work →
                </Link>
              </div>
            </div>
          </Reveal>
        </SectionFullBleed>

      </main>
    </>
  );
}
