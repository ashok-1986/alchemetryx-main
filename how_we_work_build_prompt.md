# Antigravity Build Prompt — `/how-we-work` page + site-wide social thumbnails

**For:** Alchemetryx.com (the connected repo at `D:\STARTUP PROJECTS\Alchemetryx\New Website`)
**Date:** 14 September 2026
**Author:** Ashok, via Claude
**Status:** Copy is v1, founder to read before you run. Everything else is locked.

---

## 0. Read first

Before writing any code, read `CLAUDE.md` in the repo root and the design system doc it points to (`02_design_system_spec.md`). This build obeys every non-negotiable in that file. In particular:

- Stack is locked: Next.js App Router, Tailwind v4, shadcn/ui (copy-in), Lenis, GSAP + ScrollTrigger. **No new dependency.** Do not add Framer Motion, Lottie, or any animation or UI library. If a Lottie block is wanted, see Section 6, it is optional and gated on founder sign-off, not a default.
- Every colour is a brand token (Sapphire, Gold, Pearl) or a derived mix already in the design system doc. Introduce no new colour value.
- **No prices anywhere.** Not in copy, not in a placeholder, not in a comment that could ship.
- Locked language rules apply. Banned words on every route: "operations" as a standalone noun, "intelligence", "operating system", "transformation", "unlock", "empower", "seamless", "pilot", "AI-powered", "ecosystem", "cutting-edge", "leverage". Also no em dashes. Simple English, short sentences.
- Static site must be content-complete and readable with JavaScript off before any motion is added. Motion is the last step, not the first.

**Founder decision already made:** this page shows the full method, the whole sequence, on purpose. Do not hide or abbreviate the six steps. The staging-rule caution about keeping the method back does not apply here, it has been overridden deliberately.

---

## 1. Objective

Build one new standalone route, `/how-we-work`, that explains how Alchemetryx works, end to end. It is the link Ashok will put in his LinkedIn Featured section, so it must stand on its own and read well to someone who has never heard of the firm.

Second job, site-wide: make every page produce a correct preview image and title when its link is shared on LinkedIn, WhatsApp, X, and Slack. See Section 7.

---

## 2. Route and navigation

- New route: `app/how-we-work/page.tsx`. Static, server component.
- Add "How we work" to the primary nav, positioned between "About" and "Proof". This is an addition beyond the eight-route map in the IA doc, made on purpose.
- Add `/how-we-work` to `app/sitemap.ts` at priority 0.7, indexable. This page is NOT noindex (unlike `/week/result`).
- Single CTA site-wide stays "Book a 30-minute call", routed as the site already routes it (UK to Nimish).

---

## 3. Page copy (v1, verbatim)

Use this copy exactly. Do not reword, do not add. If something reads awkwardly, flag it to Ashok, do not silently improve it.

### Section 1 — Hero (Sapphire background, Pearl text, Gold CTA)

**H1:** The tools were supposed to help. You are still the system.

**Sub-head:** This is how we fix that. The whole method, nothing held back.

**CTA button:** Book a 30-minute call

### Section 2 — The cost (Pearl background, ink text)

**H2:** Where the week actually goes

**Body (two short paragraphs):**

Invoicing done twice. A rota rebuilt every Monday. The same customer detail typed into three places. Each one costs hours, every week, and the hours are yours.

Add up those hours. Multiply by what an hour of your team costs. That number is the gap. It has sat there so long you have stopped seeing it.

### Section 3 — The method (Pearl, then the six steps as a clear sequence)

**H2:** How we fix one process, end to end

**Six steps.** Render as a numbered vertical sequence, each with a bold lead line and one short paragraph.

**One. We find the one process costing you most.**
We go through every tool and every routine, and we find the single process eating the most time and money. Not ten problems. One. The one worth fixing first.

**Two. We decide what to keep, kill, and fix.**
You get a plain list. What is working and stays. What you pay for that returns nothing and should go. And the one workflow worth rebuilding. No jargon, just the decision.

**Three. We fix the data underneath first.**
Most automation fails because it runs on messy data. So before we automate anything, we make the information underneath it clean and reliable. Skip this and the automation just makes wrong things happen faster.

**Four. We build the workflow so it runs on its own.**
We rebuild that one process as a working system, inside your own tools. Not a slide, not a trial. A live thing your team uses from day one, with a person checking the points that need a person.

**Five. We measure before and after.**
We take the baseline before we touch anything, and the same measure after. If the number did not move, we do not claim it moved. You see the real difference, in hours and money.

**Six. We stay and keep it running.**
A system left alone drifts. We stay on, watch it, keep it working, and take the next process off your plate when you are ready.

**Closing line under the six steps (set apart, slightly larger):**
Two things you will not get from most firms. We work inside your own systems, not from the outside sending documents. And we never bill by the day, so we are not paid to go slow.

### Section 4 — What you own (Sapphire, Pearl text, Gold accent)

**H2:** You own it. All of it.

**Body:**
The system, the setup, the documentation. It is yours. If we stopped working together tomorrow, nothing switches off and nothing gets held to ransom. That is the opposite of how most software deals work, and it is on purpose.

### Section 5 — Proof (Pearl)

**H2:** We have done this

**Body:**
Care Rota. Fitosys. Two builds we can show you, with the numbers before and after.

**Link (text link or secondary button):** See the proof → links to `/proof`

Only reference Care Rota and Fitosys. Do not name any case study that is not cleared for publication.

### Section 6 — Final CTA (Sapphire)

**Line (large, light Urbanist):** One process. Off your plate. Running without you.

**CTA button:** Book a 30-minute call

---

## 4. Layout and UI (against the locked design system)

- Reuse the section rhythm, spacing scale, type scale, and components already used on `/` and `/week`. This page must look like it belongs, not like a new template.
- Alternate section backgrounds Sapphire / Pearl as marked above. Gold used only for the CTA, the accent rule, and the step numbers.
- Headings in Urbanist light, matching existing pages. Body in the existing body style.
- The six steps: on desktop, a vertical sequence with a Gold number and a thin connecting rule or left border so the eye reads it as one path. On mobile, stack cleanly, full width, 16px side gutter, no horizontal scroll.
- Fully responsive, phone width first. Test at 360px and up.
- Must read top to bottom, in order, with JavaScript off. No content hidden behind a script.
- Accessible: real heading hierarchy (one H1, H2 per section), sufficient contrast (the design system tokens already pass), focus states on the CTA and the proof link.

---

## 5. SEO and metadata

- Route metadata:
  - `title`: "How we work — Alchemetryx"
  - `description`: "How we take one process off your plate and make it run on its own. The full method, step by step. We work inside your systems, ship a working thing, and stay to prove it worked."
  - Canonical URL `https://alchemetryx.com/how-we-work`.
  - Indexable (no `robots: noindex`).
- Add JSON-LD on the page. Use `@type` `AboutPage` with an embedded `Organization` (name Alchemetryx, url https://alchemetryx.com), plus a `HowTo`-free plain description. Keep it factual, no prices, no invented ratings.
- Internal links: the proof link to `/proof`, and the CTA to the booking route. Add a single in-body link from the home page's method mention to `/how-we-work` if one exists, so the page is not an orphan.
- Keep it natural. This page's job is trust and the Featured link, not keyword stuffing. Do not force keywords into the locked copy.

---

## 6. Motion (last step, GSAP only, Phase-6 gated)

- Do all of this only after the static page is content-complete and within the performance budget in `01_technical_foundation.md`.
- Use GSAP + ScrollTrigger, consistent with `03_motion_specification.md` and the corrections in `07_motion_interaction_qa.md`. Reuse the existing `Reveal` component pattern already in the codebase.
- Motion plan: hero fades and rises on load. Each of the six steps reveals on scroll, staggered, one after the other, so the sequence reads as a path being drawn. The "what you own" and final CTA reveal on scroll. Nothing fancy, nothing that blocks reading.
- Respect `prefers-reduced-motion`: no transforms, content shown immediately.

**OPTIONAL, founder sign-off required, do NOT build by default:** an animated diagram of the six steps as a single self-hosted `.lottie` file, lazy-loaded, shown only where it does not delay first paint. This needs a new dependency, which the locked stack forbids, so it is off unless Ashok explicitly approves adding it. Default build uses GSAP for the step reveals and no Lottie.

---

## 7. Social share thumbnails (site-wide) — static approach

Goal: when any page link is shared, the platform shows a proper title, description, and image. Right now pages have no Open Graph tags, so previews are blank.

**Founder chose hand-designed static images**, not auto-generated. So:

1. **Root layout defaults.** In `app/layout.tsx` metadata, set:
   - `metadataBase: new URL("https://alchemetryx.com")` so all image paths resolve to absolute URLs for crawlers.
   - Default `openGraph` (siteName "Alchemetryx", type "website", locale "en_GB") and default `twitter` (card "summary_large_image").
   - A default OG image at `/public/og/default.png` (1200x630) so any page without its own image still previews correctly.
2. **Per-page images.** Ashok will supply hand-designed 1200x630 images. Wire each one into that route's metadata via `openGraph.images` and `twitter.images`. Expected set to start: `home`, `how-we-work`, `proof`, `week`. Place them at `/public/og/<page>.png`. Where an image is not yet supplied, the route falls back to the default.
3. Each route's `openGraph.title` / `description` should match that page's real title and description.

**Note for Ashok on the LinkedIn Featured banner:** the LinkedIn Featured item pulls the linked page's OG image, so the `/how-we-work` image above is what will show there, at 1200x630. That is different from your LinkedIn profile cover banner (1584x396), which is a separate image you upload to your profile by hand, not something the website controls. If you meant the cover banner, that is a design task, not a build task, tell me and I will spec that image separately.

---

## 8. Acceptance checklist

- [ ] `/how-we-work` renders, styled like the rest of the site, no new colours, no new dependency.
- [ ] Copy matches Section 3 word for word. No banned words, no em dashes, no prices anywhere on the page.
- [ ] The six steps read as one ordered sequence on desktop and stack cleanly on mobile at 360px, no horizontal scroll.
- [ ] Page reads top to bottom with JavaScript disabled.
- [ ] "How we work" appears in the primary nav between About and Proof.
- [ ] `/how-we-work` is in the sitemap at 0.7 and is indexable.
- [ ] Sharing any of home, how-we-work, proof, week produces a title, description, and image preview (test with a link-preview checker before calling it done).
- [ ] `metadataBase` is set so OG image URLs are absolute.
- [ ] Motion, if added, is GSAP only, respects reduced-motion, and does not block reading. No Lottie unless separately approved.
- [ ] `npm run build` passes and `npm test` still passes. Paste the actual terminal output, not a summary.

## 9. Out of scope

- The three blocked routes `/diagnostic`, `/build`, `/retainer` stay blocked. Do not build or link them.
- No prices, no rate card, anywhere.
- No CMS, no blog, no new library.
