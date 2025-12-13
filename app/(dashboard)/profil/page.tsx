//12231945 bifaqih zulfa made profil design
"use client";
import React from 'react';
// Import ikon yang diperlukan
import { User, Layers, Clock, CheckCircle, LogOut, Lock } from 'lucide-react'; 

// --- MODEL DATA: Profil Pengguna (Penentu/Assessor) ---
interface UserProfile {
  userId: string;
  namaLengkap: string;
  email: string;
  role: 'Administrator' | 'Assessor Lapangan' | 'Verifikator';
  lokasiTugas: string;
  tanggalBergabung: string;
  stats: {
    totalEntri: number;
    menungguVerifikasi: number;
    terverifikasi: number;
  };
}

// Data simulasi (Mock Data)
const mockUserProfile: UserProfile = {
  userId: 'PNT-2025-BS',
  namaLengkap: 'Budi Santoso',
  email: 'budi.santoso@mustahik.app',
  role: 'Assessor Lapangan',
  lokasiTugas: 'Kota Bandung, Jawa Barat',
  tanggalBergabung: '2025-01-15',
  stats: {
    totalEntri: 45,
    menungguVerifikasi: 8,
    terverifikasi: 37,
  },
};

// Menentukan kelas warna untuk badge peran
const getRoleColor = (role: UserProfile['role']) => {
    switch (role) {
        case 'Administrator': return 'bg-purple-100 text-purple-800 border-purple-300';
        case 'Verifikator': return 'bg-blue-100 text-blue-800 border-blue-300';
        case 'Assessor Lapangan': return 'bg-teal-100 text-teal-800 border-teal-300';
        default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
};

// Komponen Kartu Statistik
const StatCard: React.FC<{ icon: React.ReactNode, title: string, value: number, bgColor: string, textColor: string, borderColor: string }> = ({ icon, title, value, bgColor, textColor, borderColor }) => (
    <div className={`profile-stat-card ${bgColor} p-5 rounded-xl shadow-md border ${borderColor} transition-transform hover:translate-y-[-2px] hover:shadow-lg`}>
        <div className={`flex items-center space-x-3 ${textColor} mb-2`}>
            {icon}
            <p className="text-sm font-semibold">{title}</p>
        </div>
        <p className={`text-4xl font-extrabold ${textColor.replace('-700', '-900')}`}>{value}</p>
    </div>
);


// Komponen Utama Halaman Profil
const ProfilePage: React.FC = () => {
    const user = mockUserProfile; // Menggunakan data simulasi
    const roleColorClass = getRoleColor(user.role);

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
          
            {/* HEADER */}
            <header className="w-full bg-white shadow-sm border-b border-gray-100">
                <div className="container mx-auto p-4 flex justify-between items-center h-16 max-w-7xl">
                    <h1 className="text-xl font-bold text-gray-800">
                        Aplikasi Penentu Kandidat Mustahik
                    </h1>
                </div>
            </header>

            {/* KONTEN UTAMA */}
            <main className="flex-grow flex items-start justify-center p-4 md:p-8">
                
                <div className="w-full max-w-6xl">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-6 flex items-center space-x-3">
                        <User className="w-8 h-8 text-cyan-600"/>
                        <span>Profil Saya</span>
                    </h2>

                    {/* KARTU UTAMA PROFIL */}
                    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
                        
                        {/* BACKGROUND BANNER (Cyan to Blue Gradient) */}
                        <div className="h-28 bg-gradient-to-r from-cyan-500 to-blue-500"></div>
                        
                        <div className="p-6 md:p-8 pt-0">
                            
                            {/* BAGIAN ATAS PROFIL (Foto & Nama) */}
                            <div className="flex flex-col sm:flex-row sm:items-end -mt-16 sm:-mt-12 mb-8">
                                {/* Avatar */}
                                <div className="w-24 h-24 bg-white p-1 rounded-full shadow-lg border-4 border-white">
                                    <div className="w-full h-full bg-cyan-100 rounded-full flex items-center justify-center">
                                        <User className="w-12 h-12 text-cyan-600"/>
                                    </div>
                                </div>
                                
                                {/* Nama & Email */}
                                <div className="mt-4 sm:mt-0 sm:ml-6">
                                    <h3 className="text-2xl font-extrabold text-gray-900">{user.namaLengkap}</h3>
                                    <p className="text-md text-gray-500">{user.email}</p>
                                    
                                    <span className={`mt-2 inline-block text-xs font-semibold px-3 py-1 rounded-full border ${roleColorClass}`}>
                                        {user.role}
                                    </span>
                                </div>
                            </div>

                            {/* BAGIAN BAWAH (2 KOLOM) */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 border-t pt-8">
                                
                                {/* KOLOM KIRI: INFO DETAIL & Aksi */}
                                <div className="lg:col-span-1 space-y-6">
                                    <h4 className="text-xl font-bold text-gray-700 border-b pb-2">Detail Personal</h4>
                                    <div className="space-y-3 text-sm">
                                        <p className="flex justify-between border-b pb-1">
                                            <span className="text-gray-500">ID Penentu:</span> 
                                            <span className="font-mono font-medium text-gray-800">{user.userId}</span>
                                        </p>
                                        <p className="flex justify-between border-b pb-1">
                                            <span className="text-gray-500">Lokasi Tugas:</span> 
                                            <span className="font-medium text-gray-800 text-right">{user.lokasiTugas}</span>
                                        </p>
                                        <p className="flex justify-between">
                                            <span className="text-gray-500">Bergabung Sejak:</span> 
                                            <span className="font-medium text-gray-800">{user.tanggalBergabung}</span>
                                        </p>
                                    </div>

                                    {/* Tombol Aksi (Dibuat Statis, menggunakan opacity dan cursor default) */}
                                    <div className="pt-4 border-t space-y-3">
                                        <button 
                                            className="flex items-center justify-center w-full px-4 py-3 bg-red-600 text-white font-semibold rounded-lg transition opacity-75 cursor-default hover:bg-red-700"
                                            disabled // Menonaktifkan tombol secara eksplisit
                                        >
                                            <LogOut className="w-5 h-5 mr-2"/> Keluar (Logout)
                                        </button>
                                        <button 
                                            className="flex items-center justify-center w-full px-4 py-3 border border-gray-300 bg-gray-100 text-gray-800 font-semibold rounded-lg transition opacity-75 cursor-default hover:bg-gray-200"
                                            disabled // Menonaktifkan tombol secara eksplisit
                                        >
                                            <Lock className="w-5 h-5 mr-2"/> Ganti Kata Sandi
                                        </button>
                                    </div>
                                </div>

                                {/* KOLOM KANAN: STATISTIK KONTRIBUSI */}
                                <div className="lg:col-span-2 space-y-6">
                                    <h4 className="text-xl font-bold text-gray-700 border-b pb-2">Metrik Kontribusi</h4>
                                    
                                    {/* Stat Cards */}
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        
                                        <StatCard 
                                            icon={<Layers className="w-6 h-6" />}
                                            title="Total Entri"
                                            value={user.stats.totalEntri}
                                            bgColor="bg-cyan-50"
                                            textColor="text-cyan-700"
                                            borderColor="border-cyan-200"
                                        />
                                        
                                        <StatCard 
                                            icon={<Clock className="w-6 h-6" />}
                                            title="Menunggu Verifikasi"
                                            value={user.stats.menungguVerifikasi}
                                            bgColor="bg-amber-50"
                                            textColor="text-amber-700"
                                            borderColor="border-amber-200"
                                        />
                                        
                                        <StatCard 
                                            icon={<CheckCircle className="w-6 h-6" />}
                                            title="Data Terverifikasi"
                                            value={user.stats.terverifikasi}
                                            bgColor="bg-emerald-50"
                                            textColor="text-emerald-700"
                                            borderColor="border-emerald-200"
                                        />
                                    </div>

                                    {/* Riwayat Tugas */}
                                    <div className="mt-8 pt-4 border-t">
                                        <h4 className="text-xl font-bold text-gray-700 mb-3">Riwayat Tugas & Peran</h4>
                                        <p className="text-gray-600 mb-4 text-sm">
                                            Anda bertugas sebagai **{user.role}** yang fokus pada verifikasi data di wilayah **{user.lokasiTugas}**. Rata-rata kontribusi bulanan Anda adalah **{Math.round(user.stats.totalEntri / 30)} entri per hari**.
                                        </p>

                                        <button 
                                            className="px-4 py-2 bg-cyan-600 text-white text-sm font-medium rounded-lg transition opacity-75 cursor-default hover:bg-cyan-700"
                                            disabled // Menonaktifkan tombol secara eksplisit
                                        >
                                            Lihat Riwayat Kontribusi Detail
                                        </button>
                                    </div>
                                </div>
                                
                            </div>
                        </div>

                    </div>

                </div>

            </main>

            {/* FOOTER */}
            <footer className="w-full bg-white border-t border-gray-200 mt-auto">
                <div className="container mx-auto p-4 text-center text-sm text-gray-500">
                    Copyright &copy; 2025 - Aplikasi Penentu Kandidat Mustahik
                </div>
            </footer>
        </div>
    );
};

export default ProfilePage;