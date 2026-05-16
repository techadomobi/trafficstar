import React, { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap, Target, ShieldCheck, Activity, RefreshCw, Lock, BarChart3,
  Cpu, Globe, DollarSign, ArrowRight, CheckCircle2, ChevronDown,
  TrendingUp, Eye, Clock, Database, Code, Layers
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { setPageMeta } from "@/lib/seo";

const FEATURES = [
  {
    id: "rtb",
    icon: Zap,
    title: "Real-Time Bidding Engine",
    subtitle: "Sub-50ms auction processing at global scale",
    desc: "AdoMobi operates a fully transparent RTB infrastructure processing over 4.2 million auctions per second. Built on a custom C++ auction engine with global PoPs across 5 continents, every bid request is evaluated, matched, and responded to in under 50ms — guaranteed.",
    details: [
      "OpenRTB 2.5 / 3.0 compliant",
      "Private marketplace (PMP) support",
      "Header bidding integration",
      "Preferred deals and direct buys",
      "ORTB supply chain transparency",
      "Bid shading and first-price auction",
    ],
    metric: "<42ms",
    metricLabel: "Avg bid response time",
  },
  {
    id: "targeting",
    icon: Target,
    title: "Granular Targeting",
    subtitle: "The most precise audience targeting in the industry",
    desc: "Target your audience with surgical precision using over 30 targeting parameters. From country-level to city-level, from device type down to OS version and browser build — every parameter is available in real-time without any minimum spend requirement.",
    details: [
      "GEO: Country, region, city, ZIP",
      "Device: Desktop, mobile, tablet",
      "OS: iOS, Android, Windows, macOS, Linux",
      "Browser: Chrome, Firefox, Safari, Edge",
      "Carrier and ISP targeting",
      "Language and time-of-day targeting",
      "Connection type (WiFi, 3G, 4G, 5G)",
      "IP range targeting",
    ],
    metric: "30+",
    metricLabel: "Targeting parameters",
  },
  {
    id: "antifraud",
    icon: ShieldCheck,
    title: "Anti-Fraud Technology",
    subtitle: "Multi-layer protection you can trust",
    desc: "AdoMobi' fraud prevention is built across three independent layers: pre-bid filtering, real-time detection, and post-campaign auditing. Our proprietary AI models are trained on billions of data points to identify and block bot traffic, click farms, proxy abuse, and other invalid traffic sources.",
    details: [
      "Pre-bid bot score filtering",
      "Real-time IP reputation scoring",
      "Datacenter traffic exclusion",
      "Behavioral pattern analysis",
      "IVT credits for verified fraud",
      "Traffic quality reporting dashboard",
      "Publisher quality scoring",
      "Third-party IAS/MOAT integration",
    ],
    metric: "0.4%",
    metricLabel: "Average fraud rate (industry avg: 11%)",
  },
  {
    id: "analytics",
    icon: Activity,
    title: "Real-Time Analytics",
    subtitle: "Complete campaign visibility with zero delay",
    desc: "Every click, impression, and conversion is tracked and reported with zero delay. The analytics dashboard supports custom column builders, multi-dimensional breakdowns, saved report templates, and raw data export via API — giving you full control over your data.",
    details: [
      "Real-time impression and click tracking",
      "Custom conversion event tracking",
      "Multi-dimensional report breakdowns",
      "Saved report templates",
      "Scheduled email reports",
      "CSV and JSON data export",
      "REST API with full data access",
      "Conversion attribution modeling",
    ],
    metric: "0s",
    metricLabel: "Reporting delay (real-time)",
  },
  {
    id: "optimization",
    icon: RefreshCw,
    title: "Smart Optimization",
    subtitle: "Rules-based and AI-powered campaign management",
    desc: "Stop wasting hours manually optimizing campaigns. AdoMobi' automation engine lets you set performance rules that execute instantly — auto-pause underperforming placements, scale budgets on winning zones, and rotate creatives based on real-time KPI thresholds.",
    details: [
      "Rule-based auto-optimization",
      "Automated bid adjustment",
      "Creative rotation by CTR/CVR",
      "Budget pacing and auto-scaling",
      "Placement whitelist/blacklist automation",
      "Time-of-day bid multipliers",
      "Target CPA/CPC bidding modes",
      "A/B testing framework",
    ],
    metric: "2.4×",
    metricLabel: "Avg ROI improvement with auto-optimization",
  },
  {
    id: "api",
    icon: Code,
    title: "Full API Access",
    subtitle: "Build anything on top of AdoMobi",
    desc: "The AdoMobi REST API gives you programmatic access to every feature on the platform — campaign creation, bid management, reporting, and publisher controls. Supports OAuth 2.0 authentication, webhooks for real-time events, and comprehensive SDKs for major languages.",
    details: [
      "Full REST API — campaigns, reports, billing",
      "OAuth 2.0 authentication",
      "Webhook event notifications",
      "Postback / S2S conversion tracking",
      "Bulk campaign management",
      "Rate limit: 1,000+ req/min",
      "SDK: JavaScript, Python, PHP",
      "Sandbox test environment",
    ],
    metric: "10K",
    metricLabel: "API requests / minute limit",
  },
];

const TECH_STACK = [
  { icon: Database, label: "Infrastructure", items: ["Custom C++ auction engine", "ClickHouse for analytics", "Redis for real-time cache", "Kubernetes orchestration"] },
  { icon: Globe, label: "Network", items: ["5 global PoPs", "Anycast BGP routing", "CDN edge delivery", "99.99% uptime SLA"] },
  { icon: ShieldCheck, label: "Security", items: ["SOC 2 Type II compliant", "ISO 27001 certified", "TLS 1.3 encryption", "DDoS protection"] },
  { icon: Layers, label: "Integrations", items: ["OpenRTB 2.5/3.0", "VAST 3.0/4.0 video", "IAB standards compliant", "Prebid.js support"] },
];

const PLATFORM_META = {
  title: "AdoMobi DSP Optimization | AI-Powered Advertising Platform",
  description:
    "Optimize CPI, CPM, CPC & CPA campaigns with AI-powered targeting, real-time bidding, and premium global traffic on AdoMobi DSP.",
} as const;

export default function PlatformPage() {
  useEffect(() => {
    setPageMeta(PLATFORM_META.title, PLATFORM_META.description);
  }, []);
  const [activeFeature, setActiveFeature] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const feat = FEATURES[activeFeature];

  const faqs = [
    { q: "Is AdoMobi a DSP or an ad network?", a: "AdoMobi is a self-serve performance ad network with DSP-like capabilities. We operate our own direct publisher relationships, auction infrastructure, and traffic quality controls — giving you the benefits of a DSP (programmatic control) with the scale and simplicity of a managed network." },
    { q: "How does RTB pricing work on AdoMobi?", a: "AdoMobi uses a first-price auction model. You set your maximum bid, and you pay the clearing price of the auction. Bid shading is available to help prevent overpaying on low-competition inventory." },
    { q: "Can I use my own tracking platform?", a: "Yes. AdoMobi supports any third-party tracker via click macros and S2S postback URLs. We have native integrations with Voluum, RedTrack, Keitaro, BeMob, Binom, and all other major tracking platforms." },
    { q: "What is the minimum bid amount?", a: "Minimum bids vary by format. Push notifications start at $0.001 CPM, native at $0.05 CPM, and banners at $0.01 CPM. Popunders are priced on a CPV basis starting at $0.0001." },
    { q: "Does AdoMobi offer managed service?", a: "Yes. Enterprise accounts get access to dedicated account managers who can build and manage campaigns on your behalf. Contact our sales team for managed service options and minimum spend requirements." },
  ];

  return (
    <div className="font-sans antialiased bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-36 pb-20 bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-orange-500/5 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3 pointer-events-none" />
        <div className="container mx-auto px-6 md:px-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-block text-xs font-bold text-[#F7611E] uppercase tracking-widest mb-5 bg-orange-50 px-4 py-1.5 rounded-full">Platform</span>
            <h1 className="text-5xl md:text-7xl font-black text-foreground mb-6">
              Technology Built for <span className="gradient-text">Scale</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Every millisecond matters in performance advertising. Explore the infrastructure, features, and tools that power AdoMobi' global ad delivery.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/start" className="gradient-bg text-white font-bold px-8 py-3.5 rounded-full hover:shadow-xl hover:shadow-orange-500/30 transition-all inline-flex items-center gap-2">
                Get Started Free <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/ad-formats" className="border-2 border-border text-foreground font-semibold px-8 py-3.5 rounded-full hover:border-[#F7611E] hover:text-[#F7611E] transition-all">
                View Ad Formats
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Infrastructure stats */}
      <section className="py-14 bg-[#0f0a0a] text-white relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="absolute w-2 h-2 rounded-full pulse-node"
              style={{ background: "linear-gradient(135deg,#F7611E,#EF3040)", top: `${(i*17+5)%100}%`, left: `${(i*23+10)%100}%`, animationDelay: `${(i*0.3)%2}s` }} />
          ))}
        </div>
        <div className="container mx-auto px-6 md:px-10 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "<42ms", label: "Bid Response Time" },
              { value: "4.2M", label: "Auctions / Second" },
              { value: "99.99%", label: "Uptime SLA" },
              { value: "5", label: "Global Data Centers" },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="text-4xl font-black gradient-text mb-2">{s.value}</div>
                <div className="text-sm text-gray-400">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature tabs */}
      <section className="py-5 bg-white border-y border-border sticky top-[64px] z-40 overflow-x-auto">
        <div className="container mx-auto px-6 md:px-10">
          <div className="flex gap-2 min-w-max">
            {FEATURES.map((f, i) => (
              <button key={i} data-testid={`button-feature-${f.id}`} onClick={() => setActiveFeature(i)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border-2 transition-all flex-shrink-0 ${
                  activeFeature === i ? "gradient-bg text-white border-transparent shadow-md" : "border-border text-muted-foreground hover:border-[#F7611E] hover:text-foreground bg-white"
                }`}>
                <f.icon className="w-4 h-4" /> {f.title.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Feature detail */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-6 md:px-10">
          <AnimatePresence mode="wait">
            <motion.div key={activeFeature} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}
              className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mb-6 shadow-lg shadow-orange-500/25">
                  <feat.icon className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-4xl font-black text-foreground mb-2">{feat.title}</h2>
                <p className="text-lg text-[#F7611E] font-semibold mb-6">{feat.subtitle}</p>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">{feat.desc}</p>
                <div className="bg-white rounded-2xl border border-border p-6 mb-8">
                  <div className="text-4xl font-black gradient-text mb-1">{feat.metric}</div>
                  <div className="text-sm text-muted-foreground">{feat.metricLabel}</div>
                </div>
                <Link href="/start" className="inline-flex items-center gap-2 gradient-bg text-white font-bold px-8 py-3.5 rounded-full hover:shadow-xl hover:shadow-orange-500/30 transition-all">
                  Try It Free <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="bg-white rounded-3xl border border-border p-8 shadow-sm">
                <h3 className="text-xl font-black text-foreground mb-6">Capabilities</h3>
                <div className="grid grid-cols-1 gap-3">
                  {feat.details.map((d, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary transition-colors">
                      <CheckCircle2 className="w-5 h-5 text-[#F7611E] flex-shrink-0" />
                      <span className="text-sm font-medium text-foreground">{d}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Tech stack */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 md:px-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="inline-block text-xs font-bold text-[#F7611E] uppercase tracking-widest mb-4 bg-orange-50 px-4 py-1.5 rounded-full">Infrastructure</span>
            <h2 className="text-4xl font-black text-foreground">Enterprise-Grade Technology Stack</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TECH_STACK.map((tech, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-secondary/50 rounded-2xl border border-border p-6 hover:border-[#F7611E]/30 hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mb-4">
                  <tech.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-foreground mb-4">{tech.label}</h4>
                <ul className="space-y-2">
                  {tech.items.map((item, j) => (
                    <li key={j} className="text-sm text-muted-foreground flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#F7611E] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-6 md:px-10 max-w-3xl">
          <h2 className="text-3xl font-black text-foreground text-center mb-12">Platform FAQ</h2>
          <div className="space-y-3">
            {faqs.map((item, i) => (
              <div key={i} className="bg-white rounded-2xl border border-border overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between px-7 py-5 text-left">
                  <span className="font-semibold text-foreground pr-4">{item.q}</span>
                  <ChevronDown className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                      <div className="px-7 pb-6 text-sm text-muted-foreground leading-relaxed border-t border-border pt-4">{item.a}</div>
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
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5">Experience the Platform First-Hand</h2>
          <p className="text-xl text-white/80 mb-8 max-w-xl mx-auto">Create your free account and start your first campaign in under 5 minutes.</p>
          <Link href="/start" className="inline-block bg-white text-[#F7611E] font-black text-lg px-12 py-4 rounded-full hover:shadow-2xl hover:scale-105 transition-all">
            Start for Free
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
