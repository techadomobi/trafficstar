"use client";

import Link from "next/link"; // Keeping Link for potential future navigation
import React, { useState, useEffect, useRef } from "react"; // useRef for direct DOM interaction, though DropdownMenu handles most of it

// Lucide-react icons (as per your original SiteHeader, no need for SVG replacements here)
import { Bell, HelpCircle, ChevronDown, Menu, User, Wallet2, LogOut } from "lucide-react"; // Added LogOut icon
import { Button } from "@/components/ui/button";
import { useSidebar } from "./sidebar-provider"; // Assuming this is defined
import { AddFundsDialog } from "./add-funds-dialog"; // Assuming this is defined
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"; // Added DropdownMenuSeparator

export function SiteHeader() {
  const { setIsOpen } = useSidebar();
  const [showAddFunds, setShowAddFunds] = useState(false);
  const [advertiserData, setAdvertiserData] = useState(null); // State to store advertiser data

  // Load advertiser data from localStorage on component mount
  useEffect(() => {
    try {
      const storedData = localStorage.getItem('advertiserData');
      if (storedData) {
        setAdvertiserData(JSON.parse(storedData));
      }
    } catch (error) {
      console.error("Failed to parse advertiser data from localStorage", error);
      // Optionally handle error, e.g., redirect to login if data is corrupt
    }
  }, []);

  // Handle user logout
  const handleLogout = () => {
    // Remove the data from local storage
    localStorage.removeItem('advertiserData');
    // Redirect to the login/home page
    window.location.href = '/'; // Assuming your login page is at /login
  };

  // Extract name and userType from advertiserData
  const displayName = advertiserData ? `${advertiserData.firstName} ` : "Guest";
  const displayUserType = advertiserData ? advertiserData.userType : "User";
  const displayEmail = advertiserData ? advertiserData.email : "N/A";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white dark:bg-gray-900 dark:border-gray-700 shadow-lg">
      <div className="flex h-16 items-center px-6 gap-6">
        {/* Logo & Title */}
        <div className="flex items-center gap-4 flex-1">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen((prev) => !prev)}>
            <Menu className="h-6 w-6 text-gray-800 dark:text-white transition-all hover:text-orange-600 dark:hover:text-orange-400" />
          </Button>

          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold text-orange-600 dark:text-white transition-all hover:text-orange-700 dark:hover:text-orange-400">
              Dashboard
            </h1>
          </div>
        </div>

        {/* Enhanced Balance Info */}
        <div className="hidden m-2 md:flex items-center gap-4 bg-orange-50 dark:bg-gray-700 rounded-md px-4 py-2 shadow-sm">
          <Wallet2 className="h-5 w-5 text-orange-600 dark:text-gray-400" />
          <div className="flex flex-col items-start">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Available Balance</span>
            {/* Replace with actual balance if available, or placeholder */}
            <span className="text-lg font-semibold text-orange-700 dark:text-orange-400">$0.00</span>
          </div>
        </div>

        {/* Add Funds Button */}
        <Button
          size="sm"
          className="bg-orange-600 hover:bg-orange-700 dark:bg-orange-600 dark:hover:bg-orange-700 text-white shadow-md transition-all"
          onClick={() => setShowAddFunds(true)}
        >
          Add Funds
        </Button>

        {/* Help and Notifications Icons */}
        <Button
          variant="ghost"
          size="icon"
          className="hidden md:inline-flex text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-all"
        >
          <HelpCircle className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="relative text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-all"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500" />
        </Button>

        {/* User Dropdown with advertiser data */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-all"
            >
              {/* User Avatar */}
              <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-orange-600 to-orange-700 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                {/* Display first initial or a generic icon */}
                {advertiserData?.firstName ? advertiserData.firstName.charAt(0).toUpperCase() : <User className="h-4 w-4" />}
                <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-green-500 ring-1 ring-white" />
              </div>
              {/* User Name (hidden on small screens, adjust as needed with Tailwind breakpoints) */}
              <span className="hidden sm:inline font-medium text-gray-800 dark:text-gray-200">{displayName}</span>
              <ChevronDown className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 shadow-md rounded-md">
            {/* User Info Header */}
            <div className="flex items-center gap-3 p-3">
              <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-orange-600 to-orange-700 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                {advertiserData?.firstName ? advertiserData.firstName.charAt(0).toUpperCase() : <User className="h-5 w-5" />}
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{displayName}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">{displayEmail}</span>
                <span className="text-xs text-orange-600 dark:text-orange-400 capitalize">{displayUserType}</span>
              </div>
            </div>
            <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700 my-1" />

            <DropdownMenuItem className="hover:bg-orange-100 dark:hover:bg-orange-600 transition-all cursor-pointer">
              <Link href="/admin/profile" className="flex items-center gap-2 w-full h-full"> 
                <User className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                Profile
              </Link>
            </DropdownMenuItem>
            {/* Potentially other settings/links */}
           
            <DropdownMenuItem
              onClick={handleLogout}
              className="hover:bg-red-100 dark:hover:bg-red-600 transition-all cursor-pointer focus:bg-red-100 dark:focus:bg-red-600"
            >
              <LogOut className="h-4 w-4 text-red-500 dark:text-red-400" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Add Funds Dialog */}
        <AddFundsDialog open={showAddFunds} onOpenChange={setShowAddFunds} />
      </div>
    </header>
  );
}
