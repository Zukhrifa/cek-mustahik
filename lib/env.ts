//12231948 Lutfi made env.ts to help .env.local
// lib/env.ts
// Environment variables validation helper
// JANGAN hardcode nilai di sini! Nilai diambil dari .env.local atau Vercel Environment Variables

export function getEnvVar(key: string, defaultValue: string = ''): string {
    if (typeof window !== 'undefined') {
      // Client-side: env vars harus ada
      const value = process.env[key];
      if (!value) {
        console.error(`Missing required environment variable: ${key}`);
        return defaultValue;
      }
      return value;
    } else {
      // Server-side during build: return default to prevent build failure
      return process.env[key] || defaultValue;
    }
  }
  
  //  Ini akan baca dari process.env (yang diisi dari .env.local atau Vercel)
  //  JANGAN ganti dengan string hardcoded!
  export const env = {
    supabaseUrl: getEnvVar('NEXT_PUBLIC_SUPABASE_URL'),
    supabaseAnonKey: getEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
  };