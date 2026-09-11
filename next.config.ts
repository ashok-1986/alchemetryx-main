import fs from "fs";
import path from "path";
import type { NextConfig } from "next";

// Hostinger LiteSpeed bypasses Node.js for static files and serves them from public_html.
// We automatically copy the built static assets to public_html when the Node server boots up.
if (process.env.NODE_ENV === "production") {
  try {
    // Dynamically find public_html by checking current dir and parent dirs
    let currentDir = process.cwd();
    let hostingerPublicHtml = "";
    
    // Check if we are already in public_html
    if (currentDir.endsWith("public_html")) {
      hostingerPublicHtml = currentDir;
    } else {
      // Check if public_html is a sibling (e.g. we are in /alchemetryx-app)
      const siblingPublicHtml = path.join(path.dirname(currentDir), "public_html");
      if (fs.existsSync(siblingPublicHtml)) {
        hostingerPublicHtml = siblingPublicHtml;
      } else {
        // Fallback to the hardcoded one just in case
        hostingerPublicHtml = "/home/u538055792/domains/alchemetryx.com/public_html";
      }
    }

    const sourceDir = path.join(process.cwd(), ".next", "static");
    const targetDir = path.join(hostingerPublicHtml, "_next", "static");
    const sourcePublic = path.join(process.cwd(), "public");

    if (fs.existsSync(hostingerPublicHtml)) {
      if (fs.existsSync(sourceDir)) {
        console.log(`[Deployment] Syncing .next/static to ${targetDir} on boot...`);
        fs.mkdirSync(path.join(hostingerPublicHtml, "_next"), { recursive: true });
        fs.cpSync(sourceDir, targetDir, { recursive: true });
      }
      
      if (fs.existsSync(sourcePublic)) {
        console.log(`[Deployment] Syncing public/ to ${hostingerPublicHtml} on boot...`);
        fs.cpSync(sourcePublic, hostingerPublicHtml, { recursive: true });
      }
      
      console.log("[Deployment] Successfully synced static assets!");
    } else {
      console.log(`[Deployment] Could not find public_html at ${hostingerPublicHtml}. Skipping sync.`);
    }
  } catch (err) {
    console.error("[Deployment] Error syncing static assets:", err);
  }
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,
  trailingSlash: false,
  experimental: {
    optimizePackageImports: ["lucide-react", "gsap", "@gsap/react", "@radix-ui/react-accordion", "@radix-ui/react-dialog"],
  },
  async redirects() {
    return [
      {
        source: "/about/",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/blueprints",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/blueprints/:path*",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/approach",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/approach/:path*",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/insights",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/insights/:path*",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/start-your-pilot",
        destination: "/book",
        permanent: true,
      },
      {
        source: "/start-your-pilot/:path*",
        destination: "/book",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
