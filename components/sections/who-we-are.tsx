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
  { name: "CareRota", description: "Rota & cost system for a UK care home", href: "/proof/care-rota", image: "/proof/carerota-dashboard.jpg", alt: "CareRota dashboard showing live cost, coverage, and compliance", published: true },
  { name: "Fitosys", description: "Zero-commission platform for India coaches", href: "/proof/fitosys", image: "/proof/fitosys-main.jpg", alt: "Fitosys product view showing automated WhatsApp check-in", published: true },
  { name: "meetprerna.com", description: "Portfolio site with automated booking pipeline", href: "/proof/meet-prerna", image: "/proof/meetprerna-hero.jpg", alt: "Meet Prerna website homepage with portfolio and booking flow", published: true },
  { name: "primeraskin.com", description: "Clinic consultation booking pipeline", href: "/proof/primeraskin", image: "/proof/primeraskin-hero.jpg", alt: "PrimeraSkin website homepage with consultation booking", published: true },
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
    // Each evidence tile reveals as it scrolls into view.
    mm.add("(min-width: 640px) and (prefers-reduced-motion: no-preference)", () => {
      const tiles = section.querySelectorAll<HTMLElement>(".who-tile");
      tiles.forEach((tile) => {
        gsap.from(tile, {
          y: 48,
          opacity: 0,
          duration: 0.8,
          ease: "expo.out",
          scrollTrigger: {
            trigger: tile,
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
        });
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
        className={`grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-start${bleedToTop ? " pt-32 md:pt-40" : ""}`}
      >
        {/* Headline block */}
        <div className="lg:col-span-5 max-w-3xl lg:sticky lg:top-32 lg:pb-12">
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
              <Link
                href="/about"
                className="inline-flex items-center text-base md:text-lg text-[var(--color-pearl)] hover:text-[var(--color-gold)] transition-colors group"
              >
                <span className="border-b border-[var(--color-gold)]/50 group-hover:border-[var(--color-gold)] transition-colors pb-0.5">
                  How we work, and who we are
                </span>
                <ArrowRight className="ml-2 w-4 h-4 text-[var(--color-gold)] transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          )}
        </div>

        {/* 1x4 vertical scroll list */}
        <div className="lg:col-span-7 w-full flex flex-col gap-12 md:gap-16 lg:pl-8">
          {BUILT_THINGS.filter(item => item.published).map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="who-tile group relative block rounded-xl border border-[var(--color-sapphire-line)] bg-[var(--color-sapphire-raised)]/40 transition-all duration-300 overflow-hidden hover:border-[var(--color-gold-deep)]/50 motion-safe:hover:-translate-y-[3px] focus-visible:outline-2 focus-visible:outline-[var(--color-gold-deep)] focus-visible:outline-offset-2"
              aria-label={`${item.name}: ${item.description}`}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.alt}
                  width={880}
                  height={660}
                  className="w-full h-full object-cover transition-transform duration-200 ease-out motion-safe:group-hover:scale-[1.03]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1023px) 100vw, 60vw"
                />
                <div className="absolute inset-x-0 bottom-0 h-[2px] bg-[var(--color-gold)]/0 transition-colors duration-300 group-hover:bg-[var(--color-gold)]/70" />
              </div>
              <div className="p-5 md:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="text-lg md:text-xl font-light text-[var(--color-pearl)] leading-tight tracking-[-0.01em] group-hover:text-[var(--color-gold)] transition-colors">
                      {item.name}
                    </h3>
                    <p className="mt-1.5 text-sm text-[var(--color-slate)] line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                  <span
                    className="mt-1 shrink-0 grid place-items-center w-8 h-8 rounded-full border border-[var(--color-pearl)]/25 text-[var(--color-gold)] opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-100 motion-safe:group-hover:translate-x-0"
                    aria-hidden="true"
                  >
                    <ArrowRight className="w-4 h-4" />
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