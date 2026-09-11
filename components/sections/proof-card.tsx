import Link from "next/link";
import Image from "next/image";
import { SectionFullBleed } from "@/components/sections/section-full-bleed";
import { Reveal } from "@/components/motion/reveal";
import { PUBLISHED_CASE_STUDIES } from "@/content/case-studies";

export default function ProofCard() {
  const firstStudy = PUBLISHED_CASE_STUDIES[0];
  const firstScreenshot = firstStudy?.build.items[0];

  if (!firstStudy) return null;

  return (
    <SectionFullBleed id="proof-card" tone="light" className="border-t border-[var(--color-pearl-line)] py-20 md:py-32">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Text Side */}
        <div className="lg:col-span-5 order-2 lg:order-1">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold-deep)] mb-4 md:mb-6">
              {firstStudy.eyebrow}
            </p>
            <h2 className="text-[clamp(2rem,3.5vw,3rem)] font-light leading-[1.1] tracking-[-0.02em] text-[var(--color-ink)]">
              {firstStudy.title}
            </h2>
            <p className="mt-5 md:mt-6 text-base md:text-lg font-normal leading-relaxed text-[var(--color-ink)] max-w-[45ch]">
              {firstStudy.standfirst}
            </p>
            <div className="mt-8 md:mt-10">
              <Link
                href={`/proof/${firstStudy.slug}`}
                className="inline-flex items-center justify-center rounded-full bg-[var(--color-gold)] px-6 py-3 text-sm font-semibold tracking-wide text-white transition-all hover:bg-[var(--color-gold-deep)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-gold)] shadow-sm hover:-translate-y-0.5"
              >
                View full case study
              </Link>
            </div>
          </Reveal>
        </div>

        {/* Image Side */}
        <div className="lg:col-span-7 order-1 lg:order-2">
          <Reveal delay={0.1}>
            {firstScreenshot && (
              <Link href={`/proof/${firstStudy.slug}`} className="block group">
                <div className="relative rounded-xl border border-[var(--color-pearl-line)] overflow-hidden shadow-lg transition-transform duration-500 ease-out group-hover:scale-[1.02]">
                  <Image
                    src={firstScreenshot.image}
                    alt={firstScreenshot.alt}
                    width={1000}
                    height={650}
                    className="w-full h-auto object-cover"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </Link>
            )}
          </Reveal>
        </div>
      </div>
    </SectionFullBleed>
  );
}