//12231949 Fauzan made sidebar2. push via Lutfi because theres error
//12231948 Lutfi edit list, route, etc
// components/sidebar2.tsx
// Sidebar with auth integration
//122348 Lutfi edit

"use client";

import { Home, Users, User, FileText, LogOut, LogIn } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

// Menu yang bisa diakses semua orang
const publicMenuItems = [
  { title: "Cek Kelayakan Perseorangan", url: "/mustahik-perseorangan", icon: Home },
  { title: "Panduan Zakat", url: "/panduanZakat", icon: FileText },
];

// Menu yang hanya bisa diakses user yang sudah login
const protectedMenuItems = [
  { title: "Cek Kelayakan Data Banyak", url: "/massal", icon: Users },
  { title: "Profil", url: "/profil", icon: User },
];

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { state } = useSidebar();
  const { isLoggedIn, user, logout } = useAuth();
  const collapsed = state === "collapsed";

  const isActive = (url: string) => {
    if (url === "/") return pathname === "/";
    return pathname.startsWith(url);
  };

  const handleLogout = () => {
    logout();
    toast.success("Berhasil logout");
    router.push("/masukAkun");
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-gray-200">
      {/* Header Sidebar */}
      <SidebarHeader className="border-b border-gray-200 p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white">
            <Home className="h-4 w-4" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-900">
                Mustahik
              </span>
              <span className="text-xs text-gray-500">
                Sistem Penentu Kandidat
              </span>
            </div>
          )}
        </div>
      </SidebarHeader>

      {/* Menu */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Utama</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Public Menu Items */}
              {publicMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className={`flex items-center gap-2 p-3 transition-colors rounded-lg
                        ${
                          isActive(item.url)
                            ? "bg-emerald-100 text-emerald-600 font-medium"
                            : "text-gray-600 hover:bg-gray-50"
                        }
                      `}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              {/* Protected Menu Items - Only show if logged in */}
              {isLoggedIn && protectedMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className={`flex items-center gap-2 p-3 transition-colors rounded-lg
                        ${
                          isActive(item.url)
                            ? "bg-emerald-100 text-emerald-600 font-medium"
                            : "text-gray-600 hover:bg-gray-50"
                        }
                      `}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* User Info & Logout/Login */}
        <SidebarGroup className="mt-auto">
          {isLoggedIn && !collapsed && (
            <div className="px-3 py-2 mb-2">
              <div className="text-xs text-gray-500">Masuk sebagai:</div>
              <div className="text-sm font-medium text-gray-900">{user?.username}</div>
            </div>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                {isLoggedIn ? (
                  <SidebarMenuButton
                    onClick={handleLogout}
                    className="flex items-center gap-2 p-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Keluar</span>
                  </SidebarMenuButton>
                ) : (
                  <SidebarMenuButton asChild>
                    <Link
                      href="/masukAkun"
                      className="flex items-center gap-2 p-3 rounded-lg text-emerald-600 hover:bg-emerald-50 transition-colors"
                    >
                      <LogIn className="h-4 w-4" />
                      <span>Masuk</span>
                    </Link>
                  </SidebarMenuButton>
                )}
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}