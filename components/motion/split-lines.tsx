"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { EASE } from "@/lib/motion";

interface SplitLinesProps {
  lines: string[];
  className?: string;
}

export function SplitLines({ lines, className }: SplitLinesProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Only run staggered split-line animation on desktop screens with no-reduced-motion preference
      // On mobile devices, keep native instant LCP paint to eliminate FID/LCP latency.
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const lineElements = containerRef.current?.querySelectorAll(".split-line-inner");
        if (lineElements && lineElements.length > 0) {
          gsap.from(lineElements, {
            yPercent: 100,
            opacity: 0.1,
            duration: 0.8,
            stagger: 0.1,
            ease: EASE.expo,
          });
        }
      });
    },
    { scope: containerRef }
  );

  return (
    <h1 ref={containerRef} className={className}>
      {lines.map((line, idx) => (
        <span key={idx} className="block overflow-hidden pb-1">
          <span className="split-line-inner block will-change-transform">
            {line}
          </span>
        </span>
      ))}
    </h1>
  );
}
