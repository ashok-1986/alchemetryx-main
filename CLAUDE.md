# Alchemetryx.com — Build Instructions for Claude Code

This file is read automatically at the start of every Claude Code session in this folder. It is the standing brief. The eight documents it points to are the actual spec, this file just tells you the order to read them and the rules that override default instincts.

## Current work order — read these two first

Before anything in the list above, read:

- `10_build_brief_multipage.md` — the active build brief. Nine blocks, acceptance checklist. This is what to work on now.
- `09_home_copy_deck.md` — every approved line for the home page, with the eight copy rules at the top. Those rules govern all pages, not just home.

Where the older documents and these two disagree, these two win. In particular: the site is multipage, not one long page; no duration or timeframe appears on the home page; company registration appears once, in the footer.

Three routes are deliberately not built: `/diagnostic`, `/build`, `/retainer`. They are blocked on real content from Ashok and must not be filled with plausible-sounding process. Do not add them to the nav.

## Read first, in this order

1. `05_prd.md` — what this site is for, requirements, launch gate. Start here.
2. `01_technical_foundation.md` — stack, folder structure, locked dependencies, performance budget.
3. `02_design_system_spec.md` — colour tokens (all derived from three brand colours, recipes included), typography, component inventory.
4. `04_ia_content_map.md` — route map, locked copy, per-route content, build sequence.
5. `03_motion_specification.md` — animation rules. Do not touch until you reach the motion phase.
6. `07_motion_interaction_qa.md` — four corrections to apply against the motion spec when you get there, including one real bug (a `height: auto` crossfade that will not animate as written).
7. `06_seo_aeo_strategy.md` — schema markup plan, robots.txt requirement, metadata.
8. `alchemetryx_2026_positioning_solutions_brief.md` — why the copy says what it says. Locked copy is locked for a reason stated in here.

## Non-negotiables

- Stack is locked: Next.js App Router, Tailwind v4, shadcn/ui (copy-in, not a package), Lenis, GSAP + ScrollTrigger. Motion/Framer Motion is explicitly excluded. Do not propose an alternative stack or library, even a "better" one.
- Every colour used anywhere is one of the three brand tokens (Sapphire, Gold, Pearl) or a derived mix already computed in `02_design_system_spec.md`. Never introduce a new colour value, even a close one.
- Deliberate exclusions, not gaps: no CMS, no blog, no i18n framework, no dark/light toggle, no page-transition choreography. Do not add any of these even if it seems like an easy win.
- No prices anywhere on the site, in any component, in any placeholder text.
- Locked copy (headlines, CTA text, the gold statement, the level-router question) is not to be reworded during implementation. If something reads awkwardly once it is on a real page, flag it to Ashok, do not silently improve it.
- `robots.txt` must explicitly allow `GPTBot`, `ClaudeBot`, `PerplexityBot`, `OAI-SearchBot`, `Applebot` by name.
- The `/india` route must not go live until Ashok confirms the CBIC notification number for the ₹5 Cr threshold is entered in `content/mandates.ts`. Build the route, but gate its publication.
- A case study renders on `/proof` only if its MDX frontmatter marks it publishable. As of this brief, only Care Rota and Fitosys are cleared. Diversity Festival and the physio engagement wait on client sign-off, build the template but do not publish those two.

## How to work

- Karpathy discipline applies to everything you write: simplest code that solves the problem, no speculative flexibility, no "while I'm here" refactors, surgical changes only. State a short plan with a verify step before writing code for anything non-trivial.
- Follow the build sequence in `04_ia_content_map.md` Section 8, in order. Stop after each phase and wait for Ashok's review before starting the next one. Do not cascade phases in one session unless explicitly told to.
- Zero animation until the static site is content-complete, accessible with JavaScript off, and within the performance budget in `01_technical_foundation.md`. This is a gate, not a nice-to-have, and it is Phase 6 in the build sequence for a reason.
- When you reach the motion layer, build it from `03_motion_specification.md` but apply the four corrections listed in `07_motion_interaction_qa.md` Section 4 as you go. In particular: do not implement the level-router panel crossfade as `height: auto`, it will not animate in a browser. Use a measured-height GSAP tween or a `grid-template-rows` trick instead.

## What "done" looks like

The checklist in `05_prd.md` Section 9 (Launch gate). Three of those items are not code (publishing Care Rota, DKIM, photography) and are Ashok's to close, not yours. Say so if asked, do not attempt to work around them.
