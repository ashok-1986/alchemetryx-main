import Link from "next/link";
import { SectionFullBleed } from "./section-full-bleed";
import { Button } from "@/components/ui/button";

const LADDER_STEPS = [
  {
    step: "01",
    title: "The Diagnostic",
    href: "/diagnostic",
    timeframe: "2 weeks",
    outcome: "Know which process is costing you most, and what fixing it is worth.",
    description:
      "We audit your day-to-day workflow, measure the exact hours lost to manual work, and pinpoint the single process with the highest return on automation.",
  },
  {
    step: "02",
    title: "The Build",
    href: "/build",
    timeframe: "4 to 8 weeks",
    outcome: "The process runs on its own.",
    description:
      "We rebuild that process into a reliable, self-running system integrated into your existing software, with human review where judgment is required.",
  },
  {
    step: "03",
    title: "The Retainer",
    href: "/retainer",
    timeframe: "Monthly",
    outcome: "It keeps running, and you can see that it does.",
    description:
      "We monitor performance, catch edge cases before they create problems, provide guaranteed uptime, and tune the system as your volume grows.",
  },
];

export function Ladder() {
  return (
    <SectionFullBleed tone="light" id="the-ladder">
      <div className="space-y-12">
        <div className="space-y-4 max-w-[700px]">
          <p className="text-xs font-normal uppercase tracking-wider text-[var(--color-gold-deep)]">
            How We Work
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-[-0.04em] text-[var(--color-ink)]">
            One process. Rebuilt, verified, and kept running.
          </h2>
          <p className="text-base text-[var(--color-ink)]/80 max-w-[65ch]">
            A clear three-stage progression with defined timeframes and measurable outcomes. We do not sell open-ended consulting hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {LADDER_STEPS.map((step) => (
            <div
              key={step.step}
              className="p-8 rounded-[9px] bg-white border border-[var(--color-pearl-line)] flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[var(--color-slate)]">
                    {step.step}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-[6px] text-xs font-normal bg-[var(--color-pearl)] text-[var(--color-ink)] border border-[var(--color-pearl-line)]">
                    {step.timeframe}
                  </span>
                </div>
                <h3 className="text-2xl font-light tracking-[-0.02em] text-[var(--color-ink)]">
                  {step.title}
                </h3>
                <p className="text-base font-normal text-[var(--color-gold-deep)] leading-snug">
                  {step.outcome}
                </p>
                <p className="text-sm text-[var(--color-ink)]/75 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="pt-2">
                <Button asChild variant="outline-light" size="sm" className="w-full">
                  <Link href={step.href}>Explore {step.title}</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionFullBleed>
  );
}
