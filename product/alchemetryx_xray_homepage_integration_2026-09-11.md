# Alchemetryx.com — Integrating "Check Your Score" into the Home Page

**Version 1.0 | 11 September 2026**
Reviews: `04_ia_content_map`, `05_prd`, `01_technical_foundation`, `02_design_system_spec`, `alchemetryx_xray_scoring_matrix_v0.2`
Status: For decision, then build

---

## 1. Situation assessment

The home page is fully specified and copy-locked across eight sections. The X-Ray scoring model is at v0.2 and marked ready for build. Neither document mentions the other. The route map has eight routes and no `/xray`, yet the festival plan already assumes a QR code pointing at an X-Ray landing page in October.

So this is not a design question yet. There is a product that exists on paper, a website that exists on paper, and no decision about how they relate.

## 2. The core problem

Three things are competing for the same slot on the same page.

| Thing | What it asks of the reader | Current status |
|---|---|---|
| "Book a 30-minute call" | 30 minutes and an admission they need help | Locked as the single CTA on every route (FR-10) |
| The Diagnostic, `/diagnostic` | £1K to £5K and two weeks | Locked service, no price on site |
| The X-Ray / "check your score" | Four minutes and an email address | Not on the site at all |

The PRD says the website's job is to fix a **trust** problem, not a traffic problem. A scoring tool does not fix trust on its own. A stranger is being asked to disclose where their business is weak, to a firm with zero published case studies and no company number on the live site. That reads as lead capture, and owner-led buyers recognise lead capture instantly.

But the score does fix a different and real problem the home page has: **the only action on the page is a 30-minute call.** There is no step between "interested" and "book a meeting". Every reader who is curious but not ready leaves with nothing, and you learn nothing about them. That gap is where the score belongs, and it is the only honest reason to add it.

**Sequencing conclusion.** Build the standalone route first, for the festival. Integrate into the home page only once at least one case study is published. A free diagnostic on a page with no proof converts worse than no diagnostic at all.

---

## 3. Review of the existing home page and user journey

### Current structure

| # | Section | Tone | Function | Status |
|---|---|---|---|---|
| 1 | Hero | Sapphire | The claim: "One process. Running without you. In 90 days." | Copy ready |
| 2 | Level router | Pearl | Self-identification: "Have you bought AI yet?" | Copy ready |
| 3 | The ladder | Pearl | Three engagements, no prices | Copy ready |
| 4 | Gold statement | Gold | "Your tools are not a system." | Copy ready |
| 5 | Proof | Pearl | Three case study cards | **Blocked** |
| 6 | Deadline block | Pearl | Nearest mandate | Data ready |
| 7 | Who we are | Sapphire | Three faces, company number | **Blocked** |
| 8 | Final CTA | Sapphire | Repeat the call | Copy ready |

### What the review finds

**The narrative is claim → fork → menu → statement → proof.** The hero makes a strong outcome claim. Section 2 makes the reader self-identify. Then section 3 immediately presents three things to buy. There is no diagnosis between the reader recognising themselves and being handed a menu. A reader who accepts the hero's claim still has no idea which of the three engagements applies to them, and the page never tells them. It asks them to work it out on a call.

**Two of eight sections are blocked and both carry the trust load.** Proof and faces are exactly what a cold visitor came to check. The page as specified cannot ship complete. A working diagnostic is not client proof, but it is competence proof, in the same category as the Fitosys own-build: evidence the firm can actually build a thing.

**The level router already asks X-Ray gate question G1.** The router asks "Have you bought AI yet?". G1 asks "Have you bought or subscribed to any AI tool in the last 18 months?". Same question, same routing intent, two places. This is either duplication or the cleanest on-ramp available. Treat it as the on-ramp.

**The gold statement is already the score's thesis.** "Your tools are not a system" is, in one sentence, exactly what the Systems Efficiency Score measures. Right now it is an assertion. With the score on the page it becomes a measurable assertion. This is the strongest argument for integration and it needs no copy change.

---

## 4. Placement recommendation

Not a standalone hero. Not an embedded form. Four touch points, in descending order of value.

### 4.1 The dedicated route, `/xray` — P0

This is the real build. The home page treatments are pointers at it. It must exist by early October because the QR code needs a destination. It does not need the rebuilt home page to ship first.

Route map becomes nine routes. Add metadata, sitemap entry, and the AEO crawler allowances already specified in the SEO doc.

### 4.2 The level router becomes the on-ramp — P1

The reader clicks a panel. The panel's swapped content already speaks to their situation. Add one line at the end of the swapped content that links to `/xray?g1=yes` or `/xray?g1=no`, with G1 pre-answered and shown as answered.

Why this is the best integration on the page:

- It costs no new JavaScript. The panel swap already exists, the link is an anchor, the prefill is a query parameter.
- The reader has already answered question one without being asked to fill anything in. Arriving at a form with one of nine already done is a materially different experience from arriving at an empty form.
- It respects the IA rule that selecting a panel must not navigate. The panel still swaps; the link is a choice inside it.

### 4.3 A new section after the ladder — P1

One full-bleed section between section 3 (ladder) and section 4 (gold statement). This is the drop-off point: the reader has just seen three engagements with no prices and their only option is a call. The score is the exit for everyone not ready to book.

**Tone: Sapphire, not Pearl.** Sections 2 and 3 are both Pearl. A third consecutive Pearl section reads as one long light stretch and kills the section rhythm. Sapphire also earns two things: gold on Sapphire is 7.13:1, so a sample score number can be rendered in Alchemical Gold, which is the only context where a large gold number is legible; and a dark section immediately before the gold statement is the strongest transition the colour system has.

Note the rule this does not break. The design system forbids two full-bleed **gold sections** on one page. Gold as an accent on Sapphire is permitted use 1 and appears elsewhere on the page already.

### 4.4 Final CTA gets a secondary line — P2

Sapphire section 9. Primary stays the gold "Book a 30-minute call". Add a single `outline-dark` secondary: "Not ready? Get your score first." Last-chance capture, 30 minutes of work.

### 4.5 Hero — P1, but as a text link only

A secondary text link under the primary CTA. Not a button. Pearl text, Pearl-line underline on hover, gated behind `@media (hover: hover) and (pointer: fine)`.

Two primary buttons in a hero is no primary button. The hero's job is the claim and one action.

### 4.6 What not to do

| Rejected | Why |
|---|---|
| Score as the hero | Turns a consultancy into a quiz site. The hero's claim is the firm's whole positioning and it is good. |
| Form embedded on the home page | 15 fields including a checkbox group and free text. Home page JS budget is 120KB with 39KB already spent on animation. An embedded interactive form breaks the budget and the server-component discipline in section 4 of the technical foundation. |
| Score replacing the blocked Proof section | Weakens proof further. The score is competence evidence, not client evidence. Keep them separate. |
| Score as a second primary CTA site-wide | FR-10 exists for a reason. One conversion event per page. |

---

## 5. Does the narrative need to shift?

**No wholesale shift. A sequencing shift, and one copy discipline.**

The hero is already outcome-focused: "One process. Running without you. In 90 days." Do not touch it. What is product-focused is the **middle** of the page. Section 3 is a menu of three services. The fix is not to rewrite it, it is to put a diagnosis in front of it.

Narrative order now: claim → fork → menu → statement → proof
Narrative order after: claim → fork → menu → **measurement** → statement → proof

Or, argued the other way, the page currently sells three answers to a question it never asks. The score asks the question.

### The copy discipline that matters

**Never lead with the number.** "Your score is 43" is not an outcome, it is a mechanism. The outcome is "rework is what is costing you most". The scoring matrix already produces the better thing: primary friction, named, from three categories. So on the home page and in the form's own copy, lead with the named friction and let the number follow.

Wrong: "Get your Systems Efficiency Score."
Right: "Find out which of three things is costing you most."

The number belongs on the result screen, where it is a summary of something the reader has already understood. On the marketing page it is a claim they have no reason to care about yet.

---

## 6. Supporting sections required

| Section | Where | Why it is needed | Priority |
|---|---|---|---|
| **Sample output** | `/xray` | The single most important trust asset. A reader deciding whether to spend four minutes wants to see what they get. An anonymised real result, not a mockup. | P0 |
| **How it works, three steps** | `/xray` | Nine questions, four minutes, assessment inside two working days. Set expectation before the form, not after. | P0 |
| **Data handling line** | At the form | You are asking a UK business owner to disclose weaknesses. One plain sentence: what is stored, who sees it, that it is never sold or shared. Absence of this line is a bigger conversion problem than any headline. | P0 |
| **What is measured, and what is not** | `/xray/method` | Three categories named plainly. Then the honest part: AI is asked about but not scored, and tool count never counts against you. Both are differentiators and both are true. | P2 |
| **The band-5 line, made public** | Score module and `/xray` | "Systems-led. You probably do not need us." This is the most credible sentence in the whole matrix. Surface it on the marketing page, not just in the result. | P1 |
| **Company number 17199377** | Footer, already outstanding | A form asking for business data on a site with no company number is a red flag. This is a two-minute fix that has been open for weeks. | P0 |
| **The nine questions, published** | `/xray/method` | Giving away the questions costs nothing and is the strongest possible trust signal. Anyone can copy nine questions; nobody can copy the weights, the bands, or the assessment. | P2 |
| **Benchmarks and distribution** | Score module | "The average owner-led business we have scored sits at 41." This is the best content asset the firm will ever own. It does not exist yet. | **P3, blocked** |

### On social proof tied to scoring

There is none, and there must not be any invented. The v0.2 bands are derived from a **simulated** population. Section 10 of the matrix says so and labels them provisional. Publishing "most UK SMEs score 41" before 40 real submissions is exactly the kind of unsourced number the positioning brief's correction log exists to prevent, on a site whose entire thesis is replacing claims with proof.

Unlocks after calibration, realistically mid-November. Then it becomes the lead line of the module.

---

## 7. Product dependencies that must be settled before any build

Five decisions. Four of them block code.

### D1. Instant score, or 48 hours? — blocks CTA copy and architecture

The memory of this project says 48-hour written assessment, with instant reporting as a later paid capability. Matrix section 18 marks this explicitly out of scope. It cannot stay out of scope, because every piece of copy depends on it, and so does the architecture.

**Recommendation: split it.** The scoring engine is deterministic, so the number, the three category scores and the primary friction can be returned on screen in under a second. The narrative assessment is what takes 48 hours. So: instant number, instant named friction, written assessment by email inside two working days.

This is better than either extreme. An instant number gives the reader the payoff that justified the four minutes. The 48-hour narrative gives a reason for a follow-up email, which is the actual sales motion.

### D2. Free permanently, or paid after the festival? — blocks a whole build and the home page copy

Current plan: free for festival attendees, paid for everyone after.

**Recommendation: permanently free, and drop the paid tier.** Reasons, in order:

1. If the home page says free in October, charging in November is a visible bait-and-switch on a site selling honesty.
2. A paid score collides with `/diagnostic`. A buyer cannot tell a £49 score from a £1K to £5K Diagnostic, and confusion at the top of the funnel costs more than the £49.
3. You need 40 real submissions to calibrate. A price tag is the most effective way to not get them.
4. The money is the Blueprint at £12K to £25K and the Retainer. Monetising the lead magnet is a rounding error that costs volume at exactly the wrong moment.
5. Killing the paid tier deletes the access-gate build: no codes, no payment, no entitlement logic.

### D3. The name — blocks copy, route, and metadata

Three names are live for one thing: "Tech Stack X-Ray", "Systems Efficiency Score", "check your score".

There is a substantive problem beyond the duplication. "Tech Stack X-Ray" says the thing examines your software stack. The matrix explicitly says the opposite: context question C3 captures tool count and section 8 states "tool count must never imply poor systems", and the worked profiles prove it, with a 16-tool business scoring 82 and a fragmented one scoring 36. The name misdescribes the product, and it fights the positioning line "Your tools are not a system", which argues the stack is not the thing that matters.

**Recommendation:** retire "Tech Stack X-Ray". Keep **Systems Efficiency Score** as the name of the output. Name the thing the reader does in plain language, as the brand's own language rules demand: "the nine questions", "check your score". Route `/xray` can stay as a short URL if the QR print deadline forces it, but nothing on the page should say X-Ray.

### D4. Where does the data live? — hard technical blocker

The locked stack has **no backend.** Next.js on Hostinger deployed from Git, no database, no API route, no email sender anywhere in the technical foundation. Meanwhile the matrix requires: conditional routing on G1, deterministic scoring, storage of partial submissions for drop-off analysis, and delivery of a written assessment.

**Recommendation: Fillout for v1.** It is already in the stack, already paid for, already handles the booking flow. It does conditional logic natively, which covers the G1 routing to Q10 and Q11. It stores partials, which section 15 of the matrix requires. It adds zero KB to the home page budget because the form lives on its own route. Scoring runs either in Fillout calculated fields or in one Make step, and the assessment goes out by email from there.

What this preserves: the 120KB budget, the server-component discipline, and the PRD's goal that the site cost nothing to maintain past launch.

What it costs: less control over the result screen. Accept it for v1. Revisit when there are 200 submissions, not 40.

The alternative, a Next.js route handler plus Supabase or Neon, is the better long-term answer and adds an auth surface, a database to keep alive, and a week of work you do not have before October.

### D5. Does the score replace or feed `/diagnostic`? — blocks nothing, but clarify it in copy

**It feeds it, and the existing copy already supports this.** The IA gives `/diagnostic` the outcome line "Know which process is costing you most, and what fixing it is worth." Split that sentence and the two products separate cleanly:

- The score tells you **which of three areas** is costing you most. Free, four minutes, no human.
- The Diagnostic tells you **what fixing it is worth in hours and money**, in your specific business. Paid, two weeks, human.

Say that on both pages in one line each. No new positioning required.

### Two engineering gates, not decisions

- Matrix section 1.1 requires an automated test that higher always means better. It must exist before the first public submission. One test file.
- Matrix section 17 step 1 requires all ten synthetic profiles to reproduce section 16 exactly. That is the launch acceptance test for the engine. Gate the route on it.

---

## 8. The score module: copy and design treatment

### Copy

Banned-language checked against the IA list. No "operations" as a standalone noun, no "intelligence", "transformation", "unlock", "seamless", "pilot", "AI-powered", "ecosystem", "leverage".

**Section heading**

> Which of three things is costing you most?

**Body, max 520px wide**

> Rework. Slow answers. Manual handoffs.
>
> Most owner-led businesses lose the largest part of their week to one of these three, and almost none can say which one. Nine questions, four minutes, no login. You get your score on screen and a written assessment inside two working days.

**The honesty line, set as a quiet aside in Slate**

> If the answer is that your business already runs well, we will say so. The top band reads: systems-led, you probably do not need us.

**Secondary action, `outline-dark`**

> Answer the nine questions

**Hero secondary text link**

> Or find out where the week is going. Nine questions, four minutes.

**Final CTA secondary**

> Not ready to talk? Get your score first.

### Design treatment

| Element | Treatment | Source rule |
|---|---|---|
| Section tone | Sapphire `#1A2642`, full-bleed, no max-width | Breaks the three-consecutive-Pearl run; sets up the gold statement |
| Heading | `--text-heading-lg`, Urbanist 300, tracking -0.04em, Pearl | Type scale |
| Sample score number | `--text-display-xl`, Urbanist 300, Alchemical Gold on Sapphire, 7.13:1 | Gold permitted use 1. Never on Pearl, 1.95:1 is banned |
| Body | `--text-body`, 400, Pearl, max-width 520px | 65-character rule |
| Honesty aside | `--text-body-sm`, `--color-slate`, 5.92:1 | Passes AA on Sapphire |
| Band ladder graphic | Five 1px rules in `--color-sapphire-line`, labels in `--text-caption`, the fifth label in Gold | No new hue, no shadow, no gradient |
| Divider above section | 1px Gold hairline, full-bleed | Gold permitted use 3, hairline carrying no information |
| Secondary action | `outline-dark`: transparent, 1px `--color-sapphire-line`, Pearl text, 6px radius | Button variant table |
| Section gap | 120px desktop, 72px under 768px | Layout rules |
| Rendering | Server component. Zero JavaScript. The only interactive element is a link. | Technical foundation section 4, budget in section 6 |

### Motion

| Element | Decision | Reasoning |
|---|---|---|
| Section entry | Existing `Reveal` wrapper, opacity and 32px rise, 800ms `power2.out` | Already in the system, no new code |
| Sample number count-up on the home page | **No.** | It is static marketing content, not a result. Animating it makes the reader wait to read a number that was never theirs. |
| Number count-up on the **result** screen | Yes, once per user. 600ms, `cubic-bezier(0.23, 1, 0.32, 1)`, and only above the reduced-motion guard | Rare, first-time, earned. This is the one moment on the whole product where delight is paid for. |
| Form progress | Text only, "3 of 9". No animated bar. | An animated bar reads as a survey. Owner-led buyers abandon surveys. |
| Submit button | `transform: scale(0.97)` on `:active`, `transition: transform 160ms ease-out` | Press feedback on the highest-stakes click in the product |
| Band ladder reveal | Stagger 50ms between the five rules, `ease-out` | Short stagger, decorative, never blocks interaction |
| `prefers-reduced-motion` | Lenis never initialises, every animation resolves to end state, count-up is skipped and the number renders immediately | Non-negotiable, technical foundation section 5 |

---

## 9. Priority and effort

| # | Change | Priority | Effort | Blocked by |
|---|---|---|---|---|
| 1 | Settle D1 to D4 | **P0** | 1 hour, one conversation | Nothing |
| 2 | Company number on the current live site, footer | **P0** | 10 minutes | Nothing. Already overdue |
| 3 | `/xray` route: page, nine questions, G1 routing, scoring, email | **P0** | 4 to 6 days | D1, D2, D4 |
| 4 | Sample output asset, anonymised and real | **P0** | 1 day | One real submission |
| 5 | Invariant test and ten-profile acceptance test | **P0** | 0.5 day | Nothing |
| 6 | Publish Care Rota case study | **P0** | Already the first item in the build sequence | Nothing |
| 7 | Score module section on home, Sapphire | P1 | 1 day | #3 live, #6 published |
| 8 | Level router G1 carry-through and prefill | P1 | 0.5 day | #3 |
| 9 | Hero secondary text link | P1 | 1 hour | #3 |
| 10 | Band-5 honesty line on the module and `/xray` | P1 | Included in #7 | D3 |
| 11 | `/xray/method` page, nine questions published | P2 | 1.5 days | D3 |
| 12 | Final CTA secondary line | P2 | 30 minutes | #3 |
| 13 | Result-screen count-up | P3 | 2 hours | #3 |
| 14 | Benchmark and distribution copy | P3 | 0.5 day | 40 real submissions, ~mid-November |
| 15 | DKIM verification and inbox-delivery test | P0 | 0.5 day | Nothing. (Launch gate for emailed assessments: both must pass, or remove email promise from v1 scope) |

**Critical path to the festival:** items 1, 2, 3, 4, 5 (and 15, if emailed assessments remain in v1). Everything else can follow. Total roughly 6 to 8 working days of build, which fits the October window only if the four decisions are made this week.

**Spec amendments this requires.** Both should be written into the PRD rather than left as undocumented drift.

- **FR-10** currently reads that every route's single CTA is "Book a 30-minute call" with no variation. Amend to: one **primary** CTA per route, always "Book a 30-minute call", always the gold variant. The score is a secondary action, always outline, never gold.
- **FR-11**, the banned-language grep in CI, must cover the `/xray` copy and the form's question text. The nine questions were written for a scoring document, not for the site's language rules, and should be checked before they go live.

---

## 10. Content angles this unlocks

Mapped to the idea bank. The X-Ray gives four genuinely strong angles and one that must wait.

| Angle | Category | Why it works |
|---|---|---|
| "We removed AI from our own AI diagnostic. Here is what the numbers showed." | #5 Behind the scenes | The v0.1 to v0.2 change is a real decision with real arithmetic behind it, and it is exactly on-positioning. Strongest of the five. |
| "More software does not mean worse systems. We tested it." | #11 Common myths | A 16-tool business scored 82. A fragmented one scored 36. Concrete, contrarian, defensible. **Must clearly label figures as synthetic model outputs; retain this label until the 40-real-submission calibration gate is met to substantiate them.** |
| "Most owners think their problem is AI. In our model it was named the main problem 54% of the time, and it was the wrong answer 54% of the time." | #3 Unpopular opinions | Sharp hook, invites pushback, and lands the core positioning without pitching. **Must clearly label figures as synthetic model outputs; retain this label until the 40-real-submission calibration gate is met to substantiate them.** |
| "Here are the nine questions. Take them or use them yourself." | #29 My exact process | Giving the questions away is the trust play. Nobody can copy the weights or the bands. |
| Before and after, with real scores | #10 Before vs after | **Hold until calibration.** No real distribution exists yet. |

---

## 11. One hard truth

The score is the easy work, and it is the work that is getting done. The blocked items are the hard work, and they are the ones that actually decide whether anyone books a call.

Care Rota is cleared for publication and has not been published. The company number is a ten-minute fix that has been open since the positioning review. DKIM is still unset, which means every email driving traffic to any of this may still be landing in junk. The build sequence in the IA document says step one is genuinely first, and step one is not the tool.

A free diagnostic pointed at by a QR code, on a site with no published proof and no company number, from a sender whose email lands in spam, will produce a small pile of scored submissions and no booked calls. The tool is worth building. It is not worth building first.

---

**Confidence: High** on the review, the placement, the design treatment and the dependency list, because all four are read directly off documents that are already locked and internally consistent, and the collisions named here are textual, not inferred. **Medium** on the conversion argument in section 2 and on the effort estimates, because no analytics baseline exists for this site and no submission volume exists for the tool, so both rest on reasoning rather than measurement.
