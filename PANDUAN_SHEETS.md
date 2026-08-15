# Panduan Setup Google Sheets untuk GP Ansor Manyar

## Langkah 1 — Buat Google Spreadsheet

1. Buka [sheets.google.com](https://sheets.google.com)
2. Buat spreadsheet baru → beri nama: **"Database GP Ansor Manyar"**
3. Buat **6 sheet** dengan nama persis seperti berikut:
   - `profil`
   - `kegiatan_mendatang`
   - `kegiatan`
   - `ranting`
   - `pengurus_ranting`
   - `pengurus_pac`

---

## Langkah 2 — Isi Header Tiap Sheet

### Sheet: `profil`
| key | value |
|-----|-------|
| nama_organisasi | Pimpinan Anak Cabang Gerakan Pemuda Ansor |
| kecamatan | Manyar |
| kabupaten | Gresik |
| periode | 2023–2026 |
| jumlah_ranting | 12 |
| jumlah_anggota | 500+ |
| jumlah_kegiatan | 40+ |
| whatsapp | 6281234567890 |
| instagram | https://instagram.com/ansormanyar |
| facebook | https://facebook.com/ansormanyar |
| email | ansormanyar@gmail.com |
| alamat | Kecamatan Manyar, Kabupaten Gresik |
| visi | (isi visi organisasi) |

### Sheet: `kegiatan_mendatang`
| aktif | judul | tanggal | waktu | lokasi | deskripsi | link_daftar | teks_tombol |
|-------|-------|---------|-------|--------|-----------|-------------|-------------|
| TRUE | Nama Kegiatan | 2025-09-15 | 08.00 WIB | Lokasi | Deskripsi singkat | https://... | Daftar Sekarang |

> Hanya baris pertama yang dibaca. Ubah `aktif` ke `FALSE` untuk menyembunyikan banner.

### Sheet: `kegiatan`
| id | judul | tanggal | lokasi | kategori | deskripsi | foto | highlight |
|----|-------|---------|--------|----------|-----------|------|-----------|
| 1 | Nama Kegiatan | 2025-08-10 | Lokasi | Keagamaan | Deskripsi | https://... | TRUE |

> Kolom `kategori`: Keagamaan / Sosial / Pelatihan / Organisasi / Olahraga / Seni  
> Kolom `highlight`: TRUE = tampil di beranda, FALSE = hanya di halaman kegiatan  
> Kolom `foto`: URL gambar (bisa dari Google Drive, gunakan link langsung)

### Sheet: `ranting`
| id | nama | desa | ketua | foto_ketua | aktif |
|----|------|------|-------|-----------|-------|
| r01 | PR Manyar | Desa Manyar Sidomukti | Ahmad Fauzi | | TRUE |

### Sheet: `pengurus_ranting`
| id_ranting | nama | jabatan | foto | no_hp |
|-----------|------|---------|------|-------|
| r01 | Ahmad Fauzi | Ketua | | 08xxx |
| r01 | M. Irkham | Wakil Ketua | | |

### Sheet: `pengurus_pac`
| nama | jabatan | departemen | tipe | urutan | foto |
|------|---------|-----------|------|--------|------|
| H. Abdullah Mas'ud | Ketua | Pimpinan Inti | ketua | 1 | |
| M. Syaifullah | Wakil Ketua I | Pimpinan Inti | wk | 2 | |

> Kolom `tipe`: ketua / wk / sekret / bendahara / dept

---

## Langkah 3 — Deploy Apps Script

1. Di spreadsheet, klik **Extensions → Apps Script**
2. Hapus semua kode yang ada, paste kode berikut:

```javascript
const SHEET_ID = SpreadsheetApp.getActiveSpreadsheet().getId();

function doGet(e) {
  const sheetName = e.parameter.sheet;
  const output = getSheetData(sheetName);
  return ContentService
    .createTextOutput(JSON.stringify(output))
    .setMimeType(ContentService.MimeType.JSON);
}

function getSheetData(sheetName) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(sheetName);
    if (!sheet) return { error: 'Sheet tidak ditemukan: ' + sheetName };

    const values = sheet.getDataRange().getValues();
    if (values.length < 2) return [];

    const headers = values[0].map(h => h.toString().trim());
    return values.slice(1)
      .filter(row => row.some(cell => cell !== ''))
      .map(row => {
        const obj = {};
        headers.forEach((h, i) => { obj[h] = row[i] !== undefined ? row[i].toString() : ''; });
        return obj;
      });
  } catch (err) {
    return { error: err.message };
  }
}
```

3. Klik **Save** (ikon disket)
4. Klik **Deploy → New deployment**
5. Pilih type: **Web app**
6. Isi:
   - Description: `GP Ansor Manyar API`
   - Execute as: **Me**
   - Who has access: **Anyone**
7. Klik **Deploy** → izinkan akses
8. **Copy URL** yang muncul (bentuknya: `https://script.google.com/macros/s/xxxx/exec`)

---

## Langkah 4 — Hubungkan ke Website

Buka file `js/data.js`, cari bagian `CONFIG`, ubah:

```javascript
const CONFIG = {
  APPS_SCRIPT_URL: 'PASTE_URL_APPS_SCRIPT_DI_SINI',
  MODE: 'apps_script',   // ubah dari 'local' ke 'apps_script'
  CACHE_MINUTES: 10,
};
```

Simpan → push ke GitHub → selesai! ✅

---

## Tips Upload Foto ke Google Drive

Agar foto bisa ditampilkan di website:
1. Upload foto ke Google Drive
2. Klik kanan → **Share** → **Anyone with the link**
3. Copy link, ambil ID file dari URL: `https://drive.google.com/file/d/**FILE_ID**/view`
4. Ubah jadi: `https://drive.google.com/uc?export=view&id=FILE_ID`
5. Paste URL ini ke kolom `foto` di spreadsheet

---

## Troubleshooting

**Website tidak update setelah edit spreadsheet?**
- Tunggu max 10 menit (waktu cache)
- Atau buka website di mode incognito

**Error CORS / gagal fetch?**
- Pastikan Apps Script di-deploy ulang setelah edit kode
- Pastikan "Who has access" diset ke **Anyone**

**Data lama masih muncul?**
- Buka DevTools (F12) → Application → Session Storage → hapus semua key `gpa_cache_*`
