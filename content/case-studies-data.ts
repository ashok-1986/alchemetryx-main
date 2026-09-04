import { CaseStudyData } from "@/components/sections/proof-card";

export const CASE_STUDIES: CaseStudyData[] = [
  {
    slug: "care-rota",
    title: "Care Home Shift Scheduling",
    client: "UK Residential Care Provider",
    category: "Rota & Compliance",
    type: "Client",
    beforeMetric: {
      value: "14 hrs",
      label: "spent weekly on manual scheduling",
    },
    afterMetric: {
      value: "1.5 hrs",
      label: "to review and approve generated shifts",
    },
    summary:
      "Rebuilt the weekly carer schedule from scratch: automated availability matching, statutory rest-break validation, and SMS shift acceptances.",
    published: true,
  },
  {
    slug: "fitosys",
    title: "Fitosys Payment & Onboarding Flow",
    client: "Alchemetryx Own-Build",
    category: "Invoicing & Subscriptions",
    type: "Own-build",
    beforeMetric: {
      value: "4 hrs",
      label: "per client per month chasing payments",
    },
    afterMetric: {
      value: "0 hrs",
      label: "with direct UPI auto-reconciliation",
    },
    summary:
      "Engineered a zero-commission client onboarding and recurring billing engine for wellness professionals in India.",
    published: true,
  },
  {
    slug: "diversity-festival",
    title: "Diversity Festival Artist Logistics",
    client: "UK Cultural Festival",
    category: "Contracting & Approvals",
    type: "Client",
    beforeMetric: {
      value: "22 days",
      label: "contract-to-clearance cycle",
    },
    afterMetric: {
      value: "3 days",
      label: "with automated document intake",
    },
    summary:
      "Automated performer document verification, rider logistics, and invoice approval workflows.",
    published: false, // Blocked on client sign-off
  },
  {
    slug: "physio-practice",
    title: "Physio Clinic Intake & Insurance Claims",
    client: "Multi-location Clinic",
    category: "Intake & Billing",
    type: "Client",
    beforeMetric: {
      value: "35% error rate",
      label: "in initial insurance form entries",
    },
    afterMetric: {
      value: "< 2%",
      label: "with automated pre-submission checks",
    },
    summary:
      "Rebuilt the patient onboarding and private medical insurance reconciliation workflow.",
    published: false, // Blocked on client sign-off
  },
];

export function getPublishedCaseStudies(): CaseStudyData[] {
  return CASE_STUDIES.filter((cs) => cs.published);
}
