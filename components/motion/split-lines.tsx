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

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const lineElements = containerRef.current?.querySelectorAll(".split-line-inner");
        if (lineElements && lineElements.length > 0) {
          gsap.from(lineElements, {
            yPercent: 105,
            opacity: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: EASE.expo,
            delay: 0.1,
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
