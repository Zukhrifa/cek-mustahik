// 12231948 Lutfi made page for panduan zakat
// dont delete comments
// 12231949 M.Fauzan Abdi I created Logika Penentuan Kelayakan v2

import React from "react";

// =======================
// LOGIKA PENENTUAN KELAYAKAN 
// =======================

export type StatusPekerjaan = "TIDAK_BEKERJA" | "TIDAK_TETAP" | "TETAP";
export type KondisiFisik = "NORMAL" | "RENTAN" | "SAKIT"; 
export type HasilKelayakan = "MUSTAHIK" | "RENTAN_MISKIN" | "TIDAK_LAYAK";

export function cekKelayakan({
  penghasilan,
  khl,                // Kebutuhan Hidup Layak daerah (tetap dibiarkan)
  tanggungan,
  pekerjaan,
  kondisi,            // tetap dibiarkan sesuai struktur awal
}: {
  penghasilan: number;
  khl: number;
  tanggungan: number;
  pekerjaan: StatusPekerjaan;
  kondisi: KondisiFisik;
}): HasilKelayakan {

  /**
   * =========================
   * RUMUSAN LOGIKA KELAYAKAN:
   * =========================
   * 1. Jika penghasilan < Rp2.500.000  → MUSTAHIK
   * 2. Jika penghasilan Rp2.500.000 – < Rp4.000.000 → RENTAN MISKIN / CALON MUZAKI
   * 3. Jika penghasilan ≥ Rp4.000.000 → TIDAK LAYAK
   * 
   * 4. Jika jumlah tanggungan ≥ 3 orang → status NAIK satu tingkat:
   *    - TIDAK LAYAK → RENTAN MISKIN
   *    - RENTAN MISKIN → MUSTAHIK
   * 
   * 5. Prioritas pekerjaan:
   *    - TIDAK BEKERJA > TIDAK TETAP > TETAP
   */

  // ---------- 1. Logika berdasarkan PENGHASILAN ----------
  let status: HasilKelayakan;

  if (penghasilan < 2500000) {
    status = "MUSTAHIK";
  } else if (penghasilan >= 2500000 && penghasilan < 4000000) {
    status = "RENTAN_MISKIN";
  } else {
    status = "TIDAK_LAYAK";
  }

  // ---------- 2. Pengaruh JUMLAH TANGGUNGAN ----------
  if (tanggungan >= 3) {
    if (status === "TIDAK_LAYAK") {
      status = "RENTAN_MISKIN";
    } else if (status === "RENTAN_MISKIN") {
      status = "MUSTAHIK";
    }
  }

  // ---------- 3. Prioritas STABILITAS PEKERJAAN (BERURUTAN) ----------
  // 1. TIDAK_BEKERJA  → langsung MUSTAHIK
  // 2. TIDAK_TETAP    → jika TIDAK_LAYAK turun jadi RENTAN_MISKIN
  // 3. TETAP          → tidak mengubah status

  if (pekerjaan === "TIDAK_BEKERJA") {
    status = "MUSTAHIK";
  } 
  else if (pekerjaan === "TIDAK_TETAP") {
    if (status === "TIDAK_LAYAK") {
      status = "RENTAN_MISKIN";
    }
  }

  return status;
}

// =======================
// DEFAULT COMPONENT (boleh kosong)
// =======================

const Logika = () => {
  return (
    <div>
      <p>Logika penentuan kelayakan</p>
    </div>
  );
};

export default Logika;
