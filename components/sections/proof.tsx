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
        <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-light leading-tight tracking-[-0.03em] max-w-[24ch]">
          {cs.title}
        </h2>
        <p className="mt-6 max-w-[60ch] text-base md:text-lg font-light leading-relaxed text-[var(--color-ink)]/75">
          {cs.standfirst}
        </p>
        <p className="mt-4 text-sm text-[var(--color-ink)]/55">{cs.attribution}</p>
      </Reveal>

      {/* The before */}
      <Reveal delay={0.1}>
        <div className="mt-16 max-w-[65ch]">
          <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-ink)]/50">
            01 / The before
          </p>
          <h3 className="mt-3 text-2xl font-light">{cs.before.heading}</h3>
          <p className="mt-4 text-base font-light leading-relaxed text-[var(--color-ink)]/80">
            {cs.before.body}
          </p>
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {cs.before.points.map((p) => (
            <div key={p.label} className="border-t border-[var(--color-pearl-line)] pt-4">
              <p className="text-sm font-normal text-[var(--color-ink)]">{p.label}</p>
              <p className="mt-2 text-sm font-light leading-relaxed text-[var(--color-ink)]/70">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </Reveal>

      {/* The build */}
      <Reveal delay={0.1}>
        <div className="mt-20 max-w-[65ch]">
          <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-ink)]/50">
            02 / The build
          </p>
          <h3 className="mt-3 text-2xl font-light">{cs.build.heading}</h3>
          <p className="mt-4 text-base font-light leading-relaxed text-[var(--color-ink)]/80">
            {cs.build.body}
          </p>
        </div>
      </Reveal>

      <div className="mt-12 space-y-16">
        {cs.build.items.map((item, i) => (
          <Reveal key={item.title} delay={i * 0.05}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-4">
                <h4 className="text-xl font-light text-[var(--color-ink)]">{item.title}</h4>
                <p className="mt-3 text-sm font-light leading-relaxed text-[var(--color-ink)]/70 max-w-[42ch]">
                  {item.caption}
                </p>
              </div>
              <div className="lg:col-span-8">
                <div className="overflow-hidden rounded-md border border-[var(--color-pearl-line)] bg-[var(--color-sapphire)]">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    width={1500}
                    height={979}
                    className="w-full h-auto"
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
          <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-ink)]/50">
            What this is, and what it isn’t
          </p>
          <h3 className="mt-3 text-2xl font-light">{cs.honesty.heading}</h3>
          <p className="mt-4 text-base font-light leading-relaxed text-[var(--color-ink)]/80">
            {cs.honesty.body}
          </p>
          <p className="mt-8 text-lg font-light text-[var(--color-ink)]">
            If your rota still lives in a spreadsheet, that is a conversation worth having.
          </p>
        </div>
      </Reveal>
    </SectionFullBleed>
  );
}
