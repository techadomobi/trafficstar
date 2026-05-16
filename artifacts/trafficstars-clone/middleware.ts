import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

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

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const meta = META_TAGS[pathname as keyof typeof META_TAGS] || META_TAGS["/"];
  
  // Store meta tags in headers to be used by the response
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-meta-title", meta.title);
  requestHeaders.set("x-meta-description", meta.description);
  
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/((?!.*\\.).*)"],
};
