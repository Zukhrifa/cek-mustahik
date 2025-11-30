// 12231948 Lutfi made page for panduan zakat
// dont delete comments
// 12231949 M.Fauzan I created Logika Penentuan Kelayakan 

import React from "react";

// =======================
// LOGIKA PENENTUAN KELAYAKAN 
// =======================

export type StatusPekerjaan = "TIDAK_BEKERJA" | "TIDAK_TETAP" | "TETAP";
export type KondisiFisik = "NORMAL" | "RENTAN" | "SAKIT"; 
export type HasilKelayakan = "MUSTAHIK" | "RENTAN_MISKIN" | "TIDAK_LAYAK";

export function cekKelayakan({
  penghasilan,
  khl,                // Kebutuhan Hidup Layak daerah
  tanggungan,
  pekerjaan,
  kondisi,
}: {
  penghasilan: number;
  khl: number;
  tanggungan: number;
  pekerjaan: StatusPekerjaan;
  kondisi: KondisiFisik;
}): HasilKelayakan {

  // ---------- 1. Logika berdasarkan penghasilan ----------
  let status: HasilKelayakan;

  if (penghasilan < 0.7 * khl) {
    status = "MUSTAHIK";
  } else if (penghasilan >= 0.7 * khl && penghasilan < khl) {
    status = "RENTAN_MISKIN";
  } else {
    status = "TIDAK_LAYAK";
  }

  // ---------- 2. Pengaruh jumlah tanggungan ----------
  // Jika borderline, banyak tanggungan → naik kategori
  if (status === "RENTAN_MISKIN" && tanggungan >= 3) {
    status = "MUSTAHIK";
  }

  // ---------- 3. Stabilitas pekerjaan ----------
  if (pekerjaan === "TIDAK_BEKERJA") {
    // Tidak bekerja → turunkan status menjadi MUSTAHIK
    status = "MUSTAHIK";
  } else if (pekerjaan === "TIDAK_TETAP" && status === "TIDAK_LAYAK") {
    // Jika pekerjaan tidak tetap tetapi borderline → rentan
    status = "RENTAN_MISKIN";
  }

  // ---------- 4. Kondisi fisik / kerentanan ----------
  if (kondisi === "SAKIT") {
    status = "MUSTAHIK";
  } else if (kondisi === "RENTAN" && status === "TIDAK_LAYAK") {
    status = "RENTAN_MISKIN";
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
