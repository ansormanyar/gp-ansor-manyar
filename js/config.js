/* ============================================================
   GP ANSOR MANYAR — Site Config
   Sesuaikan BASE_URL dengan nama repository GitHub kamu
   ============================================================ */

const SITE = {
  // Nama repository GitHub (persis seperti di github.com/user/NAMA_INI)
  // Contoh: jika URL website kamu https://user.github.io/gp-ansor-manyar/
  // maka isi: 'gp-ansor-manyar'
  // Jika pakai custom domain (misal ansormanyar.org), isi: ''
  REPO: 'gp-ansor-manyar',

  get BASE() {
    if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') return '';
    return this.REPO ? `/${this.REPO}` : '';
  },

  // Nama website
  NAMA: 'GP Ansor Manyar',
  TAGLINE: 'PAC Kec. Manyar · Kab. Gresik',

  // Warna tema (untuk meta theme-color)
  THEME_COLOR: '#1a7a3c',
};
