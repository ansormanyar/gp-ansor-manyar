/* ============================================================
   GP ANSOR MANYAR — Data Layer
   Sumber: Google Sheets API (realtime) + fallback data lokal
   ============================================================

   CARA SETUP GOOGLE SHEETS:
   1. Buat Google Spreadsheet baru
   2. Buat sheet dengan nama: kegiatan, kegiatan_mendatang,
      ranting, pengurus_ranting, pengurus_pac, profil
   3. File → Share → "Anyone with the link" → Viewer
   4. Extensions → Apps Script → paste kode dari PANDUAN.md
   5. Deploy sebagai Web App → copy URL ke APPS_SCRIPT_URL di bawah
   6. Isi SPREADSHEET_ID dari URL spreadsheet kamu
   ============================================================ */

const CONFIG = {
  // Ganti dengan Spreadsheet ID kamu
  // Contoh URL: https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit
  SPREADSHEET_ID: 'https://docs.google.com/spreadsheets/d/16OXNSXor3m_TXsX1YKyusqn38gEDluB5dCqshs-8rJc/edit',

  // Ganti dengan API Key Google Cloud kamu (opsional, untuk Sheets API v4)
  API_KEY: 'GANTI_DENGAN_API_KEY_KAMU',

  // Ganti dengan URL Apps Script Web App kamu (pilihan utama, lebih mudah)
  APPS_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbzblzahi1_74lW2UVi_zUNPvfQxQ3sa4GcpiHG-2XJBbLrt3fnN5bQ1O8OVNCtGCIoo/exec',

  // Mode: 'apps_script' | 'sheets_api' | 'local'
  // Gunakan 'local' dulu sebelum setup Google Sheets
  MODE: 'local',

  // Cache data di browser (menit)
  CACHE_MINUTES: 10,
};

/* ============================================================
   FALLBACK DATA LOKAL
   Edit bagian ini untuk mengisi konten sementara
   sebelum Google Sheets terhubung
   ============================================================ */

const LOCAL_DATA = {

  profil: {
    nama_organisasi: 'Pimpinan Anak Cabang Gerakan Pemuda Ansor',
    kecamatan: 'Manyar',
    kabupaten: 'Gresik',
    periode: '2023–2026',
    visi: 'Terwujudnya Gerakan Pemuda Ansor Manyar yang tangguh, mandiri, dan berdaya guna bagi masyarakat di tengah perkembangan kawasan industri.',
    misi: [
      'Memperkuat kaderisasi dan pembinaan anggota secara berkelanjutan',
      'Mendorong partisipasi aktif pemuda dalam kehidupan sosial, ekonomi, dan keagamaan',
      'Membangun sinergi dengan seluruh elemen masyarakat dan pemerintah',
      'Menjaga nilai-nilai Ahlussunnah wal Jamaah An-Nahdliyah',
    ],
    jumlah_ranting: 12,
    jumlah_anggota: '500+',
    jumlah_kegiatan: '40+',
    alamat: 'Kecamatan Manyar, Kabupaten Gresik, Jawa Timur',
    email: 'ansormanyar@gmail.com',
    whatsapp: '6281234567890',
    instagram: 'https://instagram.com/ansormanyar',
    facebook: 'https://facebook.com/ansormanyar',
    youtube: '',
  },

  kegiatan_mendatang: {
    aktif: true,
    judul: 'Pelantikan & Konsolidasi Anggota Baru GP Ansor Manyar',
    tanggal: '2025-09-15',
    waktu: '08.00 WIB',
    lokasi: 'Pendopo Kecamatan Manyar, Gresik',
    deskripsi: 'Pelantikan resmi anggota baru sekaligus konsolidasi organisasi menuju program kerja semester kedua. Terbuka untuk seluruh pemuda Nahdliyin se-Kecamatan Manyar.',
    link_daftar: '#',
    teks_tombol: 'Daftar Sekarang',
  },

  kegiatan: [
    {
      id: 1,
      judul: 'Khataman Al-Qur\'an & Doa Bersama Menyambut HUT RI',
      tanggal: '2025-08-10',
      lokasi: 'Masjid Agung Manyar',
      kategori: 'Keagamaan',
      deskripsi: 'Kegiatan khataman Al-Qur\'an 30 juz bersama anggota Ansor dan Banser se-kecamatan Manyar sebagai bentuk syukur dalam menyambut HUT ke-80 Kemerdekaan RI.',
      foto: '',
      highlight: true,
    },
    {
      id: 2,
      judul: 'Bakti Sosial & Donor Darah di Kawasan JIIPE',
      tanggal: '2025-07-28',
      lokasi: 'Kawasan Industri JIIPE, Manyar',
      kategori: 'Sosial',
      deskripsi: 'Kegiatan donor darah dan pembagian sembako untuk pekerja dan warga sekitar kawasan industri Java Integrated Industrial and Ports Estate (JIIPE).',
      foto: '',
      highlight: true,
    },
    {
      id: 3,
      judul: 'Pelatihan Digital Marketing untuk Pemuda Ansor',
      tanggal: '2025-07-10',
      lokasi: 'Aula Kantor Kecamatan Manyar',
      kategori: 'Pelatihan',
      deskripsi: 'Workshop digital marketing dan pengelolaan media sosial bagi anggota GP Ansor Manyar untuk mendukung pemberdayaan ekonomi pemuda.',
      foto: '',
      highlight: true,
    },
    {
      id: 4,
      judul: 'Gerak Jalan Santri & Pawai Ta\'aruf',
      tanggal: '2025-06-22',
      lokasi: 'Alun-alun Manyar',
      kategori: 'Sosial',
      deskripsi: 'Partisipasi GP Ansor Manyar dalam gerak jalan santri memperingati Hari Lahir Nahdlatul Ulama bersama ribuan warga Nahdliyin.',
      foto: '',
      highlight: false,
    },
    {
      id: 5,
      judul: 'Kajian Aswaja: Moderasi Beragama di Era Digital',
      tanggal: '2025-06-05',
      lokasi: 'Ponpes Al-Hidayah Manyar',
      kategori: 'Keagamaan',
      deskripsi: 'Kajian rutin bulanan membahas konsep moderasi beragama Ahlussunnah wal Jamaah dalam menghadapi tantangan digitalisasi.',
      foto: '',
      highlight: false,
    },
    {
      id: 6,
      judul: 'Musyawarah Kerja PAC GP Ansor Manyar 2025',
      tanggal: '2025-05-18',
      lokasi: 'Gedung PCNU Gresik',
      kategori: 'Organisasi',
      deskripsi: 'Musyawarah kerja tahunan menyusun program prioritas dan evaluasi capaian PAC GP Ansor Manyar semester pertama 2025.',
      foto: '',
      highlight: false,
    },
  ],

  ranting: [
    { id: 'r01', nama: 'PR Manyar', desa: 'Desa Manyar Sidomukti', ketua: 'Ahmad Fauzi', aktif: true },
    { id: 'r02', nama: 'PR Roomo', desa: 'Desa Roomo', ketua: 'M. Habibi', aktif: true },
    { id: 'r03', nama: 'PR Leran', desa: 'Desa Leran', ketua: 'Syaifuddin', aktif: true },
    { id: 'r04', nama: 'PR Sukomulyo', desa: 'Desa Sukomulyo', ketua: 'Abdul Ghofur', aktif: true },
    { id: 'r05', nama: 'PR Yosowilangun', desa: 'Desa Yosowilangun', ketua: 'Hendra Saputra', aktif: true },
    { id: 'r06', nama: 'PR Banyuwangi', desa: 'Desa Banyuwangi', ketua: 'Rudi Hartono', aktif: true },
    { id: 'r07', nama: 'PR Betiting', desa: 'Desa Betiting', ketua: 'Zainul Arifin', aktif: true },
    { id: 'r08', nama: 'PR Pongangan', desa: 'Desa Pongangan', ketua: 'M. Khoirul Anwar', aktif: true },
    { id: 'r09', nama: 'PR Sumberrejo', desa: 'Desa Sumberrejo', ketua: 'Agus Salim', aktif: true },
    { id: 'r10', nama: 'PR Peganden', desa: 'Desa Peganden', ketua: 'Wahyu Hidayat', aktif: true },
    { id: 'r11', nama: 'PR Sembayat', desa: 'Desa Sembayat', ketua: 'Fathur Rahman', aktif: true },
    { id: 'r12', nama: 'PR Manyarejo', desa: 'Desa Manyarejo', ketua: 'Lukman Hakim', aktif: true },
  ],

  pengurus_ranting: {
    // id_ranting: [ { nama, jabatan, foto } ]
    r01: [
      { nama: 'Ahmad Fauzi', jabatan: 'Ketua', foto: '' },
      { nama: 'M. Irkham', jabatan: 'Wakil Ketua', foto: '' },
      { nama: 'Sholeh Amin', jabatan: 'Sekretaris', foto: '' },
      { nama: 'Rizal Maulana', jabatan: 'Bendahara', foto: '' },
    ],
    // Ranting lain bisa diisi serupa
  },

  pengurus_pac: [
    // Pimpinan Inti
    { nama: 'H. Abdullah Mas\'ud', jabatan: 'Ketua', departemen: 'Pimpinan Inti', urutan: 1, foto: '', tipe: 'ketua' },
    { nama: 'M. Syaifullah', jabatan: 'Wakil Ketua I', departemen: 'Pimpinan Inti', urutan: 2, foto: '', tipe: 'wk' },
    { nama: 'Agus Wahyudi', jabatan: 'Wakil Ketua II', departemen: 'Pimpinan Inti', urutan: 3, foto: '', tipe: 'wk' },
    { nama: 'Nur Hasan', jabatan: 'Wakil Ketua III', departemen: 'Pimpinan Inti', urutan: 4, foto: '', tipe: 'wk' },
    { nama: 'M. Iqbal Fauzi', jabatan: 'Sekretaris', departemen: 'Pimpinan Inti', urutan: 5, foto: '', tipe: 'sekret' },
    { nama: 'Rizal Kurniawan', jabatan: 'Wakil Sekretaris', departemen: 'Pimpinan Inti', urutan: 6, foto: '', tipe: 'sekret' },
    { nama: 'Khoirul Umam', jabatan: 'Bendahara', departemen: 'Pimpinan Inti', urutan: 7, foto: '', tipe: 'bendahara' },
    { nama: 'M. Fahrur Rozi', jabatan: 'Wakil Bendahara', departemen: 'Pimpinan Inti', urutan: 8, foto: '', tipe: 'bendahara' },
    // Departemen
    { nama: 'Imam Syafi\'i', jabatan: 'Ketua Dept. Kaderisasi', departemen: 'Kaderisasi', urutan: 9, foto: '', tipe: 'dept' },
    { nama: 'Fathul Bari', jabatan: 'Ketua Dept. Keagamaan', departemen: 'Keagamaan', urutan: 10, foto: '', tipe: 'dept' },
    { nama: 'Hendra Prasetyo', jabatan: 'Ketua Dept. Sosial', departemen: 'Sosial', urutan: 11, foto: '', tipe: 'dept' },
    { nama: 'Yusuf Hidayatullah', jabatan: 'Ketua Dept. Media', departemen: 'Media & Komunikasi', urutan: 12, foto: '', tipe: 'dept' },
  ],

};

/* ============================================================
   GOOGLE SHEETS FETCHER
   ============================================================ */

const SheetsDB = {

  // Cache sederhana di sessionStorage
  _cache: {},

  _cacheKey(sheet) {
    return `gpa_cache_${sheet}`;
  },

  _getCache(sheet) {
    try {
      const raw = sessionStorage.getItem(this._cacheKey(sheet));
      if (!raw) return null;
      const { data, timestamp } = JSON.parse(raw);
      const age = (Date.now() - timestamp) / 60000;
      if (age > CONFIG.CACHE_MINUTES) return null;
      return data;
    } catch { return null; }
  },

  _setCache(sheet, data) {
    try {
      sessionStorage.setItem(this._cacheKey(sheet), JSON.stringify({
        data, timestamp: Date.now()
      }));
    } catch {}
  },

  // Fetch via Apps Script (mode utama)
  async _fetchAppsScript(sheet) {
    const cached = this._getCache(sheet);
    if (cached) return cached;

    const url = `${CONFIG.APPS_SCRIPT_URL}?sheet=${sheet}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    this._setCache(sheet, data);
    return data;
  },

  // Fetch via Sheets API v4
  async _fetchSheetsAPI(sheet) {
    const cached = this._getCache(sheet);
    if (cached) return cached;

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${CONFIG.SPREADSHEET_ID}/values/${sheet}?key=${CONFIG.API_KEY}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();

    // Konversi rows → array of objects
    const [headers, ...rows] = json.values || [];
    const data = rows.map(row =>
      Object.fromEntries(headers.map((h, i) => [h.trim(), (row[i] || '').trim()]))
    );
    this._setCache(sheet, data);
    return data;
  },

  async fetch(sheet) {
    if (CONFIG.MODE === 'local') return null;
    try {
      if (CONFIG.MODE === 'apps_script') return await this._fetchAppsScript(sheet);
      if (CONFIG.MODE === 'sheets_api') return await this._fetchSheetsAPI(sheet);
    } catch (err) {
      console.warn(`[GP Ansor] Gagal fetch sheet "${sheet}":`, err.message);
      console.warn('[GP Ansor] Menggunakan data lokal sebagai fallback.');
      return null;
    }
    return null;
  },

};

/* ============================================================
   DATA API — digunakan oleh main.js dan halaman lain
   Selalu kembalikan data lokal jika sheets gagal/belum setup
   ============================================================ */

const AnsorData = {

  async getProfil() {
    const remote = await SheetsDB.fetch('profil');
    if (remote) {
      // Konversi format key-value dari sheet
      return Object.fromEntries(remote.map(r => [r.key, r.value]));
    }
    return LOCAL_DATA.profil;
  },

  async getKegiatanMendatang() {
    const remote = await SheetsDB.fetch('kegiatan_mendatang');
    if (remote && remote.length > 0) {
      const r = remote[0];
      return {
        aktif: r.aktif === 'TRUE' || r.aktif === '1',
        judul: r.judul,
        tanggal: r.tanggal,
        waktu: r.waktu,
        lokasi: r.lokasi,
        deskripsi: r.deskripsi,
        link_daftar: r.link_daftar,
        teks_tombol: r.teks_tombol || 'Selengkapnya',
      };
    }
    return LOCAL_DATA.kegiatan_mendatang;
  },

  async getKegiatan({ highlight = false, limit = 0 } = {}) {
    const remote = await SheetsDB.fetch('kegiatan');
    let data = remote || LOCAL_DATA.kegiatan;

    // Normalisasi tipe boolean
    data = data.map(k => ({
      ...k,
      highlight: k.highlight === true || k.highlight === 'TRUE' || k.highlight === '1',
    }));

    if (highlight) data = data.filter(k => k.highlight);
    // Urutkan terbaru dulu
    data.sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));
    if (limit > 0) data = data.slice(0, limit);
    return data;
  },

  async getRanting() {
    const remote = await SheetsDB.fetch('ranting');
    let data = remote || LOCAL_DATA.ranting;
    return data.map(r => ({
      ...r,
      aktif: r.aktif === true || r.aktif === 'TRUE' || r.aktif === '1',
    })).filter(r => r.aktif);
  },

  async getPengurusRanting(idRanting) {
    const remote = await SheetsDB.fetch('pengurus_ranting');
    if (remote) {
      return remote.filter(p => p.id_ranting === idRanting);
    }
    return LOCAL_DATA.pengurus_ranting[idRanting] || [];
  },

  async getPengurusPAC({ limit = 0 } = {}) {
    const remote = await SheetsDB.fetch('pengurus_pac');
    let data = remote || LOCAL_DATA.pengurus_pac;
    data.sort((a, b) => Number(a.urutan) - Number(b.urutan));
    if (limit > 0) data = data.slice(0, limit);
    return data;
  },

};

/* ============================================================
   HELPERS
   ============================================================ */

const Fmt = {
  tanggal(str) {
    if (!str) return '';
    const d = new Date(str);
    if (isNaN(d)) return str;
    return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  },
  inisial(nama) {
    return (nama || '').split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
  },
  slug(str) {
    return (str || '').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  },
};
