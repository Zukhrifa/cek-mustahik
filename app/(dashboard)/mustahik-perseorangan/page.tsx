//12231945 Zulfa created form input mustahik perseorangan
//12231948 Lutfi edited zulfa's page
// app/(dashboard)/mustahik-perseorangan/page.tsx
// Individual eligibility check (no database save)

"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, XCircle, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { StatusPekerjaan, UmpDomisili } from "@/lib/types/mustahik.types";
import { calculateEligibility, formatEligibilityMessage } from "@/app/utils/layakMustahik";

interface FormData {
  nama: string;
  penghasilan: string;
  pekerjaan: StatusPekerjaan | "";
  jml_tanggungan: string;
  ump_domisili: UmpDomisili | "";
  alamat: string;
}

interface Result {
  eligible: boolean;
  message: string;
}

export default function MustahikPerseoranganPage() {
  const [form, setForm] = useState<FormData>({
    nama: "",
    penghasilan: "",
    pekerjaan: "",
    jml_tanggungan: "",
    ump_domisili: "",
    alamat: "",
  });

  const [result, setResult] = useState<Result | null>(null);

  const handleChange = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setResult(null); // Reset result when form changes
  };

  const handleReset = () => {
    setForm({
      nama: "",
      penghasilan: "",
      pekerjaan: "",
      jml_tanggungan: "",
      ump_domisili: "",
      alamat: "",
    });
    setResult(null);
    toast.info("Data telah direset");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi
    if (!form.nama || !form.penghasilan || !form.pekerjaan || !form.jml_tanggungan || !form.ump_domisili || !form.alamat) {
      toast.error("Semua field harus diisi");
      return;
    }

    const penghasilan = parseFloat(form.penghasilan);
    const tanggungan = parseInt(form.jml_tanggungan);

    if (isNaN(penghasilan) || penghasilan < 0) {
      toast.error("Penghasilan tidak valid");
      return;
    }

    if (isNaN(tanggungan) || tanggungan < 0) {
      toast.error("Jumlah tanggungan tidak valid");
      return;
    }

    // Hitung kelayakan
    const eligibilityResult = calculateEligibility({
      penghasilan,
      pekerjaan: form.pekerjaan as StatusPekerjaan,
      jml_tanggungan: tanggungan,
      ump_domisili: form.ump_domisili as UmpDomisili,
    });

    const message = formatEligibilityMessage(eligibilityResult);

    setResult({
      eligible: eligibilityResult.eligible,
      message,
    });

    toast.success("Pengecekan selesai!");
  };

  return (
    <div className="mx-auto max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle>Cek Kelayakan Mustahik</CardTitle>
          <CardDescription>
            Isi formulir di bawah untuk menentukan kelayakan kandidat mustahik (data tidak disimpan)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Nama */}
            <div>
              <Label htmlFor="nama">Nama Lengkap</Label>
              <Input
                id="nama"
                value={form.nama}
                onChange={(e) => handleChange("nama", e.target.value)}
                placeholder="Masukkan nama lengkap"
                className="mt-1"
              />
            </div>

            {/* Penghasilan */}
            <div>
              <Label htmlFor="penghasilan">Penghasilan per Bulan (Rp)</Label>
              <Input
                id="penghasilan"
                type="number"
                value={form.penghasilan}
                onChange={(e) => handleChange("penghasilan", e.target.value)}
                placeholder="Contoh: 2000000"
                className="mt-1"
                min="0"
              />
            </div>

            {/* Status Pekerjaan */}
            <div>
              <Label htmlFor="pekerjaan">Status Pekerjaan</Label>
              <Select
                value={form.pekerjaan}
                onValueChange={(value) => handleChange("pekerjaan", value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Pilih status pekerjaan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tidak_bekerja">Tidak Bekerja</SelectItem>
                  <SelectItem value="tidak_tetap">Tidak Tetap</SelectItem>
                  <SelectItem value="tetap">Tetap</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Jumlah Tanggungan */}
            <div>
              <Label htmlFor="tanggungan">Jumlah Tanggungan</Label>
              <Input
                id="tanggungan"
                type="number"
                value={form.jml_tanggungan}
                onChange={(e) => handleChange("jml_tanggungan", e.target.value)}
                placeholder="Contoh: 3"
                className="mt-1"
                min="0"
              />
            </div>

            {/* UMP Domisili */}
            <div>
              <Label htmlFor="ump">UMP Domisili</Label>
              <Select
                value={form.ump_domisili}
                onValueChange={(value) => handleChange("ump_domisili", value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Pilih UMP domisili" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kurang_2_5">Kurang dari Rp 2,5 Juta</SelectItem>
                  <SelectItem value="antara_2_5_3_5">Antara Rp 2,5 - 3,5 Juta</SelectItem>
                  <SelectItem value="lebih_3_5">Lebih dari Rp 3,5 Juta</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Alamat */}
            <div>
              <Label htmlFor="alamat">Alamat Lengkap</Label>
              <Textarea
                id="alamat"
                value={form.alamat}
                onChange={(e) => handleChange("alamat", e.target.value)}
                placeholder="Masukkan alamat lengkap"
                rows={3}
                className="mt-1"
              />
            </div>

            {/* Result Display */}

{result && (
  <div 
    className={`
      rounded-lg border p-4 w-full
      ${result.eligible 
        ? "border-green-500 bg-green-50" 
        : "border-red-500 bg-red-50"
      }
    `}
  >
    <div className="flex gap-3 w-full">
      {result.eligible ? (
        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
      ) : (
        <XCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
      )}
      <div className="flex-1 w-full overflow-hidden">
        <h4 className="font-semibold mb-2 text-base">
          {result.eligible ? "✓ Layak Menerima Bantuan" : "✗ Tidak Layak"}
        </h4>
        <p 
          className="text-sm text-gray-700 leading-relaxed"
          style={{
            whiteSpace: 'normal',
            wordWrap: 'break-word',
            overflowWrap: 'break-word',
            wordBreak: 'break-word',
            width: '100%',
            maxWidth: '100%'
          }}
        >
          {result.message}
        </p>
      </div>
    </div>
  </div>
)}

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                type="button"
                onClick={handleReset}
                variant="outline"
                className="flex-1"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset
              </Button>
              <Button type="submit" className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                Cek Status
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}