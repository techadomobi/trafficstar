// app/campaign/[offerId]/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Sidebar } from "@/components/sidebar";
import { SiteHeader } from "@/components/site-header";
import withAuth from "@/components/withAuth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertCircle,
  ArrowRight,
  BadgeDollarSign,
  Box,
  Calendar,
  ClipboardList,
  Cpu,
  Edit,
  Globe,
  Loader2,
  Puzzle,
  Target,
  TrafficCone,
  TrendingUp,
  UserCheck,
} from "lucide-react";
import { API_BASE } from "@/lib/config";

// --- Helper components and functions can be defined outside the main component ---

// A small, reusable component for displaying details
const DetailItem = ({ icon: Icon, label, value, children }) => (
  <div className="flex items-start gap-4 py-3">
    <Icon className="h-5 w-5 text-slate-400 mt-1 flex-shrink-0" aria-hidden="true" />
    <div>
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <div className="text-base text-slate-800 font-semibold mt-0.5">
        {children || value || <span className="text-slate-400 font-normal">Not provided</span>}
      </div>
    </div>
  </div>
);

// Helper function to format currency
const formatCurrency = (currencyString) => {
  if (!currencyString || typeof currencyString !== 'string') return '$0.00';
  const value = parseFloat(currencyString.replace(/[^0-9.-]+/g, ""));
  if (isNaN(value)) return '$0.00';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
};

// Helper function to format dates
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

function CampaignDetailsPage() {
  const params = useParams();
  const { offerId } = params;

  const [offer, setOffer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!offerId) {
      setError("Campaign ID is missing from the URL.");
      setIsLoading(false);
      return;
    }

    const fetchOfferDetails = async (partners_Id, advertiserId) => {
      setIsLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch(
          `${API_BASE}offer/advertiserOfferDetails?partners_Id=${partners_Id}&advertiserId=${advertiserId}&offerId=${offerId}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept': 'application/json',
            },
          }
        );
        if (!response.ok) throw new Error(`API request failed: ${response.statusText}`);
        
        const data = await response.json();
        if (data.responseCode !== 200 || !data.responseResult) {
          throw new Error(data.responseMessage || "Failed to fetch campaign details.");
        }
        setOffer(data.responseResult);
      } catch (e) {
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };

    try {
      const advertiserDataString = localStorage.getItem("advertiserData");
      if (advertiserDataString) {
        const advertiserData = JSON.parse(advertiserDataString);
        // Support both partners_Id and _id
        const partners_Id = advertiserData.partners_Id || advertiserData._id;
        // Support both advertiserId and publisherId
        const advertiserId = advertiserData.advertiserId || advertiserData.publisherId;
        
        if (partners_Id && advertiserId) {
          fetchOfferDetails(partners_Id, advertiserId);
        } else {
          console.error("Missing IDs:", { partners_Id, advertiserId, advertiserData });
          setError("Required IDs not found in user data.");
          setIsLoading(false);
        }
      } else {
        setError("User data not found. Please log in again.");
        setIsLoading(false);
      }
    } catch (e) {
      setError("Failed to read user data from local storage.");
      setIsLoading(false);
      console.error("Local storage parsing error:", e);
    }
  }, [offerId]);

  const getStatusVariant = (status) => {
    return status?.toUpperCase() === 'ACTIVE' ? 'success' : 'secondary';
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-[calc(100vh-10rem)]">
          <div className="flex flex-col items-center gap-4 text-slate-500">
            <Loader2 className="h-12 w-12 animate-spin text-orange-600" />
            <p className="text-lg font-semibold">Loading Campaign Details...</p>
          </div>
        </div>
      );
    }

    if (error || !offer) {
      return (
        <div className="flex items-center justify-center h-[calc(100vh-10rem)] p-8">
          <Card className="w-full max-w-lg text-center shadow-lg">
            <CardHeader>
              <div className="mx-auto bg-red-100 rounded-full p-3 w-fit">
                <AlertCircle className="h-10 w-10 text-red-600" />
              </div>
              <CardTitle className="mt-4 text-2xl">Unable to Load Campaign</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">{error || "The requested campaign could not be found."}</p>
            </CardContent>
          </Card>
        </div>
      );
    }

    return (
      <Card className="max-w-8xl mx-auto shadow-lg shadow-slate-200/50">
        <CardHeader className="p-6 border-b border-slate-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <img
              src={offer.image || "/placeholder.svg"}
              alt={offer.title}
              className="h-28 w-28 rounded-xl border-4 border-white shadow-md object-cover bg-slate-200"
              onError={(e) => { e.target.onerror = null; e.target.src='/placeholder.svg'; }}
            />
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <CardTitle className="text-3xl font-bold text-slate-800">{offer.title}</CardTitle>
                <Badge variant={getStatusVariant(offer.status)} className="capitalize">{offer.status.toLowerCase()}</Badge>
              </div>
              <CardDescription className="text-lg text-slate-600 mt-1">Campaign ID: {offer.offerId}</CardDescription>
            </div>
            {/* <Button size="lg"><Edit className="mr-2 h-4 w-4" /> Edit Campaign</Button> */}
          </div>
        </CardHeader>

        <CardContent className="p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            <div>
              <h3 className="text-xl font-semibold text-slate-800 mb-4 pb-2 border-b-2 border-orange-500/50">Campaign Details</h3>
              <DetailItem icon={Puzzle} label="Category" value={offer.category} />
              <DetailItem icon={TrendingUp} label="Vertical" value={offer.vertical} />
              <DetailItem icon={Box} label="Package Name" value={offer.packageName} />
              <DetailItem icon={Cpu} label="Operating System" value={offer.operatingSystem} />
              <DetailItem icon={UserCheck} label="Incentivized" value={offer.incentive} />
            </div>
            <div>
              {/* <h3 className="text-xl font-semibold text-slate-800 mb-4 pb-2 border-b-2 border-orange-500/50">Advertiser Info</h3> */}
              {/* <DetailItem icon={UserCheck} label="Advertiser Name">
                {offer.advertiserFirstName} {offer.advertiserLastName}
              </DetailItem> */}
              <DetailItem icon={UserCheck} label="Manager" value={offer.advertiserManagerName} />
              <DetailItem icon={TrafficCone} label="Traffic Type" value={offer.traffic} />
              {/* <DetailItem icon={Globe} label="Privacy Level" value={offer.privacyLavel} /> */}
            </div>
            
            {/* Description Section */}
            {offer.description && (
              <div className="md:col-span-2 mt-4">
                <h3 className="text-xl font-semibold text-slate-800 mb-4 pb-2 border-b-2 border-orange-500/50">Description</h3>
                <div 
                  className="prose max-w-none bg-slate-50 p-4 rounded-lg"
                  dangerouslySetInnerHTML={{ __html: offer.description }}
                />
              </div>
            )}
            
            {/* KPI Section */}
            {offer.offerKpi && (
              <div className="md:col-span-2 mt-4">
                <h3 className="text-xl font-semibold text-slate-800 mb-4 pb-2 border-b-2 border-green-500/50">Campaign KPIs</h3>
                <div 
                  className="prose max-w-none bg-slate-50 p-4 rounded-lg"
                  dangerouslySetInnerHTML={{ __html: offer.offerKpi }}
                />
              </div>
            )}
            
            {/* Landing Page Details */}
            {offer.landingPage && offer.landingPage.length > 0 && (
              <div className="md:col-span-2 mt-4">
                <h3 className="text-xl font-semibold text-slate-800 mb-4 pb-2 border-b-2 border-orange-500/50">Default Tracking Links</h3>
                {offer.landingPage.map((lp, index) => (
                  <div key={lp._id || index} className="bg-slate-50 p-4 rounded-lg mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <DetailItem icon={Target} label="Title" value={lp.titleName} />
                      <DetailItem icon={Cpu} label="OS Allowed" value={lp.osAllowed} />
                      <DetailItem icon={Globe} label="Tracking URL">
                        <a href={lp.trackingUrl} target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline break-all text-sm">
                          {lp.trackingUrl}
                        </a>
                      </DetailItem>
                      <DetailItem icon={Globe} label="Impression URL">
                        <a href={lp.impressionUrl} target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline break-all text-sm">
                          {lp.impressionUrl}
                        </a>
                      </DetailItem>
                      {lp.country_code && lp.country_code.length > 0 && (
                        <DetailItem icon={Globe} label="Countries">
                          <div className="flex flex-wrap gap-1">
                            {lp.country_code.map((code, i) => (
                              <Badge key={i} variant="secondary" className="text-xs">{code}</Badge>
                            ))}
                          </div>
                        </DetailItem>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
               {/* Preview & Fallback URLs */}
            <div className="md:col-span-2 mt-0">
              {/* <h3 className="text-xl font-semibold text-slate-800 mb-4 pb-2 border-b-2 border-pink-500/50">Additional URLs</h3> */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                {offer.previewUrl && (
                  <DetailItem icon={Globe} label="Preview URL">
                    <a href={offer.previewUrl} target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline break-all text-sm">
                      {offer.previewUrl}
                    </a>
                  </DetailItem>
                )}
                {offer.fallbackUrl && (
                  <DetailItem icon={Globe} label="Fallback URL">
                    <a href={offer.fallbackUrl} target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline break-all text-sm">
                      {offer.fallbackUrl}
                    </a>
                  </DetailItem>
                )}
              </div>
            </div>
            
            {/* Events/Payouts Section */}
            {offer.event && offer.event.length > 0 && (
              <div className="md:col-span-2 mt-4">
                <h3 className="text-xl font-semibold text-slate-800 mb-4 pb-2 border-b-2 border-orange-500/50">Events & Payouts</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {offer.event.map((evt, index) => (
                    <div key={evt._id || index} className="bg-slate-50 p-4 rounded-lg border-l-4 border-orange-500">
                      <h4 className="font-semibold text-lg mb-3">{evt.eventName}</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-slate-600">Campaign Model:</span>
                          <Badge variant="outline">{evt.eventType}</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-slate-600">Event Name:</span>
                          <span className="font-medium">{evt.eventValue}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-slate-600">Spend Amount:</span>
                          <span className="font-bold text-green-600">{evt.revenue}</span>
                        </div>
                        {/* <div className="flex justify-between items-center">
                          <span className="text-sm text-slate-600">Payout:</span>
                          <span className="font-bold text-orange-600">{evt.payout}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-slate-600">Profit:</span>
                          <span className="font-bold text-orange-600">{evt.profit}</span>
                        </div> */}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
         
            <div className="md:col-span-2 mt-4">
              <h3 className="text-xl font-semibold text-slate-800 mb-4 pb-2 border-b-2 border-orange-500/50">Schedule</h3>
              <div className="flex items-center gap-6 bg-slate-50 p-4 rounded-lg">
                <DetailItem icon={Calendar} label="Start Date" value={formatDate(offer.startDate)} />
                <ArrowRight className="text-slate-400 h-6 w-6 mt-2" />
                <DetailItem icon={Target} label="End Date" value={formatDate(offer.endDate)} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="flex min-h-screen bg-slate-50/50">
      <Sidebar />
      {/* Use ml-60 if your sidebar width is w-60, or ml-48 if it's w-48 */}
      <div className="flex-1 md:ml-48">
        <SiteHeader />
        <main className="p-4 sm:p-2 lg:p-2">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default withAuth(CampaignDetailsPage);
