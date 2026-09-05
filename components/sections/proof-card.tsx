import Link from "next/link";
import Image from "next/image";
import { SectionFullBleed } from "@/components/sections/section-full-bleed";
import { Reveal } from "@/components/motion/reveal";
import { CARE_ROTA } from "@/content/case-studies";

export default function ProofCard() {
  const firstScreenshot = CARE_ROTA.build.items[0];

  return (
    <SectionFullBleed id="proof-card" tone="light" className="border-t border-[var(--color-pearl-line)] py-12">
      <Reveal>
        <div className="max-w-[60ch]">
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold-deep)] mb-6">
            Case study · Care operations
          </p>
          <h2 className="text-[clamp(2.25rem,4.5vw,3.75rem)] font-light leading-[1.08] tracking-[-0.035em] text-[var(--color-ink)] max-w-[24ch]">
            CareRota: One system that understands a care home
          </h2>
          <p className="mt-6 text-base md:text-lg font-normal leading-relaxed text-[var(--color-ink)] max-w-[60ch]">
            How a fragmented monthly roster for a UK care home became one place to plan shifts, watch cost, and stay compliant.
          </p>
          <div className="mt-6">
            <Image
              src={firstScreenshot.image}
              alt={firstScreenshot.alt}
              width={800}
              height={522}
              className="w-full h-auto rounded-md border border-[var(--color-pearl-line)] mb-4"
              sizes="(max-width: 768px) 100vw, 60ch"
            />
            <Link
              href="/proof/care-rota"
              className="inline-flex items-center text-base sm:text-lg font-normal text-[var(--color-ink)] hover:text-[var(--color-gold-deep)] underline underline-offset-4 transition-colors cursor-pointer"
            >
              View full case study →
            </Link>
          </div>
        </div>
      </Reveal>
    </SectionFullBleed>
  );
}