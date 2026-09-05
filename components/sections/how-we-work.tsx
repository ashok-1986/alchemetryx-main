import { SectionFullBleed } from "@/components/sections/section-full-bleed";
import { Reveal } from "@/components/motion/reveal";

const STEPS = [
  {
    step: "Look",
    service: "The Diagnostic",
    time: "2 weeks",
    body: "We work out what is actually happening. Which jobs run on memory, what they cost you in hours, and which one is worth changing first.",
  },
  {
    step: "Decide",
    service: "The Build",
    time: "4 to 8 weeks",
    body: "We rebuild that one job as a working system, inside the tools you already have where that makes sense. You see it running before it takes over.",
  },
  {
    step: "Improve",
    service: "The Retainer",
    time: "Monthly",
    body: "We stay while it settles, fix what the real world breaks, and pick up the next job when you are ready. If there is nothing worth doing, we say so.",
  },
];

export function HowWeWork() {
  return (
    <SectionFullBleed tone="light" className="border-t border-[var(--color-pearl-line)]">
      <Reveal>
        <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold-deep)] mb-6">
          HOW WE WORK
        </p>
        <h2 className="text-[clamp(2.25rem,4.5vw,3.75rem)] font-light leading-[1.08] tracking-[-0.035em] text-[var(--color-ink)] max-w-[22ch]">
          Look. Decide. Improve.
        </h2>
        <p className="mt-6 max-w-[65ch] text-lg md:text-xl font-normal leading-relaxed text-[var(--color-ink)]">
          <strong className="font-normal text-[var(--color-ink)]">If a person is copying data between three tabs, a system should be doing it.</strong>{" "}
          We map the repetitive work that eats hours every week and engineer it out, without breaking what already works.
        </p>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
        {STEPS.map((s, i) => (
          <Reveal key={s.step} delay={i * 0.08} className="h-full">
            <div className="h-full flex flex-col justify-between rounded-md border border-[var(--color-pearl-line)] p-7 transition-all duration-200 ease-out hover:border-[var(--color-gold-deep)]/50 hover:-translate-y-[2px] hover:shadow-[0_8px_24px_-8px_rgba(17,25,43,0.06)] bg-[var(--color-pearl)]">
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-xs font-normal uppercase tracking-[0.16em] text-[var(--color-gold-deep)]">
                    {String(i + 1).padStart(2, "0")} / {s.step}
                  </p>
                  <span className="text-xs font-normal px-2.5 py-0.5 rounded-full border border-[var(--color-pearl-line)] bg-[var(--color-ink)]/[0.03] text-[var(--color-ink)]/80 tracking-wide">
                    {s.time}
                  </span>
                </div>
                <h3 className="mt-5 text-xl sm:text-2xl font-normal text-[var(--color-ink)] tracking-[-0.02em]">
                  {s.service}
                </h3>
              </div>
              <p className="mt-6 text-base font-normal leading-relaxed text-[var(--color-ink)]">
                {s.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </SectionFullBleed>
  );
}
