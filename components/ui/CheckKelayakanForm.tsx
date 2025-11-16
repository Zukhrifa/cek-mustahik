import React, { useState } from 'react';

// Definisikan tipe data untuk state formulir
interface MustahikFormData {
  nama: string;
  penghasilan: number | string; // Biarkan string saat input, konversi nanti
  statusPekerjaan: string;
  tanggungan: number | string;
  umpDomisili: string;
  alamat: string;
}

const CheckKelayakanForm: React.FC = () => {
  const [formData, setFormData] = useState<MustahikFormData>({
    nama: '',
    penghasilan: '',
    statusPekerjaan: 'Tetap', // Nilai default
    tanggungan: '',
    umpDomisili: '', // Akan diisi dari opsi
    alamat: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Data Formulir Dikirim:", formData);
    // TODO: Tambahkan logika untuk mengirim data ke API/backend (fetch/axios)
    alert("Cek Status telah diklik. Lihat di konsol!");
  };

  const handleReset = () => {
    setFormData({
      nama: '',
      penghasilan: '',
      statusPekerjaan: 'Tetap',
      tanggungan: '',
      umpDomisili: '',
      alamat: '',
    });
  };

  // Opsi UMP Domisili sederhana (Anda bisa mengembangkannya)
  const umpOptions = [
    { value: '', label: 'Pilih UMP Domisili' },
    { value: 'DKI', label: 'DKI Jakarta (Rp 5.067.381)' },
    { value: 'DIY', label: 'DIY Yogyakarta (Rp 2.492.992)' },
    { value: 'JABAR', label: 'Jawa Barat (Rp 2.784.800)' },
  ];

  return (
    <div className="container" style={{ maxWidth: '800px', margin: '20px auto', border: '1px solid #ccc', padding: '20px' }}>
      <h3 style={{ borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '20px' }}>Cek Kelayakan Mustahik</h3>

      <div style={{ padding: '0 20px', fontSize: '0.9em', color: '#666', marginBottom: '30px' }}>
        Informasi yang Anda masukkan ke dalam aplikasi zakat akan diakses
        kedalam aplikasi zakat untuk tujuan memproses penilaian kelayakan.
      </div>

      <form onSubmit={handleSubmit} style={{ padding: '0 20px' }}>

        {/* Nama */}
        <label htmlFor="nama">Nama</label>
        <input
          id="nama"
          name="nama"
          type="text"
          placeholder="Masukkan Nama"
          value={formData.nama}
          onChange={handleChange}
          style={inputStyle}
        />

        {/* Penghasilan */}
        <label htmlFor="penghasilan">Penghasilan per Bulan (Rp)</label>
        <input
          id="penghasilan"
          name="penghasilan"
          type="number"
          placeholder="Contoh: 1000000"
          value={formData.penghasilan}
          onChange={handleChange}
          style={inputStyle}
        />

        {/* Status Pekerjaan */}
        <label htmlFor="statusPekerjaan">Status Pekerjaan</label>
        <select
          id="statusPekerjaan"
          name="statusPekerjaan"
          value={formData.statusPekerjaan}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="Tetap">Tetap</option>
          <option value="Tidak Tetap">Tidak Tetap</option>
        </select>

        {/* Tanggungan */}
        <label htmlFor="tanggungan">Tanggungan</label>
        <input
          id="tanggungan"
          name="tanggungan"
          type="number"
          placeholder="Contoh : 3"
          value={formData.tanggungan}
          onChange={handleChange}
          style={inputStyle}
        />

        {/* UMP Domisili */}
        <label htmlFor="umpDomisili">UMP Domisili</label>
        <select
          id="umpDomisili"
          name="umpDomisili"
          value={formData.umpDomisili}
          onChange={handleChange}
          style={inputStyle}
        >
          {umpOptions.map(opt => (
            <option key={opt.value} value={opt.value} disabled={opt.value === ''}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Alamat */}
        <label htmlFor="alamat">Alamat</label>
        <input
          id="alamat"
          name="alamat"
          type="text"
          placeholder="Masukkan Alamat"
          value={formData.alamat}
          onChange={handleChange}
          style={inputStyle}
        />

        {/* Tombol Aksi */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
          <button type="button" onClick={handleReset} style={resetButtonStyle}>
            Reset
          </button>
          <button type="submit" style={submitButtonStyle}>
            Cek Status
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckKelayakanForm;

// Styling Dasar (Anda bisa mengganti ini dengan Tailwind/CSS Modul)
const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px',
  margin: '8px 0 20px 0',
  display: 'inline-block',
  border: '1px solid #ccc',
  boxSizing: 'border-box',
  borderRadius: '4px',
};

const submitButtonStyle: React.CSSProperties = {
  backgroundColor: '#343a40',
  color: 'white',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '1em',
};

const resetButtonStyle: React.CSSProperties = {
  backgroundColor: '#f8f9fa',
  color: '#343a40',
  padding: '10px 20px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '1em',
};