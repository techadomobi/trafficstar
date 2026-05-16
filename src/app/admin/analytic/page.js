
"use client";

import { SiteHeader } from "@/components/site-header";
import { Sidebar } from "@/components/sidebar";
import { CreateCampaignForm } from "@/components/create-campaign-form";
import { CampaignAnalytics } from "@/components/campaign-analytics";
import ReportsDashboardPage from "@/components/ReportsDashboardPage";


export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="flex-1 md:ml-48"> {/* Added md:ml-48 */}
        <SiteHeader />
        <main className="p-2">
         
        {/* <CampaignAnalytics/> */}
        <ReportsDashboardPage/>
        </main>
      </div>
    </div>
  );
}