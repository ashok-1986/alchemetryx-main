/**
 * components/sections/system-diagram.tsx
 *
 * Hero diagram. Inline SVG, not an image:
 *  - real text, so screen readers and answer engines can read it
 *  - brand tokens only, so it cannot drift off-palette
 *  - no image request, no layout shift
 *
 * The centre mark is a placeholder. Replace the <path> marked LOGO with the
 * real Alchemetryx mark before launch.
 */
export function SystemDiagram({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 620 440"
      role="img"
      aria-labelledby="dgm-title dgm-desc"
      className={className}
    >
      <title id="dgm-title">How the work changes</title>
      <desc id="dgm-desc">
        Three things that make the owner the bottleneck — spreadsheets, chasing,
        and knowledge held in their head — pass through one rebuilt system and
        come out as one place, live numbers, and a job that runs without them.
      </desc>

      <defs>
        <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
          <stop offset="55%" stopColor="var(--color-gold)" stopOpacity="0.16" />
          <stop offset="100%" stopColor="var(--color-gold)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* connectors */}
      <g fill="none" stroke="var(--color-gold)" strokeOpacity="0.4" strokeWidth="1.25">
        <path d="M184,78  C240,78  258,132 266,182" />
        <path d="M184,220 C210,220 228,220 244,220" />
        <path d="M184,362 C240,362 258,308 266,258" />
        <path d="M354,182 C362,132 380,78  436,78" />
        <path d="M376,220 C396,220 412,220 436,220" />
        <path d="M354,258 C362,308 380,362 436,362" />
      </g>

      {/* hub */}
      <circle cx="310" cy="220" r="100" fill="url(#hubGlow)" />
      <circle cx="310" cy="220" r="66" fill="none" stroke="var(--color-gold)" strokeOpacity="0.3" strokeWidth="1" />
      <circle cx="310" cy="220" r="52" fill="var(--color-sapphire-raised)" stroke="var(--color-gold)" strokeOpacity="0.5" strokeWidth="1" />
      {/* real Alchemetryx mark */}
      <image href="/brand/alchemetryx-mark.png" x="276" y="186" width="68" height="68" />

      <g fill="var(--color-gold)">
        <circle cx="266" cy="182" r="2.5" /><circle cx="244" cy="220" r="2.5" /><circle cx="266" cy="258" r="2.5" />
        <circle cx="354" cy="182" r="2.5" /><circle cx="376" cy="220" r="2.5" /><circle cx="354" cy="258" r="2.5" />
      </g>

      {/* right now */}
      <text x="8" y="24" fill="var(--color-slate)" fontSize="11" letterSpacing="2.2">RIGHT NOW</text>
      {[
        { y: 40, t: "Spreadsheets", s: "Five tabs, ninety columns" },
        { y: 182, t: "Chasing", s: "Invoices, updates, people" },
        { y: 324, t: "In your head", s: "Only you know the order" },
      ].map((n) => (
        <g key={n.t} className="cursor-default transition-all duration-200 group">
          <rect
            x="8"
            y={n.y}
            width="176"
            height="76"
            rx="5"
            fill="var(--color-sapphire-raised)"
            stroke="var(--color-sapphire-line)"
            className="transition-colors duration-200 group-hover:stroke-[var(--color-gold)]/50 group-hover:fill-[var(--color-sapphire-raised)]/90"
          />
          <text x="28" y={n.y + 36} fill="var(--color-pearl)" fontSize="17" fontWeight="300">{n.t}</text>
          <text x="28" y={n.y + 57} fill="var(--color-slate)" fontSize="12" fontWeight="300">{n.s}</text>
        </g>
      ))}

      {/* after */}
      <text x="436" y="24" fill="var(--color-gold)" fontSize="11" letterSpacing="2.2">AFTER</text>
      {[
        { y: 40, t: "One place", s: "Not five files" },
        { y: 182, t: "Live numbers", s: "While you can still act" },
        { y: 324, t: "Runs without you", s: "Nobody has to remember" },
      ].map((n) => (
        <g key={n.t} className="cursor-default transition-all duration-200 group">
          <rect
            x="436"
            y={n.y}
            width="176"
            height="76"
            rx="5"
            fill="var(--color-sapphire-raised)"
            stroke="var(--color-gold)"
            strokeOpacity="0.45"
            className="transition-all duration-200 group-hover:stroke-opacity-90 group-hover:stroke-[var(--color-gold)]"
          />
          <text x="456" y={n.y + 36} fill="var(--color-pearl)" fontSize="17" fontWeight="300">{n.t}</text>
          <text x="456" y={n.y + 57} fill="var(--color-slate)" fontSize="12" fontWeight="300">{n.s}</text>
        </g>
      ))}
    </svg>
  );
}
