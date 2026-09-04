"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface GoldPinProps {
  statement?: string;
}

export function GoldPin({ statement = "Your tools are not a system." }: GoldPinProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  const words = statement.split(" ");

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Desktop with no reduced motion: Pinned for 60vh of scroll with scrub: 0.5
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const wordSpans = textRef.current?.querySelectorAll(".gold-word");

        if (wordSpans && wordSpans.length > 0) {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: "+=60%",
              pin: true,
              scrub: 0.5,
              anticipatePin: 1,
            },
          });

          tl.fromTo(
            wordSpans,
            { opacity: 0.25 },
            {
              opacity: 1,
              stagger: 0.1,
              ease: "power1.inOut",
            }
          );
        }
      });

      // Mobile or reduced motion: No pin, clean fade reveal
      mm.add("(max-width: 767px), (prefers-reduced-motion: reduce)", () => {
        const wordSpans = textRef.current?.querySelectorAll(".gold-word");
        if (wordSpans) {
          gsap.set(wordSpans, { opacity: 1 });
        }
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="w-full section-gold bg-[var(--color-gold)] text-[var(--color-ink)] min-h-[75vh] flex items-center justify-center py-24 sm:py-32"
    >
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8 text-center flex items-center justify-center">
        <h2
          ref={textRef}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-[72px] font-light tracking-[-0.04em] text-[var(--color-ink)] leading-[1.08] max-w-[850px] mx-auto"
        >
          {words.map((word, i) => (
            <span
              key={i}
              className="gold-word inline-block mr-[0.28em] last:mr-0 opacity-25 will-change-[opacity]"
            >
              {word}
            </span>
          ))}
        </h2>
      </div>
    </section>
  );
}
