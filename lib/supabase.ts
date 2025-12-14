
// 12231948 Lutfi initialized the Next.js project, installed dependencies,
// attempted to integrate Husky (later removed), and configured Supabase as the cloud database.
// lib/supabase.ts
// Supabase Client Configuration

import { createClient } from '@supabase/supabase-js'
import { Database } from '@/lib/types/database.types'

// Gunakan NEXT_PUBLIC agar bisa diakses di client-side
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

// Inisialisasi Supabase client
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
  },
})

// Helper: cek apakah user sudah login
export const isAuthenticated = async () => {
  const { data: { session } } = await supabase.auth.getSession()
  return !!session
}

// Helper: ambil user aktif
export const getCurrentUser = async () => {
  const { data: { session } } = await supabase.auth.getSession()
  return session?.user ?? null
}
