import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
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
