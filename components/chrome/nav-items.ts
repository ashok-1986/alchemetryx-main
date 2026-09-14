/** One list, used by the rail and the mobile sheet. */
export type NavItem = {
  label: string;
  href: string;
  /** Set only for home-page anchors, so the rail can scroll-spy them. */
  sectionId: string | null;
};

export const NAV_ITEMS: readonly NavItem[] = [
  { label: "Home", href: "/", sectionId: null },
  { label: "The Problem", href: "/#problem", sectionId: "problem" },
  { label: "About", href: "/about", sectionId: null },
  { label: "How we work", href: "/how-we-work", sectionId: null },
  { label: "Proof", href: "/proof", sectionId: null },
];
