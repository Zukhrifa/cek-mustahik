import React from 'react'
import Navbar, { MobileSidebar, SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
    <div className="flex">
      <MobileSidebar />
      <Navbar />
      <main className="flex-1">{children}</main> {}
      </div>
    </SidebarProvider>
  );
}

