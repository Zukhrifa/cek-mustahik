"use client";

import React, { useState } from "react";

export default function Page() {
  const [page, setPage] = useState<"perseorangan" | "massal" | "profil">("perseorangan");
  const [namaList, setNamaList] = useState<string[]>([]);
  const [profil, setProfil] = useState({ nama: "", sandi: "" });

  const handlePerson = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nama = (e.currentTarget.elements.namedItem("nama") as HTMLInputElement).value.trim();
    if (!nama) return alert("Nama wajib diisi");

    setNamaList((prev) => [...prev, nama]);
    e.currentTarget.reset();
  };

  const handleProfil = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const nama = (form.elements.namedItem("pfNama") as HTMLInputElement).value.trim();
    const sandi = (form.elements.namedItem("pfSandi") as HTMLInputElement).value.trim();
    setProfil({ nama, sandi });
  };

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">Aplikasi Penentu Kandidat Mustahik</div>

        <nav className="nav">
          <button className={page === "perseorangan" ? "active" : ""} onClick={() => setPage("perseorangan")}>
            Cek Data Perseorangan
          </button>

          <button className={page === "massal" ? "active" : ""} onClick={() => setPage("massal")}>
            Cek Kelayakan Data Banyak
          </button>

          <button className={page === "profil" ? "active" : ""} onClick={() => setPage("profil")}>
            Profil
          </button>
        </nav>
      </aside>

      <main className="main">
        <h2>
          {page === "perseorangan"
            ? "Isi Data Perseorangan"
            : page === "massal"
            ? "Upload Data Banyak"
            : "Profil"}
        </h2>

        {/* PERSEORANGAN */}
        {page === "perseorangan" && (
          <section className="card">
            <form onSubmit={handlePerson}>
              <div className="field">
                <label>Nama Lengkap</label>
                <input type="text" name="nama" required placeholder="Masukkan nama" />
              </div>

              <button type="submit" className="btn primary">Cek Status</button>
            </form>

            <div className="empty">
              {namaList.length === 0
                ? "Belum ada data tersimpan."
                : namaList.map((n, i) => <div key={i}>{n}</div>)}
            </div>
          </section>
        )}

        {/* MASSAL */}
        {page === "massal" && (
          <section className="card">
            <h3>Upload Data Banyak (CSV)</h3>
            <input type="file" accept=".csv" />
            <button className="btn primary">Upload</button>
          </section>
        )}

        {/* PROFIL */}
        {page === "profil" && (
          <section className="card">
            <h3>Profil Pengguna</h3>

            <form onSubmit={handleProfil}>
              <div className="field">
                <label>Nama</label>
                <input type="text" name="pfNama" placeholder="Masukkan nama" />
              </div>

              <div className="field">
                <label>Kata Sandi Baru</label>
                <input type="password" name="pfSandi" placeholder="********" />
              </div>

              <button type="submit" className="btn primary">Simpan Profil</button>
            </form>

            <div className="empty">
              {profil.nama ? <b>{profil.nama}</b> : "Profil belum diisi."}
            </div>
          </section>
        )}
      </main>

      {/* CSS */}
      <style jsx>{`
        .app {
          display: grid;
          grid-template-columns: 240px 1fr;
          min-height: 100vh;
          background: #f8f8f8;
        }
        .sidebar {
          padding: 20px;
          border-right: 1px solid #ddd;
          background: #fff;
        }
        .brand {
          font-weight: bold;
          margin-bottom: 20px;
        }
        .nav button {
          display: block;
          width: 100%;
          text-align: left;
          padding: 10px;
          margin-bottom: 8px;
          border: none;
          background: transparent;
          cursor: pointer;
        }
        .nav button.active {
          background: black;
          color: white;
          border-radius: 6px;
        }
        .main {
          padding: 24px;
        }
        .card {
          background: white;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 10px;
        }
        .field {
          margin-bottom: 12px;
        }
        .btn.primary {
          background: black;
          color: white;
          padding: 10px 14px;
          border-radius: 6px;
          border: none;
          cursor: pointer;
        }
        .empty {
          margin-top: 16px;
          color: #777;
        }
      `}</style>
    </div>
  );
}
