import React, { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown, Menu, X,
  Heart, MonitorPlay, Dices, Coins, Pill, Gamepad2, ShoppingBag, Building2
} from "lucide-react";
import logo from "../../../../attached_assets/logo.png";
import { useLanguage, type SiteLanguageCode } from "@/lib/language-context";

const VERTICALS = [
  { icon: Heart, label: "Dating", desc: "Premium dating & relationships traffic" },
  { icon: MonitorPlay, label: "WebCams", desc: "Live streaming & cam platforms" },
  { icon: Dices, label: "IGaming", desc: "Casino, slots, sports betting & poker" },
  { icon: Coins, label: "Forex", desc: "Forex, crypto & fintech offers" },
  { icon: Pill, label: "Nutra", desc: "Health, beauty & supplement offers" },
  { icon: Gamepad2, label: "Gaming", desc: "Mobile & browser gaming traffic" },
  { icon: ShoppingBag, label: "Mainstream", desc: "Mass-market & general audience traffic" },
  { icon: Building2, label: "Finance", desc: "Loans, insurance & B2B offers" },
];

const LANGS: Array<{ code: SiteLanguageCode; flag: string; label: string }> = [
  { code: "EN", flag: "🇺🇸", label: "English" },
  { code: "DE", flag: "🇩🇪", label: "Deutsch" },
  { code: "ES", flag: "🇪🇸", label: "Español" },
  { code: "FR", flag: "🇫🇷", label: "Français" },
  { code: "RU", flag: "🇷🇺", label: "Русский" },
  { code: "PT", flag: "🇧🇷", label: "Português" },
  { code: "ZH", flag: "🇨🇳", label: "中文" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [verticalsOpen, setVerticalsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { activeLanguage, setLanguage } = useLanguage();
  const [location] = useLocation();

  const activeLang = LANGS.find((l) => l.code === activeLanguage) ?? LANGS[0];

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handle);
    return () => window.removeEventListener("scroll", handle);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  const isActive = (path: string) => location === path;

  return (
    <header
      data-testid="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/92 backdrop-blur-lg border-b border-border shadow-sm py-3" : "bg-white/0 py-5"
      }`}
    >
      <div className="container mx-auto px-6 md:px-10 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" data-testid="link-logo" className="flex items-center gap-2 shrink-0">
          <img src={logo} alt="AdoMobi" className="w-28 h-18 object-contain" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {/* Verticals dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setVerticalsOpen(true)}
            onMouseLeave={() => setVerticalsOpen(false)}
          >
            <Link
              href="/verticals"
              data-testid="link-verticals"
              className={`flex items-center gap-1 text-sm font-medium transition-colors px-4 py-2 rounded-lg hover:bg-secondary ${
                isActive("/verticals") ? "text-[#F7611E] bg-orange-50" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Verticals
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${verticalsOpen ? "rotate-180" : ""}`} />
            </Link>
            <AnimatePresence>
              {verticalsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-145 bg-white border border-border rounded-2xl shadow-2xl p-6 grid grid-cols-2 gap-3"
                >
                  {VERTICALS.map((v) => (
                    <Link
                      key={v.label}
                      href="/verticals"
                      data-testid={`link-vertical-${v.label.toLowerCase().replace(/[\s&]/g, "-")}`}
                      className="flex items-start gap-3 p-3 rounded-xl hover:bg-secondary transition-colors group"
                    >
                      <div className="w-9 h-9 rounded-lg gradient-bg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                        <v.icon className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-foreground">{v.label}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">{v.desc}</div>
                      </div>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {[
            { href: "/advertiser", label: "Advertisers" },
            { href: "/publisher", label: "Publishers" },
            { href: "/ad-formats", label: "Ad Formats" },
            { href: "/platform", label: "Platform" },
            { href: "/blog", label: "Blog" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              data-testid={`link-${item.href.slice(1)}`}
              className={`text-sm font-medium transition-colors px-4 py-2 rounded-lg hover:bg-secondary ${
                isActive(item.href) ? "text-[#F7611E] bg-orange-50" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Language */}
          <div className="relative" onMouseEnter={() => setLangOpen(true)} onMouseLeave={() => setLangOpen(false)}>
            <button
              data-testid="button-language"
              className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-lg hover:bg-secondary"
            >
              <span>{activeLang.flag}</span>
              <span>{activeLang.code}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${langOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full right-0 mt-2 w-44 bg-white border border-border rounded-xl shadow-xl overflow-hidden"
                >
                  {LANGS.map((l) => (
                    <button
                      key={l.code}
                      data-testid={`button-lang-${l.code.toLowerCase()}`}
                      onClick={() => {
                        setLanguage(l.code);
                        setLangOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-secondary transition-colors ${
                        activeLanguage === l.code ? "font-semibold text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      <span>{l.flag}</span> {l.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            href="/login"
            data-testid="link-signin"
            className={`text-sm font-semibold transition-colors px-4 py-2 ${
              isActive("/login") ? "text-[#F7611E]" : "text-foreground hover:text-[#F7611E]"
            }`}
          >
            Sign In
          </Link>
          <Link
            href="/start"
            data-testid="link-start"
            className="gradient-bg text-white text-sm font-bold px-6 py-2.5 rounded-full hover:shadow-lg hover:shadow-orange-500/30 transition-all transform hover:-translate-y-0.5"
          >
            START 🚀
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          data-testid="button-mobile-menu"
          className="lg:hidden p-2 rounded-lg hover:bg-secondary"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-white border-t border-border overflow-hidden"
          >
            <div className="container mx-auto px-6 py-6 space-y-1">
              {[
                { href: "/verticals", label: "Verticals" },
                { href: "/advertiser", label: "Advertisers" },
                { href: "/publisher", label: "Publishers" },
                { href: "/blog", label: "Blog" },
                { href: "/ad-formats", label: "Ad Formats" },
                { href: "/platform", label: "Platform" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block text-sm font-medium py-3 px-3 rounded-lg transition-colors ${
                    isActive(item.href) ? "text-[#F7611E] bg-orange-50" : "text-foreground hover:bg-secondary"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 flex gap-3">
                <Link href="/login" className="flex-1 text-center py-2.5 rounded-full border-2 border-border text-sm font-semibold hover:border-[#F7611E] transition-colors">
                  Sign In
                </Link>
                <Link href="/start" className="flex-1 text-center py-2.5 rounded-full gradient-bg text-white text-sm font-bold">
                  START 🚀
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
