# Sistem Informasi Manajemen Sarana dan Prasarana (SARPRAS ACADEMIA)

**Mata Kuliah:** Pemrograman Web 2 (Client-Side Programming)  
**Bobot Tugas:** Tugas Ke-1 (Project-Based Learning)  
**Milestone:** 1 (Pekan Ke-3) : Perencanaan Menu, ER-D dan UI Wireframing  
**Topik Terpilih:** Sistem Manajemen Sarana dan Prasarana (Asset Management)  
**Ketentuan Tema Visual:** Glassmorphism (Modern Institutional Glassmorphism)  

---

## 1. Ringkasan Proyek

SARPRAS ACADEMIA adalah platform Back-Office Admin Panel berbasis web client-side untuk tata kelola sarana dan prasarana institusi pendidikan tinggi serta barang milik negara (BMN). Sistem ini mengintegrasikan seluruh siklus hidup aset akademik, mulai dari pencatatan pengadaan, sirkulasi peminjaman alat, pemeliharaan dan kalibrasi rutin instrumen riset, hingga pencetakan dokumen resmi Kartu Inventaris Ruangan (KIR) berstandar kementerian.

---

## 2. Tautan Publik Hasil Perancangan (Milestone 1)

Sesuai dengan ketentuan tugas, berikut adalah tautan akses publik untuk seluruh artefak perancangan sistem:

* **Tautan Publik Figma (Design System dan High-Fidelity UI 8 Modul):**  
  [Figma Project: SARPRAS - Admin Panel Design System & High-Fi UI](https://www.figma.com/design/2AFWN3pMNSClSdg1beB2za/SARPRAS---Admin-Panel-Design-System---High-Fi-UI?node-id=0-1&t=bAFoQfAKXEWJhC6k-1)
* **Tautan Publik Google Stitch (Wireframing & UI Prototyping):**  
  [Google Stitch Project: SARPRAS UI Workspace](https://stitch.withgoogle.com/projects/3279874328774814817)
* **Tautan Publik FigJam (Diagram Relasional ER-D & User Flow):**  
  [FigJam Board: ER-D dan User Flow Diagram](https://www.figma.com/board/KZoXT7K9wnRKsp91X45Gpu)

---

## 3. Cakupan Modul Antarmuka (8 Modul Lengkap)

1. **Gerbang Autentikasi Admin (`index.html`)** : Form login kredensial NIP, password toggle, dan SSO Kemendikbudristek.
2. **Executive Command Dashboard (`pages/dashboard.html`)** : Metrik valuasi Rp 4.85 Miliar, integritas 86.4%, dan jadwal kalibrasi lab.
3. **Master Data Sarana dan Prasarana (`pages/data-master.html`)** : Data grid inventaris berdensitas tinggi dan modal konfirmasi penghapusan BMN.
4. **Form Registrasi Aset Baru (`pages/form.html`)** : Form 2-kolom spesifikasi teknis dan live thermal QR tag stiker 75x50mm.
5. **Pusat Laporan & Kartu Inventaris Ruangan / KIR (`pages/laporan.html`)** : Lembar cetak resmi dokumen KIR berstandar kementerian dengan tanda tangan digital ganda terverifikasi SHA-256.
6. **Pusat Peminjaman & Mutasi Fasilitas (`pages/peminjaman.html`)** : Sirkulasi peminjaman sarana bergerak dan deteksi status jatuh tempo (overdue).
7. **Manajemen Servis & Kalibrasi Alat (`pages/maintenance.html`)** : Manajemen Work Orders (WO) dan akreditasi ISO/IEC 17025.
8. **Direktori Fasilitas Gedung & Ruangan (`pages/ruangan.html`)** : Pemetaan profil 6 ruangan kampus dan akses cepat dokumen KIR.

---

## 4. Dokumentasi Teknis Lengkap

Spesifikasi arsitektur informasi, pemodelan data relasional (ER-D Mermaid.js), diagram alur pengguna (User Flow), serta spesifikasi Design System Glassmorphism dapat dilihat secara lengkap pada dokumen `docs/perancangan.md` atau `PERANCANGAN.md`.
