
// 12231948 Lutfi initialized the Next.js project, installed dependencies,
// attempted to integrate Husky (later removed), and configured Supabase as the cloud database.
// lib/supabase.ts
// Supabase Client Configuration (Simple Version - No env.ts needed)

import { createClient } from '@supabase/supabase-js'
import { Database } from '@/lib/types/database.types'

//  Langsung baca dari process.env dengan fallback empty string
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

//  Runtime validation (akan error di browser jika env kosong)
if (typeof window !== 'undefined' && (!supabaseUrl || !supabaseAnonKey)) {
  console.error('Missing Supabase environment variables!')
}

// Create client
export const supabase = createClient<Database>(
  supabaseUrl, 
  supabaseAnonKey, 
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    },
  }
)

// Helper functions
export const isAuthenticated = async () => {
  const { data: { session } } = await supabase.auth.getSession()
  return !!session
}

export const getCurrentUser = async () => {
  const { data: { session } } = await supabase.auth.getSession()
  return session?.user ?? null
}
