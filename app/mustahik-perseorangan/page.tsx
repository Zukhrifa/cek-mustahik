import CheckKelayakanForm from '../../components/ui/CheckKelayakanForm';

export default function MustahikPerseoranganPage() {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      <header style={{ backgroundColor: '#f0f0f0', padding: '20px', textAlign: 'center' }}>
        <h1>Aplikasi Penentu Kandidat Mustahik</h1>
      </header>
      
      <main style={{ padding: '20px' }}>
        {/* Komponen Formulir Anda Diimpor dan Ditampilkan di sini */}
        <CheckKelayakanForm /> 
      </main>

      <footer style={{ backgroundColor: '#343a40', color: 'white', padding: '10px', textAlign: 'center', marginTop: '30px' }}>
        Copyright © 2025 - Aplikasi penentu kandidat mustahik
      </footer>
    </div>
  );
}