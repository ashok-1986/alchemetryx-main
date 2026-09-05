import { SectionFullBleed } from "@/components/sections/section-full-bleed";
import { Reveal } from "@/components/motion/reveal";
import { COMPANY } from "@/lib/constants";

export function WhoWeAre() {
  return (
    <SectionFullBleed id="who-we-are" tone="dark" fullHeight={false} className="py-20 md:py-28">
      <Reveal>
        <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold)] mb-6">
          WHO YOU WOULD BE WORKING WITH
        </p>
        <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-light leading-tight tracking-[-0.03em] max-w-[22ch]">
          A small firm that builds the thing, not a deck about it.
        </h2>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
        <Reveal className="lg:col-span-7" delay={0.1}>
          <div className="max-w-[60ch]">
            <p className="text-base md:text-lg font-light leading-relaxed text-[var(--color-slate)]">
              Alchemetryx is led by Ashok Verma. We take on one job at a time, build it properly, and stay while it settles. The CareRota system above runs on our own infrastructure.
            </p>
            <p className="mt-4 text-base md:text-lg font-light leading-relaxed text-[var(--color-slate)]">
              If we do not think there is a problem worth paying to solve, we will tell you that instead.
            </p>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-5" delay={0.2}>
          <div className="rounded-md border border-[var(--color-sapphire-line)] p-7">
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-slate)]">
              Registered
            </p>
            <p className="mt-3 text-lg font-light text-[var(--color-pearl)]">
              {COMPANY.companyNumberLabel}
            </p>
            <a
              href={COMPANY.companiesHouseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-sm text-[var(--color-gold)] underline underline-offset-4 hover:opacity-80 transition-opacity cursor-pointer"
            >
              Check us on Companies House
            </a>
          </div>
        </Reveal>
      </div>
    </SectionFullBleed>
  );
}
