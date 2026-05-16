import { useEffect, useState } from "react";
import { Link } from "wouter";
import { AnimatePresence, motion } from "framer-motion";
import { setPageMeta } from "@/lib/seo";
import {
  ArrowRight,
  Banknote,
  BadgeCheck,
  BarChart3,
  Blocks,
  ChevronDown,
  Clock3,
  Globe2,
  HandCoins,
  Layers,
  ShieldCheck,
  TrendingUp,
  Wallet,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const PUBLISHER_META = {
  title: "AdoMobi Publisher Platform | Monetize Website & App Traffic",
  description:
    "Monetize your website and app traffic with AdoMobi Publisher Platform using high CPM ads, real-time bidding, and global advertiser demand.",
} as const;

const METRICS = [
  { value: "100%", label: "Fill Rate Goal", icon: Layers },
  { value: "3,000+", label: "Active Buyers", icon: HandCoins },
  { value: "Weekly", label: "Flexible Payouts", icon: Wallet },
  { value: "190+", label: "Buyer Geos", icon: Globe2 },
];

const BENEFITS = [
  {
    title: "Higher Yield Through Competition",
    desc: "Thousands of active advertisers compete for each qualified impression to maximize your RPM.",
    icon: TrendingUp,
  },
  {
    title: "Fast Integrations",
    desc: "Onboard quickly with straightforward implementation options for web and app inventory.",
    icon: Blocks,
  },
  {
    title: "Quality-Safe Demand",
    desc: "Traffic quality controls and ad review policies protect long-term user experience.",
    icon: ShieldCheck,
  },
  {
    title: "Transparent Reporting",
    desc: "Track revenue, fill, and performance trends with live dashboards and clear breakdowns.",
    icon: BarChart3,
  },
  {
    title: "Flexible Monetization Mix",
    desc: "Use multiple ad formats and optimize by placement to stabilize income across seasons.",
    icon: Banknote,
  },
  {
    title: "Reliable Operations",
    desc: "Dedicated support and regular account guidance help sustain growth without complexity.",
    icon: BadgeCheck,
  },
];

const JOURNEY = [
  {
    title: "Submit Publisher Profile",
    detail: "Share your inventory profile, traffic sources, and preferred ad formats.",
  },
  {
    title: "Integrate & Validate",
    detail: "Complete setup, run quality checks, and verify placement behavior.",
  },
  {
    title: "Go Live at Scale",
    detail: "Open demand across geos and formats while monitoring key yield metrics.",
  },
  {
    title: "Optimize Revenue Loops",
    detail: "Refine floor strategy, traffic segmentation, and placement-level distribution.",
  },
];

const REVENUE_ARCHITECTURE = [
  {
    title: "Placement Segmentation",
    desc: "Group inventory by layout intent and engagement depth to route demand more efficiently.",
    impact: "Stronger fill consistency",
  },
  {
    title: "Format Mix Tuning",
    desc: "Balance push, native, display, and interstitial based on user behavior by traffic source.",
    impact: "Higher blended RPM",
  },
  {
    title: "Floor Logic Strategy",
    desc: "Adjust floor ranges by geo and device to maintain competitive bids without suppressing demand.",
    impact: "Improved bid density",
  },
  {
    title: "Quality Feedback Loop",
    desc: "Use source-level monitoring to quickly remove low-value sessions and preserve buyer confidence.",
    impact: "Better long-term yield",
  },
];

const PAYOUT_MODELS = [
  {
    name: "Weekly Net",
    details: "For consistent traffic operations requiring faster cash rotation.",
    bestFor: "Growth-stage publishers",
  },
  {
    name: "Biweekly Net",
    details: "Balanced option for predictable accounting cycles and stable reconciliation.",
    bestFor: "Mid-sized teams",
  },
  {
    name: "Monthly Net",
    details: "Optimized for enterprise finance workflows and volume-based planning.",
    bestFor: "Large inventory owners",
  },
];

const PUBLISHER_TIMELINE = [
  {
    phase: "Phase 1",
    title: "Inventory Mapping",
    detail: "Classify placements and traffic sources to create a clean baseline before opening full demand.",
  },
  {
    phase: "Phase 2",
    title: "Demand Activation",
    detail: "Enable formats strategically and monitor fill, RPM, and user interaction quality by segment.",
  },
  {
    phase: "Phase 3",
    title: "Yield Optimization",
    detail: "Adjust floor strategy and traffic distribution to improve revenue while maintaining engagement.",
  },
  {
    phase: "Phase 4",
    title: "Scale Operations",
    detail: "Expand coverage across geos and devices with guardrails for quality and payout consistency.",
  },
];

const PUBLISHER_TIERS = [
  {
    name: "Launch",
    volume: "0.5M - 5M impressions / month",
    perks: ["Core demand access", "Dashboard analytics", "Email support"],
  },
  {
    name: "Growth",
    volume: "5M - 30M impressions / month",
    perks: ["Priority optimization support", "Custom floor strategy", "Faster payout options"],
  },
  {
    name: "Enterprise",
    volume: "30M+ impressions / month",
    perks: ["Dedicated success manager", "Advanced reporting", "Custom integration workflow"],
  },
];

const PUBLISHER_FAQS = [
  {
    q: "How long does publisher onboarding usually take?",
    a: "Most publishers complete onboarding quickly after inventory review and integration validation are finished.",
  },
  {
    q: "Can I control where ads appear on my property?",
    a: "Yes. You can control placement-level behavior and tune format distribution for user experience and yield goals.",
  },
  {
    q: "Which payout options are available?",
    a: "Payout cadence can be aligned with your operational model, with options such as weekly, biweekly, and monthly net schedules.",
  },
  {
    q: "Do you support both web and app inventory?",
    a: "Yes. Publishers can monetize across web and app environments with format and traffic controls tailored per channel.",
  },
];

export default function PublisherPage() {
  useEffect(() => {
    setPageMeta(PUBLISHER_META.title, PUBLISHER_META.description);
  }, []);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="font-sans antialiased bg-background">
      <Navbar />

      <section className="pt-28 sm:pt-32 md:pt-36 pb-20 sm:pb-24 relative overflow-hidden bg-background">
        <div className="absolute -top-20 -left-20 w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full bg-red-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -right-16 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full bg-orange-500/10 blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 md:px-10 grid lg:grid-cols-2 gap-8 xl:gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 text-xs font-bold text-[#F7611E] uppercase tracking-wider bg-orange-50 border border-orange-100 px-4 py-2 rounded-full mb-6">
              <HandCoins className="w-4 h-4" /> Publisher Platform
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-foreground leading-tight mb-6">
              Monetize Inventory with
              <br />
              Premium Global Demand
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mb-8">
              Increase yield with competitive bidding, transparent controls, and payout models designed for sustainable publisher growth.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="https://monetize.adomobi.com/signup" className="gradient-bg text-white font-bold px-8 py-3.5 rounded-full hover:shadow-xl hover:shadow-orange-500/30 transition-all inline-flex items-center gap-2">
                Become a Publisher <ArrowRight className="w-4 h-4" />
              </a>
              <Link href="/platform" className="border-2 border-border text-foreground font-semibold px-8 py-3.5 rounded-full hover:border-[#F7611E] hover:text-[#F7611E] transition-all">
                Platform Details
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-3xl border border-border p-6 sm:p-8 shadow-xl"
          >
            <h2 className="text-2xl font-black text-foreground mb-6">Monetization Snapshot</h2>
            <div className="grid grid-cols-2 gap-4">
              {METRICS.map((item, idx) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.4, delay: idx * 0.07 }}
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
                "Publishers with strong placement hygiene and balanced format mix usually see more stable RPM over time."
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
            <h2 className="text-4xl font-black text-foreground mb-4">Why Publishers Choose AdoMobi</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Revenue-focused tools with performance visibility, safer demand quality, and operational support that scales.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {BENEFITS.map((benefit, idx) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: idx * 0.06 }}
                className="bg-white rounded-2xl border border-border p-6 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="w-11 h-11 rounded-xl gradient-bg flex items-center justify-center mb-4">
                  <benefit.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-black text-foreground mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{benefit.desc}</p>
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
            <h2 className="text-4xl font-black text-foreground mb-5">Publisher Growth Journey</h2>
            <p className="text-muted-foreground mb-8 max-w-xl">
              Structured onboarding and iterative optimization help publishers improve yield without sacrificing user trust.
            </p>
            <div className="space-y-4">
              {JOURNEY.map((step, idx) => (
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
            <h3 className="text-2xl font-black mb-6">Publisher Outcomes</h3>
            <div className="space-y-5">
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 text-orange-300 text-sm font-semibold mb-2">
                  <TrendingUp className="w-4 h-4" /> News Inventory
                </div>
                <p className="text-sm text-white/85">"By segmenting traffic and adjusting format mix, we improved blended RPM by 27% in 6 weeks."</p>
              </div>
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 text-orange-300 text-sm font-semibold mb-2">
                  <Clock3 className="w-4 h-4" /> App Monetization
                </div>
                <p className="text-sm text-white/85">"Fast support and stable demand helped us sustain fill rate during seasonal demand swings."</p>
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
            <h2 className="text-4xl font-black text-foreground mb-4">Revenue Architecture That Scales</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Build a resilient monetization system with cleaner segmentation, smarter format allocation, and rapid optimization cycles.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5">
            {REVENUE_ARCHITECTURE.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.4, delay: idx * 0.07 }}
                className="bg-white rounded-2xl border border-border p-6 shadow-sm"
              >
                <h3 className="text-xl font-black text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{item.desc}</p>
                <span className="inline-flex text-xs font-bold px-3 py-1 rounded-full bg-orange-100 text-[#F7611E]">
                  {item.impact}
                </span>
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
            <h2 className="text-4xl font-black text-foreground mb-4">Flexible Payout Models</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose a cadence that matches your operations while keeping monetization planning predictable.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
            {PAYOUT_MODELS.map((item, idx) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="rounded-2xl border border-border bg-secondary p-6"
              >
                <div className="text-sm font-bold uppercase tracking-wide text-[#F7611E] mb-2">{item.name}</div>
                <p className="text-sm text-muted-foreground mb-4">{item.details}</p>
                <div className="text-sm font-semibold text-foreground">Best for: {item.bestFor}</div>
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
            <h2 className="text-4xl font-black text-foreground mb-4">Publisher Scale Timeline</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A practical rollout sequence to move from onboarding to stable, high-quality revenue growth.
            </p>
          </motion.div>

          <div className="space-y-4">
            {PUBLISHER_TIMELINE.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -24 : 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45 }}
                className="bg-white border border-border rounded-2xl p-6 flex flex-col md:flex-row md:items-center gap-4"
              >
                <div className="text-xs font-bold uppercase tracking-wide text-[#F7611E] bg-orange-50 px-3 py-1 rounded-full w-fit">
                  {item.phase}
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
            <h2 className="text-4xl font-black text-foreground mb-4">Publisher Tiers</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose the right operating tier based on inventory scale and monetization maturity.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
            {PUBLISHER_TIERS.map((tier, idx) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="rounded-2xl border border-border bg-secondary p-6"
              >
                <div className="text-sm font-bold uppercase tracking-wide text-[#F7611E] mb-2">{tier.name}</div>
                <div className="text-lg font-black text-foreground mb-4">{tier.volume}</div>
                <div className="space-y-2">
                  {tier.perks.map((perk) => (
                    <div key={perk} className="text-sm text-muted-foreground bg-white rounded-lg px-3 py-2">
                      {perk}
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
            <h2 className="text-4xl font-black text-foreground mb-4">Publisher FAQ</h2>
            <p className="text-muted-foreground">Answers to common onboarding, payout, and quality questions.</p>
          </motion.div>

          <div className="space-y-3">
            {PUBLISHER_FAQS.map((item, idx) => (
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
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-5">Turn Your Traffic Into Predictable Revenue</h2>
            <p className="text-white/85 text-lg mb-8 max-w-2xl mx-auto">
              Start onboarding today and unlock premium advertiser demand with transparent controls and payout flexibility.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="https://monetize.adomobi.com/signup" className="bg-white text-[#F7611E] font-black px-8 sm:px-10 py-4 rounded-full hover:shadow-2xl transition-all inline-flex items-center justify-center gap-2">
                Join as Publisher <ArrowRight className="w-4 h-4" />
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
