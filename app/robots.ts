import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://alchemetryx.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      // Explicit AI Answer Engine & Web Agent allowlist per 06_seo_aeo_strategy.md Section 5
      {
        userAgent: "GPTBot",
        allow: "/",
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
      },
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
      },
      {
        userAgent: "Applebot",
        allow: "/",
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
