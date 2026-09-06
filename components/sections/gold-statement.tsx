"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { SectionFullBleed } from "@/components/sections/section-full-bleed";

gsap.registerPlugin(ScrollTrigger);

/**
 * Section 4 — The statement
 * Tone: Gold. The only gold section on the whole page.
 * The only pinned section on the home route (60vh, per motion spec).
 *
 * Colour rule: Text is Ink/Sapphire on Gold (7.13:1 to 8.34:1 contrast).
 * Never Pearl (white) on Gold.
 * Button: Sapphire on Gold, moves reader to Section 6 (#how-we-work).
 */
export function GoldStatement() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);

  useGSAP(() => {
    if (!sectionRef.current) return;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      mm.add("(min-width: 768px)", () => {
        // Pinned word-by-word reveal — desktop only
        gsap.fromTo(
          wordsRef.current,
          { opacity: 0.25 },
          {
            opacity: 1,
            stagger: 0.05,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "+=60%",
              pin: true,
              scrub: 0.5,
            },
          }
        );
      });

      mm.add("(max-width: 767px)", () => {
        // Mobile: simple fade-in, no pin
        gsap.fromTo(
          wordsRef.current,
          { opacity: 0.25 },
          { opacity: 1, stagger: 0.04, duration: 0.8, ease: "power2.out" }
        );
      });
    });
  }, { scope: sectionRef });

  const headlineWords = "Your tools are not a system.".split(" ");

  return (
    <SectionFullBleed
      id="statement"
      tone="gold"
      fullHeight={false}
      className="py-20 md:py-28"
    >
      <div ref={sectionRef}>
        <div className="max-w-[48ch]">
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-sapphire)]/80 font-normal mb-6">
            THE POINT
          </p>
          <h2 className="text-[clamp(2.25rem,4.5vw,3.75rem)] font-light leading-[1.08] tracking-[-0.035em] text-[var(--color-ink)]">
            {headlineWords.map((word, i) => (
              <span
                key={i}
                ref={(el) => {
                  if (el) wordsRef.current.push(el);
                }}
                className="inline-block"
              >
                {word}{" "}
              </span>
            ))}
          </h2>
          <p className="mt-6 text-lg md:text-xl font-normal leading-relaxed text-[var(--color-ink)]/90">
            Buying software is not the same as having something that runs. Most
            businesses have plenty of the first and none of the second.
          </p>
          <div className="mt-8 md:mt-10">
            <MagneticButton>
              <Button
                asChild
                variant="sapphire"
                size="lg"
                className="shadow-[0_4px_16px_-4px_rgba(11,17,30,0.25)] focus-visible:outline-[var(--color-sapphire)]"
              >
                <Link href="/#how-we-work">See how we work →</Link>
              </Button>
            </MagneticButton>
          </div>
        </div>
      </div>
    </SectionFullBleed>
  );
}
