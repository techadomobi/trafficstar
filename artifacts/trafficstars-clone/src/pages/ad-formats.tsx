import React, { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare, LayoutTemplate, MousePointerClick, ImageIcon,
  Video, Smartphone, ArrowRight, CheckCircle2, ChevronDown, TrendingUp, Eye, DollarSign, Zap
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { setPageMeta } from "@/lib/seo";

const FORMATS = [
  {
    id: "push",
    icon: MessageSquare,
    title: "Push Notifications",
    tag: "Most Popular",
    tagColor: "bg-green-50 text-green-600",
    shortDesc: "Opt-in ads delivered directly to user devices across all major browsers.",
    desc: "Push notification ads are delivered to users who have explicitly opted in to receive notifications from publishers. This creates one of the highest-intent ad audiences available in digital advertising. Works on desktop and mobile, across Chrome, Firefox, Safari, and Edge — no app required.",
    specs: [
      { label: "Title", value: "Up to 30 characters" },
      { label: "Body Text", value: "Up to 45 characters" },
      { label: "Icon Image", value: "192×192 px PNG/JPG" },
      { label: "Main Image", value: "360×240 px (optional)" },
      { label: "URL", value: "Landing page or deep link" },
    ],
    benefits: [
      "100% opt-in audience — highest intent",
      "Works without a browser open",
      "Immune to ad blockers",
      "Massive global volume",
      "Rich media with icon + image",
      "Real-time delivery tracking",
    ],
    stats: [
      { label: "Avg CTR", value: "14–18%" },
      { label: "Monthly Volume", value: "120B+" },
      { label: "GEOs", value: "190+" },
      { label: "Min CPM", value: "$0.01" },
    ],
    bestFor: ["Dating", "Gaming", "Nutra", "E-commerce", "Crypto"],
  },
  {
    id: "native",
    icon: LayoutTemplate,
    title: "Native Ads",
    tag: "High Engagement",
    tagColor: "bg-blue-50 text-blue-600",
    shortDesc: "In-feed ad blocks that blend seamlessly with publisher content.",
    desc: "Native ads match the look and feel of the surrounding publisher content, creating a non-disruptive user experience that delivers superior engagement rates. These ads appear as content recommendations, in-feed cards, or sponsored content blocks across premium publisher inventory.",
    specs: [
      { label: "Title", value: "Up to 50 characters" },
      { label: "Description", value: "Up to 90 characters" },
      { label: "Image", value: "300×250 or 600×500 px" },
      { label: "Brand Name", value: "Up to 25 characters" },
      { label: "CTA Text", value: "Up to 15 characters" },
    ],
    benefits: [
      "Non-intrusive, content-matching design",
      "3× higher CTR vs display banners",
      "Anti-adblock immune",
      "Works on all devices",
      "Multiple placement sizes",
      "Smart content matching algorithm",
    ],
    stats: [
      { label: "Avg CTR", value: "3–6%" },
      { label: "Monthly Volume", value: "80B+" },
      { label: "GEOs", value: "185+" },
      { label: "Min CPM", value: "$0.05" },
    ],
    bestFor: ["Nutra", "Finance", "Dating", "Gaming", "News"],
  },
  {
    id: "popunder",
    icon: MousePointerClick,
    title: "Popunder",
    tag: "High Volume",
    tagColor: "bg-yellow-50 text-yellow-700",
    shortDesc: "Full-page ads opening behind the active browser tab for maximum exposure.",
    desc: "Popunder ads open a full browser window behind the user's active tab. When the user closes their current tab, the popunder is revealed — delivering a full-page viewing experience. Offers the highest volume and lowest CPM of any format, making it ideal for mass-market offers and high-volume campaigns.",
    specs: [
      { label: "Format", value: "Full browser window" },
      { label: "Trigger", value: "User click / page navigation" },
      { label: "Frequency Cap", value: "Configurable per user" },
      { label: "URL", value: "Any landing page" },
      { label: "GEO Targeting", value: "Country / city / region" },
    ],
    benefits: [
      "Highest volume of any format",
      "Full-screen exposure",
      "Lowest cost per impression",
      "Works across all GEOs",
      "Smart frequency capping",
      "Instant campaign launch",
    ],
    stats: [
      { label: "Avg CPV", value: "$0.001–0.01" },
      { label: "Monthly Volume", value: "300B+" },
      { label: "GEOs", value: "190+" },
      { label: "Min CPM", value: "$0.001" },
    ],
    bestFor: ["Dating", "WebCams", "Casino", "Downloads", "Mass market"],
  },
  {
    id: "banner",
    icon: ImageIcon,
    title: "Display Banners",
    tag: "IAB Standard",
    tagColor: "bg-gray-100 text-gray-600",
    shortDesc: "Classic banner ads in all standard IAB sizes with 98% global fill rates.",
    desc: "Standard display banner ads in all major IAB sizes, served programmatically through AdoMobi' real-time bidding platform. Supports static images, animated GIFs, and HTML5 rich media creatives with global inventory across desktop and mobile.",
    specs: [
      { label: "Sizes", value: "300×250, 728×90, 160×600, 320×50, 300×600" },
      { label: "Format", value: "JPG, PNG, GIF, HTML5" },
      { label: "Max File Size", value: "150 KB (HTML5: 500 KB)" },
      { label: "Animation", value: "Up to 15 seconds, max 3 loops" },
      { label: "Protocol", value: "OpenRTB 2.5 / VAST" },
    ],
    benefits: [
      "All standard IAB banner sizes",
      "HTML5 rich media support",
      "Animated GIF support",
      "98% global fill rate",
      "Brand-safe placements",
      "Viewability guarantee",
    ],
    stats: [
      { label: "Avg CTR", value: "0.3–1.2%" },
      { label: "Monthly Volume", value: "200B+" },
      { label: "GEOs", value: "190+" },
      { label: "Fill Rate", value: "98.4%" },
    ],
    bestFor: ["Brand awareness", "Retargeting", "E-commerce", "Finance", "All verticals"],
  },
  {
    id: "video",
    icon: Video,
    title: "Video Ads",
    tag: "Premium",
    tagColor: "bg-red-50 text-red-600",
    shortDesc: "In-stream and outstream video placements with VAST/VPAID support.",
    desc: "Premium video advertising including pre-roll, mid-roll, and outstream formats. Supports VAST 3.0/4.0 and VPAID 2.0 for full programmatic compatibility. Video ads deliver the highest brand recall and emotional engagement of any ad format, with measurable completion rates.",
    specs: [
      { label: "Video Format", value: "MP4, WebM (H.264 recommended)" },
      { label: "Duration", value: "6, 15, 30, or 60 seconds" },
      { label: "Min Resolution", value: "1280×720 (720p HD)" },
      { label: "Protocol", value: "VAST 3.0/4.0, VPAID 2.0" },
      { label: "Max File Size", value: "50 MB" },
    ],
    benefits: [
      "Pre-roll, mid-roll, and outstream",
      "VAST 3.0 / 4.0 support",
      "VPAID 2.0 compatibility",
      "Skip or non-skip options",
      "Companion banner support",
      "Detailed completion rate reporting",
    ],
    stats: [
      { label: "Completion Rate", value: "68–78%" },
      { label: "Monthly Volume", value: "15B+" },
      { label: "GEOs", value: "150+" },
      { label: "Min CPV", value: "$0.003" },
    ],
    bestFor: ["Brand campaigns", "Gaming", "Entertainment", "E-commerce", "Finance"],
  },
  {
    id: "interstitial",
    icon: Smartphone,
    title: "Interstitials",
    tag: "High Impact",
    tagColor: "bg-purple-50 text-purple-600",
    shortDesc: "Full-screen mobile ads shown at natural content transition points.",
    desc: "Interstitial ads take over the full screen at natural transition points in the user journey — between game levels, between article pages, or during app loading screens. They achieve the highest viewability and engagement of all mobile ad formats, with an average CTR far above standard banners.",
    specs: [
      { label: "Format", value: "Full screen — 320×480 or 480×320" },
      { label: "Supported Types", value: "Static, HTML5, Video" },
      { label: "Display Duration", value: "Configurable (5–30 seconds)" },
      { label: "Close Button", value: "After X seconds (configurable)" },
      { label: "Platform", value: "iOS and Android web/app" },
    ],
    benefits: [
      "Full-screen viewability",
      "Highest mobile engagement",
      "HTML5 and video support",
      "Natural placement moments",
      "Customizable close button timing",
      "Cross-device tracking",
    ],
    stats: [
      { label: "Avg CTR", value: "10–15%" },
      { label: "Monthly Volume", value: "30B+" },
      { label: "GEOs", value: "170+" },
      { label: "Min CPM", value: "$0.1" },
    ],
    bestFor: ["Gaming", "Apps", "Dating", "Streaming", "Mobile-first verticals"],
  },
];

const AD_FORMATS_META = {
  title: "Ad Formats | Push, Native, Display & Video Advertising",
  description:
    "Explore high-converting Push, Native, Display, Pop & Video ad formats with premium global traffic for CPI, CPM, CPC & CPA campaigns.",
} as const;

const FAQ_ITEMS = [
  { q: "What is the minimum deposit to start advertising?", a: "The minimum deposit to activate your AdoMobi advertiser account is $100. This applies to self-serve accounts. Enterprise accounts have custom minimums based on volume." },
  { q: "How quickly do campaigns go live?", a: "Once your campaign is created and your creative is approved (usually within 1–2 hours during business hours), traffic begins flowing immediately. There is no waiting period for live campaigns." },
  { q: "Can I target specific websites or apps?", a: "Yes. AdoMobi supports whitelist and blacklist targeting by publisher ID, site category, and domain. You can also run RON (Run of Network) campaigns and then optimize to specific placements that perform." },
  { q: "What traffic quality guarantees do you offer?", a: "We provide multi-layer anti-fraud filtering including bot detection, click fraud analysis, and IP quality scoring. Invalid traffic is automatically excluded and you receive a credit for any verified IVT that passes through." },
  { q: "Do you support third-party tracking?", a: "Yes. AdoMobi integrates with all major third-party tracking platforms including Voluum, RedTrack, Keitaro, BeMob, Binom, and any custom tracker that supports click macros and postback URLs." },
];

export default function AdFormatsPage() {
  useEffect(() => {
    setPageMeta(AD_FORMATS_META.title, AD_FORMATS_META.description);
  }, []);
  const [activeFormat, setActiveFormat] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const f = FORMATS[activeFormat];

  return (
    <div className="font-sans antialiased bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-36 pb-20 bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-orange-500/5 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3 pointer-events-none" />
        <div className="container mx-auto px-6 md:px-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-block text-xs font-bold text-[#F7611E] uppercase tracking-widest mb-5 bg-orange-50 px-4 py-1.5 rounded-full">Ad Formats</span>
            <h1 className="text-5xl md:text-7xl font-black text-foreground mb-6">
              Six Formats. <span className="gradient-text">Infinite Reach.</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              From push notifications to full-screen video — choose the format that drives the best results for your vertical and audience.
            </p>
            <Link href="/start" className="gradient-bg text-white font-bold px-10 py-4 rounded-full hover:shadow-xl hover:shadow-orange-500/30 transition-all inline-flex items-center gap-2">
              Start Campaign <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Format tabs */}
      <section className="py-5 bg-white border-y border-border sticky top-[64px] z-40 overflow-x-auto">
        <div className="container mx-auto px-6 md:px-10">
          <div className="flex gap-2 min-w-max">
            {FORMATS.map((fmt, i) => (
              <button
                key={i}
                data-testid={`button-format-${fmt.id}`}
                onClick={() => setActiveFormat(i)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border-2 transition-all flex-shrink-0 ${
                  activeFormat === i
                    ? "gradient-bg text-white border-transparent shadow-md"
                    : "border-border text-muted-foreground hover:border-[#F7611E] hover:text-foreground bg-white"
                }`}
              >
                <fmt.icon className="w-4 h-4" /> {fmt.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Format detail */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-6 md:px-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFormat}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid lg:grid-cols-3 gap-8"
            >
              {/* Main info */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-3xl border border-border p-10 shadow-sm">
                  <div className="flex items-start gap-5 mb-6">
                    <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center shadow-lg shadow-orange-500/25 flex-shrink-0">
                      <f.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h2 className="text-3xl font-black text-foreground">{f.title}</h2>
                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${f.tagColor}`}>{f.tag}</span>
                      </div>
                      <p className="text-muted-foreground">{f.shortDesc}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-8 text-lg">{f.desc}</p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                    {f.stats.map((s, i) => (
                      <div key={i} className="bg-secondary rounded-xl p-4 text-center">
                        <div className="text-xl font-black gradient-text mb-1">{s.value}</div>
                        <div className="text-xs text-muted-foreground">{s.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Best for */}
                  <div>
                    <h4 className="font-bold text-foreground mb-3">Best Performing Verticals</h4>
                    <div className="flex flex-wrap gap-2">
                      {f.bestFor.map((vert) => (
                        <span key={vert} className="text-sm bg-orange-50 text-[#F7611E] font-medium px-3 py-1.5 rounded-full border border-orange-200">{vert}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Benefits */}
                <div className="bg-white rounded-3xl border border-border p-8 shadow-sm">
                  <h3 className="text-xl font-black text-foreground mb-6">Key Benefits</h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {f.benefits.map((b, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary transition-colors">
                        <CheckCircle2 className="w-5 h-5 text-[#F7611E] flex-shrink-0" />
                        <span className="text-sm font-medium text-foreground">{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Specs + CTA */}
              <div className="space-y-6">
                <div className="bg-white rounded-3xl border border-border p-8 shadow-sm">
                  <h3 className="text-lg font-black text-foreground mb-5">Technical Specs</h3>
                  <div className="space-y-3">
                    {f.specs.map((s, i) => (
                      <div key={i} className="flex flex-col gap-0.5 py-2 border-b border-border last:border-0">
                        <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{s.label}</span>
                        <span className="text-sm font-semibold text-foreground">{s.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl border border-orange-200 p-8">
                  <h3 className="text-lg font-black text-foreground mb-3">Launch a {f.title} Campaign</h3>
                  <p className="text-sm text-muted-foreground mb-6">Get instant access to global inventory. Setup takes under 5 minutes.</p>
                  <Link href="/start" className="block w-full text-center gradient-bg text-white font-bold py-3.5 rounded-full hover:shadow-lg transition-all mb-3">
                    Start Now — Free
                  </Link>
                  <Link href="/login" className="block w-full text-center border-2 border-border text-foreground font-semibold py-3 rounded-full hover:border-[#F7611E] hover:text-[#F7611E] transition-all text-sm">
                    Sign In to Existing Account
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Format comparison table */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 md:px-10">
          <h2 className="text-3xl md:text-4xl font-black text-foreground text-center mb-12">Format Comparison</h2>
          <div className="overflow-x-auto rounded-2xl border border-border shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-secondary">
                  <th className="text-left px-6 py-4 font-bold text-foreground">Format</th>
                  <th className="text-center px-6 py-4 font-bold text-foreground">Avg CTR</th>
                  <th className="text-center px-6 py-4 font-bold text-foreground">Volume</th>
                  <th className="text-center px-6 py-4 font-bold text-foreground">Min CPM</th>
                  <th className="text-center px-6 py-4 font-bold text-foreground">Mobile</th>
                  <th className="text-center px-6 py-4 font-bold text-foreground">Desktop</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Push Notifications", ctr: "14–18%", vol: "10M+/mo", cpm: "$0.01", mobile: true, desktop: true },
                  { name: "Native Ads", ctr: "3–6%", vol: "15M+/mo", cpm: "$0.05", mobile: true, desktop: true },
                  { name: "Popunder", ctr: "N/A (CPV)", vol: "30M+/mo", cpm: "$0.001", mobile: true, desktop: true },
                  { name: "Display Banners", ctr: "0.3–1.2%", vol: "20M+/mo", cpm: "$0.01", mobile: true, desktop: true },
                  { name: "Video Ads", ctr: "N/A (CPV)", vol: "15M+/mo", cpm: "$0.003", mobile: true, desktop: true },
                  { name: "Interstitials", ctr: "10–15%", vol: "40M+/mo", cpm: "$0.10", mobile: true, desktop: false },
                ].map((row, i) => (
                  <tr key={i} className="border-t border-border hover:bg-secondary/40 transition-colors">
                    <td className="px-6 py-4 font-semibold text-foreground">{row.name}</td>
                    <td className="px-6 py-4 text-center font-bold gradient-text">{row.ctr}</td>
                    <td className="px-6 py-4 text-center text-muted-foreground">{row.vol}</td>
                    <td className="px-6 py-4 text-center font-semibold">{row.cpm}</td>
                    <td className="px-6 py-4 text-center">{row.mobile ? "✓" : "—"}</td>
                    <td className="px-6 py-4 text-center">{row.desktop ? "✓" : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-6 md:px-10 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-black text-foreground text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} className="bg-white rounded-2xl border border-border overflow-hidden" data-testid={`faq-item-${i}`}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-7 py-5 text-left"
                >
                  <span className="font-semibold text-foreground pr-4">{item.q}</span>
                  <ChevronDown className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-7 pb-6 text-sm text-muted-foreground leading-relaxed border-t border-border pt-4">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg" />
        <div className="relative z-10 container mx-auto px-6 md:px-10 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5">Ready to Run Your First Campaign?</h2>
          <p className="text-xl text-white/80 mb-8 max-w-xl mx-auto">Access all 6 ad formats instantly with a single account.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/start" className="bg-white text-[#F7611E] font-black text-lg px-10 py-4 rounded-full hover:shadow-2xl hover:scale-105 transition-all">
              Start for Free
            </Link>
            <Link href="/platform" className="bg-white/15 text-white font-bold text-lg px-10 py-4 rounded-full border-2 border-white/30 hover:bg-white/25 transition-all">
              Learn About the Platform
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
