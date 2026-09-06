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
 * Faithfully ported from Framer "Circle-Expand-Button-Animation":
 *  - A circle (same colour as the arrow bg) expands from the arrow
 *    position to fill the entire button on hover
 *  - Text crossfades between two colour states
 *  - Arrow rotates from -45deg to 0deg
 *  - Arrow circle background changes to contrasting colour
 *
 * Reduced motion: no expand, keeps focus feedback only.
 */
export function CircleExpandButton({
  children,
  href,
  variant = "primary",
  size = "default",
  className,
}: CircleExpandButtonProps) {
  const wrapperRef = useRef<HTMLAnchorElement>(null);
  const expandCircleRef = useRef<HTMLSpanElement>(null);
  const textDefaultRef = useRef<HTMLSpanElement>(null);
  const textHoverRef = useRef<HTMLSpanElement>(null);
  const arrowCircleRef = useRef<HTMLSpanElement>(null);
  const arrowIconRef = useRef<SVGSVGElement>(null);

  // Color config per variant
  const colors = {
    primary: {
      bg: "var(--color-gold)",
      // Default text (visible when not hovered)
      textDefaultColor: "var(--color-ink)",
      // Hover text (visible when hovered — must contrast with expanding circle)
      textHoverColor: "var(--color-pearl)",
      // Arrow circle background
      arrowCircleDefault: "var(--color-pearl)",
      arrowCircleHover: "var(--color-sapphire)",
      // Expanding circle — matches arrow circle default, stays same on hover
      expandDefault: "var(--color-pearl)",
      expandHover: "var(--color-pearl)",
      // Arrow icon
      arrowDefault: "var(--color-ink)",
      arrowHover: "var(--color-pearl)",
    },
    sapphire: {
      bg: "var(--color-sapphire)",
      textDefaultColor: "var(--color-pearl)",
      textHoverColor: "var(--color-ink)",
      arrowCircleDefault: "var(--color-pearl)",
      arrowCircleHover: "var(--color-gold)",
      expandDefault: "var(--color-pearl)",
      expandHover: "var(--color-pearl)",
      arrowDefault: "var(--color-pearl)",
      arrowHover: "var(--color-ink)",
    },
  }[variant];

  useGSAP(() => {
    if (!wrapperRef.current || !expandCircleRef.current) return;
    const wrapper = wrapperRef.current;
    const expandCircle = expandCircleRef.current;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      let expandTween: gsap.core.Tween | null = null;

      const handleMouseEnter = () => {
        expandTween?.kill();
        // Expand circle: 35px → 320px (Framer uses 320px fixed)
        expandTween = gsap.to(expandCircle, {
          width: 320,
          height: 320,
          backgroundColor: colors.expandHover,
          duration: 0.45,
          ease: "power3.out",
          overwrite: "auto",
        });
        // Crossfade text: default fades out, hover fades in
        gsap.to(textDefaultRef.current, {
          opacity: 0,
          duration: 0.25,
          overwrite: "auto",
        });
        gsap.to(textHoverRef.current, {
          opacity: 1,
          duration: 0.25,
          delay: 0.05,
          overwrite: "auto",
        });
        // Arrow circle background
        gsap.to(arrowCircleRef.current, {
          backgroundColor: colors.arrowCircleHover,
          duration: 0.35,
          overwrite: "auto",
        });
        // Rotate arrow -45° → 0°
        gsap.to(arrowIconRef.current, {
          rotate: 0,
          color: colors.arrowHover,
          duration: 0.35,
          ease: "power2.out",
          overwrite: "auto",
        });
      };

      const handleMouseLeave = () => {
        expandTween?.kill();
        const initialSize = isSm ? 28 : 35;
        // Shrink circle back
        expandTween = gsap.to(expandCircle, {
          width: initialSize,
          height: initialSize,
          backgroundColor: colors.expandDefault,
          duration: 0.4,
          ease: "power2.inOut",
          overwrite: "auto",
        });
        // Crossfade text back
        gsap.to(textDefaultRef.current, {
          opacity: 1,
          duration: 0.25,
          overwrite: "auto",
        });
        gsap.to(textHoverRef.current, {
          opacity: 0,
          duration: 0.25,
          overwrite: "auto",
        });
        // Arrow circle background back
        gsap.to(arrowCircleRef.current, {
          backgroundColor: colors.arrowCircleDefault,
          duration: 0.35,
          overwrite: "auto",
        });
        // Rotate arrow back to -45°
        gsap.to(arrowIconRef.current, {
          rotate: -45,
          color: colors.arrowDefault,
          duration: 0.35,
          ease: "power2.inOut",
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
      {/* Default text (visible when not hovered) */}
      <span
        ref={textDefaultRef}
        className="relative z-10 whitespace-nowrap font-normal"
        style={{ color: colors.textDefaultColor }}
      >
        {children}
      </span>

      {/* Hover text (visible when hovered — positioned on top of default text) */}
      <span
        ref={textHoverRef}
        className="absolute z-10 whitespace-nowrap font-normal left-[28px] top-1/2 -translate-y-1/2"
        style={{ color: colors.textHoverColor, opacity: 0 }}
        aria-hidden="true"
      >
        {children}
      </span>

      {/* Arrow container: anchors the arrow circle and the expanding circle */}
      <span className="relative z-20 grid place-items-center shrink-0">
        {/* Arrow circle — always on top */}
        <span
          ref={arrowCircleRef}
          aria-hidden="true"
          className={`relative z-20 grid shrink-0 place-items-center rounded-full ${isSm ? "w-[28px] h-[28px]" : "w-[35px] h-[35px]"}`}
          style={{ backgroundColor: colors.arrowCircleDefault }}
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

        {/* Expanding circle — z-1, expands behind arrow circle originating from arrow center */}
        <span
          ref={expandCircleRef}
          aria-hidden="true"
          className="absolute rounded-full z-[1] pointer-events-none"
          style={{
            width: isSm ? 28 : 35,
            height: isSm ? 28 : 35,
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: colors.expandDefault,
          }}
        />
      </span>
    </Link>
  );
}
