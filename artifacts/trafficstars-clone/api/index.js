import { readFileSync } from "fs";
import { join } from "path";

const META_TAGS = {
  "/": {
    title: "AdoMobi DSP | Global Performance Marketing & Premium Traffic",
    description: "Run high-converting CPI, CPM, CPC & CPA campaigns with premium global traffic for Nutra, iGaming, Crypto, Betting, Dating & Finance.",
  },
  "/blog": {
    title: "AdoMobi Blog | Digital Advertising & Programmatic Marketing Insights",
    description: "Explore the latest insights on programmatic advertising, DSP, PPC, ad tech, performance marketing, and digital advertising trends with AdoMobi Blog.",
  },
  "/publisher": {
    title: "AdoMobi Publisher Platform | Monetize Website & App Traffic",
    description: "Monetize your website and app traffic with AdoMobi Publisher Platform using high CPM ads, real-time bidding, and global advertiser demand.",
  },
  "/advertiser": {
    title: "AdoMobi DSP | Programmatic Advertising Platform",
    description: "Launch and optimize ad campaigns with AdoMobi DSP using global traffic, smart targeting, and real-time analytics.",
  },
  "/verticals": {
    title: "Advertising Verticals | Nutra, iGaming, Crypto & Dating Traffic",
    description: "Premium global traffic for Nutra, iGaming, Betting, Crypto, Dating, Finance & VOD campaigns with CPI, CPM, CPC & CPA solutions.",
  },
  "/ad-formats": {
    title: "Ad Formats | Push, Native, Display & Video Advertising",
    description: "Explore high-converting Push, Native, Display, Pop & Video ad formats with premium global traffic for CPI, CPM, CPC & CPA campaigns.",
  },
  "/platform": {
    title: "AdoMobi DSP Optimization | AI-Powered Advertising Platform",
    description: "Optimize CPI, CPM, CPC & CPA campaigns with AI-powered targeting, real-time bidding, and premium global traffic on AdoMobi DSP.",
  },
  "/login": {
    title: "Sign In to AdoMobi DSP | Advertiser Dashboard Login",
    description: "Login to AdoMobi DSP to manage campaigns, track performance, and optimize CPI, CPM, CPC & CPA advertising campaigns.",
  },
  "/start": {
    title: "Start Advertising with AdoMobi DSP | Global Traffic Platform",
    description: "Launch CPI, CPM, CPC & CPA campaigns with premium global traffic, smart targeting, and real-time optimization on AdoMobi DSP.",
  },
};

function injectMetaTags(html, route) {
  const meta = META_TAGS[route] || META_TAGS["/"];
  
  return html
    .replace(/<title>.*?<\/title>/, `<title>${meta.title}</title>`)
    .replace(
      /name="description" content="[^"]*"/,
      `name="description" content="${meta.description}"`
    )
    .replace(
      /property="og:title" content="[^"]*"/g,
      `property="og:title" content="${meta.title}"`
    )
    .replace(
      /property="og:description" content="[^"]*"/g,
      `property="og:description" content="${meta.description}"`
    )
    .replace(
      /name="twitter:title" content="[^"]*"/g,
      `name="twitter:title" content="${meta.title}"`
    )
    .replace(
      /name="twitter:description" content="[^"]*"/g,
      `name="twitter:description" content="${meta.description}"`
    );
}

export default function handler(req, res) {
  try {
    // Get the requested path
    const pathname = req.url?.split("?")[0] || "/";
    
    // Check if it's a static asset request
    if (pathname.includes(".") && !pathname.includes("index")) {
      // Serve static files as-is (assets)
      return res.status(404).send("Not Found");
    }

    // Read index.html
    const indexPath = join(process.cwd(), ".next/static/index.html");
    const html = readFileSync(indexPath, "utf8");

    // Extract base route (first segment after /)
    const route = pathname === "/" ? "/" : "/" + pathname.split("/").filter(Boolean)[0];
    
    // Inject appropriate meta tags
    const injectedHtml = injectMetaTags(html, route);

    // Set cache headers
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.status(200).send(injectedHtml);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Server Error");
  }
}
