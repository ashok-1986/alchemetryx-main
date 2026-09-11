# "Where's your week going?" — Build Brief v1

**Date:** 11 September 2026
**For:** the `/week` route and the diagnostic behind it
**Sources:** `alchemetryx_xray_scoring_matrix_v0.2`, `01_technical_foundation`, `02_design_system_spec`, `04_ia_content_map`, `05_prd`
**Status:** For build. Home page integration is Phase 2 and out of scope here.

---

## 1. Locked decisions

| # | Decision | Value |
|---|---|---|
| 1 | Invitation name | **Where's your week going?** Route `/week`. |
| 2 | Output name | **Systems Efficiency Score**, unchanged from the matrix |
| 3 | Retired | "Tech Stack X-Ray" and "Systems Check". The word X-Ray appears nowhere in copy, URLs, print or email. |
| 4 | Delivery | Score on screen immediately. Written assessment by email inside two working days. |
| 5 | Price | Free. Permanently. No paid tier, no access codes, no entitlement logic. |
| 6 | Form order | Nine scored questions, then the score, then context questions and Q12 |
| 7 | Stack | Fillout hosts the form, the calculation and the score page. No backend, no database. |
| 8 | Scoring model | v0.2 exactly as written. No changes to weights, questions or bands except the label rewrites in section 6. |

**Why Fillout and not a custom build.** The locked stack has no API route, no database and no email sender. Fillout is already paid for and already in the stack for booking. It does conditional logic, which covers the G1 routing. It does calculated fields, which covers the scoring. It stores partial submissions, which section 15 of the matrix requires. And it adds zero KB to the site's JavaScript budget because the form lives on its own page.

**What this costs.** The score page renders inside Fillout's chrome, not your own. Use Fillout's custom CSS to apply the palette and Urbanist and you get most of the way there. Accept the gap for v1. Revisit at 200 submissions, not 40.

---

## 2. What is being built

Two things.

**A marketing page** at `/week` on the Next.js site. Static, server-rendered, zero JavaScript beyond the existing motion wrappers. Its only job is to make a stranger spend four minutes.

**A Fillout form**, linked from that page, that asks nine questions, shows a score, asks four more, and triggers an email.

Nothing else. No account, no login, no dashboard, no saved history.

---

## 3. The marketing page, `/week`

### Structure

| # | Section | Tone | Content |
|---|---|---|---|
| 1 | Hero | Sapphire | The question, the promise, the primary action |
| 2 | The three things | Pearl | Leakage, Visibility, Fragmentation in plain words |
| 3 | What you get | Pearl | Sample output, side by side with the list of what arrives by email |
| 4 | How it works | Pearl | Three steps, with the time cost named |
| 5 | The honest bit | Sapphire | The band-5 line and the data-handling line |
| 6 | CTA | Sapphire | Repeat the primary action |

No gold section on this route. Gold appears only as a hairline rule above section 5 and as the sample score number on Sapphire.

### Copy

All copy below is checked against the banned list in the IA doc. No "operations" as a standalone noun, no "intelligence", "transformation", "unlock", "empower", "seamless", "pilot", "AI-powered", "ecosystem", "cutting-edge", "leverage".

**Hero headline**

> Where is your week going?

**Hero sub-head**

> Nine questions. Four minutes. You get a score, the one thing costing you most, and a written assessment inside two working days. No charge, no login.

**Primary action**

> Start

**Section 2 heading**

> Three things eat the week

**Section 2 body**, three items, no icons

> **Rework.** Work done twice because something was missing, wrong, or never passed on.
>
> **Slow answers.** How long it takes you to find out how the business is actually doing.
>
> **Manual handoffs.** A person carrying information from one system to the next because nothing else will.
>
> Most owner-led businesses lose the largest part of the week to one of these three. Almost none can say which one.

**Section 3 heading**

> What arrives

**Section 3 body**

> On screen, straight away: your score out of 100, the three areas scored separately, and which one is costing you most.
>
> By email inside two working days: a written assessment of why that area is your constraint, what it is likely costing, and what a fix looks like. Written for you, not a template.

**Section 4 heading**

> How it works

> One. Nine questions about how work actually moves through your business. Four minutes, no preparation.
>
> Two. Your score, on screen, immediately.
>
> Three. Four more questions so the written assessment is about your business and not a generic one. Then it lands in your inbox.

**Section 5 heading**

> Two honest things

> If your business already runs well, we will say so. The top band reads: systems-led, you probably do not need us. That is a real result and some people get it.
>
> Your answers are used to write your assessment and to improve the scoring. They are not sold, not shared, and not added to any list you did not ask for.

**Section 6**

> Nine questions. Four minutes.
> [Start]

### Design treatment

| Element | Treatment | Rule |
|---|---|---|
| Hero headline | `--text-display-xl`, Urbanist 300, tracking -0.04em, Pearl on Sapphire | Type scale |
| Hero sub-head | `--text-body`, 400, `--color-slate`, max-width 520px | 65-character rule, 5.92:1 on Sapphire |
| Primary button | `primary` variant, Gold fill, Ink text, 6px radius | Button table. Ink on Gold is 8.34:1 |
| Button press | `transform: scale(0.97)` on `:active`, `transition: transform 160ms ease-out` | Press feedback |
| Section 2 items | Three columns desktop, stacked under 768px, 16px gap, no cards, no shadow | Flat elevation |
| Sample score number | `--text-display-xl`, Urbanist 300, Gold on Sapphire, 7.13:1 | Gold permitted use 1. **Never Gold on Pearl, 1.95:1, banned.** |
| Rule above section 5 | 1px Gold hairline, full-bleed | Gold permitted use 3 |
| Section gaps | 120px desktop, 72px under 768px | Layout rules |
| Rendering | Every section a server component. The only client code is the existing `Reveal` wrapper. | Technical foundation section 4 |

### Metadata

```
Title:       Where's your week going? — Alchemetryx
Description: Nine questions, four minutes. Find out which of three things is
             costing your business the most time, and what to do about it.
Route:       /week
```

Add to the sitemap. Add `Service` schema. Confirm robots allows GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot and Applebot per the SEO doc.

---

## 4. The form

### Page 1: the gate

G1, on its own, with no framing that makes it feel like a test.

> **Have you bought or subscribed to any AI tool for the business in the last 18 months?**
> Yes / No / Not sure

Routing, unchanged from the matrix. Yes shows Q10 and Q11 later. No and Not sure skip them. Not sure is treated as No and flagged internally. G1 never affects the Systems Efficiency Score.

If the visitor arrives from the home page level router carrying `?g1=yes` or `?g1=no`, pre-select it and show it as answered. That is Phase 2 work but build the parameter handling now so Phase 2 is a link change, not a form change.

### Page 2: the nine scored questions

Q1 to Q9, in matrix order, all required. Five options each, radio buttons, no default selected. Answer text exactly as the matrix specifies, with three copy corrections:

| Where | Matrix text | Use instead | Why |
|---|---|---|---|
| Q1, lowest option | "Significant parts of the operation depend on recurring manual work" | "Significant parts of the business depend on recurring manual work" | "the operation" trips the banned-word rule |
| Q8 | Group labels Financial / Operational / Forward-looking | Show no group labels at all, as the matrix already instructs | Confirming, because it is easy to build them in by accident |
| Q12 | "one operational headache" | "one recurring headache" | Same rule |

Q8 is checkboxes. The deterministic scoring rule in matrix section 7 is the rule. "Other" free text never counts toward a group and never raises the rating on its own.

Progress shown as text only: "4 of 9". No animated bar. A bar reads as a survey and owner-led buyers abandon surveys.

If G1 was Yes, Q10 and Q11 follow here, both required.

### Page 3: the score

See section 5.

### Page 4: context and the email address

Only now. C1 industry, C2 team size, C3 tool count, Q12 free text, then name, email, business name.

Heading: **Four more, so the assessment is about your business**

Sub-line: **Then it lands in your inbox inside two working days.**

Q12 stays optional. C1 to C3 are required, because they select the pain framing in the assessment and they are the only sector data you will have for the first 40.

### Page 5: confirmation

> Done. Your assessment will reach [email] inside two working days.
>
> If you would rather talk it through, book a 30-minute call. [link]

That link is the one place the site's primary CTA appears in this flow, and it appears after the value has been delivered, not before.

### Validity rules, from matrix section 15

- All nine core questions required. Q10 and Q11 required when G1 is Yes.
- Every response value must validate to 1, 2, 3, 4 or 5 before conversion. Anything outside that range rejects the submission. It does not default.
- Partial submissions are stored, never scored, never displayed. They are kept for drop-off analysis, because the question people quit on is itself data about question quality.

---

## 5. The score page

### What it shows

```
YOUR SYSTEMS EFFICIENCY SCORE

43

CONNECTED, BUT YOU CANNOT SEE IT

  Rework              50
  Slow answers        50
  Manual handoffs     25

COSTING YOU MOST      Manual handoffs
STRONGEST             Rework

AI RETURN             25
  You have paid for AI but it is not built into any recurring
  process, and there is no measurable return yet.
```

### Two changes from the matrix output structure

**Category names are translated for the reader.** Leakage, Visibility and Fragmentation are internal names. The reader sees Rework, Slow answers and Manual handoffs, which are the same three things in words an owner uses. Internal names stay in the data and in the assessment's internal fields.

| Internal | Shown to reader |
|---|---|
| Leakage | Rework |
| Visibility | Slow answers |
| Fragmentation | Manual handoffs |

**"Primary friction" becomes "Costing you most".** Friction is consultant language.

### Design treatment

| Element | Treatment |
|---|---|
| Background | Sapphire, full-bleed |
| The number | `--text-display-xl`, Urbanist 300, Gold on Sapphire |
| Band label | `--text-heading`, Urbanist 300, Pearl, uppercase not required |
| Three category rows | `--text-body`, Pearl labels, Gold numerals, 1px `--color-sapphire-line` between rows |
| "Costing you most" value | `--text-heading`, Gold |
| AI Return narrative | `--text-body-sm`, `--color-slate` |
| Count-up on the number | Yes. 600ms, `cubic-bezier(0.23, 1, 0.32, 1)`, once per visitor, skipped entirely under `prefers-reduced-motion` where the final number renders immediately. This is the one moment in the product where delight is earned: rare, first-time, and it is the payoff for four minutes. |
| Category rows entry | Stagger 50ms between the three rows, ease-out. Never blocks the continue button. |

Do not animate anything else on this page. The reader is trying to read a number.

---

## 6. Band labels, rewritten

Matrix bands 2, 3 and 4 use language an owner-led buyer will not parse. "Instrumented" is not a word a Harrow shop owner uses. Boundaries are unchanged. Labels only.

| Score | Band | Matrix label | Use instead |
|---:|---:|---|---|
| 0 to 33 | 1 | Running on people, not systems | **Unchanged.** It is already plain and it is good. |
| 34 to 40 | 2 | Systems exist, they do not connect | You have the tools. They do not talk to each other. |
| 41 to 48 | 3 | Connected, not yet instrumented | Connected, but you cannot see it |
| 49 to 56 | 4 | Instrumented, not yet optimised | You can see it, but it still takes effort |
| 57 to 100 | 5 | Systems-led. You probably do not need us | **Unchanged.** Best sentence in the whole model. |

---

## 7. The scoring engine

Implement as pure functions, not as Fillout formulas scattered across fields. Write them once in TypeScript, test them, then transcribe into Fillout calculated fields. The TypeScript version is the source of truth and the thing the tests run against.

```ts
// lib/score.ts
// Health scores. Higher is always better. 0 = severe constraint, 100 = none evident.
// This invariant is tested. See section 8.

type Rating = 1 | 2 | 3 | 4 | 5;

/** Matrix section 5. Uniform conversion, deliberately. */
const health = (r: Rating): number => (r - 1) * 25;

export interface Answers {
  q1: Rating; q2: Rating; q3: Rating;   // Leakage
  q4: Rating; q5: Rating; q6: Rating;   // Fragmentation
  q7: Rating; q8: Rating; q9: Rating;   // Visibility
  q10?: Rating; q11?: Rating;           // AI Return, only when G1 = yes
}

export interface Result {
  leakage: number;
  visibility: number;
  fragmentation: number;
  score: number;              // rounded for display
  scoreExact: number;         // retained internally, matrix section 9
  band: 1 | 2 | 3 | 4 | 5;
  costingMost: Category;      // lowest category, was "primary friction"
  strongest: Category;        // highest category
  aiReturn: number | null;    // null when G1 is no or not sure
}

type Category = "leakage" | "visibility" | "fragmentation";

/** Matrix section 9. Question weights inside each category. */
export function categories(a: Answers) {
  return {
    leakage:       (health(a.q1) * 10 + health(a.q2) * 10 + health(a.q3) * 8) / 28,
    visibility:    (health(a.q7) * 12 + health(a.q8) * 8  + health(a.q9) * 10) / 30,
    fragmentation: (health(a.q4) * 9  + health(a.q5) * 9  + health(a.q6) * 9)  / 27,
  };
}

/** Matrix section 9. Category weights 40 / 33 / 27. */
export function overall(c: ReturnType<typeof categories>): number {
  return c.leakage * 0.40 + c.visibility * 0.33 + c.fragmentation * 0.27;
}

/** Matrix section 10, boundaries unchanged from v0.2. */
export function band(score: number): 1 | 2 | 3 | 4 | 5 {
  if (score <= 33) return 1;
  if (score <= 40) return 2;
  if (score <= 48) return 3;
  if (score <= 56) return 4;
  return 5;
}

/**
 * Matrix section 11. Tie-break is mandatory and ordered by category weight:
 * Leakage (40) beats Visibility (33) beats Fragmentation (27).
 * Undefined tie behaviour in code becomes arbitrary behaviour in production.
 * Ties occur in 2.6% of combinations, so this runs often enough to matter.
 */
const PRECEDENCE: Category[] = ["leakage", "visibility", "fragmentation"];

export function costingMost(c: Record<Category, number>): Category {
  const min = Math.min(...PRECEDENCE.map(k => c[k]));
  return PRECEDENCE.find(k => c[k] === min)!;
}

export function strongest(c: Record<Category, number>): Category {
  const max = Math.max(...PRECEDENCE.map(k => c[k]));
  return PRECEDENCE.find(k => c[k] === max)!;
}

/** Matrix section 9. Reported separately. Never enters the overall score. */
export function aiReturn(a: Answers): number | null {
  if (a.q10 === undefined || a.q11 === undefined) return null;
  return (health(a.q10) * 8 + health(a.q11) * 7) / 15;
}
```

Note what is deliberately absent: G1 appears nowhere in the calculation. A business that bought AI and got nothing must not score lower than one that never tried. That was the whole reason for v0.2.

### Q8 rating, derived not answered

Q8 is checkboxes, so its Rating is computed before it enters `Answers`.

```ts
const FINANCIAL = ["revenue", "grossMargin", "cash", "costs"] as const;
const OPERATIONAL = ["utilisation", "capacity", "retention"] as const;
const FORWARD = ["pipeline", "conversion"] as const;

/** Matrix section 7, Q8. Coverage across groups decides the score, not count. */
export function q8Rating(selected: string[]): Rating {
  const picked = selected.filter(s => s !== "other");   // "other" never counts
  const groups = [FINANCIAL, OPERATIONAL, FORWARD]
    .filter(g => g.some(o => picked.includes(o))).length;

  if (groups === 3 && picked.length >= 4) return 5;
  if (groups === 2) return 4;
  if (groups === 1 && picked.length >= 3) return 3;
  if (picked.length >= 1) return 2;
  return 1;
}
```

A business tracking six financial numbers and nothing else is less visible than one tracking revenue, utilisation and pipeline. The rule encodes that.

---

## 8. Two tests. Both are launch gates.

### Test 1: the direction invariant

Matrix section 1.1 requires this as an automated test so it cannot be silently reversed later.

```ts
// Every category, and the overall score, must move up when answers improve.
// Property test: for any valid answer set, raising any single rating must
// never lower the overall score or its category.
```

Assert across all 5^9 combinations, or a random sample of 100,000, that:
- every category output falls in 0 to 100
- improving any one rating never decreases that category or the overall score
- `costingMost` always returns the lowest-scoring category, ties resolved by precedence

### Test 2: the ten synthetic profiles

Matrix section 17 step 1. The engine must reproduce section 16 exactly. This is the acceptance test.

| Profile | Leak | Vis | Frag | Score | Band | Costing most | AI Return |
|---|---:|---:|---:|---:|---:|---|---:|
| Solo consultant, spreadsheets and email | 43 | 35 | 17 | 33 | 1 | Fragmentation | n/a |
| 6-person agency, disconnected | 50 | 50 | 25 | 43 | 3 | Fragmentation | 25 |
| 20-person care provider, rota in Excel | 16 | 25 | 8 | 17 | 1 | Fragmentation | n/a |
| 12-person firm, connected, dashboard | 75 | 93 | 75 | 81 | 5 | Leakage | 75 |
| 30-person, many tools, no integration | 32 | 57 | 17 | 36 | 2 | Fragmentation | 27 |
| Great visibility, terrible leakage | 0 | 100 | 50 | 47 | 3 | Leakage | n/a |
| Great integration, no visibility | 68 | 0 | 100 | 54 | 4 | Visibility | 38 |
| Systemised solo consultancy | 91 | 85 | 75 | 85 | 5 | Fragmentation | n/a |
| Bought AI and it failed | 25 | 42 | 25 | 31 | 1 | Leakage | 13 |
| 16+ tools, all well integrated | 75 | 75 | 100 | 82 | 5 | Leakage | 63 |

Any mismatch means transcription error, not a model problem. Fix the code, never the table.

### Test 3: Fillout matches TypeScript

After transcribing into Fillout calculated fields, run all ten profiles through the live form by hand and confirm the displayed score matches the table. One afternoon. Skipping it means shipping two scoring engines that disagree.

---

## 9. The written assessment

### The hard boundary, from matrix section 14

The language model receives the **structured result** and writes only:

- the diagnosis narrative
- the explanation of why that area is the constraint
- contextual interpretation using industry, team size and Q12

The model must never produce or alter any raw score, category score, weight, band, or the costing-most and strongest calls. If model output disagrees with the deterministic result, the deterministic result wins and the disagreement gets logged.

Build this by passing the computed result in as structured data, never by handing the model the raw answers and asking it to score. That is the whole design.

### What the email contains

| Block | Content |
|---|---|
| The number and band | Rendered, not described |
| The three categories | Same numbers as the score page |
| Costing you most | Named, then explained in two or three short paragraphs against their industry and team size |
| What it is likely costing | Hours framing, not a currency figure. **No invented pound figure.** You have no data to support one yet. |
| What a fix looks like | Plain description of the first move. No pitch. |
| One line at the end | Offer of a 30-minute call. One line. Not a sales section. |

The temptation is to quantify the cost in pounds because it converts better. Do not, until you have engagement data to back a figure. The whole site is built on not printing numbers you cannot source.

---

## 10. Out of scope for this build

Named so they do not creep in.

- Home page score module, hero link and level-router carry-through. Phase 2, after Care Rota publishes.
- `/week/method` page publishing the nine questions. Phase 2.
- Benchmark and distribution copy. Blocked on 40 real submissions.
- Instant written assessment. Later, and only if volume justifies it.
- Any account, login, saved result or history.
- India variant of `/week`.

---

## 11. Acceptance checklist

- [ ] Nothing anywhere says X-Ray, in copy, URL, email, print or the Fillout form name
- [ ] `/week` passes the performance budget with zero JavaScript beyond the `Reveal` wrapper
- [ ] `/week` readable and the Start button reachable with JavaScript disabled
- [ ] `prefers-reduced-motion` on: no count-up, no stagger, number renders immediately, all content visible
- [ ] Keyboard only: every form field and the submit button reachable, focus always visible
- [ ] Test 1 passes: direction invariant holds
- [ ] Test 2 passes: all ten profiles match section 16 exactly
- [ ] Test 3 passes: Fillout output matches TypeScript on all ten
- [ ] G1 does not affect the Systems Efficiency Score, verified by scoring one answer set twice with G1 yes and no
- [ ] Tie-break verified: an answer set with two equal lowest categories names the higher-weighted one
- [ ] Q8 with six financial boxes and nothing else scores 3, not 5
- [ ] Partial submission stored and not scored
- [ ] Response value outside 1 to 5 rejects rather than defaults
- [ ] Assessment email sends, and its scores match the score page exactly
- [ ] Banned-word grep clean across `/week` copy and every question and answer string
- [ ] Company number 17199377 in the footer of `/week`
- [ ] Data-handling line visible before the email field, not only in a policy page
- [ ] Mobile, real mid-range Android, not the simulator: form completes without stutter

---

## 12. Sequence and effort

| Order | Work | Effort | Gate |
|---|---|---|---|
| 1 | `lib/score.ts` plus tests 1 and 2 | 1 day | Both tests green before anything else is built |
| 2 | Fillout form, five pages, conditional G1 routing | 1.5 days | All nine required, partials stored |
| 3 | Transcribe scoring into Fillout, run test 3 | 0.5 day | Ten profiles match by hand |
| 4 | Score page styling inside Fillout, custom CSS | 0.5 day | Palette and Urbanist applied, contrast checked |
| 5 | `/week` marketing page | 1 day | Performance and no-JS checks pass |
| 6 | Assessment generation and email | 1 day | Deterministic values pass through unaltered |
| 7 | Run on Nimish, Pravin, Prerna and three known businesses | 0.5 day | Scores match what you already know about those businesses |
| 8 | Sample output asset for section 3 of `/week` | 0.5 day | One real anonymised result |
| 9 | QR code and festival screen | 0.5 day | Points at `/week`, tested on two phones |

**Total roughly 7.5 working days.** Step 7 is the one most likely to get skipped and is the only step that catches a wrong model before strangers see it. If a known business scores in a band that contradicts what you know about it, the weights are wrong, not the business.

---

## 13. What is still open

| Item | Why it is not blocking | When it needs answering |
|---|---|---|
| Whether Fillout's plan includes custom CSS | Form works without it, just off-brand | Before step 4 |
| Who writes the assessment for the first submissions, a model or Ashok | First 40 are low volume, a human can write them and that produces better calibration | Before step 6 |
| Whether `/week` gets an India variant | UK only for the festival | After calibration |
| Band 5 spans 43 points | Acceptable at this volume, matrix section 10 says so | At calibration |

---

**Confidence: High** on the page spec, the form flow, the engine and the tests, because every number and rule traces to v0.2 or to the locked design and technical documents, and the two code-level traps that were latent in the matrix, the tie-break and the Q8 rule, are now closed in code. **Medium** on the 7.5-day estimate and on Fillout carrying the score page acceptably, because neither has been attempted and Fillout's styling ceiling is unverified.
