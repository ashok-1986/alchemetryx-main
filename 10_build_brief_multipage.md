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
