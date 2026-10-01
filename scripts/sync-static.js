const fs = require("fs");
const path = require("path");

function syncStaticAssets() {
  const currentDir = process.cwd();
  let hostingerPublicHtml = "";

  // Check if we are inside public_html
  if (currentDir.endsWith("public_html")) {
    hostingerPublicHtml = currentDir;
  } else {
    // Check if public_html is a sibling (e.g., /home/u538055792/domains/alchemetryx.com/alchemetryx-app)
    const siblingPublicHtml = path.join(path.dirname(currentDir), "public_html");
    if (fs.existsSync(siblingPublicHtml)) {
      hostingerPublicHtml = siblingPublicHtml;
    } else {
      // Fallback path for Hostinger deployment
      const fallbackPath = "/home/u538055792/domains/alchemetryx.com/public_html";
      if (fs.existsSync(fallbackPath)) {
        hostingerPublicHtml = fallbackPath;
      }
    }
  }

  if (!hostingerPublicHtml || !fs.existsSync(hostingerPublicHtml)) {
    console.log("[Local/CI] Skipping static sync (not in Hostinger environment or public_html not found).");
    return;
  }

  const sourceStatic = path.join(currentDir, ".next", "static");
  const targetStatic = path.join(hostingerPublicHtml, "_next", "static");
  const sourcePublic = path.join(currentDir, "public");

  try {
    if (fs.existsSync(sourceStatic)) {
      console.log(`[Deployment] Syncing .next/static to ${targetStatic}...`);
      fs.mkdirSync(path.join(hostingerPublicHtml, "_next"), { recursive: true });
      fs.cpSync(sourceStatic, targetStatic, { recursive: true });
      console.log("[Deployment] Successfully synced .next/static!");
    } else {
      console.warn("[Deployment] Warning: .next/static directory not found for sync.");
    }

    if (fs.existsSync(sourcePublic)) {
      console.log(`[Deployment] Syncing public/ to ${hostingerPublicHtml}...`);
      fs.cpSync(sourcePublic, hostingerPublicHtml, { recursive: true });
      console.log("[Deployment] Successfully synced public static assets!");
    }
  } catch (err) {
    console.error("[Deployment] Error syncing static assets:", err);
    process.exit(1);
  }
}

syncStaticAssets();
