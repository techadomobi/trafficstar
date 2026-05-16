import { useEffect, useState } from "react";
import { Link } from "wouter";
import { AnimatePresence, motion } from "framer-motion";
import { setPageMeta } from "@/lib/seo";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Bot,
  ChevronDown,
  Clock3,
  Crosshair,
  Globe2,
  Layers,
  Shield,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const ADVERTISER_META = {
  title: "AdoMobi DSP | Programmatic Advertising Platform",
  description:
    "Launch and optimize ad campaigns with AdoMobi DSP using global traffic, smart targeting, and real-time analytics.",
} as const;

const KPIS = [
  { label: "Monthly Impressions", value: "35M+", icon: Globe2 },
  { label: "Active Publishers", value: "3,000+", icon: Layers },
  { label: "Avg Response Time", value: "<50ms", icon: Clock3 },
  { label: "Countries", value: "190+", icon: Target },
];

const FEATURES = [
  {
    title: "Predictive Bid Engine",
    desc: "Machine-learning bid logic that adjusts in real time using conversion probability and inventory quality.",
    icon: Bot,
  },
  {
    title: "Deep Audience Targeting",
    desc: "Layer country, region, device, OS, browser, ISP, connection type, and whitelist/blacklist controls.",
    icon: Crosshair,
  },
  {
    title: "Fraud Shield",
    desc: "Multi-layer anti-fraud stack with suspicious-click filtering and ongoing post-click quality validation.",
    icon: Shield,
  },
  {
    title: "Creative Velocity",
    desc: "Launch and test creatives quickly with simple review workflows and reusable campaign templates.",
    icon: Zap,
  },
  {
    title: "Clear Attribution",
    desc: "Flexible postback macros and tracker-ready links for accurate campaign-level performance measurement.",
    icon: BadgeCheck,
  },
  {
    title: "Live Optimization",
    desc: "Use real-time performance signals to cut waste and reallocate spend toward higher-converting segments.",
    icon: TrendingUp,
  },
];

const STEPS = [
  {
    title: "Set Campaign Objective",
    detail: "Choose CPI, CPM, CPC, or CPA goals and define the primary conversion event.",
  },
  {
    title: "Build Targeting Stack",
    detail: "Select geos, devices, placements, and day-parting rules that match your funnel.",
  },
  {
    title: "Upload Creatives",
    detail: "Submit multiple assets and start with controlled testing across top inventory slices.",
  },
  {
    title: "Optimize With Live Data",
    detail: "Scale winning segments, pause underperformers, and automate bid ranges for stability.",
  },
];

const PLAYBOOK = [
  {
    title: "Week 1: Structured Discovery",
    summary: "Run segmented tests across geos, devices, and placements to identify stable conversion clusters.",
    bullets: ["Start with narrow budgets per segment", "Rotate 3-5 creatives", "Track early quality events"],
  },
  {
    title: "Week 2: Cost Control",
    summary: "Apply bid caps and source-level exclusions to remove expensive low-quality traffic pockets.",
    bullets: ["Set CPA guardrails", "Pause low-LTV sources", "Refine day-parting"],
  },
  {
    title: "Week 3+: Scale with Rules",
    summary: "Expand budget only on validated segments and use automation rules to preserve margins at volume.",
    bullets: ["Increment spend gradually", "Clone top performers", "Automate alerts and controls"],
  },
];

const VERTICAL_STRATEGIES = [
  {
    vertical: "iGaming",
    angle: "Fast-moving creative refresh with geos split by payment behavior.",
    metric: "+2.1x conversion volume",
  },
  {
    vertical: "Nutra",
    angle: "Long-form landing funnels paired with stricter placement quality filters.",
    metric: "-26% CPA",
  },
  {
    vertical: "Finance",
    angle: "Intent-driven targeting and sequential messaging by device journey.",
    metric: "+38% qualified leads",
  },
  {
    vertical: "Dating",
    angle: "High-frequency creative testing with timezone-sensitive delivery windows.",
    metric: "+31% CTR",
  },
];

const ADVERTISER_TIMELINE = [
  {
    month: "Month 1",
    title: "Learning & Baseline",
    detail: "Validate top geos, creatives, and bidding windows to establish predictable conversion benchmarks.",
  },
  {
    month: "Month 2",
    title: "Controlled Scaling",
    detail: "Expand into adjacent segments while preserving CPA via budget partitioning and bid limit rules.",
  },
  {
    month: "Month 3",
    title: "Automation Layer",
    detail: "Deploy rule-based alerts and bulk optimization flows to sustain volume with stable margins.",
  },
  {
    month: "Month 4+",
    title: "Portfolio Expansion",
    detail: "Replicate proven structures into new verticals and markets with reduced ramp-up risk.",
  },
];

const ADVERTISER_PLANS = [
  {
    name: "Starter",
    spend: "$500 - $5,000 / month",
    includes: ["Self-serve campaign controls", "Core reporting", "Email support"],
  },
  {
    name: "Growth",
    spend: "$5,000 - $50,000 / month",
    includes: ["Priority review lanes", "Advanced targeting", "Weekly optimization check-ins"],
  },
  {
    name: "Scale",
    spend: "$50,000+ / month",
    includes: ["Dedicated account team", "Custom whitelists", "Strategy and forecasting support"],
  },
];

const ADVERTISER_FAQS = [
  {
    q: "How quickly can I launch my first campaign?",
    a: "Most advertisers launch the same day after account setup, tracking configuration, and creative approval.",
  },
  {
    q: "Can I run with a small test budget first?",
    a: "Yes. Start with focused segment tests, gather data, and scale only once your conversion and cost signals are stable.",
  },
  {
    q: "Do you support third-party tracking platforms?",
    a: "Yes. You can integrate external trackers using macros and postback URLs for clear attribution and optimization feedback.",
  },
  {
    q: "How do you protect traffic quality?",
    a: "A layered quality stack filters suspicious traffic patterns and supports ongoing source-level performance auditing.",
  },
];

export default function AdvertiserPage() {
  useEffect(() => {
    setPageMeta(ADVERTISER_META.title, ADVERTISER_META.description);
  }, []);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="font-sans antialiased bg-background">
      <Navbar />

      <section className="pt-28 sm:pt-32 md:pt-36 pb-20 sm:pb-24 relative overflow-hidden bg-background">
        <div className="absolute -top-20 -right-20 w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full bg-orange-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full bg-red-500/10 blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 md:px-10 grid lg:grid-cols-2 gap-8 xl:gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 text-xs font-bold text-[#F7611E] uppercase tracking-wider bg-orange-50 border border-orange-100 px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4" /> Advertiser Platform
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-foreground leading-tight mb-6">
              Build Profitable Campaigns
              <br />
              Across Global Premium Traffic
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mb-8">
              Launch high-intent campaigns and scale with confidence using automated bidding, transparent reporting, and direct access to quality inventory.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="https://monetize.adomobi.com/signup" className="gradient-bg text-white font-bold px-8 py-3.5 rounded-full hover:shadow-xl hover:shadow-orange-500/30 transition-all inline-flex items-center gap-2">
                Start Advertising <ArrowRight className="w-4 h-4" />
              </a>
              <Link href="/ad-formats" className="border-2 border-border text-foreground font-semibold px-8 py-3.5 rounded-full hover:border-[#F7611E] hover:text-[#F7611E] transition-all">
                Explore Ad Formats
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-3xl border border-border p-6 sm:p-8 shadow-xl"
          >
            <h2 className="text-2xl font-black text-foreground mb-6">Campaign Snapshot</h2>
            <div className="grid grid-cols-2 gap-4">
              {KPIS.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.4, delay: index * 0.07 }}
                  className="bg-secondary rounded-2xl p-4"
                >
                  <item.icon className="w-5 h-5 text-[#F7611E] mb-2" />
                  <div className="text-2xl font-black text-foreground">{item.value}</div>
                  <div className="text-xs text-muted-foreground">{item.label}</div>
                </motion.div>
              ))}
            </div>
            <div className="mt-6 p-4 rounded-2xl bg-linear-to-r from-orange-50 to-red-50 border border-orange-100">
              <p className="text-sm text-foreground/90">
                "Top campaigns typically recover learning costs within the first 7-10 days with disciplined targeting and creative testing."
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-secondary/40">
        <div className="container mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-black text-foreground mb-4">Built for Performance Teams</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From first test budget to global scale, every tool is designed to shorten feedback loops and improve ROI.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="bg-white rounded-2xl border border-border p-6 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="w-11 h-11 rounded-xl gradient-bg flex items-center justify-center mb-4">
                  <feature.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-black text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-10 grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55 }}
          >
            <h2 className="text-4xl font-black text-foreground mb-5">How Advertisers Scale Here</h2>
            <p className="text-muted-foreground mb-8 max-w-xl">
              A simple framework: launch fast, read performance clearly, and optimize with confidence.
            </p>
            <div className="space-y-4">
              {STEPS.map((step, idx) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.35, delay: idx * 0.08 }}
                  className="flex gap-4 items-start bg-secondary rounded-2xl p-4"
                >
                  <div className="w-8 h-8 rounded-full gradient-bg text-white font-black text-sm flex items-center justify-center shrink-0">
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55 }}
            className="rounded-3xl border border-border bg-[#0f0a0a] p-8 text-white"
          >
            <h3 className="text-2xl font-black mb-6">Results Advertisers Talk About</h3>
            <div className="space-y-5">
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 text-orange-300 text-sm font-semibold mb-2">
                  <BarChart3 className="w-4 h-4" /> iGaming Campaign
                </div>
                <p className="text-sm text-white/85">"After 3 optimization cycles, CPA dropped by 31% while total volume increased 2.2x."</p>
              </div>
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 text-orange-300 text-sm font-semibold mb-2">
                  <Target className="w-4 h-4" /> Finance Funnel
                </div>
                <p className="text-sm text-white/85">"Smart bid controls helped us stabilize costs and keep conversion quality consistent week over week."</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-secondary/40">
        <div className="container mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-black text-foreground mb-4">Optimization Playbook</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A practical campaign progression used by high-performing teams to improve profitability without sacrificing scale.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-5">
            {PLAYBOOK.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="bg-white rounded-2xl border border-border p-6 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="text-xs font-bold text-[#F7611E] uppercase tracking-wide mb-3">Phase {idx + 1}</div>
                <h3 className="text-xl font-black text-foreground mb-3">{item.title}</h3>
                <p className="text-sm text-muted-foreground mb-5">{item.summary}</p>
                <div className="space-y-2">
                  {item.bullets.map((bullet) => (
                    <div key={bullet} className="text-sm text-foreground/90 bg-secondary rounded-lg px-3 py-2">
                      {bullet}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-black text-foreground mb-4">Vertical Strategy Benchmarks</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Reference patterns from top-performing categories to speed up your own campaign learning curve.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5">
            {VERTICAL_STRATEGIES.map((item, idx) => (
              <motion.div
                key={item.vertical}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.4, delay: idx * 0.07 }}
                className="rounded-2xl border border-border bg-secondary p-6"
              >
                <div className="flex items-center justify-between gap-3 mb-3">
                  <h3 className="text-xl font-black text-foreground">{item.vertical}</h3>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-orange-100 text-[#F7611E]">{item.metric}</span>
                </div>
                <p className="text-sm text-muted-foreground">{item.angle}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-secondary/40">
        <div className="container mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-black text-foreground mb-4">90-Day Scale Timeline</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A staged campaign roadmap used to move from test traffic to reliable scale with controlled risk.
            </p>
          </motion.div>

          <div className="space-y-4">
            {ADVERTISER_TIMELINE.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -24 : 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45 }}
                className="bg-white border border-border rounded-2xl p-6 flex flex-col md:flex-row md:items-center gap-4"
              >
                <div className="text-xs font-bold uppercase tracking-wide text-[#F7611E] bg-orange-50 px-3 py-1 rounded-full w-fit">
                  {item.month}
                </div>
                <div>
                  <h3 className="text-xl font-black text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-black text-foreground mb-4">Growth Plans by Spend Stage</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Select the operating model that fits your current budget and scaling objectives.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
            {ADVERTISER_PLANS.map((plan, idx) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="rounded-2xl border border-border bg-secondary p-6"
              >
                <div className="text-sm font-bold uppercase tracking-wide text-[#F7611E] mb-2">{plan.name}</div>
                <div className="text-lg font-black text-foreground mb-4">{plan.spend}</div>
                <div className="space-y-2">
                  {plan.includes.map((feature) => (
                    <div key={feature} className="text-sm text-muted-foreground bg-white rounded-lg px-3 py-2">
                      {feature}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-secondary/40">
        <div className="container mx-auto px-6 md:px-10 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="text-4xl font-black text-foreground mb-4">Advertiser FAQ</h2>
            <p className="text-muted-foreground">Key details before you launch and scale campaigns.</p>
          </motion.div>

          <div className="space-y-3">
            {ADVERTISER_FAQS.map((item, idx) => (
              <div key={item.q} className="bg-white rounded-2xl border border-border overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <span className="font-semibold text-foreground pr-4">{item.q}</span>
                  <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${openFaq === idx ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 text-sm text-muted-foreground border-t border-border pt-4">{item.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg" />
        <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-5">Ready to Launch Your Next Winning Campaign?</h2>
            <p className="text-white/85 text-lg mb-8 max-w-2xl mx-auto">
              Open your advertiser account, set up your first campaign, and get high-quality traffic flowing in minutes.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="https://monetize.adomobi.com/signup" className="bg-white text-[#F7611E] font-black px-8 sm:px-10 py-4 rounded-full hover:shadow-2xl transition-all inline-flex items-center justify-center gap-2">
                Create Account <ArrowRight className="w-4 h-4" />
              </a>
              <a href="https://monetize.adomobi.com/" className="border-2 border-white/40 text-white font-bold px-8 sm:px-10 py-4 rounded-full hover:bg-white/15 transition-all">
                Sign In
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
