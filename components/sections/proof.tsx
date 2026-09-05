import Image from "next/image";
import { SectionFullBleed } from "@/components/sections/section-full-bleed";
import { Reveal } from "@/components/motion/reveal";
import { CARE_ROTA } from "@/content/case-studies";

export function Proof() {
  const cs = CARE_ROTA;

  return (
    <SectionFullBleed tone="light" className="border-t border-[var(--color-pearl-line)]">
      <Reveal>
        <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold-deep)] mb-6">
          {cs.eyebrow}
        </p>
        <h2 className="text-[clamp(2.25rem,4.5vw,3.75rem)] font-light leading-[1.08] tracking-[-0.035em] text-[var(--color-ink)] max-w-[24ch]">
          {cs.title}
        </h2>
        <p className="mt-6 max-w-[60ch] text-lg md:text-xl font-normal leading-relaxed text-[var(--color-ink)]">
          {cs.standfirst}
        </p>
        <p className="mt-4 text-sm font-normal text-[var(--color-ink)]/65">{cs.attribution}</p>
      </Reveal>

      {/* The before */}
      <Reveal delay={0.1}>
        <div className="mt-16 max-w-[65ch]">
          <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-ink)]/60 font-normal">
            01 / The before
          </p>
          <h3 className="mt-3 text-2xl sm:text-3xl font-normal text-[var(--color-ink)] tracking-[-0.02em]">
            {cs.before.heading}
          </h3>
          <p className="mt-4 text-base md:text-lg font-normal leading-relaxed text-[var(--color-ink)]">
            {cs.before.body}
          </p>
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {cs.before.points.map((p) => (
            <div key={p.label} className="border-t border-[var(--color-pearl-line)] pt-4">
              <p className="text-base font-normal text-[var(--color-ink)]">{p.label}</p>
              <p className="mt-2 text-sm md:text-base font-normal leading-relaxed text-[var(--color-ink)]/80">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </Reveal>

      {/* The build */}
      <Reveal delay={0.1}>
        <div className="mt-20 max-w-[65ch]">
          <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-ink)]/60 font-normal">
            02 / The build
          </p>
          <h3 className="mt-3 text-2xl sm:text-3xl font-normal text-[var(--color-ink)] tracking-[-0.02em]">
            {cs.build.heading}
          </h3>
          <p className="mt-4 text-base md:text-lg font-normal leading-relaxed text-[var(--color-ink)]">
            {cs.build.body}
          </p>
        </div>
      </Reveal>

      <div className="mt-12 space-y-16">
        {cs.build.items.map((item, i) => (
          <Reveal key={item.title} delay={i * 0.05}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-4">
                <h4 className="text-xl sm:text-2xl font-normal text-[var(--color-ink)] tracking-[-0.02em]">
                  {item.title}
                </h4>
                <p className="mt-3 text-sm md:text-base font-normal leading-relaxed text-[var(--color-ink)]/85 max-w-[42ch]">
                  {item.caption}
                </p>
              </div>
              <div className="lg:col-span-8">
                <div className="group overflow-hidden rounded-md border border-[var(--color-pearl-line)] bg-[var(--color-sapphire)]">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    width={1500}
                    height={979}
                    className="w-full h-auto transition-transform duration-300 ease-out group-hover:scale-[1.015]"
                    sizes="(max-width: 1024px) 100vw, 66vw"
                  />
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* The honesty block */}
      <Reveal delay={0.1}>
        <div className="mt-20 max-w-[65ch] border-t border-[var(--color-pearl-line)] pt-10">
          <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-ink)]/60 font-normal">
            What this is, and what it isn’t
          </p>
          <h3 className="mt-3 text-2xl sm:text-3xl font-normal text-[var(--color-ink)] tracking-[-0.02em]">
            {cs.honesty.heading}
          </h3>
          <p className="mt-4 text-base md:text-lg font-normal leading-relaxed text-[var(--color-ink)]">
            {cs.honesty.body}
          </p>
          <p className="mt-8 text-lg md:text-xl font-normal text-[var(--color-ink)]">
            If your rota still lives in a spreadsheet, that is a conversation worth having.
          </p>
        </div>
      </Reveal>
    </SectionFullBleed>
  );
}
