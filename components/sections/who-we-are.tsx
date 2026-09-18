"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SectionFullBleed } from "@/components/sections/section-full-bleed";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface WhoWeAreProps {
  headingLevel?: "h1" | "h2";
  eyebrow?: string;
  heading?: string;
  showCareRotaReference?: boolean;
  /** The home page routes on to /about. The About page has nowhere to send you. */
  showCta?: boolean;
  /** Extend dark background to top of viewport behind the nav (about page). */
  bleedToTop?: boolean;
}

const BUILT_THINGS = [
  { name: "CareRota", description: "Rota & cost system for a UK care home", href: "/proof/care-rota", image: "/proof/carerota-dashboard.jpg", alt: "CareRota dashboard showing live cost, coverage, and compliance" },
  { name: "Fitosys", description: "Zero-commission platform for India coaches", href: "/proof/fitosys", image: "/proof/fitosys-main.jpg", alt: "Fitosys product view showing automated WhatsApp check-in" },
  { name: "Meet Prerna", description: "Portfolio site with automated booking pipeline", href: "/proof/meet-prerna", image: "/proof/meetprerna-hero.jpg", alt: "Meet Prerna website homepage with portfolio and booking flow" },
  { name: "PrimeraSkin", description: "Clinic consultation booking pipeline", href: "/proof/primeraskin", image: "/proof/primeraskin-hero.jpg", alt: "PrimeraSkin website homepage with consultation booking" },
];

export function WhoWeAre({
  headingLevel = "h2",
  eyebrow = "WHO YOU WOULD BE WORKING WITH",
  heading = "We build the thing, not a deck about it.",
  showCareRotaReference = true,
  showCta = true,
  bleedToTop = false,
}: WhoWeAreProps = {}) {
  const HeadingTag = headingLevel;
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;
    const mm = gsap.matchMedia();
    // One authored reveal: the four gallery tiles step in as a film strip on desktop.
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.from(section.querySelectorAll<HTMLElement>(".who-tile"), {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "expo.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          toggleActions: "play none none none",
          once: true,
        },
      });
    });
  }, { scope: sectionRef });

  return (
    <SectionFullBleed
      id="who-we-are"
      tone="dark"
      fullHeight={false}
      className={bleedToTop ? "pt-0 pb-24 md:pb-36" : "py-24 md:py-40"}
    >
      <div
        ref={sectionRef}
        className={`flex flex-col gap-16 md:gap-24${bleedToTop ? " pt-32 md:pt-40" : ""}`}
      >
        {/* Headline block */}
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold)] mb-6">
            {eyebrow}
          </p>
          <HeadingTag className="text-[clamp(2rem,5vw,3.75rem)] font-light leading-[1.06] tracking-[-0.03em] max-w-[20ch]">
            {heading}
          </HeadingTag>

          <div className="mt-10 max-w-[62ch]">
            <p className="text-base md:text-lg font-light leading-relaxed text-[var(--color-slate)]">
              Alchemetryx is led by Ashok Verma. We scope each engagement to one
              process, build it properly, and stay while it settles. That
              discipline is why the systems we hand over keep running.
              {showCareRotaReference && (
                <> The CareRota system above runs on our own infrastructure.</>
              )}
            </p>
            <p className="mt-4 text-base md:text-lg font-light leading-relaxed text-[var(--color-slate)]">
              If we do not think there is a problem worth paying to solve, we
              will tell you that instead.
            </p>
          </div>

          {showCta && (
            <div className="mt-10">
              <Button asChild variant="outline-dark" size="default">
                <Link href="/about">More about how we work</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Immersive 4-across cinematic gallery */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {BUILT_THINGS.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="who-tile group relative block overflow-hidden rounded-xl border border-[var(--color-sapphire-line)] bg-[var(--color-sapphire-raised)]/40 transition-all duration-300 hover:border-[var(--color-gold-deep)]/50 hover:-translate-y-[3px] focus-visible:outline-2 focus-visible:outline-[var(--color-gold-deep)] focus-visible:outline-offset-2"
              aria-label={`${item.name}: ${item.description}`}
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-sapphire)]/85 via-[var(--color-sapphire)]/15 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-[2px] bg-[var(--color-gold)]/0 transition-colors duration-300 group-hover:bg-[var(--color-gold)]/70" />
              </div>

              <div className="relative z-10 -mt-[86px] p-4 md:p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="text-base md:text-lg font-light text-[var(--color-pearl)] leading-tight tracking-[-0.01em] group-hover:text-[var(--color-gold)] transition-colors">
                      {item.name}
                    </h3>
                    <p className="mt-1 text-xs md:text-sm text-[var(--color-slate)] line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                  <span
                    className="mt-0.5 shrink-0 grid place-items-center w-7 h-7 rounded-full border border-[var(--color-pearl)]/25 text-[var(--color-gold)] opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
                    aria-hidden="true"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </SectionFullBleed>
  );
}