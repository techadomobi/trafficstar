// pages/dashboard.js
"use client";

import { SiteHeader } from "@/components/site-header";
import { Sidebar } from "@/components/sidebar";
import { MetricsCard } from "@/components/metrics-card";
import { StatsCard } from "@/components/stats-card";
import { DataTable } from "@/components/data-table";
import MainContent from "@/components/main-content";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="flex-1 md:ml-48"> {/* Added md:ml-48 */}
        <SiteHeader />
        <main className="p-0 pl-0">
         
            

           
          <MainContent/>
            <div className="mt-6">
              <DataTable />
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <MetricsCard cardType="OFFERWALL" />
              <MetricsCard cardType="ADX" />
            </div>
          
        </main>
      </div>
    </div>
  );
}