import Link from "next/link";
import { SectionFullBleed } from "@/components/sections/section-full-bleed";
import { Reveal } from "@/components/motion/reveal";
import { ScopeDiagram } from "@/components/sections/scope-diagram";
import { Button } from "@/components/ui/button";

interface WhoWeAreProps {
  headingLevel?: "h1" | "h2";
  eyebrow?: string;
  heading?: string;
  showCareRotaReference?: boolean;
  /** The home page routes on to /about. The About page has nowhere to send you. */
  showCta?: boolean;
}

export function WhoWeAre({
  headingLevel = "h2",
  eyebrow = "WHO YOU WOULD BE WORKING WITH",
  heading = "We build the thing, not a deck about it.",
  showCareRotaReference = true,
  showCta = true,
}: WhoWeAreProps = {}) {
  const HeadingTag = headingLevel;

  return (
    <SectionFullBleed id="who-we-are" tone="dark" fullHeight={false} className="py-20 md:py-28">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left: the words */}
        <div className="lg:col-span-7">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold)] mb-6">
              {eyebrow}
            </p>
            <HeadingTag className="text-[clamp(1.75rem,4vw,3rem)] font-light leading-tight tracking-[-0.03em] max-w-[22ch]">
              {heading}
            </HeadingTag>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-10 max-w-[62ch]">
              <p className="text-base md:text-lg font-light leading-relaxed text-[var(--color-slate)]">
                Alchemetryx is led by Ashok Verma. We scope each engagement to one
                process, build it properly, and stay while it settles. That discipline
                is why the systems we hand over keep running.
                {showCareRotaReference && (
                  <> The CareRota system above runs on our own infrastructure.</>
                )}
              </p>
              <p className="mt-4 text-base md:text-lg font-light leading-relaxed text-[var(--color-slate)]">
                If we do not think there is a problem worth paying to solve, we will
                tell you that instead.
              </p>
            </div>
          </Reveal>

          {showCta && (
            <Reveal delay={0.2}>
              <div className="mt-10">
                <Button asChild variant="outline-dark" size="default">
                  <Link href="/about">More about how we work</Link>
                </Button>
              </div>
            </Reveal>
          )}
        </div>

        {/* Right: the visual that was empty */}
        <div className="lg:col-span-5">
          <Reveal delay={0.15}>
            <ScopeDiagram className="w-full h-auto max-w-[460px] lg:ml-auto" />
          </Reveal>
        </div>
      </div>
    </SectionFullBleed>
  );
}
