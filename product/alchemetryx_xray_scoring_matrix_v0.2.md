# Alchemetryx Tech Stack X-Ray
## Diagnostic Scoring Matrix v0.2

**Status:** Ready for build. Calibration required after first 40 real submissions.
**Supersedes:** v0.1
**Date:** 11 September 2026

---

## Changes from v0.1

| # | Change | Reason |
|---|---|---|
| 1 | AI Depth removed from the Systems Efficiency Score | Across all 48,828,125 possible answer combinations, AI Depth was the lowest-scoring category 27.6% of the time. On a realistic UK SME population it was named primary friction 54% of the time. Most owners would have been told their main constraint is AI adoption, which is diagnostically wrong and contradicts Alchemetryx positioning. |
| 2 | New gate question G1 added. AI questions now route rather than score | A business that bought AI and got nothing back scored up to 8 points lower than an identical business that never tried. That penalises the exact prospect Alchemetryx wants to find. |
| 3 | Q4 moved from Leakage to Fragmentation | Q4 measures manual handoffs between systems, which is fragmentation by definition. Leaving it in Leakage left Fragmentation with only two questions and nine possible values. |
| 4 | Weights rescaled to 40 / 33 / 27 | Three categories now carry the score. Original proportions preserved. |
| 5 | Four bands replaced with five, recalibrated | The old band 2 held 72.67% of all possible outcomes. Old band 4 held 0.03% and was unreachable for any business not using AI. |
| 6 | Q8 checkbox scoring rule written explicitly | v0.1 required the engine to judge whether KPIs were "relevant" and "used for decisions". A deterministic engine cannot do that. This was a build blocker. |
| 7 | Tie-break rule added for primary friction | Ties occur in 2.6% of combinations. Undefined behaviour in code becomes arbitrary. |
| 8 | Partial submission rule added | v0.1 did not say what happens to an abandoned form. |
| 9 | All synthetic profiles rescored | v0.1 profile 4 was arithmetically wrong (80.4 stated as 81). |

---

## 1. Scoring principle

The Tech Stack X-Ray is a **diagnostic**, not a predictive model.

It does not forecast business performance. It assesses current operating condition against a practical standard and identifies where operational friction is concentrated.

### 1.1 Score direction. Mandatory invariant.

**All category scores are health scores. Higher is better.**

- **0** means severe constraint
- **100** means no material constraint currently evident

A higher score must **never** mean more problems.

This applies to Leakage, Visibility, Fragmentation, the AI Return Score, and the overall Systems Efficiency Score.

The lowest category score is the **primary friction**.
The highest category score is the **strongest area**.

This must be encoded as an automated test in the scoring engine so it cannot be silently reversed later.

---

## 2. Structure

```
GATE QUESTION G1
        |
        +-- Systems Efficiency Score   (everyone, always)
        |        Leakage         40%   Q1 Q2 Q3
        |        Visibility      33%   Q7 Q8 Q9
        |        Fragmentation   27%   Q4 Q5 Q6
        |
        +-- G1 = Yes  -> AI Return Score      Q10 Q11, reported separately
        |
        +-- G1 = No   -> AI Opportunity Flag  narrative only, no number
```

The Systems Efficiency Score is calculated identically for every respondent. This is deliberate. Every submission must be directly comparable for calibration.

---

## 3. Category weights

| Category | Weight | What it measures |
|---|---:|---|
| **Leakage** | **40%** | Recurring manual work, rework, and dependence on undocumented process |
| **Visibility** | **33%** | Speed and reliability of information available at the point of decision |
| **Fragmentation** | **27%** | Manual handoffs, duplicate entry, and disconnected systems |

Total 100%.

---

## 4. Question allocation

| Q | Question | Category | Weight in category |
|---|---|---|---:|
| G1 | Have you bought or subscribed to any AI tool for the business in the last 18 months? | Gate | Not scored |
| Q1 | What is one task your team does repeatedly every week that you believe a system should be doing automatically? | Leakage | 10 |
| Q2 | How often does your team have to redo work because information was missing, entered incorrectly, or was not passed to the right person? | Leakage | 10 |
| Q3 | How much of the way important recurring work gets done is documented or built into a repeatable process? | Leakage | 8 |
| Q4 | When work or information moves between stages of the business, how often does someone have to manually pass it from one system, spreadsheet or person to another? | Fragmentation | 9 |
| Q5 | How often does the same customer or business information have to be entered more than once? | Fragmentation | 9 |
| Q6 | When something changes in one system, how often does that change automatically appear where it needs to? | Fragmentation | 9 |
| Q7 | If I asked you right now how the business is performing this month, how quickly could you get a reliable answer? | Visibility | 12 |
| Q8 | Which numbers do you regularly check to know whether the business is performing well? | Visibility | 8 |
| Q9 | When do you normally know whether this month's revenue and margins are where you expected them to be? | Visibility | 10 |
| Q10 | Where, if anywhere, is your team currently using AI in the day-to-day running of the business? | AI Return | 8 |
| Q11 | Can you point to a specific business process where AI has measurably saved time, reduced cost, increased revenue, or improved an outcome? | AI Return | 7 |
| Q12 | If you could permanently remove one operational headache from the business tomorrow, what would you choose? | Qualitative | Not scored |

Q10 and Q11 are shown only when G1 = Yes.

---

## 5. Answer scoring convention

Every scored multiple-choice response uses the same directional scale.

| Rating | Health score | Meaning |
|---:|---:|---|
| 1 | 0 | Severe constraint |
| 2 | 25 | Significant constraint |
| 3 | 50 | Mixed or moderate |
| 4 | 75 | Generally healthy |
| 5 | 100 | Little apparent constraint |

```
Health Score = (Rating - 1) x 25
```

Uniform conversion is intentional. It keeps the first calibration dataset directly comparable.

---

## 6. Gate question G1

> **Have you bought or subscribed to any AI tool for the business in the last 18 months?**
>
> - Yes
> - No
> - Not sure

**Routing:**

| Answer | Behaviour |
|---|---|
| Yes | Q10 and Q11 are shown. AI Return Score is calculated and reported separately. |
| No | Q10 and Q11 are skipped. AI Opportunity Flag is set to High. |
| Not sure | Treated as No. Flagged internally for follow-up, because "not sure" usually means somebody bought something the owner does not know about. That is itself a finding. |

G1 never affects the Systems Efficiency Score.

---

## 7. Question-by-question answer scoring

### Q1. Recurring manual work

> What is one task your team does repeatedly every week that you believe a system should be doing automatically?

| Answer | Rating | Health |
|---|---:|---:|
| Almost nothing comes to mind. Recurring work is largely automated | 5 | 100 |
| There are one or two small recurring tasks | 4 | 75 |
| Several recurring tasks still require manual work | 3 | 50 |
| Many important recurring tasks are still manual | 2 | 25 |
| Significant parts of the operation depend on recurring manual work | 1 | 0 |

Signal: avoidable operational effort. Category: Leakage.

### Q2. Rework

> How often does your team have to redo work because information was missing, entered incorrectly, or was not passed to the right person?

| Answer | Rating | Health |
|---|---:|---:|
| Almost never | 5 | 100 |
| Occasionally | 4 | 75 |
| Every few weeks | 3 | 50 |
| Several times a week | 2 | 25 |
| Almost every day | 1 | 0 |

Signal: preventable rework. Category: Leakage.

### Q3. Process repeatability

> How much of the way important recurring work gets done is documented or built into a repeatable process?

| Answer | Rating | Health |
|---|---:|---:|
| Important processes are documented and consistently followed | 5 | 100 |
| Most important processes are repeatable, with a few exceptions | 4 | 75 |
| Some processes are documented, others rely on individual knowledge | 3 | 50 |
| Most processes depend on people knowing what to do | 2 | 25 |
| Important work largely lives in people's heads | 1 | 0 |

Signal: process institutionalisation. Category: Leakage.

This measures repeatability without treating solo ownership as dysfunction.

### Q4. Manual handoffs

> When work or information moves between stages of the business, how often does someone have to manually pass it from one system, spreadsheet or person to another?

| Answer | Rating | Health |
|---|---:|---:|
| Almost never | 5 | 100 |
| Rarely | 4 | 75 |
| Sometimes | 3 | 50 |
| Often | 2 | 25 |
| Almost always | 1 | 0 |

Signal: human-mediated workflow transfer. Category: Fragmentation.

### Q5. Duplicate data entry

> How often does the same customer or business information have to be entered more than once?

| Answer | Rating | Health |
|---|---:|---:|
| Never | 5 | 100 |
| Rarely | 4 | 75 |
| Sometimes | 3 | 50 |
| Often | 2 | 25 |
| Very often | 1 | 0 |

Signal: duplicated information flow. Category: Fragmentation.

### Q6. System communication

> When something changes in one system, how often does that change automatically appear where it needs to?

| Answer | Rating | Health |
|---|---:|---:|
| Almost always | 5 | 100 |
| Usually | 4 | 75 |
| Sometimes | 3 | 50 |
| Rarely | 2 | 25 |
| Almost never | 1 | 0 |

Signal: integration quality. Category: Fragmentation.

### Q7. Decision latency

> If I asked you right now how the business is performing this month, how quickly could you get a reliable answer?

| Answer | Rating | Health |
|---|---:|---:|
| I can see it immediately | 5 | 100 |
| Within a few minutes | 4 | 75 |
| Within an hour | 3 | 50 |
| I would need someone to prepare it | 2 | 25 |
| I would need to wait until month-end | 1 | 0 |

Signal: decision latency. Category: Visibility.

Highest single weight in the model. It measures availability of information at the point of decision rather than whether the business owns reporting software.

### Q8. KPI coverage

> Which numbers do you regularly check to know whether the business is performing well?

**Interface:** checkboxes.

Options are grouped internally. The group labels are not shown to the respondent.

| Group | Options |
|---|---|
| **Financial** | Revenue, Gross margin, Cash position, Costs |
| **Operational** | Utilisation, Delivery capacity, Customer retention |
| **Forward-looking** | Pipeline, Conversion |
| **Ungrouped** | Other (free text) |

**Deterministic scoring rule:**

| Condition | Rating | Health |
|---|---:|---:|
| At least one box from all three groups, and at least four boxes total | 5 | 100 |
| Boxes from exactly two of the three groups | 4 | 75 |
| Boxes from one group only, three or more boxes total | 3 | 50 |
| One or two boxes total, any group | 2 | 25 |
| Nothing selected, or "Other" only | 1 | 0 |

"Other" free text never counts toward a group and never raises the rating on its own. It is captured for qualitative review.

Count alone does not determine the score. Coverage across groups does. A business tracking six financial numbers and nothing operational is less visible than one tracking revenue, utilisation and pipeline.

Category: Visibility.

### Q9. Financial visibility timing

> When do you normally know whether this month's revenue and margins are where you expected them to be?

| Answer | Rating | Health |
|---|---:|---:|
| During the month, effectively real time | 5 | 100 |
| Within a few days | 4 | 75 |
| Around the middle of the month | 3 | 50 |
| Near month-end | 2 | 25 |
| Mostly after month-end | 1 | 0 |

Signal: financial decision window. Category: Visibility.

### Q10. AI usage depth

*Shown only when G1 = Yes.*

> Where, if anywhere, is your team currently using AI in the day-to-day running of the business?

| Answer | Rating | Health |
|---|---:|---:|
| AI is embedded in important recurring workflows | 5 | 100 |
| AI is built into several recurring processes | 4 | 75 |
| Several people use AI for individual tasks | 3 | 50 |
| Individuals occasionally use ChatGPT or similar | 2 | 25 |
| We pay for it but nobody really uses it | 1 | 0 |

Category: AI Return. Does not affect the Systems Efficiency Score.

The lowest option is rewritten from v0.1. Since G1 has already confirmed they bought something, "we don't use AI" is not a valid answer here. The meaningful worst case is paid-for and unused.

### Q11. Measurable AI impact

*Shown only when G1 = Yes.*

> Can you point to a specific business process where AI has measurably saved time, reduced cost, increased revenue, or improved an outcome?

| Answer | Rating | Health |
|---|---:|---:|
| Yes, and we measure the business impact | 5 | 100 |
| Yes, we can estimate the impact with reasonable confidence | 4 | 75 |
| We believe AI helps, but have not measured it | 3 | 50 |
| We experiment with AI but have not embedded it meaningfully | 2 | 25 |
| No identifiable impact so far | 1 | 0 |

Category: AI Return. Does not affect the Systems Efficiency Score.

### Q12. Qualitative

> If you could permanently remove one operational headache from the business tomorrow, what would you choose?

Free text. Not scored in v0.2.

Used for diagnostic colour, sales intelligence, product research and model calibration. The narrative model may use it to make the diagnosis more specific. It must never alter any score.

---

## 8. Context questions. Not scored.

### C1. Industry

> What does your business mainly do?

Professional services / Agency or creative / Healthcare or care / Retail or e-commerce / Trades or construction / Manufacturing / Education or training / Other

Used to select pain framing in the written assessment, and to find industry patterns in the first 40 submissions.

### C2. Team size

> Roughly how many people are involved in running the business?

Just me / 2-5 / 6-10 / 11-25 / 26-50 / 50+

Contextualisation only.

### C3. Software count

> Roughly how many software tools does the team use regularly to run the business?

1-3 / 4-6 / 7-10 / 11-15 / 16+

Contextualisation only. Tool count must never imply poor systems. A business can run many well-integrated tools.

---

## 9. Calculation

### Category scores

```
Leakage       = (Q1 x 10 + Q2 x 10 + Q3 x 8) / 28

Visibility    = (Q7 x 12 + Q8 x 8  + Q9 x 10) / 30

Fragmentation = (Q4 x 9  + Q5 x 9  + Q6 x 9)  / 27
```

### Systems Efficiency Score

```
Score = (Leakage x 0.40) + (Visibility x 0.33) + (Fragmentation x 0.27)
```

Round to the nearest whole number for display. Retain the unrounded value internally.

### AI Return Score, when G1 = Yes

```
AI Return = (Q10 x 8 + Q11 x 7) / 15
```

Reported separately. Never enters the Systems Efficiency Score.

---

## 10. Maturity bands, v0.2

Boundaries derived from the distribution of a simulated realistic SME population. Provisional.

| Score | Band | Label | Expected share |
|---:|---:|---|---:|
| 0 to 33 | 1 | Running on people, not systems | ~20% |
| 34 to 40 | 2 | Systems exist, they do not connect | ~26% |
| 41 to 48 | 3 | Connected, not yet instrumented | ~27% |
| 49 to 56 | 4 | Instrumented, not yet optimised | ~19% |
| 57 to 100 | 5 | Systems-led. You probably do not need us | ~8% |

**Known limitation:** band 5 spans 43 points. A business at 58 and one at 95 receive the same label. Acceptable for v0.2 given how few respondents will land there. Split it at calibration if the real distribution justifies it.

Band 5 wording is deliberate. Telling a well-run business it does not need help is the most credible thing the tool can do, and it costs nothing because that business was never a buyer.

---

## 11. Interpretation rules

**Primary friction:** the category with the lowest health score.

**Strongest area:** the category with the highest health score.

**Tie-break, mandatory:** where two or more categories share the lowest score, name the one with the higher weight. Order of precedence:

```
1. Leakage        (40%)
2. Visibility     (33%)
3. Fragmentation  (27%)
```

The same precedence applies in reverse for strongest area.

**AI block:**

| G1 | Output |
|---|---|
| Yes | AI Return Score, 0 to 100, with narrative |
| No or Not sure | AI Opportunity Flag set to High, narrative only, no number |

---

## 12. Commercial routing

Internal. Not shown to the respondent.

| G1 | AI Return | Situation | Route |
|---|---|---|---|
| No | n/a | Never started with AI | Fix the process first. Automation later. |
| Yes | 0 to 40 | Bought it, it failed | **Strongest prospect.** Direct fit for the core offer. |
| Yes | 41 to 70 | Some use, no measurement | Instrumentation conversation. |
| Yes | 71+ | Working and measured | Genuinely mature. Qualify carefully. |

---

## 13. Output structure

```
SYSTEMS EFFICIENCY SCORE
43

CONNECTED, NOT YET INSTRUMENTED

  Leakage           50
  Visibility        50
  Fragmentation     25

PRIMARY FRICTION      Fragmentation
STRONGEST AREA        Leakage

AI RETURN SCORE       25
  You have invested in AI but it is not embedded in any
  recurring workflow, and there is no measurable return yet.

DIAGNOSIS
[Narrative generated strictly from the structured result above]
```

---

## 14. AI responsibility

The scoring engine is deterministic.

```
Answers
  -> validated response values
  -> health scores
  -> category scores
  -> weighted overall score
  -> band
```

The language model receives the **structured result** and produces only:

- the diagnosis narrative
- the explanation of the primary friction
- contextual interpretation using industry, team size and Q12

The language model must **never** produce or alter:

- any raw score
- any category score
- any weight
- the maturity band
- the primary friction or strongest area

If the model output disagrees with the deterministic result, the deterministic result wins and the discrepancy is logged.

---

## 15. Validity rules

**Partial submissions are not scored.** All nine core questions (Q1 to Q9) must be answered. Q12 and all context questions may be blank. Where G1 = Yes, Q10 and Q11 must both be answered.

**An incomplete submission is stored but never scored or displayed.** It is retained for drop-off analysis, which matters: the question where people abandon is itself data about question quality.

**Every response value must validate to 1, 2, 3, 4 or 5** before conversion. Anything outside that range rejects the submission rather than defaulting.

---

## 16. Worked profiles

Ten synthetic profiles scored under v0.2. Five original, five deliberate boundary cases.

| Profile | Leak | Vis | Frag | Score | Band | Primary friction | AI Return |
|---|---:|---:|---:|---:|---:|---|---:|
| Solo consultant, spreadsheets and email | 43 | 35 | 17 | **33** | 1 | Fragmentation | n/a |
| 6-person agency, Xero plus CRM, disconnected | 50 | 50 | 25 | **43** | 3 | Fragmentation | 25 |
| 20-person care provider, rota in Excel | 16 | 25 | 8 | **17** | 1 | Fragmentation | n/a |
| 12-person firm, connected tools and dashboard | 75 | 93 | 75 | **81** | 5 | Leakage | 75 |
| 30-person business, many tools, no integration | 32 | 57 | 17 | **36** | 2 | Fragmentation | 27 |
| Boundary: great visibility, terrible leakage | 0 | 100 | 50 | **47** | 3 | Leakage | n/a |
| Boundary: great integration, no visibility | 68 | 0 | 100 | **54** | 4 | Visibility | 38 |
| Boundary: highly systemised solo consultancy | 91 | 85 | 75 | **85** | 5 | Fragmentation | n/a |
| Boundary: bought AI and it failed | 25 | 42 | 25 | **31** | 1 | Leakage | 13 |
| Boundary: 16+ tools, all well integrated | 75 | 75 | 100 | **82** | 5 | Leakage | 63 |

### What these confirm

**Solo ownership is no longer penalised.** The systemised solo consultancy scores 85 and lands in band 5. The spreadsheet-based solo consultant scores 33. The difference comes from how the business runs, not from how many people run it.

**Tool count does not drive the score.** The 16-tool integrated business scores 82. The 30-tool-ish fragmented business scores 36. Same answer to C3 territory, opposite diagnosis.

**Failed AI purchase is now visible without distorting the score.** That profile scores 31 on operations, which is honest, and shows an AI Return of 13, which is the sales signal. Under v0.1 the same business would have been buried in a single low number with no separate flag.

**Boundary ordering behaves.** Great visibility with zero leakage health scores 47. Great integration with zero visibility scores 54. Neither collapses to an extreme, and each names the correct primary friction.

**One thing to watch.** The care provider profile scores 17, which is severe. That profile is deliberately harsh, but if real care-sector submissions cluster this low, either the sector genuinely sits there or the questions read harder in that context. Check at calibration.

---

## 17. Calibration protocol

Model status: **v0.2, calibration required.**

1. Run all ten synthetic profiles through the built engine. Results must match section 16 exactly. This is the acceptance test.
2. Run the diagnostic on Nimish, Pravin, Prerna and three or four known businesses.
3. For each, compare the score against what is already known about that business. A mismatch means the weights are wrong, not the business.
4. Watch where people hesitate while answering. Hesitation means the question is unclear.
5. Collect the first 40 real submissions.
6. Check the distribution against the expected band shares in section 10.
7. Check for questions where 90% of respondents give the same answer. Those carry no information and should be cut or rewritten.
8. Check for questions that correlate almost perfectly with another. Those are double-counting.
9. Review weights. Review band boundaries. Re-run synthetic profiles. Version the model.

---

## 18. Open items for v0.3

- Q12 is unscored. After 40 submissions, check whether common themes can be classified and fed into the model.
- Band 5 spans 43 points. Consider splitting.
- Industry is captured but unused in scoring. Industry-adjusted benchmarks are the natural next step once there is sector volume.
- Progressive or adaptive questioning was deferred from v0.1. Revisit only after the weights are stable, because branching breaks comparability across the calibration set.
- Instant delivery versus 48-hour written assessment is a product decision, not a scoring one. Out of scope for this document.
