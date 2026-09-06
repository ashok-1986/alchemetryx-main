import type { Metadata } from "next";
import Link from "next/link";
import { SectionFullBleed } from "@/components/sections/section-full-bleed";
import { Reveal } from "@/components/motion/reveal";
import { CircleExpandButton } from "@/components/ui/circle-expand-button";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Already bought AI? · Alchemetryx",
  description:
    "You bought the tools. Nobody checked what they changed. We look at what you already pay for and whether it is actually running anything.",
};

export default function AlreadyBoughtPage() {
  return (
    <>
      {/* ── Hero ── */}
      <SectionFullBleed tone="dark" className="pt-24 pb-20 md:pt-32 md:pb-28">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold)] mb-6">
            ALREADY BOUGHT AI?
          </p>
          <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-light leading-[1.06] tracking-[-0.04em] max-w-[22ch] text-[var(--color-pearl)]">
            You bought the tools. Nobody checked what they changed.
          </h1>
          <p className="mt-6 text-lg md:text-xl font-normal leading-relaxed text-[var(--color-slate)] max-w-[55ch]">
            You have paid for at least one AI or automation tool. You cannot
            clearly say what it changed. That is the problem we fix.
          </p>
        </Reveal>
      </SectionFullBleed>

      {/* ── The problem ── */}
      <SectionFullBleed tone="light" fullHeight={false} className="py-20 md:py-28">
        <Reveal>
          <div className="max-w-[65ch]">
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-gold-deep)] font-normal mb-4">
              WHAT &quot;BOUGHT BUT UNPROVEN&quot; LOOKS LIKE
            </p>
            <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-light leading-[1.08] tracking-[-0.03em] text-[var(--color-ink)]">
              The tools are there. The results are not.
            </h2>
            <p className="mt-6 text-base md:text-lg font-normal leading-relaxed text-[var(--color-ink)]">
              You are not alone. According to the British Chambers of Commerce,
              84% of UK SMEs have adopted at least one AI tool (BCC, 2024). The
              Federation of Small Businesses reports that most small firms cite
              lack of time and skills as the main barrier to getting value from
              the tools they buy (FSB, 2024). The tools are in. The value is
              not.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1100px]">
            {[
              {
                label: "Nobody owns the result.",
                body: "The tool was bought to solve a problem, but no one was assigned to make sure it actually did.",
              },
              {
                label: "The vendor dashboard does not talk to the rest of the business.",
                body: "You can see activity inside the tool. You cannot see whether the job it was supposed to replace actually got faster, cheaper, or more reliable.",
              },
              {
                label: "Multiple tools, multiple vendors, no single view.",
                body: "Three subscriptions. Three logins. Three dashboards. Nobody is accountable for whether the set, as a whole, is worth what it costs.",
              },
            ].map((card) => (
              <div
                key={card.label}
                className="rounded-md border border-[var(--color-pearl-line)] p-6 bg-[var(--color-pearl)] flex flex-col justify-between"
              >
                <p className="text-base font-normal text-[var(--color-ink)] tracking-[-0.01em]">
                  {card.label}
                </p>
                <p className="mt-3 text-sm md:text-base font-normal leading-relaxed text-[var(--color-ink)]/80">
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </SectionFullBleed>

      {/* ── The insight ── */}
      <SectionFullBleed tone="dark" fullHeight={false} className="py-20 md:py-28">
        <Reveal>
          <div className="max-w-[65ch]">
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-gold)] font-normal mb-4">
              WHAT WE SEE
            </p>
            <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-light leading-[1.08] tracking-[-0.03em] text-[var(--color-pearl)]">
              A tool sitting next to a job is not the same as a tool running a
              job.
            </h2>
            <p className="mt-6 text-base md:text-lg font-normal leading-relaxed text-[var(--color-pearl)]/85">
              Most businesses do not have a tool problem. They have a &quot;nobody
              connected the tool to the job&quot; problem. The subscription is paid.
              The dashboard has activity. But the actual work, the one a person
              still does by hand every week, has not changed.
            </p>
            <p className="mt-4 text-base md:text-lg font-normal leading-relaxed text-[var(--color-pearl)]/85">
              That is not a technology failure. It is a missing step. Someone
              needs to look at what you already pay for, what it actually does,
              and what would need to be true for it to matter.
            </p>
          </div>
        </Reveal>
      </SectionFullBleed>

      {/* ── What happens next ── */}
      <SectionFullBleed tone="light" fullHeight={false} className="py-20 md:py-28">
        <Reveal>
          <div className="max-w-[65ch]">
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-gold-deep)] font-normal mb-4">
              THE DIAGNOSTIC
            </p>
            <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-light leading-[1.08] tracking-[-0.03em] text-[var(--color-ink)]">
              We look at what you already have before we suggest what comes
              next.
            </h2>
            <p className="mt-6 text-base md:text-lg font-normal leading-relaxed text-[var(--color-ink)]">
              The Diagnostic is a structured review of the tools and processes
              you already pay for. We map each one to the job it was supposed to
              improve, check whether it is actually doing that, and identify the
              gaps.
            </p>
            <p className="mt-4 text-base md:text-lg font-normal leading-relaxed text-[var(--color-ink)]">
              No price discussion during the Diagnostic. The point is clarity,
              not a pitch.
            </p>
            <p className="mt-4 text-base md:text-lg font-normal leading-relaxed text-[var(--color-ink)]">
              If the tools you have are enough, we will say so. If something
              needs rebuilding, you will know exactly what and why before any
              next step.
            </p>
            <div className="mt-8 md:mt-10">
              <CircleExpandButton href="/diagnostic" variant="primary" size="lg">
                Start with a Diagnostic
              </CircleExpandButton>
            </div>
          </div>
        </Reveal>
      </SectionFullBleed>

      {/* ── Proof ── */}
      <SectionFullBleed tone="dark" fullHeight={false} className="py-20 md:py-28">
        <Reveal>
          <div className="max-w-[65ch]">
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-gold)] font-normal mb-4">
              REAL EXAMPLES
            </p>
            <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-light leading-[1.08] tracking-[-0.03em] text-[var(--color-pearl)]">
              This is not theoretical.
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[900px]">
            <Link
              href="/proof/care-rota"
              className="group rounded-md border border-[var(--color-sapphire-line)] p-8 bg-[var(--color-sapphire-raised)]/30 hover:bg-[var(--color-sapphire-raised)]/50 transition-colors cursor-pointer"
            >
              <p className="text-xs uppercase tracking-[0.14em] text-[var(--color-gold)] mb-3">
                Care Rota
              </p>
              <h3 className="text-xl font-normal text-[var(--color-pearl)] tracking-[-0.02em] leading-snug">
                A care home&apos;s rota lived in a spreadsheet. We rebuilt it as a
                system.
              </h3>
              <p className="mt-3 text-sm text-[var(--color-pearl)]/70 underline underline-offset-4 group-hover:text-[var(--color-pearl)] transition-colors">
                Read the case study →
              </p>
            </Link>

            <Link
              href="/proof/fitosys"
              className="group rounded-md border border-[var(--color-sapphire-line)] p-8 bg-[var(--color-sapphire-raised)]/30 hover:bg-[var(--color-sapphire-raised)]/50 transition-colors cursor-pointer"
            >
              <p className="text-xs uppercase tracking-[0.14em] text-[var(--color-gold)] mb-3">
                Fitosys
              </p>
              <h3 className="text-xl font-normal text-[var(--color-pearl)] tracking-[-0.02em] leading-snug">
                A fitness coach&apos;s Sundays went to admin. We built a system
                that runs without them.
              </h3>
              <p className="mt-3 text-sm text-[var(--color-pearl)]/70 underline underline-offset-4 group-hover:text-[var(--color-pearl)] transition-colors">
                Read the case study →
              </p>
            </Link>
          </div>
        </Reveal>
      </SectionFullBleed>

      {/* ── Final CTA ── */}
      <SectionFullBleed id="book" tone="light" fullHeight={false} className="border-t border-[var(--color-pearl-line)] py-20 md:py-32">
        <Reveal>
          <div className="max-w-[48ch]">
            <h2 className="text-[clamp(2.25rem,4.5vw,3.75rem)] font-light leading-[1.08] tracking-[-0.035em] text-[var(--color-ink)]">
              Stop guessing what the tools did.
            </h2>
            <p className="mt-6 text-lg md:text-xl font-normal leading-relaxed text-[var(--color-ink)]">
              Book a 30-minute call. We will look at what you have already bought
              and tell you what it is actually doing. If there is nothing here
              worth rebuilding, we will say so on the call.
            </p>
            <div className="mt-8 md:mt-10">
              <CircleExpandButton
                href={COMPANY.primaryCtaHref}
                variant="primary"
                size="lg"
              >
                {COMPANY.primaryCtaLabel}
              </CircleExpandButton>
            </div>
          </div>
        </Reveal>
      </SectionFullBleed>
    </>
  );
}
