"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Lottie } from "lottie-react";
import systemFlowAnimation from "@/public/animations/system-flow.json";
import { cn } from "@/lib/utils";

const LEFT_BOXES = [
  { y: 40, t: "Spreadsheets", s: "Five tabs, ninety columns" },
  { y: 182, t: "Chasing", s: "Invoices, updates, people" },
  { y: 324, t: "In your head", s: "Only you know the order" },
];

const RIGHT_BOXES = [
  { y: 40, t: "One place", s: "Not five files" },
  { y: 182, t: "Live numbers", s: "While you can still act" },
  { y: 324, t: "Runs without you", s: "Nobody has to remember" },
];

/**
 * Static SVG fallback:
 * Rendered during SSR, hydration, and when prefers-reduced-motion is active.
 * Renders identically to the schematic diagram still.
 */
function SystemDiagramStatic() {
  return (
    <svg
      viewBox="0 0 620 440"
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="hubGlowStatic" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Hub background glow */}
      <circle cx="310" cy="220" r="100" fill="url(#hubGlowStatic)" />

      {/* Connector paths */}
      <g fill="none" stroke="#D4AF37" strokeOpacity="0.4" strokeWidth="1.25">
        <path d="M184,78 C240,78 258,132 266,182" />
        <path d="M184,220 C210,220 228,220 244,220" />
        <path d="M184,362 C240,362 258,308 266,258" />
        <path d="M354,182 C362,132 380,78 436,78" />
        <path d="M376,220 C396,220 412,220 436,220" />
        <path d="M354,258 C362,308 380,362 436,362" />
      </g>

      {/* Left boxes (static rectangles) */}
      {LEFT_BOXES.map((box) => (
        <rect
          key={box.t}
          x="8"
          y={box.y}
          width="176"
          height="76"
          rx="5"
          fill="#2A354E"
          stroke="#424B61"
          strokeWidth="1"
        />
      ))}

      {/* Right boxes (static rectangles) */}
      {RIGHT_BOXES.map((box) => (
        <rect
          key={box.t}
          x="436"
          y={box.y}
          width="176"
          height="76"
          rx="5"
          fill="#2A354E"
          stroke="#D4AF37"
          strokeOpacity="0.45"
          strokeWidth="1"
        />
      ))}

      {/* Center hub */}
      <circle
        cx="310"
        cy="220"
        r="66"
        fill="none"
        stroke="#D4AF37"
        strokeOpacity="0.3"
        strokeWidth="1"
      />
      <circle
        cx="310"
        cy="220"
        r="52"
        fill="#2A354E"
        stroke="#D4AF37"
        strokeOpacity="0.5"
        strokeWidth="1"
      />

      {/* Connection anchor ports */}
      <g fill="#D4AF37" fillOpacity="0.7">
        <circle cx="266" cy="182" r="2.5" />
        <circle cx="244" cy="220" r="2.5" />
        <circle cx="266" cy="258" r="2.5" />
        <circle cx="354" cy="182" r="2.5" />
        <circle cx="376" cy="220" r="2.5" />
        <circle cx="354" cy="258" r="2.5" />
      </g>
    </svg>
  );
}

export function SystemDiagram({ className }: { className?: string }) {
  const [isMounted, setIsMounted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <div
      role="img"
      aria-label="How the work changes: Three things that make the owner the bottleneck — spreadsheets, chasing, and knowledge held in their head — pass through one rebuilt system and come out as one place, live numbers, and a job that runs without them."
      className={cn(
        "relative w-full aspect-[620/440] max-w-[620px] select-none [container-type:inline-size]",
        className
      )}
    >
      {/* Visual Canvas: Lottie Animation or Static SVG Fallback */}
      {isMounted && !prefersReducedMotion ? (
        <Lottie
          src={systemFlowAnimation}
          loop={false}
          autoplay={true}
          className="absolute inset-0 w-full h-full pointer-events-none"
        />
      ) : (
        <SystemDiagramStatic />
      )}

      {/* HTML Layer: Center Alchemetryx Mark */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[11%] aspect-square flex items-center justify-center pointer-events-none z-10"
        aria-hidden="true"
      >
        <Image
          src="/brand/alchemetryx-mark.png"
          alt="Alchemetryx"
          width={68}
          height={68}
          className="w-full h-full object-contain"
          priority
        />
      </div>

      {/* Live HTML Labels Overlay */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {/* Left Column Header */}
        <div
          className="absolute text-[clamp(9px,1.75cqw,11px)] font-medium tracking-[0.2em] uppercase text-[var(--color-slate)]"
          style={{ left: "2.58%", top: "3.2%" }}
        >
          RIGHT NOW
        </div>

        {/* Left Column Text Cards */}
        {LEFT_BOXES.map((box) => (
          <div
            key={box.t}
            className="absolute flex flex-col justify-center px-[4.2%] transition-opacity duration-200"
            style={{
              left: "1.29%",
              top: `${(box.y / 440) * 100}%`,
              width: "28.39%",
              height: "17.27%",
            }}
          >
            <span className="text-[clamp(12px,2.74cqw,17px)] font-light text-[var(--color-pearl)] leading-tight">
              {box.t}
            </span>
            <span className="text-[clamp(9px,1.93cqw,12px)] font-light text-[var(--color-slate)] leading-tight mt-1">
              {box.s}
            </span>
          </div>
        ))}

        {/* Right Column Header */}
        <div
          className="absolute text-[clamp(9px,1.75cqw,11px)] font-medium tracking-[0.2em] uppercase text-[var(--color-gold)]"
          style={{ left: "71.61%", top: "3.2%" }}
        >
          AFTER
        </div>

        {/* Right Column Text Cards */}
        {RIGHT_BOXES.map((box) => (
          <div
            key={box.t}
            className="absolute flex flex-col justify-center px-[4.2%] transition-opacity duration-200"
            style={{
              left: "70.32%",
              top: `${(box.y / 440) * 100}%`,
              width: "28.39%",
              height: "17.27%",
            }}
          >
            <span className="text-[clamp(12px,2.74cqw,17px)] font-light text-[var(--color-pearl)] leading-tight">
              {box.t}
            </span>
            <span className="text-[clamp(9px,1.93cqw,12px)] font-light text-[var(--color-slate)] leading-tight mt-1">
              {box.s}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
