// app/(dashboard)/layout.tsx
// Layout untuk dashboard pages dengan sidebar dan auth protection

'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { AppSidebar } from '@/components/sidebar2'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { useAuth } from '@/hooks/useAuth'
import { Menu } from 'lucide-react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isLoggedIn, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  // Protected routes yang membutuhkan login
  const protectedRoutes = ['/massal', '/profil']
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))

  useEffect(() => {
    // Redirect ke login jika user belum login dan mengakses protected route
    if (!isLoading && !isLoggedIn && isProtectedRoute) {
      router.push('/masukAkun')
    }
  }, [isLoggedIn, isLoading, isProtectedRoute, router])

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4"></div>
          <p className="text-muted-foreground">Memuat...</p>
        </div>
      </div>
    )
  }

  // If protected route and not logged in, show nothing (will redirect)
  if (isProtectedRoute && !isLoggedIn) {
    return null
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        {/* Sidebar */}
        <AppSidebar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col w-full">
          {/* Header with mobile menu trigger */}
          <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-card px-4 lg:px-6">
            <SidebarTrigger className="lg:hidden">
              <Menu className="h-5 w-5" />
            </SidebarTrigger>
            <div className="flex-1">
              <h1 className="text-lg font-semibold text-foreground lg:text-xl">
                Aplikasi Penentu Kandidat Mustahik
              </h1>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 p-4 lg:p-6">
            {children}
          </main>

          {/* Footer */}
          <footer className="w-full border-t border-gray-200 mt-auto bg-white">
            <div className="container mx-auto p-4 text-center text-sm text-gray-500">
              Copyright &copy; 2025 - Aplikasi penentu kandidat mustahik
            </div>
          </footer>
        </div>
      </div>
    </SidebarProvider>
  )
}
