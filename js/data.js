// ============================================================
//  GP ANSOR MANYAR — Data Layer
//  Mengambil dan menyimpan cache data dari Google Sheets
// ============================================================

const DB = {
  _cache : null,
  _time  : 0,

  // Ambil semua data (dengan cache)
  async getAll() {
    const now     = Date.now();
    const maxAge  = CONFIG.CACHE_MENIT * 60 * 1000;

    if (this._cache && (now - this._time) < maxAge) {
      return this._cache;
    }

    try {
      const res  = await fetch(CONFIG.GAS_URL + '?action=readAll');
      const json = await res.json();
      if (!json.ok) throw new Error(json.error);

      this._cache = json.data;
      this._time  = now;
      return this._cache;
    } catch (e) {
      console.warn('Gagal fetch data:', e.message);
      // Kembalikan cache lama jika ada, atau data kosong
      return this._cache || {
        profil: {}, kegiatan: [], banner: [], ranting: [], pengurus: []
      };
    }
  },

  // Invalidate cache (setelah upsert/delete)
  clear() {
    this._cache = null;
    this._time  = 0;
  },

  // ── ADMIN API ─────────────────────────────────────────────
  async post(body) {
    const token = sessionStorage.getItem('ansor_token');
    if (token) body.token = token;

    const res  = await fetch(CONFIG.GAS_URL, {
      method : 'POST',
      body   : JSON.stringify(body),
    });
    const json = await res.json();
    if (!json.ok) throw new Error(json.error);
    return json.data;
  },

async login(username, password) {
  const res  = await fetch(CONFIG.GAS_URL, {
    method : 'POST',
    body   : JSON.stringify({ action: 'login', username, password }),
  });
  const json = await res.json();
  if (!json.ok) throw new Error(json.error);
  return json.data;
},

  async upsert(sheet, data) {
    const result = await this.post({ action: 'upsert', sheet, data });
    this.clear();
    return result;
  },

  async hapus(sheet, id) {
    const result = await this.post({ action: 'delete', sheet, id });
    this.clear();
    return result;
  },

  async saveProfil(data) {
    const result = await this.post({ action: 'saveProfil', data });
    this.clear();
    return result;
  },

  async gantiPassword(newPassword) {
    return await this.post({ action: 'changePass', newPassword });
  },
};

// Helper generate ID unik
function buatID(prefix) {
  return prefix.toUpperCase() + Date.now().toString(36).toUpperCase();
}
