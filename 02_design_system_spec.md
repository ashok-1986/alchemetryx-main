# Alchemetryx.com — Design System Specification

**Version 1.0 | 4 September 2026**
Structural reference: ON.energy (DESIGN 4.md)
Colour and type: Alchemetryx brand system
Status: For build

---

## 1. What was borrowed and what was kept

DESIGN 4.md is a style reference for ON.energy, an industrial power brand. Its colour system is caution yellow on black. That is not Alchemetryx, and adopting it would discard the brand system the video suite and brand bible are already built on.

What was taken from it is the **structure**, which is genuinely strong and transfers cleanly:

| Borrowed from ON.energy | How it applies here |
|---|---|
| Three-mode full-bleed section rhythm | Dark Sapphire → Gold statement → Pearl content, alternating |
| Whisper-light display weight (300) | Urbanist 300 for all display and headline work |
| Binary weight pairing, no intermediates | 300 for display, 400 for body. Nothing else. |
| Tight negative tracking at large sizes | -0.04em at 36px and above |
| Flat, shadowless elevation | Hierarchy from colour blocks and space, never from shadow |
| Utilitarian small radii | 6px interactive, 9px cards, 16px images |
| Narrow component vocabulary | Roughly a dozen components total |
| 120px section gaps | Kept exactly |

What was rejected: the yellow, the black, and Univers Next Pro.

---

## 2. Palette

### The brand is three colours

| Brand colour | Value |
|---|---|
| Midnight Sapphire | `#1A2642` |
| Alchemical Gold | `#D4AF37` |
| Pearl White | `#F8F6F0` |

These are fixed. Nothing below adds a fourth hue.

### Six derived tokens

A website needs surface elevation, hairlines and muted text, which three colours cannot supply on their own. Rather than invent colours, every support token below is a computed mix of the three brand colours. The recipe is given so any of them can be regenerated or adjusted without guesswork.

| Token | Value | Recipe | Role |
|---|---|---|---|
| `--color-ink` | `#11192B` | Sapphire → Black, 35% | Primary text on light and on Gold |
| `--color-sapphire-raised` | `#2A354E` | Sapphire → Pearl, 7% | Elevated dark surface. Nav pills, cards on dark |
| `--color-sapphire-line` | `#424B61` | Sapphire → Pearl, 18% | Hairline borders on dark |
| `--color-slate` | `#9FA3AA` | Sapphire → Pearl, 60% | Muted body text on dark surfaces |
| `--color-pearl-line` | `#DDDDDB` | Pearl → Sapphire, 12% | Hairline borders on light |
| `--color-gold-deep` | `#7B6620` | Gold → Black, 42% | Gold-toned text on light backgrounds only |

No derived token introduces a new hue. Each sits on the line between two brand colours, so the system reads as three colours with structural depth rather than nine colours.

### Verified contrast

Computed, not estimated. WCAG 2.1 relative luminance.

| Pair | Ratio | Verdict |
|---|---|---|
| Ink on Pearl | 16.22:1 | Pass AA and AAA |
| Pearl on Sapphire | 13.88:1 | Pass AA and AAA |
| Pearl on Sapphire-raised | 11.31:1 | Pass AA and AAA |
| Ink on Gold | 8.34:1 | Pass AA and AAA |
| Gold on Sapphire | 7.13:1 | Pass AA and AAA |
| Slate on Sapphire | 5.92:1 | Pass AA |
| Gold-deep on Pearl | 5.16:1 | Pass AA |
| Slate on Sapphire-raised | 4.83:1 | Pass AA |
| **Gold on Pearl** | **1.95:1** | **Fail. Banned.** |

Note the second-to-last row. Muted text on a raised card is the tightest pair in the system at 4.83:1. It passes, but it has little headroom, so `--color-slate` must not be darkened without rechecking.

### The one hard rule

**Alchemical Gold `#D4AF37` must never be used as text on Pearl White.** At 1.95:1 against a 4.5:1 requirement it is unreadable. This is an accessibility failure, not a preference.

It is the most likely mistake during build, because gold on cream looks correct in a mockup at display size and collapses as body copy.

Gold has exactly three permitted uses:

1. Text or icon **on Sapphire** (7.13:1)
2. **Filled background** with Ink text on it (8.34:1)
3. **Hairline or rule** carrying no information

For gold-toned text on a light section, use `--color-gold-deep` `#7B6620`.

---

## 3. Typography

**Urbanist**, loaded through `next/font/google`, self-hosted at build time. Free, so it also removes the Univers Next Pro licence cost entirely.

```ts
// app/layout.tsx
import { Urbanist } from "next/font/google";

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-urbanist",
  display: "swap",
});
```

Only two weights are loaded. Loading more would invite their use, and the binary 300/400 pairing is the point.

### Scale

| Role | Size | Line height | Tracking | Weight | Token |
|---|---|---|---|---|---|
| micro | 10px | 1.2 | 0 | 400 | `--text-micro` |
| caption | 12px | 1.2 | 0 | 400 | `--text-caption` |
| body-sm | 14px | 1.2 | 0 | 400 | `--text-body-sm` |
| body | 16px | 1.5 | -0.02em | 400 | `--text-body` |
| heading | 24px | 1.17 | -0.02em | 300 | `--text-heading` |
| heading-lg | 36px | 1.13 | -0.04em | 300 | `--text-heading-lg` |
| display | 64px | 1.0 | -0.04em | 300 | `--text-display` |
| display-xl | 88px | 0.95 | -0.04em | 300 | `--text-display-xl` |

Two changes from the ON.energy source. Body line-height is 1.5, not 1.20, because 1.20 on a 16px paragraph is too tight to read comfortably and ON.energy gets away with it only because its body copy is very short. And `display-xl` at 88px is added for the home hero, where the argument needs one moment of scale.

**Body copy maximum width: 65 characters.** Roughly 520px at 16px. Longer lines lose the reader on the return sweep.

### Responsive display sizing

Use `clamp()` so display type scales without breakpoint jumps:

```css
--text-display-xl: clamp(2.75rem, 7vw, 5.5rem);   /* 44px → 88px */
--text-display:    clamp(2.25rem, 5vw, 4rem);      /* 36px → 64px */
--text-heading-lg: clamp(1.75rem, 3.5vw, 2.25rem); /* 28px → 36px */
```

---

## 4. Spacing, radii, layout

Base unit 4px.

| Token | Value |
|---|---|
| `--space-1` | 4px |
| `--space-4` | 16px |
| `--space-5` | 20px |
| `--space-6` | 24px |
| `--space-9` | 36px |
| `--space-15` | 60px |
| `--space-30` | 120px |
| `--space-50` | 200px |

| Element | Radius |
|---|---|
| Nav pills, buttons | 6px |
| Cards | 9px |
| Images | 16px |
| Section containers | 24px |

**Layout rules.**

- Section gap: 120px desktop, 72px below 768px
- Card padding: 24px
- Element gap: 16px
- Content column inside light sections: max-width 1200px, centred
- Text blocks inside that: max-width 520px
- Full-bleed sections have no max-width. Ever. The colour must reach both edges.

---

## 5. Section rhythm

The page is a sequence of full-viewport colour acts, not cards floating on a single canvas. This is the structural spine.

```
┌────────────────────────────────────────┐
│  SAPPHIRE  #1A2642                     │  Hero. Display type in Pearl.
│  full-bleed, image or gradient-free    │  Gold accent on the CTA only.
└────────────────────────────────────────┘
                 120px
┌────────────────────────────────────────┐
│  PEARL  #F8F6F0                        │  Content. Ink text.
│  max-width 1200 inner column           │  The two-question router lives here.
└────────────────────────────────────────┘
                 120px
┌────────────────────────────────────────┐
│  GOLD  #D4AF37                         │  Statement. One sentence.
│  full-bleed, Ink text at display size  │  No cards, no dividers.
└────────────────────────────────────────┘
                 120px
┌────────────────────────────────────────┐
│  PEARL  #F8F6F0                        │  Proof grid.
└────────────────────────────────────────┘
                 120px
┌────────────────────────────────────────┐
│  SAPPHIRE  #1A2642                     │  Final CTA. Footer follows.
└────────────────────────────────────────┘
```

**Gold sections appear at most once per page.** Twice on a single page and the accent stops being an accent. On the home page it carries the positioning line. On inner pages it usually does not appear at all.

---

## 6. shadcn/ui theme mapping

shadcn expects a specific set of CSS variable names. Map the brand tokens onto them rather than fighting the convention.

```css
/* app/globals.css */
@import "tailwindcss";

@theme {
  /* Brand */
  --color-sapphire:         #1A2642;
  --color-gold:             #D4AF37;
  --color-pearl:            #F8F6F0;

  /* Derived — mixes of the three above, no new hues */
  --color-ink:              #11192B;
  --color-sapphire-raised:  #2A354E;
  --color-sapphire-line:    #424B61;
  --color-slate:            #9FA3AA;
  --color-pearl-line:       #DDDDDB;
  --color-gold-deep:        #7B6620;

  /* Type */
  --font-sans: var(--font-urbanist), ui-sans-serif, system-ui, sans-serif;

  --text-micro: 10px;
  --text-caption: 12px;
  --text-body-sm: 14px;
  --text-body: 16px;
  --text-heading: 24px;
  --text-heading-lg: clamp(1.75rem, 3.5vw, 2.25rem);
  --text-display: clamp(2.25rem, 5vw, 4rem);
  --text-display-xl: clamp(2.75rem, 7vw, 5.5rem);

  /* Radii */
  --radius-sm: 6px;
  --radius-md: 9px;
  --radius-lg: 16px;
  --radius-xl: 24px;

  /* Spacing */
  --spacing-section: 120px;
}

/* shadcn contract — light sections are the default */
:root {
  --background: var(--color-pearl);
  --foreground: var(--color-ink);
  --card: var(--color-pearl);
  --card-foreground: var(--color-ink);
  --primary: var(--color-gold);
  --primary-foreground: var(--color-ink);
  --secondary: var(--color-sapphire);
  --secondary-foreground: var(--color-pearl);
  --muted: #EBEAE6;
  --muted-foreground: #5D6476;
  --accent: var(--color-gold);
  --accent-foreground: var(--color-ink);
  --border: var(--color-pearl-line);
  --input: var(--color-pearl-line);
  --ring: var(--color-gold-deep);
  --radius: 6px;
}

/* Applied to dark full-bleed sections via a wrapper class, not a media query */
.section-dark {
  --background: var(--color-sapphire);
  --foreground: var(--color-pearl);
  --card: var(--color-sapphire-raised);
  --card-foreground: var(--color-pearl);
  --muted-foreground: var(--color-slate);
  --border: var(--color-sapphire-line);
  --input: var(--color-sapphire-line);
  --ring: var(--color-gold);
}

.section-gold {
  --background: var(--color-gold);
  --foreground: var(--color-ink);
  --muted-foreground: #4A3D13;
  --border: #B89A2F;
}
```

**Why a class and not a media query.** The site's dark and light are structural, decided per section, not per user preference. `.section-dark` on a wrapper re-scopes every shadcn component inside it automatically, so a Button renders correctly on Sapphire without a variant prop.

---

## 7. Component inventory

### From shadcn

```bash
npx shadcn@latest add button accordion tabs separator sheet dialog badge
```

| Component | Where used |
|---|---|
| `button` | CTA, nav CTA, form submit |
| `accordion` | Mandate list on the deadline block, FAQ |
| `tabs` | The two-question Adoption/Usage router |
| `separator` | Hairline rules between content blocks |
| `sheet` | Mobile navigation drawer |
| `dialog` | Booking modal, if the Fillout form is not a full page |
| `badge` | Mandate dates, case study tags |

Nothing else. Every additional shadcn component is more surface to keep on-brand.

### Custom

| Component | Notes |
|---|---|
| `SectionFullBleed` | Takes `tone: "dark" \| "light" \| "gold"`, applies the wrapper class, enforces 120px gap |
| `DisplayHeading` | Urbanist 300, clamp sizing, correct tracking per size |
| `LevelRouter` | The "have you bought AI yet" fork. Two panels, no page change |
| `LadderCard` | Diagnostic / Build / Retainer. Title, plain-language description, timeframe, no price |
| `ProofCard` | Case study. 16px radius image, 24px title in weight 300, one metric |
| `DeadlineBlock` | Reads `content/mandates.ts`, shows the nearest date, updated quarterly |
| `NavPill` | Sapphire-raised background, Pearl text, 6px radius |
| `GoldStatement` | The full-bleed gold act. One sentence at display size, Ink text |

### Button variants

| Variant | Fill | Text | Where |
|---|---|---|---|
| `primary` | Gold `#D4AF37` | Ink `#0F1829` | The single CTA, "Book a 30-minute call" |
| `outline-dark` | transparent, 1px Sapphire-line | Pearl | Secondary action on dark sections |
| `outline-light` | transparent, 1px Pearl-line | Ink | Secondary action on light sections |

There is one primary button on any given page. That is the whole point of a single CTA.

---

## 8. Do and do not

### Do

- Use weight 300 for every headline and display element. The restraint is the signature.
- Alternate full-bleed sections. Sapphire, then Pearl, then Gold once, then Pearl, then Sapphire.
- Apply -0.04em tracking at 36px and above, -0.02em between 16 and 24px.
- Keep body copy at 65 characters maximum.
- Use `--color-gold-deep` `#7B6620` for any gold-toned text on Pearl.
- Let full-bleed sections span the full viewport width, always.
- Keep 120px between major sections on desktop.

### Do not

- Never put `#D4AF37` gold text on `#F8F6F0` pearl. 1.95:1. It fails.
- Never add a box-shadow. Hierarchy comes from colour blocks and space.
- Never add a gradient. The gold section is the colour moment; a gradient dilutes it.
- Never use weight 500, 600 or 700. The 300/400 pairing is a constraint, not an oversight.
- Never use a radius above 16px on a functional element.
- Never run two gold sections on one page.
- Never constrain a full-bleed section inside a max-width container.
- Never introduce a fourth hue. Every colour on the site is Sapphire, Gold, Pearl, or a computed mix of them.

---

## 9. Imagery

The ON.energy reference leans on industrial hardware photography. Alchemetryx has no equivalent subject and stock photography of laptops would actively damage a positioning built on honesty.

**Use instead, in priority order:**

1. **Real artefacts from real work.** A screenshot of an actual dashboard built for a client, an actual before-and-after number, an actual rota. Redacted where needed. This is both proof and imagery in one asset.
2. **Real people.** Ashok, Nimish, Pravin. Photographed simply against a Sapphire or Pearl ground. Faces build trust on an About page in a way nothing else does.
3. **Typographic and diagrammatic composition.** Where there is no honest photograph, use type and rules on a colour field. A well-set gold statement section needs no image at all.

**Never:** stock photography of meetings or handshakes, abstract AI imagery, neural networks, glowing brains, circuit boards, robots. Every one of these signals that there was nothing real to show.

Images carry a 16px radius as the only softening, and always ship through `next/image` with explicit dimensions.
