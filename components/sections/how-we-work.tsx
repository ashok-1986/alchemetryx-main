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
        <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-light leading-tight tracking-[-0.03em] max-w-[22ch]">
          Look. Decide. Improve.
        </h2>
        <p className="mt-6 max-w-[65ch] text-base md:text-lg font-light leading-relaxed text-[var(--color-ink)]/80">
          <strong className="font-normal text-[var(--color-ink)]">If a person is copying data between three tabs, a system should be doing it.</strong>{" "}
          We map the repetitive work that eats hours every week and engineer it out, without breaking what already works.
        </p>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
        {STEPS.map((s, i) => (
          <Reveal key={s.step} delay={i * 0.1}>
            <div className="h-full rounded-md border border-[var(--color-pearl-line)] p-7">
              <p className="text-xs font-normal uppercase tracking-[0.16em] text-[var(--color-gold-deep)]">
                {String(i + 1).padStart(2, "0")} / {s.step}
              </p>
              <h3 className="mt-4 text-xl font-light text-[var(--color-ink)]">{s.service}</h3>
              <p className="mt-1 text-sm text-[var(--color-ink)]/60">{s.time}</p>
              <p className="mt-4 text-base font-light leading-relaxed text-[var(--color-ink)]/80">
                {s.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </SectionFullBleed>
  );
}
