# Panduan Setup Website GP Ansor Manyar

## Langkah 1 — Google Sheets
1. Buka [sheets.google.com](https://sheets.google.com)
2. Buat spreadsheet baru, beri nama: **GP Ansor Manyar**
3. Salin ID dari URL: `docs.google.com/spreadsheets/d/**[ID INI]**/edit`

## Langkah 2 — Google Apps Script
1. Buka [script.google.com](https://script.google.com)
2. Klik **New project**
3. Beri nama: **GP Ansor Manyar Backend**
4. Hapus semua kode → paste isi file `setup/Code.gs`
5. Isi `SPREADSHEET_ID` dengan ID dari Langkah 1
6. Klik **Ctrl+S** (simpan)
7. Klik dropdown fungsi → pilih **setupAll** → klik ▶ Run
8. Izinkan akses saat diminta (klik Review → Allow)
9. Cek log: harus muncul "Setup selesai!"

## Langkah 3 — Deploy Apps Script
1. Klik **Deploy → New deployment**
2. Pilih tipe: **Web app**
3. Execute as: **Me**
4. Who has access: **Anyone**
5. Klik **Deploy**
6. Salin URL yang muncul (panjang, diawali https://script.google.com/...)

## Langkah 4 — Konfigurasi Website
1. Buka file `js/config.js`
2. Isi `GAS_URL` dengan URL dari Langkah 3
3. Isi `REPO` dengan nama repository GitHub Anda

## Langkah 5 — Upload ke GitHub
1. Buat repository baru di GitHub (private)
2. Upload semua file (kecuali folder `setup/`)
3. Settings → Pages → Source: **main branch** → Save
4. Website live di: `https://username.github.io/nama-repo/`

## Akun Admin Default
- URL: `https://username.github.io/nama-repo/admin/login.html`
- Username: `admin`
- Password: `ansor2024`
- **Ganti password segera setelah login pertama!**
