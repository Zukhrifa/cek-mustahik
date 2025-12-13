//12231949 fauzan created page data massal
"use client";
import { useState } from "react";

interface Mustahik {
  id: number;
  nama: string;
  penghasilan: number;
  statusPekerjaan: "Tetap" | "Tidak Tetap" | "Tidak Bekerja";
  tanggungan: number;
  ump: "<2.5 Juta" | "2.5-4 Juta" | ">4 Juta";
  alamat: string;
  layak?: boolean;
}

export default function DataBanyakPage() {
  const [data, setData] = useState<Mustahik[]>([
    {
      id: 1,
      nama: "A",
      penghasilan: 1000000,
      statusPekerjaan: "Tetap",
      tanggungan: 3,
      ump: "<2.5 Juta",
      alamat: "Jl. A",
    },
    {
      id: 2,
      nama: "B",
      penghasilan: 1000000,
      statusPekerjaan: "Tidak Tetap",
      tanggungan: 3,
      ump: ">4 Juta",
      alamat: "Jl. B",
    },
  ]);

  const cekKelayakan = () => {
    const hasil = data.map((item) => ({
      ...item,
      layak:
        item.penghasilan < 2500000 &&
        item.tanggungan >= 2 &&
        item.statusPekerjaan !== "Tetap",
    }));
    setData(hasil);
  };

  const tambahBaris = () => {
    setData([
      ...data,
      {
        id: Date.now(),
        nama: "",
        penghasilan: 0,
        statusPekerjaan: "Tidak Bekerja",
        tanggungan: 0,
        ump: "<2.5 Juta",
        alamat: "",
      },
    ]);
  };

  const hapusBaris = (id: number) => {
    setData(data.filter((item) => item.id !== id));
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Cek Kelayakan Mustahik
      </h1>

      <p className="text-sm text-gray-600 mb-4">
        Input data dalam bentuk tabel atau unggah file Excel untuk pengecekan
        data kandidat dalam jumlah banyak
      </p>

      {/* Action Button */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={tambahBaris}
          className="px-3 py-2 bg-gray-700 text-white rounded"
        >
          + Tambah Baris
        </button>
        <button className="px-3 py-2 bg-gray-700 text-white rounded">
          Unduh Template
        </button>
        <button className="px-3 py-2 bg-gray-700 text-white rounded">
          Unggah Excel
        </button>
        <button
          onClick={cekKelayakan}
          className="px-3 py-2 bg-black text-white rounded"
        >
          Cek Status
        </button>
        <button className="px-3 py-2 bg-gray-700 text-white rounded">
          Unduh PDF
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-2 py-1">Aksi</th>
              <th className="border px-2 py-1">Nama</th>
              <th className="border px-2 py-1">Penghasilan</th>
              <th className="border px-2 py-1">Status Pekerjaan</th>
              <th className="border px-2 py-1">Tanggungan</th>
              <th className="border px-2 py-1">UMP Domisili</th>
              <th className="border px-2 py-1">Alamat</th>
              <th className="border px-2 py-1">Status Kelayakan</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="text-center">
                <td className="border px-2 py-1">
                  <button
                    onClick={() => hapusBaris(item.id)}
                    className="text-red-600"
                  >
                    🗑
                  </button>
                </td>
                <td className="border px-2 py-1">{item.nama}</td>
                <td className="border px-2 py-1">{item.penghasilan}</td>
                <td className="border px-2 py-1">
                  {item.statusPekerjaan}
                </td>
                <td className="border px-2 py-1">{item.tanggungan}</td>
                <td className="border px-2 py-1">{item.ump}</td>
                <td className="border px-2 py-1">{item.alamat}</td>
                <td className="border px-2 py-1">
                  {item.layak === undefined ? (
                    "-"
                  ) : item.layak ? (
                    <span className="text-green-600 font-semibold">
                      ✔ Layak
                    </span>
                  ) : (
                    <span className="text-red-600 font-semibold">
                      ✖ Tidak Layak
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
