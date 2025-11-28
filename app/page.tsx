//12231948 Lutfi type rafce

import { AppSidebar } from "@/components/sidebar3";
import Navbar, { MobileSidebar, SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
    <div className="flex min-h-screen">
      <MobileSidebar />
      <Navbar />
      <main className="">{children}</main>
    </div>
    </SidebarProvider>
  );
}

