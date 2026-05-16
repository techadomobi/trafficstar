// components/profile/advertiser-profile.jsx
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, Home, Building, User, Calendar, KeyRound, Edit } from "lucide-react";
import { cn } from "@/lib/utils";

// The reusable detail component, now with colorful icons
const ProfileDetail = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-4 py-3">
    {/* Icon now uses a vibrant theme color */}
    <Icon className="h-5 w-5 text-orange-600 mt-1 flex-shrink-0" aria-hidden="true" />
    <div className="flex-grow">
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="text-base text-gray-800 font-semibold">{value || "Not provided"}</p>
    </div>
  </div>
);

export function AdvertiserProfile() {
  const [advertiser, setAdvertiser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const dataString = localStorage.getItem("advertiserData");
      if (dataString) {
        setAdvertiser(JSON.parse(dataString));
      } else {
        setError("No advertiser data found in local storage.");
      }
    } catch (err) {
      console.error("Failed to parse advertiser data from localStorage:", err);
      setError("Could not load profile data. It might be corrupted.");
    }
  }, []);

  if (error || !advertiser) {
    return (
      <Card className="w-full max-w-lg mx-auto text-center rounded-xl shadow-lg">
        <CardHeader className="bg-gradient-to-r from-red-500 to-rose-500 p-6 rounded-t-xl">
          <CardTitle className="text-white text-2xl">Unable to Load Profile</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-red-600 font-medium">{error || "Loading profile data..."}</p>
          <p className="text-gray-500 mt-2">Please ensure you are logged in correctly.</p>
        </CardContent>
      </Card>
    );
  }

  const memberSince = new Date(advertiser.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const getStatusVariant = (status) => {
    switch (status?.toUpperCase()) {
      case "ACTIVE":
        return "success"; // Green badge
      case "INACTIVE":
        return "destructive"; // Red badge
      case "PENDING":
        return "warning"; // Yellow/Orange badge (assuming you have a warning variant)
      default:
        return "secondary"; // Grey badge
    }
  };

  return (
    <Card className="max-w-7xl w-full mx-auto rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-[1.005] hover:shadow-orange-500/20">
      {/* --- Vibrant Gradient Header --- */}
      <CardHeader className="relative bg-gradient-to-br from-orange-500 via-orange-500 to-orange-500 p-8 sm:p-10 text-white flex flex-col items-center sm:flex-row sm:items-end justify-between">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('/noise.svg')" }}></div> {/* Subtle texture */}
        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-end gap-6 w-full">
          <img
            src={`https://api.dicebear.com/8.x/lorelei/svg?seed=${advertiser.firstName}&flip=true`} // Added flip for variety
            alt="User Avatar"
            className="h-32 w-32 rounded-full border-5 border-white shadow-xl transform transition-transform duration-300 hover:scale-105"
            style={{ minWidth: "8rem", minHeight: "8rem" }} // Ensure size stability
          />
          <div className="flex-1 text-center sm:text-left mt-4 sm:mt-0">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-3">
              <CardTitle className="text-5xl font-extrabold tracking-tight [text-shadow:_0_4px_6px_rgb(0_0_0_/_30%)]">
                {advertiser.firstName}
              </CardTitle>
              {/* Custom Badge Styling for better integration */}
              <Badge
                className={cn(
                  "px-3 py-1.5 text-sm font-semibold rounded-full shadow-md capitalize transition-all duration-200",
                  advertiser.status?.toUpperCase() === "ACTIVE" && "bg-green-400 text-green-900 hover:bg-green-300",
                  advertiser.status?.toUpperCase() === "INACTIVE" && "bg-red-400 text-red-900 hover:bg-red-300",
                  advertiser.status?.toUpperCase() === "PENDING" && "bg-amber-400 text-amber-900 hover:bg-amber-300",
                  !["ACTIVE", "INACTIVE", "PENDING"].includes(advertiser.status?.toUpperCase()) && "bg-gray-300 text-gray-800 hover:bg-gray-200"
                )}
              >
                {advertiser.status.toLowerCase()}
              </Badge>
            </div>
            <CardDescription className="text-xl text-orange-100 mt-2 font-medium [text-shadow:_0_2px_4px_rgb(0_0_0_/_20%)]">
              {advertiser.companyName}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      {/* --- Profile Content --- */}
      <CardContent className="bg-white p-6 md:p-10 grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-8">
        {/* Contact Information Section */}
        <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
          <h3 className="text-2xl font-bold text-gray-800 mb-5 pb-3 border-b-2 border-orange-500 flex items-center gap-2">
            <Mail className="h-6 w-6 text-orange-500" /> Contact Information
          </h3>
          <ProfileDetail icon={Mail} label="Email Address" value={advertiser.email} />
          <ProfileDetail icon={Phone} label="Mobile Number" value={advertiser.mobileNumber} />
          <ProfileDetail icon={Home} label="Address" value={advertiser.address} />
        </div>

        {/* Account Details Section */}
        <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
          <h3 className="text-2xl font-bold text-gray-800 mb-5 pb-3 border-b-2 border-orange-500 flex items-center gap-2">
            <User className="h-6 w-6 text-orange-500" /> Account Details
          </h3>
          <ProfileDetail icon={User} label="User Type" value={advertiser.userType} />
          <ProfileDetail icon={Building} label="Advertiser ID" value={advertiser.advertiserId} />
          <ProfileDetail icon={Calendar} label="Member Since" value={memberSince} />
        </div>
      </CardContent>

      {/* --- Footer (optional, could be for actions) --- */}
      <CardFooter className="bg-gray-100 border-t border-gray-200 p-6 flex justify-end gap-4 rounded-b-3xl">
        {/* Placeholder for future buttons, kept commented as per instruction */}
        {/*
        <Button variant="outline" className="text-orange-600 border-orange-600 hover:bg-orange-50 hover:text-orange-700 shadow-sm transition-all duration-200">
          <KeyRound className="mr-2 h-4 w-4" /> Change Password
        </Button>
        <Button className="bg-orange-600 hover:bg-orange-700 text-white shadow-md transition-all duration-200">
          <Edit className="mr-2 h-4 w-4" /> Edit Profile
        </Button>
        */}
      </CardFooter>
    </Card>
  );
}
