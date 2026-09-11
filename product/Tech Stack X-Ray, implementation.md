Tech Stack X-Ray, Phased Implementation Plan
Tech Stack X-Ray, v0.2 to festival and beyond
---

## What six weeks changes

Three weeks was tight. Six weeks is enough to do something genuinely better: **go to the festival with a calibrated model instead of an untested one.**

Build in September. Run it live on real businesses in early October. Fix what breaks. Arrive on 24 October with v0.3, already proven on twenty real submissions, instead of v0.2 which has only ever been tested on synthetic profiles and seven people you know.

That is a materially better product on the day, and it costs you nothing except using the time properly.

---

## The risk I would bet on

Six weeks is exactly enough time for this to become the nine-sprint product again.

The pattern is documented and it has shown up twice in this conversation already. Three weeks forced discipline. Six weeks removes the forcing function. Around 5 October you will look at the page and think "we could add the Razorpay flow" or "the narrative would be better with a live model," and the whole thing slides.

**The build window stays 15 to 19 September. It does not expand into the extra time.** The extra time goes to live testing, not to more features. If you find yourself building in October, something has gone wrong.

---

## Two days, not one

This doubles your capacity and doubles your fulfilment problem.

| | One day | Two days |
|---|---|---|
| Realistic submissions | 40 to 60 | **80 to 120** |
| Assessment time at 15 min each | 10 to 15 hrs | **20 to 30 hrs** |

Twenty-five hours of writing in the week after the festival is not something you will do alone on top of client work. Phase 10 has to be planned with Nimish and Pravin, or the promise breaks.

**And the night between day one and day two is an asset.** You will learn more on 24 October than in all the testing before it. You can fix a confusing question, change what the three of you say at the stall, and adjust the printed material overnight.

One hard rule: **you may change wording and delivery overnight. You may not change the scoring.** If day one and day two use different weights, the two sets of submissions are not comparable and your calibration data is ruined.

---

# Revised Plan
## Eleven phases, 11 September to mid November

---

### Phase 0. Decisions and freeze
**11 to 12 Sept. Half a day.**

Same five decisions as before: stack, where submissions land, templated narrative, capture point, submission cap.

The cap changes. Plan for **120 across two days**, not 60.

**Gate:** five decisions in writing. Model v0.2 frozen.

---

### Phase 1. Paper calibration
**12 to 13 Sept. One day.**

Google Sheet reproducing the model. All ten synthetic profiles from section 16 matching exactly. The sheet becomes the acceptance test for the build.

**Gate:** ten profiles match.

---

### Phase 2. Build the page
**15 to 19 Sept. Four days. This window does not move.**

Form, scoring, result screen, email capture, confirmation. Nothing else. No Ollama, no payment, no accounts, no branching.

**Gate:** ten synthetic profiles entered through the live form produce the exact scores in section 16.

**Hard stop:** if this hits 22 September, ship what works.

---

### Phase 3. Stakeholder test
**22 to 24 Sept. Two days.**

Nimish, Pravin, Prerna, Martine, plus three or four businesses you know. Sit with at least three while they answer.

Testing two things: does the score match what you already know, and where do people hesitate.

**Gate:** fix any question where two or more people hesitated. Do not touch weights on a sample of seven.

---

### Phase 4. Assessment template library
**24 to 30 Sept. Four days.**

Ten assessment skeletons, one per realistic band-and-friction combination. Ten short on-screen paragraphs for the instant result.

**Gate:** you can produce a finished assessment from a submission in under fifteen minutes. Time yourself on three. At 120 submissions, every minute over fifteen costs you two hours.

---

### Phase 5. Live pilot
**1 to 14 Oct. Two weeks. This phase is new and it is the reason six weeks beats three.**

Get the tool in front of **twenty to thirty real businesses** before the festival.

Where they come from:

- Your cold outreach, already running. The X-Ray link becomes your second-message asset after someone replies
- LinkedIn. Post the tool. Your own network is the right ICP
- Martine's network, warm introductions ahead of the event
- Anyone Nimish or Pravin can put it in front of

**Target: 20 completed submissions minimum.** Twenty-five is comfortable.

And fulfil every one of them properly. These are real prospects, and the practice run on writing assessments is exactly what Phase 10 needs.

**Gate:** 20 real submissions collected and 20 assessments delivered.

---

### Phase 6. Calibration to v0.3
**15 to 17 Oct. Two days.**

Run the full calibration protocol on the pilot data.

1. Distribution check against expected band shares
2. Dead questions. Anything where 90% gave the same answer
3. Correlated questions that double-count
4. Expert check on the businesses you know
5. Q12 themes
6. Revise weights and bands, re-run the ten profiles, version to **v0.3**

**Gate:** v0.3 locked. No scoring changes after 17 October under any circumstances.

This is the phase that makes six weeks worth having. You walk into the festival with a model corrected by evidence instead of one corrected by argument.

---

### Phase 7. Event assets
**13 to 17 Oct. Runs alongside Phases 5 and 6. Two days of work.**

Carousel, internal cheat sheet, QR to `alchemetryx.com/xray?src=festival`, printed QR cards as backup, and a shared one-line answer to "what is this?"

Two days means printed material matters more. People walk past on day one and come back on day two.

**Gate:** all three of you explain the tool identically without reading.

---

### Phase 8. Dry run and freeze
**20 to 22 Oct. One day.**

Full run on a phone on mobile data. Three simultaneous submissions. Confirm emails arrive. QR from two metres in bright light. Result screen on a small phone.

**Freeze on 22 October.** Nothing changes after this.

---

### Phase 9. The festival
**24 to 25 Oct.**

**Day one.** Run the stall. Collect submissions. Note every question people ask you, every point of confusion, every objection.

**The evening of day one.** Thirty minutes with Nimish and Pravin. What worked, what did not, what to say differently tomorrow.

| Allowed to change overnight | Not allowed |
|---|---|
| What the three of you say | Scoring weights |
| Printed material and QR placement | Question wording |
| Which question you open a conversation with | Band boundaries |
| How you handle the score reveal | Anything the engine calculates |

**Day two.** Better pitch, same instrument.

**Three rules at the stall, both days**

1. The score starts the conversation. It is not the conversation.
2. No price talk.
3. Anyone in band 5 gets told honestly they do not need you.

---

### Phase 10. Fulfilment
**27 Oct to 7 Nov. Two weeks.**

At 80 to 120 submissions this is real work and it needs dividing.

| Who | What |
|---|---|
| Ashok | The 20 highest-value prospects. Full personalisation. |
| Nimish and Pravin | Remaining assessments from templates. You review before sending. |
| Everyone | Confirmation email on the day, promising the assessment within seven days |

Say seven days, not forty-eight hours, and then beat it. Promising 48 hours on 120 submissions is how you break a promise in front of a community that talks to each other.

**Gate:** every person who gave an email has received something by 7 November.

---

### Phase 11. v0.4 and the decision
**Mid November.**

Now you have 100 to 150 real submissions across two sources. That is a genuine dataset.

- Full recalibration to v0.4
- Industry patterns from C1. This is where sector-specific versions become possible
- Q12 themes read properly
- **And only now** the decision on whether to build the automated version from your original document, and what the paid tier actually is

---

## Revised timeline

```
Sep 11-12    Phase 0    Decisions and freeze
Sep 12-13    Phase 1    Paper calibration
Sep 15-19    Phase 2    Build          <- does not move
Sep 22-24    Phase 3    Stakeholder test
Sep 24-30    Phase 4    Assessment templates
Oct 1-14     Phase 5    Live pilot, 20+ real submissions
Oct 13-17    Phase 6/7  Calibration to v0.3 + event assets
Oct 20-22    Phase 8    Dry run and freeze
Oct 24-25    Phase 9    FESTIVAL
Oct 27-Nov 7 Phase 10   Fulfilment
Mid Nov      Phase 11   v0.4 and the paid-tier decision

Sep 15 onwards, every working day: 10 to 30 outreach emails
```

---

## The two numbers that tell you this is going well

**By 30 September:** the page is live and ten synthetic profiles score correctly. If it is not live by then, cut scope.

**By 14 October:** twenty real submissions collected. If you have under ten, the problem is not the tool. It is that outreach did not happen, and that is the thing worth fixing before the festival, not the scoring model.

---

## Last thing

Six weeks means outreach has six weeks to work. Starting 15 September at twenty a day, that is roughly 500 emails before the festival.

If that produces even one paying client, you walk into that room on 24 October as a consultancy with two live engagements and a diagnostic tool, rather than one with a tool.

That is worth more than anything in Phases 0 to 8.

**Confidence: 9/10.** The sequence now has real slack in the right place and the live pilot genuinely improves what you take to the festival. The 10% is on hitting twenty pilot submissions by 14 October, which depends entirely on outreach volume rather than on anything in the build.