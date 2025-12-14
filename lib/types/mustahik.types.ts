//12231948 Lutfi made ustahik types
// lib/types/mustahik.types.ts
// Interface dan Types untuk Mustahik

export type StatusPekerjaan = "tetap" | "tidak_tetap" | "tidak_bekerja";
export type UmpDomisili = "kurang_2_5" | "antara_2_5_3_5" | "lebih_3_5";

export interface Mustahik {
  id_mustahik: number;
  id_user: number;
  nama: string;
  penghasilan: number;
  pekerjaan: StatusPekerjaan;
  jml_tanggungan: number;
  ump_domisili: UmpDomisili;
  alamat: string;
  status_kelayakan: boolean | null;
  created_at: string;
  updated_at: string;
}

export interface MustahikFormData {
  nama: string;
  penghasilan: number;
  pekerjaan: StatusPekerjaan;
  jml_tanggungan: number;
  ump_domisili: UmpDomisili;
  alamat: string;
}

export interface MustahikCreateInput {
  id_user: number;
  nama: string;
  penghasilan: number;
  pekerjaan: StatusPekerjaan;
  jml_tanggungan: number;
  ump_domisili: UmpDomisili;
  alamat: string;
  status_kelayakan?: boolean | null;
}

export interface MustahikUpdateInput {
  nama?: string;
  penghasilan?: number;
  pekerjaan?: StatusPekerjaan;
  jml_tanggungan?: number;
  ump_domisili?: UmpDomisili;
  alamat?: string;
  status_kelayakan?: boolean | null;
}

export interface EligibilityResult {
  eligible: boolean;
  reasons: string[];
}

// Untuk bulk check
export interface BulkMustahikRow {
  id: string; // temporary ID for frontend
  nama: string;
  penghasilan: string;
  pekerjaan: StatusPekerjaan | "";
  jml_tanggungan: string;
  ump_domisili: UmpDomisili | "";
  alamat: string;
  status_kelayakan?: boolean | null;
}

// Excel template structure
export interface ExcelMustahikTemplate {
  Nama: string;
  Penghasilan: string;
  "Status Pekerjaan": string;
  "Jumlah Tanggungan": string;
  "UMP Domisili": string;
  Alamat: string;
}