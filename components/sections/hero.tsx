"use client";

import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Button } from "@/components/ui/button";
import { COMPANY_INFO } from "@/lib/constants";
import { SectionFullBleed } from "./section-full-bleed";
import { SplitLines } from "@/components/motion/split-lines";
import { EASE } from "@/lib/motion";

interface HeroProps {
  headline?: string;
  subhead?: string;
  ctaLabel?: string;
  ctaHref?: string;
  isHomeHero?: boolean;
}

export function Hero({
  subhead = "We find the process costing you most, rebuild it so it runs on its own, and stay to prove it worked.",
  ctaLabel = COMPANY_INFO.primaryCtaLabel,
  ctaHref = COMPANY_INFO.primaryCtaHref,
  isHomeHero = true,
}: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        if (subheadRef.current) {
          gsap.from(subheadRef.current, {
            opacity: 0,
            y: 24,
            duration: 0.6,
            delay: 0.4,
            ease: EASE.out,
          });
        }

        if (ctaRef.current) {
          gsap.from(ctaRef.current, {
            opacity: 0,
            duration: 0.6,
            delay: 0.6,
            ease: EASE.out,
          });
        }
      });
    },
    { scope: containerRef }
  );

  return (
    <SectionFullBleed
      tone="dark"
      className="pt-24 pb-20 md:pt-32 md:pb-28 relative overflow-hidden"
    >
      <div ref={containerRef} className="max-w-[950px] space-y-8">
        {isHomeHero ? (
          <SplitLines
            lines={["One process.", "Running without you.", "In 90 days."]}
            className="text-4xl sm:text-6xl lg:text-[76px] font-light tracking-[-0.04em] text-[var(--color-pearl)] leading-[1.0] pb-2"
          />
        ) : (
          <h1 className="text-4xl sm:text-6xl lg:text-[72px] font-light tracking-[-0.04em] text-[var(--color-pearl)] leading-[1.02]">
            One process. Running without you. In 90 days.
          </h1>
        )}

        <p
          ref={subheadRef}
          className="text-lg sm:text-xl font-normal text-[var(--color-slate)] max-w-[65ch] leading-relaxed will-change-[opacity,transform]"
        >
          {subhead}
        </p>

        <div ref={ctaRef} className="pt-2 will-change-[opacity]">
          <Button asChild variant="primary" size="lg">
            <Link href={ctaHref}>{ctaLabel}</Link>
          </Button>
        </div>
      </div>
    </SectionFullBleed>
  );
}
