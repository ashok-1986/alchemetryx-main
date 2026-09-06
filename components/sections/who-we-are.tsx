"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SectionFullBleed } from "@/components/sections/section-full-bleed";
import { ScopeDiagram } from "@/components/sections/scope-diagram";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

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
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const diagramRef = useRef<HTMLDivElement>(null);

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

      // Right diagram slides in from right
      gsap.from(diagramRef.current, {
        x: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
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
      className="py-20 md:py-28"
    >
      <div
        ref={sectionRef}
        className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
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

        {/* Right: the visual */}
        <div ref={diagramRef} className="lg:col-span-5">
          <ScopeDiagram className="w-full h-auto max-w-[460px] lg:ml-auto" />
        </div>
      </div>
    </SectionFullBleed>
  );
}
