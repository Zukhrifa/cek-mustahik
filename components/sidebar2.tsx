import * as React from "react"
import Link from "next/link"
import { Menu } from "lucide-react"

// Import komponen UI yang sudah Anda buat
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

// ----------------------------------------------------
// Komponen Sidebar/Navigasi Utama
// ----------------------------------------------------
const NavItems = () => (
    <nav className="flex flex-col space-y-2 px-2 py-4 text-sm font-medium lg:space-y-0 lg:flex-row lg:space-x-4">
        <Link href="/dashboard" className="hover:text-primary transition-colors">
            Dashboard
        </Link>
        <Link href="/profil" className="hover:text-primary transition-colors">
            Profil Mustahik
        </Link>
        <Link href="/masukAkun" className="hover:text-primary transition-colors">
            Login
        </Link>
        <Link href="/buatAkun" className="hover:text-primary transition-colors">
            Daftar
        </Link>
    </nav>
)

const Sidebar2: React.FC = () => {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      
      {/* 1. Logo/Nama Aplikasi */}
      <h1 className="text-xl font-bold tracking-tight">
        Aplikasi Mustahik
      </h1>

      {/* 2. Navigasi untuk Desktop (Dapat dilihat di layar besar) */}
      <div className="hidden lg:flex">
        <NavItems />
      </div>

      {/* 3. Sheet untuk Mobile (Laci navigasi) */}
      <div className="lg:hidden">
        <Sheet>
          {/* Tombol Pemicu Sheet */}
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          
          {/* Konten Sheet (Laci) */}
          <SheetContent side="left" className="w-64">
            <h1 className="text-xl font-bold mb-6">Navigasi</h1>
            <NavItems />
          </SheetContent>
        </Sheet>
      </div>
      
    </div>
  )
}

// ----------------------------------------------------
// EXPORTS WAJIB
// ----------------------------------------------------
export default Sidebar2