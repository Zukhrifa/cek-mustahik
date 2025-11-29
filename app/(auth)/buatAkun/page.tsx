//12231945 Bifaqih Zulfa made design for masuk akun page
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

// Definisikan komponen utama
export default function MasukAkunPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // Tambahkan state untuk Konfirmasi Kata Sandi
  const [confirmPassword, setConfirmPassword] = useState(''); 

  // Fungsi untuk menangani proses pendaftaran/masuk
  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    

    if (password !== confirmPassword) {
      alert("Kata Sandi dan Konfirmasi Kata Sandi tidak cocok."); 
      return;
    }
    
    // Logic otentikasi akan ditambahkan di sini
    console.log('Mencoba pendaftaran dengan:', { username, password, confirmPassword });

  };

  return (
    // Bagian ini menangani layout pusat (mirip dengan layout.tsx )
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
      
      {/* HEADER UTAMA */}
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Aplikasi Penentu Kandidat Mustahik
        </h1>
        <p className="text-gray-600 max-w-md mx-auto">
          Silakan buat akun untuk mengakses lebih banyak fitur Aplikasi Penentu Kandidat Mustahik
        </p>
      </header>

      {/* KARTU FORMULIR BUAT AKUN */}
      <Card className="w-full max-w-md p-6 shadow-xl border-gray-200">
        <CardHeader className="items-center pb-6">
          <CardTitle className="text-2xl font-semibold">Buat Akun</CardTitle> 
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleAuth} className="space-y-6">
            
            {/* INPUT NAMA PENGGUNA */}
            <div className="space-y-2">
              <Label htmlFor="username">Nama Pengguna</Label>
              <Input
                id="username"
                type="text"
                placeholder="Masukkan nama pengguna"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            {/* INPUT KATA SANDI */}
            <div className="space-y-2">
              <Label htmlFor="password">Kata Sandi</Label>
              <Input
                id="password"
                type="password"
                placeholder="Masukkan kata sandi"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            {/* INPUT KONFIRMASI KATA SANDI BARU */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Konfirmasi Kata Sandi</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Ulangi kata sandi"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            {/* TOMBOL BUAT AKUN */}
            <Button type="submit" className="w-full mt-6 bg-black hover:bg-gray-800 text-white py-2 rounded-lg">
              Buat Akun
            </Button>
            
          </form>
        </CardContent>
      </Card>

    </div>
  );
}
