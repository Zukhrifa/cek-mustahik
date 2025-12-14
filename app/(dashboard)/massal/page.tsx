//12231949 fauzan created page data massal
//12231948 Lutfi edited Fauzzan's page
// app/(dashboard)/massal/page.tsx
// Bulk eligibility check with Supabase save, Excel import/export, PDF generation

"use client";

import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Trash2, Download, FileText, Upload, FileSpreadsheet, CheckCircle, XCircle, Save } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { createBulkMustahik } from "@/lib/services/mustahikservice";
import { StatusPekerjaan, UmpDomisili, MustahikCreateInput } from "@/lib/types/mustahik.types";
import { calculateEligibility } from "@/app/utils/layakMustahik";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface BulkRow {
  id: string;
  nama: string;
  penghasilan: string;
  pekerjaan: StatusPekerjaan | "";
  jml_tanggungan: string;
  ump_domisili: UmpDomisili | "";
  alamat: string;
  status_kelayakan?: boolean | null;
}

export default function MassalPage() {
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [rows, setRows] = useState<BulkRow[]>([
    {
      id: "1",
      nama: "",
      penghasilan: "",
      pekerjaan: "",
      jml_tanggungan: "",
      ump_domisili: "",
      alamat: "",
      status_kelayakan: null,
    },
  ]);
  const [isSaving, setIsSaving] = useState(false);

  const addRow = () => {
    const newRow: BulkRow = {
      id: Date.now().toString(),
      nama: "",
      penghasilan: "",
      pekerjaan: "",
      jml_tanggungan: "",
      ump_domisili: "",
      alamat: "",
      status_kelayakan: null,
    };
    setRows([...rows, newRow]);
    toast.success("Baris baru ditambahkan");
  };

  const removeRow = (id: string) => {
    if (rows.length === 1) {
      toast.error("Minimal harus ada 1 baris data");
      return;
    }
    setRows(rows.filter((row) => row.id !== id));
    toast.info("Baris dihapus");
  };

  const updateRow = (id: string, field: keyof BulkRow, value: string) => {
    setRows(
      rows.map((row) =>
        row.id === id ? { ...row, [field]: value, status_kelayakan: null } : row
      )
    );
  };

  const checkAllEligibility = () => {
    const updatedRows = rows.map((row) => {
      if (!row.nama || !row.penghasilan || !row.pekerjaan || !row.jml_tanggungan || !row.ump_domisili || !row.alamat) {
        toast.error(`Data tidak lengkap untuk ${row.nama || "baris kosong"}`);
        return row;
      }

      const result = calculateEligibility({
        penghasilan: parseFloat(row.penghasilan),
        pekerjaan: row.pekerjaan as StatusPekerjaan,
        jml_tanggungan: parseInt(row.jml_tanggungan),
        ump_domisili: row.ump_domisili as UmpDomisili,
      });

      return {
        ...row,
        status_kelayakan: result.eligible,
      };
    });
    setRows(updatedRows);
    toast.success("Pengecekan massal selesai!");
  };

  const saveToDatabase = async () => {
    if (!user) {
      toast.error("Anda harus login untuk menyimpan data");
      return;
    }

    const validRows = rows.filter(
      (row) =>
        row.nama &&
        row.penghasilan &&
        row.pekerjaan &&
        row.jml_tanggungan &&
        row.ump_domisili &&
        row.alamat &&
        row.status_kelayakan !== null
    );

    if (validRows.length === 0) {
      toast.error("Tidak ada data valid untuk disimpan. Lakukan pengecekan terlebih dahulu.");
      return;
    }

    setIsSaving(true);

    try {
      const dataToSave: MustahikCreateInput[] = validRows.map((row) => ({
        id_user: user.id_user,
        nama: row.nama,
        penghasilan: parseFloat(row.penghasilan),
        pekerjaan: row.pekerjaan as StatusPekerjaan,
        jml_tanggungan: parseInt(row.jml_tanggungan),
        ump_domisili: row.ump_domisili as UmpDomisili,
        alamat: row.alamat,
        status_kelayakan: row.status_kelayakan,
      }));

      const response = await createBulkMustahik(dataToSave);

      if (response.success) {
        toast.success(`${validRows.length} data berhasil disimpan ke database!`);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Save error:", error);
      toast.error("Terjadi kesalahan saat menyimpan data");
    } finally {
      setIsSaving(false);
    }
  };

  const exportCSV = () => {
    const headers = "Nama,Penghasilan,Status Pekerjaan,Jumlah Tanggungan,UMP Domisili,Alamat,Status Kelayakan\n";
    const csvData = rows
      .map((row) => {
        const pekerjaan = row.pekerjaan === "tidak_bekerja" ? "Tidak Bekerja" : row.pekerjaan === "tidak_tetap" ? "Tidak Tetap" : "Tetap";
        const ump = row.ump_domisili === "kurang_2_5" ? "< 2.5 Juta" : row.ump_domisili === "antara_2_5_3_5" ? "2.5 - 3.5 Juta" : "> 3.5 Juta";
        const status = row.status_kelayakan === null ? "-" : row.status_kelayakan ? "Layak" : "Tidak Layak";
        return `"${row.nama}","${row.penghasilan}","${pekerjaan}","${row.jml_tanggungan}","${ump}","${row.alamat}","${status}"`;
      })
      .join("\n");

    const blob = new Blob([headers + csvData], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `kelayakan-massal-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    toast.success("CSV berhasil diexport!");
  };

  const exportPDF = () => {
    const hasCheckedData = rows.some((row) => row.status_kelayakan !== null);
    if (!hasCheckedData) {
      toast.error("Lakukan pengecekan data terlebih dahulu!");
      return;
    }

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Laporan Kelayakan Mustahik", 14, 15);
    doc.setFontSize(10);
    doc.text(`Tanggal: ${new Date().toLocaleDateString("id-ID")}`, 14, 22);

    const tableData = rows
      .filter((row) => row.status_kelayakan !== null)
      .map((row) => [
        row.nama,
        `Rp ${parseInt(row.penghasilan).toLocaleString("id-ID")}`,
        row.pekerjaan === "tidak_bekerja" ? "Tidak Bekerja" : row.pekerjaan === "tidak_tetap" ? "Tidak Tetap" : "Tetap",
        row.jml_tanggungan,
        row.ump_domisili === "kurang_2_5" ? "< 2.5 Jt" : row.ump_domisili === "antara_2_5_3_5" ? "2.5-3.5 Jt" : "> 3.5 Jt",
        row.alamat,
        row.status_kelayakan ? "Layak" : "Tidak Layak",
      ]);

    autoTable(doc, {
      startY: 28,
      head: [["Nama", "Penghasilan", "Status Kerja", "Tanggungan", "UMP", "Alamat", "Status"]],
      body: tableData,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [16, 185, 129] },
    });

    doc.save(`kelayakan-mustahik-${new Date().toISOString().split("T")[0]}.pdf`);
    toast.success("PDF berhasil diunduh!");
  };

  const downloadTemplate = () => {
    const template = [
      {
        Nama: "Contoh Nama 1",
        Penghasilan: "1500000",
        "Status Pekerjaan": "tidak_bekerja",
        "Jumlah Tanggungan": "2",
        "UMP Domisili": "kurang_2_5",
        Alamat: "Jl. Contoh No. 123",
      },
      {
        Nama: "Contoh Nama 2",
        Penghasilan: "3000000",
        "Status Pekerjaan": "tetap",
        "Jumlah Tanggungan": "1",
        "UMP Domisili": "antara_2_5_3_5",
        Alamat: "Jl. Contoh No. 456",
      },
    ];

    const ws = XLSX.utils.json_to_sheet(template);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Template");
    XLSX.writeFile(wb, "template-kelayakan-mustahik.xlsx");
    toast.success("Template Excel berhasil diunduh!");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = new Uint8Array(event.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet) as any[];

        const importedRows: BulkRow[] = jsonData.map((row, index) => ({
          id: Date.now().toString() + index,
          nama: row.Nama || "",
          penghasilan: row.Penghasilan?.toString() || "",
          pekerjaan: row["Status Pekerjaan"] || "",
          jml_tanggungan: row["Jumlah Tanggungan"]?.toString() || "",
          ump_domisili: row["UMP Domisili"] || "",
          alamat: row.Alamat || "",
          status_kelayakan: null,
        }));

        if (importedRows.length > 0) {
          setRows(importedRows);
          toast.success(`${importedRows.length} baris data berhasil diimport!`);
        } else {
          toast.error("File Excel kosong atau format tidak sesuai");
        }
      } catch (error) {
        toast.error("Gagal membaca file Excel");
        console.error(error);
      }
    };

    reader.readAsArrayBuffer(file);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Cek Kelayakan Massal</CardTitle>
          <CardDescription>
            Input data kandidat dalam bentuk tabel untuk pengecekan massal. Data akan disimpan ke database.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-wrap gap-2">
            <Button onClick={addRow} variant="outline" size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Tambah Baris
            </Button>
            <Button onClick={checkAllEligibility} size="sm" className="bg-emerald-600 hover:bg-emerald-700">
              Cek Semua
            </Button>
            <Button onClick={saveToDatabase} size="sm" disabled={isSaving} className="bg-blue-600 hover:bg-blue-700">
              <Save className="mr-2 h-4 w-4" />
              {isSaving ? "Menyimpan..." : "Simpan ke Database"}
            </Button>
            <Button onClick={exportPDF} variant="secondary" size="sm">
              <FileText className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
            <Button onClick={exportCSV} variant="secondary" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
            <Button onClick={downloadTemplate} variant="outline" size="sm">
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              Unduh Template Excel
            </Button>
            <Button onClick={() => fileInputRef.current?.click()} variant="outline" size="sm">
              <Upload className="mr-2 h-4 w-4" />
              Upload Excel
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx,.xls"
              className="hidden"
              onChange={handleFileUpload}
            />
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">Aksi</TableHead>
                  <TableHead className="min-w-[150px]">Nama</TableHead>
                  <TableHead className="min-w-[120px]">Penghasilan</TableHead>
                  <TableHead className="min-w-[130px]">Status Kerja</TableHead>
                  <TableHead className="min-w-[100px]">Tanggungan</TableHead>
                  <TableHead className="min-w-[150px]">UMP Domisili</TableHead>
                  <TableHead className="min-w-[200px]">Alamat</TableHead>
                  <TableHead className="min-w-[100px]">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <Button variant="ghost" size="icon" onClick={() => removeRow(row.id)} className="h-8 w-8">
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Input
                        value={row.nama}
                        onChange={(e) => updateRow(row.id, "nama", e.target.value)}
                        placeholder="Nama"
                        className="min-w-[150px]"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={row.penghasilan}
                        onChange={(e) => updateRow(row.id, "penghasilan", e.target.value)}
                        placeholder="2000000"
                        className="min-w-[120px]"
                      />
                    </TableCell>
                    <TableCell>
                      <Select value={row.pekerjaan} onValueChange={(value) => updateRow(row.id, "pekerjaan", value)}>
                        <SelectTrigger className="min-w-[130px]">
                          <SelectValue placeholder="Pilih" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tidak_bekerja">Tidak Bekerja</SelectItem>
                          <SelectItem value="tidak_tetap">Tidak Tetap</SelectItem>
                          <SelectItem value="tetap">Tetap</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={row.jml_tanggungan}
                        onChange={(e) => updateRow(row.id, "jml_tanggungan", e.target.value)}
                        placeholder="0"
                        min="0"
                        className="min-w-[100px]"
                      />
                    </TableCell>
                    <TableCell>
                      <Select value={row.ump_domisili} onValueChange={(value) => updateRow(row.id, "ump_domisili", value)}>
                        <SelectTrigger className="min-w-[150px]">
                          <SelectValue placeholder="Pilih UMP" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="kurang_2_5">{"< 2,5 Juta"}</SelectItem>
                          <SelectItem value="antara_2_5_3_5">2,5 - 3,5 Juta</SelectItem>
                          <SelectItem value="lebih_3_5">{"> 3,5 Juta"}</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Input
                        value={row.alamat}
                        onChange={(e) => updateRow(row.id, "alamat", e.target.value)}
                        placeholder="Alamat lengkap"
                        className="min-w-[200px]"
                      />
                    </TableCell>
                    <TableCell>
                      {row.status_kelayakan === true && (
                        <div className="flex items-center gap-1 text-green-600">
                          <CheckCircle className="h-4 w-4" />
                          <span className="text-sm font-medium">Layak</span>
                        </div>
                      )}
                      {row.status_kelayakan === false && (
                        <div className="flex items-center gap-1 text-red-600">
                          <XCircle className="h-4 w-4" />
                          <span className="text-sm font-medium">Tidak</span>
                        </div>
                      )}
                      {row.status_kelayakan === null && (
                        <span className="text-sm text-gray-400">-</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
