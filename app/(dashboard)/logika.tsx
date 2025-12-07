// 12231949 M.Fauzan I created Logika Penentuan Kelayakan v2

import React from "react";
// =======================
// TYPE DATA
// =======================

export type StatusPekerjaan = 
  | "TIDAK_BEKERJA"
  | "TIDAK_TETAP"
  | "TETAP";

export type HasilKelayakan = 
  | "MUSTAHIK"
  | "RENTAN_MISKIN"
  | "TIDAK_LAYAK";


// =======================
// LOGIKA PENENTUAN KELAYAKAN (VERSI BARU)
// =======================

export function cekKelayakan({
  penghasilan,
  tanggungan,
  pekerjaan,
}: {
  penghasilan: number;
  tanggungan: number;
  pekerjaan: StatusPekerjaan;
}): HasilKelayakan {

  /**
   * =========================
   * RUMUSAN LOGIKA KELAYAKAN:
   * =========================
   * 1. Jika penghasilan < Rp2.500.000 → MUSTAHIK
   * 2. Jika penghasilan Rp2.500.000 – < Rp4.000.000 → RENTAN MISKIN
   * 3. Jika penghasilan ≥ Rp4.000.000 → TIDAK LAYAK
   * 
   * 4. Jika jumlah tanggungan ≥ 3 orang → status bisa NAIK satu tingkat
   *    (TIDAK LAYAK → RENTAN, RENTAN → MUSTAHIK)
   * 
   * 5. Jika TIDAK MEMILIKI PEKERJAAN → otomatis MUSTAHIK
   */

  let status: HasilKelayakan;

  // 1. Berdasarkan Penghasilan
  if (penghasilan < 2500000) {
    status = "MUSTAHIK";
  } else if (penghasilan >= 2500000 && penghasilan < 4000000) {
    status = "RENTAN_MISKIN";
  } else {
    status = "TIDAK_LAYAK";
  }

  // 2. Berdasarkan Jumlah Tanggungan
  if (tanggungan >= 3) {
    if (status === "TIDAK_LAYAK") {
      status = "RENTAN_MISKIN";
    } else if (status === "RENTAN_MISKIN") {
      status = "MUSTAHIK";
    }
  }

  // 3. Prioritas Tidak Bekerja
  if (pekerjaan === "TIDAK_BEKERJA") {
    status = "MUSTAHIK";
  }

  return status;
}
