// 12231948 Lutfi made page for panduan zakat
// 12231945 Bifaqih Zulfa feel free to modify this page

import React from 'react';

// --- DATA PANDUAN ZAKAT ---
const panduanData = [
  {
    title: "Dasar-Dasar Zakat",
    icon: "🌟",
    content: (
      <>
        <h4 className="font-semibold mb-2 text-gray-800">1. Pengertian Zakat</h4>
        <p className="text-sm text-gray-700 mb-4">Zakat adalah sejumlah harta tertentu yang wajib dikeluarkan oleh orang Islam (Muzaki) dan diberikan kepada golongan yang berhak (Mustahik). Zakat merupakan rukun Islam yang ketiga.</p>
        
        <h4 className="font-semibold mb-2 text-gray-800">2. Syarat Wajib Zakat</h4>
        <ul className="list-disc ml-5 space-y-1 text-sm text-gray-700">
            <li>Beragama Islam: Zakat hanya diwajibkan bagi Muslim.</li>
            <li>Merdeka: Bukan budak, meskipun saat ini sudah tidak relevan.</li>
            <li>Mencapai Nishab: Batas minimal harta yang wajib dizakati.</li>
            <li>Mencapai Haul: Masa kepemilikan harta selama satu tahun penuh (berlaku untuk Zakat Maal/Harta, kecuali Zakat Pertanian dan Zakat Profesi).</li>
            <li>Milik Penuh: Harta dimiliki secara sah dan penuh.</li>
        </ul>
      </>
    ),
  },
  {
    title: "Jenis-Jenis Zakat Utama",
    icon: "💰",
    content: (
      <ul className="list-disc ml-5 space-y-2 text-sm text-gray-700">
        <li>Zakat Fitrah: Wajib dikeluarkan saat Ramadan sebagai pembersih jiwa, dengan besaran 1 shak makanan pokok (sekitar 2.5 - 3.0 kg) per jiwa.</li>
        <li>Zakat Maal (Harta):
            <ul className="list-circle ml-5 mt-1 space-y-1">
                <li>Emas & Perak (Nishab 85 gr Emas / 595 gr Perak).</li>
                <li>Perdagangan (Nishab analog Emas).</li>
                <li>Pertanian (Nishab 653 kg gabah kering, dikeluarkan saat panen).</li>
            </ul>
        </li>
        <li>Zakat Profesi/Penghasilan: Dikenakan pada penghasilan tetap, nishab analog 85 gram emas, kadar 2.5%.</li>
      </ul>
    ),
  },
  {
    title: "Kriteria Mustahik & Indikator Penentuan",
    icon: "🤲",
    content: (
      <>
        <h4 className="font-semibold mb-2 text-gray-800">Penerima Zakat (8 Asnaf)</h4>
        <ul className="list-disc ml-5 space-y-1 text-sm text-gray-700">
            <li>Fakir: Mereka yang hampir tidak memiliki apa-apa sehingga tidak mampu memenuhi kebutuhan pokok hidup..</li>
            <li>Miskin: Mereka yang memiliki harta namun tidak cukup untuk memenuhi kebutuhan dasar kehidupan.</li>
            <li>Amil: Mereka yang mengumpulkan dan mendistribusikan zakat.</li>
            <li>Gharim: Mereka yang berhutang untuk kebutuhan hidup dalam mempertahankan jiwa dan izzahnya.</li>
            <li>Muallaf: Mereka yang baru masuk Islam dan membutuhkan bantuan untuk menguatkan dalam tauhid dan syariah.</li>
            <li>Fisabilillah: Mereka yang berjuang di jalan Allah dalam bentuk kegiatan dakwah, jihad dan sebagainya.</li>
            <li>Ibnu Sabil: Mereka yang kehabisan biaya di perjalanan dalam ketaatan kepada Allah.</li>
            <li>Riqab: Budak atau hamba sahaya yang ingin memerdekakan dirinya.</li>
        </ul>
        <h4 className="font-semibold mb-2 mt-4 text-gray-800">Indikator Penentuan Mustahik</h4>
        <ul className="list-disc ml-5 space-y-1 text-sm text-gray-700">
            <li>Penghasilan: Apakah penghasilan rutin bulanan mencapai Kebutuhan Hidup Minimum (KHM) wilayah?</li>
            <li>Aset/Kekayaan: Apakah memiliki aset yang nilainya melebihi nishab zakat?</li>
        </ul>
      </>
    ),
  },
];

// Komponen Utama Halaman
const PanduanZakatPage: React.FC = () => {
  return (
    // Struktur Kontainer Utama
    <div className="flex flex-col min-h-screen bg-gray-50">
      
      {/* HEADER: Aplikasi Penentu Kandidat Mustahik (Sama dengan layout dashboard) */}
      <header className="w-full bg-white shadow-md border-b border-gray-200">
        <div className="container mx-auto p-4 flex justify-between items-center h-20">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">
            Aplikasi Penentu Kandidat Mustahik
          </h1>
        </div>
      </header>

      {/* KONTEN UTAMA */}
      <main className="container mx-auto p-4 md:p-8 flex-grow">
        
        {/* JUDUL BAGIAN */}
        <div className="flex items-center space-x-2 text-xl font-semibold text-gray-700 mb-6">
          <span className="text-2xl text-gray-800">📄</span> 
          <h2>Panduan Zakat</h2>
        </div>

        {/* Kolom-kolom Panduan Zakat (GRID 3 Kolom) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {panduanData.map((item, index) => (
            // Card Minimalis
            <div 
              key={index} 
              className="rounded-xl shadow-lg hover:shadow-xl transition duration-300 bg-white"
            >
              {/* Card Header */}
              <div className="flex flex-row items-center space-x-4 p-5 bg-gray-100 rounded-t-xl border-b border-gray-200">
                <span className="text-3xl leading-none">{item.icon}</span>
                <h3 className="text-lg font-bold text-gray-800">
                  {item.title}
                </h3>
              </div>
              {/* Card Content */}
              <div className="p-5">
                {item.content}
              </div>
            </div>
          ))}
        </div>
        
        {/* Bagian Mengapa Panduan ini Penting? */}
        <div className="mt-8 p-6 bg-white shadow-md rounded-xl">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Mengapa Panduan ini Penting?</h3>
            <p className="text-gray-600">
                Memahami dasar-dasar zakat dan kriteria mustahik sangat penting untuk memastikan penyaluran bantuan tepat sasaran dan sesuai syariat. Dengan panduan ini, Muzaki dapat menghitung kewajiban zakat secara akurat, sementara Amil dapat menyalurkannya kepada 8 golongan (Asnaf) penerima dengan tepat, sehingga tercipta akuntabilitas dan keberkahan harta.
            </p>
        </div>

      </main>

      {/* FOOTER */}
      <footer className="w-full bg-white border-t border-gray-200 mt-10">
        <div className="container mx-auto p-4 text-center text-sm text-gray-500">
          Copyright &copy; 2025 - Aplikasi penentu kandidat mustahik
        </div>
      </footer>
    </div>
  );
};

export default PanduanZakatPage;