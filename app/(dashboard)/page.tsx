import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar2";
import { Component, Menu } from "lucide-react";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col w-full">
          <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-card px-4 lg:px-6">
            <SidebarTrigger className="lg:hidden">
              <Menu className="h-5 w-5" />
            </SidebarTrigger>
            <div className="flex-1">
              <h1 className="text-lg font-semibold text-foreground lg:text-xl">
                Sistem Penentu Kandidat Mustahik
              </h1>
            </div>
          </header>
          <main className="flex-1 p-4 lg:p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
