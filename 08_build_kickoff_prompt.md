# Build kickoff prompt for Claude Code

How to use this: open Claude Code in the `New Website` folder (where `CLAUDE.md` and all eight spec docs already sit). Paste the message below as your first prompt. It starts Phase 3 only (scaffold), the two phases before it in the IA doc's build sequence are not code work, they are yours to close directly (publish Care Rota, add the company number to the current live site, write the Fitosys case study). Do those in parallel, they do not block the scaffold.

---

## The prompt to paste

```
Read CLAUDE.md, then read the eight documents it lists, in the order given.

Do only this: scaffold the Next.js project per 01_technical_foundation.md.
That means:

- Next.js App Router, TypeScript
- Tailwind v4 with the exact token block from 02_design_system_spec.md Section 2
- shadcn/ui installed with these components only: button, accordion, tabs,
  separator, sheet, dialog, badge
- The folder structure specified in 01_technical_foundation.md (app/,
  components/ui, components/motion, components/sections, components/chrome,
  content/case-studies/, content/mandates.ts, lib/motion.ts)
- Urbanist loaded via next/font/google, weights 300 and 400 only
- robots.txt with the AI crawler allowlist from 06_seo_aeo_strategy.md
  Section 5 (GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot, Applebot)

Do not build any route content yet. Do not add GSAP, Lenis, or any motion
code yet, even the setup. Do not create any case study MDX files yet.

When the scaffold builds clean with `npm run build` and the dev server
renders a blank page with the correct fonts and colour tokens loading (you
can prove this with a single test div using each token), stop. Tell me
exactly what you did and what you did not do yet, and wait for me to
review before touching Phase 4 (Home and the three service routes, static,
no animation).
```

---

## Why it is written this way

**One phase, hard stop.** The build sequence in `04_ia_content_map.md` has eight phases for a reason, most website rebuilds fail not because the code is wrong but because an AI agent runs ahead and builds five phases in one shot with no checkpoint, and by the time something is off it is buried under four more phases of code on top of it. Reviewing after each phase costs you ten minutes. Finding a mistake three phases deep costs an afternoon.

**Explicit "do not" list.** Claude Code left to its own judgement will often add something reasonable-sounding, an animation on hover, a CMS-lite content layer, a dark mode toggle, because these are common patterns it has seen a thousand times. Every one of those is a deliberate exclusion in your own documents. Naming them as "do not" here is cheaper than removing them later.

**"Tell me what you did and did not do" at the end.** This is the actual review checkpoint. Read that summary against the Phase 3 requirements above before saying go on the next phase.

---

## The next seven kickoff prompts, for reference

You do not need these yet, but here is the shape so you know what is coming and can sanity check Claude Code's summaries against them.

| Phase | What it covers | Gate before starting it |
|---|---|---|
| 4 | Home and the three service routes, zero animation | Phase 3 scaffold builds clean |
| 5 | Proof, About, India (gated), Book | Phase 4 routes reviewed |
| 6 | Accessibility and performance pass, still zero motion | All routes content-complete |
| 7 | Motion layer, per the motion spec plus the four QA corrections | Phase 6 passes the performance budget with zero motion |
| 8 | Launch | `05_prd.md` Section 9 checklist fully checked, including the three non-code items |

Each phase gets its own short kickoff prompt when you get there, same shape as the one above: what to build, what not to touch yet, what "stop and show me" looks like.

---

## Confidence: High

This is a direct translation of decisions already locked across the eight build documents into an execution sequence, not new judgement calls. The one thing worth watching once the scaffold is running: confirm `npm run build` is actually clean before calling Phase 3 done, an agent will sometimes report success while a type error or an unused import warning sits in the output.
