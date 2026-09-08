"use client";

import { Fragment, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CircleExpandButton } from "@/components/ui/circle-expand-button";
import { SectionFullBleed } from "@/components/sections/section-full-bleed";
import { ThePointDiagram } from "@/components/sections/the-point-diagram";

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
  const diagramRef = useRef<HTMLDivElement>(null);

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

        // Subtle animation for diagram
        if (diagramRef.current) {
          gsap.from(diagramRef.current, {
            opacity: 0.4,
            y: 20,
            duration: 1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              toggleActions: "play none none none",
            },
          });
        }
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
      <div ref={sectionRef} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
        <div className="lg:col-span-7 max-w-[48ch]">
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-sapphire)]/80 font-normal mb-6">
            THE POINT
          </p>
          <h2
            aria-label="Your tools are not a system."
            className="text-[clamp(2.25rem,4.5vw,3.75rem)] font-light leading-[1.08] tracking-[-0.035em] text-[var(--color-ink)]"
          >
            {headlineWords.map((word, i) => (
              <Fragment key={i}>
                <span
                  ref={(el) => {
                    if (el) wordsRef.current[i] = el;
                  }}
                  className="inline-block"
                >
                  {word}
                </span>
                {i < headlineWords.length - 1 && " "}
              </Fragment>
            ))}
          </h2>
          <p className="mt-6 text-lg md:text-xl font-normal leading-relaxed text-[var(--color-ink)]/90">
            Buying software is not the same as having something that runs. Most
            businesses have plenty of the first and none of the second.
          </p>
          <div className="mt-8 md:mt-10">
            <CircleExpandButton
              href="/#how-we-work"
              variant="sapphire"
              size="lg"
              aria-label="See how we work — scroll to process section"
            >
              See how we work →
           </CircleExpandButton>
         </div>
        </div>

        <div ref={diagramRef} className="lg:col-span-5 flex justify-center lg:justify-end">
          <ThePointDiagram />
        </div>
      </div>
    </SectionFullBleed>
  );
}

