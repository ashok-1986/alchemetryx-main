import { COMPANY_INFO } from "@/lib/constants";

export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: COMPANY_INFO.name,
    url: "https://alchemetryx.com",
    legalName: "Alchemetryx Ltd",
    identifier: COMPANY_INFO.companyNumber,
    description:
      "We find the process costing your business most, rebuild it so it runs on its own, and stay to prove it worked.",
    address: [
      {
        "@type": "PostalAddress",
        addressLocality: "London",
        addressCountry: "GB",
      },
      {
        "@type": "PostalAddress",
        addressLocality: "Pune",
        addressRegion: "Maharashtra",
        addressCountry: "IN",
      },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      url: "https://alchemetryx.com/book",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ServiceJsonLd({
  name,
  description,
  serviceType,
  url,
}: {
  name: string;
  description: string;
  serviceType: string;
  url: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType,
    provider: {
      "@type": "Organization",
      name: COMPANY_INFO.name,
      url: "https://alchemetryx.com",
    },
    areaServed: ["GB", "IN"],
    url,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export interface FaqItem {
  question: string;
  answer: string;
}

export function FaqJsonLd({ items }: { items: FaqItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
