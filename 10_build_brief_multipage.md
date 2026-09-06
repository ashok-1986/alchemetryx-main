# Build brief — multipage, and three corrections

Paste this into Claude Code in the project folder. Work top to bottom. Stop after each numbered block and report.

Rules in `CLAUDE.md` and the copy rules in `09_home_copy_deck.md` still apply, unchanged. Nothing goes on a page that isn't true.

---

## 0. The register this site is written in

Alchemetryx is a registered company building toward enterprise scale. The site should read that way.

This is not a licence to overclaim. Every fact stays exactly as true as it is now. What changes is that the site stops **volunteering its own smallness**. Trust and smallness are not the same thing, and the current copy conflates them.

| Currently reads as | Should read as |
|---|---|
| A small firm, run by one person, doing one job at a time | A company with a deliberate method, run by named people, scoped on purpose |
| Registration shown as reassurance | Registration shown as a fact, in the footer, where a company puts it |
| Timeframes as a promise | Timeframes discussed in the room, not advertised on the page |

Do not add claims to compensate. Remove the ones that shrink.

---

## 1. Fix: remove the registered-company card from the About section

**File:** the "Who you would be working with" section.

Delete the bordered "REGISTERED / UK registered company 17199377 / Check us on Companies House" card entirely. It already appears in the footer, which is where company registration belongs. Repeating it in a content section reads as a badge being held up rather than a fact stated once.

The footer entry stays exactly as it is.

**Verify:** company number appears exactly once on the page, in the footer, linked to Companies House.

---

## 2. Fix: remove timeframes from the How We Work cards

**File:** the How We Work section.

Delete the "2 weeks", "4 to 8 weeks" and "Monthly" pills from the three cards. Keep everything else in those cards.

**Why.** "In 90 days" was removed from the hero earlier because it was a delivery promise with no delivered engagement behind it. Three smaller timeframes are the same promise, split into three. Same claim, less visible.

The question "how long does this take" is real and gets answered — on the service page, and on the call, where it can be answered honestly against actual scope. It does not get advertised as a fixed number on the home page.

**Verify:** no delivery or turnaround duration claim appears anywhere on `/`. The "Book a 30-minute call" CTA is required and exempt from this rule. Apply the same scoped wording to the other referenced acceptance criteria.

---

## 3. Fix: copy changes for register

**Who you would be working with**

| Element | From | To |
|---|---|---|
| H2 | A small firm that builds the thing, not a deck about it. | We build the thing, not a deck about it. |
| Body 1 | Alchemetryx is led by Ashok Verma. We take on one job at a time, build it properly, and stay while it settles. The CareRota system above runs on our own infrastructure. | Alchemetryx is led by Ashok Verma. We scope each engagement to one process, build it properly, and stay while it settles. That discipline is why the systems we hand over keep running. The CareRota system above runs on our own infrastructure. |
| Body 2 | unchanged | If we do not think there is a problem worth paying to solve, we will tell you that instead. |

"One job at a time" described capacity. "We scope each engagement to one process" describes method. Same practice, and the second one is why it works rather than an admission of what you can't take on.

Body 2 stays. Declining work you don't believe in is a position of strength, not smallness.

---

## 4. Build: multipage routes

Eight routes. Build the four that have real content. The other three wait.

```
/                   Home           BUILD NOW — shortened, see block 5
/proof              Case index     BUILD NOW
/proof/care-rota    CareRota full  BUILD NOW
/about              Who we are     BUILD NOW — exists, needs the fix below
/book               Booking        LIVE, no change
/diagnostic         The Diagnostic BLOCKED — no real content yet
/build              The Build      BLOCKED — no real content yet
/retainer           The Retainer   BLOCKED — no real content yet
```

**`/proof/care-rota`** takes the full case study currently living on the home page: before, build, three screenshots, the what-this-is-and-isn't block, closing line. Move it, do not copy it.

**`/proof`** is the index. Today it holds one card linking to CareRota. Build it so a second and third card drop in without a rewrite.

**`/about`** currently duplicates the home page H2 "A small firm that builds the thing, not a deck about it." Two pages competing for one phrase. Give `/about` its own H1 and let the home section keep the shorter version from block 3.

**The three blocked routes do not get built, and do not go in the nav.** A page with structure and nothing true in it is how the fabricated content happened. They ship when Ashok supplies what actually happens in each engagement.

---

## 5. Home page gets shorter

Once CareRota lives at its own URL, the home page carries a **card**, not the case study: eyebrow, title, one line, one screenshot, link to `/proof/care-rota`.

Everything else on the home page stays as it is.

**Verify:** the home page is meaningfully shorter than it is now, and the full CareRota case study exists in exactly one place at `/proof/care-rota`. The abbreviated CareRota card and its screenshot on the home page are required and expected.

---

## 6. Nav

```
The Problem   → /#problem
How We Work   → /#how-we-work
Proof         → /proof
About         → /about
[Book a 30-minute call] → /book
```

Diagnostic comes back into the nav when `/diagnostic` exists. Not before. Two nav items currently 404 and that is worse than a short nav.

---

## 7. Sitemap

Regenerate from the routes that actually exist: `/`, `/proof`, `/proof/care-rota`, `/about`, `/book`. Add entries as routes ship, never ahead of them.

---

## Acceptance

- [ ] `npm run build` clean
- [ ] `npx tsc --noEmit` exit 0
- [ ] No route in the nav returns 404
- [ ] Company number appears once, in the footer
- [ ] No delivery or turnaround duration claim appears on `/` (CTA "Book a 30-minute call" is exempt)
- [ ] CareRota full case study exists at `/proof/care-rota` and nowhere else (abbreviated home card with screenshot is required)
- [ ] Sitemap matches the built routes exactly
- [ ] `grep -riE "pune|100%|guarantee|zero downtime|small firm" app components content` returns nothing

---

## What unblocks the last three pages

One paragraph each, from Ashok, on what actually happens:

- **The Diagnostic.** What you do first, what you look at, what the client receives at the end.
- **The Build.** How you decide what to build, how the client sees it before it takes over, how handover works.
- **The Retainer.** What you actually do each month.

Written from a real engagement, not from what the service is supposed to be. Those three paragraphs are the only thing standing between this and a finished site.

---

## 8. Layout, icons, motion — the outstanding requests

**Canvas.** In `components/sections/section-full-bleed.tsx` only. Outer element gets `min-h-[100svh]` plus `flex flex-col justify-center`. Inner container becomes `w-full max-w-[1440px] mx-auto px-[10px]`. Same find-and-replace in `nav.tsx` and `footer.tsx`: `max-w-[1200px] mx-auto px-6 sm:px-8` → `w-full max-w-[1440px] mx-auto px-[10px]`.

`min-h`, never `h`. The CareRota page is several viewports tall and a fixed height clips it. Add a `fullHeight` prop defaulting true, and pass `fullHeight={false}` on the final CTA and the who-this-is-for line, which are short and look empty forced to full screen.

**Icons.** Lucide only, already installed. 24px viewBox, stroke not fill so the weight matches Urbanist 300. Never emoji. Icons appear in exactly two places: the three problem rows (Time, Money, You) and the three How We Work cards. Nowhere else. An icon labels something or it does not go in.

**Motion.** Nothing new until the static site passes the gate in `01_technical_foundation.md`. One Lottie is planned for the hero diagram, spec is in the chat log, not built yet. Do not add scroll animation, parallax, counters or page transitions.

---

## 9. Order of work

1. Block 1, 2, 3 — the three copy and layout fixes. Small, do them first.
2. Block 8 — canvas, then icons.
3. Block 4, 5, 6, 7 — multipage, home shortening, nav, sitemap.
4. Run the acceptance checklist.

Stop and report after each of the four.

---

## 10. Colour distribution — 40 / 40 / 20

The site should read as 40% Midnight Sapphire, 40% Pearl White, 20% Alchemical Gold.

**Measure it across the whole visual field, not just section backgrounds.** Gold at 20% of full-bleed backgrounds would mean two or three gold sections, which is loud at this chroma and breaks the "gold appears once" rule in `02_design_system_spec.md`. Gold reaches its 20% the way an accent normally does: one gold band, plus gold working consistently in every other section.

### Current state, and the correction

Measured across the 9 home page content sections (chrome elements — Nav and footer — are both Sapphire, but are explicitly excluded from the 4 / 4 / 1 section tally):
Sapphire currently runs three content sections, Pearl five, Gold one. Pearl is over-weighted and gold is under-used.

**Move the "Have you bought AI yet?" section from Pearl to Sapphire.** That gives exactly four Sapphire, four Pearl, and one Gold across the 9 content sections (a 44% / 44% / 11% section backdrop ratio, with gold accents bringing total visual gold to 20%). It also does a deliberate job: the tone change marks the moment the page asks the reader a question, which is the only interactive decision on the page.

| Tone | Content Sections (9 total; Nav and footer excluded) | Chrome Elements (excluded from 4/4/1 count) |
|---|---|---|
| **Sapphire** (4) | Hero, who this is for, have you bought AI yet, who you would be working with | Nav, footer |
| **Pearl** (4) | The problem, how we work, proof, final CTA | — |
| **Gold** (1) | The statement band | Accent everywhere |

### Where gold does its 20%

In every section, not only the gold band:

- Section eyebrows (`THE PROBLEM`, `HOW WE WORK`) — gold on Sapphire, gold-deep on Pearl
- The short rule mark beside each eyebrow
- Primary buttons
- Text link underlines and the arrow glyph
- Icon strokes in the problem rows and the How We Work cards
- Card top-borders or left-borders where a card needs emphasis
- Every connector line and node in the system diagram
- The `01 / 02` step numerals on the How We Work cards

### The rules that constrain it

Unchanged from `02_design_system_spec.md`, and they are not negotiable:

- **Pearl on Gold is 1.95:1 and fails.** Never put pale text on the gold band.
- On Gold, use Sapphire (7.13:1) or Ink (8.34:1).
- On Pearl, gold text must be **gold-deep** `#7B6620`, never `#D4AF37`.
- On Sapphire, `#D4AF37` is correct at 7.13:1.
- Gold is never a large background outside the single statement band.

### Verify

Screenshot the full home page at 1440 wide, then eyeball the three-way split. If Pearl still dominates, the fix is another section moving to Sapphire, not more gold.

---

## 11. Second review pass — build items

### 11.1 Bug: the hub logo is not rendering

`public/brand/alchemetryx-mark.png` was missing from the repo. It is now committed. Confirm `system-diagram.tsx` points at `/brand/alchemetryx-mark.png` and the mark appears in the hub. This is a missing-asset bug, not a design problem.

### 11.2 Own-built platforms — a new proof section

Three things Alchemetryx built and runs. This is separate from client case studies and must be labelled as such.

**Fitosys** — copy is in `Fitosys Automating Operations.md` in this folder. Use it as written. Two notes:
- "keep 100% of their client earnings" stays. It is a factual product claim about a zero-commission architecture, not a delivery guarantee. The no-absolutes rule targets promises about outcomes we cannot control, not statements of how a system works.
- ₹999/month and the ~₹2,000 backend figure are real and stay.

**meetprerna.com** and **primeraskin.com** — BLOCKED. No approved copy exists for either. One paragraph each from Ashok: what it is, what was built, what it runs on. Do not write these from the live sites.

Label the section so an own-build is never mistaken for a client engagement. Suggested: "Things we built and run ourselves."

### 11.3 Hero headline size

Increase to XL. Target `clamp(3rem, 7vw, 5.5rem)`, weight 300, tracking `-0.04em`. Keep it to three lines at 1440.

### 11.4 Buttons become pills

`border-radius: 9999px` on every button. Update the shared Button component, not individual call sites.

### 11.5 Icon and label alignment — both sections

Currently the icon sits above the label and the two are on different left edges. It reads as an accident.

Fix in the problem rows and the How We Work cards: put icon and label on **one horizontal line**, vertically centred, `gap: 12px`, icon 20px, both sharing the same left edge as the body text below. Nothing sits on its own line.

### 11.6 Who you would be working with — right side is empty

Two changes:
- Add a CTA linking to `/about`. Text link, gold underline, matching the other in-page links.
- The right two-thirds is dead space. Put a visual there. Simplest honest option is the system diagram again at reduced scale, or a single CareRota screenshot. Do not invent a new graphic.

### 11.7 Light beam, RIGHT NOW to AFTER

A pulse travelling along the connector paths, left to right through the hub. Build it in SVG with `stroke-dasharray` plus `stroke-dashoffset` animated by GSAP, not by adding a library. One pass every 4 seconds, gold, low opacity. Must be inside `gsap.matchMedia()` and absent under `prefers-reduced-motion`.

This is the signature moment from the motion spec. Do not add scroll animation elsewhere to match it.

### 11.8 Framer components — flagged, do not import

Two Framer URLs were suggested: a preloader/page-transition and a vertical line TOC nav.

**Do not import either.** Two reasons, both real:
1. `framer.com/m/*.js` modules are published for Framer's own runtime. They are not designed to be imported into a Next.js app and pulling one in adds a dependency on a third party's CDN and React version.
2. `01_technical_foundation.md` locks the stack and excludes Framer Motion. `CLAUDE.md` lists page-transition choreography as a deliberate exclusion.

**The TOC line nav is worth rebuilding natively.** The pattern is thin horizontal rules that expand and reveal a label on hover. That is roughly thirty lines of CSS with a width transition and an opacity transition, no library. Build it that way if Ashok wants it.

**The preloader contradicts an existing lock.** A page transition delays first paint on every navigation, which works against the LCP budget in `01_technical_foundation.md`. If Ashok wants it anyway that is his call, but it should be a deliberate override, not something added quietly.

### 11.9 Lottie

Correct, it does not exist. The spec was written, the file was never produced. It needs either a designer to build the JSON from the brief in the chat log, or the decision that 11.7 (GSAP stroke animation) replaces it. **11.7 is the cheaper and better answer** — same effect, no 40KB JSON, no extra dependency, and it degrades to a static SVG for free.

### 11.10 Canvas, restated because it keeps slipping

1440px max content width, 10px gutter, `min-h-[100svh]` per section, background full-bleed. Detail in block 8. Verify with a screenshot at 1440 before reporting done.

---

## 12. Answer map — every item from the second review

Ten items were raised. Each one below, with where it is handled and what changed.

| # | Item | Where | Status |
|---|---|---|---|
| 1 | Fitosys, meetprerna, primeraskin as own-built proof | 11.2, revised in 12.1 | Unblocked |
| 2 | Canvas 1440px, sections 100svh | 12.2 | Restated precisely |
| 3 | Hero headline too small | 11.3 | XL |
| 3a | Logo not rendering in the hub | 11.1, revised in 12.3 | Asset committed, second asset needed |
| 3b | Light beam, RIGHT NOW to AFTER | 11.7 | GSAP, no library |
| 4 | CTA pill shape | 12.4 | Specified |
| 5 | Problem rows, icon and text alignment | 11.5 | Fixed |
| 6 | How We Work cards, same alignment fault | 11.5 | Fixed |
| 7 | Who-we-are: CTA to /about, right side empty | 12.5 | Specified |
| 8 | Framer preloader | 11.8 | Rebuild in our own stack |
| 9 | Lottie missing | 11.9 | Replaced by 11.7 |
| 10 | Framer TOC line nav | 11.8, 12.6 | Rebuild in our own stack |

### 12.1 meetprerna and primeraskin — unblocked

Ashok is supplying case studies for both. Build the own-build section to hold **four** entries: CareRota, Fitosys, meetprerna.com, primeraskin.com. Each renders from the same data shape, so a new one drops in without touching layout.

Fitosys copy is ready now. Build with Fitosys live and the other two as data entries with `published: false` until the copy lands. Do not write placeholder copy for them.

### 12.2 Canvas — exact values

Every section, the nav and the footer use the same container:

```
outer:  w-full, background colour, min-h-[100svh], flex flex-col justify-center
inner:  w-full max-w-[1440px] mx-auto px-[10px]
```

Background runs full-bleed to the browser edge. Content stops at 1440. Gutter is 10px, not 24, not 32.

`min-h`, never fixed `h`. Pass `fullHeight={false}` on the final CTA and the who-this-is-for line.

**Verify by measuring, not by eye.** Screenshot at 1920 wide: the coloured band should reach both edges, and the text column should be 1440 with 10px of clear space each side.

### 12.3 Logos — two assets, not one

| Asset | File | Used in |
|---|---|---|
| Mark, the geometric A | `/brand/alchemetryx-mark.png` | Diagram hub. **Committed, working.** |
| Main logo, wordmark | `/brand/main-logo.svg` | Nav, footer, replacing the text "Alchemetryx" | 

**The main logo file is not in the repo.** Ashok to supply. Until it arrives the nav keeps the text wordmark. SVG preferred over PNG for both, so they stay sharp and can inherit the gold token.

### 12.4 CTA buttons — pill

On the shared Button component, not per call site:

- `border-radius: 9999px`
- Horizontal padding increases to compensate for the round ends: `px-8` at default size, `px-10` at large. A pill with rectangle padding looks pinched.
- `:active` gets `transform: scale(0.97)`, 150ms. Press feedback is the one thing missing on every button today, and on touch there is no hover state to fall back on.
- Gold fill, Ink text. Contrast 8.34:1, already verified.

### 12.5 Who you would be working with — the empty right side

Two additions.

**CTA.** Text link under the body copy, gold underline: "How we work, and who we are" → `/about`.

**The visual.** The right two-thirds currently holds nothing. Fill it with a 2×2 grid of the things Alchemetryx has built: CareRota, Fitosys, meetprerna.com, primeraskin.com. Small tiles, name plus one line, each linking to its entry in the own-build section.

This is the right visual for this section specifically. The heading says "we build the thing, not a deck about it" and directly beside it sits the evidence. No new graphic needs inventing, and it uses assets that are arriving anyway.

Build the grid so it renders with however many entries are published. With Fitosys and CareRota live it shows two.

### 12.6 TOC line nav — our own stack

The pattern: thin horizontal rules stacked vertically, one per section. Default state shows only the lines. On hover a line widens and its label fades in.

CSS only, no library:

- Each item is a flex row: a `<span>` rule with `width: 24px`, and a label at `opacity: 0`.
- On `:hover` and `:focus-visible`: rule goes to `48px`, label to `opacity: 1`.
- `transition: width 240ms, opacity 240ms`, easing `cubic-bezier(0.23, 1, 0.32, 1)`.
- Rules are `--color-sapphire-line`, active item is `--color-gold`.
- Labels must be real text, present in the DOM at all times, so screen readers and crawlers read them. Hide with opacity, never `display: none`.
- Whole thing inside `@media (prefers-reduced-motion: reduce)` guard: labels visible by default, no width animation.

Roughly thirty lines. No Framer, no dependency, and it matches the locked stack.

---

## 12. Corrections to block 11

### 12.1 Two logo assets, not one

| File | What it is | Used in |
|---|---|---|
| `/brand/alchemetryx-mark.png` | The symbol only | System diagram hub. Committed, present. |
| `/brand/main-logo.*` | The full lockup, mark plus wordmark | Nav, footer, favicon, OG image. **Not in the repo. Ashok to supply.** |

Until `main-logo` arrives the nav keeps rendering the wordmark as text. Do not substitute the mark for the lockup, they are different assets doing different jobs.

### 12.2 meetprerna.com and primeraskin.com — unblocked

Ashok is supplying the case studies. Build the own-build section to hold **four** entries: Fitosys, meetprerna, primeraskin, and CareRota if it belongs here rather than under client work.

Structure it as data, same shape as `content/case-studies.ts`, so each new one drops in without touching the component. Render only entries marked publishable. Fitosys copy exists now; the other two render as soon as their copy lands.

### 12.3 Framer components — build natively, confirmed

Both patterns get built on the locked stack. No `framer.com/m/*` imports.

**Vertical line TOC nav.** Thin horizontal rules stacked vertically. Default state shows lines only. On hover a line widens and its label fades in. CSS width and opacity transitions, 200ms, `ease-out`. No library. Roughly thirty lines. Use it for in-page section navigation.

**Page transition.** If built, GSAP only, and it must not delay first paint. A fade on route change, under 300ms, is the ceiling. Anything that holds a loading screen breaks the LCP budget in `01_technical_foundation.md`.

### 12.4 Canvas — the exact values, final

```
Section element:  w-full min-h-[100svh] flex flex-col justify-center
Background:       full-bleed, edge of browser, no max-width
Inner container:  w-full max-w-[1440px] mx-auto px-[10px]
```

Applies to `section-full-bleed.tsx`, `nav.tsx`, `footer.tsx`. Nothing else sets its own container width. `min-h`, never `h` — the CareRota page is several viewports tall.

Short sections take `fullHeight={false}`: the final CTA, the who-this-is-for line.

**Verify:** screenshot at exactly 1440 wide. Background touches both browser edges. Content starts 10px in. No horizontal scrollbar at 375, 768, 1024, 1440.

### 12.5 CTA button — the exact spec

```
border-radius: 9999px
padding:       14px 28px
background:    var(--color-gold)
color:         var(--color-ink)      /* 8.34:1 */
font-weight:   400
transition:    transform 160ms ease-out, filter 200ms ease
:hover         filter: brightness(1.06)
:active        transform: scale(0.97)
:focus-visible outline: 2px solid var(--color-gold-deep); outline-offset: 2px
```

Change the shared Button component only. The `:active` scale is the press feedback flagged in `07_motion_interaction_qa.md` and still missing.

Secondary buttons: same shape, transparent background, 1px border in the current section's line colour.

### 12.6 The empty right side on "We build the thing"

That section claims Alchemetryx builds things. The right two-thirds is empty. Fill it with **the things they built**.

A 2×2 grid of small cards, each one name plus one line:

| | |
|---|---|
| **CareRota** — rota and cost for a UK care home | **Fitosys** — zero-commission platform for India coaches |
| **meetprerna.com** — awaiting copy | **primeraskin.com** — awaiting copy |

Each card links to its entry in the own-build section. Cards render only when their copy exists, so today it shows two and grows to four.

This is better than a decorative diagram: it puts evidence next to the claim instead of an illustration next to it. Add the `/about` text link below the body copy as already specified in 11.6.

---

## 13. Two corrections to block 12, checked against the repo

### 13.1 `main-logo.png` exists on disk — but is untracked

`public/brand/main-logo.png` is present locally. 12.1 was wrong to call it missing. However, section 14a supersedes this: the file is **untracked** and does not appear in the Vercel deploy. Both assets need `git add` before the next deploy.

- `/brand/alchemetryx-mark.png` — tracked but modified and uncommitted (placeholder ships, not the real mark)
- `/brand/main-logo.png` — untracked (does not ship at all)

**Action:** see section 14a for the fix. Nav and footer should also swap the text wordmark to `main-logo.png` via `next/image`, height 28px in the nav, 24px in the footer, with alt text "Alchemetryx".

### 13.2 The Lottie exists

`public/animations/system-flow.json` is in the repo. Block 11.9 was wrong to say it was never produced. (The earlier "missing" claim is superseded by this finding.)

**Action:** find out whether it is referenced anywhere. If it is not, that is why nothing animates — the file was built and never wired in. Two paths:

1. **Wire it up.** Add `lottie-react`, render it in the hero diagram, and pair it with a static SVG fallback under `prefers-reduced-motion`.
2. **Drop it and use 11.7.** The GSAP `stroke-dashoffset` animation gives the same left-to-right beam with no new dependency and no JSON payload.

**Recommendation is still 2.** But this is now a real choice between two things that exist, not a missing asset. Report the file size and whether it is imported anywhere before deciding.

---

## 14. WITHDRAWN — block 14 was wrong

An earlier version of this block said `lottie-react` has a default export and that
`import { Lottie }` on line 5 of `system-diagram.tsx` was the bug behind both the
missing logo and the missing animation.

That was checked against the installed package and it is false. `lottie-react@3.1.1`
exports `Lottie` as a **named** export. Changing it to a default import produces:

```
TS2613: Module 'lottie-react/build/index' has no default export.
```

**Do not change line 5.** The existing import is correct. The `src={object}` prop is
also correct for v3 (`src: string | object`).

---

## 14a. ROOT CAUSE — the deployed build has the wrong asset

The code was never the problem. Git is.

| Asset | State | Consequence on Vercel |
|---|---|---|
| `public/brand/alchemetryx-mark.png` | tracked, but **modified and uncommitted** | the deploy serves the old committed 3,885-byte placeholder, not the 23,378-byte mark Ashok supplied |
| `public/brand/main-logo.png` | **untracked** | not in the deploy at all |

`components/sections/system-diagram.tsx` and `hero.tsx` are both committed and
correct. The last commit is `2281511` and `main` is level with `origin/main`, so
what is live is the code plus the placeholder asset.

### Fix

```bash
git add public/brand/alchemetryx-mark.png public/brand/main-logo.png
git commit -m "fix(brand): commit real Alchemetryx mark and main logo"
git push
```

Nothing else. No source file needs editing for this symptom.

### On the Lottie "not visible anywhere"

Once the mark is correct, look again before changing anything. The Lottie is
`absolute inset-0` behind the HTML label layer and its 6 layers draw the same
boxes and connectors as the static SVG fallback, so it can render perfectly and
still read as "nothing is animating". If that is what is happening, the problem
is that the animation is too close to the still frame, not that it is broken.

Then decide: compare it against the GSAP `stroke-dashoffset` beam in 11.7 and keep
one. Do not ship both.

### Still worth doing (unchanged from before)

`import systemFlowAnimation from "@/public/animations/system-flow.json"` inlines
11.8KB of JSON into the client bundle while the same file is also served
statically from `/animations/`. It ships twice. Move it to
`content/animations/system-flow.json` and import from there, or fetch
`/animations/system-flow.json` at runtime. Pick one.

**Verify:** hub shows the real gold mark, nothing animates under
`prefers-reduced-motion`, no console error, `npx tsc --noEmit` exit 0.
