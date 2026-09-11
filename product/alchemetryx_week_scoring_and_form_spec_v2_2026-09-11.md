# "Where's your week going?" — Scoring & Form Spec v2

**Date:** 11 September 2026
**Status:** For build. This supersedes sections 1 (row 7), 4, 5, and 7 of `alchemetryx_week_build_brief_v1_2026-09-11.md`. Everything else in that brief (marketing page copy, band labels, design treatment, acceptance checklist) still stands.
**Why this document exists:** the build brief assumed Fillout Pro. We moved to Tally free plan, then went one step further — Tally does zero scoring. This is the single reference for how that actually works, and it is the document to update whenever a question, weight, or band changes.

---

## 1. What changed from v1, and why

| v1 (build brief) | v2 (this document) |
|---|---|
| Fillout hosts form, scoring, and score page | Tally (free plan, £0) collects answers only |
| Scoring replicated as Fillout calculated fields | Scoring runs once, in `lib/score.ts`, on the Next.js side |
| Score page rendered inside the form tool | Score page is a normal Next.js route, `/week/result` |
| Test 3: manually run 10 profiles through the form tool and check they match TypeScript | **Gone.** There is nothing to keep in sync, because there is only one engine |

**The reason for the second change (not just Fillout→Tally, but scoring→Next.js):** Q8 scores by group coverage, not by counting boxes. Encoding that inside a form tool's conditional logic needs compound AND/OR rules that were untested and high-risk to get silently wrong. A wrong Q8 score is invisible until a respondent or Ashok complains about a diagnosis that doesn't match reality. Moving all scoring into the already-written, already-correct `lib/score.ts` removes that risk category entirely, at zero added cost.

---

## 2. Architecture

```
Tally Form A (free)                    Next.js /week/result
─────────────────                      ─────────────────────
G1 gate                                Parses raw answer text from
Q1–Q9 (all required)         ──────►   the URL query string, maps
Q10–Q11 (shown only if                 each to a Rating (1–5) via
  G1 = Yes; hidden by                  the lookup tables in §4,
  default, SHOW on condition)          runs lib/score.ts, renders
                                        the score.
redirect on completion with
raw answer text as query
params (§3)
```

Tally's only jobs: ask questions, branch Q10/Q11 on G1, redirect with the raw answers. It never sees a weight, a band boundary, or the Q8 rule. Everything scoring-related lives in one file, `lib/score.ts` (§5), which is unchanged from the build brief.

---

## 3. Form A — live reference

| | |
|---|---|
| Public URL | `https://tally.so/r/jajPEJ` |
| Form ID | `jajPEJ` |
| Workspace | `3xyGv5` |
| Status | Published |
| Pages | 5 — G1 gate / Rework (Q1–3) / Manual handoffs (Q4–6) / Slow answers (Q7–9) / AI use (Q10–11, conditional) |
| Progress indicator | Tally's default progress bar (kept on; the single-page "4 of 9" text-only alternative from the build brief was dropped in favour of shorter per-page load) |

**Redirect on completion** (set in Tally's form settings, fires after the last page):

```
https://alchemetryx.com/week/result?g1={{g1}}&q1={{q1}}&q2={{q2}}&q3={{q3}}&q4={{q4}}&q5={{q5}}&q6={{q6}}&q7={{q7}}&q8={{q8}}&q9={{q9}}&q10={{q10}}&q11={{q11}}
```

(Each `{{...}}` is Tally's mention syntax pointing at that question's UUID — resolved to actual UUIDs in the live form. Functionally: every param carries the respondent's answer as plain text, exactly as it reads on the form. `q8` is checkboxes, so it arrives as a comma-separated list of the selected option labels.)

**Domain flag:** the redirect uses `alchemetryx.com`, taken from the legal docs and PRD. Confirm this is the live domain before go-live, or tell me the correct one and I'll fix it in the form.

**If a param is missing or empty** (respondent somehow reached the redirect without answering something required): the Next.js side should treat that as an invalid submission and show a "something went wrong, please retry" state rather than guessing a default. Matches the build brief's validity rule: never default a missing or out-of-range answer.

---

## 4. Answer text → Rating lookup (the critical new piece)

This is what `/week/result` needs that no earlier document specified, because in v1 Fillout would have held this mapping internally. Every string below is the **exact, live text** in Form A. Match verbatim, including capitalisation and punctuation.

### G1 (not scored, used only for branching/flagging)

| Text | Meaning |
|---|---|
| `Yes` | AI Return block applies |
| `No` | No AI Return; AI Opportunity Flag = High |
| `Not sure` | Treated as No for scoring; flag internally for follow-up |

### Q1 — Leakage, weight 10

| Text | Rating |
|---|---:|
| Almost nothing comes to mind. Recurring work is largely automated | 5 |
| There are one or two small recurring tasks | 4 |
| Several recurring tasks still require manual work | 3 |
| Many important recurring tasks are still manual | 2 |
| Significant parts of the business depend on recurring manual work | 1 |

### Q2 — Leakage, weight 10

| Text | Rating |
|---|---:|
| Almost never | 5 |
| Occasionally | 4 |
| Every few weeks | 3 |
| Several times a week | 2 |
| Almost every day | 1 |

### Q3 — Leakage, weight 8

| Text | Rating |
|---|---:|
| Important processes are documented and consistently followed | 5 |
| Most important processes are repeatable, with a few exceptions | 4 |
| Some processes are documented, others rely on individual knowledge | 3 |
| Most processes depend on people knowing what to do | 2 |
| Important work largely lives in people's heads | 1 |

### Q4 — Fragmentation, weight 9

| Text | Rating |
|---|---:|
| Almost never | 5 |
| Rarely | 4 |
| Sometimes | 3 |
| Often | 2 |
| Almost always | 1 |

### Q5 — Fragmentation, weight 9

| Text | Rating |
|---|---:|
| Never | 5 |
| Rarely | 4 |
| Sometimes | 3 |
| Often | 2 |
| Very often | 1 |

### Q6 — Fragmentation, weight 9

| Text | Rating |
|---|---:|
| Almost always | 5 |
| Usually | 4 |
| Sometimes | 3 |
| Rarely | 2 |
| Almost never | 1 |

**Note:** Q4, Q5, Q6 all use the word "Sometimes" for rating 3, and Q4/Q6 both use "Almost never" and "Almost always" — but at opposite ratings (Q4: Almost never=5, Almost always=1; Q6: Almost always=5, Almost never=1). The lookup must be per-question, never a single shared text→rating map across questions.

### Q7 — Visibility, weight 12

| Text | Rating |
|---|---:|
| I can see it immediately | 5 |
| Within a few minutes | 4 |
| Within an hour | 3 |
| I would need someone to prepare it | 2 |
| I would need to wait until month-end | 1 |

### Q8 — Visibility, weight 8 (checkboxes — derived rating, see §4a)

### Q9 — Visibility, weight 10

| Text | Rating |
|---|---:|
| During the month, effectively real time | 5 |
| Within a few days | 4 |
| Around the middle of the month | 3 |
| Near month-end | 2 |
| Mostly after month-end | 1 |

### Q10 — AI Return, weight 8 (shown only if G1 = Yes)

| Text | Rating |
|---|---:|
| AI is embedded in important recurring workflows | 5 |
| AI is built into several recurring processes | 4 |
| Several people use AI for individual tasks | 3 |
| Individuals occasionally use ChatGPT or similar | 2 |
| We pay for it but nobody really uses it | 1 |

### Q11 — AI Return, weight 7 (shown only if G1 = Yes)

| Text | Rating |
|---|---:|
| Yes, and we measure the business impact | 5 |
| Yes, we can estimate the impact with reasonable confidence | 4 |
| We believe AI helps, but have not measured it | 3 |
| We experiment with AI but have not embedded it meaningfully | 2 |
| No identifiable impact so far | 1 |

### 4a. Q8 checkbox labels → group keys

| Label in Tally | Key | Group |
|---|---|---|
| Revenue | `revenue` | FINANCIAL |
| Gross margin | `grossMargin` | FINANCIAL |
| Cash position | `cash` | FINANCIAL |
| Costs | `costs` | FINANCIAL |
| Utilisation | `utilisation` | OPERATIONAL |
| Delivery capacity | `capacity` | OPERATIONAL |
| Customer retention | `retention` | OPERATIONAL |
| Pipeline | `pipeline` | FORWARD |
| Conversion | `conversion` | FORWARD |
| Other | `other` | never counts toward a group or the count |

Feed the selected keys into `q8Rating()` in §5 to get Q8's Rating before it enters `categories()`.

---

## 5. The scoring engine — unchanged from the build brief

This is `lib/score.ts` exactly as specified in the build brief, section 7. Reproduced here so this document is self-contained for whoever builds `/week/result`.

```ts
// lib/score.ts
// Health scores. Higher is always better. 0 = severe constraint, 100 = none evident.
// This invariant is tested. See section 8 of the build brief.

type Rating = 1 | 2 | 3 | 4 | 5;

/** Uniform conversion, deliberate. */
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
  scoreExact: number;         // retained internally
  band: 1 | 2 | 3 | 4 | 5;
  costingMost: Category;      // lowest category
  strongest: Category;        // highest category
  aiReturn: number | null;    // null when G1 is no or not sure
}

type Category = "leakage" | "visibility" | "fragmentation";

export function categories(a: Answers) {
  return {
    leakage:       (health(a.q1) * 10 + health(a.q2) * 10 + health(a.q3) * 8) / 28,
    visibility:    (health(a.q7) * 12 + health(a.q8) * 8  + health(a.q9) * 10) / 30,
    fragmentation: (health(a.q4) * 9  + health(a.q5) * 9  + health(a.q6) * 9)  / 27,
  };
}

export function overall(c: ReturnType<typeof categories>): number {
  return c.leakage * 0.40 + c.visibility * 0.33 + c.fragmentation * 0.27;
}

export function band(score: number): 1 | 2 | 3 | 4 | 5 {
  if (score <= 33) return 1;
  if (score <= 40) return 2;
  if (score <= 48) return 3;
  if (score <= 56) return 4;
  return 5;
}

/**
 * Tie-break is mandatory and ordered by category weight:
 * Leakage (40) beats Visibility (33) beats Fragmentation (27).
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

/** Reported separately. Never enters the overall score. */
export function aiReturn(a: Answers): number | null {
  if (a.q10 === undefined || a.q11 === undefined) return null;
  return (health(a.q10) * 8 + health(a.q11) * 7) / 15;
}

// ---- Q8 checkbox scoring, group coverage not raw count ----

const FINANCIAL = ["revenue", "grossMargin", "cash", "costs"] as const;
const OPERATIONAL = ["utilisation", "capacity", "retention"] as const;
const FORWARD = ["pipeline", "conversion"] as const;

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

---

## 6. Parsing the redirect — ready to adapt for `/week/result`

This turns §4's lookup tables into runnable code, so the mapping isn't hand-typed twice (once here, once in the actual page) and drifting out of sync.

```ts
// lib/parseWeekAnswers.ts
// Parses the raw query string from Form A's redirect into Answers + Q8 keys.

const RATING_MAPS: Record<string, Record<string, 1|2|3|4|5>> = {
  q1: {
    "Almost nothing comes to mind. Recurring work is largely automated": 5,
    "There are one or two small recurring tasks": 4,
    "Several recurring tasks still require manual work": 3,
    "Many important recurring tasks are still manual": 2,
    "Significant parts of the business depend on recurring manual work": 1,
  },
  q2: {
    "Almost never": 5, "Occasionally": 4, "Every few weeks": 3,
    "Several times a week": 2, "Almost every day": 1,
  },
  q3: {
    "Important processes are documented and consistently followed": 5,
    "Most important processes are repeatable, with a few exceptions": 4,
    "Some processes are documented, others rely on individual knowledge": 3,
    "Most processes depend on people knowing what to do": 2,
    "Important work largely lives in people's heads": 1,
  },
  q4: {
    "Almost never": 5, "Rarely": 4, "Sometimes": 3, "Often": 2, "Almost always": 1,
  },
  q5: {
    "Never": 5, "Rarely": 4, "Sometimes": 3, "Often": 2, "Very often": 1,
  },
  q6: {
    "Almost always": 5, "Usually": 4, "Sometimes": 3, "Rarely": 2, "Almost never": 1,
  },
  q7: {
    "I can see it immediately": 5, "Within a few minutes": 4, "Within an hour": 3,
    "I would need someone to prepare it": 2, "I would need to wait until month-end": 1,
  },
  q9: {
    "During the month, effectively real time": 5, "Within a few days": 4,
    "Around the middle of the month": 3, "Near month-end": 2, "Mostly after month-end": 1,
  },
  q10: {
    "AI is embedded in important recurring workflows": 5,
    "AI is built into several recurring processes": 4,
    "Several people use AI for individual tasks": 3,
    "Individuals occasionally use ChatGPT or similar": 2,
    "We pay for it but nobody really uses it": 1,
  },
  q11: {
    "Yes, and we measure the business impact": 5,
    "Yes, we can estimate the impact with reasonable confidence": 4,
    "We believe AI helps, but have not measured it": 3,
    "We experiment with AI but have not embedded it meaningfully": 2,
    "No identifiable impact so far": 1,
  },
};

const Q8_KEYS: Record<string, string> = {
  "Revenue": "revenue", "Gross margin": "grossMargin", "Cash position": "cash",
  "Costs": "costs", "Utilisation": "utilisation", "Delivery capacity": "capacity",
  "Customer retention": "retention", "Pipeline": "pipeline", "Conversion": "conversion",
  "Other": "other",
};

export class InvalidSubmission extends Error {}

function lookup(question: string, text: string | null): 1|2|3|4|5 {
  if (!text) throw new InvalidSubmission(`${question} missing`);
  const rating = RATING_MAPS[question][text];
  if (!rating) throw new InvalidSubmission(`${question} has unrecognised answer: "${text}"`);
  return rating;
}

export function parseWeekAnswers(searchParams: URLSearchParams) {
  const g1 = searchParams.get("g1");
  const q8Text = searchParams.get("q8") ?? "";
  const q8Selected = q8Text.split(",").map(s => s.trim()).filter(Boolean)
    .map(label => Q8_KEYS[label] ?? "other");

  const answers = {
    q1: lookup("q1", searchParams.get("q1")),
    q2: lookup("q2", searchParams.get("q2")),
    q3: lookup("q3", searchParams.get("q3")),
    q4: lookup("q4", searchParams.get("q4")),
    q5: lookup("q5", searchParams.get("q5")),
    q6: lookup("q6", searchParams.get("q6")),
    q7: lookup("q7", searchParams.get("q7")),
    q8: q8Rating(q8Selected),
    q9: lookup("q9", searchParams.get("q9")),
    ...(g1 === "Yes"
      ? { q10: lookup("q10", searchParams.get("q10")), q11: lookup("q11", searchParams.get("q11")) }
      : {}),
  };

  return { g1, answers };
}
```

(`q8Rating` imported from `lib/score.ts`, §5.)

---

## 7. Test profiles — unchanged, still the acceptance test

The ten synthetic profiles from the scoring matrix (section 16) and the build brief (section 8) are unaffected by the architecture change, because the maths didn't change — only where it runs. Run the same ten profiles through `parseWeekAnswers` + `lib/score.ts` and confirm the results still match exactly. This replaces the old "Test 3: Fillout matches TypeScript" — there is no second engine to check against anymore, but the profiles still need to pass through the actual parsing code end to end, not just the pure functions, in case a text string gets mistyped somewhere in this handoff.

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

---

## 8. Open items

| Item | Status |
|---|---|
| Confirm `alchemetryx.com` is the correct live domain for the redirect | Waiting on Ashok |
| Form B (C1–C3, Q12, email capture, linked from the result page) | Not yet built |
| `/week` and `/week/result` Next.js pages | Not started — this document plus the build brief is the full spec Antigravity needs |
| Run the ten profiles through the real form once Form B exists, end to end | Blocked on Form B and the result page both existing |
| Recalibration after first 40 submissions (matrix section 17) | This document is what gets updated if weights, bands, or questions change — edit §4, §5, §7 together, never one alone |

---

**Confidence: High** on everything in sections 3–6, because it's a direct transcription of what is now actually live in Form A, not a plan. **Medium** on the domain in the redirect URL until Ashok confirms it.
