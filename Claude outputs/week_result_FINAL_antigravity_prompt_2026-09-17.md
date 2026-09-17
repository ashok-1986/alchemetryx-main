# FINAL Antigravity Prompt — /week scoring redesign + result page fix

One task, four files. It does two things at once: fixes the honest-scoring maths, and fixes the live bug where the result page ignores the answers and shows "q1 missing" to everyone. Do not split it.

Paste everything under the line into Antigravity.

---

**TASK: rework /week scoring and fix the result page so it actually reads the answers. Four files: the scoring implementation, its tests, the result page, and the result client component. No form changes, no new dependencies, no prices, no host or DNS changes.**

Context you need: the site is deployed as static files. `/week/result` is currently written as a server component that reads the answers from the URL at request time. On static hosting there is no per-request server, so the page is frozen at its build-time state and shows "Cannot calculate score / q1 missing" to every visitor, ignoring the query string the Tally form sends. The fix is to compute in the browser (client render), which works on static hosting and needs no server. The scoring maths is also being corrected in the same pass.

Read first: `lib/score.ts`, `lib/parseWeekAnswers.ts`, `__tests__/score.test.ts`, `app/week/result/page.tsx`, `app/week/result/result-client.tsx`. State a one-line plan with a verify step, then work. Surgical changes only, no "while I'm here" refactors.

## 1. `lib/score.ts` — equal-weight, re-spread bands

- `categories()` becomes equal-weight plain averages:
  - `leakage = (health(a.q1) + health(a.q2) + health(a.q3)) / 3`
  - `visibility = (health(a.q7) + health(a.q8) + health(a.q9)) / 3`
  - `fragmentation = (health(a.q4) + health(a.q5) + health(a.q6)) / 3`
- `overall()` becomes `(c.leakage + c.visibility + c.fragmentation) / 3`.
- `band()` thresholds become: `<=34 → 1`, `<=49 → 2`, `<=64 → 3`, `<=84 → 4`, else `5`.
- Leave `health`, `aiReturn`, `q8Rating`, `costingMost`, `strongest`, `PRECEDENCE`, and the `Result`/`Answers` types unchanged. Keep `costingMost`; it now orders the cards. The direction invariant (a higher answer never lowers a score) must still hold.

## 2. `__tests__/score.test.ts` — recomputed targets

Update the ten Test-2 profile `target` objects to these recomputed values. Keep every fixture exactly as it is; only the targets change. Run vitest. If any assertion disagrees with a number below, the engine is authoritative: report the mismatch, do not edit the engine to fit a target and do not silently change a target.

| Profile | Leak | Vis | Frag | Score | Band | CostingMost | AI |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Solo consultant | 42 | 42 | 17 | 33 | 1 | fragmentation | null |
| 6-person agency | 50 | 50 | 25 | 42 | 2 | fragmentation | 25 |
| 20-person care provider | 17 | 25 | 8 | 17 | 1 | fragmentation | null |
| 12-person firm | 75 | 92 | 75 | 81 | 4 | leakage | 75 |
| 30-person business | 33 | 58 | 17 | 36 | 2 | fragmentation | 27 |
| Great vis, terrible leak | 0 | 100 | 50 | 50 | 3 | leakage | null |
| Great int, no vis | 67 | 0 | 100 | 56 | 3 | visibility | 38 |
| Systemised solo | 92 | 83 | 75 | 83 | 4 | fragmentation | null |
| Bought AI failed | 25 | 42 | 25 | 31 | 1 | leakage | 13 |
| 16+ tools integrated | 75 | 75 | 100 | 83 | 4 | leakage | 63 |

Add one profile for band-5 coverage: name "Fully systemised (all top answers)", fixture `{ q1:5,q2:5,q3:5,q4:5,q5:5,q6:5,q7:5,q8:5,q9:5 }`, target `{ Leak:100, Vis:100, Frag:100, Score:100, Band:5, CostingMost:"leakage", AI:null }`.

Tests 1, 3, 4, 5 keep their targets but must still run green.

## 3. `app/week/result/page.tsx` — convert to client render AND redesign

### 3a. Client render (this is the bug fix)

- Keep `page.tsx` as a server component that still exports the existing `metadata` (robots noindex) so the noindex is preserved. It renders `<Suspense fallback={...}><ResultClient /></Suspense>`.
- Create `app/week/result/result-client.tsx` with `"use client"` at the top. Move all the scoring and rendering logic there.
- In `result-client.tsx`, read the answers with `useSearchParams()` from `next/navigation`. Build a real `URLSearchParams` from it (`new URLSearchParams(searchParams.toString())`) and pass that to `parseWeekAnswers`, then `computeResult`. Keep the existing try/catch: on invalid or missing params, show the same "Cannot calculate score" state (this now only fires for a genuinely broken link, not for every visitor).
- The Suspense `fallback` is a minimal on-brand shell (sapphire background, the kicker label, a short "Working out your score" line) so there is no blank flash before the number paints. No spinner library, no new dependency.
- `parseWeekAnswers` and `score.ts` are pure functions and run fine in the browser. Do not add server-only APIs to either.
- This must build under the site's static export without error. `useSearchParams` is why the `<Suspense>` boundary is required; do not remove it.

### 3b. Redesign (same file, in the client component)

- Replace `LABELS` with strength names: `leakage: "Routine handled"`, `visibility: "Numbers on demand"`, `fragmentation: "Tools connected"`.
- Replace `BAND_LABELS` with: `1: "Run by you, not by systems"`, `2: "Tools in place, not yet joined up"`, `3: "Coming together, still hands-on"`, `4: "Mostly runs itself, some effort left"`, `5: "Runs without you. You likely do not need us."`.
- Delete the entire "Costing most / Strongest" block. Do not render `strongest` anywhere.
- Demote the overall number: show it as `NN /100` at a smaller size than now, with the cue "Higher is better. This is the average of the three areas below." The band label sits under it as a plain sentence, not a giant uppercase headline.
- Rebuild the three area rows as cards, ordered weakest-first: sort by exact score ascending, tie-break by precedence order leakage → visibility → fragmentation (the top card equals `result.costingMost`). Each card shows the new label, the score out of 100, a basis line, and an improvement line. Tag the top (weakest) card with a small "Start here" label.
- Basis and improvement text is fixed per area and per tier (tier by that area's own score: weak 0–33, partial 34–66, strong 67–100). Use the exact copy in section 4. Put it in a small lookup keyed by `[areaKey][tier]`. The text explains the deterministic score. It must never state or invent a number.
- Keep the AI Return block and its `<= 40` note. Keep the Form B CTA and the `NEXT_PUBLIC_FORM_B_URL` handling. Both still work client-side because `NEXT_PUBLIC_` vars are inlined at build.

## 4. Locked copy for the cards

Routine handled
- Weak (0–33) — Basis: "Most recurring work still runs by hand. Fires get put out often, and a lot of how-to lives in people's heads, not on paper." Improvement: "Pick the one task you repeat most each week and write the steps down. That is the first thing worth handing to a system."
- Partial (34–66) — Basis: "Some routine work is written down and repeatable. A few important tasks still need a person to remember and do them." Improvement: "Take the recurring task that eats the most time and make it run on its own."
- Strong (67–100) — Basis: "Recurring work is mostly documented and runs with little manual effort. Firefighting is rare." Improvement: "Hold the line. Add each new routine to the same setup before it becomes another manual habit."

Numbers on demand
- Weak (0–33) — Basis: "Seeing a basic number takes real effort. You wait for someone to pull it, and by then it is already old." Improvement: "Pick the one number you check most, revenue or cash, and get it somewhere you can see any day without asking."
- Partial (34–66) — Basis: "You can see some numbers quickly, but not all of them, and some are only current near month-end." Improvement: "Close the gap on the numbers that lag. Aim to see the key ones during the month, not after it."
- Strong (67–100) — Basis: "You can see the numbers that matter quickly, and they are current enough to act on." Improvement: "Keep it current. As you add numbers to track, hold the same speed so nothing slips back to month-end."

Tools connected
- Weak (0–33) — Basis: "The same detail gets typed into more than one place. Your tools do not pass information to each other, so people bridge the gap by hand." Improvement: "Find the detail you re-type most, customer or order info, and connect the two tools so it moves once."
- Partial (34–66) — Basis: "Some tools are connected, but a few handoffs are still manual and details do not always sit in one place." Improvement: "Take the one handoff people still do by hand and let the tools pass it across."
- Strong (67–100) — Basis: "Your tools pass information across without much re-typing, and key details sit in one place." Improvement: "Keep new tools to the same rule. Anything you add should read from the same source, not start a new island."

## 5. Guardrails

- Deterministic engine only. Every number comes from `computeResult`. Copy strings never contain a score.
- Banned words on all /week copy: operations (standalone noun), intelligence, operating system, transformation, unlock, empower, seamless, pilot, AI-powered, ecosystem, cutting-edge, leverage, delve, tapestry, moreover, pivotal. No em dashes. Simple Indian English, short sentences.
- No prices anywhere. Never use "Tech Stack X-Ray" or "Systems Check" in copy, URLs, or metadata.
- Do not change any form, any hidden field, `lib/parseWeekAnswers.ts` answer maps, or any other route. Do not change the host or deploy setup.

## 6. Verify (paste the results)

- Run `npm run build` and `npm run test`. All five test groups pass, including the 11 profiles.
- Run the site locally and open, in a browser:
  `/week/result?g1=No&q1=Almost%20nothing%20comes%20to%20mind.%20Recurring%20work%20is%20largely%20automated&q2=Almost%20never&q3=Important%20processes%20are%20documented%20and%20consistently%20followed&q4=Almost%20never&q5=Never&q6=Almost%20always&q7=I%20can%20see%20it%20immediately&q8=Revenue&q9=During%20the%20month,%20effectively%20real%20time`
  It must render a real numeric score (not "q1 missing"), with three strength cards and a "Start here" tag on the weakest.
- Open the 12-person firm params and confirm the overall reads 81, band "Mostly runs itself, some effort left", and that "you do not need us" does NOT appear.
- Paste the build output, the test output, and one rendered result screenshot before pushing.
