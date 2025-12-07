//12231949 Fauzan made sidebar2. push via Lutfi because theres error
//12231948 Lutfi edit list, route, etc
"use client";

import { Home, Users, User, FileText, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

const menuItems = [
    { title: "Cek Kelayakan Perseorangan", url: "/mustahik-perseorangan", icon: Home },
    { title: "Cek Kelayakan Data Banyak", url: "/massal", icon: Users },
    { title: "Profil", url: "/profil", icon: User },
    { title: "Panduan Zakat", url: "/panduanZakat", icon: FileText },
];

export function AppSidebar() {
    const pathname = usePathname();
    const { state } = useSidebar();
    const collapsed = state === "collapsed";

    const isActive = (url: string) => {
        if (url === "/") return pathname === "/";
        return pathname.startsWith(url);
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
                            {menuItems.map((item) => (
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

                {/* Logout */}
                <SidebarGroup className="mt-auto">
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link
                                        href="/masukAkun" //12231948 Lutfi made a change
                                        className="flex items-center gap-2 p-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                                    >
                                        <LogOut className="h-4 w-4" />
                                        <span>Keluar</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}