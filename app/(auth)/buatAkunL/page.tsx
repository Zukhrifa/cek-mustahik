// 12231948 Lutfi made buatAkun for tutorial purpose

"use client";

import { useState } from "react";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { UserPlus } from "lucide-react";
import { toast } from "sonner"; 

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from '@/lib/supabase'; 


export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!username || !password || !confirmPassword) {
      toast.error("Semua field (Username, Kata Sandi, Konfirmasi) harus diisi.");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Kata Sandi dan Konfirmasi Kata Sandi tidak cocok.");
      setLoading(false);
      return;
    }

    const dummyEmail = `${username.toLowerCase().replace(/[^a-z0-9]/g, '_')}@mustahik.app`;

    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email: dummyEmail, 
        password: password,
        options: {
          data: {
            user_name: username, // 
          },
        },
      });

      if (signUpError) {
        toast.error(`Pendaftaran gagal: ${signUpError.message}`);
      } else {
        toast.success("Pendaftaran berhasil! Akun Anda telah dibuat.");

        router.push('/masukAkun'); 
      }
    } catch (error) {
      console.error("Kesalahan umum:", error);
      toast.error("Terjadi kesalahan tak terduga saat pendaftaran.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-3 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <UserPlus className="h-6 w-6" />
          </div>
          <CardTitle className="text-2xl">Aplikasi Penentu Kandidat Mustahik</CardTitle>
          <CardDescription>
            Silakan buat akun untuk mengakses lebih banyak fitur pada aplikasi
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignUp} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username"> Nama Pengguna</Label>
              <Input
                id="username"
                type="text" 
                placeholder="Masukkan Nama User"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Kata Sandi</Label>
              <Input
                id="password"
                type="password"
                placeholder="Minimal 6 karakter"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Konfirmasi Kata Sandi</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Ulangi Kata Sandi"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                minLength={6}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Memuat...' : 'Buat Akun'}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm">
            Sudah punya akun?{' '}
            <Link 
              href="/masukAkun" 
              className="text-primary hover:underline font-medium"
            >
              Masuk
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}