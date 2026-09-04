# Alchemetryx.com — Motion Specification

**Version 1.0 | 4 September 2026**
Library: GSAP + ScrollTrigger + Lenis. Motion (Framer Motion) not used.
Status: For build

---

## 1. The governing principle

This site sells the claim that Alchemetryx builds systems that work. Motion here has one job: make the page feel engineered rather than decorated. Every animation must earn its place by doing one of three things.

1. **Direct attention** to the next thing the reader should take in.
2. **Explain a relationship** between two pieces of information.
3. **Mark a transition** between the full-bleed colour acts.

An animation that does none of these is removed. "It looks nice" is not one of the three.

The failure mode to avoid: a site so animated the visitor cannot skim it. Your buyer is an owner-led founder with fifteen spare minutes. If they cannot scan the page in twenty seconds because content fades in as they scroll past, the motion has cost you the meeting.

---

## 2. Timing and easing

One scale, defined once, used everywhere.

```ts
// lib/motion.ts
export const DUR = {
  fast:   0.3,   // hover, focus, small state change
  base:   0.6,   // standard element reveal
  slow:   0.9,   // display headline, section entrance
  scrub:  true,  // scroll-linked, duration governed by scroll distance
} as const;

export const EASE = {
  out:     "power2.out",     // default for entrances
  inOut:   "power2.inOut",   // for movements that return
  expo:    "expo.out",       // for the hero only, one moment of drama
} as const;

export const STAGGER = {
  tight: 0.06,
  base:  0.1,
} as const;
```

**Rules.** Nothing animates for longer than 0.9s except scroll-scrubbed timelines. Entrances use `power2.out`, because ease-out feels like arriving and ease-in feels like leaving. `expo.out` appears exactly once, on the hero headline.

---

## 3. Animation inventory

Every animation on the site, by section. If it is not on this list, it does not get built.

### Global

| Element | Trigger | Motion | Duration | Notes |
|---|---|---|---|---|
| Page scroll | Always | Lenis smooth scroll | `duration: 1.1` | Disabled entirely under reduced-motion |
| Nav background | Scroll past 80px | Transparent → Sapphire, opacity only | 0.3s | No height change, avoids layout shift |
| Nav pill hover | Pointer | Background Sapphire-raised → lighter 8% | 0.3s | CSS transition, not GSAP |
| CTA button hover | Pointer | Gold brightness 1.0 → 1.08 | 0.3s | CSS transition |
| Focus ring | Keyboard | Instant, 2px Gold outline | 0 | Never animated. Focus must be immediate. |

### Home — hero (Sapphire)

| Element | Trigger | Motion | Duration |
|---|---|---|---|
| Display headline | Page load | Line-by-line mask reveal, y 100% → 0 | 0.9s, stagger 0.1s, `expo.out` |
| Sub-headline | Page load | Fade + y 24px → 0 | 0.6s, delay 0.4s |
| CTA button | Page load | Fade only | 0.6s, delay 0.6s |
| Scroll cue | Page load, then loop | y 0 → 8px → 0 | 1.6s loop, `power1.inOut` |

The headline reveal is the site's signature move and the only place `expo.out` is used. It runs on load, not on scroll, because it is above the fold.

**Line masking with SplitText** (free with GSAP since 2025):

```tsx
"use client";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(SplitText, useGSAP);

export function SplitLines({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const split = new SplitText(ref.current, {
      type: "lines",
      linesClass: "overflow-hidden",
    });
    gsap.from(split.lines, {
      yPercent: 100,
      duration: 0.9,
      stagger: 0.1,
      ease: "expo.out",
    });
    return () => split.revert();   // restores original DOM for screen readers
  }, { scope: ref });

  return <div ref={ref}>{children}</div>;
}
```

`split.revert()` in cleanup is not optional. SplitText rewrites the DOM into per-line spans; leaving that in place breaks text selection and confuses screen readers on navigation.

### Home — level router (Pearl)

| Element | Trigger | Motion | Duration |
|---|---|---|---|
| Section heading | Scroll, top at 85% | Fade + y 32px → 0 | 0.6s |
| Two panels | Scroll, top at 80% | Fade + y 32px → 0, stagger | 0.6s, stagger 0.1s |
| Panel select | Click | Crossfade content, height auto | 0.3s |

The router is the most important interaction on the page. Its animation is deliberately the plainest on the site, because a reader making a choice should not be waiting on a transition.

### Home — gold statement (Gold)

| Element | Trigger | Motion | Duration |
|---|---|---|---|
| Section entrance | Scroll | Pinned, colour fills from previous section | Scrubbed over 60vh |
| Statement text | Pin start | Word-by-word opacity 0.25 → 1 | Scrubbed |

This is the one scrubbed, pinned moment on the site. The pin lasts 60vh of scroll, well under the 150vh ceiling from the technical foundation.

```tsx
useGSAP(() => {
  const words = ref.current!.querySelectorAll("[data-word]");
  gsap.timeline({
    scrollTrigger: {
      trigger: ref.current,
      start: "top top",
      end: "+=60%",
      pin: true,
      scrub: 0.5,
    },
  }).fromTo(words, { opacity: 0.25 }, { opacity: 1, stagger: 0.05 });
}, { scope: ref });
```

`scrub: 0.5` rather than `scrub: true` adds half a second of catch-up smoothing, which stops the text flickering on a trackpad's high-frequency scroll events.

### Home — proof grid (Pearl)

| Element | Trigger | Motion | Duration |
|---|---|---|---|
| Cards | Scroll, top at 85% | Fade + y 32px → 0, stagger | 0.6s, stagger 0.1s |
| Card image hover | Pointer | Scale 1.0 → 1.03, overflow hidden | 0.6s |
| Metric number | Scroll into view | Count up from 0 | 1.2s, once only |

The count-up runs once and only on numbers that are real. A counting animation on an invented figure is the exact combination this whole positioning is built against.

### Inner routes

Diagnostic, Build, Retainer, Proof, About and India use only the standard reveal: fade plus 32px rise, 0.6s, `power2.out`, triggered at 85% viewport. No pins, no scrubbing, no split text. The home page carries the motion budget; inner pages carry the argument.

---

## 4. Reduced motion

Not a degraded experience. A different, equally complete one.

```css
/* app/globals.css */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

```ts
// Every GSAP file uses matchMedia, not a manual check
useGSAP(() => {
  const mm = gsap.matchMedia();

  mm.add("(prefers-reduced-motion: no-preference)", () => {
    gsap.from(ref.current, { opacity: 0, y: 32, duration: 0.6, /* ... */ });
  });

  // No branch for reduce. Elements render at their natural final state.
}, { scope: ref });
```

**The contract under reduced motion:**

| Behaviour | Result |
|---|---|
| Lenis | Never initialises. Native scroll. |
| All reveals | Skipped. Content visible at final state on load. |
| Pinned gold section | Not pinned. Renders as a normal full-bleed section, all text at full opacity. |
| Count-up numbers | Final number rendered directly. |
| Hover states | Retained. Colour change with no transition. |
| Focus ring | Retained, instant. |

**Critical: this is why animations use `gsap.from()` and never `gsap.to()`.** With `from()`, the element's resting state in the HTML is its final visible state, so if the animation never runs the content is still there. With `to()`, the element must start hidden, and any failure to run leaves it invisible forever. That single choice is the difference between a graceful degradation and a blank page.

---

## 5. Performance rules

| Rule | Why |
|---|---|
| Animate `transform` and `opacity` only | Compositor-only properties. Anything else triggers layout or paint on every frame. |
| Never animate `width`, `height`, `top`, `left`, `margin` | Forces layout recalculation. Use `scale` and `translate`. |
| `will-change` only during the animation, removed after | Permanent `will-change` allocates GPU memory for every element that has it. |
| One `ScrollTrigger.refresh()` after fonts load | Font swap changes element heights, which invalidates every trigger position. |
| Kill triggers on route change | `useGSAP` handles this. Do not hand-roll it. |
| Maximum one pinned section per route | Pins are the heaviest scroll operation. |
| No animation below 768px except fades | Mobile devices are where scroll-linked work stutters. Keep phones simple. |

Font-load refresh, in the smooth scroll provider:

```ts
document.fonts.ready.then(() => ScrollTrigger.refresh());
```

Without this, every trigger computed before Urbanist loads uses fallback-font heights, and reveals fire at the wrong scroll positions.

### Mobile simplification

```ts
const mm = gsap.matchMedia();

mm.add("(min-width: 768px)", () => {
  // Pins, scrubs, split text
});

mm.add("(max-width: 767px)", () => {
  // Fades only, no pins, no scrub
});
```

---

## 6. Acceptance checks

Before the motion layer is signed off:

| Check | Pass condition |
|---|---|
| Reduced motion on, every route | All content visible, no Lenis, nothing hidden |
| JavaScript disabled | All content visible and readable |
| Keyboard traversal | Focus never lost inside a pinned section |
| Mid-range Android, real device | Scroll holds 60fps through the gold section |
| Fast 3G | Hero headline readable before animation JS loads |
| Screen reader on the hero | Headline announced as one sentence, not line by line |
| DevTools Performance, home page scroll | No layout thrash, no long tasks over 50ms |
| Route change during animation | No console errors, no orphaned triggers |

The screen reader check on the hero is the one most often missed. SplitText fragments a headline into per-line spans, and without `revert()` on cleanup some readers announce each line as a separate item.

---

## 7. Build order

Motion is layered on last, over a site that already works without it.

1. Build every route with zero animation. Content, layout, tokens, responsive.
2. Verify the site is complete, accessible and within performance budget in that state.
3. Add Lenis and the reduced-motion opt-out.
4. Add the standard reveal wrapper and apply it across inner routes.
5. Add the home hero split-line reveal.
6. Add the pinned gold statement section.
7. Re-run the full performance and accessibility pass.

**Step 2 is a gate, not a formality.** A site that only works once animation runs is a site that breaks for anyone on a slow connection, an old device, or with motion sensitivity. Build the working version first, then make it move.
