import { SidebarProvider } from "@/components/sidebar-provider";


export default function DashboardLayout({ children }) {
  return <SidebarProvider>{children}</SidebarProvider>
}

