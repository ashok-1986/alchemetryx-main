// content/mandates.ts
// Regulatory trigger dates, updated quarterly per 01_technical_foundation.md and 04_ia_content_map.md

export interface Mandate {
  id: string;
  title: string;
  date: string;
  region: "UK" | "IN";
  description: string;
  published: boolean;
  notificationNumber?: string;
}

export const MANDATES: Mandate[] = [
  {
    id: "mtd-vat",
    title: "Making Tax Digital",
    date: "2026-04-06",
    region: "UK",
    description: "Digital record keeping and quarterly software reporting for UK businesses.",
    published: true,
  },
  {
    id: "employment-rights-act",
    title: "Employment Rights Act",
    date: "2026-06-01",
    region: "UK",
    description: "Statutory requirements for rota forecasting, zero-hour contracts, and day-one rights.",
    published: true,
  },
  {
    id: "in-e-invoicing",
    title: "GST e-Invoicing ₹5 Cr Threshold",
    date: "2026-04-01",
    region: "IN",
    description: "30-day IRP reporting requirement for firms above ₹5 Cr aggregate turnover.",
    published: false, // Gated per CLAUDE.md until Ashok confirms CBIC notification number
    notificationNumber: undefined,
  },
];
