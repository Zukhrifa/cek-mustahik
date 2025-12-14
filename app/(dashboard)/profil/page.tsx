//12231948 Lutfi created pages
//12231945 bifaqih zulfa made profil design
// app/(dashboard)/profil/page.tsx
// Profile page with password change and account deletion
//12231948 Lutfi edits Zulfa's design
"use client";
import React, { useState } from 'react';
// Import icons from Lucide-React
import { 
    User, 
    AlertTriangle, 
    Lock,      
    Trash2,
    Database,        
    Info
} from 'lucide-react'; 
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import { deleteAllMustahikByUser } from '@/lib/services/mustahikservice';

export default function ProfilPage() {
  const { user, changePassword, removeAccount } = useAuth();
  const router = useRouter();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error('Semua field password harus diisi');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('Password baru dan konfirmasi tidak cocok');
      return;
    }

    if (newPassword.length < 6) {
      toast.error('Password minimal 6 karakter');
      return;
    }

    setIsChangingPassword(true);

    try {
      const success = await changePassword(currentPassword, newPassword);

      if (success) {
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        toast.success('Password berhasil diubah');
      } else {
        toast.error('Password saat ini salah');
      }
    } catch (error) {
      console.error('Change password error:', error);
      toast.error('Terjadi kesalahan saat mengubah password');
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleDeleteData = async () => {
    if (!user) return;

    try {
      const response = await deleteAllMustahikByUser(user.id_user);

      if (response.success) {
        toast.success('Semua data kandidat berhasil dihapus');
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error('Delete data error:', error);
      toast.error('Terjadi kesalahan saat menghapus data');
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const success = await removeAccount();

      if (success) {
        toast.success('Akun berhasil dihapus');
        router.push('/masukAkun');
      } else {
        toast.error('Gagal menghapus akun');
      }
    } catch (error) {
      console.error('Delete account error:', error);
      toast.error('Terjadi kesalahan saat menghapus akun');
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Profile Info */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2 mb-1">
            <User className="h-5 w-5 text-gray-700" />
            <CardTitle>Informasi Profil</CardTitle>
          </div>
          <CardDescription>Informasi akun Anda</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label>Username</Label>
            <div className="text-2xl font-bold text-gray-900">{user.username}</div>
          </div>
        </CardContent>
      </Card>

      {/* Change Password */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2 mb-1">
            <Lock className="h-5 w-5 text-gray-700" />
            <CardTitle>Ubah Password</CardTitle>
          </div>
          <CardDescription>Update password akun Anda</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Password Saat Ini</Label>
            <Input
              id="current-password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Masukkan password saat ini"
              disabled={isChangingPassword}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password">Password Baru</Label>
            <Input
              id="new-password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Masukkan password baru (min. 6 karakter)"
              disabled={isChangingPassword}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Konfirmasi Password Baru</Label>
            <Input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Konfirmasi password baru"
              disabled={isChangingPassword}
            />
          </div>
          <div className="flex justify-end pt-2">
            <Button 
              onClick={handleChangePassword} 
              disabled={isChangingPassword}
              className="bg-gray-800 hover:bg-gray-900"
            >
              {isChangingPassword ? 'Memproses...' : 'Ubah Password'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-200">
        <CardHeader>
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <CardTitle className="text-red-600">Zona Berbahaya</CardTitle>
          </div>
          <CardDescription>
            Tindakan permanen yang tidak dapat dibatalkan
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Delete All Data */}
          <div className="flex items-center justify-between rounded-lg border border-gray-300 p-4 bg-gray-50">
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2">
                <Database className="h-4 w-4 text-gray-700" />
                <h4 className="font-semibold text-gray-900">Hapus Semua Data Kandidat</h4>
              </div>
              <p className="text-sm text-gray-600">
                Menghapus semua data kandidat yang tersimpan dalam sistem
              </p>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50 ml-4">
                  Hapus Data
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Konfirmasi Hapus Data</AlertDialogTitle>
                  <AlertDialogDescription>
                    Apakah Anda yakin ingin menghapus semua data kandidat? Tindakan ini tidak dapat dibatalkan.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Batal</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteData} className="bg-red-600 hover:bg-red-700">
                    Hapus Semua Data
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          <Separator />

          {/* Delete Account */}
          <div className="flex items-center justify-between rounded-lg border border-gray-300 p-4 bg-gray-50">
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2">
                <Trash2 className="h-4 w-4 text-gray-700" />
                <h4 className="font-semibold text-gray-900">Hapus Akun</h4>
              </div>
              <p className="text-sm text-gray-600">
                Menghapus akun dan semua data yang terkait secara permanen
              </p>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="ml-4">
                  Hapus Akun
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Konfirmasi Hapus Akun</AlertDialogTitle>
                  <AlertDialogDescription>
                    Apakah Anda yakin ingin menghapus akun ini? Semua data akan dihapus secara permanen dan tidak dapat dipulihkan.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Batal</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteAccount} className="bg-red-600 hover:bg-red-700">
                    Ya, Hapus Akun
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}