# Sistem Informasi Manajemen Sarana dan Prasarana (SARPRAS ACADEMIA)
**Mata Kuliah:** Pemrograman Web 2 (Client-Side Programming)  
**Topik:** Sistem Manajemen Sarana dan Prasarana (Asset Management)  
**Bobot Tugas:** Tugas Ke-1 (Project-Based Learning : Milestone 1 Pekan Ke-3)  
**Tema Desain:** Titanium Monolith & Smoked Optical Glass (Anti-AI-Slop Industrial Workstation)

---

## Ringkasan Milestone 1 (Pekan Ke-3)

Dokumentasi lengkap perancangan sistem, arsitektur 8 modul, konsep ER-D Mermaid 3NF, alur pengguna, serta spesifikasi fisika desain Titanium Monolith tersedia di:
- [`docs/perancangan.md`](docs/perancangan.md) atau [`PERANCANGAN.md`](PERANCANGAN.md)

### Tautan Desain Publik & Workspace:
1. **Figma High-Fidelity UI & Design System (9 Frames Lengkap & Tokens):**  
   [Buka Figma Design File](https://www.figma.com/design/2AFWN3pMNSClSdg1beB2za)
2. **FigJam Board (ER-D Relasional 3NF & User Flow Mermaid):**  
   [Buka FigJam Board Diagram](https://www.figma.com/board/KZoXT7K9wnRKsp91X45Gpu)
3. **Google Stitch Project:**  
   Project ID: `projects/3279874328774814817` (*Titanium Monolith System*)

---

## 8 Layar Utama Terancang (Google Stitch & Figma High-Fidelity)

1. **Layar 1: Gerbang Autentikasi Admin (`index.html`)**  
   *Kartu smoked glass 460px melayang pada kanvas carbon void, kredensial NIP & password, tombol login solid white, dan SSO Kemendikbudristek.*  
   Berkas: `assets/img/stitch_login.png`

2. **Layar 2: Executive Command Dashboard (`pages/dashboard.html`)**  
   *Asymmetric Command Bento Grid dengan valuasi BMN Rp 4.85 Miliar, integritas 86.4%, tiket servis 142 unit, alokasi kluster fasilitas, dan data grid kalibrasi lab.*  
   Berkas: `assets/img/stitch_dashboard.png`

3. **Layar 3: Master Data Sarana dan Prasarana (`pages/data-master.html`)**  
   *Toolbar filter multi-kriteria, tabel inventaris berdensitas tinggi dengan kode monospace JetBrains Mono, dan modal konfirmasi penghapusan BMN.*  
   Berkas: `assets/img/stitch_datamaster.png`

4. **Layar 4: Form Registrasi Aset Baru (`pages/form.html`)**  
   *Tata letak teknis 2-kolom, dropzone berkas BAST, dan live preview stiker barcode/QR thermal tag 75x50mm siap cetak.*  
   Berkas: `assets/img/stitch_form.png`

5. **Layar 5: Pusat Laporan & Kartu Inventaris Ruangan / KIR (`pages/laporan.html`)**  
   *Lembar cetak Kartu Inventaris Ruangan (KIR) standar audit kementerian, blok tanda tangan digital ganda dengan segel QR kriptografis.*  
   Berkas: `assets/img/stitch_laporan.png`

6. **Layar 6: Pusat Peminjaman & Mutasi Fasilitas (`pages/peminjaman.html`)**  
   *Monitoring sirkulasi barang bergerak, izin pemakaian aula, pelacakan tanggal jatuh tempo pengembalian, dan verifikasi mutasi fisik.*  
   Berkas: `assets/img/stitch_peminjaman.png`

7. **Layar 7: Manajemen Servis & Kalibrasi Alat (`pages/maintenance.html`)**  
   *Manajemen tiket Work Orders (WO), pelacakan kalibrasi akreditasi ISO 17025, alokasi anggaran DIPA pemeliharaan, serta penugasan vendor rekanan.*  
   Berkas: `assets/img/stitch_maintenance.png`

8. **Layar 8: Direktori Fasilitas Gedung & Alokasi Ruangan (`pages/ruangan.html`)**  
   *Pemetaan gedung kampus, matriks kartu ruangan modular dengan luas dan kapasitas, serta aksi cepat penerbitan dokumen KIR per ruangan.*  
   Berkas: `assets/img/stitch_ruangan.png`

---

## Struktur Folder Repositori

```
├── docs/
│   └── perancangan.md          <-- Dokumen Resmi Perancangan Milestone 1
├── assets/
│   ├── css/                    <-- Disiapkan untuk Titanium Glass Engine (Milestone 2)
│   ├── js/                     <-- Disiapkan untuk State & DOM Interactivity (Milestone 3)
│   └── img/                    <-- Tangkapan Layar Wireframing Resolusi Tinggi
│       ├── stitch_login.png
│       ├── stitch_dashboard.png
│       ├── stitch_datamaster.png
│       ├── stitch_form.png
│       ├── stitch_laporan.png
│       ├── stitch_peminjaman.png
│       ├── stitch_maintenance.png
│       └── stitch_ruangan.png
├── pages/                      <-- Disiapkan untuk Halaman Spesifik (Milestone 3)
│   ├── dashboard.html
│   ├── data-master.html
│   ├── form.html
│   ├── laporan.html
│   ├── peminjaman.html
│   ├── maintenance.html
│   └── ruangan.html
├── layout.html                 <-- Master Template Dasar (Milestone 2)
├── index.html                  <-- Halaman Utama / Login Admin Gatekeeper
├── PERANCANGAN.md              <-- Salinan Dokumen Root
└── README.md                   <-- Berkas Ini
```
