/**
 * Verified company facts only.
 * Nothing goes in this file unless it can be checked by a stranger.
 * TODO markers are deliberate blanks, not omissions. Do not fill them with a guess.
 */
export const COMPANY = {
  name: "Alchemetryx",
  legalName: "Alchemetryx Ltd",
  companyNumber: "17199377",
  companyNumberLabel: "Company No. 17199377",
  companiesHouseUrl: "https://find-and-update.company-information.service.gov.uk/company/17199377",
  primaryCtaLabel: "Book a 30-minute call",
  primaryCtaHref: "/book",
  ukAddress: "83 Arthur Grove, London, England, SE18 7ES",
  registeredOffice: "83 Arthur Grove, London, England, SE18 7ES",
  email: "support@alchemetryx.com",
  supportEmail: "support@alchemetryx.com",
  // TODO(ashok): confirm India address line before launch
  indiaAddress: "",
  socials: {
    linkedin: "https://www.linkedin.com/company/alchemetryx",
    instagram: "https://www.instagram.com/thealchemetryx/",
    facebook: "https://www.facebook.com/alchemalytic",
  },
} as const;
