import type { Metadata } from "next";
import Link from "next/link";
import { CircleExpandButton } from "@/components/ui/circle-expand-button";
import { SectionFullBleed } from "@/components/sections/section-full-bleed";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: { absolute: "How we work — Alchemetryx" },
  description:
    "How we take one process off your plate and make it run on its own. The full method, step by step. We work inside your systems, ship a working thing, and stay to prove it worked.",
  alternates: {
    canonical: "/how-we-work",
  },
  openGraph: {
    title: "How we work — Alchemetryx",
    description:
      "How we take one process off your plate and make it run on its own. The full method, step by step. We work inside your systems, ship a working thing, and stay to prove it worked.",
    images: [{ url: "/og/how-we-work.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "How we work — Alchemetryx",
    description:
      "How we take one process off your plate and make it run on its own. The full method, step by step. We work inside your systems, ship a working thing, and stay to prove it worked.",
    images: ["/og/how-we-work.png"],
  },
};

const STEPS = [
  {
    title: "We find the one process costing you most.",
    body: "We go through every tool and every routine, and we find the single process eating the most time and money. Not ten problems. One. The one worth fixing first.",
  },
  {
    title: "We decide what to keep, kill, and fix.",
    body: "You get a plain list. What is working and stays. What you pay for that returns nothing and should go. And the one workflow worth rebuilding. No jargon, just the decision.",
  },
  {
    title: "We fix the data underneath first.",
    body: "Most automation fails because it runs on messy data. So before we automate anything, we make the information underneath it clean and reliable. Skip this and the automation just makes wrong things happen faster.",
  },
  {
    title: "We build the workflow so it runs on its own.",
    body: "We rebuild that one process as a working system, inside your own tools. Not a slide, not a trial. A live thing your team uses from day one, with a person checking the points that need a person.",
  },
  {
    title: "We measure before and after.",
    body: "We take the baseline before we touch anything, and the same measure after. If the number did not move, we do not claim it moved. You see the real difference, in hours and money.",
  },
  {
    title: "We stay and keep it running.",
    body: "A system left alone drifts. We stay on, watch it, keep it working, and take the next process off your plate when you are ready.",
  },
];

export default function HowWeWorkPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "How we work",
    description: "How we take one process off your plate and make it run on its own. The full method, step by step.",
    mainEntity: {
      "@type": "Organization",
      name: "Alchemetryx",
      url: "https://alchemetryx.com",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="w-full">
        {/* Section 1 — Hero (Sapphire) */}
        <SectionFullBleed tone="dark" fullHeight={false} className="pt-40 pb-32 md:pt-56 md:pb-48">
          <Reveal>
            <div className="flex flex-col items-start gap-12 md:gap-16">
              <h1 className="font-urbanist font-light text-[clamp(3.5rem,8vw,7rem)] leading-[0.9] tracking-[-0.04em] max-w-[20ch]">
                The tools were supposed to help. You are still the system.
              </h1>

              <p className="text-lg md:text-2xl font-normal leading-relaxed text-[var(--color-slate)] max-w-[45ch]">
                This is how we fix that. The whole method, nothing held back.
              </p>

              <CircleExpandButton href="/book" variant="primary" size="lg">
                Book a 30-minute call
              </CircleExpandButton>
            </div>
          </Reveal>
        </SectionFullBleed>

        {/* Section 2 — The cost (Pearl) */}
        <SectionFullBleed tone="light" fullHeight={false} className="py-20 md:py-[120px]">
          <Reveal>
            <div className="flex flex-col gap-8 md:gap-12">
              <h2 className="font-urbanist font-light text-[clamp(2.5rem,5vw,4.5rem)] tracking-tight text-[var(--color-ink)] max-w-[25ch]">
                Where the week actually goes
              </h2>

              <div className="flex flex-col gap-6 md:gap-8">
                <p className="text-base md:text-lg font-normal leading-relaxed text-[var(--color-ink)] max-w-[55ch]">
                  Invoicing done twice. A rota rebuilt every Monday. The same customer detail typed into three places. Each one costs hours, every week, and the hours are yours.
                </p>
                <p className="text-base md:text-lg font-normal leading-relaxed text-[var(--color-ink)] max-w-[55ch]">
                  Add up those hours. Multiply by what an hour of your team costs. That number is the gap. It has sat there so long you have stopped seeing it.
                </p>
              </div>
            </div>
          </Reveal>
        </SectionFullBleed>

        {/* Section 3 — The method (Pearl) */}
        <SectionFullBleed tone="light" fullHeight={false} className="pb-20 md:pb-[120px]">
          <Reveal>
            <div className="flex flex-col gap-16 md:gap-24">
              <h2 className="font-urbanist font-light text-[clamp(2.5rem,5vw,4.5rem)] tracking-tight text-[var(--color-ink)] max-w-[25ch]">
                How we fix one process, end to end
              </h2>

              {/* The Six Steps Sequence */}
              <div className="relative pl-4 md:pl-0">
                {/* Desktop vertical line */}
                <div className="hidden md:block absolute left-8 top-8 bottom-8 w-[1px] bg-[var(--color-pearl-line)]" />
                
                <div className="flex flex-col gap-12 md:gap-20">
                  {STEPS.map((step, idx) => (
                    <Reveal key={idx} delay={idx * 0.1}>
                      <div className="relative grid grid-cols-[80px_1fr] md:grid-cols-[140px_1fr] gap-4 md:gap-8 md:items-start group">
                        {/* Step Number - aligned to line on desktop */}
                        <div className="relative z-10 font-urbanist font-light text-[var(--color-gold)] text-3xl md:text-5xl bg-[var(--color-pearl)] md:pt-1">
                          {["One.", "Two.", "Three.", "Four.", "Five.", "Six."][idx]}
                        </div>
                        
                        <div className="flex flex-col gap-4">
                          <p className="text-xl md:text-2xl font-urbanist font-light tracking-[-0.02em] leading-tight text-[var(--color-ink)]">
                            {step.title}
                          </p>
                          <p className="text-base md:text-lg font-normal leading-relaxed text-[var(--color-ink)] max-w-[55ch]">
                            {step.body}
                          </p>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>

              <Reveal delay={0.2}>
                <div className="pt-8 md:pt-12 border-t border-[var(--color-pearl-line)]">
                  <p className="text-xl md:text-2xl font-urbanist font-light leading-relaxed text-[var(--color-ink)] max-w-[55ch]">
                    Two things you will not get from most firms. We work inside your own systems, not from the outside sending documents. And we never bill by the day, so we are not paid to go slow.
                  </p>
                </div>
              </Reveal>
            </div>
          </Reveal>
        </SectionFullBleed>

        {/* Section 4 — What you own (Sapphire) */}
        <SectionFullBleed tone="dark" fullHeight={false} className="py-20 md:py-[120px] relative overflow-hidden">
          {/* Subtle gold accent rule */}
          <div className="absolute top-0 left-0 w-32 h-1 bg-[var(--color-gold)]" />
          
          <Reveal>
            <div className="flex flex-col gap-8 md:gap-12">
              <h2 className="font-urbanist font-light text-[clamp(2.5rem,5vw,4.5rem)] tracking-tight text-[var(--color-pearl)] max-w-[25ch]">
                You own it. All of it.
              </h2>
              <p className="text-base md:text-lg font-normal leading-relaxed text-[var(--color-slate)] max-w-[55ch]">
                The system, the setup, the documentation. It is yours. If we stopped working together tomorrow, nothing switches off and nothing gets held to ransom. That is the opposite of how most software deals work, and it is on purpose.
              </p>
            </div>
          </Reveal>
        </SectionFullBleed>

        {/* Section 5 — Proof (Pearl) */}
        <SectionFullBleed tone="light" fullHeight={false} className="py-20 md:py-[120px]">
          <Reveal>
            <div className="flex flex-col gap-8 md:gap-12">
              <h2 className="font-urbanist font-light text-[clamp(2.5rem,5vw,4.5rem)] tracking-tight text-[var(--color-ink)] max-w-[25ch]">
                We have done this
              </h2>
              
              <div className="flex flex-col items-start gap-8">
                <p className="text-base md:text-lg font-normal leading-relaxed text-[var(--color-ink)] max-w-[55ch]">
                  Care Rota. Fitosys. Two builds we can show you, with the numbers before and after.
                </p>
                
                <Link 
                  href="/proof"
                  className="inline-flex items-center text-lg md:text-xl font-normal text-[var(--color-ink)] hover:text-[var(--color-gold-deep)] underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:outline-2 focus-visible:outline-[var(--color-gold)] focus-visible:outline-offset-2 rounded-sm"
                >
                  See the proof →
                </Link>
              </div>
            </div>
          </Reveal>
        </SectionFullBleed>

        {/* Section 6 — Final CTA (Sapphire) */}
        <SectionFullBleed tone="dark" fullHeight={false} className="py-24 md:py-40">
          <Reveal>
            <div className="flex flex-col items-start gap-12 md:gap-16">
              <p className="font-urbanist font-light text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] tracking-tight text-[var(--color-pearl)] max-w-[25ch]">
                One process. Off your plate. Running without you.
              </p>

              <CircleExpandButton href="/book" variant="primary" size="lg">
                Book a 30-minute call
              </CircleExpandButton>
            </div>
          </Reveal>
        </SectionFullBleed>
      </main>
    </>
  );
}
