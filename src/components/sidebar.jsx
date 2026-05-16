// components/sidebar.jsx
"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useSidebar } from "./sidebar-provider";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import {
  Home,
  LayoutGrid,
  Target,
  Rocket,
  BarChart3,
  Gift,
  CreditCard,
  Settings,
  ChevronDown,
  ChevronUp,
  Users2,
  PlusCircle,
  Columns,
  TrendingUp,
  Coins,
  Puzzle,
  Eye,
  CheckCircle2,
} from "lucide-react";
import { usePathname } from "next/navigation";

const sidebarItems = [
  { icon: Home, label: "Dashboard", href: "/admin" },
  { icon: LayoutGrid, label: "My Campaigns", href: "/admin/campaigns" },
  { icon: Rocket, label: "Create-Campaigns", href: "/admin/create-campaign" },
  { icon: BarChart3, label: "Analytics", href: "/admin/analytic" },
  { icon: TrendingUp, label: "Tracking", href: "/admin/tracking" },
  { icon: CreditCard, label: "Wallet", href: "/admin/wallet" },
  { icon: CheckCircle2, label: "Conversion", href: "/admin/conversion" },
  {
    icon: CreditCard,
    label: "Billing",
    href: "/admin/billing",
   
  },
];

export function Sidebar() {
  const { isOpen, setIsOpen } = useSidebar();
  const [logoError, setLogoError] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const pathname = usePathname();

  const sidebarWidth = "w-48"; // Keeping original width

  const SidebarContent = useMemo(() => {
    return () => {
      return (
        <div className="flex h-full flex-col bg-white border-r border-gray-200 shadow-xl">
          {/* Enhanced Logo area */}
          <div className="py-6 px-4 bg-gradient-to-r from-orange-50 via-white to-orange-50 border-b border-gray-200 flex justify-center items-center relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-50/30 to-orange-100/20"></div>
            {logoError ? (
              <div className="h-9 w-32 bg-gradient-to-r from-orange-200 to-orange-300 animate-pulse rounded-lg shadow-sm"></div>
            ) : (
              <div className="relative group">
                <Image
                  src="/logo-5.png"
                  alt="Trackstart Logo"
                  width={130}
                  height={40}
                  className="h-9 w-auto drop-shadow-md group-hover:drop-shadow-lg transition-all duration-300 relative z-10"
                  priority
                  onError={() => setLogoError(true)}
                />
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-transparent via-orange-500/70 to-transparent rounded-full"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-100/20 to-orange-200/20 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-300 -z-10"></div>
              </div>
            )}
          </div>

          {/* Enhanced Navigation */}
          <nav className="flex-1 space-y-1.5 p-3 overflow-y-auto scrollbar-thin scrollbar-thumb-orange-300/50 scrollbar-track-transparent" aria-label="Sidebar Navigation">
            {sidebarItems.map((item, index) => (
              <div key={item.label} className="relative">
                {item.hasSubmenu ? (
                  <div
                    className={cn(
                      "group flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-300 cursor-pointer relative overflow-hidden",
                      openSubmenu === item.label
                        ? "bg-orange-50 text-orange-700 shadow-md border border-orange-200/50 scale-[1.01]"
                        : "text-gray-700 hover:bg-orange-50 hover:text-orange-700 hover:shadow-sm hover:scale-[1.005]"
                    )}
                    onClick={() =>
                      setOpenSubmenu(
                        openSubmenu === item.label ? null : item.label
                      )
                    }
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "flex items-center justify-center w-8 h-8 rounded-xl transition-all duration-300 shadow-sm",
                        openSubmenu === item.label
                          ? "bg-orange-100 shadow-md"
                          : "bg-gray-100 group-hover:bg-orange-100"
                      )}>
                        <item.icon className={cn(
                          "h-4 w-4 transition-all duration-300",
                          openSubmenu === item.label ? "text-orange-600" : "text-gray-600 group-hover:text-orange-600"
                        )} aria-hidden="true" />
                      </div>
                      <span className="font-medium">{item.label}</span>
                    </div>
                    {item.hasSubmenu &&
                      (openSubmenu === item.label ? (
                        <ChevronUp className="h-4 w-4 text-orange-500 transition-transform duration-300 rotate-0" aria-hidden="true" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-gray-400 group-hover:text-orange-500 transition-all duration-300" aria-hidden="true" />
                      ))}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "group flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold transition-all duration-300 relative overflow-hidden",
                      pathname === item.href
                        ? "bg-gradient-to-r from-orange-600 to-orange-700 text-white shadow-lg border border-orange-500/50 transform scale-[1.02]"
                        : "text-gray-700 hover:bg-orange-50 hover:text-orange-700 hover:shadow-sm hover:scale-[1.005]"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "flex items-center justify-center w-8 h-8 rounded-xl transition-all duration-300 shadow-sm",
                        pathname === item.href
                          ? "bg-white/90 shadow-md"
                          : "bg-gray-100 group-hover:bg-orange-100"
                      )}>
                        <item.icon
                          className={cn(
                            "h-4 w-4 transition-all duration-300",
                            pathname === item.href ? "text-orange-600" : "text-gray-600 group-hover:text-orange-600"
                          )}
                          aria-hidden="true"
                        />
                      </div>
                      <span>{item.label}</span>
                    </div>

                    {pathname === item.href && (
                      <div className="flex items-center gap-1">
                        <div className="h-2 w-2 rounded-full bg-white/90 animate-pulse shadow-sm"></div>
                        <div className="h-1.5 w-1.5 rounded-full bg-white/70"></div>
                      </div>
                    )}
                    
                    {/* Enhanced active indicator */}
                    {pathname === item.href && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-white/90 to-white/60 rounded-r-full shadow-sm"></div>
                    )}
                  </Link>
                )}

                {item.hasSubmenu && openSubmenu === item.label && (
                  <div className="mt-2 ml-4 space-y-1 border-l-2 border-orange-200 pl-3 animate-in slide-in-from-top-2 duration-300">
                    {item.submenu.map((subitem) => (
                      <Link
                        key={subitem.href}
                        href={subitem.href}
                        className={cn(
                          "block rounded-lg px-3 py-2 text-xs transition-all duration-200 relative group",
                          pathname === subitem.href
                            ? "bg-orange-50 text-orange-700 font-medium shadow-sm border border-orange-200/50"
                            : "text-gray-600 hover:text-orange-700 hover:bg-orange-50"
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <div className={cn(
                            "h-1.5 w-1.5 rounded-full transition-all duration-200",
                            pathname === subitem.href ? "bg-orange-500 shadow-sm" : "bg-gray-400 group-hover:bg-orange-500"
                          )}></div>
                          {subitem.label}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Enhanced Footer */}
          <div className="border-t border-gray-200 p-3 bg-white">
            <div className="text-xs text-gray-600 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-orange-100 flex items-center justify-center shadow-sm">
                  <span className="text-xs font-bold text-orange-700">A</span>
                </div>
                <p className="font-medium">© 2025 Trackstart</p>
              </div>
              <div className="flex space-x-2">
                <a href="#" className="text-gray-400 hover:text-orange-600 transition-all duration-200 hover:scale-110 p-0.5 rounded">
                  <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-orange-600 transition-all duration-200 hover:scale-110 p-0.5 rounded">
                  <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.032 10.032 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.902 4.902 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-orange-600 transition-all duration-200 hover:scale-110 p-0.5 rounded">
                  <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      );
    };
  }, [pathname, logoError, openSubmenu]);

  return (
    <>
      <div className={`hidden md:block fixed top-0 left-0 h-screen ${sidebarWidth} shadow-xl`} style={{ zIndex: 50 }}>
        <SidebarContent />
      </div>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="left" className={`p-0 ${sidebarWidth} border-r border-gray-200 shadow-2xl`}>
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  );
}
