# Plan: Scroll-craft Integration for About Page

**Date:** 7 September 2026
**Goal:** Use scroll-craft to build a premium scroll-driven About page for Alchemetryx

---

## Executive Summary

Transform the current minimal About page (WhoWeAre + CTA) into a cinematic scroll-driven experience using scroll-craft's engine and methodology. The scroll-craft engine will drive this page only; the rest of the site continues on GSAP + Lenis.

---

## 1. Integration Architecture

### Current State
- **Home page**: GSAP + ScrollTrigger + Lenis (9 sections)
- **About page**: GSAP + ScrollTrigger + Lenis (2 sections: WhoWeAre + CtaBlock)
- **Stack locked**: Next.js 15, Tailwind v4, shadcn/ui, Lenis, GSAP

### Target State
- **About page**: scroll-craft engine (scrollcraft.js + scrollcraft.css)
- **All other pages**: GSAP + Lenis (unchanged)
- **No conflicts**: Two engines coexist because they load per-route

### Implementation Approach

1. **Create a dedicated About layout** that loads scrollcraft assets:
   ```
   app/about/layout.tsx  — loads scrollcraft.js + scrollcraft.css
   ```

2. **Disable Lenis on the About route**:
   - Add a route check in the Lenis provider
   - scroll-craft handles its own scroll behavior

3. **Keep GSAP available** for any shared components that might be used

4. **The About page becomes a self-contained scroll-craft build**:
   - Uses scrollcraft engine for animations
   - Uses `data-sc-*` attributes for scroll triggers
   - Follows scroll-craft's device grammar system

---

## 2. Scroll-craft Brief Process (Step 0)

Before any code, run the scroll-craft interview. The 8 questions:

### Question 1: Vibe in 3-5 words
> "What's the vibe of this About page in three to five words, plus up to three references from any medium?"

**Context**: Alchemetryx is a registered UK company building systems that work. The site should read as enterprise-scale, not small-firm. The About page should convey:
- Method, not just capacity
- Deliberate scoping
- Systems that keep running after handover

### Question 2: Scroll journey, section by section
> "What should the visitor hit first, what comes next, what's the last thing?"

**Current WhoWeAre content**:
- Eyebrow: "WHO WE ARE"
- Heading: "Who we are."
- Body: Alchemetryx is led by Ashok Verma. We scope each engagement to one process, build it properly, and stay while it settles.
- Closing: If we do not think there is a problem worth paying to solve, we will tell you that instead.

**Potential journey beats** (to be confirmed in interview):
1. Recognition — who we are
2. Method — how we work
3. Proof — what we've built
4. Range — what we can choose
5. Commitment — the one action

### Question 3: Energy curve
> "Where should it feel calm, where should it feel intense?"

### Question 4: Feeling stage by stage + ONE memorable moment
> "How should someone feel while scrolling, stage by stage, and what is the ONE moment they should remember?"

### Question 5: One thing this site should do that no site they have seen does
> This is the seed of the signature move.

### Question 6: Premium-minimal range
> "How far from premium-minimal do you want to go?"

Options: brutalist, maximalist, playful, retro, dense, editorial, premium-minimal

### Question 7: One world or distinct scenes?
> "Should the whole page feel like one continuous place, or like separate scenes/chapters?"

This is the biggest structural fork.

### Question 8: Existing assets
> "What assets do you already have?"

Photos, footage, brand kit, product shots, etc.

---

## 3. Grammar Selection (Step 2)

After the brief, select from scroll-craft's 8 grammars:

1. **Filmic one-shot** — Continuous camera flight (used by first 4 builds)
2. **Chapter cut** — Distinct scenes with transitions
3. **Parallel planes** — Independent visual layers
4. **Worldflight** — One fixed stage, no seams
5. **Gallery** — Lateral navigation
6. **Working surface** — Interactive tool-like
7. **Printed chapter** — Editorial/book-like
8. **Hybrid** — Custom combination

**Constraint**: Must differ from existing fingerprint registry (currently empty).

---

## 4. Fingerprint Gate

The planned build must differ from EVERY existing row on at least 4 of 6 dimensions:

| Dimension | What it tracks |
|---|---|
| Grammar | Which of the 8 grammars |
| Nav treatment | How navigation works |
| Hero device | What the hero does |
| Act-sequence shape | How acts are ordered |
| Close pattern | How the page ends |
| Signature move | The bespoke interaction |

**Current registry**: Empty (first build has nothing to clear)

---

## 5. Feeling Curve

Before planning acts, write the feeling curve:

```
Act 1: [emotion] — what on screen causes it
Act 2: [emotion] — what on screen causes it
...
```

**Rules**:
- One line per act: emotion, then cause
- Two adjacent acts with the same feeling = one is filler
- Name the peak — it gets the largest scroll span
- The act before the peak is quieter than it

---

## 6. Score Table

Assign each beat a device:

| Beat | Device | Why |
|---|---|---|
| Recognition | ? | ? |
| Method | ? | ? |
| Proof | ? | ? |
| Range | ? | ? |
| Commitment | ? | ? |

**Checks before building**:
- 4+ distinct device families
- No device twice in a row
- At most 2 scrub acts
- One act is the peak with largest span
- Every act earns its scroll span

---

## 7. Asset Generation

Options:
1. **Use existing photos** — If Alchemetryx has team/office photos
2. **Generate with kie.ai** — If no assets exist (requires KIE_AI_API_KEY)
3. **Hybrid** — Mix of real and generated

**Note**: Building from own photos needs no key and no spend. This is a first-class route.

---

## 8. Technical Implementation

### File Structure
```
app/about/
├── layout.tsx          — loads scrollcraft.js + scrollcraft.css
├── page.tsx            — the scroll-craft build
└── scrollcraft.config.ts  — tokens and configuration

scrollcraft/
└── builds/
    └── about/          — the build folder
        ├── BRIEF.md    — the interview answers
        ├── index.html  — the page (or page.tsx in Next.js)
        └── assets/     — generated/supplied assets
```

### Token Theming
Override scroll-craft tokens to match Alchemetryx brand:

```css
:root {
  --sc-canvas: #1A2642;  /* Sapphire */
  --sc-surface: #2A354E; /* Sapphire-raised */
  --sc-ink: #F8F6F0;     /* Pearl */
  --sc-ink-soft: #9FA3AA; /* Slate */
  --sc-accent: #D4AF37;  /* Gold */
  --sc-accent-ink: #11192B; /* Ink */
  --sc-font-display: var(--font-urbanist);
  --sc-font-text: var(--font-urbanist);
}
```

### Lenis Disable
Add route check to Lenis provider:
```tsx
// In the Lenis provider component
const pathname = usePathname();
const isAboutPage = pathname.startsWith('/about');

// Disable Lenis on About page
useEffect(() => {
  if (isAboutPage) {
    lenis.destroy();
  }
}, [isAboutPage]);
```

### Scroll-craft Engine Loading
```tsx
// app/about/layout.tsx
import scrollcraftJs from '@/scrollcraft/engine/scrollcraft.js';
import scrollcraftCss from '@/scrollcraft/engine/scrollcraft.css';

// Load scrollcraft assets only on About page
```

---

## 9. Verification (Step 5)

After building, run the verification harness:

```bash
cd <build folder>
npm i playwright-core
node <skill>/scripts/serve.mjs --root . --port 4500
node <skill>/scripts/shoot.mjs --url http://localhost:4500 --out lab/shots
node <skill>/scripts/shoot.mjs --url http://localhost:4500 --out lab/mobile --width 390 --height 844
node <skill>/scripts/shoot.mjs --url http://localhost:4500 --out lab/reduced --reduced-motion
```

**What the harness checks**:
- Dead scroll (sections that don't respond)
- Cues that never reach full opacity
- Contrast at brightest frame under each line
- Contact sheet of all scroll positions

**What the harness cannot check**:
- Composition quality
- Motion smoothness
- Meaning/emotional impact

**Manual checks**:
- Tab through for focus order
- Scroll cold, write one word per act for what you felt
- Diff intended curve against felt curve
- Verify peak is largest visual change with most scroll room
- Verify last screen resolves (doesn't fade to nothing)

---

## 10. Success Criteria

1. **Brief complete**: All 8 interview questions answered, BRIEF.md written
2. **Grammar selected**: One of 8 grammars, with rationale for why others lost
3. **Fingerprint gate passed**: Differs from all existing rows on 4+ dimensions
4. **Feeling curve written**: One line per act, peak identified
5. **Score table complete**: Device per beat, checks passed
6. **Assets generated/collected**: All needed assets ready
7. **Page built**: Real HTML with data-sc-* attributes
8. **Verification passed**: Desktop, mobile, reduced-motion all checked
9. **Feel check passed**: Intended curve matches felt curve
10. **Build appended to FINGERPRINTS.md**: Row added to registry

---

## 11. Risks and Mitigations

| Risk | Mitigation |
|---|---|
| Two scroll engines conflict | Disable Lenis on About route; load scrollcraft only there |
| scrollcraft.js doesn't work with Next.js SSR | Load client-side only; use dynamic import |
| Brand tokens don't map cleanly | Override scrollcraft CSS variables in globals.css |
| No assets to generate | Use existing photos or build without imagery |
| Verification harness fails | Install playwright-core in build folder |

---

## 12. Next Steps

1. **Run the scroll-craft interview** — Answer the 8 questions
2. **Write BRIEF.md** — Capture answers in scrollcraft/builds/about/
3. **Select grammar** — Choose from 8 options
4. **Write feeling curve** — Before planning acts
5. **Run fingerprint gate** — Ensure uniqueness
6. **Generate/collect assets** — Photos or kie.ai
7. **Build the page** — Real HTML with scrollcraft engine
8. **Verify** — Desktop, mobile, reduced-motion
9. **Integrate** — Wire into Next.js About route
10. **Ship** — Append to FINGERPRINTS.md

---

## Appendix: Scroll-craft Hard Rules

These are ship-blockers, not preferences:

| Never | Instead |
|---|---|
| Clay diorama as default world | Photographic |
| Scroll cue/arrow | Nothing |
| 01/06 section counters | Delete |
| Eyebrow above every heading | Max 1 per 3 sections |
| Em dash | Period, comma, colon, parens |
| Centred copy in every act | Vary anchor |
| Same device twice in a row | Score properly |
| Generating before brief | Run Step 0 |
| No engineered peak | One peak |
| Trailing/fading ending | Close resolves |
| Planning before feeling curve | Curve first |
| Shipping without signature move | Invent one |
| Editing engine for bespoke behavior | Bespoke JS in page |
| Full-frame dark overlay | Scrim where text sits |
| Text baked into image | Real markup |
| Invented statistics | Only real numbers |
| transition: all | transform + opacity |
| Gradient text/neon glow | Weight + size |
| Autoplaying audio | Strip track |
| Shipping without Step 5 | Run verification |
