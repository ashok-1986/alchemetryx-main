import type { MetadataRoute } from "next";
import { PUBLISHED_CASE_STUDIES } from "@/content/case-studies";

/**
 * Only routes that actually exist are listed. Add entries here as pages ship,
 * never ahead of them. A sitemap that promises a 404 is worse than a short one.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://alchemetryx.com";

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/book`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/proof`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
  ];

  const caseStudyRoutes: MetadataRoute.Sitemap = PUBLISHED_CASE_STUDIES.map(
    (cs) => ({
      url: `${baseUrl}/proof/${cs.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })
  );

  return [...staticRoutes, ...caseStudyRoutes];
}