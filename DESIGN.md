# Design System

<!-- impeccable:design-schema 1 -->

## Brand Tokens

All colors derive from three primary brand tokens. No new hues or colors may be introduced.

*   **Sapphire:** `#1A2642` — Dark canvas, foundation for high-contrast dark sections.
*   **Gold:** `#D4AF37` — Accent, focal points, primary CTA background.
*   **Pearl:** `#F8F6F0` — Warm light canvas, light section default.

### Derived Tokens

*   **Ink:** `#11192B` — Deep text color on Pearl surfaces.
*   **Sapphire Raised:** `#2A354E` — Surface for cards on dark canvas.
*   **Sapphire Line:** `#424B61` — Borders and hairline dividers on dark canvas.
*   **Slate:** `#9FA3AA` — Subdued / secondary text on Sapphire.
*   **Pearl Line:** `#DDDDDB` — Hairline borders on Pearl canvas.
*   **Gold Deep:** `#7B6620` — High-contrast gold for text and icons on Pearl (≥4.5:1 contrast).

## Typography

*   **Primary Typeface:** Urbanist (`--font-sans`, `--font-urbanist`) via `next/font/google`.
*   **Weights:** Light (`300`), Normal (`400`), Medium (`500`), Semibold (`600`).
*   **Discipline:** `text-wrap: balance` on headings, `text-wrap: pretty` on paragraphs.

## Motion & Interaction

*   **Library:** GSAP + ScrollTrigger, Lenis smooth scroll.
*   **Accessibility:** Strict `prefers-reduced-motion` and `prefers-reduced-transparency` bypass.
*   **CTA Animation:** `CircleExpandButton` expands on hover with directional text and icon crossfade.
*   **Pinned Sections:** Limited strictly to Section 4 ("Your tools are not a system.") on desktop only.
