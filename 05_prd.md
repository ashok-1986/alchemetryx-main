# Alchemetryx.com — Product Requirements Document

**Version 1.0 | 4 September 2026**
Source documents: *2026 Positioning and Solutions Brief*, *01 Technical Foundation*, *02 Design System*, *03 Motion Specification*, *04 IA and Content Map*
Status: For build

---

## 1. Why this document exists

The four build documents already lock the stack, the tokens, the motion rules and the route map. This document does not repeat those decisions. It exists to answer the three questions none of them answer on their own: what is this website actually for, how do we know if it worked, and what must be true before it ships. Read this first if you are new to the project. Read the other four for how to build it.

---

## 2. What this website is for

One sentence: turn a stranger who has fifteen spare minutes into a booked call, by showing them proof instead of telling them claims.

Alchemetryx does not have a lead generation problem in the sense of traffic. It has a trust problem. The current site produced zero replies to cold outreach. The positioning brief traced this to two causes: the site made claims with no proof behind them, and the email itself was landing in spam (DKIM unset). This PRD treats the website as the trust layer that a cold email or a warm referral sends someone to check. It is not a lead-generation engine on its own. Nobody should be planning paid acquisition against this site until that is explicitly decided later.

---

## 3. Goals

| Goal | What it means concretely |
|---|---|
| Replace claims with proof | Every number on the site traces to a delivered engagement or a named public source. No case study ships until it can survive a stranger checking it. |
| Make the two-level fork legible in ten seconds | A reader lands, answers "have you bought AI yet", and sees content written for their actual situation, not generic AI marketing. |
| Carry both UK and India tracks without diluting either | `/india` is not a translated `/`. It runs its own regulatory trigger and its own proof. |
| Be fast and honest under any condition | Loads fast on a mid-range phone, works with JavaScript off, works with motion off. A site that only works in ideal conditions is not finished. |
| Cost nothing to maintain past launch | No CMS, no blog, no dependency that needs someone watching it. Three founders, no ops headcount for the website. |

---

## 4. Non-goals

Stated once here, already locked in the technical foundation. Restated because a PRD is where scope creep gets caught.

- No blog or content marketing engine in v1. No publishing capacity exists.
- No CMS. Case studies are MDX files edited by hand.
- No dark/light mode toggle.
- No i18n framework. UK and India are two routes in one language, not a locale system.
- No page-transition choreography between routes.
- No paid acquisition, no ad tracking pixels, no marketing automation platform tie-in, unless separately decided.
- No published prices. This is a deliberate difference from competitors, not an oversight.

---

## 5. Who this is for

This section is a hypothesis, not research. No customer interviews have been run for this specific rebuild. Treat these as working assumptions to test against actual visitor behaviour once analytics exist, not as settled personas.

**Level 1 — Adoption, UK.** Owner-led SME, 10 to 60 people, has not bought any AI tool. Found the site through a cold email or referral about a specific regulatory deadline (Making Tax Digital, Employment Rights Act). Reads in short bursts, thinks in hours and money, distrusts jargon. Wants to see the actual process named, not "digital transformation".

**Level 2 — Usage, UK.** Same size business, already has some AI tool bought (usually by IT or an enthusiastic employee), cannot say what it changed. Skeptical of a second AI pitch. Responds to "did anything change" more than to "you need AI".

**Level 1/2 — India.** Finance or ops lead at a mid-size firm facing the GST e-invoicing threshold drop. More document-literate than the UK buyer, will check the regulatory citation before replying. BFSI-adjacent.

**Confidence on this section: Low.** These are inferences from the positioning brief's own reasoning and Ashok's direct sales experience, not from interviews with non-users or competitor users as the detective-interview method in the design skill would require. If replies start coming in after launch, run five to ten conversations against Emmett Shear's detective framework and correct these personas. Do not build more assumptions on top of unverified ones.

---

## 6. Functional requirements by route

Numbered so they can be tracked. Full content spec for each is in `04_ia_content_map.md`; this table is the acceptance list.

| ID | Route | Requirement |
|---|---|---|
| FR-1 | `/` | Level router fork renders both panels, swaps content on click without navigation, keyboard operable |
| FR-2 | `/` | Deadline block reads the nearest mandate date from a single data source (`content/mandates.ts`), not hardcoded per quarter |
| FR-3 | `/` | Proof section does not render a case study card until that case study is marked publishable in its MDX frontmatter |
| FR-4 | `/diagnostic`, `/build`, `/retainer` | Each renders both an Adoption framing and a Usage framing of the same service, visible without a toggle |
| FR-5 | `/proof` | Case study grid pulls only from published MDX files; unpublished drafts never reach the build |
| FR-6 | `/proof/[slug]` | Renders the six-block template from the IA doc for every published case study; missing a block is a build-time error, not a silent gap |
| FR-7 | `/about` | Company number 17199377 renders in this route and in the global footer, sourced from one constant |
| FR-8 | `/india` | Does not render publicly until the CBIC notification number for the ₹5 Cr threshold is confirmed and added to `content/mandates.ts` |
| FR-9 | `/book` | Fillout embed loads, and UK vs India enquiries route to the correct calendar per the brief's split |
| FR-10 | Global | Every route's single CTA reads "Book a 30-minute call" with no variation |
| FR-11 | Global | Banned language list from the IA doc is enforced by a simple grep check in CI against all copy files before merge |

---

## 7. Non-functional requirements

These are already specified in the technical foundation and motion spec. Restated here as acceptance gates because a PRD is what a launch decision gets checked against.

| Area | Requirement | Source |
|---|---|---|
| Performance | LCP under 2.0s, INP under 150ms, CLS under 0.05, home page JS under 120KB gzipped | `01_technical_foundation.md` |
| Accessibility | Full content and CTA reachable with JavaScript disabled and with `prefers-reduced-motion` on | `03_motion_specification.md` |
| Accessibility | Keyboard traversal never loses focus, focus ring always instant | `03_motion_specification.md` |
| SEO | Sitemap, robots.txt, canonical tags, Organization and Service schema, hreflang UK/India | `04_ia_content_map.md`, expanded in `06_seo_aeo_strategy.md` |
| Hosting | Hostinger, HTTPS throughout, no dependency on a service that requires ongoing paid maintenance beyond hosting and Fillout | `01_technical_foundation.md` |
| Data integrity | No number on the site without a traceable source, per the positioning brief's correction log | `alchemetryx_2026_positioning_solutions_brief.md` |

---

## 8. Success metrics

Honest starting point: there is no analytics baseline yet. The old site's only measured signal was zero replies to cold outreach, and DKIM being unset is the suspected reason, not the website itself. So this section sets what to measure, not targets pulled from nowhere.

| Metric | How it is measured | Why it matters |
|---|---|---|
| Cold-email reply rate | Tracked manually per outreach batch, after DKIM is fixed | Isolates whether the site or the email delivery was the real problem |
| Call bookings via `/book` | Fillout submission count | The one conversion event on the entire site |
| Time on `/proof/[slug]` | Basic analytics, once installed | A case study read in under 20 seconds was skimmed, not trusted; under 2 minutes and above 20 seconds is the target band from the IA doc's own two-minute-read design |
| Bounce from `/` after level-router interaction | Basic analytics | Tests whether the fork actually reduces the "this is generic AI marketing" bounce it was built to fix |

Set a baseline in the first four weeks after launch, then treat every number after that as a delta against that baseline. Do not compare against the old site; the old site has no comparable data.

**What analytics tool:** Not yet decided. Given the "minimal analytics" line in the technical foundation's exclusions, the default should be the lightest option that answers the four rows above (Vercel Analytics or Plausible), not a full marketing stack. Open decision, not blocking launch.

---

## 9. Launch gate

Restated from the IA doc's build sequence as a single checklist, because a PRD is where "are we actually done" gets asked in one place.

- [ ] Care Rota case study published, company number 17199377 live on current site (interim fix, before rebuild ships)
- [ ] Fitosys own-build case study written and clearly labelled as own-build
- [ ] DKIM selectors published on the alchemetryx.com zone
- [ ] All routes content-complete and readable with zero motion, zero JavaScript
- [ ] Performance budget met in that static state
- [ ] Motion layer added per `03_motion_specification.md`, reduced-motion contract verified
- [ ] robots.txt explicitly allows GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot, Applebot (new requirement, see SEO/AEO doc)
- [ ] `/india` gated behind CBIC notification confirmation (FR-8)
- [ ] Photography of Ashok, Nimish, Pravin complete for `/about` and home section 7

None of the motion or SEO polish matters if the first three items are not done. They are not website work, but they are launch-blocking, and they are the items most likely to be forgotten because they sit outside the build.

---

## 10. Risks

Carried forward from the cofounder-strategist review, because a PRD that hides a known risk is worse than one that names it.

**The regulation-as-trigger thesis has one real test, and it failed.** The MTD VAT LinkedIn post did not convert. The whole India page and part of the UK trigger map rest on the assumption that a regulatory deadline is what makes a stranger reply. Before betting the full site launch on this, the earlier recommendation stands: run a small batch of 20 to 30 cold emails using the e-invoicing threshold as the hook, before or in parallel with the rebuild, and treat the result as a real signal on whether this messaging works, not as something the website's design can fix on its own.

**Personas in Section 5 are unverified.** If the site launches and still gets no replies, do not assume the copy is wrong before checking whether the persona assumption itself is wrong.

**Two of four case studies are blocked on client sign-off**, which is outside Alchemetryx's control and has no fallback date.

---

## Confidence: Medium

High confidence on requirements and launch gate, they are direct formalizations of already-locked decisions across the four build documents. Medium, not high, because Section 5 (personas) and Section 8 (success metrics) are necessarily built on assumption and a missing analytics baseline, and I have said so plainly rather than dressing them up as researched.
