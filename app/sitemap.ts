import type { MetadataRoute } from "next";
import { PUBLISHED_CASE_STUDIES } from "@/content/case-studies";

/**
 * Only routes that actually exist are listed. Add entries here as pages ship,
 * never ahead of them. A sitemap that promises a 404 is worse than a short one.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://alchemetryx.com";

  const routes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/book`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  ];

  // Case study routes are added once /proof/[slug] exists.
  void PUBLISHED_CASE_STUDIES;

  return routes;
}
