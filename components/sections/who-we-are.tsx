"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SectionFullBleed } from "@/components/sections/section-full-bleed";
import { Button } from "@/components/ui/button";
import { COMPANY } from "@/lib/constants";

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
  {
    name: "CareRota",
    description: "Rota & cost system for a UK care home",
    href: "/proof/care-rota",
    image: "/proof/carerota-dashboard.jpg",
    alt: "CareRota dashboard showing live cost, coverage, and compliance",
  },
  {
    name: "Fitosys",
    description: "Zero-commission platform for India coaches",
    href: "/proof/fitosys",
    image: "/proof/fitosys-main.jpg",
    alt: "Fitosys product view showing automated WhatsApp check-in",
  },
  {
    name: "Meet Prerna",
    description: "Portfolio site with automated booking pipeline",
    href: "/proof/meet-prerna",
    image: "/proof/meetprerna-hero.jpg",
    alt: "Meet Prerna website homepage with portfolio and booking flow",
  },
  {
    name: "PrimeraSkin",
    description: "Clinic consultation booking pipeline",
    href: "/proof/primeraskin",
    image: "/proof/primeraskin-hero.jpg",
    alt: "PrimeraSkin website homepage with consultation booking",
  },
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
  const textRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Left text slides in from left
      gsap.from(textRef.current, {
        x: -30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
          once: true,
        },
      });

      // Right grid cards stagger in
      if (gridRef.current) {
        gsap.from(gridRef.current!.querySelectorAll<HTMLElement>(".built-tile"), {
          y: 30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true,
          },
        });
      }
    });
  }, { scope: sectionRef });

  return (
    <SectionFullBleed
      id="who-we-are"
      tone="dark"
      fullHeight={false}
      className={bleedToTop ? "pt-0 pb-20 md:pb-28" : "py-20 md:py-28"}
    >
      <div
        ref={sectionRef}
        className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center${bleedToTop ? " pt-20 md:pt-24" : ""}`}
      >
        {/* Left: the words */}
        <div ref={textRef} className="lg:col-span-7">
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold)] mb-6">
            {eyebrow}
          </p>
          <HeadingTag className="text-[clamp(1.75rem,4vw,3rem)] font-light leading-tight tracking-[-0.03em] max-w-[22ch]">
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

        {/* Right: 2×2 grid of built things */}
        <div ref={gridRef} className="lg:col-span-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {BUILT_THINGS.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                className="group relative rounded-xl border border-[var(--color-sapphire-line)] overflow-hidden bg-[var(--color-sapphire-raised)]/30 transition-all duration-300 hover:bg-[var(--color-sapphire-raised)]/50 hover:border-[var(--color-gold-deep)]/40 hover:-translate-y-[2px] focus-visible:outline-2 focus-visible:outline-[var(--color-gold-deep)] focus-visible:outline-offset-2"
                aria-label={`${item.name}: ${item.description}`}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-4">
                  <h3 className="text-base font-light text-[var(--color-pearl)] group-hover:text-[var(--color-gold)] transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-sm text-[var(--color-slate)] mt-1 line-clamp-1">
                    {item.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </SectionFullBleed>
  );
}
