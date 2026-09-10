const fs = require("fs");
const path = require("path");

// Check if running on Hostinger deployment environment
const hostingerPublicHtml = "/home/u538055792/domains/alchemetryx.com/public_html";
const sourceDir = path.join(process.cwd(), ".next", "static");
const targetDir = path.join(hostingerPublicHtml, "_next", "static");

if (fs.existsSync(hostingerPublicHtml) && fs.existsSync(sourceDir)) {
  console.log(`[Deployment] Syncing .next/static to ${targetDir}...`);
  try {
    fs.mkdirSync(path.join(hostingerPublicHtml, "_next"), { recursive: true });
    
    // Copy all chunks, css, and static assets into public_html/_next/static
    fs.cpSync(sourceDir, targetDir, { recursive: true });
    console.log("[Deployment] Successfully synced static assets to public_html/_next/static!");
  } catch (err) {
    console.error("[Deployment] Error syncing static assets:", err);
    process.exit(1);
  }
} else {
  // Silent or info when running locally on Windows
  console.log("[Local] Skipping static sync (not in Hostinger environment).");
}
