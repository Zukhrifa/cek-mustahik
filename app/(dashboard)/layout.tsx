import React from 'react'
import { AppSidebar } from "@/components/sidebar2";
import { MobileSidebar, SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
    <div className="flex">
      <MobileSidebar />
      <AppSidebar />
      <main className="flex-1">{children}</main> {}
      </div>
    </SidebarProvider>
  );
}

