"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface SplitLinesProps {
  lines: string[];
  className?: string;
}

export function SplitLines({ lines, className }: SplitLinesProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Only run staggered split-line animation if no-reduced-motion preference is set
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const lineElements = containerRef.current?.querySelectorAll(".split-line-inner");
        if (lineElements && lineElements.length > 0) {
          gsap.from(lineElements, {
            yPercent: 120,
            rotationX: -60,
            opacity: 0,
            duration: 1.2,
            stagger: 0.1,
            ease: EASE.expo,
            transformOrigin: "0% 50% -50",
          });
        }
      });
    },
    { scope: containerRef }
  );

  return (
    <h1 ref={containerRef} className={cn("perspective-1000", className)}>
      {lines.map((line, idx) => (
        <span key={idx} className="block overflow-hidden pb-1" style={{ perspective: "1000px" }}>
          <span className="split-line-inner block will-change-transform">
            {line}
          </span>
        </span>
      ))}
    </h1>
  );
}
