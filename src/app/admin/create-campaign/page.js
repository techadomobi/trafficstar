
"use client";

import { SiteHeader } from "@/components/site-header";
import { Sidebar } from "@/components/sidebar";
import OfferCreateFormForAdvertiser from "@/components/create-campaign-form";



export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="flex-1 md:ml-48"> {/* Added md:ml-48 */}
        <SiteHeader />
        <main className="p-0">
        <OfferCreateFormForAdvertiser/>
        </main>
      </div>
    </div>
  );
}