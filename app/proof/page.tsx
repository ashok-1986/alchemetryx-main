import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SectionFullBleed } from "@/components/sections/section-full-bleed";
import { Reveal } from "@/components/motion/reveal";
import { PUBLISHED_CASE_STUDIES } from "@/content/case-studies";

export const metadata: Metadata = {
  title: "Proof · Alchemetryx",
  description:
    "Real systems we've built: care operations, coaching automation, client intake, and consultation booking pipelines.",
};

/**
 * The index. Every published case study gets a card here — this used to
 * hardcode PUBLISHED_CASE_STUDIES[0] and silently drop anything added after
 * it. Fixed so a third study is just a third array entry, nothing here
 * needs to change.
 */
export default function ProofPage() {
  return (
    <SectionFullBleed id="proof" tone="light" className="border-t border-[var(--color-pearl-line)]">
      <Reveal>
        <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold-deep)] mb-6">
          PROOF
        </p>
        <h2 className="text-[clamp(2.25rem,4.5vw,3.75rem)] font-light leading-[1.08] tracking-[-0.035em] text-[var(--color-ink)] max-w-[24ch]">
          What we've actually built.
        </h2>
        <p className="mt-6 max-w-[60ch] text-lg md:text-xl font-normal leading-relaxed text-[var(--color-ink)]">
          Every case here is a real system, either delivered for a client or built and run by us.
        </p>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8">
        {PUBLISHED_CASE_STUDIES.map((study, i) => {
          const cover = study.build.items[0];
          return (
            <Reveal key={study.slug} delay={i * 0.08}>
              <Link
                href={`/proof/${study.slug}`}
                className="group block h-full rounded-md border border-[var(--color-pearl-line)] overflow-hidden transition-all duration-200 ease-out hover:border-[var(--color-gold-deep)]/50 hover:-translate-y-[2px] hover:shadow-[0_8px_24px_-8px_rgba(17,25,43,0.06)] bg-[var(--color-pearl)] cursor-pointer"
              >
                {cover && (
                  <Image
                    src={cover.image}
                    alt={cover.alt}
                    width={800}
                    height={522}
                    className="w-full h-auto border-b border-[var(--color-pearl-line)]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                )}
                <div className="p-6 md:p-7">
                  <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-gold-deep)]">
                    {study.eyebrow}
                  </p>
                  <h3 className="mt-3 text-xl sm:text-2xl font-normal text-[var(--color-ink)] tracking-[-0.02em] max-w-[24ch]">
                    {study.title}
                  </h3>
                  <p className="mt-3 text-base font-normal leading-relaxed text-[var(--color-ink)]/85">
                    {study.standfirst}
                  </p>
                  <span className="mt-5 inline-flex items-center text-base font-normal text-[var(--color-ink)] group-hover:text-[var(--color-gold-deep)] underline underline-offset-4 transition-colors">
                    View full case study →
                  </span>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </SectionFullBleed>
  );
}
