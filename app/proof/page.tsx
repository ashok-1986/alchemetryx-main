import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SectionFullBleed } from "@/components/sections/section-full-bleed";
import { Reveal } from "@/components/motion/reveal";
import { PUBLISHED_CASE_STUDIES } from "@/content/case-studies";

export const metadata: Metadata = {
  title: "Proof · Alchemetryx",
  description:
    "See how we rebuilt a care home's rota from a spreadsheet into one system that holds cost, coverage and compliance.",
};

const firstStudy = PUBLISHED_CASE_STUDIES[0];
const firstScreenshot = firstStudy?.build.items[0];

export default function ProofPage() {
  if (!firstStudy) return null;

  return (
    <SectionFullBleed id="proof" tone="light" className="pt-24 md:pt-28 border-t border-[var(--color-pearl-line)]">
      <Reveal>
        <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold-deep)] mb-6">
          {firstStudy.eyebrow}
        </p>
        <h2 className="text-[clamp(2.25rem,4.5vw,3.75rem)] font-light leading-[1.08] tracking-[-0.035em] text-[var(--color-ink)] max-w-[24ch]">
          {firstStudy.title}
        </h2>
        <p className="mt-6 max-w-[60ch] text-lg md:text-xl font-normal leading-relaxed text-[var(--color-ink)]">
          {firstStudy.standfirst}
        </p>
        <div className="mt-6 space-y-6">
          <Link
            href={`/proof/${firstStudy.slug}`}
            className="inline-flex items-center text-base sm:text-lg font-normal text-[var(--color-ink)] hover:text-[var(--color-gold-deep)] underline underline-offset-4 transition-colors cursor-pointer"
          >
            <span className="mr-2">View full case study →</span>
            {firstStudy.title.split(".")[0]}
          </Link>
          {firstScreenshot && (
            <div className="mt-4">
              <Image
                src={firstScreenshot.image}
                alt={firstScreenshot.alt}
                width={800}
                height={522}
                className="w-full max-w-[60ch] h-auto rounded-md border border-[var(--color-pearl-line)]"
                sizes="(max-width: 768px) 100vw, 60ch"
              />
            </div>
          )}
        </div>
      </Reveal>
    </SectionFullBleed>
  );
}