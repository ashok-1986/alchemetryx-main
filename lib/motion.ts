// lib/motion.ts
// Shared easing and duration constants per 03_motion_specification.md & 07_motion_interaction_qa.md

export const DUR = {
  fast: 0.3, // hover, focus, small state change
  micro: 0.2, // micro-interactions (card hover per QA finding 1)
  base: 0.6, // standard element reveal
  slow: 0.9, // display headline, section entrance
  scrub: true, // scroll-linked
} as const;

export const EASE = {
  out: "power2.out", // default for entrances
  inOut: "power2.inOut", // for movements that return
  expo: "expo.out", // for the hero only, one moment of drama
} as const;

export const STAGGER = {
  tight: 0.06,
  base: 0.1,
} as const;
