# Alchemetryx.com — Technical Foundation

**Version 1.0 | 4 September 2026**
Companion to: *Alchemetryx 2026 Positioning and Solutions Brief*
Status: For build

---

## 1. Locked decisions

| Decision | Choice | Why |
|---|---|---|
| Framework | Next.js, App Router | Already decided. Server components keep the JS bundle small on a content site. |
| Styling | Tailwind CSS v4 | Token-first via `@theme`. The design spec is already expressed as CSS custom properties. |
| Components | shadcn/ui | Copy-in, not a dependency. Radix primitives underneath give keyboard and screen-reader behaviour for free. |
| Smooth scroll | Lenis | Required for the scrubbed section rhythm. Carries real accessibility duties, see Section 5. |
| Animation | GSAP + ScrollTrigger | One animation system, not two. |
| Animation, rejected | Motion (Framer Motion) | Dropped. Overlaps GSAP on component transitions and adds roughly 34KB for work GSAP already does. Revisit only if page-transition choreography becomes a real requirement. |
| Typeface | Urbanist via `next/font/google` | Free, self-hosted at build, weights 300 and 400 available. Replaces Univers Next Pro, which is a paid Linotype licence priced per pageview. |
| Booking | Fillout, embedded | Already decided. |
| Hosting | Hostinger, deployed from Git | Already decided. |

**On dropping Motion.** The ON.energy structure this site borrows is built from full-bleed section transitions and scroll-scrubbed reveals. That is ScrollTrigger's core job. Motion earns its weight when you need declarative React enter/exit and shared layout transitions, and this site has neither in v1. Two animation libraries also means two sets of timing functions, two mental models, and a class of bug where both try to own the same element's transform.

---

## 2. Dependencies

```bash
npx create-next-app@latest alchemetryx --typescript --tailwind --app --eslint
cd alchemetryx

npx shadcn@latest init

npm install gsap @gsap/react lenis
```

| Package | Role | Approx gzipped |
|---|---|---|
| `gsap` | Core tween engine | ~24KB |
| `gsap/ScrollTrigger` | Scroll-driven timelines | ~11KB |
| `@gsap/react` | `useGSAP` hook, handles cleanup on unmount | ~1KB |
| `lenis` | Smooth scroll | ~3KB |

Total animation layer: roughly 39KB gzipped. That is the whole budget for motion and it does not grow.

**Licensing note.** GSAP including every plugin is free for commercial use following Webflow's 2025 change. ScrollTrigger, SplitText and the rest carry no fee. Nothing here needs a Club GreenSock membership.

**Import ScrollTrigger from the plugin path**, not the bundle root, so the tree shakes:

```ts
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
```

---

## 3. Folder structure

```
app/
├── layout.tsx                 # Server. Fonts, metadata, <SmoothScroll> wrapper
├── page.tsx                   # Home
├── globals.css                # @theme tokens, base layer
├── diagnostic/page.tsx
├── build/page.tsx
├── retainer/page.tsx
├── proof/
│   ├── page.tsx               # Index
│   └── [slug]/page.tsx        # Individual case study
├── about/page.tsx
├── india/page.tsx
└── book/page.tsx              # Fillout embed

components/
├── ui/                        # shadcn generated, do not hand-edit
├── motion/                    # Client islands. Every file starts 'use client'
│   ├── smooth-scroll.tsx      # Lenis provider + ScrollTrigger sync
│   ├── reveal.tsx             # Generic scroll-in wrapper
│   ├── section-pin.tsx        # Pinned full-bleed section
│   └── split-lines.tsx        # Line-by-line headline reveal
├── sections/                  # Server components. Page content
│   ├── hero.tsx
│   ├── level-router.tsx       # The two-question Adoption/Usage router
│   ├── ladder.tsx             # Diagnostic / Build / Retainer
│   ├── proof-grid.tsx
│   ├── deadline-block.tsx     # Nearest mandate, updated quarterly
│   └── cta.tsx
└── chrome/
    ├── nav.tsx
    └── footer.tsx

content/
├── case-studies/*.mdx         # Proof lives here, not in a CMS
└── mandates.ts                # Trigger dates. One file, updated quarterly

lib/
├── motion.ts                  # Shared easing and duration constants
└── utils.ts                   # shadcn cn()
```

**Why MDX files and not a CMS.** You will publish four case studies this year, not four hundred. A CMS is a monthly cost, an auth surface, and a second thing to keep alive. Files in Git are versioned, diffable and free. Revisit at roughly twenty case studies.

---

## 4. Server and client boundaries

This is the part that goes wrong most often on an App Router site with heavy animation. GSAP needs the DOM, so anything touching it must be a client component. Done carelessly, one animated headline turns the whole page into client-rendered JavaScript and you lose the reason you chose Next.js.

**The rule: animation wrappers are client, content is server. Pass content in as children.**

```tsx
// components/motion/reveal.tsx
"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Reveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(ref.current, {
      opacity: 0,
      y: 32,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: { trigger: ref.current, start: "top 85%" },
    });
  }, { scope: ref });

  return <div ref={ref}>{children}</div>;
}
```

```tsx
// app/page.tsx — stays a SERVER component
import { Reveal } from "@/components/motion/reveal";
import { ProofGrid } from "@/components/sections/proof-grid";

export default function Home() {
  return (
    <Reveal>
      <ProofGrid />   {/* server-rendered, zero JS shipped for it */}
    </Reveal>
  );
}
```

`ProofGrid` renders on the server and arrives as HTML. Only the thin `Reveal` wrapper ships JavaScript. Test this: run `npm run build` and check that page-level JS stays under the budget in Section 6.

**`useGSAP` over `useEffect`.** It scopes selectors to the container and reverts every animation on unmount. Without it, client-side navigation leaves orphaned ScrollTriggers that fire against removed DOM nodes.

---

## 5. Lenis, accessibility, and the reduced-motion contract

Lenis replaces the browser's native scrolling. That is a genuine accessibility intervention, not a decoration, and it must be handled deliberately.

**Non-negotiables:**

1. **Respect `prefers-reduced-motion`.** When set, Lenis does not initialise at all and every GSAP scroll animation resolves to its end state immediately. Not a shortened animation. No animation.
2. **Keyboard scrolling must still work.** Tab, Space, Page Up/Down, Home, End. Test with the mouse unplugged.
3. **Anchor links and focus management.** When focus moves to an element off-screen, the page must scroll to it. Lenis can swallow this.
4. **Never pin a section for longer than roughly 150% of viewport height.** Long pins make a page feel broken on a trackpad and are the top cause of "I could not scroll past your website".

The sync pattern, which is the single most common source of bugs when Lenis and ScrollTrigger are used together:

```tsx
// components/motion/smooth-scroll.tsx
"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;                    // hard opt-out, Lenis never starts

    const lenis = new Lenis({ duration: 1.1 });

    // Lenis drives ScrollTrigger's update cycle
    lenis.on("scroll", ScrollTrigger.update);

    // GSAP's ticker drives Lenis's rAF loop. Only one rAF loop on the page.
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
```

Two details that matter. `lenis.raf` is driven by GSAP's ticker rather than its own `requestAnimationFrame`, so the page runs one animation loop instead of two competing ones. And `lagSmoothing(0)` stops GSAP from trying to compensate for frame drops, which fights Lenis's own interpolation and produces scroll jitter.

---

## 6. Performance budget

The site sells operational competence. A slow site contradicts the pitch more than a plain one would.

| Metric | Target | Hard fail |
|---|---|---|
| LCP | under 2.0s | over 2.5s |
| INP | under 150ms | over 200ms |
| CLS | under 0.05 | over 0.1 |
| Page JS, home | under 120KB gzipped | over 170KB |
| Page JS, inner routes | under 90KB gzipped | over 140KB |
| Lighthouse Performance, mobile | 90+ | under 80 |
| Total page weight, home | under 900KB | over 1.5MB |

**Where the JS goes on the home page:** Next.js runtime and React roughly 70KB, animation layer 39KB. That leaves almost nothing. This is why Motion was dropped and why every section that does not animate must stay a server component.

**Images.** `next/image` everywhere, AVIF with WebP fallback, explicit width and height on every image so CLS stays at zero. The hero image is the LCP element, so it gets `priority` and nothing else on the page does.

**Rule.** Run `npm run build` before every deploy and read the route-level JS column. If a route crosses budget, find the client component that should have been a server one.

---

## 7. Testing before launch

| Check | Method | Pass condition |
|---|---|---|
| Reduced motion | OS setting on, reload every route | No Lenis, no animation, all content visible |
| Keyboard only | Unplug mouse, traverse every route | Every link and the booking form reachable, focus always visible |
| Screen reader | VoiceOver or NVDA on home and one case study | Headings announce in order, no content trapped |
| Slow network | Chrome DevTools, Fast 3G | Content readable within 4s |
| Real device | An actual mid-range Android, not the simulator | Scroll does not stutter |
| Colour contrast | Axe DevTools on every route | Zero contrast violations |

The Android test matters most. Smooth scroll and scrubbed timelines feel excellent on a Mac and can feel broken on a three-year-old phone, which is what a proportion of your buyers will use.

---

## 8. What is deliberately excluded from v1

| Excluded | Reason |
|---|---|
| CMS | Four case studies. Files are enough. |
| Page transition choreography | Needs Motion or a View Transitions setup. Cost outweighs benefit before there is traffic. |
| Dark and light mode toggle | The design alternates dark and light by section already. A toggle would fight it. |
| i18n framework | Two English variants. Two routes handle it. |
| Analytics beyond GA4 and Search Console | Nothing to justify more until there is traffic. |
| Blog | No publishing capacity. An empty blog is worse than no blog. |
