//12231948 Lutfi maade database types
// lib/types/database.types.ts
// TypeScript types berdasarkan Supabase schema

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      user: {
        Row: {
          id_user: number
          username: string
          password: string
        }
        Insert: {
          id_user?: number
          username: string
          password: string
        }
        Update: {
          id_user?: number
          username?: string
          password?: string
        }
        Relationships: []
      }
      mustahik: {
        Row: {
          id_mustahik: number
          id_user: number
          penghasilan: number
          pekerjaan: string
          jml_tanggungan: number
          ump_domisili: string
          alamat: string
          status_kelayakan: boolean | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id_mustahik?: number
          id_user: number
          penghasilan: number
          pekerjaan: string
          jml_tanggungan: number
          ump_domisili: string
          alamat: string
          status_kelayakan?: boolean | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id_mustahik?: number
          id_user?: number
          penghasilan?: number
          pekerjaan?: string
          jml_tanggungan?: number
          ump_domisili?: string
          alamat?: string
          status_kelayakan?: boolean | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "mustahik_id_user_fkey"
            columns: ["id_user"]
            referencedRelation: "user"
            referencedColumns: ["id_user"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      pekerjaan_enum: "tetap" | "tidak_tetap" | "tidak_bekerja"
      ump_enum: "kurang_2_5" | "antara_2_5_3_5" | "lebih_3_5"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}