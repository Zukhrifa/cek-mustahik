//12231945 Bifaqih Zulfa made design for masuk akun page
'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Home } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';

// Definisikan komponen utama
export default function MasukAkunPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // Tambahkan state untuk Konfirmasi Kata Sandi
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register, isLoggedIn } = useAuth();
  const router = useRouter(); 

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/mustahik-perseorangan');
    }
  }, [isLoggedIn, router]);

  // Fungsi untuk menangani proses pendaftaran/masuk
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password || !confirmPassword) {
      toast.error('Semua field harus diisi');
      return;
    }

    if (password !== confirmPassword) {
      alert("Kata Sandi dan Konfirmasi Kata Sandi tidak cocok."); 
      return;
    }

    if (password.length < 6) {
      toast.error('Password minimal 6 karakter');
      return;
    }
    
    // Logic otentikasi akan ditambahkan di sini
    setIsLoading(true);

    try {
      const success = await register({ username, password });

      if (success) {
        toast.success('Registrasi berhasil! Silakan login.');
        router.push('/masukAkun');
      } else {
        toast.error('Gagal membuat akun. Username mungkin sudah terdaftar.');
      }
    } catch (error) {
      console.error('Register error:', error);
      toast.error('Terjadi kesalahan saat membuat akun');
    } finally {
      setIsLoading(false);
    }
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
        <CardHeader className="items-center pb-6 space-y-3">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-600 text-white">
            <Home className="h-6 w-6" />
          </div>
          <CardTitle className="text-2xl font-semibold">Buat Akun</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAuth} className="space-y-6">
    

{/* INPUT USERNAME */}
<div className="space-y-2">
  <Label htmlFor="username">Username</Label>
  <Input
    id="username"
    name="username"  
    type="text"
    placeholder="Masukkan username"
    required
    value={username}
    onChange={(e) => setUsername(e.target.value)}
    disabled={isLoading}
    autoComplete="username"  
  />
</div>

{/* INPUT PASSWORD */}
<div className="space-y-2">
  <Label htmlFor="password">Password</Label>
  <Input
    id="password"
    name="password"  
    type="password"
    placeholder="Minimal 6 karakter"
    required
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    disabled={isLoading}
    autoComplete="new-password"  
  />
</div>

{/* INPUT KONFIRMASI PASSWORD */}
<div className="space-y-2">
  <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
  <Input
    id="confirmPassword"
    name="confirmPassword"  
    type="password"
    placeholder="Ulangi password"
    required
    value={confirmPassword}
    onChange={(e) => setConfirmPassword(e.target.value)}
    disabled={isLoading}
    autoComplete="new-password"  
  />
</div>

            {/* TOMBOL BUAT AKUN */}
            <Button
              type="submit"
              className="w-full mt-6 bg-black hover:bg-gray-800 text-white"
              disabled={isLoading}
            >
              {isLoading ? 'Memproses...' : 'Buat Akun'}
            </Button>

            {/* Link ke Login */}
            <div className="text-center text-sm text-gray-600">
              Sudah punya akun?{' '}
              <Link href="/masukAkun" className="font-bold text-emerald-600 hover:text-emerald-700">
                Masuk di sini
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}