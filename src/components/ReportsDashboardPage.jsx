"use client"

import { useState, useEffect, useCallback } from "react"
import {
  format,
  startOfDay,
  endOfDay,
  subDays,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  subMonths,
} from "date-fns"
import {
  CalendarIcon as CalendarIconLucide,
  Search,
  Eye,
  CheckCircle2,
  TrendingUp,
  BarChart3,
  Target,
  MousePointer,
  Award,
  Activity,
  Minus,
  Coins,
  XCircle,
  Clock,
  ServerCrash,
  Download,
  RefreshCw,
  Sparkles,
  Zap,
  Star,
  TrendingDown,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { API_BASE } from "@/lib/config"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { fetchJsonWithIdentityFallback, getDashboardIdentity } from "@/lib/session"

// --- HELPER FUNCTIONS ---
const getDatePresetsList = () => {
  const today = new Date()
  return [
    { label: "Today", range: { from: startOfDay(today), to: endOfDay(today) } },
    { label: "Yesterday", range: { from: startOfDay(subDays(today, 1)), to: endOfDay(subDays(today, 1)) } },
    {
      label: "This Week",
      range: { from: startOfWeek(today, { weekStartsOn: 1 }), to: endOfWeek(today, { weekStartsOn: 1 }) },
    },
    { label: "This Month", range: { from: startOfMonth(today), to: endOfMonth(today) } },
    { label: "Last Month", range: { from: startOfMonth(subMonths(today, 1)), to: endOfMonth(subMonths(today, 1)) } },
  ]
}

const getPerformanceBadge = (clicks) => {
  if (clicks >= 1000)
    return {
      variant: "success",
      label: "High",
      color: "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-sm shadow-emerald-500/25",
      icon: <Zap className="h-2 w-2" />,
    }
  if (clicks >= 100)
    return {
      variant: "warning",
      label: "Good",
      color: "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-sm shadow-amber-500/25",
      icon: <Star className="h-2 w-2" />,
    }
  return {
    variant: "info",
    label: "Growing",
    color: "bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-sm shadow-orange-500/25",
    icon: <Sparkles className="h-2 w-2" />,
  }
}

const getTrendIcon = (clicks, avgClicks) => {
  if (avgClicks === 0) return <Minus className="h-2.5 w-2.5 text-slate-400" />
  if (clicks >= avgClicks * 1.2) return <TrendingUp className="h-2.5 w-2.5 text-emerald-500" />
  if (clicks <= avgClicks * 0.8) return <TrendingDown className="h-2.5 w-2.5 text-red-500" />
  return <Minus className="h-2.5 w-2.5 text-slate-400" />
}

// --- UI STATE COMPONENTS ---
const LoadingSkeleton = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-orange-50">
    <div className="container mx-auto p-3 space-y-3 animate-pulse">
      <div className="flex justify-between items-center">
        <div className="h-7 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg w-52" />
        <div className="h-7 bg-gradient-to-r from-slate-200 to-slate-300 rounded-full w-32" />
      </div>
      <div className="h-14 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-24 bg-gradient-to-br from-slate-200 to-slate-300 rounded-lg" />
        ))}
      </div>
      <div className="h-64 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg" />
    </div>
  </div>
)

const ErrorDisplay = ({ message, onRetry }) => (
  <Card className="bg-gradient-to-br from-red-50 to-rose-100 border-red-200 shadow-lg shadow-red-500/5 p-3 rounded-lg">
    <CardHeader className="p-0 mb-3">
      <CardTitle className="flex items-center gap-2 text-red-700 text-base">
        <div className="p-1 bg-red-100 rounded-full">
          <ServerCrash className="h-4 w-4" />
        </div>
        API Error
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-2 p-0">
      <p className="text-red-600 font-medium text-xs">Failed to fetch report data. Please try again later.</p>
      <div className="p-2 bg-red-100 text-red-800 text-xs rounded-md font-mono overflow-auto max-h-20">
        {message}
      </div>
      <Button
        onClick={onRetry}
        className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white shadow-sm rounded-md text-xs px-3 py-1.5"
      >
        <RefreshCw className="h-3 w-3 mr-1" />
        Retry
      </Button>
    </CardContent>
  </Card>
)

export default function EnhancedAnalyticsDashboard() {
  // --- STATE MANAGEMENT ---
  const [isMounted, setIsMounted] = useState(false)
  const [generalReportData, setGeneralReportData] = useState([])
  const [eventReportData, setEventReportData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  // --- MODIFICATION: Default date range is now "Today" ---
  const [dateRange, setDateRange] = useState({ from: startOfDay(new Date()), to: endOfDay(new Date()) })
  const [partnerId, setPartnerId] = useState(null)
  const [advertiserId, setAdvertiserId] = useState(null)
  const [isDatePopoverOpen, setIsDatePopoverOpen] = useState(false)
  const [generalSearchTerm, setGeneralSearchTerm] = useState("")
  const [generalCurrentPage, setGeneralCurrentPage] = useState(1)
  const [eventSearchTerm, setEventSearchTerm] = useState("")
  const [eventCurrentPage, setEventCurrentPage] = useState(1)

  // Safely read IDs from localStorage on component mount
  useEffect(() => {
    setIsMounted(true)
    try {
      const { partnersId, actorId } = getDashboardIdentity()
      if (partnersId && actorId) {
        setPartnerId(String(partnersId))
        setAdvertiserId(String(actorId))
      } else {
        console.warn("Dashboard IDs not found in localStorage. Cannot fetch data.")
        setError("User data not found in local storage. Please log in again.")
        setIsLoading(false)
      }
    } catch (e) {
      console.error("Failed to parse advertiseData from localStorage:", e)
      setError("Failed to read user data. Please clear your cache and log in again.")
      setIsLoading(false)
    }
  }, [])

  // --- DATA FETCHING ---
  const fetchData = useCallback(async () => {
    if (!partnerId || !advertiserId) {
      return // Wait for IDs to be loaded from localStorage
    }

    setIsLoading(true)
    setError(null)
    setGeneralCurrentPage(1)
    setEventCurrentPage(1)

    const startDate = dateRange.from ? format(dateRange.from, "yyyy-MM-dd") : ""
    const endDate = dateRange.to ? format(dateRange.to, "yyyy-MM-dd") : ""

    try {
      const { token, actorCandidates } = getDashboardIdentity();
      
      // Fetch General Report Data
      const { json: generalJson } = await fetchJsonWithIdentityFallback({
        path: `${API_BASE}report/advertiserPerformanceReport`,
        partnersId: partnerId,
        actorCandidates,
        token,
        searchParams: { startDate, endDate },
      })
      setGeneralReportData(generalJson.responseResult || [])

      // Fetch Event Report Data
      const { json: eventJson } = await fetchJsonWithIdentityFallback({
        path: `${API_BASE}eventReport/advertiserEventValueReport`,
        partnersId: partnerId,
        actorCandidates,
        token,
      })

      const formattedEventData = (eventJson.responseResult || []).map((event) => ({
        offerId: event.offer_id,
        title: event.offer_name,
        eventValues: event.event_name,
        publisherId: event.publisher_id,
        totalEvent: event.impressions,
        totalConversions: event.conversions,
        totalPayout: Number.parseFloat(event.payout).toFixed(2),
        event_id: event.event_value_id,
        timestamp: event.created_at ? new Date(event.created_at) : new Date(),
      }))

      setEventReportData(formattedEventData)
    } catch (err) {
      console.error("API Fetch Error:", err)
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }, [dateRange, partnerId, advertiserId])

  useEffect(() => {
    if (isMounted) {
      fetchData()
    }
  }, [fetchData, isMounted])

  // --- DERIVED STATE & FILTERING ---
  const filteredGeneralData = (generalReportData || []).filter((offer) =>
    (offer.offerName || `Offer ${offer.offerId}`).toLowerCase().includes(generalSearchTerm.toLowerCase()),
  )

  const totalClicks = filteredGeneralData.reduce((sum, item) => sum + (item.clicks || 0), 0)
  const maxClicks = Math.max(0, ...filteredGeneralData.map((item) => item.clicks || 0))
  const avgClicks = filteredGeneralData.length > 0 ? totalClicks / filteredGeneralData.length : 0

  const generalItemsPerPage = 8
  const generalTotalPages = Math.ceil(filteredGeneralData.length / generalItemsPerPage)
  const generalPaginatedData = filteredGeneralData.slice(
    (generalCurrentPage - 1) * generalItemsPerPage,
    generalCurrentPage * generalItemsPerPage,
  )

  const filteredEvents = (eventReportData || []).filter(
    (event) =>
      (event.title || "").toLowerCase().includes(eventSearchTerm.toLowerCase()) ||
      (event.eventValues || "").toLowerCase().includes(eventSearchTerm.toLowerCase()),
  )

  const totalImpressions = filteredEvents.reduce((sum, item) => sum + (item.totalEvent || 0), 0)
  const totalConversions = filteredEvents.reduce((sum, item) => sum + (item.totalConversions || 0), 0)
  const totalPayout = filteredEvents.reduce((sum, item) => sum + Number.parseFloat(item.totalPayout || 0), 0)

  const eventItemsPerPage = 10
  const eventTotalPages = Math.ceil(filteredEvents.length / eventItemsPerPage)
  const eventPaginatedData = filteredEvents.slice(
    (eventCurrentPage - 1) * eventItemsPerPage,
    eventCurrentPage * eventItemsPerPage,
  )

  // --- RENDER LOGIC ---
  if (!isMounted) {
    return <LoadingSkeleton />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-orange-50">
      <div className="container mx-auto p-2 space-y-2">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-2">
          <div className="space-y-0.5">
            <h1 className="text-2xl font-black bg-gradient-to-r from-slate-900 via-orange-900 to-orange-900 bg-clip-text text-transparent tracking-tight">
              Analytics Hub
            </h1>
            <p className="text-sm text-slate-600 font-medium">Insights & Metrics</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-xs text-slate-600 bg-white/80 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-sm border border-white/20">
              <Clock className="h-3 w-3 text-slate-500" />
              <span className="font-medium">{format(new Date(), "MMM dd, hh:mm a")}</span>
            </div>
          </div>
        </div>

        <Card className="bg-white/80 backdrop-blur-sm shadow-md shadow-orange-500/5 border-white/20 rounded-lg overflow-hidden p-3">
          <CardContent className="p-0">
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-end">
              <div className="space-y-1">
                <label htmlFor="date-range" className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                  Date Range
                </label>
                <Popover open={isDatePopoverOpen} onOpenChange={setIsDatePopoverOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      id="date-range"
                      variant="outline"
                      className={cn(
                        "w-full sm:w-56 justify-start text-left font-medium h-9 px-3 rounded-md border border-slate-200 bg-white hover:bg-slate-50 hover:border-orange-300 transition-all duration-200 shadow-sm text-sm",
                        !dateRange.from && "text-muted-foreground",
                      )}
                    >
                      <CalendarIconLucide className="mr-1.5 h-3.5 w-3.5 text-slate-500" />
                      {dateRange.from && dateRange.to ? (
                        <span className="text-slate-800 font-semibold">
                          {format(dateRange.from, "MMM dd, yy")} - {format(dateRange.to, "MMM dd, yy")}
                        </span>
                      ) : (
                        <span className="text-slate-500">Select range</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto p-0 shadow-lg rounded-md border-white/20 bg-white/95 backdrop-blur-sm"
                    align="start"
                  >
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={dateRange?.from}
                      selected={dateRange}
                      onSelect={(newRange) => newRange && setDateRange(newRange)}
                      numberOfMonths={1}
                      className="rounded-md text-sm"
                    />
                    <div className="flex flex-wrap p-1.5 gap-1 border-t border-slate-100 bg-slate-50/50">
                      {getDatePresetsList().map((preset, index) => (
                        <Button
                          key={index}
                          variant="ghost"
                          size="xs"
                          onClick={() => {
                            setDateRange(preset.range)
                            setIsDatePopoverOpen(false)
                          }}
                          className="text-xs text-slate-700 hover:bg-orange-100 hover:text-orange-700 rounded-md font-medium px-2 py-0.5"
                        >
                          {preset.label}
                        </Button>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              <Button
                onClick={fetchData}
                disabled={isLoading}
                className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-sm shadow-emerald-500/25 rounded-md px-3 py-1.5 h-9 text-sm disabled:opacity-50"
              >
                <RefreshCw className={cn("h-3.5 w-3.5 mr-1.5", isLoading && "animate-spin")} />
                {isLoading ? "Refreshing..." : "Refresh"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {isLoading && !generalReportData.length ? (
          <LoadingSkeleton />
        ) : error ? (
          <ErrorDisplay message={error} onRetry={fetchData} />
        ) : (
          <Tabs defaultValue="generalReport" className="w-full space-y-4">
            <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:inline-flex bg-white/80 backdrop-blur-sm p-1 rounded-lg shadow-md shadow-orange-500/5 border border-white/20">
              <TabsTrigger
                value="generalReport"
                className="flex items-center gap-1.5 px-4 py-2 rounded-md text-slate-700 font-semibold transition-all duration-200 text-xs
                data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-600 data-[state=active]:to-orange-600
                data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:shadow-orange-500/10 data-[state=active]:scale-[1.01]"
              >
                <BarChart3 className="h-3.5 w-3.5" />
                <span>General Report</span>
              </TabsTrigger>
              <TabsTrigger
                value="eventReport"
                className="flex items-center gap-1.5 px-4 py-2 rounded-md text-slate-700 font-semibold transition-all duration-200 text-xs
                data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-600 data-[state=active]:to-orange-600
                data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:shadow-emerald-500/10 data-[state=active]:scale-[1.01]"
              >
                <Activity className="h-3.5 w-3.5" />
                <span>Event Report</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="generalReport" className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3">
                <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/10 border-0 rounded-xl overflow-hidden group hover:scale-[1.01] transition-all duration-200 p-3">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
                    <CardTitle className="text-xs font-bold uppercase tracking-wider opacity-90">Offers</CardTitle>
                    <div className="p-1.5 bg-white/20 rounded-md backdrop-blur-sm"><Award className="h-4 w-4" /></div>
                  </CardHeader>
                  <CardContent className="p-0 pt-1">
                    <div className="text-2xl font-black mb-0.5">{filteredGeneralData.length}</div>
                    <p className="text-orange-100 text-xs font-medium">Active</p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-lg shadow-emerald-500/10 border-0 rounded-xl overflow-hidden group hover:scale-[1.01] transition-all duration-200 p-3">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
                    <CardTitle className="text-xs font-bold uppercase tracking-wider opacity-90">Clicks</CardTitle>
                    <div className="p-1.5 bg-white/20 rounded-md backdrop-blur-sm"><MousePointer className="h-4 w-4" /></div>
                  </CardHeader>
                  <CardContent className="p-0 pt-1">
                    <div className="text-2xl font-black mb-0.5">{totalClicks.toLocaleString()}</div>
                    <p className="text-emerald-100 text-xs font-medium">Interactions</p>
                  </CardContent>
                </Card>
                
               
              </div>

              <Card className="bg-white/80 backdrop-blur-sm shadow-lg shadow-orange-500/5 border-white/20 rounded-xl overflow-hidden">
                <CardHeader className="p-3 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-orange-50">
                  <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-slate-900">Campaign Performance</h3>
                      <p className="text-xs text-slate-600 mt-0.5">Monitor active campaigns</p>
                    </div>
                    <div className="relative w-full sm:w-56">
                      <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                      <Input
                        type="search"
                        placeholder="Search campaigns..."
                        value={generalSearchTerm}
                        onChange={(e) => setGeneralSearchTerm(e.target.value)}
                        className="pl-8 pr-2.5 py-1.5 h-8 rounded-md border border-slate-200 focus:ring-1 focus:ring-orange-200 focus:border-orange-400 bg-white shadow-sm text-xs"
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  {generalPaginatedData.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {generalPaginatedData.map((offer, index) => {
                        const performance = getPerformanceBadge(offer.clicks)
                        const progressPercentage = maxClicks > 0 ? ((offer.clicks || 0) / maxClicks) * 100 : 0
                        return (
                          <Card
                            key={offer.offerId}
                            className="group relative bg-white shadow-sm hover:shadow-md transition-all duration-150 border  rounded-lg overflow-hidden hover:scale-[1.01] border-orange-400"
                          >
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
                            <CardContent className="p-3 space-y-3 relative z-10">
                              <div className="flex items-start justify-between">
                                <div className="space-y-0.5 flex-1">
                                  <h4 className="font-bold text-slate-900 text-sm leading-tight line-clamp-2">{offer.offerName || "Unnamed Campaign"}</h4>
                                  <Badge variant="outline" className="text-xs font-medium text-slate-600 border-slate-300 rounded-full px-1.5 py-0.5">ID: {offer.offerId}</Badge>
                                </div>
                              </div>
                              <Separator className="bg-slate-100" />
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Clicks</span>
                                  <span className="text-xl font-black text-orange-700">{(offer.clicks || 0).toLocaleString()}</span>
                                </div>
                                <div className="space-y-0.5">
                                  <Progress value={progressPercentage} className="h-1.5 rounded-full bg-slate-100" />
                                  <div className="flex justify-between text-xs text-slate-500 font-medium"><span>0</span><span>{maxClicks.toLocaleString()}</span></div>
                                </div>
                              </div>
                              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                                <Badge className={cn("px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1", performance.color)}>
                                  {performance.icon}
                                  {performance.label}
                                </Badge>
                                <div className="flex items-center text-xs text-slate-500 gap-1 font-bold">
                                  {getTrendIcon(offer.clicks, avgClicks)}
                                  <span>#{(generalCurrentPage - 1) * generalItemsPerPage + index + 1}</span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        )
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-10 px-3">
                      <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center">
                        <XCircle className="h-8 w-8 text-slate-400" />
                      </div>
                      <h3 className="text-base font-bold text-slate-800 mb-1">No Campaigns Found</h3>
                      <p className="text-xs text-slate-600 max-w-sm mx-auto">No campaigns matched your filters.</p>
                    </div>
                  )}
                </CardContent>
                {generalTotalPages > 1 && (
                  <CardFooter className="justify-center pt-5 pb-3 border-t border-slate-100 bg-gradient-to-r from-slate-50 to-orange-50">
                    <Pagination>
                      <PaginationContent>
                        <PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); setGeneralCurrentPage((p) => Math.max(1, p - 1))}} className="hover:bg-orange-100 rounded-md h-7 w-7 text-xs" />
                        {[...Array(generalTotalPages)].map((_, i) => {
                          const pageNum = i + 1
                          if (pageNum === 1 || pageNum === generalTotalPages || (pageNum >= generalCurrentPage - 1 && pageNum <= generalCurrentPage + 1)) {
                            return (<PaginationItem key={pageNum}><PaginationLink href="#" isActive={pageNum === generalCurrentPage} onClick={(e) => { e.preventDefault(); setGeneralCurrentPage(pageNum)}} className={cn("hover:bg-orange-100 rounded-md font-bold h-7 w-7 text-xs", pageNum === generalCurrentPage && "bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 shadow-sm")}>{pageNum}</PaginationLink></PaginationItem>)
                          }
                          if ((pageNum === generalCurrentPage - 2 && generalCurrentPage > 3) || (pageNum === generalCurrentPage + 2 && generalCurrentPage < generalTotalPages - 2)) {
                            return <PaginationEllipsis key={pageNum} className="h-7 w-7 text-xs" />
                          }
                          return null
                        })}
                        <PaginationNext href="#" onClick={(e) => { e.preventDefault(); setGeneralCurrentPage((p) => Math.min(generalTotalPages, p + 1))}} className="hover:bg-orange-100 rounded-md h-7 w-7 text-xs"/>
                      </PaginationContent>
                    </Pagination>
                  </CardFooter>
                )}
              </Card>
            </TabsContent>

            <TabsContent value="eventReport" className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <Card className="bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/10 border-0 rounded-xl overflow-hidden group hover:scale-[1.01] transition-all duration-200 p-3">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
                    <CardTitle className="text-xs font-bold uppercase tracking-wider opacity-90">Impressions</CardTitle>
                    <div className="p-1.5 bg-white/20 rounded-md backdrop-blur-sm"><Eye className="h-4 w-4" /></div>
                  </CardHeader>
                  <CardContent className="p-0 pt-1">
                    <div className="text-2xl font-black mb-0.5">{totalImpressions.toLocaleString()}</div>
                    <p className="text-amber-100 text-xs font-medium">Views</p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-emerald-500 to-orange-600 text-white shadow-lg shadow-emerald-500/10 border-0 rounded-xl overflow-hidden group hover:scale-[1.01] transition-all duration-200 p-3">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
                    <CardTitle className="text-xs font-bold uppercase tracking-wider opacity-90">Conversions</CardTitle>
                    <div className="p-1.5 bg-white/20 rounded-md backdrop-blur-sm"><CheckCircle2 className="h-4 w-4" /></div>
                  </CardHeader>
                  <CardContent className="p-0 pt-1">
                    <div className="text-2xl font-black mb-0.5">{totalConversions.toLocaleString()}</div>
                    <p className="text-emerald-100 text-xs font-medium">Success</p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-amber-500 to-yellow-600 text-white shadow-lg shadow-amber-500/10 border-0 rounded-xl overflow-hidden group hover:scale-[1.01] transition-all duration-200 p-3">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
                    <CardTitle className="text-xs font-bold uppercase tracking-wider opacity-90">Revenue</CardTitle>
                    <div className="p-1.5 bg-white/20 rounded-md backdrop-blur-sm"><Coins className="h-4 w-4" /></div>
                  </CardHeader>
                  <CardContent className="p-0 pt-1">
                    <div className="text-2xl font-black mb-0.5">${totalPayout.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                    <p className="text-amber-100 text-xs font-medium">Earnings</p>
                  </CardContent>
                </Card>
              </div>
              <Card className="bg-white/80 backdrop-blur-sm shadow-lg shadow-emerald-500/5 border-white/20 rounded-xl overflow-hidden">
                <CardHeader className="p-3 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-emerald-50">
                  <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-slate-900">Event Analytics</h3>
                      <p className="text-xs text-slate-600 mt-0.5">Track event performance</p>
                    </div>
                    <div className="relative w-full sm:w-56">
                      <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                      <Input type="search" placeholder="Search events..." value={eventSearchTerm} onChange={(e) => setEventSearchTerm(e.target.value)} className="pl-8 pr-2.5 py-1.5 h-8 rounded-md border border-slate-200 focus:ring-1 focus:ring-emerald-200 focus:border-emerald-400 bg-white shadow-sm text-xs" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <Table className="min-w-full">
                      <TableHeader className="bg-gradient-to-r from-slate-50 to-emerald-50">
                        <TableRow>
                          <TableHead className="py-2 px-3 text-left text-xs font-black text-slate-700 uppercase tracking-wider">#</TableHead>
                          <TableHead className="py-2 px-3 text-left text-xs font-black text-slate-700 uppercase tracking-wider">Campaign</TableHead>
                          <TableHead className="py-2 px-3 text-left text-xs font-black text-slate-700 uppercase tracking-wider">Type</TableHead>
                          <TableHead className="py-2 px-3 text-left text-xs font-black text-slate-700 uppercase tracking-wider">Publisher</TableHead>
                          <TableHead className="py-2 px-3 text-right text-xs font-black text-slate-700 uppercase tracking-wider">Impr.</TableHead>
                          <TableHead className="py-2 px-3 text-right text-xs font-black text-slate-700 uppercase tracking-wider">Conv.</TableHead>
                          <TableHead className="py-2 px-3 text-right text-xs font-black text-slate-700 uppercase tracking-wider">Rev.</TableHead>
                          <TableHead className="py-2 px-3 text-left text-xs font-black text-slate-700 uppercase tracking-wider">Event ID</TableHead>
                          <TableHead className="py-2 px-3 text-left text-xs font-black text-slate-700 uppercase tracking-wider">Time</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody className="divide-y divide-slate-100">
                        {eventPaginatedData.length === 0 ? (
                          <TableRow><TableCell colSpan={9} className="h-20 text-center py-6 text-slate-500"><div className="flex flex-col items-center gap-2"><div className="w-14 h-14 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center"><XCircle className="h-7 w-7 text-slate-400" /></div><div><h4 className="font-bold text-slate-700 text-sm mb-0.5">No Events</h4><p className="text-xs text-slate-500">No events matched.</p></div></div></TableCell></TableRow>
                        ) : (
                          eventPaginatedData.map((event, index) => (
                            <TableRow key={event.event_id} className="hover:bg-gradient-to-r hover:from-emerald-50 hover:to-amber-50 transition-all duration-150">
                              <TableCell className="py-2 px-3 text-xs font-bold text-slate-700">{(eventCurrentPage - 1) * eventItemsPerPage + index + 1}</TableCell>
                              <TableCell className="py-2 px-3"><div className="space-y-0.5"><div className="font-bold text-slate-800 text-xs">{event.title || "N/A"}</div><div className="text-[10px] text-slate-500 font-medium">ID: {event.offerId || "N/A"}</div></div></TableCell>
                              <TableCell className="py-2 px-3"><Badge className="bg-gradient-to-r from-orange-100 to-amber-100 text-orange-800 px-2.5 py-0.5 rounded-full text-xs font-bold border border-orange-200">{event.eventValues || "N/A"}</Badge></TableCell>
                              <TableCell className="py-2 px-3 text-xs font-semibold text-slate-700">{event.publisherId || "N/A"}</TableCell>
                              <TableCell className="py-2 px-3 text-right text-xs font-bold text-slate-700 font-mono">{event.totalEvent.toLocaleString()}</TableCell>
                              <TableCell className="py-2 px-3 text-right text-xs font-bold text-slate-700 font-mono">{event.totalConversions.toLocaleString()}</TableCell>
                              <TableCell className="py-2 px-3 text-right text-xs font-black text-emerald-600">${Number.parseFloat(event.totalPayout).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2,})}</TableCell>
                              <TableCell className="py-2 px-3 font-mono text-[10px] text-slate-600 font-medium">{event.event_id || "N/A"}</TableCell>
                              <TableCell className="py-2 px-3 text-[10px] text-slate-600 font-medium">{event.timestamp ? format(new Date(event.timestamp), "MMM dd, yy HH:mm") : "N/A"}</TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
                {eventTotalPages > 1 && (
                  <CardFooter className="justify-center pt-5 pb-3 border-t border-slate-100 bg-gradient-to-r from-slate-50 to-emerald-50">
                    <Pagination>
                      <PaginationContent>
                        <PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); setEventCurrentPage((p) => Math.max(1, p - 1)) }} className="hover:bg-emerald-100 rounded-md h-7 w-7 text-xs" />
                        {[...Array(eventTotalPages)].map((_, i) => {
                          const pageNum = i + 1;
                          if (pageNum === 1 || pageNum === eventTotalPages || (pageNum >= eventCurrentPage - 1 && pageNum <= eventCurrentPage + 1)) {
                            return (<PaginationItem key={pageNum}><PaginationLink href="#" isActive={pageNum === eventCurrentPage} onClick={(e) => { e.preventDefault(); setEventCurrentPage(pageNum)}} className={cn("hover:bg-emerald-100 rounded-md font-bold h-7 w-7 text-xs", pageNum === eventCurrentPage && "bg-gradient-to-r from-emerald-500 to-orange-600 text-white hover:from-emerald-600 hover:to-orange-700 shadow-sm")}>{pageNum}</PaginationLink></PaginationItem>)
                          }
                          if ((pageNum === eventCurrentPage - 2 && eventCurrentPage > 3) || (pageNum === eventCurrentPage + 2 && eventCurrentPage < eventTotalPages - 2)) {
                            return <PaginationEllipsis key={pageNum} className="h-7 w-7 text-xs" />
                          }
                          return null;
                        })}
                        <PaginationNext href="#" onClick={(e) => { e.preventDefault(); setEventCurrentPage((p) => Math.min(eventTotalPages, p + 1))}} className="hover:bg-emerald-100 rounded-md h-7 w-7 text-xs" />
                      </PaginationContent>
                    </Pagination>
                  </CardFooter>
                )}
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  )
}
