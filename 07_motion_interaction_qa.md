# Alchemetryx.com — Motion and Interaction QA

**Version 1.0 | 4 September 2026**
Reviews `03_motion_specification.md` against design-engineering craft standards (animation decision framework, easing, timing, transform-origin, performance).
Status: Findings for build, not a rewrite of the motion spec

---

## 1. Why this document exists

`03_motion_specification.md` is already disciplined. It gates every animation behind a stated purpose, defaults to `gsap.from()` for safe reduced-motion degradation, and caps the site at one pinned section. This document does not redo that work. It runs a second, narrower pass: does every specific animation value hold up against craft-level scrutiny, and are there interactive components in the design system that the motion spec never actually addressed.

Four real issues came out of that pass. They are below, in the required before-and-after format. Everything else was checked and confirmed compliant, listed in Section 3, so the finding list is not padded with restatements of what the spec already gets right.

---

## 2. Findings

| Before | After | Why |
|---|---|---|
| Proof card image hover: scale 1.0 → 1.03 over 0.6s | Scale 1.0 → 1.03 over 0.2s, same `power2.out` | A hover is a micro-interaction, not a reveal. The design system's own rule (`ui-ux-pro`) sets 150 to 300ms for micro-interactions, and the motion spec's 0.6s duration belongs to the "standard element reveal" tier, not hover feedback. At 0.6s the card will feel like it is lagging behind the cursor. |
| Level router panel select: `transition: height auto` implied by "height auto" in the animation inventory | Measure the target panel's content height with GSAP (`gsap.to(el, { height: measuredHeight })`) or use a `grid-template-rows: 0fr → 1fr` CSS trick | CSS cannot transition to or from `height: auto` directly, the browser has no start or end value to interpolate. As written, this animation will not run at all in production; it will snap. This is the one finding in this review that is a functional bug, not a craft refinement, and it should be caught before anyone spends time debugging why the panel "isn't animating." |
| No `:active` state specified anywhere in the motion spec for the CTA button, nav pills, or ladder cards | Add `transform: scale(0.97)` on `:active` for every clickable element, CSS transition, 150ms | The spec covers hover for these elements but never covers press. On a touch device there is no hover state at all, so press feedback is the only confirmation a tap registered. This is a real gap, not a nice-to-have; mobile is where the owner-led buyer this site targets is reading a cold email on their phone. |
| Dialog and Sheet (shadcn components in the inventory) have no entry in the motion spec at all | Dialog: keep `transform-origin: center`, scale in from 0.95 with opacity, never anchor to a trigger. Sheet: slide in with `translateY(100%)` or `translateX(100%)` depending on edge, using percentage-based transform so it works regardless of the panel's rendered height | Modals and off-canvas panels are not covered by the "standard reveal wrapper" rule that governs everything else, because they are not scroll-triggered, they are interaction-triggered. Left unspecified, whoever implements them will improvise, and the two most common improvisation mistakes are exactly the ones craft review exists to catch: scaling a modal from `scale(0)` instead of `0.95`, and anchoring a modal's `transform-origin` to a trigger element the way a popover should be, when a modal should stay centered. |

---

## 3. Confirmed compliant, no change needed

Checked against the same standards and found already correct. Listed so the review shows what was actually tested, not only what failed.

| Item | Standard checked against | Verdict |
|---|---|---|
| `gsap.from()` used everywhere, never `gsap.to()`, for reduced-motion safety | Graceful-degradation principle | Correct. This is the single most important decision in the whole motion spec and it is right. |
| `power2.out` for entrances, `expo.out` reserved for exactly one hero moment | Easing selection: entering/exiting elements use a strong ease-out | Correct. GSAP's named power and expo eases are already strong, non-linear curves, functionally equivalent to the custom cubic-bezier curves recommended for raw CSS transitions. There is no case here for swapping them out for hand-written cubic-bezier values; that would be motion-vocabulary duplication for no visible gain. |
| `ease-in` never used anywhere in the inventory | Never use ease-in for UI animation | Correct, confirmed by inspection of every row in the animation inventory. |
| One pinned section per route, capped at 60vh of scroll distance | Performance and restraint | Correct, and well under the 150vh ceiling set in the technical foundation. |
| `SplitText` cleanup calls `split.revert()` | Accessibility, DOM integrity after animation libraries mutate text nodes | Correct, and the spec already flags this as the most commonly missed accessibility check, which it is. |
| Nothing animates via `scale(0)` | Entrances should start from a visible-if-small state, not nothing | Correct, no instance found in the inventory. |
| Animation limited to `transform` and `opacity`, explicit rule against animating `width`, `height`, `top`, `left`, `margin` | Compositor-only performance rule | Correct as a stated rule. The one place it is broken in practice is the height-auto panel crossfade caught above, which is a contradiction the spec has with itself: it states the rule and then violates it in the one place it specifies a height transition. |
| Mobile simplification via `gsap.matchMedia()`, fades only below 768px | Device-appropriate complexity | Correct. |

---

## 4. Recommended additions before sign-off

Formalized from Section 2, to be folded into `03_motion_specification.md` as an addendum rather than treated as a separate spec:

1. Add a "press feedback" row to the global animation table: `scale(0.97)` on `:active`, 150ms, applies to CTA button, nav pills, ladder cards, proof cards.
2. Fix the level-router panel crossfade to use a measured-height or grid-template-rows approach instead of `height: auto`.
3. Reduce proof card image hover duration from 0.6s to 0.2s.
4. Add explicit Dialog and Sheet entries: Dialog centered and scaled from 0.95, Sheet using percentage-based edge transforms.

None of these four change the character of the site's motion. They tighten details a visitor will never consciously notice, which, per the same design philosophy this review is applying, is exactly the point.

---

## Confidence: High

Every finding traces to a specific line in the existing motion spec and a specific, named rule it either misses or contradicts, not a general impression. The height-auto issue in particular is worth flagging to the person who implements the level router specifically, since it will otherwise surface as a confusing "my animation just isn't running" bug during build rather than as something caught in review.
