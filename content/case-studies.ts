/**
 * Case study content. One rule: every line here traces to delivered work.
 * Care Rota is cleared for publication. Home identity and staff names are
 * anonymised in the screenshots.
 */
export type CaseStudy = {
  slug: string;
  kind: "client" | "own-build";
  published: boolean;
  eyebrow: string;
  title: string;
  standfirst: string;
  attribution: string;
  before: { heading: string; body: string; points: { label: string; body: string }[] };
  build: { heading: string; body: string; items: { title: string; caption: string; image: string; alt: string }[] };
  honesty: { heading: string; body: string };
};

export const CARE_ROTA: CaseStudy = {
  slug: "care-rota",
  kind: "client",
  published: true,
  eyebrow: "Case study · Care operations",
  title: "A care home’s rota lived in a spreadsheet. We rebuilt it as a system.",
  standfirst:
    "How a fragmented monthly roster for a UK care home became one place to plan shifts, watch cost, and stay compliant.",
  attribution: "Built by Alchemetryx · Real UK care home · Site and staff names anonymised",
  before: {
    heading: "Five tabs, and a lot of trust.",
    body:
      "The home planned every month in one shared Excel file. Five tabs, one per area. Staff were typed into a grid by hand, week after week stretched across ninety columns, and the file was updated whenever someone remembered.",
    points: [
      { label: "No running cost", body: "Nobody could see the wage bill against budget until the month was already spent." },
      { label: "No coverage check", body: "Whether a floor was actually staffed for a shift was worked out by eye, row by row." },
      { label: "Leave lived in heads", body: "Annual leave, maternity and sick sat in side notes and memory, not next to the rota they affected." },
    ],
  },
  build: {
    heading: "One system that understands a care home.",
    body:
      "Not a generic scheduler. A tool shaped around how a care home actually runs: floors, bank staff, statutory leave and a live budget. Built and hosted by Alchemetryx.",
    items: [
      {
        title: "One view, every floor.",
        caption:
          "Live cost against the budget cap, coverage across all three floors, pending leave and compliance alerts. All current, all in one place, instead of scattered across a workbook.",
        image: "/proof/carerota-dashboard.jpg",
        alt: "CareRota dashboard showing active staff, rota status, pending leave, compliance alerts, floor coverage and a cost snapshot against budget.",
      },
      {
        title: "A rota that does the maths.",
        caption:
          "Build and publish the month by role and floor. Cost and scheduled hours update as shifts go in, so the wage bill is in front of the manager while there is still time to change it, not after payroll.",
        image: "/proof/carerota-rota.jpg",
        alt: "CareRota monthly rota grid with running total cost, utilisation, variance and scheduled hours across the month.",
      },
      {
        title: "Leave and cover, tracked.",
        caption:
          "Annual leave, maternity and sick on one timeline, tied to entitlement. What used to live in a side note now sits beside the schedule it changes.",
        image: "/proof/carerota-leave.jpg",
        alt: "CareRota leave timeline showing annual leave, maternity and sick leave against entitlement.",
      },
    ],
  },
  honesty: {
    heading: "A capability build, not a savings headline.",
    body:
      "The system is real and running on our own infrastructure, shaped around the way a UK care home operates. We are not putting a number on hours or pounds saved, because the honest measure of this work is the jump you can see above: a fragile spreadsheet becomes one system that holds cost, coverage and compliance in a single place.",
  },
};

export const PUBLISHED_CASE_STUDIES: CaseStudy[] = [CARE_ROTA].filter((c) => c.published);
