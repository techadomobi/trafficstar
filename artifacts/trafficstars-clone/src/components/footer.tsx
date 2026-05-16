import React from "react";
import { Link } from "wouter";
import { Twitter, Linkedin, Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react";
import logo from "../../../../attached_assets/logo_white.png";

export default function Footer() {
  const cols = [
    {
      title: "Platform",
      links: [
        { label: "Ad Formats", href: "/ad-formats" },
        { label: "RTB Technology", href: "/platform" },
        { label: "Anti-Fraud", href: "/platform" },
        { label: "API Integration", href: "/platform" },
        { label: "White Label", href: "/platform" },
      ],
    },
    {
      title: "Verticals",
      links: [
        { label: "Dating", href: "/verticals" },
        { label: "WebCams", href: "/verticals" },
        { label: "IGaming", href: "/verticals" },
        { label: "Forex", href: "/verticals" },
        { label: "Nutra", href: "/verticals" },
        { label: "Gaming", href: "/verticals" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Blog", href: "/blog" },
        { label: "Help Center", href: "/platform" },
        { label: "API Docs", href: "/platform" },
        { label: "Case Studies", href: "/blog" },
        { label: "Partner Program", href: "/start" },
      ],
    },
        {
          title: "Get Started",
          links: [
            { label: "Sign In", href: "/login" },
        { label: "Create Account", href: "/start" },
            { label: "For Advertisers", href: "/advertiser" },
            { label: "For Publishers", href: "/publisher" },
        { label: "Enterprise", href: "/start" },
      ],
    },
  ];

  return (
    <footer className="bg-[#0f0a0a] text-white pt-16 pb-8" data-testid="footer">
      <div className="container mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-5">
              <img src={logo} alt="AdoMobi" className="w-28 h-18 object-contain" />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              The global self-serve ad network for performance marketers and premium publishers.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: Twitter, href: "https://x.com/adomobinetwork", label: "X" },
                { Icon: Linkedin, href: "https://www.linkedin.com/company/adomobi-dsp/", label: "LinkedIn" },
                { Icon: Facebook, href: "https://www.facebook.com/adomobinetwork", label: "Facebook" },
                { Icon: Instagram, href: "https://www.instagram.com/adomobinetwork", label: "Instagram" },
              ].map(({ Icon, href, label }, i) => (
                <a key={i} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-bold text-white mb-5 uppercase tracking-wide">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="py-8 border-b border-white/10 flex flex-col md:flex-row gap-6 md:items-center justify-between">
          {[
            { icon: Mail, label: "support@adomobi.com" },
            { icon: Phone, label: "+91 6366666760" },
            { icon: MapPin, label: "Global Office: CN, IN, UK, HK" },
          ].map((c, i) => (
            <div key={i} className="flex items-center gap-3 text-sm text-gray-400">
              <c.icon className="w-4 h-4 text-[#F7611E]" />
              {c.label}
            </div>
          ))}
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">© 2026 AdoMobi. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
