//12231948 Lutfi made middleware

// middleware.ts
// Next.js Middleware untuk route protection

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Routes yang membutuhkan autentikasi
const protectedRoutes = [
  '/massal',
  '/profil',
]

// Routes untuk user yang sudah login (redirect ke home jika sudah login)
const authRoutes = [
  '/masukAkun',
  '/buatAkun',
]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Check if user is logged in by checking cookie/localStorage
  // Note: Karena localStorage tidak bisa diakses di middleware,
  // kita akan handle redirect di client-side menggunakan useEffect
  
  // For now, middleware hanya handle redirect basic
  // Auth check yang lebih detail ada di client-side dengan useAuth
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
