"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  MoreVertical,
  Plus,
  Search,
  Filter,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Loader2,
  AlertCircle,
  Eye,
  Edit,
  Trash2,
  Download,
  TrendingUp,
  Users,
  DollarSign,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { API_BASE } from "@/lib/config";
import { fetchJsonWithIdentityFallback, getDashboardIdentity } from "@/lib/session";

const itemsPerPage = 8;

const formatRevenue = (revenueString) => {
  if (!revenueString || typeof revenueString !== 'string') return '$0.00';
  const value = parseFloat(revenueString.replace(/[^0-9.-]+/g, ""));
  if (isNaN(value)) return '$0.00';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
};

const StatCard = ({ title, value, icon: Icon, trend, color = "orange" }) => (
  <Card className="relative overflow-hidden border-0 shadow-sm bg-gradient-to-br from-white to-gray-50/50">
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className={`text-2xl font-bold text-${color}-600`}>{value}</p>
          {trend && (
            <p className="text-xs text-orange-600 font-medium mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              {trend}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-xl bg-${color}-100`}>
          <Icon className={`h-6 w-6 text-${color}-600`} />
        </div>
      </div>
    </CardContent>
  </Card>
);

export function DataTables() {
  const router = useRouter();
  const [offers, setOffers] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [sortConfig, setSortConfig] = React.useState({ key: null, direction: "asc" });
  const [currentPage, setCurrentPage] = React.useState(1);

  React.useEffect(() => {
    const fetchOffers = async (partnersId, actorCandidates) => {
      setIsLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("authToken");
        const { json: data } = await fetchJsonWithIdentityFallback({
          path: `${API_BASE}offer/advertiserOfferList`,
          partnersId,
          actorCandidates,
          token,
        });

        if (data.responseCode !== 200) {
          throw new Error(data.responseMessage || "Failed to fetch offers");
        }

        const mappedData = data.responseResult.map(offer => ({
          id: offer.offerId,
          thumbnail: offer.image,
          name: offer.title,
          status: offer.status,
          category: offer.category,
          packageName: offer.packageName,
          revenue: formatRevenue(offer.event[0]?.revenue || 'usd0'),
        }));

        setOffers(mappedData);
      } catch (e) {
        setError(e.message);
        console.error("Failed to fetch offers:", e);
      } finally {
        setIsLoading(false);
      }
    };

    try {
      const { partnersId, actorId, actorCandidates } = getDashboardIdentity();
      if (partnersId && actorId) {
          fetchOffers(partnersId, actorCandidates);
        } else {
          console.error("Missing dashboard IDs:", { partnersId, actorId });
          setError("Required IDs not found in local storage.");
          setIsLoading(false);
      }
    } catch (e) {
      setError("Failed to parse advertiser data. Please log in again.");
      setIsLoading(false);
      console.error("Local storage parsing error:", e);
    }
  }, []);

  const handleSort = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction });
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const sortedOffers = React.useMemo(() => {
    const sortableOffers = [...offers];
    if (sortConfig.key) {
      sortableOffers.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key])
          return sortConfig.direction === "asc" ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key])
          return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    return sortableOffers;
  }, [offers, sortConfig]);

  const filteredOffers = sortedOffers.filter(
    (offer) =>
      offer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.packageName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedOffers = filteredOffers.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredOffers.length / itemsPerPage);

  // Calculate stats
  const activeOffers = offers.filter(offer => offer.status === 'ACTIVE').length;
  const totalRevenue = offers.reduce((sum, offer) => {
    const value = parseFloat(offer.revenue.replace(/[^0-9.-]+/g, "")) || 0;
    return sum + value;
  }, 0);

  const getStatusBadge = (status) => {
    const statusStyles = {
      ACTIVE: "bg-orange-100 text-orange-700 border-orange-200 shadow-sm",
      INACTIVE: "bg-gray-100 text-gray-700 border-gray-200 shadow-sm",
      PENDING: "bg-amber-100 text-amber-700 border-amber-200 shadow-sm",
      PAUSED: "bg-red-100 text-red-700 border-red-200 shadow-sm",
    };
    
    return (
      <Badge 
        variant="outline" 
        className={`${statusStyles[status] || statusStyles.INACTIVE} font-medium px-3 py-1`}
      >
        <div className={`w-2 h-2 rounded-full mr-2 ${
          status === 'ACTIVE' ? 'bg-orange-600' :
          status === 'PENDING' ? 'bg-amber-500' :
          status === 'PAUSED' ? 'bg-red-500' : 'bg-gray-500'
        }`} />
        {status}
      </Badge>
    );
  };

  return (
    <div className="space-y-6 p-6 bg-gray-50/30 min-h-screen">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Offers Management</h1>
            <p className="text-gray-600 mt-1">Manage and monitor your advertising offers</p>
          </div>
          <Button className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white shadow-lg hover:shadow-xl transition-all duration-200 px-6 py-2.5">
            <Plus className="h-4 w-4 mr-2" />
            Create New Offer
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard
            title="Total Campaigns"
            value={offers.length}
            icon={Activity}
            trend="+12% from last month"
            color="orange"
          />
          <StatCard
            title="Active Campaigns"
            value={activeOffers}
            icon={Users}
            trend="+8% from last month"
            color="orange"
          />
          <StatCard
            title="Total Spend Amount"
            value={formatRevenue(totalRevenue.toString())}
            icon={DollarSign}
            trend="+23% from last month"
            color="orange"
          />
         
        </div>
      </div>

      {/* Main Table Card */}
      <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
        <CardHeader className="border-b border-gray-100 bg-white/50">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <CardTitle className="text-xl font-semibold text-gray-800">All Offers</CardTitle>
            
            <div className="flex flex-col gap-3 md:flex-row md:items-center">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search offers, categories, packages..."
                  className="pl-10 pr-4 py-2.5 w-80 bg-white border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 rounded-lg shadow-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" className="border-gray-200 hover:bg-gray-50 shadow-sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                {/* <Button variant="outline" className="border-gray-200 hover:bg-gray-50 shadow-sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button> */}
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50/80 border-b border-gray-100 hover:bg-gray-50">
                  <TableHead 
                    className="font-semibold text-gray-700 cursor-pointer hover:bg-gray-100/50 transition-colors px-6 py-4"
                    onClick={() => handleSort("id")}
                  >
                    <div className="flex items-center gap-2">
                      ID
                      <ArrowUpDown className="h-4 w-4 opacity-50" />
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700 px-6 py-4">CAMPAIGNS</TableHead>
                  <TableHead 
                    className="font-semibold text-gray-700 cursor-pointer hover:bg-gray-100/50 transition-colors px-6 py-4"
                    onClick={() => handleSort("status")}
                  >
                    <div className="flex items-center gap-2">
                      STATUS
                      <ArrowUpDown className="h-4 w-4 opacity-50" />
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700 px-6 py-4">CATEGORY</TableHead>
                  <TableHead className="font-semibold text-gray-700 px-6 py-4">PACKAGE</TableHead>
                  <TableHead 
                    className="font-semibold text-gray-700 cursor-pointer hover:bg-gray-100/50 transition-colors px-6 py-4"
                    onClick={() => handleSort("revenue")}
                  >
                    <div className="flex items-center gap-2">
                      SPEND
                      <ArrowUpDown className="h-4 w-4 opacity-50" />
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700 text-right px-6 py-4">ACTIONS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-16">
                      <div className="flex flex-col justify-center items-center gap-4">
                        <div className="relative">
                          <Loader2 className="h-8 w-8 animate-spin text-orange-600" />
                          <div className="absolute inset-0 h-8 w-8 rounded-full border-2 border-orange-100"></div>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-medium text-gray-900">Loading offers...</p>
                          <p className="text-sm text-gray-500">Please wait while we fetch your data</p>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : error ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-16">
                      <div className="flex flex-col justify-center items-center gap-4">
                        <div className="p-4 rounded-full bg-red-100">
                          <AlertCircle className="h-8 w-8 text-red-600" />
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-semibold text-red-600">Failed to load offers</p>
                          <p className="text-sm text-gray-600 mt-1">{error}</p>
                          <Button 
                            variant="outline" 
                            className="mt-3"
                            onClick={() => window.location.reload()}
                          >
                            Try Again
                          </Button>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : paginatedOffers.length > 0 ? (
                  paginatedOffers.map((offer, index) => (
                    <TableRow 
                      key={offer.id} 
                      className="border-b border-gray-50 hover:bg-orange-50/30 transition-all duration-200 cursor-pointer group"
                      onClick={() => router.push(`/admin/campaign/${offer.id}`)}
                    >
                      <TableCell className="font-mono text-sm font-medium text-gray-600 px-6 py-4">
                        #{offer.id}
                      </TableCell>
                      <TableCell className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <img
                              src={offer.thumbnail || "/placeholder.svg"}
                              alt={offer.name}
                              className="h-12 w-12 rounded-xl object-cover border-2 border-gray-100 shadow-sm group-hover:shadow-md transition-shadow"
                              onError={(e) => { 
                                e.target.onerror = null; 
                                e.target.src='/placeholder.svg'; 
                              }}
                            />
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-orange-500 rounded-full border-2 border-white"></div>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                              {offer.name}
                            </p>
                            <p className="text-sm text-gray-500">ID: {offer.id}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="px-6 py-4">
                        {getStatusBadge(offer.status)}
                      </TableCell>
                      <TableCell className="px-6 py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800 border border-orange-200">
                          {offer.category}
                        </span>
                      </TableCell>
                      <TableCell className="px-6 py-4">
                        <code className="text-sm bg-gray-100 px-2 py-1 rounded border font-mono text-gray-700">
                          {offer.packageName}
                        </code>
                      </TableCell>
                      <TableCell className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-orange-600" />
                          <span className="font-bold text-orange-600 text-lg">
                            {offer.revenue}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell 
                        className="text-right px-6 py-4" 
                        onClick={(e) => e.stopPropagation()}
                      >
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button 
                              variant="ghost" 
                              className="h-9 w-9 p-0 hover:bg-gray-100 border border-transparent hover:border-gray-200 rounded-lg transition-all"
                            >
                              <MoreVertical className="h-4 w-4 text-gray-500" />
                            </Button>
                          </DropdownMenuTrigger>
                          {/* <DropdownMenuContent align="end" className="w-48 shadow-lg border-0 bg-white/95 backdrop-blur-sm">
                            <DropdownMenuItem className="cursor-pointer hover:bg-orange-50 focus:bg-orange-50">
                              <Eye className="h-4 w-4 mr-2 text-orange-600" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer hover:bg-orange-50 focus:bg-orange-50">
                              <Edit className="h-4 w-4 mr-2 text-orange-600" />
                              Edit Offer
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer hover:bg-orange-50 focus:bg-orange-50">
                              <TrendingUp className="h-4 w-4 mr-2 text-orange-600" />
                              View Analytics
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="cursor-pointer hover:bg-red-50 focus:bg-red-50 text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete Offer
                            </DropdownMenuItem>
                          </DropdownMenuContent> */}
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-16">
                      <div className="flex flex-col items-center gap-4">
                        <div className="p-4 rounded-full bg-gray-100">
                          <Search className="h-8 w-8 text-gray-400" />
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-medium text-gray-900">No offers found</p>
                          <p className="text-sm text-gray-500">Try adjusting your search or filters</p>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Enhanced Pagination */}
          {filteredOffers.length > itemsPerPage && (
            <div className="border-t border-gray-100 bg-gray-50/50 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
                  <span className="font-medium">{Math.min(endIndex, filteredOffers.length)}</span> of{" "}
                  <span className="font-medium">{filteredOffers.length}</span> results
                </div>
                
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)} 
                    disabled={currentPage === 1}
                    className="border-gray-200 hover:bg-gray-50"
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                  </Button>
                  
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter(page => 
                        page === 1 || 
                        page === totalPages || 
                        (page >= currentPage - 1 && page <= currentPage + 1)
                      )
                      .map((page, index, array) => (
                        <React.Fragment key={page}>
                          {index > 0 && array[index - 1] < page - 1 && (
                            <span className="px-2 text-gray-400">...</span>
                          )}
                          <Button
                            variant={currentPage === page ? "default" : "outline"}
                            size="sm"
                            onClick={() => handlePageChange(page)}
                            className={currentPage === page 
                              ? "bg-orange-600 hover:bg-orange-700 text-white shadow-md" 
                              : "border-gray-200 hover:bg-gray-50"
                            }
                          >
                            {page}
                          </Button>
                        </React.Fragment>
                      ))
                    }
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)} 
                    disabled={currentPage === totalPages}
                    className="border-gray-200 hover:bg-gray-50"
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
