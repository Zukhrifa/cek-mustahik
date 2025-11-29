// 12231948 Lutfi made MasukAkun fro tutorial purpose

'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// Definisikan tipe untuk properti input (opsional, untuk konsistensi)
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
}

// Komponen Input Kustom
const CustomInput: React.FC<InputProps> = ({ id, label, type = 'text', ...props }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      type={type}
      id={id}
      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      {...props}
    />
  </div>
);

// Komponen Halaman Login
const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logika login di sini
    console.log('Username:', username);
    console.log('Password:', password);
    alert('Logika Masuk (Login) diproses. Cek konsol!');
    // Arahkan pengguna ke halaman dashboard atau beranda setelah berhasil
    // router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md text-center mb-8">
        {/* Judul Utama */}
        <h1 className="text-3xl font-bold text-gray-800">
          Aplikasi Penentu Kandidat Mustahik
        </h1>
        {/* Sub-judul */}
        <p className="mt-4 text-gray-600 px-6">
          Silakan masuk menggunakan akun untuk mengakses lebih banyak fitur Aplikasi Penentu Kandidat Mustahik
        </p>
      </div>

      {/* Kontainer Form */}
      <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-xl border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
          Masuk ke Akun
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Input Nama User */}
          <CustomInput
            id="username"
            label="Nama User"
            type="text"
            placeholder="Masukkan Nama User Anda"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          {/* Input Kata Sandi */}
          <CustomInput
            id="password"
            label="Kata Sandi"
            type="password"
            placeholder="Masukkan Kata Sandi Anda"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Link Lupa Kata Sandi */}
          <div className="text-right mb-6">
            <Link href="/auth/lupaKataSandi" className="text-sm font-medium text-blue-600 hover:text-blue-500">
              Lupa kata sandi?
            </Link>
          </div>

          {/* Tombol Masuk */}
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
          >
            Masuk
          </button>
        </form>

        {/* Link Buat Akun */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Belum punya akun?{' '}
            {/* Mengganti ke halaman pendaftaran (misalnya, di /auth/daftar) */}
            <Link href="/auth/buatAkun" className="font-bold text-blue-600 hover:text-blue-500">
              Buat Akun
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;