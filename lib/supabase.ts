// lib/supabase.ts
// Debug version to check connection
//12231948 lutfi edits
//edit again

import { createClient } from '@supabase/supabase-js'
import { Database } from '@/lib/types/database.types'

// ⚠️ INI PLACEHOLDER, BUKAN NILAI REAL ANDA!
// Nilai real diambil dari Vercel Environment Variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://PLACEHOLDER-CHANGE-IN-VERCEL.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'PLACEHOLDER_KEY_SET_IN_VERCEL_ENVIRONMENT_VARIABLES'

// 🔍 DEBUG: Log connection info (only in browser)
if (typeof window !== 'undefined') {
  console.log('🔍 Supabase Connection Debug:')
  console.log('URL:', supabaseUrl)
  console.log('Key (first 20 chars):', supabaseAnonKey.substring(0, 20) + '...')
  console.log('Is Placeholder URL?', supabaseUrl === 'https://placeholder.supabase.co')
  console.log('Is Placeholder Key?', supabaseAnonKey.includes('placeholder'))
}

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

// Runtime validation
if (typeof window !== 'undefined') {
  if (supabaseUrl === 'https://placeholder.supabase.co') {
    console.error('❌ SUPABASE_URL is PLACEHOLDER! Check Vercel Environment Variables.')
  }
  if (supabaseAnonKey.includes('placeholder')) {
    console.error('❌ SUPABASE_ANON_KEY is PLACEHOLDER! Check Vercel Environment Variables.')
  }
}

export const isAuthenticated = async () => {
  const { data: { session } } = await supabase.auth.getSession()
  return !!session
}

export const getCurrentUser = async () => {
  const { data: { session } } = await supabase.auth.getSession()
  return session?.user ?? null
}