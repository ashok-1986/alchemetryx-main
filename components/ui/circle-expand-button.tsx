"use client";

import { useRef, type ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

interface CircleExpandButtonProps {
  children: ReactNode;
  href: string;
  /** Button visual variant */
  variant?: "primary" | "sapphire";
  /** Button size */
  size?: "sm" | "default" | "lg";
  /** Additional class names */
  className?: string;
}

/**
 * CTA pill button with a circle-expand hover animation.
 *
 * On hover:
 *  - A circle behind the arrow icon expands to fill the entire button
 *  - Text color crossfades (white ↔ dark)
 *  - Arrow rotates from -45° to 0°
 *  - Circle background changes to the contrasting brand colour
 *
 * Reduced motion: no expand, keeps underline/focus feedback only.
 */
export function CircleExpandButton({
  children,
  href,
  variant = "primary",
  size = "default",
  className,
}: CircleExpandButtonProps) {
  const wrapperRef = useRef<HTMLAnchorElement>(null);
  const circleRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const arrowCircleRef = useRef<HTMLSpanElement>(null);
  const arrowIconRef = useRef<SVGSVGElement>(null);

  // Color config per variant
  const colors = {
    primary: {
      bg: "var(--color-gold)",
      textDefault: "var(--color-ink)",
      circleDefault: "var(--color-pearl)",
      circleHover: "var(--color-sapphire)",
      textHover: "var(--color-pearl)",
      arrowDefault: "var(--color-ink)",
      arrowHover: "var(--color-pearl)",
    },
    sapphire: {
      bg: "var(--color-sapphire)",
      textDefault: "var(--color-pearl)",
      circleDefault: "var(--color-pearl)",
      circleHover: "var(--color-gold)",
      textHover: "var(--color-ink)",
      arrowDefault: "var(--color-pearl)",
      arrowHover: "var(--color-ink)",
    },
  }[variant];

  useGSAP(() => {
    if (!wrapperRef.current || !circleRef.current) return;
    const wrapper = wrapperRef.current;
    const circle = circleRef.current;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      let expandTween: gsap.core.Tween | null = null;

      const handleMouseEnter = () => {
        expandTween?.kill();
        // Expand circle to fill button (use % to handle any button width)
        expandTween = gsap.to(circle, {
          width: "320%",
          height: "320%",
          backgroundColor: colors.circleHover,
          duration: 0.45,
          ease: "power3.out",
          overwrite: "auto",
        });
        // Crossfade text
        gsap.to(textRef.current, {
          color: colors.textHover,
          duration: 0.3,
          delay: 0.05,
          overwrite: "auto",
        });
        // Rotate arrow
        gsap.to(arrowIconRef.current, {
          rotate: 0,
          color: colors.arrowHover,
          duration: 0.35,
          ease: "power2.out",
          overwrite: "auto",
        });
        // Arrow circle bg
        gsap.to(arrowCircleRef.current, {
          backgroundColor: colors.circleHover,
          duration: 0.35,
          overwrite: "auto",
        });
      };

      const handleMouseLeave = () => {
        expandTween?.kill();
        gsap.to(circle, {
          width: circleSize,
          height: circleSize,
          backgroundColor: colors.circleDefault,
          duration: 0.4,
          ease: "power2.inOut",
          overwrite: "auto",
        });
        gsap.to(textRef.current, {
          color: colors.textDefault,
          duration: 0.3,
          overwrite: "auto",
        });
        gsap.to(arrowIconRef.current, {
          rotate: -45,
          color: colors.arrowDefault,
          duration: 0.35,
          ease: "power2.inOut",
          overwrite: "auto",
        });
        gsap.to(arrowCircleRef.current, {
          backgroundColor: colors.circleDefault,
          duration: 0.35,
          overwrite: "auto",
        });
      };

      wrapper.addEventListener("mouseenter", handleMouseEnter);
      wrapper.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        wrapper.removeEventListener("mouseenter", handleMouseEnter);
        wrapper.removeEventListener("mouseleave", handleMouseLeave);
        expandTween?.kill();
      };
    });
  }, { scope: wrapperRef, dependencies: [variant] });

  const isSm = size === "sm";
  const circleSize = isSm ? 28 : 35;

  const sizeClasses = {
    sm: "h-9 px-[28px] text-xs gap-2",
    default: "h-11 px-[28px] text-sm",
    lg: "h-12 px-[28px] text-base",
  }[size];

  return (
    <Link
      ref={wrapperRef}
      href={href}
      className={cn(
        "group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-transparent",
        "transition-[transform] duration-[160ms] ease-out active:scale-[0.97]",
        "focus-visible:outline-2 focus-visible:outline-[var(--color-gold)] focus-visible:outline-offset-2",
        sizeClasses,
        className
      )}
      style={{ backgroundColor: colors.bg }}
    >
      {/* Expanding circle — behind everything */}
      <span
        ref={circleRef}
        aria-hidden="true"
        className="absolute rounded-full"
        style={{
          width: circleSize,
          height: circleSize,
          right: 8,
          top: "50%",
          transform: "translateY(-50%)",
          backgroundColor: colors.circleDefault,
          zIndex: 0,
        }}
      />

      {/* Text label */}
      <span
        ref={textRef}
        className="relative z-10 whitespace-nowrap font-normal"
        style={{ color: colors.textDefault }}
      >
        {children}
      </span>

      {/* Arrow circle */}
      <span
        ref={arrowCircleRef}
        aria-hidden="true"
        className={`relative z-10 grid shrink-0 place-items-center rounded-full ${isSm ? "w-[28px] h-[28px]" : "w-[35px] h-[35px]"}`}
        style={{ backgroundColor: colors.circleDefault }}
      >
        <ArrowRight
          ref={arrowIconRef}
          className="w-4 h-4"
          strokeWidth={1.5}
          style={{
            color: colors.arrowDefault,
            transform: "rotate(-45deg)",
          }}
        />
      </span>
    </Link>
  );
}
