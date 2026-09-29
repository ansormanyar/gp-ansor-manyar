// ============================================================
//  GP ANSOR MANYAR — Konfigurasi Website
//  Hanya file ini yang perlu diubah setelah deploy Apps Script
// ============================================================

const CONFIG = {
  // ── WAJIB DIISI SETELAH DEPLOY APPS SCRIPT ──────────────
  // Paste URL /exec dari Google Apps Script deployment di sini
  GAS_URL: 'https://script.google.com/macros/s/AKfycbxmCuBxa4vPGFEXOxkuFE-QRQhnnyhLGqS86UasBxcTLueffdC3_2zp3bJZr-pklx7tBA/exec',

  // ── GITHUB PAGES ────────────────────────────────────────
  // Nama repository GitHub (persis seperti di github.com/user/NAMA_INI)
  // Kosongkan jika pakai custom domain
  REPO: 'gp-ansor-manyar',

  get BASE() {
    if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') return '';
    return this.REPO ? '/' + this.REPO : '';
  },

  // ── INFO WEBSITE ─────────────────────────────────────────
  NAMA       : 'GP Ansor Manyar',
  TAGLINE    : 'PAC Kec. Manyar · Kab. Gresik',
  THEME_COLOR: '#1a7a3c',

  // ── CACHE ────────────────────────────────────────────────
  // Durasi cache data publik (menit) — agar tidak terlalu sering hit Sheets
  CACHE_MENIT: 10,
};
