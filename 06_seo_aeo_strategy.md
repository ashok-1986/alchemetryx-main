# Alchemetryx.com — SEO and AEO Strategy

**Version 1.0 | 4 September 2026**
Expands the technical SEO baseline in `04_ia_content_map.md` Section 7.
Status: For build

---

## 1. Why this document exists, and what it is not

This is not a growth-hacking plan. There is no blog, no content calendar, no link-building budget. The site is seven routes and a handful of case studies. Given that, effort goes where it actually pays off for a business this size: being findable when someone searches Google, and being findable when someone asks ChatGPT, Perplexity or Claude a question that Alchemetryx should answer.

That second part is new since the last time anyone thought about SEO for this business, and it changes where the effort should go. A UK SME owner is now as likely to ask an AI assistant "who helps small businesses get ready for Making Tax Digital" as to Google it. Traditional SEO and this newer discipline, usually called AEO (Answer Engine Optimization) or GEO (Generative Engine Optimization), overlap heavily but are not identical. This document covers both, in order of effort versus payoff.

---

## 2. Technical SEO baseline

This is table stakes. It does not differentiate Alchemetryx from anyone, but its absence actively hurts.

| Item | Requirement |
|---|---|
| Sitemap | `sitemap.xml` generated at build time from the route list, resubmitted on every deploy |
| Robots | `robots.txt` allows all standard search crawlers, plus the AI crawlers listed in Section 5 |
| Canonical tags | One canonical URL per route, no trailing-slash duplication |
| Structured data | Organization schema sitewide, Service schema per service route (Section 4) |
| hreflang | `/` and `/india` cross-reference each other for UK and India audiences |
| HTTPS | Enforced throughout, already a hosting default on Hostinger |
| Images | `next/image` on every image, real alt text describing what the image actually shows |
| Core Web Vitals | LCP under 2.0s, INP under 150ms, CLS under 0.05, already locked in the technical foundation |

None of this is optional and none of it needs re-deciding. It is listed here so the SEO checklist lives in one place instead of scattered across three documents.

---

## 3. Metadata, per route

Already drafted in `04_ia_content_map.md` Section 7. No changes here, only a note: keep titles under 60 characters and descriptions under 155, and never let a title drift from the actual on-page headline. A title that promises something the page does not deliver is exactly the kind of mismatch that both Google and an AI assistant penalise, because both are trying to predict whether a click will satisfy the searcher.

---

## 4. Schema markup, per route

| Route | Schema type | Notes |
|---|---|---|
| Global | `Organization` | Name, logo, UK company number 17199377, both addresses, `sameAs` links to any verified profiles |
| `/diagnostic`, `/build`, `/retainer` | `Service` | `provider` points to the Organization, `areaServed` set to United Kingdom and India separately where relevant |
| `/proof/[slug]` | `Article` | Schema.org has no dedicated case-study type; `Article` with `about` pointing to the relevant Service is the closest honest fit. `datePublished` and `dateModified` both required |
| `/about` | `Person` × 3 | Ashok, Nimish, Pravin, each with `worksFor` pointing to the Organization and a `sameAs` link to their real LinkedIn profile once available |
| `/`, `/diagnostic`, `/build`, `/retainer` | `FAQPage` | New addition, see Section 6 |

The `Person` schema is currently blocked by the same photography and bio gap flagged in the IA doc. It matters more than it looks: research on what gets an AI assistant to cite a source consistently points to named, verifiable authorship as a strong signal, not a decorative one. This is one more reason the photography and bios are launch-relevant, not cosmetic.

---

## 5. Crawler access

Currently unspecified anywhere in the build documents. This is a genuine gap, not a restatement.

`robots.txt` must explicitly allow, by name: `GPTBot`, `ClaudeBot`, `PerplexityBot`, `OAI-SearchBot`, `Applebot`. Blocking any of them, even by accident through an overly broad disallow rule, means Alchemetryx is invisible to that engine's answers regardless of how good the content is. This is a five-minute fix and it should be checked explicitly during the launch gate, not assumed to be fine by default.

---

## 6. FAQPage additions

New recommendation, not in the original IA doc. Add a short FAQ block, four to six questions, to `/`, `/diagnostic`, `/build` and `/retainer`. Keep each answer to 40 to 60 words, and match the question text to a visible on-page heading rather than hiding it only in schema markup, since AI engines and search engines both discount schema that does not match visible content.

This earns its place under the site's own motion-spec discipline of "every element must justify why it is there": these are not generic FAQ filler, they are the actual objections Ashok already hears on sales calls. Suggested starting questions, to be refined against real objections once the site is live:

- "Do you publish your prices?" — No, and here is why: [links to the pricing-in-conversation rationale]
- "What is the difference between the Diagnostic and the Build?" — Direct answer from the ladder copy
- "We already have an AI tool. Why would we need this?" — Direct answer using the Usage framing
- "How long does the Build actually take?" — Four to eight weeks, stated plainly
- "Do you work with businesses outside the UK?" — Yes, India, own page, own trigger

Four to six questions, not more. A long FAQ reads as padding, and padding is what the whole positioning brief has been trying to remove from this site.

---

## 7. Content structure for AEO

Grounded in current research on what gets cited by ChatGPT, Perplexity and Claude (see Sources): AI answer engines extract disproportionately from the first third of a page and from clearly bounded, numbered or quantified statements. The good news is that the locked copy across all four build documents already follows this instinct without having been designed for it. Two adjustments worth making deliberately:

**Lead with the answer, not the setup.** Every service route already opens with a one-line outcome before any explanation. Keep that discipline; do not let it drift into a scene-setting paragraph as the site gets written in full.

**Keep the statistical density that proof already has.** Case studies carry a before-number and an after-number by design. Do not let that get diluted into "significant improvement" language during copywriting. This is the same discipline the positioning brief already enforces for a different reason (honesty); it also happens to be the single strongest citation signal in the current research.

One caution on this research: it comes from SEO-industry sources publishing in 2026, not from OpenAI, Anthropic or Perplexity themselves, none of whom publish an official ranking algorithm for citations. Treat percentages like "first 30% of content" as directional, not as a formula to optimise against mechanically.

---

## 8. llms.txt

A markdown file at the domain root that curates a site's most important pages for AI systems to read directly, rather than crawling and parsing HTML.

**Honest verdict, based on current research:** no major AI provider has committed to systematically using it yet. OpenAI, Google and Microsoft have made no public commitment. Anthropic has been reported as considering the standard, and Perplexity has been observed fetching it during agentic browsing. It remains a community proposal, not an official standard, and it sits below domain authority, content quality and schema markup in actual impact today.

**Recommendation: implement it anyway, but do not oversell it internally.** It costs about an hour, has no downside, and forces a useful discipline: writing one clean summary of what the site is and linking its most important pages in priority order is a good exercise regardless of whether any crawler reads the file. Ship it as a small, low-priority task alongside the technical SEO baseline, not as a headline AEO strategy.

Format: one H1 (site name), one blockquote summary, H2 sections grouping links by intent (Services, Proof, About), absolute URLs, 15 to 40 links total. For a seven-route site this will be short, which is correct.

---

## 9. India-specific notes

`hreflang` already covers the technical cross-referencing between `/` and `/india`. No separate AEO treatment needed beyond making sure `/india`'s FAQ and schema (once it ships) use India-specific phrasing (GST, CBIC, IRP) rather than reusing UK terms, since an AI assistant answering an India-specific query is matching on those exact terms.

---

## 10. What we are deliberately not doing

- No link-building campaign or guest-posting program. Not the right use of three founders' time at this stage.
- No paid SEO tooling subscription (Ahrefs, SEMrush) until there is enough traffic for it to have something to measure.
- No blog, restated from the PRD, because it is the single most common piece of generic SEO advice this document is deliberately not following.
- No keyword-stuffing pass on existing locked copy. The positioning brief's language rules override any SEO instinct to add volume.

---

## 11. Sequencing

| Order | Work | Ships with |
|---|---|---|
| 1 | Sitemap, robots.txt (including AI crawler allowlist), canonical tags, Organization schema | Static site, pre-motion, per the IA doc's build sequence |
| 2 | Service and Article schema per route | Same phase |
| 3 | FAQPage blocks and schema | Same phase, written alongside the rest of the copy |
| 4 | Person schema | Blocked on photography and bios, same blocker as `/about` |
| 5 | llms.txt | Any time, one hour, no dependency on anything else |

---

## Sources

- [The State of llms.txt in 2026 | aeo.press](https://ai.aeo.press/the-state-of-llms-txt-in-2026)
- [llms.txt: The Complete Guide to the AI Crawler Standard (2026) | GrowthGPT](https://thegrowthgpt.com/resources/blogs/llms-txt-ai-crawler-guide)
- [Answer Engine Optimization Checklist: How to Get Cited by ChatGPT, Perplexity, and Claude in 2026](https://authoritytech.io/curated/answer-engine-optimization-checklist-chatgpt-perplexity-claude-2026)

## Confidence: Medium

High confidence on the technical SEO baseline and schema plan, these are standard practice with clear implementation paths. Medium on the AEO-specific guidance in Sections 6 to 8, because that field has no official documentation from the AI providers themselves, only third-party observation as of September 2026. Treat this section as the current best read of the evidence, not settled fact, and revisit it in three to six months.
