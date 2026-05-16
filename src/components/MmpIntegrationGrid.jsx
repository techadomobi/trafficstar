"use client"

import { LogIn, Settings, BookOpen, CheckCircle, RadioTower } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils" // Assumes you have a utility for classnames

// --- DATA FOR THE INTEGRATIONS (USING LOCAL IMAGE PATHS) ---
const integrations = [
  {
    name: "Trackier",
    logo: "/new-2.png", // Local path
    description: "Highly Scalable Mobile Attribution Platform Is Here, Take Your Mobile Marketing To A Different Level.",
    status: "connected",
  },
  {
    name: "AppsFlyer",
    logo: "/apps.png", // Local path
    description: "Know With 100% Certainty Which User Converted From A Link Across Different Platforms. Take the Guesswork Out of Mobile Attribution for Good.",
    status: "setup",
  },
  {
    name: "Singular",
    logo: "/singular-2.png", // Local path
    description: "The world's top marketers at companies like Lyft, LinkedIn, Rovio and Microsoft use Singular to unify marketing data, apply attribution.",
    status: "instruction",
  },
  {
    name: "Adjust",
    logo: "/adjust-2.png", // Local path
    description: "We unify all your marketing activities into one powerful platform, giving you the insights you need to scale your Business.",
    status: "instruction",
  },
  {
    name: "AppMetrica",
    logo: "/appmetri.png", // Local path
    description: "The all-in-one install attribution, app analytics and marketing platform. Free & unlimited service was released by Yandex in 2013.",
    status: "instruction",
  },
  {
    name: "Branch",
    logo: "/Branch_Logo.jpg", // Local path
    description: "Our mobile linking and measurement platform provides a unified solution to deliver seamless mobile experiences and holistic attribution.",
    status: "setup",
  },
]

// --- HELPER TO GET DYNAMIC STYLES BASED ON STATUS ---
const getStatusConfig = (status) => {
  switch (status) {
    case "connected":
      return {
        badgeText: "Connected",
        badgeColor: "bg-orange-100 text-orange-800 border-orange-300",
        badgeIcon: <CheckCircle className="h-3 w-3" />,
        buttonText: "Manage",
        buttonIcon: <Settings className="mr-2 h-4 w-4" />,
        buttonColor: "bg-orange-600 hover:bg-orange-700 text-white shadow-lg shadow-orange-500/30",
        ringColor: "ring-orange-500"
      }
    case "setup":
      return {
        badgeText: "Setup Required",
        badgeColor: "bg-orange-100 text-orange-800 border-orange-300",
        badgeIcon: <RadioTower className="h-3 w-3" />,
        buttonText: "Setup",
        buttonIcon: <LogIn className="mr-2 h-4 w-4" />,
        buttonColor: "bg-orange-600 hover:bg-orange-700 text-white shadow-lg shadow-orange-500/30",
        ringColor: "ring-orange-500"
      }
    case "instruction":
    default:
      return {
        badgeText: "Available",
        badgeColor: "bg-gray-100 text-gray-700 border-gray-300",
        badgeIcon: <BookOpen className="h-3 w-3" />,
        buttonText: "View Docs",
        buttonIcon: <BookOpen className="mr-2 h-4 w-4" />,
        buttonColor: "bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 shadow-sm",
        ringColor: "ring-gray-300"
      }
  }
}

// --- MAIN COMPONENT ---
export default function MmpIntegrationGrid() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-orange-50 to-orange-100 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-8xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-extrabold text-orange-900 tracking-tight sm:text-4xl animate-fade-in-down">
            Seamless Integrations
          </h1>
          <p className="mt-3 max-w-3xl mx-auto text-md text-orange-700 animate-fade-in-up">
            Connect effortlessly with the industry&apos;s leading Mobile Measurement Partners to
            unlock advanced attribution and analytics.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {integrations.map((item) => {
            const config = getStatusConfig(item.status)
            return (
              <div
                key={item.name}
                className={cn(
                  "relative flex flex-col rounded-3xl bg-white/70 p-7 shadow-xl backdrop-blur-md",
                  "transform transition-all duration-500 ease-out",
                  "hover:scale-[1.03] hover:shadow-2xl hover:bg-white/90",
                  `focus-within:ring-4 ${config.ringColor} focus-within:ring-offset-4 focus-within:ring-offset-orange-50`
                )}
              >
                {/* Optional: Add a subtle patterned background to each card for more texture */}
                <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'0.05\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E")' }}></div>

                {/* Card Header */}
                <div className="relative z-10 flex items-start justify-between">
                  <div className="relative h-16 w-36 sm:h-24 sm:w-52 flex-shrink-0">
                    <Image
                      src={item.logo}
                      alt={`${item.name} logo`}
                      layout="fill"
                      objectFit="contain"
                      objectPosition="left"
                      className="drop-shadow-sm"
                    />
                  </div>
                  <div
                    className={cn(
                      "flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold",
                      config.badgeColor,
                      "transition-colors duration-300"
                    )}
                  >
                    {config.badgeIcon}
                    {config.badgeText}
                  </div>
                </div>
                
                {/* Description */}
                <div className="relative z-10 mt-6 flex-grow">
                  <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                    {item.description}
                  </p>
                </div>
                
                {/* Card Footer with Button */}
                <div className="relative z-10 mt-8">
                  <button
                    className={cn(
                      "w-full flex items-center justify-center rounded-xl px-5 py-3 text-base font-bold",
                      config.buttonColor,
                      "transform transition-all duration-300 ease-in-out",
                      "hover:-translate-y-1 hover:shadow-xl hover:shadow-current/30",
                      "active:scale-98 focus:outline-none focus:ring-4 focus:ring-current focus:ring-opacity-50"
                    )}
                    aria-label={`${config.buttonText} ${item.name}`}
                  >
                    {config.buttonIcon}
                    {config.buttonText}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Tailwind CSS Animations (move to global CSS if preferred) */}
      <style jsx global>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-down {
          animation: fadeInDown 0.8s ease-out forwards;
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
          animation-delay: 0.2s; /* Delay for the paragraph */
        }
      `}</style>
    </div>
  )
}
