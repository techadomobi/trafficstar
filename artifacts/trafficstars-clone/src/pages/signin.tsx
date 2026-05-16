import React, { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Eye, EyeOff, ArrowRight, Shield, Globe, Zap } from "lucide-react";
import logo from "../../../../attached_assets/logo.png";
import logoWhite from "../../../../attached_assets/logo_white.png";
import { userLogin } from "@/lib/cms-api";
import { setPageMeta } from "@/lib/seo";

const SIGNIN_META = {
  title: "Sign In to AdoMobi DSP | Advertiser Dashboard Login",
  description:
    "Login to AdoMobi DSP to manage campaigns, track performance, and optimize CPI, CPM, CPC & CPA advertising campaigns.",
} as const;

export default function SignInPage() {
  useEffect(() => {
    setPageMeta(SIGNIN_META.title, SIGNIN_META.description);
  }, []);
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { setError("Please fill in all fields."); return; }
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const loginResponse = await userLogin(email, password);
      const authToken = typeof loginResponse.token === "string" ? loginResponse.token.trim() : "";

      if (!authToken) {
        throw new Error("Login did not return an auth token.");
      }

      const userData =
        loginResponse.responsResult ??
        loginResponse.data ??
        loginResponse.user ??
        { email };

      localStorage.setItem("authToken", authToken);
      localStorage.setItem("admin_token", authToken);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("advertiserData", JSON.stringify(userData));
      if (typeof loginResponse.adminId === "string" && loginResponse.adminId.trim()) {
        localStorage.setItem("subadminId", loginResponse.adminId.trim());
      }

      setSuccess("Login successful.");
      // After successful login, redirect to the AdoMobi dashboard app.
      // The URL can be overridden with Vite env var `VITE_ADOMOBI_URL`.
      try {
        // `import.meta.env` is available in Vite-built apps.
        // Use an absolute URL for a separate dashboard project, or a path for a same-origin route.
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const rawTarget = import.meta.env?.VITE_ADOMOBI_URL || "http://localhost:3000";
        const adomobiUrl = /^https?:\/\//i.test(rawTarget)
          ? rawTarget
          : rawTarget.startsWith("/")
            ? `${window.location.origin}${rawTarget}`
            : `${window.location.origin}/${rawTarget}`;
        window.location.assign(adomobiUrl);
      } catch (err) {
        window.location.assign("http://localhost:3000");
      }
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "Unable to sign in right now.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left panel — branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-white relative overflow-hidden flex-col justify-between p-16">
        {/* Background circles */}
        {[120, 240, 360].map((size, i) => (
          <div key={i} className="absolute rounded-full border border-white/10"
            style={{ width: size * 2, height: size * 2, top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
        ))}

        {/* Logo */}
        <Link href="/" className="relative z-10">
          <img src={logo} alt="AdoMobi" className="w-34 h-44 object-contain" />
        </Link>

        {/* Center content */}
        <div className="relative z-10">
          <h2 className="text-4xl font-black text-foreground mb-6 leading-tight">
            The World's Most<br />Powerful Global Traffic Source
          </h2>
          <p className="text-foreground/80 text-lg mb-10 leading-relaxed">
            Access 35M+ monthly impressions, 3,000+ premium publishers, and the industry's best RTB technology.
          </p>

          <div className="space-y-4">
            {[
              { icon: Zap, text: "Launch campaigns in under 5 minutes" },
              { icon: Globe, text: "Reach 190+ countries with precision targeting" },
              { icon: Shield, text: "Industry-leading anti-fraud protection" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center">
                  <item.icon className="w-4 h-4 text-[#F7611E]" />
                </div>
                <span className="text-foreground/90 text-sm font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial */}
        <div className="relative z-10 bg-secondary rounded-2xl p-6">
          <p className="text-foreground/90 text-sm italic mb-4">
            "AdoMobi has been our primary traffic source for two years. The ROI and support are unmatched in the industry."
          </p>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#F7611E] font-bold text-sm">M</div>
            <div>
              <div className="text-foreground font-semibold text-sm">Marcus W.</div>
              <div className="text-foreground/60 text-xs">Senior Media Buyer, PerformAds</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center p-8 panel-orange">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-white rounded-2xl p-8 shadow-2xl"
        >
          {/* Mobile logo */}
          <Link href="/" className="mb-10 inline-flex lg:hidden">
            <img src={logo} alt="AdoMobi" className="w-28 h-18 object-contain" />
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl font-black text-foreground mb-2">Welcome back</h1>
            <p className="text-muted-foreground">Sign in to your AdoMobi DSP</p>
          </div>

          {error && (
            <div className="mb-5 px-4 py-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl">{error}</div>
          )}

          {success && (
            <div className="mb-5 px-4 py-3 bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl">{success}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5" data-testid="form-signin">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Email address</label>
              <input
                data-testid="input-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full px-5 py-3.5 rounded-xl border-2 border-border focus:border-[#F7611E] focus:outline-none text-sm transition-colors bg-white"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-foreground">Password</label>
                <a href="#" className="text-xs text-[#F7611E] font-medium hover:underline">Forgot password?</a>
              </div>
              <div className="relative">
                <input
                  data-testid="input-password"
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-5 py-3.5 pr-12 rounded-xl border-2 border-border focus:border-[#F7611E] focus:outline-none text-sm transition-colors bg-white"
                />
                <button
                  type="button"
                  data-testid="button-toggle-password"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <input
                data-testid="input-remember"
                id="remember"
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="w-4 h-4 rounded border-border accent-[#F7611E]"
              />
              <label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer select-none">
                Keep me signed in for 30 days
              </label>
            </div>

            <button
              data-testid="button-signin-submit"
              type="submit"
              disabled={loading}
              className="w-full gradient-bg text-white font-bold py-4 rounded-xl hover:shadow-xl hover:shadow-orange-500/30 transition-all disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {loading ? (
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                <>Sign In <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/start" className="text-[#F7611E] font-semibold hover:underline">
              Create one free
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
