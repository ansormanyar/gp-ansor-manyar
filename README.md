# 🌿 Website GP Ansor Manyar

Website resmi Pimpinan Anak Cabang Gerakan Pemuda Ansor Kecamatan Manyar, Kabupaten Gresik.

**Live:** `https://[username].github.io/gp-ansor-manyar/`

---

## 📁 Struktur Proyek

```
gp-ansor-manyar/
├── index.html                 # Halaman beranda
├── 404.html                   # Halaman error
├── .nojekyll                  # Wajib untuk GitHub Pages
├── css/
│   ├── style.css              # Design system utama
│   └── pages.css              # Style halaman dalam
├── js/
│   ├── data.js                # DATA UTAMA — edit di sini
│   └── main.js                # Render engine beranda
├── pages/
│   ├── kegiatan.html          # Halaman kegiatan
│   ├── ranting.html           # Halaman pimpinan ranting
│   ├── pengurus.html          # Halaman pengurus PAC
│   └── tentang.html           # Halaman tentang kami
├── admin/
│   └── index.html             # Panel admin
├── images/
│   └── logo.png               # Logo GP Ansor (tambahkan manual)
├── PANDUAN_SHEETS.md          # Panduan setup Google Sheets
└── README.md                  # File ini
```

---

## 🚀 Cara Deploy ke GitHub Pages

### Langkah 1 — Persiapan di Komputer

Pastikan sudah install **Git**. Cek dengan:
```bash
git --version
```
Jika belum, download di [git-scm.com](https://git-scm.com).

---

### Langkah 2 — Buat Repository di GitHub

1. Buka [github.com](https://github.com) → login
2. Klik tombol **"New"** (repository baru)
3. Isi:
   - **Repository name:** `gp-ansor-manyar`
   - **Visibility:** Public ✅ (wajib untuk GitHub Pages gratis)
   - Jangan centang "Add README"
4. Klik **"Create repository"**
5. Simpan URL repository, contoh: `https://github.com/namakamu/gp-ansor-manyar`

---

### Langkah 3 — Upload File ke GitHub

Buka Terminal (Windows: Git Bash / Command Prompt), lalu jalankan:

```bash
# Masuk ke folder proyek
cd path/ke/folder/gp-ansor-manyar

# Inisialisasi Git
git init

# Tambahkan semua file
git add .

# Commit pertama
git commit -m "🌿 Launch website GP Ansor Manyar"

# Hubungkan ke GitHub (ganti 'namakamu' dengan username GitHub kamu)
git remote add origin https://github.com/namakamu/gp-ansor-manyar.git

# Upload ke GitHub
git push -u origin main
```

> **Catatan:** Jika muncul permintaan login, masukkan username dan password GitHub kamu.
> Untuk password, gunakan **Personal Access Token** (bukan password biasa).
> Cara buat token: GitHub → Settings → Developer settings → Personal access tokens → Generate new token

---

### Langkah 4 — Aktifkan GitHub Pages

1. Buka repository di GitHub: `github.com/namakamu/gp-ansor-manyar`
2. Klik tab **"Settings"**
3. Di sidebar kiri, klik **"Pages"**
4. Di bagian **"Source"**:
   - Branch: **`main`**
   - Folder: **`/ (root)`**
5. Klik **"Save"**
6. Tunggu 1–3 menit
7. Website live di: `https://namakamu.github.io/gp-ansor-manyar/`

---

### Langkah 5 — Cek Website

Buka browser, kunjungi:
```
https://namakamu.github.io/gp-ansor-manyar/
```

Jika muncul halaman beranda GP Ansor Manyar → **berhasil!** ✅

---

## ✏️ Cara Update Konten

### A. Update via Google Sheets (Disarankan)

Setelah setup Google Sheets (lihat `PANDUAN_SHEETS.md`):
1. Buka Google Spreadsheet
2. Edit data langsung (kegiatan, pengurus, ranting, dll)
3. Website otomatis update saat halaman dibuka

### B. Update Manual di `js/data.js`

Edit file `js/data.js`, cari bagian `LOCAL_DATA`:

```javascript
// Tambah kegiatan baru:
kegiatan: [
  {
    id: 7,                              // nomor unik
    judul: 'Nama Kegiatan Baru',
    tanggal: '2025-09-20',             // format YYYY-MM-DD
    lokasi: 'Tempat Kegiatan',
    kategori: 'Keagamaan',             // Keagamaan/Sosial/Pelatihan/Organisasi
    deskripsi: 'Deskripsi singkat.',
    foto: '',                           // URL foto (opsional)
    highlight: true,                   // true = tampil di beranda
  },
  // ... kegiatan lama tetap di sini
],
```

Setelah edit, jalankan:
```bash
git add js/data.js
git commit -m "Update kegiatan: [nama kegiatan]"
git push
```
Website otomatis update dalam ~1 menit.

---

### C. Ganti Banner Kegiatan Mendatang

Edit `LOCAL_DATA.kegiatan_mendatang` di `js/data.js`:

```javascript
kegiatan_mendatang: {
  aktif: true,                          // false = sembunyikan banner
  judul: 'Nama Kegiatan',
  tanggal: '2025-09-15',
  waktu: '08.00 WIB',
  lokasi: 'Lokasi Acara',
  deskripsi: 'Deskripsi acara.',
  link_daftar: 'https://wa.me/...',    // link pendaftaran (WA/form/dll)
  teks_tombol: 'Daftar Sekarang',
},
```

---

## 🖼️ Cara Tambah Logo

1. Siapkan file logo GP Ansor format `.png` (ukuran 200×200 px, background transparan)
2. Rename menjadi `logo.png`
3. Taruh di folder `images/`
4. Push ke GitHub:
```bash
git add images/logo.png
git commit -m "Tambah logo GP Ansor"
git push
```

---

## 📸 Cara Tambah Foto Kegiatan

**Via Google Drive (paling mudah):**
1. Upload foto ke Google Drive
2. Klik kanan foto → Share → "Anyone with the link"
3. Copy link, ambil FILE_ID dari URL
4. URL foto untuk website: `https://drive.google.com/uc?export=view&id=FILE_ID`
5. Paste URL ini ke kolom `foto` di spreadsheet atau `data.js`

---

## 🔗 Cara Hubungkan Google Sheets

Lihat panduan lengkap di file **`PANDUAN_SHEETS.md`**.

Setelah setup, ubah di `js/data.js`:
```javascript
const CONFIG = {
  APPS_SCRIPT_URL: 'https://script.google.com/macros/s/xxx/exec',
  MODE: 'apps_script',   // ganti dari 'local'
};
```

---

## 🛠️ Cara Update Rutin

```bash
# 1. Edit file yang perlu diubah
# 2. Simpan
# 3. Di terminal:
git add .
git commit -m "Pesan singkat tentang perubahan"
git push
# Website update otomatis dalam ~1 menit
```

---

## ❓ Troubleshooting

| Masalah | Solusi |
|---------|--------|
| Website tidak muncul setelah deploy | Tunggu 3–5 menit, refresh halaman |
| Gambar tidak tampil | Pastikan URL foto bisa diakses publik |
| Data tidak update | Clear cache browser (Ctrl+Shift+R) |
| Error CORS Google Sheets | Pastikan Apps Script di-deploy ulang setelah edit |
| Halaman `/pages/` error 404 | Pastikan file `.nojekyll` ada di root folder |

---

## 👨‍💻 Kontak Tim Pengembang

Untuk bantuan teknis, hubungi tim media GP Ansor Manyar.

---

*Dibuat dengan ❤️ untuk GP Ansor Manyar — Bergerak Bersama, Membangun Bangsa.*
