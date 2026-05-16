import React, { useState, useEffect, useRef } from "react";
import { setPageMeta } from "@/lib/seo";
import { Link } from "wouter";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { adminListBlogs, normalizeBlogCards, type CmsBlogCard } from "@/lib/cms-api";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Globe,
  Image as ImageIcon,
  Layers,
  LayoutTemplate,
  MessageSquare,
  MousePointerClick,
  PlaySquare,
  ShieldCheck,
  Smartphone,
  Star,
  TrendingUp,
  Users,
  Video,
  Zap,
  Twitter,
  Linkedin,
  Facebook,
  Instagram,
  Menu,
  X,
  Target,
  Cpu,
  DollarSign,
  Award,
  BookOpen,
  Heart,
  Dices,
  Gamepad2,
  Coins,
  ShoppingBag,
  Pill,
  MonitorPlay,
  Building2,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Play,
  PieChart,
  Activity,
  Eye,
  Clock,
  Lock,
  RefreshCw
} from "lucide-react";

const HOME_META = {
  title: "AdoMobi DSP | Global Performance Marketing & Premium Traffic",
  description:
    "Run high-converting CPI, CPM, CPC & CPA campaigns with premium global traffic for Nutra, iGaming, Crypto, Betting, Dating & Finance.",
} as const;

// ── Animated Counter ───────────────────────────────────────────────────────────
const AnimatedCounter = ({ end, suffix = "", duration = 2 }: { end: number; suffix?: string; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;
    let startTime: number | null = null;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(ease * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView, end, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

// ── Hero ───────────────────────────────────────────────────────────────────────
const Hero = () => {
  return (
    <section className="relative pt-32 pb-0 md:pt-44 overflow-hidden bg-background">
      <div className="absolute top-0 right-0 w-[900px] h-[900px] bg-orange-500/6 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-red-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />

      <div className="container mx-auto px-6 md:px-10 relative z-10">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">

          {/* Badge (mimics attached image style) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-black tracking-tight leading-[1.05] text-foreground mb-6"
          >
            Best Global Traffic Source
<br />
            Built for <span className="gradient-text">Performance</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-2xl text-muted-foreground mb-10 max-w-2xl leading-relaxed"
          >
            Connect with 3,000+ premium publishers worldwide. Drive real results through self-serve campaigns, precision targeting, and real-time bidding technology.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 mb-6"
          >
            <Link
              href="/start"
              data-testid="button-hero-start"
              className="w-full sm:w-auto gradient-bg text-white text-lg font-bold px-10 py-4 rounded-full hover:shadow-2xl hover:shadow-orange-500/30 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              Start for Free <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/ad-formats"
              data-testid="button-hero-formats"
              className="w-full sm:w-auto bg-transparent text-foreground border-2 border-border text-lg font-semibold px-10 py-4 rounded-full hover:border-[#F7611E] hover:text-[#F7611E] transition-all flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5" /> See Ad Formats
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-sm text-muted-foreground"
          >
            No setup fee. Instant access. 190+ countries.
          </motion.p>
        </div>

        {/* Dashboard preview */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 relative max-w-6xl mx-auto"
        >
          <div className="rounded-t-2xl bg-white border border-border border-b-0 shadow-[0_-20px_80px_rgba(247,97,30,0.12)] overflow-hidden">
            {/* Browser chrome */}
            <div className="bg-secondary border-b border-border px-4 py-3 flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 bg-white rounded-md px-3 py-1 text-xs text-muted-foreground font-mono border border-border">
                dsp.adomobi.com/dashboard
              </div>
            </div>

            {/* Dashboard content */}
            <div className="p-6 bg-[#fafafa] min-h-[320px]">
              <div className="grid grid-cols-4 gap-4 mb-6">
                {[
                  { label: "Total Impressions", value: "10.5M", change: "+18.2%", color: "text-green-600" },
                  { label: "Clicks Today", value: "482K", change: "+9.4%", color: "text-green-600" },
                  { label: "Avg CPM", value: "$1.34", change: "-2.1%", color: "text-red-500" },
                  { label: "Active Campaigns", value: "47", change: "+3", color: "text-green-600" },
                ].map((s, i) => (
                  <div key={i} className="bg-white rounded-xl border border-border p-4">
                    <div className="text-xs text-muted-foreground mb-1">{s.label}</div>
                    <div className="text-2xl font-black text-foreground">{s.value}</div>
                    <div className={`text-xs font-semibold mt-1 ${s.color}`}>{s.change}</div>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-xl border border-border p-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-bold">Campaign Performance</span>
                  <span className="text-xs text-muted-foreground">Last 7 days</span>
                </div>
                <div className="flex items-end gap-2 h-24">
                  {[45, 72, 55, 88, 65, 95, 78].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ duration: 0.8, delay: 0.8 + i * 0.08, ease: "easeOut" }}
                      className="flex-1 rounded-t-sm"
                      style={{ background: `linear-gradient(to top, #F7611E, #EF3040)`, opacity: 0.75 + i * 0.03 }}
                    />
                  ))}
                </div>
                <div className="flex justify-between mt-2">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(d => (
                    <span key={d} className="text-[10px] text-muted-foreground flex-1 text-center">{d}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ── Stats Bar ──────────────────────────────────────────────────────────────────
const Stats = () => {
  const stats = [
    { label: "Impressions Monthly", value: 35, suffix: "M+", icon: Eye },
    { label: "Publishers", value: 3000, suffix: "+", icon: LayoutTemplate },
    { label: "Advertisers", value: 1000, suffix: "+", icon: Users },
    { label: "Countries", value: 190, suffix: "+", icon: Globe },
    { label: "Ad Formats", value: 12, suffix: "", icon: Layers },
    { label: "Avg Response Time", value: 42, suffix: "ms", icon: Zap },
  ];

  return (
    <section className="py-16 bg-white border-y border-border" data-testid="section-stats">
      <div className="container mx-auto px-6 md:px-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 divide-y md:divide-y-0 md:divide-x divide-border">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="flex flex-col items-center text-center pt-6 md:pt-0 first:pt-0"
            >
              <stat.icon className="w-5 h-5 text-[#F7611E] mb-2" />
              <div className="text-2xl md:text-3xl font-black text-[#F7611E]">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wide font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── Verticals ──────────────────────────────────────────────────────────────────
const Verticals = () => {
  const verticals = [
    { icon: Heart, label: "Dating", color: "bg-rose-50", iconColor: "text-rose-500", impressions: "50M+", cpm: "$0.8–4.5" },
    { icon: MonitorPlay, label: "WebCams", color: "bg-purple-50", iconColor: "text-purple-500", impressions: "20M+", cpm: "$1.2–6.0" },
    { icon: Dices, label: "Casino", color: "bg-yellow-50", iconColor: "text-yellow-600", impressions: "10M+", cpm: "$2.0–8.0" },
    { icon: Coins, label: "Crypto", color: "bg-orange-50", iconColor: "text-orange-500", impressions: "5M+", cpm: "$1.5–7.0" },
    { icon: Pill, label: "Nutra", color: "bg-green-50", iconColor: "text-green-500", impressions: "10M+", cpm: "$0.5–3.5" },
    { icon: Gamepad2, label: "Gaming", color: "bg-blue-50", iconColor: "text-blue-500", impressions: "20M+", cpm: "$0.6–3.0" },
    { icon: ShoppingBag, label: "E-commerce", color: "bg-teal-50", iconColor: "text-teal-500", impressions: "15M+", cpm: "$0.4–2.5" },
    { icon: Building2, label: "Finance", color: "bg-indigo-50", iconColor: "text-indigo-500", impressions: "5M+", cpm: "$1.0–5.0" },
  ];

  return (
    <section id="verticals" className="py-24 bg-secondary/60" data-testid="section-verticals">
      <div className="container mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block text-xs font-bold text-[#F7611E] uppercase tracking-widest mb-4 bg-orange-50 px-4 py-1.5 rounded-full">Content Verticals</span>
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-5">
            Traffic for Every <span className="gradient-text">Vertical</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            From mainstream to niche — access premium audiences across the most profitable content verticals globally.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
          {verticals.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-white rounded-2xl border border-border p-6 cursor-pointer hover:shadow-xl hover:border-[#F7611E]/30 transition-all group"
              data-testid={`card-vertical-${v.label.toLowerCase()}`}
            >
              <div className={`w-12 h-12 rounded-xl ${v.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <v.icon className={`w-6 h-6 ${v.iconColor}`} />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-3">{v.label}</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Monthly traffic</span>
                  <span className="font-semibold text-foreground">{v.impressions}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">CPM range</span>
                  <span className="font-semibold gradient-text">{v.cpm}</span>
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm font-semibold text-[#F7611E] opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0 duration-200">
                Explore <ChevronRight className="w-4 h-4 ml-1" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── Ad Formats ─────────────────────────────────────────────────────────────────
const AdFormats = () => {
  const [active, setActive] = useState(0);

  const formats = [
    {
      title: "Push Notifications",
      icon: MessageSquare,
      tag: "Most Popular",
      desc: "Deliver ads directly to user devices as native-looking push messages. Works on all major browsers with no app install required.",
      features: ["100% viewability", "Opt-in audience only", "Desktop & mobile", "Rich media support"],
      stat: "18% avg CTR",
    },
    {
      title: "Native Ads",
      icon: LayoutTemplate,
      tag: "High Engagement",
      desc: "Non-intrusive ad blocks that seamlessly blend with publisher content, delivering high engagement and excellent user experience.",
      features: ["Blends with content", "High CTR", "Anti-adblock immune", "Smart recommendation"],
      stat: "3× better CTR",
    },
    {
      title: "Popunder",
      icon: MousePointerClick,
      tag: "High Volume",
      desc: "Full-page ads opening behind the active browser window. Extremely high volume, excellent for mass-market offers.",
      features: ["Massive reach", "100% viewability", "All GEOs covered", "Smart frequency caps"],
      stat: "35M+ monthly volume",
    },
    {
      title: "Display Banners",
      icon: ImageIcon,
      tag: "IAB Standard",
      desc: "Classic standard banner sizes across all IAB formats. High fill rates with global inventory coverage.",
      features: ["All IAB sizes", "Animated HTML5", "Video banners", "High fill rate"],
      stat: "98% fill rate",
    },
    {
      title: "Video Ads",
      icon: Video,
      tag: "Premium",
      desc: "Engaging in-stream and outstream video placements. Pre-roll, mid-roll, and outstream for maximum brand impact.",
      features: ["Pre & mid-roll", "Outstream", "Rewarded video", "VAST/VPAID support"],
      stat: "74% completion rate",
    },
    {
      title: "Interstitials",
      icon: Smartphone,
      tag: "High Impact",
      desc: "Full-screen immersive ads shown at natural transition points. Perfect for mobile gaming and app environments.",
      features: ["Full-screen impact", "Mobile-first", "Rich media", "Natural transitions"],
      stat: "12% avg CTR",
    },
  ];

  const f = formats[active];

  return (
    <section id="ad-formats" className="py-24 bg-background" data-testid="section-ad-formats">
      <div className="container mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block text-xs font-bold text-[#F7611E] uppercase tracking-widest mb-4 bg-orange-50 px-4 py-1.5 rounded-full">Ad Formats</span>
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-5">
            High-Impact <span className="gradient-text">Ad Formats</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Six proven formats to reach your audience at every stage of the funnel.
          </p>
        </motion.div>

        {/* Format tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {formats.map((fmt, i) => (
            <button
              key={i}
              data-testid={`button-format-${fmt.title.toLowerCase().replace(/\s/g, "-")}`}
              onClick={() => setActive(i)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border-2 transition-all ${
                active === i
                  ? "gradient-bg text-white border-transparent shadow-lg shadow-orange-500/25"
                  : "border-border text-muted-foreground hover:border-[#F7611E] hover:text-foreground bg-white"
              }`}
            >
              <fmt.icon className="w-4 h-4" /> {fmt.title}
            </button>
          ))}
        </div>

        {/* Format detail */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-5xl mx-auto bg-white rounded-3xl border border-border shadow-xl overflow-hidden"
          >
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 p-10">
                <span className="inline-block text-xs font-bold text-[#F7611E] bg-orange-50 px-3 py-1 rounded-full mb-5">{f.tag}</span>
                <h3 className="text-3xl font-black text-foreground mb-4">{f.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-8">{f.desc}</p>
                <ul className="space-y-3 mb-8">
                  {f.features.map((feat, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm">
                      <CheckCircle2 className="w-5 h-5 text-[#F7611E] flex-shrink-0" />
                      <span className="text-foreground font-medium">{feat}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/start" className="inline-flex items-center gap-2 gradient-bg text-white font-semibold px-7 py-3 rounded-full hover:shadow-lg transition-all">
                  Launch Campaign <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="md:w-1/2 bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-10 border-l border-border">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto rounded-3xl gradient-bg flex items-center justify-center mb-6 shadow-2xl shadow-orange-500/30">
                    <f.icon className="w-12 h-12 text-white" />
                  </div>
                  <div className="text-4xl font-black gradient-text mb-2">{f.stat}</div>
                  <div className="text-sm text-muted-foreground">Platform average</div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

// ── How It Works ───────────────────────────────────────────────────────────────
const HowItWorks = () => {
  const [tab, setTab] = useState<"advertiser" | "publisher">("advertiser");

  const advertiserSteps = [
    { step: "01", title: "Create Account", desc: "Sign up in minutes. No setup fees, instant access to the self-serve platform." },
    { step: "02", title: "Set Up Campaign", desc: "Choose your ad format, target audience by GEO, device, OS, carrier, and set your budget." },
    { step: "03", title: "Launch & Optimize", desc: "Go live instantly. Use real-time stats to optimize bids and creatives for maximum ROI." },
    { step: "04", title: "Scale Profitably", desc: "Increase budgets on winning campaigns with automated rules and dedicated account support." },
  ];

  const publisherSteps = [
    { step: "01", title: "Submit Your Site", desc: "Register and submit your website or app for review. Most approvals happen within 24 hours." },
    { step: "02", title: "Integrate Ad Tags", desc: "Copy-paste our lightweight ad tags into your site. Compatible with any CMS or platform." },
    { step: "03", title: "Start Earning", desc: "Ads go live immediately. Our smart algorithm fills 100% of your inventory at optimal rates." },
    { step: "04", title: "Get Paid On Time", desc: "Receive weekly or monthly payouts via wire, crypto, Paxum, ePayments and more." },
  ];

  const steps = tab === "advertiser" ? advertiserSteps : publisherSteps;

  return (
    <section id="how-it-works" className="py-24 bg-secondary/40" data-testid="section-how-it-works">
      <div className="container mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="inline-block text-xs font-bold text-[#F7611E] uppercase tracking-widest mb-4 bg-orange-50 px-4 py-1.5 rounded-full">How It Works</span>
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-5">
            Start in <span className="gradient-text">4 Simple Steps</span>
          </h2>
        </motion.div>

        {/* Tab toggle */}
        <div className="flex justify-center mb-14">
          <div className="flex bg-white border border-border rounded-full p-1.5 gap-1">
            <button
              data-testid="button-tab-advertiser"
              onClick={() => setTab("advertiser")}
              className={`px-8 py-2.5 rounded-full text-sm font-bold transition-all ${tab === "advertiser" ? "gradient-bg text-white shadow-md" : "text-muted-foreground hover:text-foreground"}`}
            >
              I'm an Advertiser
            </button>
            <button
              data-testid="button-tab-publisher"
              onClick={() => setTab("publisher")}
              className={`px-8 py-2.5 rounded-full text-sm font-bold transition-all ${tab === "publisher" ? "gradient-bg text-white shadow-md" : "text-muted-foreground hover:text-foreground"}`}
            >
              I'm a Publisher
            </button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* connecting line */}
          <div className="hidden md:block absolute top-10 left-[10%] right-[10%] h-0.5 bg-border z-0" />

          <div className="grid md:grid-cols-4 gap-8 relative z-10">
            <AnimatePresence mode="wait">
              {steps.map((s, i) => (
                <motion.div
                  key={`${tab}-${i}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.08 }}
                  className="flex flex-col items-center text-center"
                  data-testid={`step-${tab}-${i}`}
                >
                  <div className="w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-orange-500/25 mb-5 relative">
                    {s.step}
                  </div>
                  <h4 className="text-lg font-bold text-foreground mb-2">{s.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

// ── Platform Features ──────────────────────────────────────────────────────────
const PlatformFeatures = () => {
  const features = [
    { icon: Zap, title: "Real-Time Bidding (RTB)", desc: "Millisecond auction engine ensuring optimal pricing on every single impression." },
    { icon: Target, title: "Granular Targeting", desc: "Target by GEO, city, device, OS, browser, carrier, ISP, language, day-parting and more." },
    { icon: ShieldCheck, title: "Anti-Fraud Technology", desc: "Proprietary AI-driven system that blocks bots and fraudulent traffic before it reaches your campaigns." },
    { icon: Activity, title: "Real-Time Analytics", desc: "Live campaign stats with deep-dive reporting, custom columns, and API data export." },
    { icon: RefreshCw, title: "Auto-Optimization", desc: "Rule-based auto-bidding and automatic creative rotation to maximize your KPIs." },
    { icon: Lock, title: "Brand Safety", desc: "Multi-layer content verification and brand safety controls for all ad placements." },
  ];

  return (
    <section id="platform" className="py-24 bg-background" data-testid="section-platform">
      <div className="container mx-auto px-6 md:px-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Left: visual */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2"
          >
            <div className="bg-white rounded-3xl border border-border shadow-xl p-6 relative">
              <div className="flex items-center justify-between mb-5 pb-4 border-b border-border">
                <div className="font-bold text-base">Live RTB Auction Feed</div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs text-green-600 font-semibold">Live</span>
                </div>
              </div>

              <div className="space-y-3 mb-5">
                {[
                  { geo: "🇺🇸 US", format: "Push", bid: "$1.82", status: "Won", bg: "bg-green-50", col: "text-green-700" },
                  { geo: "🇩🇪 DE", format: "Native", bid: "$2.41", status: "Won", bg: "bg-green-50", col: "text-green-700" },
                  { geo: "🇬🇧 UK", format: "Banner", bid: "$0.94", status: "Lost", bg: "bg-red-50", col: "text-red-600" },
                  { geo: "🇧🇷 BR", format: "Popunder", bid: "$0.38", status: "Won", bg: "bg-green-50", col: "text-green-700" },
                  { geo: "🇫🇷 FR", format: "Video", bid: "$3.20", status: "Won", bg: "bg-green-50", col: "text-green-700" },
                ].map((row, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex items-center justify-between text-sm bg-secondary/50 rounded-lg px-4 py-2.5"
                  >
                    <span className="font-medium w-20">{row.geo}</span>
                    <span className="text-muted-foreground w-16">{row.format}</span>
                    <span className="font-bold text-foreground w-14">{row.bid}</span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${row.bg} ${row.col}`}>{row.status}</span>
                  </motion.div>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Win Rate", value: "78.4%" },
                  { label: "Avg Bid", value: "$1.75" },
                  { label: "Auctions/sec", value: "4.2M" },
                ].map((m, i) => (
                  <div key={i} className="bg-secondary rounded-xl p-3 text-center">
                    <div className="text-xs text-muted-foreground mb-1">{m.label}</div>
                    <div className="font-black text-foreground">{m.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: features */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2"
          >
            <span className="inline-block text-xs font-bold text-[#F7611E] uppercase tracking-widest mb-4 bg-orange-50 px-4 py-1.5 rounded-full">Platform</span>
            <h2 className="text-4xl md:text-5xl font-black text-foreground mb-5">
              Built for <span className="gradient-text">Performance</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-10">
              Every feature in AdoMobi is engineered to help you squeeze the maximum ROI out of every impression and click.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {features.map((feat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex gap-4 p-4 rounded-2xl hover:bg-secondary transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center flex-shrink-0">
                    <feat.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1 text-sm">{feat.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{feat.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Link href="/platform" className="mt-10 inline-flex items-center gap-2 gradient-bg text-white font-bold px-8 py-3.5 rounded-full hover:shadow-xl hover:shadow-orange-500/30 transition-all">
              Explore the Platform <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ── Technology ─────────────────────────────────────────────────────────────────
const Technology = () => {
  const nodes = Array.from({ length: 24 });

  return (
    <section id="technology" className="py-24 bg-[#0f0a0a] relative overflow-hidden text-white" data-testid="section-technology">
      {/* Animated network background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {nodes.map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full pulse-node"
            style={{
              background: `linear-gradient(135deg, #F7611E, #EF3040)`,
              top: `${(i * 17 + 5) % 100}%`,
              left: `${(i * 23 + 10) % 100}%`,
              animationDelay: `${(i * 0.3) % 2}s`,
              opacity: 0.4,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 md:px-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block text-xs font-bold text-[#F7611E] uppercase tracking-widest mb-4 bg-white/10 px-4 py-1.5 rounded-full">Infrastructure</span>
          <h2 className="text-4xl md:text-5xl font-black mb-5">
            Massive Scale.<br /><span className="gradient-text">Zero Latency.</span>
          </h2>
          <p className="text-lg text-gray-400">
            A globally distributed infrastructure designed for billions of daily requests, built with redundancy at every layer.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { value: "<42ms", label: "Response Time", sub: "Global avg bid response" },
            { value: "99.99%", label: "Uptime SLA", sub: "Enterprise-grade reliability" },
            { value: "5", label: "Data Centers", sub: "Across 5 continents" },
            { value: "4.2M", label: "Auctions/Second", sub: "Peak processing capacity" },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur hover:bg-white/10 transition-colors"
            >
              <div className="text-4xl font-black gradient-text mb-2">{s.value}</div>
              <div className="text-white font-bold mb-1">{s.label}</div>
              <div className="text-gray-500 text-xs">{s.sub}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: ShieldCheck, title: "Anti-Fraud Protection", desc: "Multi-layer bot detection and traffic quality scoring blocks invalid traffic before it impacts your campaigns." },
            { icon: Cpu, title: "AI-Powered Optimization", desc: "Machine learning algorithms automatically adjust bids, targeting, and creative rotations in real time." },
            { icon: PieChart, title: "Full Transparency", desc: "Complete visibility into every impression, click, and conversion. No black boxes, no hidden margins." },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-4 p-6 rounded-2xl border border-white/10 bg-white/5"
            >
              <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center flex-shrink-0">
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-white mb-2">{item.title}</h4>
                <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── Why Us ─────────────────────────────────────────────────────────────────────
const WhyUs = () => {
  const points = [
    { icon: DollarSign, title: "Competitive CPMs", desc: "Access top-tier global inventory at fair market rates. Volume buyers get custom discounts." },
    { icon: Globe, title: "190+ Countries", desc: "Run campaigns or monetize traffic in every major market including Tier 1, Tier 2, and Tier 3 GEOs." },
    { icon: Clock, title: "24/7 Expert Support", desc: "Dedicated account managers available around the clock to help you hit your KPIs." },
    { icon: Award, title: "Top Payouts for Publishers", desc: "Industry-leading revenue share with weekly payouts and flexible payment methods." },
    { icon: Layers, title: "Multi-Format", desc: "Six ad formats in one platform. Mix and match for your specific use case and audience." },
    { icon: BarChart3, title: "Advanced Reporting", desc: "Deep granular reporting with custom date ranges, column builders, and API export." },
  ];

  return (
    <section id="why-us" className="py-24 bg-white" data-testid="section-why-us">
      <div className="container mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block text-xs font-bold text-[#F7611E] uppercase tracking-widest mb-4 bg-orange-50 px-4 py-1.5 rounded-full">Why AdoMobi</span>
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-5">
            Everything You Need <span className="gradient-text">in One Place</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            A full-stack performance advertising platform trusted by thousands of advertisers and publishers worldwide.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {points.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              className="flex gap-5 p-6 rounded-2xl border border-border hover:border-[#F7611E]/30 hover:shadow-lg transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-orange-50 group-hover:gradient-bg flex items-center justify-center flex-shrink-0 transition-all">
                <p.icon className="w-6 h-6 text-[#F7611E] group-hover:text-white transition-colors" />
              </div>
              <div>
                <h4 className="font-bold text-foreground mb-2">{p.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── Testimonials ───────────────────────────────────────────────────────────────
const Testimonials = () => {
  const reviews = [
    {
      name: "Marcus W.", role: "Media Buyer, PerformAds Agency", initials: "MW",
      quote: "AdoMobi has been our go-to push traffic source for two years. The volume is massive, fraud rates are minimal, and the support team actually knows their stuff.",
      stars: 5,
    },
    {
      name: "Elena K.", role: "Head of Monetization, WebMedia Group", initials: "EK",
      quote: "We switched from three different networks to AdoMobi and our RPM went up 40%. The fill rates are incredible and payments are always on time.",
      stars: 5,
    },
    {
      name: "David L.", role: "Affiliate Manager, DigitalFlow", initials: "DL",
      quote: "The targeting capabilities are unmatched. We can drill down to ISP level, which makes all the difference for our mobile subscription offers.",
      stars: 5,
    },
    {
      name: "Sarah T.", role: "Performance Director, AdScale Inc.", initials: "ST",
      quote: "The RTB platform is rock solid. We process millions in monthly spend through AdoMobi and the transparency in reporting gives us full confidence.",
      stars: 5,
    },
  ];

  return (
    <section id="testimonials" className="py-24 bg-secondary/50" data-testid="section-testimonials">
      <div className="container mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block text-xs font-bold text-[#F7611E] uppercase tracking-widest mb-4 bg-orange-50 px-4 py-1.5 rounded-full">Testimonials</span>
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-5">
            Trusted by <span className="gradient-text">1,000+ Teams</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl border border-border p-6 hover:shadow-xl hover:border-[#F7611E]/20 transition-all"
              data-testid={`card-testimonial-${i}`}
            >
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: r.stars }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-[#F7611E] fill-[#F7611E]" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6 italic">"{r.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-white font-bold text-sm">
                  {r.initials}
                </div>
                <div>
                  <div className="text-sm font-bold text-foreground">{r.name}</div>
                  <div className="text-xs text-muted-foreground">{r.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── Partners ───────────────────────────────────────────────────────────────────
const Partners = () => {
  const logos = [
    "Google", "Amazon", "Microsoft", "Cisco", "Intel",
    "IBM", "Oracle", "Tencent", "Salesforce", "Meta",
    "Shopify", "HubSpot", "Twilio", "Cloudflare", "Akamai",
  ];

  return (
    <section className="py-14 bg-white border-b border-border overflow-hidden" data-testid="section-partners">
      <div className="container mx-auto px-6 mb-8 text-center">
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Integrated with the world's leading platforms</p>
      </div>
      <div className="marquee-container">
        <div className="marquee-content items-center">
          {logos.map((name, i) => (
            <div key={i} className="flex items-center px-8 text-gray-300 hover:text-gray-500 transition-colors">
              <span className="text-xl font-black tracking-tight">{name}</span>
            </div>
          ))}
        </div>
        <div className="marquee-content items-center" aria-hidden="true">
          {logos.map((name, i) => (
            <div key={i} className="flex items-center px-8 text-gray-300 hover:text-gray-500 transition-colors">
              <span className="text-xl font-black tracking-tight">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── Blog ───────────────────────────────────────────────────────────────────────
const Blog = () => {
  const fallbackPosts: CmsBlogCard[] = [
    {
      tag: "Guides",
      featured: true,
      title: "How to Scale Push Traffic Campaigns to 7-Figures",
      desc: "A step-by-step breakdown of the exact bidding strategy, creative rotation, and optimization rules used by our top advertisers.",
      readTime: "8 min read",
      date: "May 12, 2026",
      author: "AdoMobi Team",
      authorRole: "Blog",
      slug: "how-to-scale-push-traffic-campaigns-to-7-figures",
    },
    {
      tag: "Industry",
      featured: false,
      title: "The State of Programmatic Advertising in 2026",
      desc: "New data on CPM trends, format performance, and geographic growth from AdoMobi' own platform insights.",
      readTime: "6 min read",
      date: "May 8, 2026",
      author: "AdoMobi Team",
      authorRole: "Blog",
      slug: "the-state-of-programmatic-advertising-in-2026",
    },
    {
      tag: "Tips",
      featured: false,
      title: "Publisher Revenue Guide: Maximizing RPM with Multiple Ad Formats",
      desc: "Which format combinations deliver the highest eCPM for different content types? We analyzed 1,000+ publisher accounts to find out.",
      readTime: "10 min read",
      date: "April 30, 2026",
      author: "AdoMobi Team",
      authorRole: "Blog",
      slug: "publisher-revenue-guide-maximizing-rpm-with-multiple-ad-formats",
    },
  ];

  const [posts, setPosts] = useState<CmsBlogCard[]>(fallbackPosts);

  useEffect(() => {
    let cancelled = false;

    adminListBlogs({
      page: 1,
      search: "",
      category: "",
      websiteName: "AdoMobi",
      location: "Global",
    })
      .then((payload) => {
        if (cancelled) return;
        setPosts(normalizeBlogCards(payload, fallbackPosts).slice(0, 3));
      })
      .catch(() => {
        if (!cancelled) setPosts(fallbackPosts);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="blog" className="py-24 bg-background" data-testid="section-blog">
      <div className="container mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <span className="inline-block text-xs font-bold text-[#F7611E] uppercase tracking-widest mb-4 bg-orange-50 px-4 py-1.5 rounded-full">Blog</span>
            <h2 className="text-4xl md:text-5xl font-black text-foreground">
              Latest <span className="gradient-text">Insights</span>
            </h2>
          </div>
          <Link href="/blog" className="hidden md:flex items-center gap-2 text-sm font-semibold text-[#F7611E] hover:gap-3 transition-all">
            View all posts <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-7">
          {posts.map((post, i) => (
            <motion.a
              key={i}
              href="/blog"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:border-[#F7611E]/20 transition-all group block"
              data-testid={`card-blog-${i}`}
            >
              <div className="aspect-[16/9] bg-gradient-to-br from-orange-50 to-red-50 relative overflow-hidden flex items-center justify-center">
                <div className="w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center opacity-40 group-hover:opacity-70 transition-opacity">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="p-6">
                <span className="inline-block text-xs font-bold text-[#F7611E] bg-orange-50 px-3 py-1 rounded-full mb-3">{post.tag}</span>
                <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-[#F7611E] transition-colors line-clamp-2">{post.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">{post.desc}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── CTA ────────────────────────────────────────────────────────────────────────
const CTA = () => (
  <section id="start" className="py-28 relative overflow-hidden" data-testid="section-cta">
    <div className="absolute inset-0 gradient-bg" />
    <div className="absolute inset-0">
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white/5"
          style={{
            width: `${(i % 5) * 40 + 40}px`,
            height: `${(i % 5) * 40 + 40}px`,
            top: `${(i * 19 + 5) % 100}%`,
            left: `${(i * 31 + 10) % 100}%`,
            animationDelay: `${i * 0.15}s`,
          }}
        />
      ))}
    </div>

    <div className="container mx-auto px-6 md:px-10 relative z-10 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
          Ready to Scale Your<br />Traffic Revenue?
        </h2>
        <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
          Join 1,000+ advertisers and publishers already growing with AdoMobi.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#signup"
            data-testid="button-cta-signup"
            className="bg-white text-[#F7611E] font-black text-lg px-12 py-4 rounded-full hover:shadow-2xl hover:scale-105 transition-all"
          >
            Start for Free
          </a>
          <a
            href="#contact"
            data-testid="button-cta-contact"
            className="bg-white/15 backdrop-blur text-white font-bold text-lg px-12 py-4 rounded-full border-2 border-white/30 hover:bg-white/25 transition-all"
          >
            Talk to Sales
          </a>
        </div>
        <p className="text-white/60 text-sm mt-6">No credit card required. Setup in 5 minutes.</p>
      </motion.div>
    </div>
  </section>
);

// ── Footer ─────────────────────────────────────────────────────────────────────
// ── Page ───────────────────────────────────────────────────────────────────────
export default function Home() {
  useEffect(() => {
    setPageMeta(HOME_META.title, HOME_META.description);
  }, []);
  return (
    <div className="font-sans antialiased bg-background">
      <Navbar />
      <Hero />
      <Stats />
      <Verticals />
      <AdFormats />
      <HowItWorks />
      <PlatformFeatures />
      <Technology />
      <WhyUs />
      <Testimonials />
      <Partners />
      <Blog />
      <CTA />
      <Footer />
    </div>
  );
}
