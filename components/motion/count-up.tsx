"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface CountUpProps {
  value: number;
  className?: string;
}

export function CountUp({ value, className }: CountUpProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      
      const mm = gsap.matchMedia();
      
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: value,
          duration: 0.6,
          ease: "expo.out",
          onUpdate: () => {
            if (ref.current) {
              ref.current.textContent = Math.round(obj.val).toString();
            }
          },
        });
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className}>
      {value}
    </div>
  );
}
