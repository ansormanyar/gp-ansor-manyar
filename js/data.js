/* ============================================================
   GP ANSOR MANYAR — Data Layer v2.0
   Terhubung ke Google Apps Script sebagai backend
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
    periode_kepengurusan: '2023–2026',
    tagline: 'Bergerak Bersama, Membangun Bangsa.',
    visi: 'Terwujudnya Gerakan Pemuda Ansor Manyar yang tangguh, mandiri, dan berdaya guna bagi masyarakat.',
    misi_1: 'Memperkuat kaderisasi dan pembinaan anggota secara berkelanjutan',
    misi_2: 'Mendorong partisipasi aktif pemuda dalam kehidupan sosial dan keagamaan',
    misi_3: 'Menjaga nilai-nilai Ahlussunnah wal Jamaah An-Nahdliyah',
    stat_ranting: '12',
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
    {
      ID: 'KG001',
      'Judul Kegiatan': 'Khataman Al-Qur\'an Menyambut HUT RI',
      'Tanggal (YYYY-MM-DD)': '2025-08-10',
      'Kategori': 'Keagamaan',
      'Lokasi': 'Masjid Agung Manyar',
      'Status': 'Selesai',
      'Deskripsi Singkat': 'Khataman Al-Qur\'an 30 juz bersama anggota Ansor dan Banser se-kecamatan Manyar.',
      'URL Foto': '',
    },
    {
      ID: 'KG002',
      'Judul Kegiatan': 'Bakti Sosial & Donor Darah di JIIPE',
      'Tanggal (YYYY-MM-DD)': '2025-07-28',
      'Kategori': 'Sosial',
      'Lokasi': 'Kawasan JIIPE, Manyar',
      'Status': 'Selesai',
      'Deskripsi Singkat': 'Donor darah dan pembagian sembako untuk pekerja dan warga sekitar kawasan industri JIIPE.',
      'URL Foto': '',
    },
    {
      ID: 'KG003',
      'Judul Kegiatan': 'Pelatihan Digital Marketing Pemuda Ansor',
      'Tanggal (YYYY-MM-DD)': '2025-07-10',
      'Kategori': 'Pelatihan',
      'Lokasi': 'Aula Kantor Kecamatan Manyar',
      'Status': 'Selesai',
      'Deskripsi Singkat': 'Workshop digital marketing bagi anggota GP Ansor Manyar untuk pemberdayaan ekonomi pemuda.',
      'URL Foto': '',
    },
  ],

  banner: [
    {
      ID: 'BN001',
      'Judul Banner': 'Pelantikan & Konsolidasi Anggota Baru',
      'Keterangan Singkat': 'GP Ansor Manyar · Terbuka untuk Pemuda Nahdliyin',
      'Tanggal Acara (YYYY-MM-DD)': '2025-09-15',
      'Waktu (HH:MM)': '08:00',
      'Lokasi': 'Pendopo Kecamatan Manyar',
      'Status': 'Aktif',
    },
  ],

  ranting: [
    { ID:'RT001','Nama Desa/Kelurahan':'Desa Manyar Sidomukti','Nama Ranting Resmi':'PR GP Ansor Manyar','Ketua Ranting':'Ahmad Fauzi','No. HP Ketua':'','Sekretaris':'','Bendahara':'','Jumlah Anggota':'45','Tahun Berdiri':'2013','Status':'Aktif','Keterangan':'' },
    { ID:'RT002','Nama Desa/Kelurahan':'Desa Roomo','Nama Ranting Resmi':'PR GP Ansor Roomo','Ketua Ranting':'M. Habibi','No. HP Ketua':'','Sekretaris':'','Bendahara':'','Jumlah Anggota':'38','Tahun Berdiri':'2014','Status':'Aktif','Keterangan':'' },
    { ID:'RT003','Nama Desa/Kelurahan':'Desa Leran','Nama Ranting Resmi':'PR GP Ansor Leran','Ketua Ranting':'Syaifuddin','No. HP Ketua':'','Sekretaris':'','Bendahara':'','Jumlah Anggota':'42','Tahun Berdiri':'2012','Status':'Aktif','Keterangan':'' },
    { ID:'RT004','Nama Desa/Kelurahan':'Desa Sukomulyo','Nama Ranting Resmi':'PR GP Ansor Sukomulyo','Ketua Ranting':'Abdul Ghofur','No. HP Ketua':'','Sekretaris':'','Bendahara':'','Jumlah Anggota':'50','Tahun Berdiri':'2011','Status':'Aktif','Keterangan':'' },
    { ID:'RT005','Nama Desa/Kelurahan':'Desa Yosowilangun','Nama Ranting Resmi':'PR GP Ansor Yosowilangun','Ketua Ranting':'Hendra Saputra','No. HP Ketua':'','Sekretaris':'','Bendahara':'','Jumlah Anggota':'35','Tahun Berdiri':'2015','Status':'Aktif','Keterangan':'' },
    { ID:'RT006','Nama Desa/Kelurahan':'Desa Banyuwangi','Nama Ranting Resmi':'PR GP Ansor Banyuwangi','Ketua Ranting':'Rudi Hartono','No. HP Ketua':'','Sekretaris':'','Bendahara':'','Jumlah Anggota':'40','Tahun Berdiri':'2014','Status':'Aktif','Keterangan':'' },
    { ID:'RT007','Nama Desa/Kelurahan':'Desa Betiting','Nama Ranting Resmi':'PR GP Ansor Betiting','Ketua Ranting':'Zainul Arifin','No. HP Ketua':'','Sekretaris':'','Bendahara':'','Jumlah Anggota':'33','Tahun Berdiri':'2016','Status':'Aktif','Keterangan':'' },
    { ID:'RT008','Nama Desa/Kelurahan':'Desa Pongangan','Nama Ranting Resmi':'PR GP Ansor Pongangan','Ketua Ranting':'M. Khoirul Anwar','No. HP Ketua':'','Sekretaris':'','Bendahara':'','Jumlah Anggota':'28','Tahun Berdiri':'2017','Status':'Aktif','Keterangan':'' },
    { ID:'RT009','Nama Desa/Kelurahan':'Desa Sumberrejo','Nama Ranting Resmi':'PR GP Ansor Sumberrejo','Ketua Ranting':'Agus Salim','No. HP Ketua':'','Sekretaris':'','Bendahara':'','Jumlah Anggota':'36','Tahun Berdiri':'2013','Status':'Aktif','Keterangan':'' },
    { ID:'RT010','Nama Desa/Kelurahan':'Desa Peganden','Nama Ranting Resmi':'PR GP Ansor Peganden','Ketua Ranting':'Wahyu Hidayat','No. HP Ketua':'','Sekretaris':'','Bendahara':'','Jumlah Anggota':'31','Tahun Berdiri':'2015','Status':'Aktif','Keterangan':'' },
    { ID:'RT011','Nama Desa/Kelurahan':'Desa Sembayat','Nama Ranting Resmi':'PR GP Ansor Sembayat','Ketua Ranting':'Fathur Rahman','No. HP Ketua':'','Sekretaris':'','Bendahara':'','Jumlah Anggota':'44','Tahun Berdiri':'2012','Status':'Aktif','Keterangan':'' },
    { ID:'RT012','Nama Desa/Kelurahan':'Desa Manyarejo','Nama Ranting Resmi':'PR GP Ansor Manyarejo','Ketua Ranting':'Lukman Hakim','No. HP Ketua':'','Sekretaris':'','Bendahara':'','Jumlah Anggota':'39','Tahun Berdiri':'2014','Status':'Aktif','Keterangan':'' },
  ],

  pengurus: [
    { ID:'PG001','Nama Lengkap':'H. Abdullah Mas\'ud','Jabatan':'Ketua','Bidang/Departemen':'Pengurus Inti','No. HP':'','Periode':'2023–2026','Asal Ranting/Desa':'','URL Foto (opsional)':'' },
    { ID:'PG002','Nama Lengkap':'M. Syaifullah','Jabatan':'Wakil Ketua I','Bidang/Departemen':'Pengurus Inti','No. HP':'','Periode':'2023–2026','Asal Ranting/Desa':'','URL Foto (opsional)':'' },
    { ID:'PG003','Nama Lengkap':'Agus Wahyudi','Jabatan':'Wakil Ketua II','Bidang/Departemen':'Pengurus Inti','No. HP':'','Periode':'2023–2026','Asal Ranting/Desa':'','URL Foto (opsional)':'' },
    { ID:'PG004','Nama Lengkap':'M. Iqbal Fauzi','Jabatan':'Sekretaris','Bidang/Departemen':'Pengurus Inti','No. HP':'','Periode':'2023–2026','Asal Ranting/Desa':'','URL Foto (opsional)':'' },
    { ID:'PG005','Nama Lengkap':'Khoirul Umam','Jabatan':'Bendahara','Bidang/Departemen':'Pengurus Inti','No. HP':'','Periode':'2023–2026','Asal Ranting/Desa':'','URL Foto (opsional)':'' },
    { ID:'PG006','Nama Lengkap':'Imam Syafi\'i','Jabatan':'Ketua Bidang','Bidang/Departemen':'Kaderisasi','No. HP':'','Periode':'2023–2026','Asal Ranting/Desa':'','URL Foto (opsional)':'' },
    { ID:'PG007','Nama Lengkap':'Fathul Bari','Jabatan':'Ketua Bidang','Bidang/Departemen':'Dakwah & Pengembangan Agama','No. HP':'','Periode':'2023–2026','Asal Ranting/Desa':'','URL Foto (opsional)':'' },
    { ID:'PG008','Nama Lengkap':'Yusuf Hidayatullah','Jabatan':'Ketua Bidang','Bidang/Departemen':'Informasi & Komunikasi','No. HP':'','Periode':'2023–2026','Asal Ranting/Desa':'','URL Foto (opsional)':'' },
  ],

};

/* ============================================================
   CACHE — sessionStorage agar tidak fetch berulang
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
};

/* ============================================================
   SHEETS FETCHER — satu call readAll untuk semua data
   ============================================================ */

const SheetsDB = {
  _all: null,

  async fetchAll() {
    if (this._all) return this._all;

    const cached = Cache.get('all');
    if (cached) { this._all = cached; return cached; }

    try {
      const url  = CONFIG.APPS_SCRIPT_URL + '?action=readAll';
      const res  = await fetch(url);
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const json = await res.json();
      if (json.error) throw new Error(json.error);

      // Simpan dalam format yang mudah diakses
      const result = {
        profil:   json.profil?.data   || {},
        kegiatan: json.kegiatan?.data || [],
        banner:   json.banner?.data   || [],
        ranting:  json.ranting?.data  || [],
        pengurus: json.pengurus?.data || [],
      };

      Cache.set('all', result);
      this._all = result;
      return result;

    } catch (err) {
      console.warn('[GP Ansor] Gagal fetch dari Sheets, pakai data lokal:', err.message);
      return null;
    }
  },
};

/* ============================================================
   AnsorData — API yang dipakai oleh main.js dan halaman lain
   ============================================================ */

const AnsorData = {

  async _db() {
    return await SheetsDB.fetchAll();
  },

  async getProfil() {
    const db = await this._db();
    const p  = db?.profil || {};
    // Jika ada data dari Sheets, pakai. Kalau tidak, fallback lokal.
    return Object.keys(p).length > 2 ? p : LOCAL_DATA.profil;
  },

  // Banner mendatang — ambil yang Status=Aktif, paling dekat tanggalnya
  async getBannerAktif() {
    const db      = await this._db();
    const banners = db?.banner || LOCAL_DATA.banner;
    const aktif   = banners
      .filter(b => b['Status'] === 'Aktif')
      .sort((a, b) => new Date(a['Tanggal Acara (YYYY-MM-DD)']) - new Date(b['Tanggal Acara (YYYY-MM-DD)']));
    return aktif[0] || null;
  },

  // Kompatibilitas dengan main.js lama
  async getKegiatanMendatang() {
    const banner = await this.getBannerAktif();
    if (!banner) return { aktif: false };
    return {
      aktif: true,
      judul: banner['Judul Banner'],
      tanggal: banner['Tanggal Acara (YYYY-MM-DD)'],
      waktu: banner['Waktu (HH:MM)'],
      lokasi: banner['Lokasi'],
      deskripsi: banner['Keterangan Singkat'],
      link_daftar: '#',
      teks_tombol: 'Selengkapnya',
    };
  },

  async getKegiatan({ highlight = false, limit = 0 } = {}) {
    const db   = await this._db();
    let data   = db?.kegiatan || LOCAL_DATA.kegiatan;

    // Urutkan terbaru dulu
    data = [...data].sort((a, b) =>
      new Date(b['Tanggal (YYYY-MM-DD)'] || b.tanggal || 0) -
      new Date(a['Tanggal (YYYY-MM-DD)'] || a.tanggal || 0)
    );

    // highlight: ambil 3 teratas (belum ada kolom highlight di sheet baru)
    if (highlight) data = data.slice(0, 3);
    if (limit > 0) data = data.slice(0, limit);

    // Normalisasi key agar main.js lama tetap bisa pakai
    return data.map(k => ({
      id:         k.ID          || k.id,
      judul:      k['Judul Kegiatan'] || k.judul,
      tanggal:    k['Tanggal (YYYY-MM-DD)'] || k.tanggal,
      kategori:   k['Kategori'] || k.kategori || 'Kegiatan',
      lokasi:     k['Lokasi']   || k.lokasi,
      status:     k['Status']   || k.status,
      deskripsi:  k['Deskripsi Singkat'] || k.deskripsi,
      foto:       k['URL Foto'] || k.foto || '',
      highlight:  true,
    }));
  },

  async getRanting() {
    const db   = await this._db();
    const data = db?.ranting || LOCAL_DATA.ranting;

    return data
      .filter(r => (r['Status'] || r.status || r.aktif) === 'Aktif' || r.aktif === true)
      .map(r => ({
        id:     r.ID   || r.id,
        nama:   r['Nama Ranting Resmi'] || r.nama,
        desa:   r['Nama Desa/Kelurahan'] || r.desa,
        ketua:  r['Ketua Ranting'] || r.ketua,
        hp:     r['No. HP Ketua'] || '',
        aktif:  true,
      }));
  },

  async getPengurusRanting(idRanting) {
    const db   = await this._db();
    const data = db?.ranting || LOCAL_DATA.ranting;
    const r    = data.find(x => x.ID === idRanting || x.id === idRanting);
    if (!r) return [];
    const hasil = [];
    if (r['Ketua Ranting'])  hasil.push({ nama: r['Ketua Ranting'],  jabatan: 'Ketua' });
    if (r['Sekretaris'])     hasil.push({ nama: r['Sekretaris'],     jabatan: 'Sekretaris' });
    if (r['Bendahara'])      hasil.push({ nama: r['Bendahara'],      jabatan: 'Bendahara' });
    return hasil;
  },

  async getPengurusPAC({ limit = 0 } = {}) {
    const db   = await this._db();
    const data = db?.pengurus || LOCAL_DATA.pengurus;

    // Urutan: Pengurus Inti dulu, lalu bidang lain
    const urutan = { 'Pengurus Inti': 0 };
    const sorted = [...data].sort((a, b) => {
      const ba = a['Bidang/Departemen'] || '';
      const bb = b['Bidang/Departemen'] || '';
      return (urutan[ba] ?? 1) - (urutan[bb] ?? 1);
    });

    const hasil = sorted.map((p, i) => ({
      id:          p.ID || ('pg' + i),
      nama:        p['Nama Lengkap'] || p.nama,
      jabatan:     p['Jabatan']      || p.jabatan,
      departemen:  p['Bidang/Departemen'] || p.departemen,
      foto:        p['URL Foto (opsional)'] || p.foto || '',
      urutan:      i,
      // tipe untuk renderPengurusCard di main.js lama
      tipe: (() => {
        const j = (p['Jabatan'] || '').toLowerCase();
        if (j.includes('ketua') && !j.includes('wakil') && !j.includes('bidang')) return 'ketua';
        if (j.includes('wakil ketua')) return 'wk';
        if (j.includes('sekretaris')) return 'sekret';
        if (j.includes('bendahara')) return 'bendahara';
        return 'dept';
      })(),
    }));

    return limit > 0 ? hasil.slice(0, limit) : hasil;
  },

};

/* ============================================================
   HELPERS — sama persis dengan versi lama
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
