'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
// Updated icon imports to include the new ones
import { Eye, EyeOff, Mail, Lock, ArrowRight, User, MessageSquare, Sparkles, Shield } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Helper for social icons (retained from original code)
const FacebookIcon = () => (
    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
    </svg>
);
const GoogleIcon = () => (
    <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48" aria-hidden="true">
        <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
        <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z" />
        <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.222 0-9.618-3.226-11.283-7.581l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
        <path fill="#1976D2" d="M43.611 20.083H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.012 36.426 44 30.638 44 24c0-1.341-.138-2.65-.389-3.917z" />
    </svg>
);


export default function SignUpPageV2() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-white via-orange-50 to-amber-50">
      {/* --- Enhanced Background Animations --- */}
      <div className="absolute inset-0 z-0">
        <div className="aurora-blob w-[800px] h-[800px] bg-orange-200/25 animation-aurora-move"></div>
        <div className="aurora-blob w-[700px] h-[700px] bg-amber-200/20 animation-delay-2000 animation-aurora-float"></div>
        <div className="aurora-blob w-[900px] h-[900px] bg-emerald-200/15 animation-delay-4000 animation-aurora-move"></div>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 w-full min-h-screen">
        {/* Left Section - Brand & Features */}
        <div className="hidden lg:flex flex-col justify-between p-12">
           <div>
            <div className="flex items-center gap-3 mb-16 animate-fade-in-left">
              <Image src="/logo-5.png" alt="Trackstart" width={200} height={40} />
            </div>

            <h1 className="text-5xl xl:text-6xl font-bold text-orange-900 leading-tight mb-6 animate-fade-in-left">
              Start Your Journey,{" "}
              <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                Amplify Your Reach.
              </span>
            </h1>

            <p className="text-xl lg:text-2xl text-orange-700 mb-12 animate-fade-in-left">
              Create an account to access premium traffic, advanced analytics, and powerful campaign tools.
            </p>

            {/* --- UPDATED: Expanded Feature List --- */}
            <div className="space-y-3">
                {[
                    { icon: User, text: "Simple and fast onboarding process", color: "text-orange-600" },
                    { icon: MessageSquare, text: "Dedicated 24/7 expert support", color: "text-amber-600" },
                    { icon: Sparkles, text: "AI-powered traffic optimization", color: "text-emerald-600" },
                    { icon: Shield, text: "Bank-level security & fraud protection", color: "text-orange-600" },
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
              <p className="text-3xl lg:text-4xl font-bold text-orange-900">1BN+</p>
              <p className="text-orange-700 lg:text-lg">Monthly Impressions</p>
            </div>
            <div>
              <p className="text-3xl lg:text-4xl font-bold text-orange-900">15 Min</p>
              <p className="text-orange-700 lg:text-lg">Avg. Setup Time</p>
            </div>
          </div>
        </div>

        {/* Right Section - Sign Up Form */}
        <div className="flex flex-col justify-center items-center p-6 lg:p-8 bg-white/30 backdrop-blur-sm">
          <div className="w-full max-w-lg">
            <div className="w-full bg-white/70 backdrop-blur-md border border-orange-200/50 rounded-2xl p-8 shadow-lg shadow-orange-100/50">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-slate-900">Create an Account</h2>
                <p className="text-slate-600 mt-2 text-base">Get started for free!</p>
              </div>

              {/* Social Login Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                  <Button variant="outline" className="w-full h-11 border-slate-300 text-slate-700 hover:bg-slate-50">
                      <GoogleIcon />
                      Sign up with Google
                  </Button>
                  <Button variant="outline" className="w-full h-11 border-slate-300 text-slate-700 hover:bg-slate-50">
                      <FacebookIcon />
                      Sign up with Facebook
                  </Button>
              </div>

              {/* Separator */}
              <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-slate-300" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-slate-500">
                          Or Sign up with email
                      </span>
                  </div>
              </div>


              <form className="space-y-4">
                {/* Email Input */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      className="h-12 pl-11 bg-orange-50/50 border-2 border-orange-200/60 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 rounded-lg text-slate-900 placeholder:text-slate-400 transition-colors text-base"
                      required
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
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
                   <div className="flex items-center space-x-2 text-xs text-slate-500 mt-2">
                        <span className="flex h-1.5 w-1.5 rounded-full bg-green-500"></span>
                        <span>6 or more characters, letters and numbers</span>
                    </div>
                </div>
                 
                {/* Contact Method */}
                <div className='pt-2'>
                    <label className="block text-sm font-medium text-slate-700 mb-2">How can we reach you?</label>
                    <div className="grid grid-cols-3 gap-2">
                        <div className="col-span-1">
                             <Select defaultValue="telegram">
                                <SelectTrigger className="h-12 bg-orange-50/50 border-2 border-orange-200/60 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 rounded-lg text-slate-900">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="telegram">Telegram</SelectItem>
                                    <SelectItem value="whatsapp">WhatsApp</SelectItem>
                                    <SelectItem value="skype">Skype</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="col-span-2">
                            <Input
                            type="text"
                            placeholder="@username or phone"
                            className="h-12 bg-orange-50/50 border-2 border-orange-200/60 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 rounded-lg text-slate-900 placeholder:text-slate-400 transition-colors text-base"
                            />
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full h-12 text-base bg-gradient-to-r from-orange-600 to-amber-500 hover:brightness-110 text-white font-semibold rounded-lg shadow-md hover:shadow-orange-500/30 transition-all duration-300 transform hover:scale-105 group mt-4"
                >
                    <div className="flex items-center justify-center space-x-2">
                      <span>Create Free Account</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                </Button>
              </form>

              <div className="text-center text-xs text-slate-500 mt-6 space-y-2">
                <p>
                  By signing up, you agree to our{' '}
                  <Link href="/terms" className="font-semibold text-orange-600 hover:underline">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="font-semibold text-orange-600 hover:underline">
                    Privacy Policy
                  </Link>
                  .
                </p>
             </div>

              <p className="text-center text-sm text-slate-600 mt-6 pt-6 border-t border-orange-200/50">
                Already have an account?{" "}
                <Link
                  href="/"
                  className="font-semibold text-orange-600 hover:text-orange-700 transition-colors"
                >
                  Sign In
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
          0% { transform: translate(-50%, -50%) rotate(0deg) scale(1); }
          50% { transform: translate(-45%, -55%) rotate(180deg) scale(1.3); }
          100% { transform: translate(-50%, -50%) rotate(360deg) scale(1); }
        }
        @keyframes aurora-float {
          0% { transform: translate(-50%, -50%) scale(1); }
          100% { transform: translate(-55%, -45%) scale(1.4); }
        }
        @keyframes fade-in-left {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fade-in-right {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fade-in-left {
          animation: fade-in-left 0.8s ease-out both;
          animation-delay: 200ms;
        }
        .animate-fade-in-right {
          animation: fade-in-right 0.8s ease-out both;
        }
        .animation-delay-2000 { animation-delay: -20s; }
        .animation-delay-4000 { animation-delay: -30s; }
      `}</style>
    </main>
  );
}
