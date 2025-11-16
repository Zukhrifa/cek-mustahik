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
import { supabase } from '@/lib/supabase'; // Pastikan file ini ada
 
 
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
 
    // Supabase menggunakan email untuk pendaftaran, jadi kita buat email dummy
    const dummyEmail = `${username.toLowerCase().replace(/[^a-z0-9]/g, '_')}@mustahik.app`;
 
    try {
      // Pendaftaran pengguna baru
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: dummyEmail,
        password: password,
        options: {
          data: {
            user_name: username, // Menyimpan username di metadata user
          },
        },
      });
 
      if (signUpError) {
        // Menggunakan template literal untuk pesan error yang lebih jelas
        toast.error(`Pendaftaran gagal: ${signUpError.message}`); 
      } else {
        // Cek jika Supabase mengirim email konfirmasi
        if (data?.user && data.user.identities && data.user.identities.length === 0) {
             toast.success("Pendaftaran berhasil! Akun Anda telah dibuat. Silakan login.");
        } else {
             // Jika Supabase mengharuskan konfirmasi email (perilaku default)
             toast.success("Pendaftaran berhasil! Silakan periksa email Anda untuk mengkonfirmasi akun, lalu login.");
        }
        
        router.push('/masukAkun'); // Arahkan ke halaman login
      }
    } catch (error) {
      console.error("Kesalahan umum:", error);
      toast.error("Terjadi kesalahan tak terduga saat pendaftaran.");
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-sm shadow-xl">
        <CardHeader className="text-center space-y-2">
          <UserPlus className="mx-auto h-8 w-8 text-primary" />
          <CardTitle className="text-2xl font-bold">
            Aplikasi Penentu Kandidat Mustahik
          </CardTitle>
          <CardDescription>
            Silakan buat akun untuk mengakses lebih banyak fitur pada aplikasi
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignUp} className="space-y-4">
            
            <div className="space-y-2">
              <Label htmlFor="username">Nama Pengguna</Label>
              <Input
                id="username"
                type="text"
                placeholder="Nama Pengguna Anda"
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