/**
 * components/sections/scope-diagram.tsx
 *
 * The visual that sits beside "Who you would be working with".
 *
 * It draws the one sentence next to it: a business runs many processes, and we
 * take one of them at a time. Inline SVG so the labels are real text, brand
 * tokens only so it cannot drift off-palette, no image request.
 */
import { useId } from "react";

const TILES = [
  { x: 0,   y: 0,   label: "Quoting" },
  { x: 148, y: 0,   label: "Rota" },
  { x: 296, y: 0,   label: "Invoicing" },
  { x: 0,   y: 104, label: "Onboarding" },
  { x: 148, y: 104, label: "Payroll", active: true },
  { x: 296, y: 104, label: "Reporting" },
  { x: 0,   y: 208, label: "Stock" },
  { x: 148, y: 208, label: "Compliance" },
  { x: 296, y: 208, label: "Handover" },
];

export function ScopeDiagram({ className }: { className?: string }) {
  const id = useId();
  const titleId = `scope-title-${id}`;
  const descId = `scope-desc-${id}`;

  return (
    <svg
      viewBox="-8 -34 432 358"
      role="img"
      aria-labelledby={`${titleId} ${descId}`}
      className={className}
    >
      <title id={titleId}>One process at a time</title>
      <desc id={descId}>
        Nine processes a business runs. One of them, payroll in this example, is
        picked out and rebuilt first. The rest are left alone until it is working.
      </desc>

      <text x="0" y="-14" fill="var(--color-slate)" fontSize="11" letterSpacing="2.2">
        WHAT YOU RUN
      </text>

      {TILES.map((t) => (
        <g key={t.label}>
          <rect
            x={t.x}
            y={t.y}
            width="128"
            height="84"
            rx="4"
            fill={t.active ? "var(--color-sapphire-raised)" : "none"}
            stroke={t.active ? "var(--color-gold)" : "var(--color-sapphire-line)"}
            strokeOpacity={t.active ? 0.9 : 0.55}
          />
          <text
            x={t.x + 18}
            y={t.y + 48}
            fill={t.active ? "var(--color-pearl)" : "var(--color-slate)"}
            fontSize="14"
            fontWeight="300"
          >
            {t.label}
          </text>
        </g>
      ))}

      {/* the one we are on */}
      <rect
        x="140"
        y="96"
        width="144"
        height="100"
        rx="8"
        fill="none"
        stroke="var(--color-gold)"
        strokeOpacity="0.45"
        strokeDasharray="3 4"
      />
      <text x="140" y="212" fill="var(--color-gold)" fontSize="11" letterSpacing="2.2">
        THIS ONE FIRST
      </text>
    </svg>
  );
}
