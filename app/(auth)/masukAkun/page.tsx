// 12231948 Lutfi made MasukAkun fro tutorial purpose
//12231945 Bifaqih Zulfa made design for buat akun page
// 12231948 Lutfi made a change /daftar => /buatAkun
//12231948 Lutfi edit zulfa's masukAkun
// app/(auth)/masukAkun/page.tsx
// Login page with Supabase authentication

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Home } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';

export default function MasukAkunPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, isLoggedIn } = useAuth();
  const router = useRouter();

  // Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      router.push('/mustahik-perseorangan');
    }
  }, [isLoggedIn, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      toast.error('Username dan password harus diisi');
      return;
    }

    setIsLoading(true);

    try {
      const success = await login({ username, password });

      if (success) {
        toast.success('Login berhasil!');
        router.push('/mustahik-perseorangan');
      } else {
        toast.error('Username atau password salah');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Terjadi kesalahan saat login');
    } finally {
      setIsLoading(false);
    }
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
          Silakan masuk menggunakan akun untuk mengakses lebih banyak fitur
          Aplikasi Penentu Kandidat Mustahik
        </p>
      </div>

      {/* Kontainer Form */}
      <Card className="w-full max-w-md shadow-xl border-gray-200">
        <CardHeader className="space-y-3 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-600 text-white">
            <Home className="h-6 w-6" />
          </div>
          <CardTitle className="text-2xl">Masuk ke Akun</CardTitle>
          <CardDescription>
            Masukkan username dan password Anda
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Input Username */}
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Masukkan username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>

            {/* Input Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>

            {/* Tombol Masuk */}
            <Button
              type="submit"
              className="w-full bg-black hover:bg-gray-800 text-white"
              disabled={isLoading}
            >
              {isLoading ? 'Memproses...' : 'Masuk'}
            </Button>

            {/* Link Buat Akun */}
            <div className="text-center text-sm text-gray-600">
              Belum punya akun?{' '}
              <Link href="/buatAkun" className="font-bold text-emerald-600 hover:text-emerald-700">
                Buat Akun
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}