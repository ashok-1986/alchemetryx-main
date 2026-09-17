import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

/**
 * Development-only diagnostics. This route walks the server filesystem and
 * returns layout + cwd info, so it must never be reachable in production.
 * Gate: respond 404 outside a non-production NODE_ENV.
 */
export async function GET() {
  if (process.env.NODE_ENV !== "development") {
    return new NextResponse("Not found", { status: 404 });
  }

  const cwd = process.cwd();
  const dirName = __dirname;
  
  let hostingerHome = "Not checked";
  let hostingerDomains = "Not checked";
  let publicHtmlStats = "Not checked";

  try {
    const homeDir = "/home/u538055792";
    if (fs.existsSync(homeDir)) {
      hostingerHome = fs.readdirSync(homeDir).join(", ");
    }
  } catch (e: any) {
    hostingerHome = e.message;
  }

  try {
    const domainsDir = "/home/u538055792/domains/alchemetryx.com";
    if (fs.existsSync(domainsDir)) {
      hostingerDomains = fs.readdirSync(domainsDir).join(", ");
    }
  } catch (e: any) {
    hostingerDomains = e.message;
  }

  try {
    const publicHtml = "/home/u538055792/domains/alchemetryx.com/public_html";
    if (fs.existsSync(publicHtml)) {
      publicHtmlStats = fs.readdirSync(publicHtml).slice(0, 20).join(", ");
    }
  } catch (e: any) {
    publicHtmlStats = e.message;
  }

  return NextResponse.json({
    cwd,
    dirName,
    env: process.env.NODE_ENV,
    homeDir: hostingerHome,
    domainsDir: hostingerDomains,
    publicHtml: publicHtmlStats,
  });
}
