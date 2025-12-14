//12231948 Lutfi made layakMustahik page
// utils/eligibility.ts
// Logic untuk menghitung kelayakan mustahik

import { StatusPekerjaan, UmpDomisili, EligibilityResult } from '@/lib/types/mustahik.types'

interface EligibilityInput {
  penghasilan: number
  pekerjaan: StatusPekerjaan
  jml_tanggungan: number
  ump_domisili: UmpDomisili
}

/**
 * Menghitung kelayakan mustahik berdasarkan kriteria:
 * Seseorang LAYAK jika memenuhi MINIMAL SATU kriteria:
 * 1. Tidak bekerja
 * 2. Penghasilan < 2.500.000
 * 3. Status pekerjaan tidak tetap
 * 4. Jumlah tanggungan >= 3
 * 5. UMP domisili < 2.5 juta
 */
export function calculateEligibility(input: EligibilityInput): EligibilityResult {
  const reasons: string[] = []
  let eligible = false

  // Kriteria 1: Tidak bekerja (prioritas tertinggi)
  if (input.pekerjaan === 'tidak_bekerja') {
    reasons.push('Tidak memiliki pekerjaan')
    eligible = true
  }

  // Kriteria 2: Penghasilan rendah
  if (input.penghasilan < 2500000) {
    reasons.push(`Penghasilan di bawah Rp 2.500.000 (Rp ${input.penghasilan.toLocaleString('id-ID')})`)
    eligible = true
  }

  // Kriteria 3: Status pekerjaan tidak tetap
  if (input.pekerjaan === 'tidak_tetap') {
    reasons.push('Status pekerjaan tidak tetap')
    eligible = true
  }

  // Kriteria 4: Tanggungan banyak
  if (input.jml_tanggungan >= 3) {
    reasons.push(`Memiliki ${input.jml_tanggungan} tanggungan keluarga`)
    eligible = true
  }

  // Kriteria 5: UMP domisili rendah
  if (input.ump_domisili === 'kurang_2_5') {
    reasons.push('UMP domisili kurang dari Rp 2.500.000')
    eligible = true
  }

  return {
    eligible,
    reasons
  }
}

/**
 * Format reasons menjadi string yang readable
 */
export function formatEligibilityMessage(result: EligibilityResult): string {
  if (result.eligible) {
    return `Layak menerima bantuan. Alasan: ${result.reasons.join(', ')}.`
  }
  return 'Tidak memenuhi kriteria kelayakan penerima bantuan saat ini.'
}

/**
 * Get status label untuk display
 */
export function getStatusLabel(status: boolean | null): string {
  if (status === null) return '-'
  return status ? 'Layak' : 'Tidak Layak'
}

/**
 * Get status color untuk styling
 */
export function getStatusColor(status: boolean | null): 'success' | 'destructive' | 'muted' {
  if (status === null) return 'muted'
  return status ? 'success' : 'destructive'
}