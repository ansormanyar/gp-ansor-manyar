/* ============================================================
   GP ANSOR MANYAR — Data Layer v3.0
   Disesuaikan dengan format response Apps Script yang aktif
   ============================================================ */

const CONFIG = {
  APPS_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbw7e6E1qn80aSB3QNAUO0atO-CamKkk-nmwmHkg23PoaGvA8uOnwPW3H5K4gyJMlAr3/exec',
  CACHE_MINUTES: 10,
};

/* ============================================================
   DATA LOKAL — fallback jika koneksi gagal
   ============================================================ */

const LOCAL_DATA = {

  profil: {
    nama_resmi: 'Gerakan Pemuda Ansor Kecamatan Manyar',
    nama_singkat: 'PAC GP Ansor Manyar',
    nama_organisasi: 'Gerakan Pemuda Ansor Kecamatan Manyar',
    periode_kepengurusan: '2023–2026',
    tagline: 'Bergerak Bersama, Membangun Bangsa.',
    visi: 'Terwujudnya Gerakan Pemuda Ansor Manyar yang tangguh, mandiri, dan berdaya guna bagi masyarakat.',
    misi_1: 'Memperkuat kaderisasi dan pembinaan anggota secara berkelanjutan',
    misi_2: 'Mendorong partisipasi aktif pemuda dalam kehidupan sosial dan keagamaan',
    misi_3: 'Menjaga nilai-nilai Ahlussunnah wal Jamaah An-Nahdliyah',
    jumlah_ranting: 12,
    jumlah_anggota: 500,
    jumlah_kegiatan: 40,
    stat_ranting: 12,
    stat_anggota: '500+',
    stat_kegiatan_per_tahun: '40+',
    alamat_sekretariat: 'Kecamatan Manyar, Kabupaten Gresik',
    no_whatsapp: '6281234567890',
    instagram: 'ansormanyar',
    facebook: 'https://facebook.com/ansormanyar',
    youtube: '',
    tiktok: '',
  },

  kegiatan: [
    { id:'KG001', judul:'Khataman Al-Qur\'an Menyambut HUT RI', tanggal:'2025-08-10', kategori:'Keagamaan', lokasi:'Masjid Agung Manyar', status:'Selesai', keterangan:'Khataman Al-Qur\'an 30 juz bersama anggota Ansor dan Banser se-kecamatan.', foto:'' },
    { id:'KG002', judul:'Bakti Sosial & Donor Darah di JIIPE', tanggal:'2025-07-28', kategori:'Sosial', lokasi:'Kawasan JIIPE, Manyar', status:'Selesai', keterangan:'Donor darah dan pembagian sembako untuk warga sekitar kawasan industri.', foto:'' },
    { id:'KG003', judul:'Pelatihan Digital Marketing Pemuda Ansor', tanggal:'2025-07-10', kategori:'Pelatihan', lokasi:'Aula Kantor Kecamatan Manyar', status:'Selesai', keterangan:'Workshop digital marketing untuk pemberdayaan ekonomi pemuda.', foto:'' },
  ],

  banner: [
    { id:'BN001', judul:'Pelantikan & Konsolidasi Anggota Baru', keterangan:'GP Ansor Manyar · Terbuka untuk Pemuda Nahdliyin', tanggal:'2025-09-15', waktu:'08:00', lokasi:'Pendopo Kecamatan Manyar', status:'Aktif' },
  ],

  ranting: [
    { id:'RT01', desa:'Desa Manyar Sidomukti', nama_ranting:'PR GP Ansor Manyar', ketua:'Ahmad Fauzi', hp:'', sekretaris:'', bendahara:'', jumlah_anggota:45, tahun_berdiri:2013, status:'Aktif' },
    { id:'RT02', desa:'Desa Roomo', nama_ranting:'PR GP Ansor Roomo', ketua:'M. Habibi', hp:'', sekretaris:'', bendahara:'', jumlah_anggota:38, tahun_berdiri:2014, status:'Aktif' },
    { id:'RT03', desa:'Desa Leran', nama_ranting:'PR GP Ansor Leran', ketua:'Syaifuddin', hp:'', sekretaris:'', bendahara:'', jumlah_anggota:42, tahun_berdiri:2012, status:'Aktif' },
    { id:'RT04', desa:'Desa Sukomulyo', nama_ranting:'PR GP Ansor Sukomulyo', ketua:'Abdul Ghofur', hp:'', sekretaris:'', bendahara:'', jumlah_anggota:50, tahun_berdiri:2011, status:'Aktif' },
    { id:'RT05', desa:'Desa Yosowilangun', nama_ranting:'PR GP Ansor Yosowilangun', ketua:'Hendra Saputra', hp:'', sekretaris:'', bendahara:'', jumlah_anggota:35, tahun_berdiri:2015, status:'Aktif' },
    { id:'RT06', desa:'Desa Banyuwangi', nama_ranting:'PR GP Ansor Banyuwangi', ketua:'Rudi Hartono', hp:'', sekretaris:'', bendahara:'', jumlah_anggota:40, tahun_berdiri:2014, status:'Aktif' },
    { id:'RT07', desa:'Desa Betiting', nama_ranting:'PR GP Ansor Betiting', ketua:'Zainul Arifin', hp:'', sekretaris:'', bendahara:'', jumlah_anggota:33, tahun_berdiri:2016, status:'Aktif' },
    { id:'RT08', desa:'Desa Pongangan', nama_ranting:'PR GP Ansor Pongangan', ketua:'M. Khoirul Anwar', hp:'', sekretaris:'', bendahara:'', jumlah_anggota:28, tahun_berdiri:2017, status:'Aktif' },
    { id:'RT09', desa:'Desa Sumberrejo', nama_ranting:'PR GP Ansor Sumberrejo', ketua:'Agus Salim', hp:'', sekretaris:'', bendahara:'', jumlah_anggota:36, tahun_berdiri:2013, status:'Aktif' },
    { id:'RT10', desa:'Desa Peganden', nama_ranting:'PR GP Ansor Peganden', ketua:'Wahyu Hidayat', hp:'', sekretaris:'', bendahara:'', jumlah_anggota:31, tahun_berdiri:2015, status:'Aktif' },
    { id:'RT11', desa:'Desa Sembayat', nama_ranting:'PR GP Ansor Sembayat', ketua:'Fathur Rahman', hp:'', sekretaris:'', bendahara:'', jumlah_anggota:44, tahun_berdiri:2012, status:'Aktif' },
    { id:'RT12', desa:'Desa Manyarejo', nama_ranting:'PR GP Ansor Manyarejo', ketua:'Lukman Hakim', hp:'', sekretaris:'', bendahara:'', jumlah_anggota:39, tahun_berdiri:2014, status:'Aktif' },
  ],

  pengurus: [
    { id:'PG01', nama:'H. Abdullah Mas\'ud', jabatan:'Ketua', bidang:'Pengurus Inti', hp:'', periode:'2023–2026', asal_ranting:'', foto:'', tipe:'ketua', urutan:1 },
    { id:'PG02', nama:'M. Syaifullah', jabatan:'Wakil Ketua I', bidang:'Pengurus Inti', hp:'', periode:'2023–2026', asal_ranting:'', foto:'', tipe:'wk', urutan:2 },
    { id:'PG03', nama:'Agus Wahyudi', jabatan:'Wakil Ketua II', bidang:'Pengurus Inti', hp:'', periode:'2023–2026', asal_ranting:'', foto:'', tipe:'wk', urutan:3 },
    { id:'PG04', nama:'M. Iqbal Fauzi', jabatan:'Sekretaris', bidang:'Pengurus Inti', hp:'', periode:'2023–2026', asal_ranting:'', foto:'', tipe:'sekret', urutan:4 },
    { id:'PG05', nama:'Khoirul Umam', jabatan:'Bendahara', bidang:'Pengurus Inti', hp:'', periode:'2023–2026', asal_ranting:'', foto:'', tipe:'bendahara', urutan:5 },
    { id:'PG06', nama:'Imam Syafi\'i', jabatan:'Ketua Bidang', bidang:'Kaderisasi', hp:'', periode:'2023–2026', asal_ranting:'', foto:'', tipe:'dept', urutan:6 },
    { id:'PG07', nama:'Fathul Bari', jabatan:'Ketua Bidang', bidang:'Dakwah & Pengembangan Agama', hp:'', periode:'2023–2026', asal_ranting:'', foto:'', tipe:'dept', urutan:7 },
    { id:'PG08', nama:'Yusuf Hidayatullah', jabatan:'Ketua Bidang', bidang:'Informasi & Komunikasi', hp:'', periode:'2023–2026', asal_ranting:'', foto:'', tipe:'dept', urutan:8 },
  ],

};

/* ============================================================
   CACHE
   ============================================================ */

const Cache = {
  get(key) {
    try {
      const raw = sessionStorage.getItem('gpa_' + key);
      if (!raw) return null;
      const { data, ts } = JSON.parse(raw);
      if ((Date.now() - ts) / 60000 > CONFIG.CACHE_MINUTES) return null;
      return data;
    } catch { return null; }
  },
  set(key, data) {
    try {
      sessionStorage.setItem('gpa_' + key, JSON.stringify({ data, ts: Date.now() }));
    } catch {}
  },
  clear() {
    try {
      Object.keys(sessionStorage)
        .filter(k => k.startsWith('gpa_'))
        .forEach(k => sessionStorage.removeItem(k));
    } catch {}
  },
};

/* ============================================================
   FETCHER — sesuai format Apps Script yang aktif
   Response: { ok, data: { profil, kegiatan, ranting, pengurus, banner } }
   ============================================================ */

const SheetsDB = {
  _cache: null,

  async fetchAll() {
    if (this._cache) return this._cache;

    const cached = Cache.get('all');
    if (cached) { this._cache = cached; return cached; }

    try {
      const res  = await fetch(CONFIG.APPS_SCRIPT_URL);
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const json = await res.json();

      // Format Apps Script aktif: json.data.kegiatan, json.data.ranting, dst
      if (!json.ok && !json.success) throw new Error(json.message || 'Response tidak valid');

      const d = json.data || {};
      const result = {
        profil:   d.profil   || {},
        kegiatan: d.kegiatan || [],
        // Apps Script lama pakai kegiatan_mendatang, baru pakai banner
        banner:   d.banner || d.kegiatan_mendatang || [],
        ranting:  d.ranting  || [],
        // Apps Script lama pakai pengurus_pac, baru pakai pengurus
        pengurus: d.pengurus || d.pengurus_pac || [],
        pengurus_ranting: d.pengurus_ranting || [],
      };

      Cache.set('all', result);
      this._cache = result;
      return result;

    } catch (err) {
      console.warn('[GP Ansor] Gagal fetch dari Sheets, pakai data lokal:', err.message);
      return null;
    }
  },
};

/* ============================================================
   AnsorData — API untuk main.js dan halaman lain
   Key yang dikembalikan kompatibel dengan main.js yang ada
   ============================================================ */

const AnsorData = {

  async _db() {
    return await SheetsDB.fetchAll();
  },

  async getProfil() {
    const db = await this._db();
    const p  = db?.profil || {};
    // Pakai data Sheets jika ada isinya, fallback lokal jika kosong
    return Object.keys(p).length > 2 ? p : LOCAL_DATA.profil;
  },

  // Banner/kegiatan mendatang — ambil yang status Aktif
  async getBannerAktif() {
    const db      = await this._db();
    const banners = (db?.banner && db.banner.length > 0)
      ? db.banner
      : LOCAL_DATA.banner;
    const aktif   = banners.filter(b => {
      const s = String(b.status || b.Status || '').toLowerCase();
      return s === 'aktif' || s === 'active' || s === '1' || s === 'true';
    }).sort((a, b) =>
      new Date(a.tanggal || a['Tanggal Acara (YYYY-MM-DD)'] || 0) -
      new Date(b.tanggal || b['Tanggal Acara (YYYY-MM-DD)'] || 0)
    );
    return aktif[0] || null;
  },

  // Kompatibel dengan renderUpcomingBanner() di main.js
  async getKegiatanMendatang() {
    const b = await this.getBannerAktif();
    if (!b) return { aktif: false };
    return {
      aktif: true,
      judul:       b.judul    || b['Judul Banner']    || '',
      tanggal:     b.tanggal  || b['Tanggal Acara (YYYY-MM-DD)'] || '',
      waktu:       b.waktu    || b['Waktu (HH:MM)']   || '',
      lokasi:      b.lokasi   || b['Lokasi']           || '',
      deskripsi:   b.keterangan || b['Keterangan Singkat'] || '',
      link_daftar: b.link     || '#',
      teks_tombol: 'Selengkapnya',
    };
  },

  async getKegiatan({ highlight = false, limit = 0 } = {}) {
    const db   = await this._db();
    let rows   = (db?.kegiatan && db.kegiatan.length > 0)
      ? db.kegiatan
      : LOCAL_DATA.kegiatan;

    // Urutkan terbaru dulu
    rows = [...rows].sort((a, b) =>
      new Date(b.tanggal || 0) - new Date(a.tanggal || 0)
    );

    if (highlight) rows = rows.slice(0, 3);
    if (limit > 0) rows = rows.slice(0, limit);

    // Normalisasi key agar renderKegiatanCard() tetap jalan
    return rows.map(k => ({
      id:        k.id       || k.ID,
      judul:     k.judul    || k['Judul Kegiatan'] || '',
      tanggal:   k.tanggal  || k['Tanggal (YYYY-MM-DD)'] || '',
      kategori:  k.kategori || k['Kategori'] || 'Kegiatan',
      lokasi:    k.lokasi   || k['Lokasi']   || '',
      status:    k.status   || k['Status']   || '',
      deskripsi: k.keterangan || k['Deskripsi Singkat'] || k.deskripsi || '',
      foto:      k.foto     || k['URL Foto'] || '',
      highlight: true,
    }));
  },

  async getRanting() {
    const db   = await this._db();
    // Kalau Sheets kosong atau gagal → pakai data lokal
    const rows = (db?.ranting && db.ranting.length > 0)
      ? db.ranting
      : LOCAL_DATA.ranting;

    return rows
      .filter(r => {
        const s = String(r.status || r['Status'] || 'aktif').toLowerCase();
        return s === 'aktif' || s === 'active' || s === '1' || s === 'true';
      })
      .map(r => ({
        id:    r.id    || r.ID,
        nama:  r.nama_ranting || r['Nama Ranting Resmi'] || r.nama || '',
        desa:  r.desa  || r['Nama Desa/Kelurahan'] || '',
        ketua: r.ketua || r['Ketua Ranting'] || '',
        hp:    r.hp    || r['No. HP Ketua']  || '',
        aktif: true,
      }));
  },

  async getPengurusRanting(idRanting) {
    const db   = await this._db();
    // Coba dari pengurus_ranting dulu
    const pr   = db?.pengurus_ranting || [];
    if (pr.length) {
      return pr.filter(p =>
        p.id_ranting === idRanting ||
        p.ranting    === idRanting
      );
    }
    // Fallback: ambil dari data ranting
    const rows = db?.ranting || LOCAL_DATA.ranting;
    const r    = rows.find(x => x.id === idRanting || x.ID === idRanting);
    if (!r) return [];
    const hasil = [];
    if (r.ketua      || r['Ketua Ranting']) hasil.push({ nama: r.ketua || r['Ketua Ranting'], jabatan:'Ketua', foto:'' });
    if (r.sekretaris || r['Sekretaris'])    hasil.push({ nama: r.sekretaris || r['Sekretaris'], jabatan:'Sekretaris', foto:'' });
    if (r.bendahara  || r['Bendahara'])     hasil.push({ nama: r.bendahara  || r['Bendahara'],  jabatan:'Bendahara', foto:'' });
    return hasil;
  },

  async getPengurusPAC({ limit = 0 } = {}) {
    const db   = await this._db();
    const rows = (db?.pengurus && db.pengurus.length > 0)
      ? db.pengurus
      : LOCAL_DATA.pengurus;

    // Urutkan: Pengurus Inti dulu
    const sorted = [...rows].sort((a, b) => {
      const ba = String(a.bidang || a['Bidang/Departemen'] || '');
      const bb = String(b.bidang || b['Bidang/Departemen'] || '');
      if (ba === 'Pengurus Inti' && bb !== 'Pengurus Inti') return -1;
      if (ba !== 'Pengurus Inti' && bb === 'Pengurus Inti') return 1;
      return Number(a.urutan || 99) - Number(b.urutan || 99);
    });

    const hasil = sorted.map((p, i) => {
      const jabatan = String(p.jabatan || p['Jabatan'] || '').toLowerCase();
      let tipe = 'dept';
      if (jabatan.includes('ketua') && !jabatan.includes('wakil') && !jabatan.includes('bidang')) tipe = 'ketua';
      else if (jabatan.includes('wakil ketua')) tipe = 'wk';
      else if (jabatan.includes('sekretaris'))  tipe = 'sekret';
      else if (jabatan.includes('bendahara'))   tipe = 'bendahara';

      return {
        id:         p.id    || p.ID || ('pg' + i),
        nama:       p.nama  || p['Nama Lengkap'] || '',
        jabatan:    p.jabatan || p['Jabatan']     || '',
        departemen: p.bidang  || p['Bidang/Departemen'] || '',
        foto:       p.foto    || p['URL Foto (opsional)'] || '',
        urutan:     Number(p.urutan || i),
        tipe,
      };
    });

    return limit > 0 ? hasil.slice(0, limit) : hasil;
  },

};

/* ============================================================
   HELPERS — sama dengan versi lama, kompatibel dengan main.js
   ============================================================ */

const Fmt = {
  tanggal(str) {
    if (!str) return '';
    const d = new Date(str);
    if (isNaN(d)) return str;
    return d.toLocaleDateString('id-ID', { day:'numeric', month:'long', year:'numeric' });
  },
  inisial(nama) {
    return (nama || '').split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
  },
  slug(str) {
    return (str || '').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  },
};
