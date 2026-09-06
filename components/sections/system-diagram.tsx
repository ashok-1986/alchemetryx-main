"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

const LEFT_BOXES = [
  { y: 40, t: "Spreadsheets", s: "Five tabs, ninety columns" },
  { y: 182, t: "Chasing", s: "Invoices, updates, people" },
  { y: 324, t: "In one person's head", s: "Only they know the order" },
];

const RIGHT_BOXES = [
  { y: 40, t: "One place", s: "Not five files" },
  { y: 182, t: "Live numbers", s: "While there's still time to act" },
  { y: 324, t: "Runs on its own", s: "Nobody has to remember" },
];

const CONNECTOR_PATHS = [
  "M184,78 C240,78 258,132 266,182",
  "M184,220 C210,220 228,220 244,220",
  "M184,362 C240,362 258,308 266,258",
  "M354,182 C362,132 380,78 436,78",
  "M376,220 C396,220 412,220 436,220",
  "M354,258 C362,308 380,362 436,362",
];

const PORT_POSITIONS = [
  { cx: 266, cy: 182 },
  { cx: 244, cy: 220 },
  { cx: 266, cy: 258 },
  { cx: 354, cy: 182 },
  { cx: 376, cy: 220 },
  { cx: 354, cy: 258 },
];

export function SystemDiagram({ className }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);

  useGSAP(() => {
    if (!svgRef.current) return;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const paths = svgRef.current!.querySelectorAll<SVGPathElement>(
        "[data-connector]"
      );
      const ports = svgRef.current!.querySelectorAll<SVGCircleElement>(
        "[data-port]"
      );
      const hubRing = svgRef.current!.querySelector<SVGCircleElement>(
        "[data-hub-ring]"
      );
      const rightBoxes = svgRef.current!.querySelectorAll<SVGRectElement>(
        "[data-right-box]"
      );

      // Measure and set up connector stroke-dashoffset
      paths.forEach((path) => {
        const length = path.getTotalLength();
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
      });

      // Animate left connectors (staggered)
      gsap.to(paths[0], {
        strokeDashoffset: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "power2.inOut",
      });
      gsap.to(paths[1], {
        strokeDashoffset: 0,
        duration: 0.6,
        delay: 0.35,
        ease: "power2.inOut",
      });
      gsap.to(paths[2], {
        strokeDashoffset: 0,
        duration: 0.8,
        delay: 0.5,
        ease: "power2.inOut",
      });

      // Animate right connectors (staggered, later)
      gsap.to(paths[3], {
        strokeDashoffset: 0,
        duration: 0.8,
        delay: 1.4,
        ease: "power2.inOut",
      });
      gsap.to(paths[4], {
        strokeDashoffset: 0,
        duration: 0.6,
        delay: 1.55,
        ease: "power2.inOut",
      });
      gsap.to(paths[5], {
        strokeDashoffset: 0,
        duration: 0.8,
        delay: 1.7,
        ease: "power2.inOut",
      });

      // Anchor ports — scale in from 0 with stagger
      gsap.from(ports, {
        scale: 0,
        opacity: 0,
        duration: 0.4,
        stagger: 0.06,
        delay: 0.8,
        ease: "back.out(2)",
        transformOrigin: "center center",
        svgOrigin: "center",
      });

      // Hub ring — infinite pulse
      if (hubRing) {
        gsap.to(hubRing, {
          attr: { "stroke-opacity": 0.6 },
          duration: 1.2,
          delay: 1.0,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // Right boxes — stroke opacity glow on entry
      gsap.to(rightBoxes, {
        attr: { "stroke-opacity": 0.7 },
        duration: 0.6,
        stagger: 0.1,
        delay: 2.0,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });
  }, { scope: svgRef });

  return (
    <div
      role="img"
      aria-label="How the work changes: Three things that make the owner the bottleneck — spreadsheets, chasing, and knowledge held in their head — pass through one rebuilt system and come out as one place, live numbers, and a job that runs without them."
      className={cn(
        "relative w-full aspect-[620/440] max-w-[620px] select-none [container-type:inline-size]",
        className
      )}
    >
      {/* SVG Canvas — always rendered, GSAP animates on top */}
      <svg
        ref={svgRef}
        viewBox="0 0 620 440"
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Hub background glow */}
        <circle cx="310" cy="220" r="100" fill="url(#hubGlow)" />

        {/* Connector paths — animated via strokeDashoffset */}
        <g fill="none" stroke="#D4AF37" strokeOpacity="0.4" strokeWidth="1.25">
          {CONNECTOR_PATHS.map((d, i) => (
            <path key={i} d={d} data-connector />
          ))}
        </g>

        {/* Left boxes */}
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

        {/* Right boxes — animated stroke opacity */}
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
            data-right-box
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
          data-hub-ring
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

        {/* Connection anchor ports — animated scale-in */}
        <g fill="#D4AF37" fillOpacity="0.7">
          {PORT_POSITIONS.map((pos, i) => (
            <circle
              key={i}
              cx={pos.cx}
              cy={pos.cy}
              r="2.5"
              data-port
            />
          ))}
        </g>
      </svg>

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
