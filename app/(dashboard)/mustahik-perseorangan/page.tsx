"use client"; 
import { useState } from "react"; 
 
interface MustahikFormData { 
  nama: string; 
  penghasilan: number; 
  status: "tetap" | "tidak tetap" | "tidak bekerja" | ""; 
  tanggungan: number; 
  ump: number; 
  alamat: string; 
} 
 
export default function MustahikPerseoranganPage() { 
  const [form, setForm] = useState<MustahikFormData>({ 
    nama: "", 
    penghasilan: 0, 
    status: "", 
    tanggungan: 0, 
    ump: 0, 
    alamat: "", 
  }); 
 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement 
| HTMLSelectElement>) => { 
    const { name, value } = e.target; 
    setForm((prev) => ({ 
      ...prev, 
      [name]: ["penghasilan", "tanggungan", "ump"].includes(name) 
        ? Number(value) 
        : value, 
    })); 
  }; 
 
  const handleReset = () => { 
    setForm({ 
      nama: "", 
      penghasilan: 0, 
      status: "", 
      tanggungan: 0, 
      ump: 0, 
      alamat: "", 
    }); 
  }; 
 
  const handleSubmit = (e: React.FormEvent) => { 
    e.preventDefault(); 
    console.log("Data mustahik:", form); 
  }; 
 
  return ( 
    <main className="max-w-2xl mx-auto p-6"> 
      <h1 className="text-2xl font-bold mb-6">Cek Kelayakan Mustahik</h1> 
      <form onSubmit={handleSubmit} className="space-y-5"> 
        <div> 
          <label htmlFor="nama" className="block text-sm font-medium text-gray-700 mb-1"> 
            Nama 
          </label> 
          <input 
            id="nama" 
            name="nama" 
            value={form.nama} 
            onChange={handleChange} 
            placeholder="Masukkan Nama" 
            className="w-full p-2 border rounded" 
          /> 
        </div> 
 
        <div> 
          <label htmlFor="penghasilan" className="block text-sm font-medium text-gray-700 mb-1"> 
            Penghasilan per Bulan (Rp) 
          </label> 
          <input 
            id="penghasilan" 
            name="penghasilan" 
            type="number" 
            value={form.penghasilan} 
            onChange={handleChange} 
            placeholder="Contoh: 1000000" 
            className="w-full p-2 border rounded" 
          /> 
        </div> 
 
        <div> 
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1"> 
            Status Pekerjaan 
          </label> 
          <select 
            id="status" 
            name="status" 
            value={form.status} 
            onChange={handleChange} 
            className="w-full p-2 border rounded" 
          > 
            <option value="">Pilih Status</option> 
            <option value="tidak bekerja">Tidak Bekerja</option> 
            <option value="tidak tetap">Tidak Tetap</option> 
            <option value="tetap">Tetap</option> 
          </select> 
        </div> 
 
        <div> 
          <label htmlFor="tanggungan" className="block text-sm font-medium text-gray-700 mb-1"> 
            Jumlah Tanggungan 
          </label> 
          <input 
            id="tanggungan" 
            name="tanggungan" 
            type="number" 
            value={form.tanggungan} 
            onChange={handleChange} 
            placeholder="Contoh: 3" 
            className="w-full p-2 border rounded" 
          /> 
        </div> 
 
        <div> 
          <label htmlFor="ump" className="block text-sm 
font-medium text-gray-700 mb-1"> 
              UMP Domisili 
          </label> 
          <select 
            id="ump" 
            name="ump" 
            value={form.ump} 
            onChange={handleChange} 
            className="w-full p-2 border rounded" 
          > 
            <option value={0}>Pilih UMP Domisili</option> 
            <option value={2500000}>Kurang dari 2,5 juta</option> 
            <option value={4000000}>Antara 2,5 juta - 4 juta</option> 
            <option value={5000000}>Lebih dari 4 juta</option> 
          </select> 
        </div> 
 
        <div> 
          <label htmlFor="alamat" className="block text-sm font-medium text-gray-700 mb-1"> 
            Alamat 
          </label> 
          <input 
            id="alamat" 
            name="alamat" 
            value={form.alamat} 
            onChange={handleChange} 
            placeholder="Masukkan Alamat" 
            className="w-full p-2 border rounded" 
          /> 
        </div> 
 
        <div className="flex gap-4"> 
          <button 
            type="button" 
            onClick={handleReset} 
            className="px-4 py-2 bg-gray-300 rounded 
            hover:bg-gray-400"> 
          Reset 
          </button> 
          <button 
            type="submit" 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" > 
          Cek Status 
          </button> 
        </div> 
</form> 
</main> 
); 
}