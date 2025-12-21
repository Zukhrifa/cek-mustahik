// lib/supabase.ts
// Debug version to check connection
//12231948 lutfi edits

import { createClient } from '@supabase/supabase-js'
import { Database } from '@/lib/types/database.types'


const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhxZ3preGhicHNweXpkbHBrZGdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIzMzg2MjUsImV4cCI6MjA3NzkxNDYyNX0.yy4iRiJyiWFCSy_Wd5iSS8A2OHeor3CqDfUQKWyJRdo'

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