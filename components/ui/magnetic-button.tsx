"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface MagneticButtonProps {
  children: ReactNode;
  /** Maximum pixel offset the inner content follows the cursor */
  pull?: number;
  className?: string;
}

/**
 * Wraps any clickable element with a magnetic hover effect.
 * On mouse move, the inner content shifts toward the cursor (max ±pull px).
 * On mouse leave, it springs back with an elastic ease.
 * Reduced motion: no magnetic pull, keeps native interaction.
 */
export function MagneticButton({
  children,
  pull = 4,
  className,
}: MagneticButtonProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!wrapperRef.current || !innerRef.current) return;
    const wrapper = wrapperRef.current;
    const inner = innerRef.current;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const handleMouseMove = (e: MouseEvent) => {
        const rect = wrapper.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const offsetX = (e.clientX - centerX) * 0.3;
        const offsetY = (e.clientY - centerY) * 0.3;

        gsap.to(inner, {
          x: Math.max(-pull, Math.min(pull, offsetX)),
          y: Math.max(-pull, Math.min(pull, offsetY)),
          scale: 1.02,
          duration: 0.3,
          ease: "power2.out",
          overwrite: "auto",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(inner, {
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "elastic.out(1, 0.4)",
          overwrite: "auto",
        });
      };

      wrapper.addEventListener("mousemove", handleMouseMove);
      wrapper.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        wrapper.removeEventListener("mousemove", handleMouseMove);
        wrapper.removeEventListener("mouseleave", handleMouseLeave);
      };
    });
  }, { scope: wrapperRef });

  return (
    <div ref={wrapperRef} className={className}>
      <div ref={innerRef}>{children}</div>
    </div>
  );
}
