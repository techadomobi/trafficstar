"use client"

import { useState, useEffect, useCallback } from "react"
import { useForm } from "react-hook-form"
import {
  ImageIcon,
  CalendarIcon,
  ArrowUp,
  HelpCircle,
  Megaphone,
  Eye,
  Mail,
  ShoppingCart,
  Smartphone,
  Monitor,
  Tablet,
  CheckCircle2,
  Plus,
} from "lucide-react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import dynamic from "next/dynamic"
import "react-quill-new/dist/quill.snow.css"
import { API_BASE } from "@/lib/config"
import { getDashboardIdentity } from "@/lib/session"

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false })

// --- Configuration & Data ---
// Use `NEXT_PUBLIC_API_BASE` via `API_BASE` for environment configuration

const countriesList = [
  { code: "af", name: "Afghanistan" },
  { code: "al", name: "Albania" },
  { code: "dz", name: "Algeria" },
  { code: "ad", name: "Andorra" },
  { code: "ao", name: "Angola" },
  { code: "ag", name: "Antigua and Barbuda" },
  { code: "ar", name: "Argentina" },
  { code: "am", name: "Armenia" },
  { code: "au", name: "Australia" },
  { code: "at", name: "Austria" },
  { code: "az", name: "Azerbaijan" },
  { code: "bs", name: "Bahamas" },
  { code: "bh", name: "Bahrain" },
  { code: "bd", name: "Bangladesh" },
  { code: "bb", name: "Barbados" },
  { code: "by", name: "Belarus" },
  { code: "be", name: "Belgium" },
  { code: "bz", name: "Belize" },
  { code: "bj", name: "Benin" },
  { code: "bt", name: "Bhutan" },
  { code: "bo", name: "Bolivia" },
  { code: "ba", name: "Bosnia and Herzegovina" },
  { code: "bw", name: "Botswana" },
  { code: "br", name: "Brazil" },
  { code: "bn", name: "Brunei" },
  { code: "bg", name: "Bulgaria" },
  { code: "bf", name: "Burkina Faso" },
  { code: "bi", name: "Burundi" },
  { code: "cv", name: "Cabo Verde" },
  { code: "kh", name: "Cambodia" },
  { code: "cm", name: "Cameroon" },
  { code: "ca", name: "Canada" },
  { code: "cf", name: "Central African Republic" },
  { code: "td", name: "Chad" },
  { code: "cl", name: "Chile" },
  { code: "cn", name: "China" },
  { code: "co", name: "Colombia" },
  { code: "km", name: "Comoros" },
  { code: "cg", name: "Congo" },
  { code: "cd", name: "Congo (Democratic Republic)" },
  { code: "cr", name: "Costa Rica" },
  { code: "hr", name: "Croatia" },
  { code: "cu", name: "Cuba" },
  { code: "cy", name: "Cyprus" },
  { code: "cz", name: "Czech Republic" },
  { code: "dk", name: "Denmark" },
  { code: "dj", name: "Djibouti" },
  { code: "dm", name: "Dominica" },
  { code: "do", name: "Dominican Republic" },
  { code: "ec", name: "Ecuador" },
  { code: "eg", name: "Egypt" },
  { code: "sv", name: "El Salvador" },
  { code: "gq", name: "Equatorial Guinea" },
  { code: "er", name: "Eritrea" },
  { code: "ee", name: "Estonia" },
  { code: "sz", name: "Eswatini" },
  { code: "et", name: "Ethiopia" },
  { code: "fj", name: "Fiji" },
  { code: "fi", name: "Finland" },
  { code: "fr", name: "France" },
  { code: "ga", name: "Gabon" },
  { code: "gm", name: "Gambia" },
  { code: "ge", name: "Georgia" },
  { code: "de", name: "Germany" },
  { code: "gh", name: "Ghana" },
  { code: "gr", name: "Greece" },
  { code: "gd", name: "Grenada" },
  { code: "gt", name: "Guatemala" },
  { code: "gn", name: "Guinea" },
  { code: "gw", name: "Guinea-Bissau" },
  { code: "gy", name: "Guyana" },
  { code: "ht", name: "Haiti" },
  { code: "hn", name: "Honduras" },
  { code: "hu", name: "Hungary" },
  { code: "is", name: "Iceland" },
  { code: "in", name: "India" },
  { code: "id", name: "Indonesia" },
  { code: "ir", name: "Iran" },
  { code: "iq", name: "Iraq" },
  { code: "ie", name: "Ireland" },
  { code: "il", name: "Israel" },
  { code: "it", name: "Italy" },
  { code: "jm", name: "Jamaica" },
  { code: "jp", name: "Japan" },
  { code: "jo", name: "Jordan" },
  { code: "kz", name: "Kazakhstan" },
  { code: "ke", name: "Kenya" },
  { code: "ki", name: "Kiribati" },
  { code: "kp", name: "Korea (North)" },
  { code: "kr", name: "Korea (South)" },
  { code: "kw", name: "Kuwait" },
  { code: "kg", name: "Kyrgyzstan" },
  { code: "la", name: "Laos" },
  { code: "lv", name: "Latvia" },
  { code: "lb", name: "Lebanon" },
  { code: "ls", name: "Lesotho" },
  { code: "lr", name: "Liberia" },
  { code: "ly", name: "Libya" },
  { code: "li", name: "Liechtenstein" },
  { code: "lt", name: "Lithuania" },
  { code: "lu", name: "Luxembourg" },
  { code: "mg", name: "Madagascar" },
  { code: "mw", name: "Malawi" },
  { code: "my", name: "Malaysia" },
  { code: "mv", name: "Maldives" },
  { code: "ml", name: "Mali" },
  { code: "mt", name: "Malta" },
  { code: "mh", name: "Marshall Islands" },
  { code: "mr", name: "Mauritania" },
  { code: "mu", name: "Mauritius" },
  { code: "mx", name: "Mexico" },
  { code: "fm", name: "Micronesia" },
  { code: "md", name: "Moldova" },
  { code: "mc", name: "Monaco" },
  { code: "mn", name: "Mongolia" },
  { code: "me", name: "Montenegro" },
  { code: "ma", name: "Morocco" },
  { code: "mz", name: "Mozambique" },
  { code: "mm", name: "Myanmar" },
  { code: "na", name: "Namibia" },
  { code: "nr", name: "Nauru" },
  { code: "np", name: "Nepal" },
  { code: "nl", name: "Netherlands" },
  { code: "nz", name: "New Zealand" },
  { code: "ni", name: "Nicaragua" },
  { code: "ne", name: "Niger" },
  { code: "ng", name: "Nigeria" },
  { code: "mk", name: "North Macedonia" },
  { code: "no", name: "Norway" },
  { code: "om", name: "Oman" },
  { code: "pk", name: "Pakistan" },
  { code: "pw", name: "Palau" },
  { code: "ps", name: "Palestine" },
  { code: "pa", name: "Panama" },
  { code: "pg", name: "Papua New Guinea" },
  { code: "py", name: "Paraguay" },
  { code: "pe", name: "Peru" },
  { code: "ph", name: "Philippines" },
  { code: "pl", name: "Poland" },
  { code: "pt", name: "Portugal" },
  { code: "qa", name: "Qatar" },
  { code: "ro", name: "Romania" },
  { code: "ru", name: "Russia" },
  { code: "rw", name: "Rwanda" },
  { code: "kn", name: "Saint Kitts and Nevis" },
  { code: "lc", name: "Saint Lucia" },
  { code: "vc", name: "Saint Vincent and the Grenadines" },
  { code: "ws", name: "Samoa" },
  { code: "sm", name: "San Marino" },
  { code: "st", name: "Sao Tome and Principe" },
  { code: "sa", name: "Saudi Arabia" },
  { code: "sn", name: "Senegal" },
  { code: "rs", name: "Serbia" },
  { code: "sc", name: "Seychelles" },
  { code: "sl", name: "Sierra Leone" },
  { code: "sg", name: "Singapore" },
  { code: "sk", name: "Slovakia" },
  { code: "si", name: "Slovenia" },
  { code: "sb", name: "Solomon Islands" },
  { code: "so", name: "Somalia" },
  { code: "za", name: "South Africa" },
  { code: "ss", name: "South Sudan" },
  { code: "es", name: "Spain" },
  { code: "lk", name: "Sri Lanka" },
  { code: "sd", name: "Sudan" },
  { code: "sr", name: "Suriname" },
  { code: "se", name: "Sweden" },
  { code: "ch", name: "Switzerland" },
  { code: "sy", name: "Syria" },
  { code: "tw", name: "Taiwan" },
  { code: "tj", name: "Tajikistan" },
  { code: "tz", name: "Tanzania" },
  { code: "th", name: "Thailand" },
  { code: "tl", name: "Timor-Leste" },
  { code: "tg", name: "Togo" },
  { code: "to", name: "Tonga" },
  { code: "tt", name: "Trinidad and Tobago" },
  { code: "tn", name: "Tunisia" },
  { code: "tr", name: "Turkey" },
  { code: "tm", name: "Turkmenistan" },
  { code: "tv", name: "Tuvalu" },
  { code: "ug", name: "Uganda" },
  { code: "ua", name: "Ukraine" },
  { code: "ae", name: "United Arab Emirates" },
  { code: "uk", name: "United Kingdom" },
  { code: "us", name: "United States" },
  { code: "uy", name: "Uruguay" },
  { code: "uz", name: "Uzbekistan" },
  { code: "vu", name: "Vanuatu" },
  { code: "va", name: "Vatican City" },
  { code: "ve", name: "Venezuela" },
  { code: "vn", name: "Vietnam" },
  { code: "ye", name: "Yemen" },
  { code: "zm", name: "Zambia" },
  { code: "zw", name: "Zimbabwe" },
]

const objectiveOptions = [
  "CPC",
  "CPM",
  "CPI",
  "CPA",
  "CPL",
  "CPS",
  "CPO",
  "CPP",
  "CPV",
  "CPE",
  "CPH",
  "CPIA",
  "CPR",
  "CPSU",
  "CPU",
  "CPFT",
  "CPD",
  "CPVV",
  "VTR",
  "CPRC",
  "CTV",
  "LTV",
  "ROAS",
  "ATC",
]

const categoriesList = [
  "E-commerce",
  "Finance & Fintech",
  "Insurance",
  "Education & E-Learning",
  "Gaming",
  "Health & Fitness",
  "Travel & Tourism",
  "Food & Delivery",
  "Lifestyle & Fashion",
  "Real Estate",
  "Automobile",
  "OTT & Entertainment",
  "Mobile Apps",
  "SaaS / Software",
  "B2B Services",
  "Telecom & Recharge",
  "Subscription Services",
  "Dating",
  "Crypto & Web3",
  "Home Services",
  "Retail & Hyperlocal",
  "Beauty & Personal Care",
  "Marketplace",
  "Job & Recruitment",
  "Logistics & Delivery",
  "Event & Ticketing",
  "Pharma & Healthcare",
  "Electronics & Gadgets",
  "Affiliate Networks",
  "NGO & Donation Campaigns",
  "Government & Public Services",
  "Banking & Loans",
  "Gambling & Betting (if allowed)",
  "Music & Audio Apps",
  "Utilities & Tools Apps",
]

const verticalsList = [
  "E-commerce",
  "Finance",
  "Fintech",
  "Insurance",
  "Education",
  "E-Learning",
  "Gaming",
  "Health",
  "Fitness",
  "Travel",
  "Tourism",
  "Food Delivery",
  "Lifestyle",
  "Fashion",
  "Real Estate",
  "Automobile",
  "Entertainment",
  "OTT",
  "Mobile Apps",
  "SaaS",
  "Software",
  "B2B",
  "Telecom",
  "Recharge",
  "Subscription",
  "Dating",
  "Crypto",
  "Web3",
  "Home Services",
  "Retail",
  "Hyperlocal",
  "Beauty",
  "Personal Care",
  "Marketplace",
  "Recruitment",
  "Jobs",
  "Logistics",
  "Delivery",
  "Event",
  "Ticketing",
  "Pharma",
  "Healthcare",
  "Electronics",
  "Gadgets",
  "Affiliate",
  "NGO",
  "Donations",
  "Government",
  "Public Services",
  "Banking",
  "Loans",
  "Utilities",
  "Tools",
  "Gambling (if allowed)",
  "Betting (if allowed)",
  "Music",
  "Audio Apps",
]

const trafficTypesList = [
  "Display",
  "Native",
  "Push",
  "Pop / Pop-under",
  "In-App",
  "Mobile Web",
  "Desktop Web",
  "Search",
  "Social",
  "Email Traffic",
  "SMS Traffic",
  "Video",
  "Rewarded Video",
  "Interstitial",
  "Banners",
  "Playable Ads",
  "Programmatic",
  "RTB (Real-Time Bidding)",
  "Direct Publisher",
  "API Traffic",
  "Smartlink Traffic",
  "Broker / Mixed Inventory",
  "Contextual Traffic",
  "Adult (If allowed)",
  "OTT",
  "CTV",
  "DOOH (Digital Out-of-Home)",
  "Wi-Fi Ads",
  "Toolbar / Extension Traffic",
  "Carrier Traffic",
  "Operator Traffic",
  "Preload App Traffic",
]

const marketingObjectives = [
  {
    id: "awareness",
    label: "BRAND AWARENESS",
    icon: Megaphone,
    color: "bg-red-50 text-red-700 hover:bg-red-100 border-red-200",
  },
  {
    id: "engagement",
    label: "WEBSITE ENGAGEMENT",
    icon: Eye,
    color: "bg-orange-50 text-orange-700 hover:bg-orange-100 border-orange-200",
  },
  {
    id: "leads",
    label: "LEAD GENERATION",
    icon: Mail,
    color: "bg-orange-50 text-orange-700 hover:bg-orange-100 border-orange-200",
  },
  {
    id: "purchases",
    label: "ONLINE PURCHASES",
    icon: ShoppingCart,
    color: "bg-yellow-50 text-yellow-700 hover:bg-yellow-100 border-yellow-200",
  },
  {
    id: "app",
    label: "APP PROMOTION",
    icon: Smartphone,
    color: "bg-orange-50 text-orange-700 hover:bg-orange-100 border-orange-200",
  },
]

const platformOptions = [
  {
    id: "desktop",
    label: "DESKTOP",
    icon: Monitor,
    color: "bg-orange-50 text-orange-700 hover:bg-orange-100 border-orange-200",
  },
  {
    id: "mobile",
    label: "MOBILE",
    icon: Smartphone,
    color: "bg-orange-50 text-orange-700 hover:bg-orange-100 border-orange-200",
  },
  {
    id: "tablet",
    label: "TABLET",
    icon: Tablet,
    color: "bg-orange-50 text-orange-700 hover:bg-orange-100 border-orange-200",
  },
]

// --- Helper Components for Selectable Cards (UI-Only) ---
const ObjectiveCard = ({ icon: Icon, label, value, selectedValue, onSelect, color }) => (
  <div
    onClick={() => onSelect(selectedValue === value ? null : value)}
    className={cn(
      "relative cursor-pointer rounded-lg border shadow-sm transition-all p-1",
      color,
      selectedValue === value ? "border-primary ring-2 ring-primary" : "border-input hover:border-accent-foreground",
    )}
  >
    <div className="absolute top-2.5 left-2.5 h-5 w-5 rounded-full border border-muted-foreground flex items-center justify-center">
      {selectedValue === value && <div className="h-2.5 w-2.5 rounded-full bg-primary" />}
    </div>
    <div className="flex flex-col items-center justify-center gap-3 p-4 pt-10">
      <Icon className="h-8 w-8 text-current" />
      <span className="text-center text-xs font-medium uppercase tracking-wider">{label}</span>
    </div>
  </div>
)

const PlatformCard = ({ icon: Icon, label, value, selectedValue, onSelect, color }) => (
  <div
    onClick={() => onSelect(selectedValue === value ? null : value)}
    className={cn(
      "relative cursor-pointer rounded-lg border shadow-sm transition-all p-1",
      color,
      selectedValue === value ? "border-primary ring-2 ring-primary" : "border-input hover:border-accent-foreground",
    )}
  >
    <div className="absolute top-2.5 left-2.5 h-5 w-5 rounded-full border border-muted-foreground flex items-center justify-center">
      {selectedValue === value && <div className="h-2.5 w-2.5 rounded-full bg-primary" />}
    </div>
    <div className="flex flex-col items-center justify-center gap-3 p-4 pt-10">
      <Icon className="h-8 w-8 text-current" />
      <span className="text-center text-xs font-medium uppercase tracking-wider">{label}</span>
    </div>
  </div>
)

export default function OfferCreateFormForAdvertiser() {
  // --- State Management ---
  const [isLoading, setIsLoading] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [formSuccess, setFormSuccess] = useState(false)
  const [formError, setFormError] = useState(null)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [advertiserData, setAdvertiserData] = useState(null)
  const [formProgress, setFormProgress] = useState(0)
  const [selectedCountryCodes, setSelectedCountryCodes] = useState([])
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false)
  const [isCustomObjective, setIsCustomObjective] = useState(false)

  // --- State for UI-only sections (not part of form submission) ---
  const [selectedObjective, setSelectedObjective] = useState(null)
  const [selectedPlatform, setSelectedPlatform] = useState(null)

  const defaultFormValues = {
    image: undefined,
    title: "",
    advertiserId: "",
    privacyLevel: "",
    description: "",
    offerKpi: "",
    category: "",
    vertical: "",
    traffic: "",
    operatingSystem: "",
    osAllowed: "",
    incentive: "",
    eventType: "",
    eventName: "",
    eventValue: "",
    saleAmount: false,
    currency: "$",
    payout: undefined,
    revenue: undefined,
    geoAllowed: "",
    trackingUrl: "",
    previewUrl: "",
    impressionUrl: "",
    fallbackUrl: "",
    startDate: undefined,
    endDate: undefined,
    packageName: "",
  }

  const form = useForm({
    defaultValues: defaultFormValues,
    mode: "onSubmit",
  })

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
    getValues,
    setValue,
    watch,
  } = form

  // Handle country selection change
  const handleCountryChange = (countryCode) => {
    if (countryCode === "All") {
      if (selectedCountryCodes.includes("All")) {
        setSelectedCountryCodes([])
      } else {
        setSelectedCountryCodes(["All"])
      }
    } else {
      setSelectedCountryCodes((prev) => {
        const withoutAll = prev.filter((code) => code !== "All")
        if (withoutAll.includes(countryCode)) {
          return withoutAll.filter((code) => code !== countryCode)
        } else {
          return [...withoutAll, countryCode]
        }
      })
    }
  }

  // Sync selectedCountryCodes with form value
  useEffect(() => {
    if (selectedCountryCodes.includes("All")) {
      setValue("geoAllowed", "All")
    } else {
      setValue("geoAllowed", selectedCountryCodes.join(","))
    }
  }, [selectedCountryCodes, setValue])

  // Close country dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isCountryDropdownOpen &&
        !event.target.closest("#create-country-dropdown") &&
        !event.target.closest(".country-dropdown-content")
      ) {
        setIsCountryDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isCountryDropdownOpen])

  // --- Handlers ---
  const handlePlatformSelect = (platformId) => {
    setSelectedPlatform(selectedPlatform === platformId ? null : platformId)
  }

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    setFormError(null)

    if (file) {
      const validImageTypes = ["image/jpeg", "image/png", "image/gif"]
      if (!validImageTypes.includes(file.type)) {
        setFormError("Invalid file type. Please select a JPG, PNG, or GIF.")
        return
      }

      if (file.size > 5 * 1024 * 1024) {
        setFormError("File size exceeds 5MB limit.")
        return
      }

      if (selectedImage) URL.revokeObjectURL(selectedImage)

      const objectUrl = URL.createObjectURL(file)
      setSelectedImage(objectUrl)
      setValue("image", file, { shouldValidate: true })
    }
  }

  // Clean up the object URL when the component unmounts or image changes
  useEffect(() => {
    return () => {
      if (selectedImage) {
        URL.revokeObjectURL(selectedImage)
      }
    }
  }, [selectedImage])

  const onSubmit = async (data) => {
    setIsLoading(true)
    setFormError(null)
    setFormSuccess(false)

    if (data.image && !(data.image instanceof File)) {
      console.error("Image data is not a File object:", data.image)
      setFormError("Invalid image file provided.")
      setIsLoading(false)
      return
    }

    try {
      const formData = new FormData()

      // Iterate through form data
      for (const key in data) {
        const value = data[key]

        // Special handling for privacyLevel -> privacyLavel (API uses this spelling)
        if (key === "privacyLevel") {
          if (value && value !== "") {
            formData.append("privacyLavel", value)
          }
        }
        // Special handling for geoAllowed and country_code mapping
        else if (key === "geoAllowed") {
          if (value === "All") {
            formData.append("geoAllowed", "All")
            formData.append("country_code", "All")
          } else if (value && typeof value === "string" && value.length > 0) {
            formData.append("geoAllowed", value)
            const codes = value
              .split(",")
              .map((c) => c.trim())
              .filter(Boolean)
            codes.forEach((code) => {
              formData.append("country_code", code)
            })
          } else {
            formData.append("geoAllowed", "")
            formData.append("country_code", "")
          }
        }
        // Special handling for 'incentive' value transformation
        else if (key === "incentive") {
          if (value === "not-specified") {
            formData.append(key, "")
          } else if (value !== undefined && value !== null) {
            formData.append(key, value)
          }
        }
        // Handle the image file specifically
        else if (key === "image" && value instanceof File) {
          formData.append(key, value)
        }
        // Handle date fields specifically
        else if (key === "startDate" || key === "endDate") {
          if (value instanceof Date) {
            formData.append(key, value.toISOString())
          } else if (value === undefined || value === null) {
            formData.append(key, "")
          }
        }
        // Handle other fields, appending only if value is not undefined or null
        else if (value !== undefined && value !== null) {
          formData.append(key, value)
        }
      }

      // Append partners_Id and advertiserId from local storage
      const { session, partnersId, actorId } = getDashboardIdentity()
      if (partnersId) {
        formData.append("partners_Id", partnersId)
      } else {
        console.error("User ID not found for submission.")
        setFormError("User information missing for submission.")
        setIsLoading(false)
        return
      }

      // If advertiserId is in the logged in user data, use it
      if (actorId || session?.advertiserId) {
        // Don't append again if already in form data
        if (!data.advertiserId) {
          formData.append("advertiserId", actorId || session.advertiserId)
        }
      }

      // Debugging: Log FormData contents
      console.log("FormData contents:")
      for (const pair of formData.entries()) {
        console.log(pair[0] + ": " + pair[1])
      }

      const token = localStorage.getItem("authToken")
      const response = await fetch(`${API_BASE}offer/createOffer`, {
        method: "POST",
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
        },
        body: formData,
      })

      // Attempt to parse JSON response regardless of status
      let responseData = null
      try {
        responseData = await response.json()
        console.log("API response data:", responseData)
      } catch (parseError) {
        console.error("Failed to parse API response JSON:", parseError)
      }

      if (!response.ok) {
        let errorDetails = ""
        if (responseData && responseData.responseMessage) {
          errorDetails = responseData.responseMessage
        } else if (responseData && responseData.message) {
          errorDetails = responseData.message
        } else if (responseData && responseData.error) {
          errorDetails = responseData.error
        } else if (responseData) {
          errorDetails = JSON.stringify(responseData)
        } else {
          errorDetails = await response.text()
        }
        console.error("API error during offer creation:", response.status, response.statusText, errorDetails)
        setFormError(`Offer creation failed: ${errorDetails}`)
        return
      }

      // Success case
      console.log("Offer creation successful response:", responseData)
      setFormSuccess(true)
      setFormError(null)

      // Reset form to default values
      reset(defaultFormValues)
      setSelectedImage(null)
      setSelectedCountryCodes([])
      setSelectedObjective(null)
      setSelectedPlatform(null)

      // Scroll to top to show success message
      scrollToTop()
    } catch (error) {
      console.error("Form submission error:", error)
      setFormError(error.message || "Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" })

  // --- Effects ---
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.pageYOffset > 300)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    try {
      const storedData = localStorage.getItem("advertiserData")
      if (storedData) {
        setAdvertiserData(JSON.parse(storedData))
      }
    } catch (e) {
      console.error("Failed to read advertiser data:", e)
    }
  }, [])

  // Function to calculate progress
  const calculateProgress = useCallback(() => {
    const values = getValues()
    const formKeys = Object.keys(defaultFormValues)
    const totalFieldsCount = formKeys.length
    let filledCount = 0

    formKeys.forEach((key) => {
      const value = values[key]
      const isEmptyValue =
        value === undefined ||
        value === null ||
        (typeof value === "string" && value.trim() === "") ||
        (Array.isArray(value) && value.length === 0) ||
        (typeof value === "number" && isNaN(value))

      if (!isEmptyValue) {
        filledCount++
      }
    })

    return totalFieldsCount > 0 ? Math.round((filledCount / totalFieldsCount) * 100) : 0
  }, [getValues, defaultFormValues])

  // Effect to update form progress whenever form values change using watch
  useEffect(() => {
    const subscription = watch(() => {
      setFormProgress(calculateProgress())
    })
    return () => subscription.unsubscribe()
  }, [watch, calculateProgress])

  // Optional: Effect to log form errors for debugging
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      console.log("Form Validation Errors:", errors)
    }
  }, [errors])

  // --- Main Component Render ---
  return (
    <div className="min-h-screen py-4 px-2 sm:px-6 lg:px-2">
      <Card className="w-full max-w-8xl mx-auto rounded-2xl overflow-hidden bg-white shadow-xl border border-gray-200">
        <CardHeader className="space-y-1 p-6 bg-orange-100 text-white">
          <CardTitle className="text-3xl text-orange-900 font-bold">Create New Offer</CardTitle>
          <CardDescription className="text-orange-900">
            Fill in the details to create a new offer for your account.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6 lg:p-10">
          {formSuccess && (
            <div className="mb-6 p-4 bg-orange-100 text-orange-700 rounded-md">Offer created successfully!</div>
          )}

          {formError && <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md">{formError}</div>}

          <div className="mb-6">
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div
                className="bg-orange-600 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${formProgress}%` }}
              ></div>
            </div>
            <p className="text-right text-sm text-gray-500 mt-2">{formProgress}% Complete</p>
          </div>

          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-12" encType="multipart/form-data">
              {/* --- Image and Title Fields --- */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <FormField
                  control={control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">Offer Image</FormLabel>
                      <FormControl>
                        <div
                          className="w-full h-48 border-2 border-dashed rounded-md flex items-center justify-center hover:bg-gray-50 cursor-pointer relative"
                          onClick={() => document.getElementById("image-upload")?.click()}
                        >
                          {selectedImage ? (
                            <img
                              src={selectedImage}
                              alt="Preview"
                              className="w-full h-full object-contain rounded-md p-2"
                            />
                          ) : (
                            <div className="text-center text-gray-500">
                              <ImageIcon className="mx-auto h-8 w-8" />
                              <p>Click to Upload Image</p>
                              <p className="text-xs">PNG, JPG, GIF up to 5MB</p>
                            </div>
                          )}
                        </div>
                      </FormControl>
                      <input
                        id="image-upload"
                        type="file"
                        className="hidden"
                        accept="image/png, image/jpeg, image/gif"
                        onChange={handleImageChange}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-8">
                   <FormField
                    control={control}
                    name="title"
                    rules={{ required: "Title is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter offer title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={control}
                    name="packageName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">Package Name (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="com.example.app" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* --- Description and KPI Fields --- */}
              <div className="grid grid-cols-1 gap-8">
                <FormField
                  control={control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Detailed description of the offer..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="offerKpi"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">Offer KPI</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Key Performance Indicators for this offer..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* --- UI-Only Marketing Objective Section --- */}
              <div className="space-y-4">
                <FormLabel className="font-medium flex items-center gap-2">
                  Marketing Objective
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                         <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>This is for UI guidance and does not affect the offer data.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </FormLabel>
                <p className="text-sm text-muted-foreground">Select a primary goal for your campaign.</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                  {marketingObjectives.map((obj) => (
                    <ObjectiveCard
                      key={obj.id}
                      icon={obj.icon}
                      label={obj.label}
                      value={obj.id}
                      color={obj.color}
                      selectedValue={selectedObjective}
                      onSelect={setSelectedObjective}
                    />
                  ))}
                </div>
              </div>

              {/* --- UI-Only Platform Section --- */}
              <div className="space-y-4">
                <FormLabel className="font-medium flex items-center gap-2">Platform</FormLabel>
                <p className="text-sm text-muted-foreground">Target specific platforms.</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {platformOptions.map((platform) => (
                    <PlatformCard
                      key={platform.id}
                      icon={platform.icon}
                      label={platform.label}
                      value={platform.id}
                      color={platform.color}
                      selectedValue={selectedPlatform}
                      onSelect={handlePlatformSelect}
                    />
                  ))}
                </div>
              </div>

              {/* --- Category, Vertical, Traffic, OS Fields --- */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField
                  control={control}
                  name="category"
                  rules={{ required: "Category is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">Category</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categoriesList.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="vertical"
                  rules={{ required: "Vertical is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">Vertical</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Vertical" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {verticalsList.map((vertical) => (
                            <SelectItem key={vertical} value={vertical}>
                              {vertical}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="traffic"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">Traffic</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Traffic" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="display">Display</SelectItem>
                          <SelectItem value="social">Social</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="operatingSystem"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">Operating System</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select OS" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="ios">iOS</SelectItem>
                          <SelectItem value="android">Android</SelectItem>
                          <SelectItem value="all">All</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* --- Incentive and Objective Fields --- */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField
                  control={control}
                  name="incentive"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">Incentive</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select incentive type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Yes">Incentive</SelectItem>
                          <SelectItem value="No">No-Incentive</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="objective"
                  rules={{ required: "Objective is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">Objective</FormLabel>
                      <div className="space-y-2">
                        <Select
                          value={isCustomObjective ? "custom" : field.value || ""}
                          onValueChange={(v) => {
                            setIsCustomObjective(v === "custom")
                            field.onChange(v === "custom" ? "" : v)
                          }}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select objective" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {objectiveOptions.map((o) => (
                              <SelectItem key={o} value={o}>
                                {o}
                              </SelectItem>
                            ))}
                            <SelectItem value="custom">Custom...</SelectItem>
                          </SelectContent>
                        </Select>
                        {isCustomObjective && (
                          <FormControl>
                            <Input placeholder="Enter custom objective" {...field} autoFocus />
                          </FormControl>
                        )}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* --- Revenue and Geo Fields --- */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField
                  control={control}
                  name="revenue"
                  rules={{
                    min: { value: 0, message: "Must be a non-negative number." },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">Spend</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0.00"
                          {...field}
                          onChange={(e) => {
                            const value = e.target.value;
                            // Update form state with either the number or an empty string if cleared
                            field.onChange(value === '' ? '' : parseFloat(value));
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="geoAllowed"
                  rules={{ required: "Geo Targeting is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">Geo Targeting</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Country or All" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-60">
                          <SelectItem value="all">All Countries</SelectItem>
                          <hr className="my-1" />
                          {countriesList.map((c) => (
                            <SelectItem key={c.code} value={c.code}>
                              {c.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* --- URL Fields --- */}
              <div className="space-y-8">
                <FormField
                  control={control}
                  name="trackingUrl"
                  rules={{ required: "Destination URL is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">Destination URL</FormLabel>
                      <FormControl>
                        <Textarea placeholder="https://..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="previewUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">Preview URL (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="impressionUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">Impression URL (Optional)</FormLabel>
                      <FormControl>
                        <Textarea placeholder="https://..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* --- Date Fields --- */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <FormField
                    control={control}
                    name="startDate"
                    rules={{ required: "Start Date is required" }}
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="font-medium">Start Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                              >
                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                <CalendarIcon className="ml-auto h-4 w-4" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="endDate"
                    rules={{
                      validate: (value) => {
                        const startDate = getValues("startDate");
                        if (!startDate && value) return "Please select a start date first.";
                        if (startDate && value && value < startDate) {
                           return "End date must be on or after the start date.";
                        }
                        return true;
                      }
                    }}
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="font-medium">End Date (Optional)</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                                disabled={!watch("startDate")}
                              >
                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                <CalendarIcon className="ml-auto h-4 w-4" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date < (getValues("startDate") || new Date(new Date().setHours(0, 0, 0, 0)))
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

              {/* --- Submit Button --- */}
              <Button type="submit" size="lg" className="w-full text-base font-semibold py-3" disabled={isLoading}>
                {isLoading ? "Creating..." : "Create Offer"}
              </Button>
            </form>
          </Form>
        </CardContent>

        <CardFooter className="flex justify-between items-center p-6 bg-gray-50 border-t">
          <p className="text-sm text-gray-600">
            Need help?{" "}
            <a href="#" className="text-orange-600 hover:underline">
              Contact support
            </a>
          </p>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon">
                  <HelpCircle className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Get help with creating an offer</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardFooter>
      </Card>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-orange-600 text-white p-3 rounded-full shadow-lg hover:bg-orange-700 transition-colors"
        >
          <ArrowUp className="h-6 w-6" />
        </button>
      )}
    </div>
  )
}
