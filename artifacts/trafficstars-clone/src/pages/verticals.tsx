import React, { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  Heart, MonitorPlay, Dices, Coins, Pill, Gamepad2, ShoppingBag, Building2,
  ArrowRight, CheckCircle2, TrendingUp, Globe, Users, DollarSign, ChevronRight
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { setPageMeta } from "@/lib/seo";

const VERTICALS_META = {
  title: "Advertising Verticals | Nutra, iGaming, Crypto & Dating Traffic",
  description:
    "Premium global traffic for Nutra, iGaming, Betting, Crypto, Dating, Finance & VOD campaigns with CPI, CPM, CPC & CPA solutions.",
} as const;

const ALL_VERTICALS = [
  {
    icon: Heart,
    label: "Dating",
    color: "bg-rose-50",
    iconColor: "text-rose-500",
    gradientFrom: "#ff6b8a",
    gradientTo: "#ff4757",
    impressions: "80B+",
    cpm: "$0.8–4.5",
    countries: "190+",
    convRate: "4.2%",
    desc: "The dating vertical remains one of the highest-converting niches in performance marketing. AdoMobi delivers premium dating traffic across all major GEOs with deep targeting options to match users at every stage of the funnel.",
    formats: ["Push Notifications", "Native Ads", "Display Banners", "Popunders"],
    topGeos: ["US", "UK", "DE", "FR", "AU", "CA"],
    tips: [
      "Use creatives featuring real people for higher CTR",
      "Target Tier 1 GEOs for maximum CPL",
      "Mobile-first creatives convert 2× better",
      "Evening hours (6 PM–12 AM) peak for dating offers",
    ],
  },
  {
    icon: MonitorPlay,
    label: "WebCams",
    color: "bg-purple-50",
    iconColor: "text-purple-500",
    gradientFrom: "#a855f7",
    gradientTo: "#7c3aed",
    impressions: "45B+",
    cpm: "$1.2–6.0",
    countries: "120+",
    convRate: "3.8%",
    desc: "Live cam and streaming platforms thrive with AdoMobi' premium adult-friendly traffic. High intent audiences, multiple billing models (PPV, subscription, tokens), and specialized formats for this niche.",
    formats: ["Popunders", "Push Notifications", "Native Ads", "Interstitials"],
    topGeos: ["US", "DE", "UK", "IT", "ES", "NL"],
    tips: [
      "Popunders deliver the best volume for cam sites",
      "Token/freemium models convert better than hard paywalls",
      "Weekend traffic shows 30% higher engagement",
      "Split-test multiple preview thumbnails",
    ],
  },
  {
    icon: Dices,
    label: "IGaming",
    color: "bg-yellow-50",
    iconColor: "text-yellow-600",
    gradientFrom: "#f59e0b",
    gradientTo: "#d97706",
    impressions: "60B+",
    cpm: "$2.0–8.0",
    countries: "85+",
    convRate: "5.1%",
    desc: "iGaming is one of the highest-value verticals in digital advertising. From casino slots to sports betting and poker, AdoMobi connects you with regulated-market traffic in licensed GEOs worldwide.",
    formats: ["Native Ads", "Display Banners", "Push Notifications", "Video Ads"],
    topGeos: ["CA", "NZ", "NO", "DE", "AT", "FI"],
    tips: [
      "Always confirm GEO licensing before running",
      "Free spins / welcome bonus creatives outperform generic ads",
      "Native ads blend best for casino content",
      "Exclude regulated markets without proper licensing",
    ],
  },
  {
    icon: Coins,
    label: "Forex",
    color: "bg-orange-50",
    iconColor: "text-orange-500",
    gradientFrom: "#f97316",
    gradientTo: "#ea580c",
    impressions: "30B+",
    cpm: "$1.5–7.0",
    countries: "150+",
    convRate: "3.2%",
    desc: "Forex, crypto, DeFi, and fintech offers reach financially motivated audiences through AdoMobi. Target by income bracket, device, and geographic regulations for compliant campaigns with industry-leading CPMs.",
    formats: ["Native Ads", "Push Notifications", "Display Banners", "Interstitials"],
    topGeos: ["US", "UK", "SG", "AU", "DE", "JP"],
    tips: [
      "Market volatility moments drive massive traffic spikes",
      "Use native ads for regulatory compliance storytelling",
      "Target high-income demographics for Tier 1 ROI",
      "Avoid exaggerated return claims in creatives",
    ],
  },
  {
    icon: Pill,
    label: "Nutra",
    color: "bg-green-50",
    iconColor: "text-green-500",
    gradientFrom: "#22c55e",
    gradientTo: "#16a34a",
    impressions: "50B+",
    cpm: "$0.5–3.5",
    countries: "170+",
    convRate: "6.5%",
    desc: "Health, weight loss, beauty, and supplement offers consistently perform across all GEOs. AdoMobi offers massive volume for nutra campaigns with flexible billing flows — trial, straight sale, and subscription.",
    formats: ["Native Ads", "Display Banners", "Push Notifications", "Popunders"],
    topGeos: ["US", "UK", "AU", "CA", "DE", "FR"],
    tips: [
      "Before/after creatives dramatically boost CTR",
      "Trial offers outperform straight-sale for cold traffic",
      "Native ads create the most trust for health claims",
      "Include social proof elements in landing pages",
    ],
  },
  {
    icon: Gamepad2,
    label: "Gaming",
    color: "bg-blue-50",
    iconColor: "text-blue-500",
    gradientFrom: "#3b82f6",
    gradientTo: "#2563eb",
    impressions: "70B+",
    cpm: "$0.6–3.0",
    countries: "180+",
    convRate: "7.8%",
    desc: "Mobile and browser gaming traffic at massive scale. From casual puzzle games to hardcore RPGs and competitive titles, engage gaming audiences at every stage from install to monetization.",
    formats: ["Interstitials", "Rewarded Video", "Native Ads", "Display Banners"],
    topGeos: ["US", "JP", "KR", "DE", "BR", "UK"],
    tips: [
      "Rewarded video ads have the highest completion rates",
      "Show gameplay footage in video creatives",
      "Target evening hours when gaming engagement peaks",
      "In-app interstitials perform 4× better than banner ads",
    ],
  },
  {
    icon: ShoppingBag,
    label: "Mainstream",
    color: "bg-teal-50",
    iconColor: "text-teal-500",
    gradientFrom: "#14b8a6",
    gradientTo: "#0d9488",
    impressions: "10M+",
    cpm: "$0.2–2.0",
    countries: "190+",
    convRate: "3.5%",
    desc: "Mainstream traffic covers general-interest audiences at massive scale — news, entertainment, lifestyle, and utility sites. Ideal for broad-reach campaigns, app installs, and brands targeting a wide demographic.",
    formats: ["Display Banners", "Native Ads", "Push Notifications", "Popunders"],
    topGeos: ["US", "UK", "DE", "FR", "BR", "IN"],
    tips: [
      "Broad creatives outperform niche messaging for mainstream",
      "Popunders deliver the highest volume at lowest CPM",
      "Run frequency-capped push to avoid audience fatigue",
      "A/B test multiple landing pages for cold traffic",
    ],
  },
  {
    icon: Building2,
    label: "Finance",
    color: "bg-indigo-50",
    iconColor: "text-indigo-500",
    gradientFrom: "#6366f1",
    gradientTo: "#4f46e5",
    impressions: "25M+",
    cpm: "$1.0–5.0",
    countries: "100+",
    convRate: "2.8%",
    desc: "B2B leads, insurance, loans, credit cards, and professional services. Reach business decision-makers and finance-motivated audiences with precise company-size and industry targeting.",
    formats: ["Native Ads", "Display Banners", "Push Notifications"],
    topGeos: ["US", "UK", "CA", "AU", "DE", "SG"],
    tips: [
      "Focus on problem-solution storytelling in creatives",
      "Whitepaper / free tool lead magnets convert well",
      "LinkedIn-style professional targeting works for B2B",
      "Long-form landing pages build more trust for high-ticket offers",
    ],
  },
];

export default function VerticalsPage() {
  useEffect(() => {
    setPageMeta(VERTICALS_META.title, VERTICALS_META.description);
  }, []);
  const [active, setActive] = useState(0);
  const v = ALL_VERTICALS[active];

  return (
    <div className="font-sans antialiased bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-36 pb-20 bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-orange-500/5 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3 pointer-events-none" />
        <div className="container mx-auto px-6 md:px-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-block text-xs font-bold text-[#F7611E] uppercase tracking-widest mb-5 bg-orange-50 px-4 py-1.5 rounded-full">Content Verticals</span>
            <h1 className="text-5xl md:text-7xl font-black text-foreground mb-6">
              Traffic for Every <span className="gradient-text">Niche</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              From mainstream to niche — access premium audiences across the most profitable content verticals globally, with billions of monthly impressions ready to monetize.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/start" className="gradient-bg text-white font-bold px-8 py-3.5 rounded-full hover:shadow-xl hover:shadow-orange-500/30 transition-all">
                Start Campaign <ArrowRight className="inline w-4 h-4 ml-1" />
              </Link>
              <Link href="/ad-formats" className="border-2 border-border text-foreground font-semibold px-8 py-3.5 rounded-full hover:border-[#F7611E] hover:text-[#F7611E] transition-all">
                View Ad Formats
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vertical tabs */}
      <section className="py-6 bg-white border-y border-border sticky top-[64px] z-40 overflow-x-auto">
        <div className="container mx-auto px-6 md:px-10">
          <div className="flex gap-2 min-w-max">
            {ALL_VERTICALS.map((vert, i) => (
              <button
                key={i}
                data-testid={`tab-vertical-${vert.label.toLowerCase().replace(/[\s&]/g, "-")}`}
                onClick={() => setActive(i)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border-2 transition-all flex-shrink-0 ${
                  active === i
                    ? "gradient-bg text-white border-transparent shadow-md"
                    : "border-border text-muted-foreground hover:border-[#F7611E] hover:text-foreground bg-white"
                }`}
              >
                <vert.icon className="w-4 h-4" />
                {vert.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Vertical detail */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-6 md:px-10">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="grid lg:grid-cols-2 gap-12 items-start"
          >
            <div>
              <div className={`w-16 h-16 rounded-2xl ${v.color} flex items-center justify-center mb-6`}>
                <v.icon className={`w-8 h-8 ${v.iconColor}`} />
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-foreground mb-5">{v.label}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">{v.desc}</p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { icon: Globe, label: "Monthly Traffic", value: v.impressions },
                  { icon: DollarSign, label: "CPM Range", value: v.cpm },
                  { icon: Globe, label: "Countries", value: v.countries },
                  { icon: TrendingUp, label: "Avg Conv. Rate", value: v.convRate },
                ].map((s, i) => (
                  <div key={i} className="bg-white rounded-xl border border-border p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <s.icon className="w-4 h-4 text-[#F7611E]" />
                      <span className="text-xs text-muted-foreground">{s.label}</span>
                    </div>
                    <div className="text-2xl font-black gradient-text">{s.value}</div>
                  </div>
                ))}
              </div>

              <div className="mb-8">
                <h4 className="font-bold text-foreground mb-3">Best Performing Ad Formats</h4>
                <div className="flex flex-wrap gap-2">
                  {v.formats.map((f) => (
                    <span key={f} className="text-sm font-medium bg-orange-50 text-[#F7611E] px-3 py-1.5 rounded-full border border-orange-200">
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h4 className="font-bold text-foreground mb-3">Top GEOs</h4>
                <div className="flex flex-wrap gap-2">
                  {v.topGeos.map((g) => (
                    <span key={g} className="text-sm font-medium bg-secondary text-foreground px-3 py-1.5 rounded-full border border-border">
                      {g}
                    </span>
                  ))}
                </div>
              </div>

              <Link href="/start" className="inline-flex items-center gap-2 gradient-bg text-white font-bold px-8 py-3.5 rounded-full hover:shadow-xl hover:shadow-orange-500/30 transition-all">
                Launch {v.label} Campaign <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="space-y-5">
              <div className="bg-white rounded-2xl border border-border p-8 shadow-sm">
                <h4 className="font-bold text-foreground text-lg mb-5">Pro Tips for {v.label}</h4>
                <div className="space-y-4">
                  {v.tips.map((tip, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="w-7 h-7 rounded-full gradient-bg flex items-center justify-center flex-shrink-0 text-white font-black text-xs">
                        {i + 1}
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed pt-1">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-border p-8 shadow-sm">
                <h4 className="font-bold text-foreground text-lg mb-5">Performance Snapshot</h4>
                <div className="space-y-4">
                  {[
                    { label: "Avg CTR (Push)", value: "14.2%", bar: 70 },
                    { label: "Avg CTR (Native)", value: "3.8%", bar: 45 },
                    { label: "Fill Rate", value: "98.4%", bar: 98 },
                    { label: "Fraud Rate", value: "0.4%", bar: 4 },
                  ].map((m, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">{m.label}</span>
                        <span className="font-bold text-foreground">{m.value}</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${m.bar}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: i * 0.1 }}
                          className="h-full gradient-bg rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* All verticals grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 md:px-10">
          <h2 className="text-3xl font-black text-foreground mb-10 text-center">All Verticals at a Glance</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
            {ALL_VERTICALS.map((vert, i) => (
              <motion.button
                key={i}
                onClick={() => { setActive(i); window.scrollTo({ top: 200, behavior: "smooth" }); }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ y: -4 }}
                className={`text-left bg-white rounded-2xl border-2 p-5 transition-all ${
                  active === i ? "border-[#F7611E] shadow-xl shadow-orange-500/15" : "border-border hover:border-[#F7611E]/40 hover:shadow-lg"
                }`}
                data-testid={`card-vertical-${vert.label.toLowerCase().replace(/[\s&]/g, "-")}`}
              >
                <div className={`w-10 h-10 rounded-xl ${vert.color} flex items-center justify-center mb-3`}>
                  <vert.icon className={`w-5 h-5 ${vert.iconColor}`} />
                </div>
                <div className="font-bold text-foreground mb-1">{vert.label}</div>
                <div className="text-xs text-muted-foreground">{vert.impressions} monthly</div>
                <div className="text-xs font-semibold gradient-text mt-1">CPM {vert.cpm}</div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg" />
        <div className="relative z-10 container mx-auto px-6 md:px-10 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5">Ready to Target Your Vertical?</h2>
          <p className="text-xl text-white/80 mb-8 max-w-xl mx-auto">Join thousands of advertisers scaling profitable campaigns across every niche.</p>
          <Link href="/start" className="inline-block bg-white text-[#F7611E] font-black text-lg px-12 py-4 rounded-full hover:shadow-2xl hover:scale-105 transition-all">
            Start Free Campaign
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
