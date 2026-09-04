// content/case-studies-full.ts
// Strict 6-block case study schema per 04_ia_content_map.md Section 4 and 05_prd.md FR-6

export interface CaseStudySixBlock {
  slug: string;
  title: string;
  type: "Client" | "Own-build";
  category: string;
  published: boolean;
  // Block 1: Client and context
  clientAndContext: {
    client: string;
    size: string;
    industry: string;
    description: string;
  };
  // Block 2: The situation
  situation: {
    overview: string;
    frictionPoints: string[];
  };
  // Block 3: The number before
  numberBefore: {
    primaryMetric: string;
    primaryLabel: string;
    secondaryMetric?: string;
    secondaryLabel?: string;
    costImpact: string;
  };
  // Block 4: What was built
  whatWasBuilt: {
    architecture: string;
    toolsUsed: string[];
    steps: string[];
  };
  // Block 5: The number after
  numberAfter: {
    primaryMetric: string;
    primaryLabel: string;
    secondaryMetric?: string;
    secondaryLabel?: string;
    measuredOutcome: string;
  };
  // Block 6: What they said
  quote: {
    text: string;
    author: string;
    role: string;
  };
}

export const CASE_STUDIES_FULL: CaseStudySixBlock[] = [
  {
    slug: "care-rota",
    title: "Care Home Shift Scheduling & Compliance",
    type: "Client",
    category: "Rota & Statutory Compliance",
    published: true,
    clientAndContext: {
      client: "UK Residential Care Provider",
      size: "50 carers across 2 facilities",
      industry: "Healthcare & Care Services",
      description: "A registered residential care home provider operating 24/7 care facilities with a mix of permanent and bank healthcare workers.",
    },
    situation: {
      overview: "The registered manager spent half of every Thursday and Friday assembling the weekly shift rota across WhatsApp, spreadsheets, and SMS. Last-minute cancellations and statutory rest break compliance rules created constant schedule disputes.",
      frictionPoints: [
        "14 hours lost every week manually coordinating shift coverage across disconnected channels.",
        "Constant risk of violating UK statutory rest periods (11 consecutive hours between daily shifts).",
        "Short-notice shift voids forcing emergency reliance on expensive agency staff cover.",
      ],
    },
    numberBefore: {
      primaryMetric: "14 hrs/week",
      primaryLabel: "lost to manual scheduling and dispute handling",
      secondaryMetric: "£3,200/mo",
      secondaryLabel: "in emergency agency cover premiums",
      costImpact: "Over 700 management hours consumed each year on spreadsheet administration.",
    },
    whatWasBuilt: {
      architecture: "Deterministic scheduling engine with automated compliance validation and SMS dispatch.",
      toolsUsed: [
        "PostgreSQL for staff profiles and certification tracking",
        "Deterministic constraint solver for shift rules",
        "Twilio SMS webhooks for automated shift acceptance",
        "Audit logging for Care Quality Commission compliance",
      ],
      steps: [
        "Mapped carer contract hours, skill certifications, and statutory rest break constraints.",
        "Built automated schedule generator matching shifts to available certified carers.",
        "Integrated SMS dispatch offering open shifts with one-tap confirmation replies.",
        "Implemented manager dashboard for one-click exception review.",
      ],
    },
    numberAfter: {
      primaryMetric: "1.5 hrs/week",
      primaryLabel: "for management review and final approval",
      secondaryMetric: "64% drop",
      secondaryLabel: "in emergency agency callouts",
      measuredOutcome: "Saved 12.5 management hours per week and cut agency cover expenditure by £2,050 per month.",
    },
    quote: {
      text: "Rota compilation went from the most stressful two days of my week to a 20-minute approval on Thursday afternoon. The team trusts the schedule now because the allocation rules are transparent.",
      author: "Registered Home Manager",
      role: "Operations Director",
    },
  },
  {
    slug: "fitosys",
    title: "Fitosys Payment & Onboarding Flow",
    type: "Own-build",
    category: "Invoicing & Subscriptions",
    published: true,
    clientAndContext: {
      client: "Alchemetryx Internal Venture",
      size: "Wellness & fitness practitioners",
      industry: "Health, Coaching & Services",
      description: "An internal software venture engineered by Alchemetryx to automate billing and client onboarding for independent coaches in India.",
    },
    situation: {
      overview: "Independent wellness coaches scaling beyond 30 clients lost significant margins to standard SaaS platforms charging 5% to 10% transaction commissions. Manual payment tracking on spreadsheets and chasing UPI bank screenshots created an administrative bottleneck.",
      frictionPoints: [
        "4 hours spent per client per month manually checking bank statements and chasing renewals.",
        "High platform commission fees eroding thin coaching margins.",
        "Delayed onboarding because workout plans and access links were emailed by hand.",
      ],
    },
    numberBefore: {
      primaryMetric: "4 hrs/client/mo",
      primaryLabel: "lost chasing payments and updating records",
      secondaryMetric: "8% fee",
      secondaryLabel: "lost to platform commission intermediaries",
      costImpact: "Coaches hit an administrative ceiling at 35 clients, unable to accept new revenue.",
    },
    whatWasBuilt: {
      architecture: "Direct UPI payment pipeline with automated reconciliation and instant client provisioning.",
      toolsUsed: [
        "Next.js App Router & serverless architecture",
        "Direct UPI QR dynamic transaction generator",
        "Automated WhatsApp business API triggers",
        "Stateful subscription ledger with zero platform fees",
      ],
      steps: [
        "Constructed a 3-way transactional flow routing 100% of client payments straight to coach accounts.",
        "Engineered webhook-based bank receipt verification eliminating screenshot verification.",
        "Automated onboarding triggers delivering welcome packs and access keys upon payment receipt.",
        "Added automated reminder sequences sent 48 hours prior to monthly subscription renewal.",
      ],
    },
    numberAfter: {
      primaryMetric: "0 manual hrs",
      primaryLabel: "required for recurring billing and onboarding",
      secondaryMetric: "0% commission",
      secondaryLabel: "coach keeps 100% of client earnings",
      measuredOutcome: "Eliminated all manual administration from the payment lifecycle, allowing coaches to scale to 100+ active clients.",
    },
    quote: {
      text: "We engineered Fitosys to test our own systems principles on a live product. When you eliminate manual reconciliation and platform taxes, a coach can manage triple the volume without administrative burnout.",
      author: "Ashok",
      role: "Solutions Architecture, Alchemetryx",
    },
  },
];

export function getPublishedSixBlockStudies(): CaseStudySixBlock[] {
  return CASE_STUDIES_FULL.filter((cs) => cs.published);
}

export function getCaseStudyBySlug(slug: string): CaseStudySixBlock | undefined {
  const study = CASE_STUDIES_FULL.find((cs) => cs.slug === slug);
  if (!study || !study.published) return undefined;
  return study;
}
