"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Mail, Lock, ArrowRight, CheckCircle, AlertTriangle, Sparkles, Shield, Zap } from "lucide-react"
import { API_BASE } from "@/lib/config"
import { normalizeSessionUser, unwrapApiPayload } from "@/lib/session"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

// Use environment-driven API base
// Trackstart API base is configured via API_BASE

export default function FullHeightLoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [rememberMe, setRememberMe] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [partnersId, setPartnersId] = useState(4) // Default to 4 for localhost
  const router = useRouter()

  // Initialize and get partners_Id from subdomain or use static for localhost
  useEffect(() => {
    setIsMounted(true)
    if (typeof window !== "undefined") {
      const currentDomain = window.location.hostname
      
      // Use static partners_Id=4 for localhost development
      if (currentDomain === "localhost" || currentDomain === "127.0.0.1") {
        setPartnersId(4)
      } else {
        // For production, fetch domain data to get partners_Id
        const fetchDomainData = async () => {
          try {
            const response = await fetch(
              `${API_BASE}subAdmin/viewuserData?subdomain=${currentDomain}`,
              { headers: { accept: "application/json" } }
            )
            const data = await response.json()
            const domainData = unwrapApiPayload(data)
            if (domainData?.partners_Id || domainData?.partnerId || domainData?._id) {
              const resolvedPartnersId =
                domainData.partners_Id || domainData.partnerId || domainData._id
              setPartnersId(resolvedPartnersId)
              localStorage.setItem("partners_Id", String(resolvedPartnersId))
              localStorage.setItem("partnerDomainId", domainData._id || "")
            }
          } catch (e) {
            console.error("Error fetching domain data:", e)
            // Fallback to default
            setPartnersId(4)
          }
        }
        fetchDomainData()
      }

      // Load remembered email if exists
      const rememberedEmail = localStorage.getItem("rememberedEmail")
      if (rememberedEmail) {
        setEmail(rememberedEmail)
        setRememberMe(true)
      }
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    if (!email || !password) {
      setError("Please enter both email and password.")
      setIsLoading(false)
      return
    }

    const hostname = typeof window !== "undefined" ? window.location.hostname : ""
    const isLocalHost = hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1"
    const payloadPartnersId = isLocalHost ? 4 : partnersId

    const body = new URLSearchParams()
    body.append("partners_Id", String(payloadPartnersId))
    body.append("email", email)
    body.append("password", password)

    try {
      const response = await fetch(`${API_BASE}subAdmin/singleLogin`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      })

      const data = await response.json()

      const userPayload = unwrapApiPayload(data)

      if (response.ok && data.responseCode === 200 && userPayload) {
        const userObject = normalizeSessionUser(userPayload, payloadPartnersId)
        const token = data.token

        // Save to localStorage
        localStorage.setItem("advertiserData", JSON.stringify(userObject))
        localStorage.setItem("authToken", token)
        localStorage.setItem("admin_token", token)
        localStorage.setItem("user", JSON.stringify(userObject))
        localStorage.setItem("subadminId", userObject._id)
        localStorage.setItem("partners_Id", String(userObject.partners_Id || payloadPartnersId))

        // Handle Remember Me
        if (rememberMe) {
          localStorage.setItem("rememberedEmail", email)
        } else {
          localStorage.removeItem("rememberedEmail")
        }

        // Role-based routing
        switch (userObject.userType) {
          case "SUBADMIN":
          case "PUBLICHER":
          case "MANAGER":
          case "ADVERTISER":
            router.push("/admin")
            break
          default:
            setError("Invalid user type or unknown role.")
            localStorage.clear()
            break
        }
      } else {
        setError(data.responseMessage || "Invalid email or password.")
      }
    } catch (err) {
      console.error("Login Error:", err)
      setError("Network error. Please check your connection.")
    } finally {
      setIsLoading(false)
    }
  }

  if (!isMounted) return null

  return (
    <main className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-white via-orange-50 to-amber-50">
      {/* --- START: Enhanced Background Animations --- */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* --- Enhanced Aurora Background --- */}
        <div className="aurora-blob w-[800px] h-[800px] bg-orange-200/25 animation-aurora-move"></div>
        <div className="aurora-blob w-[700px] h-[700px] bg-amber-200/20 animation-delay-2000 animation-aurora-float"></div>
        <div className="aurora-blob w-[900px] h-[900px] bg-emerald-200/15 animation-delay-4000 animation-aurora-move"></div>
        <div className="aurora-blob w-[600px] h-[600px] bg-orange-200/15 animation-delay-6000 animation-aurora-float"></div>

        {/* --- Highlighted Floating Geometric Shapes --- */}
        <div className="absolute inset-0 z-[1]">
          {/* Note the increased opacity in the bg color classes */}
          <div className="shape shape-1 bg-orange-200/20"></div>
          <div className="shape shape-2 bg-amber-200/20"></div>
          <div className="shape shape-3 bg-emerald-200/15"></div>
          <div className="shape shape-4 bg-orange-200/15"></div>
        </div>

        {/* --- Highlighted Drifting Particles --- */}
        <div className="particles">
          {/* Increased array count for more particles */}
          {[...Array(50)].map((_, i) => (
            <div key={i} className="particle"></div>
          ))}
        </div>
      </div>
      {/* --- END: Enhanced Background Animations --- */}

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 w-full min-h-screen">
        {/* Left Section - Brand & Features */}
        <div className="flex flex-col justify-between p-12">
          <div>
            <div className="flex items-center gap-3 mb-16 animate-fade-in-left">
              <Image src="/logo-5.png" alt="Trackstart" width={200} height={40} />
            </div>

            <h1 className="text-5xl xl:text-6xl font-bold text-orange-900 leading-tight mb-6 animate-fade-in-left">
              Target the Right Audience,{" "}
              <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                Every Time.
              </span>
            </h1>

            <p className="text-xl lg:text-2xl text-orange-700 mb-12 animate-fade-in-left">
              Harness the power of AI to optimize your campaigns and achieve unparalleled ROI.
            </p>

            <div className="space-y-2">
              {[
                { icon: Zap, text: "Lightning-fast global delivery", color: "text-orange-600" },
                { icon: Shield, text: "Bank-level security & fraud protection", color: "text-amber-600" },
                { icon: Sparkles, text: "AI-powered traffic optimization", color: "text-emerald-600" },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 animate-fade-in-right"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex-shrink-0">
                    <feature.icon className={`w-7 h-7 ${feature.color}`} />
                  </div>
                  <span className="text-orange-800 text-lg">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-12 mt-4">
            <div>
              <p className="text-3xl lg:text-4xl font-bold text-orange-900">50K+</p>
              <p className="text-orange-700 lg:text-lg">Active Users</p>
            </div>
            <div>
              <p className="text-3xl lg:text-4xl font-bold text-orange-900">99.9%</p>
              <p className="text-orange-700 lg:text-lg">Uptime</p>
            </div>
            <div>
              <p className="text-3xl lg:text-4xl font-bold text-orange-900">24/7</p>
              <p className="text-orange-700 lg:text-lg">Support</p>
            </div>
          </div>
        </div>

        {/* Right Section - Login Form */}
        <div className="flex flex-col justify-center items-center p-6 lg:p-8 bg-white/30 backdrop-blur-sm">
          <div className="w-full max-w-lg">
            <div className="text-center mb-8">
              <h1 className="text-3xl lg:text-4xl font-bold text-slate-900">Welcome Back</h1>
            </div>

            <div className="w-full bg-white/70 backdrop-blur-md border border-orange-200/50 rounded-2xl p-8 shadow-lg shadow-orange-100/50">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-slate-900">Sign In</h2>
                <p className="text-slate-600 mt-2 text-base">Enter your credentials to continue</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm lg:text-base font-medium text-slate-700 mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 pl-11 bg-orange-50/50 border-2 border-orange-200/60 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 rounded-lg text-slate-900 placeholder:text-slate-400 transition-colors text-base"
                      required
                    />
                    {email && /\S+@\S+\.\S+/.test(email) && (
                      <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500" />
                    )}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm lg:text-base font-medium text-slate-700">Password</label>
                    <Link
                      href="/forgot-password"
                      className="text-sm lg:text-base text-orange-600 hover:text-orange-700 font-medium transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-12 pl-11 pr-12 bg-orange-50/50 border-2 border-orange-200/60 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 rounded-lg text-slate-900 placeholder:text-slate-400 transition-colors text-base"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 hover:bg-orange-100 rounded-lg"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-slate-500" />
                      ) : (
                        <Eye className="h-5 w-5 text-slate-500" />
                      )}
                    </Button>
                  </div>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-300 text-red-700 p-3 rounded-lg flex items-center space-x-3 text-sm">
                    <AlertTriangle className="h-5 w-5 flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(Boolean(checked))}
                    className="focus:ring-orange-500 border-orange-300 data-[state=checked]:bg-orange-600 data-[state=checked]:border-orange-500 rounded h-4 w-4"
                  />
                  <label htmlFor="remember" className="text-sm lg:text-base font-medium text-slate-600 cursor-pointer">
                    Keep me signed in
                  </label>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 text-base bg-gradient-to-r from-orange-600 to-amber-500 hover:brightness-110 text-white font-semibold rounded-lg shadow-md hover:shadow-orange-500/30 transition-all duration-300 transform hover:scale-105 disabled:opacity-70 group"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <span>Sign In</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  )}
                </Button>
              </form>

              <p className="text-center text-sm lg:text-base text-slate-600 mt-6 pt-6 border-t border-orange-200/50">
                New to Trackstart?{" "}
                <Link
                  href="/signup"
                  className="font-semibold text-orange-600 hover:text-orange-700 transition-colors"
                >
                  Create a free account
                </Link>
              </p>
              <div className="mt-6 text-center">
                <p className="text-xs lg:text-sm text-slate-500">
                  Powered by{" "}
                  <a
                    href="/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-slate-600 hover:text-slate-900 transition"
                  >
                    Trackstart
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .aurora-blob {
          position: absolute;
          top: 50%;
          left: 50%;
          border-radius: 9999px;
          filter: blur(120px);
          opacity: 0.2;
          transform: translate(-50%, -50%);
        }
        .animation-aurora-move {
          animation: aurora-move 40s infinite alternate ease-in-out;
        }
        .animation-aurora-float {
          animation: aurora-float 35s infinite alternate ease-in-out;
        }
        @keyframes aurora-move {
          0% {
            transform: translate(-50%, -50%) rotate(0deg) scale(1);
          }
          50% {
            transform: translate(-45%, -55%) rotate(180deg) scale(1.3);
          }
          100% {
            transform: translate(-50%, -50%) rotate(360deg) scale(1);
          }
        }
        @keyframes aurora-float {
          0% {
            transform: translate(-50%, -50%) scale(1);
          }
          100% {
            transform: translate(-55%, -45%) scale(1.4);
          }
        }
        @keyframes fade-in-left {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fade-in-left {
          animation: fade-in-left 0.8s ease-out both;
          animation-delay: 200ms;
        }
        .animate-fade-in-right {
          animation: fade-in-right 0.8s ease-out both;
        }
        .animation-delay-2000 {
          animation-delay: -20s;
        }
        .animation-delay-4000 {
          animation-delay: -30s;
        }
        .animation-delay-6000 {
          animation-delay: -15s;
        }

        /* --- UPDATED STYLES FOR HIGHLIGHTED ANIMATIONS --- */

        /* Floating Shapes - Bigger and slightly sharper */
        .shape {
          position: absolute;
          filter: blur(2px); /* Slightly increased blur to soften larger shapes */
          animation: float-and-rotate 30s infinite ease-in-out alternate;
        }
        .shape-1 {
          width: 220px; /* Increased size */
          height: 220px; /* Increased size */
          top: 10%;
          left: 5%;
          border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
          animation-duration: 35s;
        }
        .shape-2 {
          width: 250px; /* Increased size */
          height: 250px; /* Increased size */
          bottom: 15%;
          right: 10%;
          border-radius: 50% 50% 30% 70% / 60% 40% 60% 40%;
          animation-duration: 28s;
          animation-direction: alternate-reverse;
        }
        .shape-3 {
          width: 180px; /* Increased size */
          height: 180px; /* Increased size */
          bottom: 30%;
          left: 20%;
          border-radius: 30% 70% 50% 50% / 50% 60% 40% 50%;
          animation-duration: 32s;
        }
        .shape-4 {
          width: 200px; /* Increased size */
          height: 200px; /* Increased size */
          top: 20%;
          right: 25%;
          border-radius: 50%;
          animation-duration: 40s;
          animation-direction: alternate-reverse;
        }

        @keyframes float-and-rotate {
          from {
            transform: translateY(-20px) rotate(0deg) scale(1);
          }
          to {
            transform: translateY(20px) rotate(180deg) scale(1.1);
          }
        }

        /* Particle Animation - Bigger and more opaque */
        .particle {
          position: absolute;
          width: 5px; /* Increased size */
          height: 5px; /* Increased size */
          border-radius: 50%;
          background-color: rgba(64, 224, 208, 0.7); /* Increased opacity */
          top: -10px;
          animation: drift 20s infinite linear;
        }

        /* Added more particle definitions for the increased count */
        .particles .particle:nth-child(1) { left: 10%; animation-duration: 22s; animation-delay: -5s; }
        .particles .particle:nth-child(2) { left: 20%; animation-duration: 18s; animation-delay: -12s; }
        .particles .particle:nth-child(3) { left: 30%; animation-duration: 25s; animation-delay: -2s; }
        .particles .particle:nth-child(4) { left: 40%; animation-duration: 15s; animation-delay: -8s; }
        .particles .particle:nth-child(5) { left: 50%; animation-duration: 23s; animation-delay: -1s; }
        .particles .particle:nth-child(6) { left: 60%; animation-duration: 19s; animation-delay: -15s; }
        .particles .particle:nth-child(7) { left: 70%; animation-duration: 28s; animation-delay: -4s; }
        .particles .particle:nth-child(8) { left: 80%; animation-duration: 16s; animation-delay: -18s; }
        .particles .particle:nth-child(9) { left: 90%; animation-duration: 21s; animation-delay: -9s; }
        .particles .particle:nth-child(10) { left: 5%; animation-duration: 26s; animation-delay: -3s; }
        .particles .particle:nth-child(11) { left: 15%; animation-duration: 17s; animation-delay: -11s; }
        .particles .particle:nth-child(12) { left: 25%; animation-duration: 24s; animation-delay: -7s; }
        .particles .particle:nth-child(13) { left: 35%; animation-duration: 14s; animation-delay: -14s; }
        .particles .particle:nth-child(14) { left: 45%; animation-duration: 29s; animation-delay: -6s; }
        .particles .particle:nth-child(15) { left: 55%; animation-duration: 20s; animation-delay: -10s; }
        .particles .particle:nth-child(16) { left: 65%; animation-duration: 18s; animation-delay: -17s; }
        .particles .particle:nth-child(17) { left: 75%; animation-duration: 27s; animation-delay: -13s; }
        .particles .particle:nth-child(18) { left: 85%; animation-duration: 16s; animation-delay: -20s; }
        .particles .particle:nth-child(19) { left: 95%; animation-duration: 22s; animation-delay: -16s; }
        .particles .particle:nth-child(20) { left: 2%; animation-duration: 25s; animation-delay: -19s; }
        .particles .particle:nth-child(21) { left: 12%; animation-duration: 19s; animation-delay: -4s; }
        .particles .particle:nth-child(22) { left: 22%; animation-duration: 28s; animation-delay: -8s; }
        .particles .particle:nth-child(23) { left: 32%; animation-duration: 15s; animation-delay: -12s; }
        .particles .particle:nth-child(24) { left: 42%; animation-duration: 23s; animation-delay: -1s; }
        .particles .particle:nth-child(25) { left: 52%; animation-duration: 20s; animation-delay: -5s; }
        .particles .particle:nth-child(26) { left: 62%; animation-duration: 17s; animation-delay: -9s; }
        .particles .particle:nth-child(27) { left: 72%; animation-duration: 26s; animation-delay: -13s; }
        .particles .particle:nth-child(28) { left: 82%; animation-duration: 14s; animation-delay: -17s; }
        .particles .particle:nth-child(29) { left: 92%; animation-duration: 21s; animation-delay: -2s; }
        .particles .particle:nth-child(30) { left: 7%; animation-duration: 29s; animation-delay: -6s; }

        @keyframes drift {
          from {
            transform: translateY(-10px) translateX(0);
            opacity: 0.8;
          }
          to {
            transform: translateY(100vh) translateX(20px);
            opacity: 0;
          }
        }
      `}</style>
    </main>
  )
}
