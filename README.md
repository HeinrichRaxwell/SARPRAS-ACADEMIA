<div align="center">

<img src="assets/img/logo_unpam.png" alt="Logo Universitas Pamulang" width="140" style="margin-bottom: 12px;"/>

# SISTEM INFORMASI MANAJEMEN SARANA DAN PRASARANA
### (SARPRAS ACADEMIA : INSTITUTIONAL ASSET MANAGEMENT PLATFORM)

**Tugas Mandiri Ke-1 (Project-Based Learning) : Milestone 1 (Pekan Ke-3)**  
**Mata Kuliah:** Pemrograman Web 2 (Client-Side Programming)  
**Program Studi:** Teknik Informatika  
**Fakultas:** Ilmu Komputer  
**Perguruan Tinggi:** Universitas Pamulang (UNPAM)  

---

### Dosen Pengampu:
**FAJAR AGUNG NUGROHO S.Kom, M.Kom**

---

[![Figma Design](https://img.shields.io/badge/Figma-Design%20System%20%26%20High--Fi%20UI-F24E1E?style=for-the-badge&logo=figma&logoColor=white)](https://www.figma.com/design/2AFWN3pMNSClSdg1beB2za/SARPRAS---Admin-Panel-Design-System---High-Fi-UI?node-id=0-1&t=bAFoQfAKXEWJhC6k-1)
[![Google Stitch](https://img.shields.io/badge/Google%20Stitch-UI%20Wireframing%20Project-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://stitch.withgoogle.com/projects/3279874328774814817)
[![FigJam Diagram](https://img.shields.io/badge/FigJam-ER--D%20%26%20User%20Flow-8A2BE2?style=for-the-badge&logo=figma&logoColor=white)](https://www.figma.com/board/KZoXT7K9wnRKsp91X45Gpu)
[![UI Theme](https://img.shields.io/badge/UI%20Theme-Modern%20Glassmorphism-059669?style=for-the-badge)](https://github.com/HeinrichRaxwell/Sistem-Manajemen-Sarana-dan-Prasarana-Asset-Management-)

</div>

---

## DAFTAR ISI

1. [Identitas Tugas dan Akademik](#1-identitas-tugas-dan-akademik)
2. [Deskripsi Proyek](#2-deskripsi-proyek)
3. [Tautan Publik Rancangan Sistem (Milestone 1)](#3-tautan-publik-rancangan-sistem-milestone-1)
4. [Ketentuan Tema Visual : Arsitektur Glassmorphism](#4-ketentuan-tema-visual--arsitektur-glassmorphism)
5. [Cakupan Modul Antarmuka (8 Modul Lengkap)](#5-cakupan-modul-antarmuka-8-modul-lengkap)
6. [Arsitektur Informasi dan Hirarki Menu](#6-arsitektur-informasi-dan-hirarki-menu)
7. [Pemodelan Data Relasional (ER-D Mermaid.js)](#7-pemodelan-data-relasional-er-d-mermaidjs)
8. [Diagram Alur Pengguna (User Flow)](#8-diagram-alur-pengguna-user-flow)
9. [Design System Awal dan Token Visual (Figma)](#9-design-system-awal-dan-token-visual-figma)
10. [Struktur Direktori Proyek](#10-struktur-direktori-proyek)
11. [Panduan Menjalankan Aplikasi Secara Lokal](#11-panduan-menjalankan-aplikasi-secara-lokal)
12. [Tahapan Pelaksanaan Proyek (Roadmap Milestone)](#12-tahapan-pelaksanaan-proyek-roadmap-milestone)

---

## 1. IDENTITAS TUGAS DAN AKADEMIK

Dokumentasi ini disusun sebagai laporan resmi pemenuhan tugas perkuliahan berbasis proyek (Project-Based Learning) untuk mata kuliah **Pemrograman Web 2 (Client-Side Programming)** pada Program Studi Teknik Informatika, Fakultas Ilmu Komputer, Universitas Pamulang.

* **Nama Sistem:** Sistem Informasi Manajemen Sarana dan Prasarana (SARPRAS ACADEMIA)
* **Topik Sistem:** Sistem Manajemen Sarana dan Prasarana (Asset Management)
* **Target Utama:** Merancang dan mengimplementasikan antarmuka (User Interface) Halaman Admin Panel yang responsif, interaktif, dan informatif menggunakan teknologi Client-Side (HTML5, CSS3, JavaScript ES6+).
* **Dosen Pengampu:** FAJAR AGUNG NUGROHO S.Kom, M.Kom
* **Fokus Milestone 1 (Pekan Ke-3):** 
  1. Perencanaan Menu dan Informasi Tekstual (`docs/perancangan.md` dan `PERANCANGAN.md`)
  2. Konsep pemodelan data relasional sederhana (ER-D 3NF) menggunakan sintaks Mermaid.js
  3. UI Wireframing dan eksplorasi tata letak komponen di Google Stitch
  4. Penyusunan Design System awal (Color Palettes, Typography Styles, Reusable Components) di Figma
  5. Perancangan High-Fidelity UI untuk seluruh modul utama di Figma

---

## 2. DESKRIPSI PROYEK

**SARPRAS ACADEMIA** adalah platform Back-Office Admin Panel institusional yang dirancang khusus untuk memenuhi standar tata kelola sarana dan prasarana perguruan tinggi serta instansi pendidikan negeri/swasta. Sistem ini mengintegrasikan pengawasan seluruh siklus hidup aset, mulai dari:

1. **Penerimaan dan Registrasi Barang Milik Negara (BMN):** Penatausahaan nomor registrasi NUP, spesifikasi teknis, kapitalisasi perolehan dana, dan pencetakan stiker barcode termal 75x50mm.
2. **Sirkulasi Peminjaman dan Pemakaian Fasilitas:** Pengawasan peminjaman alat bergerak (drone, proyektor, peralatan lab) dan izin penggunaan aula atau smart classroom dengan notifikasi jatuh tempo.
3. **Pemeliharaan dan Kalibrasi Alat Presisi:** Manajemen tiket Work Orders (WO) servis alat dan kalibrasi rutin sesuai standar akreditasi laboratorium ISO/IEC 17025.
4. **Penerbitan Dokumen Resmi Kartu Inventaris Ruangan (KIR):** Pembuatan dokumen fisik berstandar kementerian untuk ditempel pada pintu laboratorium, lengkap dengan blok pengesahan tanda tangan digital ganda terverifikasi QR SHA-256.

Sistem berjalan murni pada arsitektur **Client-Side Programming** dengan pemanfaatan media penyimpanan modern browser (`localStorage`), sehingga tidak memerlukan ketergantungan server backend yang kompleks untuk keperluan simulasi dan demonstrasi akademis.

---

## 3. TAUTAN PUBLIK RANCANGAN SISTEM (MILESTONE 1)

Seluruh rancangan antarmuka dan diagram arsitektur telah dipublikasikan dan dapat diakses langsung oleh dosen pengampu melalui tautan resmi di bawah ini:

| Media / Platform | Deskripsi Artefak | Tautan Akses Publik Langsung |
|---|---|---|
| **Figma High-Fidelity UI & Design System** | Berkas Desain 9 Frames Lengkap (Tokens, Dashboard, Data Master, Form, KIR, Peminjaman, Servis, Ruangan, Login) | [Buka Proyek Figma SARPRAS UI Kit](https://www.figma.com/design/2AFWN3pMNSClSdg1beB2za/SARPRAS---Admin-Panel-Design-System---High-Fi-UI?node-id=0-1&t=bAFoQfAKXEWJhC6k-1) |
| **Google Stitch UI Workspace** | Proyek UI Wireframing dan Screen Generation 8 Modul Lengkap | [Buka Proyek Google Stitch Workspace](https://stitch.withgoogle.com/projects/3279874328774814817) |
| **FigJam Diagram Board** | Diagram Relasional Data (ER-D 3NF) dan Diagram Alur Pengguna (User Flow) | [Buka FigJam Board Diagram](https://www.figma.com/board/KZoXT7K9wnRKsp91X45Gpu) |
| **Dokumentasi Lengkap (.md)** | Spesifikasi Rinci Arsitektur dan Dokumen Perancangan Milestone 1 | Tersedia pada `docs/perancangan.md` dan `PERANCANGAN.md` |

---

## 4. KETENTUAN TEMA VISUAL : ARSITEKTUR GLASSMORPHISM

Sesuai instruksi tugas untuk menerapkan salah satu ketentuan estetika arsitektur UI (*Material Design, Glassmorphism, Skeuomorphism, Neumorphism*), sistem ini memilih dan menerapkan **Glassmorphism (Modern Institutional Glassmorphism)**.

### Karakteristik Fisika Optik yang Diterapkan:
* **Kanvas Carbon Void (`#08090A`):** Latar belakang hitam karbon absolut yang memberikan kontras maksimal serta kenyamanan membaca bagi staf administrasi dan auditor.
* **Permukaan Kaca Buram (Frosted Glass Substrate):** Panel kartu menggunakan warna `#0D0F12` dengan transparansi optik dan efek `backdrop-filter: blur(20px) saturate(180%)`.
* **Refleksi Garis Batas (Specular Border Highlight):** Garis batas 1px `rgba(255, 255, 255, 0.08)` dengan bias kilau specular atas `rgba(255, 255, 255, 0.16)` yang memberikan kesan kedalaman fisik nyata.
* **Solid White Contrast Action:** Tombol tindakan utama menggunakan warna Solid White `#FFFFFF` dengan teks gelap `#08090A` untuk hierarki interaksi yang tegas.
* **Subdued Condition Signals:** Sinyal status kondisi menggunakan palet warna terkalibrasi: Emerald `#059669` (Baik), Amber `#D97706` (Perawatan), dan Crimson `#DC2626` (Rusak Berat).

---

## 5. CAKUPAN MODUL ANTARMUKA (8 MODUL LENGKAP)

Seluruh 8 modul operasional telah dirancang lengkap dalam format High-Fidelity di Google Stitch dan Figma:

| No | Modul Antarmuka | Berkas Halaman | Rincian Fitur Utama |
|---|---|---|---|
| 1 | **Gerbang Autentikasi** | `index.html` | Form login kredensial NIP, proteksi kata sandi, dan integrasi SSO Kemendikbudristek |
| 2 | **Executive Dashboard** | `pages/dashboard.html` | Asymmetric Bento Grid, valuasi Rp 4.85 Miliar, integritas 86.4%, dan jadwal kalibrasi lab |
| 3 | **Master Data Sarpras** | `pages/data-master.html` | Data grid inventaris berdensitas tinggi, filter multi-kategori, dan modal konfirmasi hapus BMN |
| 4 | **Form Registrasi Aset** | `pages/form.html` | Form 2-kolom spesifikasi teknis, kalkulasi nilai buku, dan live barcode termal stiker 75x50mm |
| 5 | **Pusat Laporan & KIR** | `pages/laporan.html` | Lembar resmi Kartu Inventaris Ruangan standar kementerian dengan tanda tangan digital ganda |
| 6 | **Pusat Peminjaman** | `pages/peminjaman.html` | Sirkulasi barang bergerak, izin aula, pelacakan tanggal jatuh tempo, dan deteksi keterlambatan |
| 7 | **Servis & Kalibrasi** | `pages/maintenance.html` | Manajemen tiket Work Orders (WO), kalibrasi ISO/IEC 17025, dan monitoring vendor rekanan |
| 8 | **Direktori Ruangan** | `pages/ruangan.html` | Profil 6 ruangan kampus, kapasitas mahasiswa, penanggung jawab, dan akses cepat dokumen KIR |

### Galeri Tangkapan Layar Rancangan (Stitch & Figma High-Resolution)

<div align="center">

#### 1. Gerbang Autentikasi Admin (`index.html`)
<img src="https://lh3.googleusercontent.com/aida/AEtjO1UTSf0LEMhUP7Z-SDUBEaMz99lE1xvToApud3qPl6aHxjmt3r_ogDWFcsxLLwTSdNlc5oXnj6hZ67bbXOGl0AzpGaoHWXzx7ZvArSS1HJauuF4JX6xlz-umYDcPEC0mW_lY3aNrIsC-4SOyss5BjognUZ7iyiyjxveSFcH9VsgNytHQwAgX5oADMdmyrcxnczzTkGQfTsVEuo-UAbB3K4krQI1MNQU9PkCS00AuyXDCSb2jdrFLnda8SfM" width="85%" alt="Login Portal"/>

#### 2. Executive Command Dashboard (`pages/dashboard.html`)
<img src="https://lh3.googleusercontent.com/aida/AEtjO1Upmvm2ci8x-BXeAXI7P56ruluhWN3bBgp6Ka3YJeYZlQMAFGhXBMPiIG_v4hQS1nmKLPVPk36NdyXbYshJ8-quNefToOJ5xoKygIoKTe0ZFmp6Yg8qluRzD3e7Mdu_uJdXWWQkLsn3HQQ7spzrVwMwwYaUBKYrPr-lkgHo-PrVGAv65UylUN_oa-PbsZlUCU9j4dKI4HPqOcBdn6fRFUfjIJG9lwB90M5m1SMD8pzsabOAwOzq4z-5XfM" width="85%" alt="Dashboard"/>

#### 3. Master Data Sarana dan Prasarana (`pages/data-master.html`)
<img src="https://lh3.googleusercontent.com/aida/AEtjO1WrQ4NRP1mTVCwin8ixnDgopfFfr2II4jeBrrZrncRMs69kj2ZmyAg-kzWSm60LxRDvU9gFn2T9Td-btd7zTqthBhpHMcpIOWqAftJWVUBbxRK1CESbC0b9qTrg1cip_iO7gqnzRLeQtl3MvUPgKm8HlNxUkUOWp8Q7Abc4zz1ktHZ7ek94Tyo_b6uXOVsPny3vIDXF1EbHmUfPm_P5ggxy4cjCbCo0NYZr6OGmkO7IRtuIp9E7dpEXuQ" width="85%" alt="Master Data"/>

#### 4. Form Registrasi Aset Baru (`pages/form.html`)
<img src="https://lh3.googleusercontent.com/aida/AEtjO1V0klYHF75-C_MoBCpNHKPyjXSjiSZ6FP824UYygZdgGxuaxMYdDZlQCPDvdtH9V6xSS--X2sxdl5BcUx__qtzBjggfl2eyVoOWjg4CVYiRRXZvqM8sjGBXz4AGeHBoOveNW0YOcYhCxlFH4-8mQ2QLKS2eMB6sJXCn_kHyhwGjzGV3xe5P6rSaUoagaBz7-dXhpNB-fM_s9616pjkbi2u1ChZbAOe6yLpLjPHABEEEQnH421akRyzb3A" width="85%" alt="Form Registrasi"/>

#### 5. Pusat Laporan & Kartu Inventaris Ruangan / KIR (`pages/laporan.html`)
<img src="https://lh3.googleusercontent.com/aida/AEtjO1UHZ1EUoAQg00hR0h3S7q_2DgwTkXmS-FYIvXLYOwf8qs2aWWH_aG41mQy-5cp93yfbZIY6s5mi2INRiNrk-bWe-0KQ5gWa9S48V48h8IJg7WSTC84-ow7FER2ahVDfP4icIwZLjf_kpfrQ0LYy9Km_Ef2CRU4fr_EqjM7_mu1JAhNX7fKoAgTNPyrAdeMvUR7QmXjTDfiYGoOIVrO1eMcP_OhjfaQib1vPA3xIfdowvuHLd-Ynt-ugw_0" width="85%" alt="Pusat Laporan KIR"/>

#### 6. Pusat Peminjaman & Mutasi Fasilitas (`pages/peminjaman.html`)
<img src="https://lh3.googleusercontent.com/aida/AEtjO1X4lhXLKz0mEKMt_uW9dJC2KwJjm41P00ZdEtT39zWgWe6N249mAk_6Bp_uha3N-LL1BCBOlroY7KErJBBASkxE3GGimu1C3tlMBcoQS8pcwoYN-Ket_yo4rGIeLQniB7HaaefMQGstEBf4Tzodvko6PbCKHD61jHuBYXIfWnrlfBpITFoDkVFHiTD5DXcEZX_TFUJgRGFVDCYu0kMpUZ7FHM217E8ukMrx9_l6EDjajAVnFw0eiJVenA" width="85%" alt="Peminjaman Fasilitas"/>

#### 7. Manajemen Servis & Kalibrasi Alat (`pages/maintenance.html`)
<img src="https://lh3.googleusercontent.com/aida/AEtjO1VnAZj6NLMwsMh04K2e7A7tZbnBQVux4fwzOlW85GAHWHaYyHk9chkF4p432qY28f2HynRH3S0SpBQ0on_F3gm3XkWlfdrM-g_tz7adKDSAZ9WMbmCizfUVWJPu1Ve39ZLbNxdb9VjHsG3sIjZXMzecaUbij65XdsaguqivkqdTeuE4B-MeodF_OIm50Y5V07kGGsQjoZfo949c3B1wgdP_nJUYiubu_YTTUqo1rcGUGwoM9vaqFRh6iA" width="85%" alt="Servis dan Kalibrasi"/>

#### 8. Direktori Fasilitas Gedung & Ruangan (`pages/ruangan.html`)
<img src="https://lh3.googleusercontent.com/aida/AEtjO1XwEb-uc_Chq-J8ZZ-6_9eLzBmMsI0kzw67Aw-F0w01FBkemcwc7lhbO06hJDFsaqoO1Ayu6cSIDoQ7MsQxiKxofFQc3fHQtaK235C099C3-7st7oRaDssbDUCYEorM5jwduUiGaO7ShpRaXfTXGmPtCbzfORxKv9m8TS4vFGatJrTOpwiLQzRUJNRaX-ZPdfw_NkSrH_VFclbd3QSbUCflMct9vWIcC5OJBiWW8meJQOCgps3-u29zzw" width="85%" alt="Direktori Ruangan"/>

</div>

---

## 6. ARSITEKTUR INFORMASI DAN HIRARKI MENU

Hierarki antarmuka terbagi menjadi dua bagian utama, yaitu rel navigasi vertikal (Sidebar Rail) dan bilah kendali horizontal (Top Command Bar):

```
[SARPRAS ACADEMIA - ADMIN PANEL]
├── 0. Gerbang Autentikasi (index.html)
├── 1. Executive Dashboard (pages/dashboard.html)
├── 2. Master Data Sarana dan Prasarana (pages/data-master.html)
├── 3. Form Registrasi Aset Baru (pages/form.html)
├── 4. Pusat Laporan & Kartu Inventaris Ruangan / KIR (pages/laporan.html)
├── 5. Pusat Peminjaman & Mutasi Fasilitas (pages/peminjaman.html)
├── 6. Manajemen Servis & Kalibrasi Alat (pages/maintenance.html)
└── 7. Direktori Fasilitas Gedung & Ruangan (pages/ruangan.html)
```

---

## 7. PEMODELAN DATA RELASIONAL (ER-D MERMAID.JS)

Perancangan entitas basis data dirancang dalam bentuk Third Normal Form (3NF) yang terdiri dari 8 tabel relasional yang saling terhubung:

```mermaid
erDiagram
    KATEGORI ||--o{ ASET : "mengelompokkan"
    LOKASI_RUANGAN ||--o{ ASET : "menempatkan"
    PENGGUNA ||--o{ MUTASI_ASET : "mengajukan"
    ASET ||--o{ MUTASI_ASET : "mengalami"
    ASET ||--o{ PEMELIHARAAN : "menjalani"
    TEKNISI ||--o{ PEMELIHARAAN : "menangani"
    PENGGUNA ||--o{ PEMINJAMAN_ASET : "meminjam"
    ASET ||--o{ PEMINJAMAN_ASET : "dipinjam"

    KATEGORI {
        string id_kategori PK "ID Kategori (e.g. KAT-001)"
        string nama_kategori "Peralatan Laboratorium, IT, dll"
        string kode_kategori "LAB, IKT, FCL, VEH"
        string deskripsi "Keterangan klasifikasi akun BMN"
    }

    LOKASI_RUANGAN {
        string id_ruangan PK "ID Ruangan (e.g. RNG-302)"
        string kode_ruangan "GRT-R302"
        string nama_ruangan "Lab Kimia Terpadu"
        string gedung "Gedung Riset Terpadu"
        string penanggung_jawab "Dr. Retno Lestari, M.Si"
        int kapasitas "40 Peneliti / Mahasiswa"
    }

    ASET {
        string id_aset PK "ID Internal Aset (UUID)"
        string kode_inventaris UK "Kode BMN (e.g. AST-LAB-2026-089)"
        string nama_barang "Spektrofotometer UV-Vis Shimadzu"
        string id_kategori FK "Relasi ke Kategori"
        string id_ruangan FK "Relasi ke Lokasi Ruangan"
        string merk_tipe "Shimadzu UV-2600i Research Grade"
        string no_seri "SN: 893-KM-2026-X901"
        int tahun_perolehan "2026"
        decimal harga_perolehan "285000000.00"
        string kondisi "Baik | Rusak Ringan | Rusak Berat"
        string status_ketersediaan "Operasional | Servis | Decommissioned"
        string sumber_dana "BOPTN / APBN / PNBP"
    }

    PENGGUNA {
        string id_user PK "User ID / NIP"
        string nama_lengkap "Dr. Ir. Hendra Wicaksono, M.T."
        string role "Super Admin | Operator | Auditor"
        string email "sarpras@institusi.ac.id"
        string unit_kerja "Biro Sarana dan Prasarana"
    }

    MUTASI_ASET {
        string id_mutasi PK "ID Mutasi (e.g. MUT-2026-001)"
        string id_aset FK "ID Aset yang dimutasi"
        string id_ruangan_asal "Lokasi Asal"
        string id_ruangan_tujuan "Lokasi Tujuan Baru"
        string id_user FK "Petugas Pemohon"
        date tanggal_mutasi "YYYY-MM-DD"
        string keterangan "Alasan penataan ulang laboratorium"
    }

    PEMELIHARAAN {
        string id_pemeliharaan PK "ID Servis (e.g. SVC-2026-014)"
        string id_aset FK "Aset yang diservis"
        string id_teknisi FK "Vendor / Teknisi"
        date tanggal_servis "YYYY-MM-DD"
        string jenis_pemeliharaan "Kalibrasi Rutin | Perbaikan Sensor"
        decimal biaya "4500000.00"
        string status_perbaikan "Terjadwal | Berjalan | Selesai"
        string catatan "Penggantian optical slit dan kalibrasi panjang gelombang"
    }

    PEMINJAMAN_ASET {
        string id_peminjaman PK "ID Peminjaman (e.g. BOR-2026-089)"
        string id_aset FK "ID Aset yang dipinjam"
        string id_user FK "Peminjam (Dosen/Mhs/Satker)"
        date tanggal_pinjam "YYYY-MM-DD"
        date batas_kembali "YYYY-MM-DD"
        date tanggal_kembali_aktual "YYYY-MM-DD"
        string keperluan "Penelitian Tesis / Seminar"
        string status_peminjaman "Aktif | Menunggu | Overdue | Kembali"
    }

    TEKNISI {
        string id_teknisi PK "ID Teknisi / Vendor"
        string nama_teknisi "PT Dynatech Instrument"
        string spesialisasi "Instrumen Spektrometri & Optik"
        string no_kontak "+62-21-5582-9900"
    }
```

---

## 8. DIAGRAM ALUR PENGGUNA (USER FLOW)

Alur penjelajahan operasional admin panel dari autentikasi hingga pengesahan laporan:

```mermaid
flowchart TD
    Start([Pengguna Mengakses Web]) --> Login[Gerbang Autentikasi index.html]
    Login --> AuthCheck{Kredensial Valid?}
    AuthCheck -- Tidak --> ErrorMsg[Pesan Kesalahan Validasi]
    ErrorMsg --> Login
    AuthCheck -- Ya --> Dashboard[Executive Dashboard pages/dashboard.html]
    
    Dashboard --> NavMaster[Akses Master Data Sarpras]
    Dashboard --> NavForm[Akses Form Registrasi Aset]
    Dashboard --> NavLaporan[Akses Pusat Laporan KIR]
    Dashboard --> NavPinjam[Akses Peminjaman & Mutasi]
    Dashboard --> NavServis[Akses Servis & Kalibrasi]
    Dashboard --> NavRuangan[Akses Direktori Ruangan]
    
    NavMaster --> TableAction{Aksi Tabel Data}
    TableAction -- Filter/Cari --> FilterResult[Penyaringan Data Instan]
    TableAction -- Hapus Aset --> ModalDelete[Modal Konfirmasi Decommissioning BMN]
    ModalDelete -- Hapus --> UpdateStorage[Pembaruan Data & Log Audit]
    
    NavForm --> InputForm[Pengisian Spesifikasi & Biaya]
    InputForm --> FormValidate{Validasi Input Lengkap?}
    FormValidate -- Belum --> ShowFieldErrors[Border Merah & Pesan Validasi]
    FormValidate -- Valid --> GenerateTag[Render Barcode Termal Stiker 75x50mm]
    GenerateTag --> SaveAsset[Simpan ke Mock Database]
    
    NavLaporan --> SelectRoom[Pilih Profil Ruangan]
    SelectRoom --> RenderKIR[Render Lembar KIR Resmi]
    RenderKIR --> ExportAction{Aksi Dokumen}
    ExportAction -- Cetak/PDF --> PrintPreview[Tampilan Cetak Mode Resmi]
```

---

## 9. DESIGN SYSTEM AWAL DAN TOKEN VISUAL (FIGMA)

Seluruh token visual terstandarisasi pada **Frame 00 di Figma** dan digunakan sebagai acuan baku slicing CSS di Milestone 2:

### Palet Warna Semantik (Color Palettes)
* `--color-canvas`: `#08090A` (Carbon Void, latar utama viewport)
* `--color-surface`: `#0D0F12` (Permukaan panel kartu kaca buram)
* `--color-text-primary`: `#EDEDED` (Chalk White, rasio kontras 15.8:1 AAA)
* `--color-text-secondary`: `#71717A` (Muted Zinc, rasio kontras 4.9:1 AA)
* `--color-primary-cta`: `#FFFFFF` (Solid White untuk tombol aksi utama)
* `--color-accent-cobalt`: `#2563EB` (Precision Cobalt untuk fokus form dan link NUP)
* `--color-signal-normal`: `#059669` (Subdued Emerald, kondisi prima)
* `--color-signal-warning`: `#D97706` (Subdued Amber, antrean servis)
* `--color-signal-critical`: `#DC2626` (Subdued Crimson, kondisi rusak berat)
* `--color-whisper-border`: `rgba(255, 255, 255, 0.08)` (Garis batas panel 1px)

### Tipografi
* **Font Antarmuka Umum:** `Inter`, `-apple-system`, `BlinkMacSystemFont`, `sans-serif`
* **Font Kode dan Numerik:** `JetBrains Mono`, `Consolas`, `monospace`

---

## 10. STRUKTUR DIREKTORI PROYEK

Struktur folder proyek ditata secara rapi sesuai format baku pengumpulan tugas Pemrograman Web 2:

```
Sistem-Manajemen-Sarana-dan-Prasarana-Asset-Management-/
├── docs/
│   └── perancangan.md                  <-- Dokumen Teknis Lengkap Milestone 1
├── PERANCANGAN.md                      <-- Salinan Dokumen Teknis pada Root
├── README.md                           <-- Laporan Resmi Proyek & Panduan Repositori
├── assets/
│   ├── css/                            <-- Lembar Gaya CSS (Slicing Milestone 2)
│   ├── js/                             <-- Logika Interaktivitas & Mock Data (Milestone 3)
│   └── img/                            <-- Aset Visual, Logo UNPAM, & 8 Screenshot Stitch
│       ├── logo_unpam.png
│       ├── stitch_login.png
│       ├── stitch_dashboard.png
│       ├── stitch_datamaster.png
│       ├── stitch_form.png
│       ├── stitch_laporan.png
│       ├── stitch_peminjaman.png
│       ├── stitch_maintenance.png
│       └── stitch_ruangan.png
└── pages/                              <-- Halaman Spesifik Sistem (Milestone 2 & 3)
```

---

## 11. PANDUAN MENJALANKAN APLIKASI SECARA LOKAL

Aplikasi ini dibangun menggunakan arsitektur web client-side murni (tanpa dependensi build tool berat atau server database), sehingga dapat dijalankan dengan sangat mudah di komputer lokal:

### 1. Kloning Repositori Git
```bash
git clone https://github.com/HeinrichRaxwell/Sistem-Manajemen-Sarana-dan-Prasarana-Asset-Management-.git
cd Sistem-Manajemen-Sarana-dan-Prasarana-Asset-Management-
```

### 2. Menjalankan dengan Local Web Server
Pilih salah satu metode berikut:

* **Menggunakan Python (Bawaan Windows/Mac/Linux):**
  ```bash
  python -m http.server 3000
  ```
  Lalu buka peramban di `http://localhost:3000`

* **Menggunakan Node.js (npx serve):**
  ```bash
  npx serve .
  ```

* **Menggunakan VS Code Live Server:**
  Cukup klik kanan pada berkas `index.html` lalu pilih **Open with Live Server**.

---

## 12. TAHAPAN PELAKSANAAN PROYEK (ROADMAP MILESTONE)

* [x] **Milestone 1 (Pekan Ke-3) : Perencanaan Menu, ER-D dan UI Wireframing**
  * Perencanaan arsitektur menu dan dokumen `PERANCANGAN.md`
  * Pemodelan relasi data Mermaid.js (8 Entitas 3NF)
  * UI Wireframing 8 modul lengkap di Google Stitch
  * Pembuatan Design System dan High-Fidelity UI di Figma (9 Frames)
  * Publikasi repositori GitHub dan verifikasi tautan publik
* [ ] **Milestone 2 (Pekan Ke-5) : Slicing dan Layouting Dasar (HTML5 & CSS3)**
  * Penerjemahan token visual Figma ke variabel CSS Glassmorphism
  * Pembuatan struktur dasar Master Template `layout.html` (Sidebar, Header, Content, Footer)
  * Pengujian responsivitas layout desktop, tablet, dan mobile
* [ ] **Milestone 3 (Pekan Ke-7) : Implementasi Komponen dan Interaktivitas UI (JavaScript)**
  * Pembuatan 4 halaman inti spesifik (Dashboard, Data Master, Form, Laporan)
  * Integrasi grafik visual Chart.js pada Dashboard
  * Validasi input form interaktif dan generator barcode label
  * Manipulasi data mock (CRUD) pada media `localStorage`
  * Demonstrasi langsung dan hosting publik di Vercel / GitHub Pages

---

<div align="center">
  <b>Universitas Pamulang (UNPAM)</b><br/>
  Program Studi Teknik Informatika, Fakultas Ilmu Komputer<br/>
  Mata Kuliah Pemrograman Web 2 (Client-Side Programming)<br/>
  Tahun Akademik 2025/2026
</div>
