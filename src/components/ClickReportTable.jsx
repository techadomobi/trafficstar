"use client";

import React, { useState, useEffect } from "react";
import { API_BASE } from "@/lib/config";
import { getDashboardIdentity } from "@/lib/session";
import {
  ChevronsLeft,
  ChevronsRight,
  TrendingUp,
  Eye,
  Globe, // Used for geographical representation
  Clock,
  DollarSign, // Used for currency
  Users,
  Filter,
  Download,
  MousePointer2, // Icon for clicks
  CheckCircle, // Icon for conversions
  XCircle, // Icon for rejected status in conversions
  MapPin, // New icon for Geo emphasis
} from "lucide-react";

// --- Utility Functions ---
const getCountryFlag = (countryCode) => {
  const flags = {
    // Major Countries
    US: "🇺🇸",
    USA: "🇺🇸",
    UK: "🇬🇧",
    GB: "🇬🇧",
    CA: "🇨🇦",
    CAN: "🇨🇦",
    AU: "🇦🇺",
    AUS: "🇦🇺",
    DE: "🇩🇪",
    DEU: "🇩🇪",
    FR: "🇫🇷",
    FRA: "🇫🇷",
    IT: "🇮🇹",
    ITA: "🇮🇹",
    ES: "🇪🇸",
    ESP: "🇪🇸",
    NL: "🇳🇱",
    NLD: "🇳🇱",
    SE: "🇸🇪",
    SWE: "🇸🇪",
    NO: "🇳🇴",
    NOR: "🇳🇴",
    DK: "🇩🇰",
    DNK: "🇩🇰",
    FI: "🇫🇮",
    FIN: "🇫🇮",
    CH: "🇨🇭",
    CHE: "🇨🇭",
    AT: "🇦🇹",
    AUT: "🇦🇹",
    BE: "🇧🇪",
    BEL: "🇧🇪",
    PT: "🇵🇹",
    PRT: "🇵🇹",
    IE: "🇮🇪",
    IRL: "🇮🇪",
    PL: "🇵🇱",
    POL: "🇵🇱",
    CZ: "🇨🇿",
    CZE: "🇨🇿",
    HU: "🇭🇺",
    HUN: "🇭🇺",
    GR: "🇬🇷",
    GRC: "🇬🇷",
    RO: "🇷🇴",
    ROU: "🇷🇴",
    BG: "🇧🇬",
    BGR: "🇧🇬",
    HR: "🇭🇷",
    HRV: "🇭🇷",
    SI: "🇸🇮",
    SVN: "🇸🇮",
    SK: "🇸🇰",
    SVK: "🇸🇰",
    EE: "🇪🇪",
    EST: "🇪🇪",
    LV: "🇱🇻",
    LVA: "🇱🇻",
    LT: "🇱🇹",
    LTU: "🇱🇹",
    LU: "🇱🇺",
    LUX: "🇱🇺",
    MT: "🇲🇹",
    MLT: "🇲🇹",
    CY: "🇨🇾",
    CYP: "🇨🇾",
    // Asia Pacific
    JP: "🇯🇵",
    JPN: "🇯🇵",
    KR: "🇰🇷",
    KOR: "🇰🇷",
    CN: "🇨🇳",
    CHN: "🇨🇳",
    HK: "🇭🇰",
    HKG: "🇭🇰",
    TW: "🇹🇼",
    TWN: "🇹🇼",
    SG: "🇸🇬",
    SGP: "🇸🇬",
    MY: "🇲🇾",
    MYS: "🇲🇾",
    TH: "🇹🇭",
    THA: "🇹🇭",
    VN: "🇻🇳",
    VNM: "🇻🇳",
    PH: "🇵🇭",
    PHL: "🇵🇱",
    ID: "🇮🇩",
    IDN: "🇮🇩",
    IN: "🇮🇳",
    IND: "🇮🇳",
    PK: "🇵🇰",
    PAK: "🇵🇰",
    BD: "🇧🇩",
    BGD: "🇧🇩",
    LK: "🇱🇰",
    LKA: "🇱🇰",
    NP: "🇳🇵",
    NPL: "🇳🇵",
    NZ: "🇳🇿",
    NZL: "🇳🇿",
    // Americas
    MX: "🇲🇽",
    MEX: "🇲🇽",
    BR: "🇧🇷",
    BRA: "🇧🇷",
    AR: "🇦🇷",
    ARG: "🇦🇷",
    CL: "🇨🇱",
    CHL: "🇨🇱",
    CO: "🇨🇴",
    COL: "🇨🇴",
    PE: "🇵🇪",
    PER: "🇵🇪",
    EC: "🇪🇨",
    ECU: "🇪🇨",
    VE: "🇻🇪",
    VEN: "🇻🇪",
    UY: "🇺🇾",
    URY: "🇺🇾",
    PY: "🇵🇾",
    PRY: "🇵🇾",
    BO: "🇧🇴",
    BOL: "🇧🇴",
    CR: "🇨🇷",
    CRI: "🇨🇷",
    PA: "🇵🇦",
    PAN: "🇵🇦",
    GT: "🇬🇹",
    GTM: "🇬🇹",
    HN: "🇭🇳",
    HND: "🇭🇳",
    SV: "🇸🇻",
    SLV: "🇸🇻",
    NI: "🇳🇮",
    NIC: "🇳🇮",
    BZ: "🇧🇿",
    BLZ: "🇧🇿",
    JM: "🇯🇲",
    JAM: "🇯🇲",
    CU: "🇨🇺",
    CUB: "🇨🇺",
    DO: "🇩🇴",
    DOM: "🇩🇴",
    HT: "🇭🇹",
    HTI: "🇭🇹",
    TT: "🇹🇹",
    TTO: "🇹🇹",
    BB: "🇧🇧",
    BRB: "🇧🇧",
    // Middle East & Africa
    AE: "🇦🇪",
    ARE: "🇦🇪",
    SA: "🇸🇦",
    SAU: "🇸🇦",
    QA: "🇶🇦",
    QAT: "🇶🇦",
    KW: "🇰🇼",
    KWT: "🇰🇼",
    BH: "🇧🇭",
    BHR: "🇧🇭",
    OM: "🇴🇲",
    OMN: "🇴🇲",
    JO: "🇯🇴",
    JOR: "🇯🇴",
    LB: "🇱🇧",
    LBN: "🇱🇧",
    IL: "🇮🇱",
    ISR: "🇮🇱",
    TR: "🇹🇷",
    TUR: "🇹🇷",
    IR: "🇮🇷",
    IRN: "🇮🇷",
    IQ: "🇮🇶",
    IRQ: "🇮🇶",
    EG: "🇪🇬",
    EGY: "🇪🇬",
    ZA: "🇿🇦",
    ZAF: "🇿🇦",
    NG: "🇳🇬",
    NGA: "🇳🇬",
    KE: "🇰🇪",
    KEN: "🇰🇪",
    ET: "🇪🇹",
    ETH: "🇪🇹",
    GH: "🇬🇭",
    GHA: "🇬🇭",
    MA: "🇲🇦",
    MAR: "🇲🇦",
    TN: "🇹🇳",
    TUN: "🇹🇳",
    DZ: "🇩🇿",
    DZA: "🇩🇿",
    LY: "🇱🇾",
    LBY: "🇱🇾",
    SD: "🇸🇩",
    SDN: "🇸🇩",
    UG: "🇺🇬",
    UGA: "🇺🇬",
    TZ: "🇹🇿",
    TZA: "🇹🇿",
    RW: "🇷🇼",
    RWA: "🇷🇼",
    ZM: "🇿🇲",
    ZMB: "🇿🇲",
    ZW: "🇿🇼",
    BW: "🇧🇼",
    NA: "🇳🇦",
    NAM: "🇳🇦",
    MZ: "🇲🇿",
    MOZ: "🇲🇿",
    MW: "🇲🇼",
    MWI: "🇲🇼",
    SZ: "🇸🇿",
    SWZ: "🇸🇿",
    LS: "🇱🇸",
    LSO: "🇱🇸",
    // Eastern Europe & Russia
    RU: "🇷🇺",
    RUS: "🇷🇺",
    UA: "🇺🇦",
    UKR: "🇺🇦",
    BY: "🇧🇾",
    BLR: "🇧🇾",
    MD: "🇲🇩",
    MDA: "🇲🇩",
    GE: "🇬🇪",
    GEO: "🇬🇪",
    AM: "🇦🇲",
    ARM: "🇦🇲",
    AZ: "🇦🇿",
    AZE: "🇦🇿",
    KZ: "🇰🇿",
    KAZ: "🇰🇿",
    UZ: "🇺🇿",
    UZB: "🇺🇿",
    KG: "🇰🇬",
    KGZ: "🇰🇬",
    TJ: "🇹🇯",
    TJK: "🇹🇯",
    TM: "🇹🇲",
    TKM: "🇹🇲",
    MN: "🇲🇳",
    MNG: "🇲🇳",
    // Others
    IS: "🇮🇸",
    ISL: "🇮🇸",
    GL: "🇬🇱",
    GRL: "🇬🇱",
    FO: "🇫🇴",
    FRO: "🇫🇴",
    AD: "🇦🇩",
    AND: "🇦🇩",
    MC: "🇲🇨",
    MCO: "🇲🇨",
    SM: "🇸🇲",
    SMR: "🇸🇲",
    VA: "🇻🇦",
    VAT: "🇻🇦",
    LI: "🇱🇮",
    LIE: "🇱🇮",
  };

  const code = countryCode?.toUpperCase();
  return flags[code] || "🌍";
};

const formatTimeAgo = (timestamp) => {
  const now = new Date();
  const time = new Date(timestamp);
  const diffInMinutes = Math.floor((now - time) / (1000 * 60));

  if (diffInMinutes < 1) return "just now";
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
  if (diffInMinutes < 43200) return `${Math.floor(diffInMinutes / 1440)}d ago`; // 30 days
  if (diffInMinutes < 525600)
    return `${Math.floor(diffInMinutes / 43200)} months ago`; // 12 months
  return `${Math.floor(diffInMinutes / 525600)} years ago`;
};

// --- Components ---

// Enhanced skeleton loader with shimmer effect
const TableSkeleton = () => (
  <div className="space-y-4">
    {[...Array(6)].map((_, i) => (
      <div
        key={i}
        className="relative overflow-hidden bg-gradient-to-r from-slate-50 via-white to-slate-50 rounded-xl p-4 shadow-sm"
      >
        <div className="animate-pulse">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-100 rounded-full"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded-full w-32"></div>
                <div className="h-3 bg-gradient-to-r from-slate-200 to-slate-300 rounded-full w-24"></div>
              </div>
            </div>
            <div className="flex space-x-6">
              <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded-full w-20"></div>
              <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded-full w-16"></div>
              <div className="h-4 bg-gradient-to-r from-emerald-200 to-emerald-300 rounded-full w-12"></div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
      </div>
    ))}
  </div>
);

// Animated stat card component
const StatCard = ({ icon: Icon, title, value, change, color = "orange" }) => {
  const colorMap = {
    orange: "from-orange-500 to-amber-500",
    green: "from-emerald-500 to-orange-500",
    orange: "from-orange-500 to-pink-500",
    orange: "from-orange-500 to-red-500",
  };

  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-orange-600 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
      <div className="relative bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            {change && (
              <p className="text-sm text-emerald-600 font-medium mt-1">
                +{change}% from last month
              </p>
            )}
          </div>
          <div
            className={`p-3 rounded-full bg-gradient-to-r ${colorMap[color]} shadow-lg`}
          >
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

const ClickReportTable = () => {
  const [clicks, setClicks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchClickData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const { partnersId, actorId, token } = getDashboardIdentity();
        if (!partnersId || !actorId) {
          throw new Error("Dashboard session IDs are missing.");
        }

        const url = `${API_BASE}advertiser/advertiserClickList?partners_Id=${partnersId}&advertiser_id=${actorId}&advertiserId=${actorId}&page=${currentPage}`;

        const response = await fetch(url, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        if (data.responseCode !== 200) {
          throw new Error(data.responseMessage || "Failed to fetch click data");
        }

        setClicks(data.responseResult || []);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        setError(err.message);
        console.error("Failed to fetch click report:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClickData();
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 via-orange-600 to-pink-600 rounded-2xl blur opacity-20"></div>
      <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-6 lg:p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-500 rounded-lg flex items-center justify-center">
              <Clock className="w-4 h-4 text-white" />
            </div>
            <span>Recent Clicks</span>
          </h2>
          <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            Live Updates
          </div>
        </div>

        <div className="overflow-hidden">
          {isLoading ? (
            <TableSkeleton />
          ) : error ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-red-500 text-2xl">⚠️</span>
              </div>
              <p className="text-red-600 font-medium">{error}</p>
            </div>
          ) : clicks.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <Eye className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 font-medium">No clicks found</p>
            </div>
          ) : (
            <div className="space-y-3">
              {clicks.map((click, index) => (
                <div
                  key={click._id}
                  className="group relative overflow-hidden bg-gradient-to-r from-white to-gray-50/50 rounded-xl p-4 border border-gray-100 hover:border-orange-200 hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: "slideInUp 0.6s ease-out forwards",
                  }}
                >
                  <div className="flex items-center justify-between flex-wrap gap-y-3">
                    <div className="flex items-center space-x-4 flex-grow min-w-[200px]">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-100 rounded-full flex items-center justify-center">
                          <span className="text-lg font-bold text-orange-600">
                            {click.offer_name?.charAt(0) || "?"}
                          </span>
                        </div>
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {click.offer_name || "N/A"}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className="flex items-center space-x-1">
                            <Users className="w-3 h-3" />
                            <span>
                              {`${click.publisher_First_name || ""} ${
                                click.publisher_Last_name || "N/A"
                              }`}
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Geo Part - Enhanced */}
                    <div className="flex items-center space-x-2 bg-orange-50/50 px-4 py-2 rounded-full border border-orange-100 shadow-sm text-orange-800 font-semibold text-base min-w-[150px] justify-center">
                      <MapPin className="w-4 h-4 text-orange-600" />
                      <span className="text-xl leading-none">
                        {getCountryFlag(click.country)}
                      </span>
                      <span className="text-gray-800 font-bold">
                        {click.country || "N/A"}
                      </span>
                    </div>

                    <div className="flex items-center space-x-6 min-w-[300px] justify-end">
                      <div className="text-right">
                        <div className="text-xs text-gray-500 mb-1">
                          Click ID
                        </div>
                        <div className="font-mono text-sm text-gray-700 bg-gray-100 px-2 py-1 rounded break-all">
                          {click.clickId || "N/A"}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-500 mb-1">Time</div>
                        <div className="text-sm font-medium text-gray-700">
                          {formatTimeAgo(click.clickTime)}
                        </div>
                      </div>
                      <div className="text-right">
                        {/* <div className="text-xs text-gray-500 mb-1">Profit</div>
                        <div className="text-lg font-bold text-emerald-600 flex items-center">
                          <DollarSign className="w-4 h-4 mr-1" />
                          {click.profit || "0"}
                        </div> */}
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600/5 to-orange-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Enhanced Pagination */}
        {!isLoading && !error && clicks.length > 0 && (
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:from-gray-200 hover:to-gray-300 transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
            >
              <ChevronsLeft size={18} />
              <span className="font-medium">Previous</span>
            </button>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Page</span>
              <div className="flex items-center space-x-1">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-500 text-white rounded-lg flex items-center justify-center font-bold">
                  {currentPage}
                </div>
                <span className="text-gray-400">of</span>
                <span className="font-semibold text-gray-600">{totalPages}</span>
              </div>
            </div>

            <button
              onClick={handleNextPage}
              disabled={currentPage >= totalPages}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-500 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:from-orange-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <span className="font-medium">Next</span>
              <ChevronsRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const ConversionReportTable = () => {
  const [conversions, setConversions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchConversionData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const { partnersId, actorId, token } = getDashboardIdentity();
        if (!partnersId || !actorId) {
          throw new Error("Dashboard session IDs are missing.");
        }

        const url = `${API_BASE}advertiser/advertiserConversionList?partners_Id=${partnersId}&advertiserId=${actorId}&advertiser_id=${actorId}&page=${currentPage}`;

        const response = await fetch(url, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        if (data.responseCode !== 200) {
          throw new Error(data.responseMessage || "Failed to fetch data");
        }

        setConversions(data.responseResult || []);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        setError(err.message);
        console.error("Failed to fetch conversion report:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchConversionData();
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const getStatusIndicator = (status) => {
    switch (status?.toUpperCase()) {
      case "APPROVED":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" /> Approved
          </span>
        );
      case "PENDING":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Clock className="w-3 h-3 mr-1" /> Pending
          </span>
        );
      case "REJECTED":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircle className="w-3 h-3 mr-1" /> Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            N/A
          </span>
        );
    }
  };

  return (
    <div className="relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 via-orange-600 to-green-600 rounded-2xl blur opacity-20"></div>
      <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-6 lg:p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-orange-500 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-white" />
            </div>
            <span>Recent Conversions</span>
          </h2>
          <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            Live Updates
          </div>
        </div>

        <div className="overflow-hidden">
          {isLoading ? (
            <TableSkeleton />
          ) : error ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-red-500 text-2xl">⚠️</span>
              </div>
              <p className="text-red-600 font-medium">{error}</p>
            </div>
          ) : conversions.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 font-medium">No conversions found</p>
            </div>
          ) : (
            <div className="space-y-3">
              {conversions.map((conversion, index) => (
                <div
                  key={conversion._id}
                  className="group relative overflow-hidden bg-gradient-to-r from-white to-gray-50/50 rounded-xl p-4 border border-gray-100 hover:border-emerald-200 hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: "slideInUp 0.6s ease-out forwards",
                  }}
                >
                  <div className="flex items-center justify-between flex-wrap gap-y-3">
                    <div className="flex items-center space-x-4 flex-grow min-w-[200px]">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-green-100 rounded-full flex items-center justify-center">
                          <span className="text-lg font-bold text-emerald-600">
                            {conversion.offer_name?.charAt(0) || "?"}
                          </span>
                        </div>
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {conversion.offer_name || "N/A"}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className="flex items-center space-x-1">
                            <Users className="w-3 h-3" />
                            <span>
                              {`${conversion.publisher_First_name || ""} ${
                                conversion.publisher_Last_name || "N/A"
                              }`}
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Geo Part - Enhanced */}
                    <div className="flex items-center space-x-2 bg-emerald-50/50 px-4 py-2 rounded-full border border-emerald-100 shadow-sm text-emerald-800 font-semibold text-base min-w-[150px] justify-center">
                      <MapPin className="w-4 h-4 text-emerald-600" />
                      <span className="text-xl leading-none">
                        {getCountryFlag(conversion.country)}
                      </span>
                      <span className="text-gray-800 font-bold">
                        {conversion.country || "N/A"}
                      </span>
                    </div>

                    <div className="flex items-center space-x-6 min-w-[300px] justify-end">
                      <div className="text-right">
                        <div className="text-xs text-gray-500 mb-1">Event</div>
                        <div className="font-medium text-sm text-gray-700">
                          {conversion.eventName || "N/A"}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-500 mb-1">Time</div>
                        <div className="text-sm font-medium text-gray-700">
                          {formatTimeAgo(conversion.conversionTime)}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-500 mb-1">Status</div>
                        <div>{getStatusIndicator(conversion.status)}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-500 mb-1">Spend</div>
                        <div className="text-lg font-bold text-orange-600 flex items-center">
                          <DollarSign className="w-4 h-4 mr-1" />
                          {conversion.revenue || "0"}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/5 to-orange-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Enhanced Pagination */}
        {!isLoading && !error && conversions.length > 0 && (
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:from-gray-200 hover:to-gray-300 transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
            >
              <ChevronsLeft size={18} />
              <span className="font-medium">Previous</span>
            </button>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Page</span>
              <div className="flex items-center space-x-1">
                <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-orange-500 text-white rounded-lg flex items-center justify-center font-bold">
                  {currentPage}
                </div>
                <span className="text-gray-400">of</span>
                <span className="font-semibold text-gray-600">
                  {totalPages}
                </span>
              </div>
            </div>

            <button
              onClick={handleNextPage}
              disabled={currentPage >= totalPages}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-orange-500 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:from-emerald-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <span className="font-medium">Next</span>
              <ChevronsRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Main Dashboard Component ---
export default function ClickConversionDashboard() {
  const [activeTab, setActiveTab] = useState("clicks"); // 'clicks' or 'conversions'

  // Placeholder stats - in a real app, these would come from an API
  const totalClicks = "2.1M";
  const totalConversions = "87.5K";
  const totalRevenue = "$150K";
  const conversionRate = "4.2";

  useEffect(() => {
    // Simulate setting advertiser data for testing
    if (!localStorage.getItem("advertiserData")) {
      localStorage.setItem(
        "advertiserData",
        JSON.stringify({
          partners_Id: 7,
          advertiserId: 6,
        })
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-orange-50 p-4 lg:p-2">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-orange-900 to-orange-900 bg-clip-text text-transparent mb-2">
              Advertiser Analytics
            </h1>
            <p className="text-gray-600 text-lg">
              Real-time performance insights and detailed reporting
            </p>
          </div>
          {/* Export and Filter buttons (commented out as per original request) */}
          {/* <div className="flex space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-orange-600 to-orange-600 text-white rounded-xl hover:from-orange-700 hover:to-orange-700 transition-all shadow-lg">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div> */}
        </div>

        {/* Stat Cards (commented out as per original request) */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard
            icon={MousePointer2}
            title="Total Clicks"
            value={totalClicks}
            change="12.5"
            color="orange"
          />
          <StatCard
            icon={CheckCircle}
            title="Total Conversions"
            value={totalConversions}
            change="8.1"
            color="green"
          />
          <StatCard
            icon={DollarSign}
            title="Total Revenue"
            value={totalRevenue}
            change="15.2"
            color="orange"
          />
          <StatCard
            icon={TrendingUp}
            title="Conversion Rate"
            value={`${conversionRate}%`}
            change="1.8"
            color="orange"
          />
        </div> */}
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => setActiveTab("clicks")}
          className={`px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300 shadow-md ${
            activeTab === "clicks"
              ? "bg-gradient-to-r from-orange-600 to-orange-600 text-white transform scale-105"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          Clicks
        </button>
        <button
          onClick={() => setActiveTab("conversions")}
          className={`px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300 shadow-md ${
            activeTab === "conversions"
              ? "bg-gradient-to-r from-emerald-600 to-orange-600 text-white transform scale-105"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          Conversions
        </button>
      </div>

      {/* Dynamic Content based on Tab */}
      {activeTab === "clicks" && <ClickReportTable />}
      {activeTab === "conversions" && <ConversionReportTable />}

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}
