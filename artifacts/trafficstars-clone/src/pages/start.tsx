import React, { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, ArrowRight, CheckCircle2, Shield, Globe, Zap, BarChart3, Layers, Users } from "lucide-react";
import logo from "../../../../attached_assets/logo.png";
import { userSignup } from "@/lib/cms-api";
import { setPageMeta } from "@/lib/seo";

type AccountType = "advertiser" | "publisher";

const ADVERTISER_BENEFITS = [
  "Access 35M+ monthly impressions",
  "6 high-performing ad formats",
  "Real-time bidding with <50ms response",
  "190+ countries with granular targeting",
  "AI-powered campaign optimization",
  "Dedicated account manager",
];

const PUBLISHER_BENEFITS = [
  "100% fill rate guarantee",
  "Premium CPMs across all verticals",
  "Anti-adblock monetization solutions",
  "Weekly & monthly payment options",
  "Multiple payment methods incl. crypto",
  "Dedicated publisher success manager",
];

const START_META = {
  title: "Start Advertising with AdoMobi DSP | Global Traffic Platform",
  description:
    "Launch CPI, CPM, CPC & CPA campaigns with premium global traffic, smart targeting, and real-time optimization on AdoMobi DSP.",
} as const;

export default function StartPage() {
  useEffect(() => {
    setPageMeta(START_META.title, START_META.description);
  }, []);
  const [accountType, setAccountType] = useState<AccountType>("advertiser");
  const [showPass, setShowPass] = useState(false);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submissionError, setSubmissionError] = useState("");
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", mobileNumber: "", company: "", password: "", agree: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const update = (field: string, val: string | boolean) =>
    setForm((prev) => ({ ...prev, [field]: val }));

  const validateStep1 = () => {
    const e: Record<string, string> = {};
    if (!form.firstName) e.firstName = "Required";
    if (!form.lastName) e.lastName = "Required";
    if (!form.email || !form.email.includes("@")) e.email = "Valid email required";
    if (!form.mobileNumber) e.mobileNumber = "Required";
    if (!form.company) e.company = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e: Record<string, string> = {};
    if (!form.password || form.password.length < 8) e.password = "Minimum 8 characters";
    if (!form.agree) e.agree = "You must accept the terms";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) return;
    setSubmissionError("");
    setLoading(true);

    try {
      const searchParams = new URLSearchParams(window.location.search);
      await userSignup({
        name: `${form.firstName} ${form.lastName}`.trim(),
        email: form.email,
        mobileNumber: form.mobileNumber,
        address: form.company,
        password: form.password,
        utm_source: searchParams.get("utm_source") ?? "direct",
        utm_medium: searchParams.get("utm_medium") ?? "organic",
        utm_campaign: searchParams.get("utm_campaign") ?? "signup",
        utm_content: searchParams.get("utm_content") ?? "",
        utm_term: searchParams.get("utm_term") ?? "",
        aff_id: searchParams.get("aff_id") ?? "",
        click_id: searchParams.get("click_id") ?? "",
        gclid: searchParams.get("gclid") ?? "",
        fbclid: searchParams.get("fbclid") ?? "",
      });
      setStep(3);
    } catch (signupError) {
      setSubmissionError(signupError instanceof Error ? signupError.message : "Unable to create the account right now.");
    } finally {
      setLoading(false);
    }
  };

  const benefits = accountType === "advertiser" ? ADVERTISER_BENEFITS : PUBLISHER_BENEFITS;

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-5/12 bg-white relative overflow-hidden flex-col justify-between p-16">
        {[100, 220, 340].map((size, i) => (
          <div key={i} className="absolute rounded-full border border-white/10"
            style={{ width: size * 2, height: size * 2, top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
        ))}

        <Link href="/" className="relative z-10">
          <img src={logo} alt="AdoMobi" className="w-34 h-44 object-contain" />
        </Link>

        <div className="relative z-10">
          <div className="flex gap-2 mb-8">
            {(["advertiser", "publisher"] as AccountType[]).map((type) => (
              <button key={type} onClick={() => setAccountType(type)}
                className={`px-5 py-2 rounded-full text-sm font-bold capitalize transition-all ${
                  accountType === type ? "gradient-bg text-white" : "bg-secondary text-foreground hover:bg-secondary/80"
                }`}>
                {type}
              </button>
            ))}
          </div>

          <h2 className="text-3xl font-black text-foreground mb-2">
            {accountType === "advertiser" ? "Scale Your Campaigns" : "Monetize Your Traffic"}
          </h2>
          <p className="text-foreground/80 mb-8">
            {accountType === "advertiser"
              ? "Access premium global traffic at competitive CPMs with complete targeting control."
              : "Earn industry-leading RPMs from 3,000+ advertisers competing for your inventory."}
          </p>

          <div className="space-y-3">
            {benefits.map((b, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#F7611E] shrink-0" />
                <span className="text-foreground/90 text-sm">{b}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-3 gap-4">
          {[
            { icon: Globe, val: "190+", label: "Countries" },
            { icon: Users, val: "1K+", label: "Clients" },
            { icon: Layers, val: "35M+", label: "Monthly Imp." },
          ].map((s, i) => (
            <div key={i} className="bg-secondary rounded-xl p-4 text-center">
              <s.icon className="w-5 h-5 text-[#F7611E] mx-auto mb-1" />
              <div className="text-xl font-black text-foreground">{s.val}</div>
              <div className="text-foreground/60 text-xs">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8 panel-orange">
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md bg-white rounded-2xl p-8 shadow-2xl">
          <Link href="/" className="mb-10 inline-flex lg:hidden">
            <img src={logo} alt="AdoMobi" className="w-28 h-18 object-contain" />
          </Link>

          {/* Step indicator */}
          {step < 3 && (
            <div className="flex items-center gap-3 mb-8">
              {[1, 2].map((s) => (
                <React.Fragment key={s}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                    step >= s ? "gradient-bg text-white" : "bg-secondary text-muted-foreground"
                  }`}>{s}</div>
                  {s < 2 && <div className={`flex-1 h-0.5 transition-all ${step > s ? "gradient-bg" : "bg-border"}`} />}
                </React.Fragment>
              ))}
              <span className="text-xs text-muted-foreground ml-2">{step === 1 ? "Your info" : "Security"}</span>
            </div>
          )}

          <AnimatePresence mode="wait">
            {step === 3 ? (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
                <div className="w-20 h-20 mx-auto rounded-full gradient-bg flex items-center justify-center mb-6 shadow-2xl shadow-orange-500/30">
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-black text-foreground mb-3">Account Created!</h2>
                <p className="text-muted-foreground mb-8">Welcome to AdoMobi, {form.firstName}. Check your email to verify your account.</p>
                <Link href="/login" className="gradient-bg text-white font-bold px-10 py-4 rounded-full hover:shadow-xl transition-all inline-flex items-center gap-2">
                  Sign In to Dashboard <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ) : step === 1 ? (
              <motion.div key="step1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <h1 className="text-3xl font-black text-foreground mb-2">Create your account</h1>
                <p className="text-muted-foreground mb-8">Free to join. Start in under 5 minutes.</p>

                {/* Account type toggle */}
                <div className="flex bg-secondary rounded-xl p-1 mb-6">
                  {(["advertiser", "publisher"] as AccountType[]).map((type) => (
                    <button key={type} onClick={() => setAccountType(type)}
                      data-testid={`button-account-type-${type}`}
                      className={`flex-1 py-2.5 rounded-lg text-sm font-bold capitalize transition-all ${
                        accountType === type ? "gradient-bg text-white shadow-md" : "text-muted-foreground hover:text-foreground"
                      }`}>
                      {type === "advertiser" ? "I want to Advertise" : "I want to Monetize"}
                    </button>
                  ))}
                </div>

                <p className="text-xs text-muted-foreground mb-6">
                  Need details first?{" "}
                  <Link href={accountType === "advertiser" ? "/advertiser" : "/publisher"} className="text-[#F7611E] font-semibold hover:underline">
                    View {accountType === "advertiser" ? "Advertiser" : "Publisher"} Overview
                  </Link>
                </p>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-1.5">First Name</label>
                      <input data-testid="input-first-name" type="text" value={form.firstName} onChange={(e) => update("firstName", e.target.value)} placeholder="John"
                        className={`w-full px-4 py-3 rounded-xl border-2 transition-colors text-sm focus:outline-none ${errors.firstName ? "border-red-400" : "border-border focus:border-[#F7611E]"}`} />
                      {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-1.5">Last Name</label>
                      <input data-testid="input-last-name" type="text" value={form.lastName} onChange={(e) => update("lastName", e.target.value)} placeholder="Doe"
                        className={`w-full px-4 py-3 rounded-xl border-2 transition-colors text-sm focus:outline-none ${errors.lastName ? "border-red-400" : "border-border focus:border-[#F7611E]"}`} />
                      {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1.5">Work Email</label>
                    <input data-testid="input-email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@company.com"
                      className={`w-full px-4 py-3 rounded-xl border-2 transition-colors text-sm focus:outline-none ${errors.email ? "border-red-400" : "border-border focus:border-[#F7611E]"}`} />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1.5">Mobile Number</label>
                    <input data-testid="input-mobile-number" type="tel" value={form.mobileNumber} onChange={(e) => update("mobileNumber", e.target.value)} placeholder="+1 555 000 0000"
                      className={`w-full px-4 py-3 rounded-xl border-2 transition-colors text-sm focus:outline-none ${errors.mobileNumber ? "border-red-400" : "border-border focus:border-[#F7611E]"}`} />
                    {errors.mobileNumber && <p className="text-red-500 text-xs mt-1">{errors.mobileNumber}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1.5">Company / Address</label>
                    <input data-testid="input-company" type="text" value={form.company} onChange={(e) => update("company", e.target.value)} placeholder="Your company or address"
                      className={`w-full px-4 py-3 rounded-xl border-2 transition-colors text-sm focus:outline-none ${errors.company ? "border-red-400" : "border-border focus:border-[#F7611E]"}`} />
                    {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company}</p>}
                  </div>

                  {submissionError && (
                    <div className="px-4 py-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl">{submissionError}</div>
                  )}

                  <button data-testid="button-step1-next" onClick={handleNext}
                    className="w-full gradient-bg text-white font-bold py-4 rounded-xl hover:shadow-xl hover:shadow-orange-500/30 transition-all flex items-center justify-center gap-2">
                    Continue <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div key="step2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <h1 className="text-3xl font-black text-foreground mb-2">Secure your account</h1>
                <p className="text-muted-foreground mb-8">Choose a strong password to protect your account.</p>

                <form onSubmit={handleSubmit} className="space-y-5" data-testid="form-start">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1.5">Password</label>
                    <div className="relative">
                      <input data-testid="input-password" type={showPass ? "text" : "password"} value={form.password} onChange={(e) => update("password", e.target.value)} placeholder="Min. 8 characters"
                        className={`w-full px-4 py-3 pr-12 rounded-xl border-2 transition-colors text-sm focus:outline-none ${errors.password ? "border-red-400" : "border-border focus:border-[#F7611E]"}`} />
                      <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                        {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                    {/* Strength bar */}
                    {form.password && (
                      <div className="mt-2">
                        <div className="h-1 bg-secondary rounded-full overflow-hidden">
                          <div className={`h-full rounded-full transition-all duration-300 ${
                            form.password.length >= 12 ? "w-full bg-green-500" :
                            form.password.length >= 8 ? "w-2/3 bg-yellow-500" : "w-1/3 bg-red-500"
                          }`} />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {form.password.length >= 12 ? "Strong password" : form.password.length >= 8 ? "Good password" : "Weak — add more characters"}
                        </p>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input data-testid="input-agree" type="checkbox" checked={form.agree} onChange={(e) => update("agree", e.target.checked)} className="mt-0.5 w-4 h-4 accent-[#F7611E] rounded" />
                      <span className="text-sm text-muted-foreground">
                        I agree to the{" "}
                        <a href="#" className="text-[#F7611E] hover:underline">Terms of Service</a>{" "}
                        and{" "}
                        <a href="#" className="text-[#F7611E] hover:underline">Privacy Policy</a>
                      </span>
                    </label>
                    {errors.agree && <p className="text-red-500 text-xs mt-1">{errors.agree}</p>}
                  </div>

                  {submissionError && (
                    <div className="px-4 py-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl">{submissionError}</div>
                  )}

                  <div className="flex gap-3">
                    <button type="button" onClick={() => setStep(1)} className="px-6 py-4 rounded-xl border-2 border-border font-semibold text-foreground hover:border-[#F7611E] transition-colors">
                      Back
                    </button>
                    <button data-testid="button-create-account" type="submit" disabled={loading}
                      className="flex-1 gradient-bg text-white font-bold py-4 rounded-xl hover:shadow-xl hover:shadow-orange-500/30 transition-all disabled:opacity-70 flex items-center justify-center gap-2">
                      {loading ? <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                        : <><CheckCircle2 className="w-4 h-4" /> Create Account</>}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {step < 3 && (
            <p className="text-center text-sm text-muted-foreground mt-8">
              Already have an account?{" "}
              <Link href="/login" className="text-[#F7611E] font-semibold hover:underline">Sign In</Link>
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
