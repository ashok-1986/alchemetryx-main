import { COMPANY } from "@/lib/constants";

/**
 * Organization schema. Verified facts only.
 * No address is emitted until COMPANY.ukAddress is confirmed. An empty
 * address field is better than a wrong one.
 */
export function OrganizationJsonLd() {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: COMPANY.name,
    url: "https://alchemetryx.com",
    identifier: COMPANY.companyNumber,
    sameAs: [COMPANY.companiesHouseUrl],
    founder: { "@type": "Person", name: "Ashok Verma" },
  };

  if (COMPANY.ukAddress) {
    data.address = {
      "@type": "PostalAddress",
      addressCountry: "GB",
      streetAddress: COMPANY.ukAddress,
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
