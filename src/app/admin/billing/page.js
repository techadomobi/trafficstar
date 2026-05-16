"use client";
import { SiteHeader } from "@/components/site-header";
import { Sidebar } from "@/components/sidebar";
import { CampaignChecklist } from "@/components/campaign-checklist";
import { DataTables } from "@/components/data-tables";
import withAuth from "@/components/withAuth"; // <-- 1. IMPORT THE HOC
import WalletPage from "@/components/WalletPage";
import BillingPage from "@/components/BillingPage";

function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="flex-1 md:ml-48"> {/* Added md:ml-48 */}
        <SiteHeader />
        <main className="p-0">
       <BillingPage/>
        </main>
      </div>
    </div>
  );
}

// --- 2. WRAP THE COMPONENT WITH THE HOC ON EXPORT ---
export default withAuth(DashboardPage);