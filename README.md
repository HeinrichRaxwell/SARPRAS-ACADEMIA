# Sistem Informasi Manajemen Sarana dan Prasarana (SARPRAS ACADEMIA)
**Mata Kuliah:** Pemrograman Web 2 (Client-Side Programming)  
**Topik:** Sistem Manajemen Sarana dan Prasarana (Asset Management)  
**Bobot Tugas:** Tugas Ke-1 (Project-Based Learning : Milestone 1 Pekan Ke-3)  
**Tema Desain:** True Ultra-Luxury Glassmorphism (Deep Obsidian Void, Chromatic Ambient Refraction, Specular Beveled Edges)

---

## Ringkasan Milestone 1 (Pekan Ke-3)

Dokumentasi lengkap perancangan sistem, arsitektur menu, konsep ER-D Mermaid, alur pengguna, serta spesifikasi fisika desain Glassmorphism tersedia di:
- [`docs/perancangan.md`](docs/perancangan.md) atau [`PERANCANGAN.md`](PERANCANGAN.md)

### Tautan Desain Publik & Workspace:
1. **Figma High-Fidelity UI & Design System (6 Layar Lengkap & Tokens):**  
   [Buka Figma Design File](https://www.figma.com/design/2AFWN3pMNSClSdg1beB2za)
2. **FigJam Board (ER-D Relasional & User Flow Mermaid):**  
   [Buka FigJam Board Diagram](https://www.figma.com/board/KZoXT7K9wnRKsp91X45Gpu)
3. **Google Stitch Project:**  
   Project ID: `projects/3279874328774814817` (*SARPRAS - Sistem Manajemen Sarana dan Prasarana*)

---

## 5 Layar Utama Terancang (Google Stitch & Figma High-Fidelity)

1. **Layar 1: Gerbang Autentikasi Admin (`index.html`)**  
   *Kartu kaca buram 480px melayang di atas pendaran aurora sian & violet, kredensial NIP & password, tombol SSO Kemendikbudristek.*  
   Berkas: `assets/img/stitch_login.png`

2. **Layar 2: Executive Dashboard (`pages/dashboard.html`)**  
   *4 kartu KPI utama, panel grafik distribusi kategori sarpras, pemantauan utilisasi gedung, dan feed jadwal servis terdekat.*  
   Berkas: `assets/img/stitch_dashboard.png`

3. **Layar 3: Master Data Sarana dan Prasarana (`pages/data-master.html`)**  
   *Toolbar filter multi-kriteria, tabel inventaris interaktif dengan status pendar bercahaya, dan modal konfirmasi penghapusan BMN.*  
   Berkas: `assets/img/stitch_datamaster.png`

4. **Layar 4: Form Registrasi Aset Baru (`pages/form.html`)**  
   *Grid 2-kolom kaca buram, radio cards kondisi fisik, dropzone berkas BAST, dan live QR/Barcode tag stiker fisik siap cetak.*  
   Berkas: `assets/img/stitch_form.png`

5. **Layar 5: Pusat Laporan & Kartu Inventaris Ruangan / KIR (`pages/laporan.html`)**  
   *Lembar cetak Kartu Inventaris Ruangan (KIR) standar audit kementerian, blok tanda tangan digital ganda dengan segel QR kriptografis.*  
   Berkas: `assets/img/stitch_laporan.png`

---

## Struktur Folder Repositori

```
├── docs/
│   └── perancangan.md          <-- Dokumen Resmi Perancangan Milestone 1
├── assets/
│   ├── css/                    <-- Disiapkan untuk Glassmorphism Engine (Milestone 2)
│   ├── js/                     <-- Disiapkan untuk State & DOM Interactivity (Milestone 3)
│   └── img/                    <-- Tangkapan Layar Wireframing Resolusi Tinggi
│       ├── stitch_login.png
│       ├── stitch_dashboard.png
│       ├── stitch_datamaster.png
│       ├── stitch_form.png
│       └── stitch_laporan.png
├── pages/                      <-- Disiapkan untuk Halaman Spesifik (Milestone 3)
│   ├── dashboard.html
│   ├── data-master.html
│   ├── form.html
│   └── laporan.html
├── layout.html                 <-- Master Template Dasar (Milestone 2)
├── index.html                  <-- Halaman Utama / Login Admin
├── PERANCANGAN.md              <-- Salinan Dokumen Root
└── README.md                   <-- Berkas Ini
```
