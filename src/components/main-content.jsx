"use client"

import { useState, useEffect, useMemo } from "react"
import { ArrowUpRight } from "lucide-react"
import withAuth from "@/components/withAuth" 
import { API_BASE } from "@/lib/config"
import { fetchJsonWithIdentityFallback, getDashboardIdentity } from "@/lib/session"

// --- Helper Functions & Components ---

const formatNumberToK = (num) => {
  if (typeof num !== 'number') return num;
  if (Math.abs(num) < 1000) {
    return num.toLocaleString('en-US');
  }
  const formattedNum = (num / 1000).toFixed(1);
  return formattedNum.endsWith('.0') ? formattedNum.slice(0, -2) + 'k' : formattedNum + 'k';
};


const SkeletonLoader = () => (
    <div className="space-y-4 p-5 animate-pulse">
      <div className="flex justify-between items-center mb-2"><div className="h-4 bg-gray-200 rounded w-1/4"></div><div className="h-5 w-5 bg-gray-200 rounded-full"></div></div>
      <div className="h-10 bg-gray-300 rounded w-1/2"></div>
      <div className="pt-4 mt-4 border-t border-gray-100 space-y-3">
        <div className="flex justify-between items-center"><div className="h-3 bg-gray-200 rounded w-1/4"></div><div className="h-3 bg-gray-200 rounded w-1/3"></div></div>
        <div className="flex justify-between items-center"><div className="h-3 bg-gray-200 rounded w-1/4"></div><div className="h-3 bg-gray-200 rounded w-1/3"></div></div>
        <div className="flex justify-between items-center"><div className="h-3 bg-gray-200 rounded w-1/4"></div><div className="h-3 bg-gray-200 rounded w-1/3"></div></div>
      </div>
    </div>
  )
  
  const StatCard = ({ title, value, currency, isPercentage, subMetrics, isLoading }) => {
    // Formatter for sub-metrics in the list
    const formatValue = (val, isPercent = false) => {
      if (typeof val !== "number") return val
      if (isPercent) return `${val.toFixed(2)}%`
      return formatNumberToK(val)
    }
  
    // Formatter for the main large value in the card
    const formattedMainValue = () => {
        if (typeof value !== "number") return value;

        if (isPercentage) {
            return value.toFixed(2);
        }
        
        if (currency) {
            return value.toLocaleString("en-US", {
                style: 'currency',
                currency: currency || 'USD',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            });
        }
        return formatNumberToK(value);
    }
  
    return (
      <div className="bg-gradient-to-br from-white to-gray-50 border-2 border-orange-200 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ease-in-out overflow-hidden">
        <div className="border-t-4 border-orange-600 rounded-t-2xl">
          {isLoading ? (
            <SkeletonLoader />
          ) : (
            <div className="p-6">
              <div className="flex justify-between items-center mb-3">
                <p className="text-md font-semibold text-gray-700 tracking-wide">{title}</p>
                <ArrowUpRight className="text-orange-600" size={22} />
              </div>
              <div className="flex items-baseline gap-2 mb-5">
                <h2 className="text-5xl font-extrabold text-orange-700">{formattedMainValue()}</h2>
                {isPercentage && <span className="text-4xl font-bold text-orange-700">%</span>}
              </div>
              <div className="pt-4 border-t border-gray-200 space-y-3">
                {(subMetrics || []).map((metric) => (
                  <div key={metric.label} className="flex justify-between items-center text-sm">
                    <p className="text-gray-500">{metric.label}</p>
                    <p className="font-semibold text-gray-700">{formatValue(metric.value, metric.isPercentage)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

// --- Main Dashboard Component ---
function MainContent() {
  const [isLoading, setIsLoading] = useState(true)
  const [statsData, setStatsData] = useState(Array(6).fill({ subMetrics: [] }))

  const formatDate = (date) => date.toISOString().split("T")[0]

  const getDateRanges = () => {
    const today = new Date();
    const yesterday = new Date(today); yesterday.setDate(today.getDate() - 1);
    const startOfWeek = new Date(today); startOfWeek.setDate(today.getDate() - today.getDay());
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    return {
      today: { startDate: formatDate(today), endDate: formatDate(today) },
      yesterday: { startDate: formatDate(yesterday), endDate: formatDate(yesterday) },
      thisWeek: { startDate: formatDate(startOfWeek), endDate: formatDate(today) },
      mtd: { startDate: formatDate(startOfMonth), endDate: formatDate(today) },
    };
  };

  const cardStructure = useMemo(() => [
    { title: "Clicks", value: 0, subMetrics: [ { label: "Yesterday", value: 0 }, { label: "This Week", value: 0 }, { label: "MTD", value: 0 } ] },
    { title: "Conversions", value: 0, subMetrics: [ { label: "Yesterday", value: 0 }, { label: "This Week", value: 0 }, { label: "MTD", value: 0 } ] },
    { title: "Conversion Rate", value: 0, isPercentage: true, subMetrics: [ { label: "Yesterday", value: 0, isPercentage: true }, { label: "This Week", value: 0, isPercentage: true }, { label: "MTD", value: 0, isPercentage: true } ] },
    { title: "Impressions", value: 0, subMetrics: [ { label: "Yesterday", value: 0 }, { label: "This Week", value: 0 }, { label: "MTD", value: 0 } ] },
    { title: "Events", value: 0, subMetrics: [ { label: "Yesterday", value: 0 }, { label: "This Week", value: 0 }, { label: "MTD", value: 0 } ] },
    { title: "Revenue", value: 0, currency: "USD", subMetrics: [ { label: "Yesterday", value: 0 }, { label: "This Week", value: 0 }, { label: "MTD", value: 0 } ] },
  ], []);

  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true);
      try {
        const { partnersId, actorId, actorCandidates, token } = getDashboardIdentity();
        if (!partnersId || !actorId) {
          throw new Error("Dashboard session IDs are missing after login.");
        }
        
        const multiPeriodMetricsConfig = {
          Clicks: { endpoint: "totalAdvertiserClick", parser: (data) => data.responseResult },
          Impressions: { endpoint: "advertiserTotalImpression", parser: (data) => data.responseResult },
        };
        
        const todayOnlyMetricsConfig = {
          Conversions: { endpoint: "totalAdvertiserConverion", parser: (data) => data.responseResult },
          Events: { endpoint: "advertiserTotalEvent", parser: (data) => data.responseResult },
        };

        const ranges = getDateRanges();
        const periods = ["today", "yesterday", "thisWeek", "mtd"];
        let promises = [];

        promises = promises.concat(
            Object.entries(multiPeriodMetricsConfig).flatMap(([metricName, config]) => 
                periods.map(async (period) => {
                    const { startDate, endDate } = ranges[period];
                    try {
                        const { json: data } = await fetchJsonWithIdentityFallback({
                          path: `${API_BASE}advertiser/${config.endpoint}`,
                          partnersId,
                          actorCandidates,
                          token,
                          searchParams: { startDate, endDate },
                        });
                        const value = config.parser(data);
                        return { metricName, period, value: typeof value === "number" ? value : 0 };
                    } catch (e) {
                        return { metricName, period, value: 0 };
                    }
                })
            )
        );

        promises = promises.concat(
            Object.entries(todayOnlyMetricsConfig).map(async ([metricName, config]) => {
                try {
                    const { json: data } = await fetchJsonWithIdentityFallback({
                      path: `${API_BASE}advertiser/${config.endpoint}`,
                      partnersId,
                      actorCandidates,
                      token,
                    });
                    const value = config.parser(data);
                    return { metricName, period: 'today', value: typeof value === 'number' ? value : 0 };
                } catch (e) {
                    return { metricName, period: 'today', value: 0 };
                }
            })
        );

        promises.push(
          (async () => {
            try {
              const { json: eventData } = await fetchJsonWithIdentityFallback({
                path: `${API_BASE}eventReport/advertiserEventValueReport`,
                partnersId,
                actorCandidates,
                token,
              });
              const totalRevenue = (eventData?.responseResult || []).reduce((sum, item) => {
                const value = Number.parseFloat(item?.payout || item?.revenue || 0);
                return sum + (Number.isFinite(value) ? value : 0);
              }, 0);

              return { metricName: "Revenue", period: "today", value: totalRevenue };
            } catch (e) {
              return { metricName: "Revenue", period: "today", value: 0 };
            }
          })()
        );
        
        const results = await Promise.all(promises);
        
        const dataByMetric = results.reduce((acc, { metricName, period, value }) => {
            if (!acc[metricName]) acc[metricName] = {};
            acc[metricName][period] = value;
            return acc;
        }, {});
        
        const finalStats = cardStructure.map(stat => {
            if (stat.title === "Conversion Rate") {
                const clickData = dataByMetric.Clicks;
                const conversionData = dataByMetric.Conversions;
                if (clickData && conversionData) {
                    const calculateCR = (conversions, clicks) => (clicks > 0 ? (conversions / clicks) * 100 : 0);
                    return { ...stat, value: calculateCR(conversionData.today, clickData.today), subMetrics: [
                        { label: "Yesterday", value: calculateCR(0, clickData.yesterday), isPercentage: true },
                        { label: "This Week", value: calculateCR(0, clickData.thisWeek), isPercentage: true },
                        { label: "MTD", value: calculateCR(0, clickData.mtd), isPercentage: true },
                    ]};
                }
                return stat;
            }

            const liveData = dataByMetric[stat.title];
            if (liveData) {
                return { ...stat, value: liveData.today || 0, subMetrics: [
                    { label: "Yesterday", value: liveData.yesterday || 0 },
                    { label: "This Week", value: liveData.thisWeek || 0 },
                    { label: "MTD", value: liveData.mtd || 0 },
                ]};
            }
            return stat;
        });
        setStatsData(finalStats);
      } catch (error) {
        console.error("Data fetching error:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, [cardStructure]);
  
  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-orange-50 to-gray-50 p-4 sm:p-6 lg:p-8">
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {statsData.map((stat, index) => (
            <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms`, opacity: 0 }}>
              <StatCard {...stat} isLoading={isLoading} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default withAuth(MainContent);
