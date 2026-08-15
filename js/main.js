/* ============================================================
   GP ANSOR MANYAR — main.js
   Render semua section di index.html
   ============================================================ */

/* ----- NAVBAR scroll effect ----- */
window.addEventListener('scroll', () => {
  document.getElementById('navbar')?.classList.toggle('scrolled', window.scrollY > 40);
});

/* ----- Mobile nav toggle ----- */
document.getElementById('navToggle')?.addEventListener('click', () => {
  document.getElementById('navLinks')?.classList.toggle('open');
});

/* ----- Tahun footer ----- */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ============================================================
   RENDER FUNCTIONS
   ============================================================ */

function renderKategoriIcon(kategori) {
  const map = { 'Keagamaan': '🕌', 'Sosial': '🤝', 'Pelatihan': '📚', 'Organisasi': '🏛️', 'Olahraga': '⚽', 'Seni': '🎭' };
  return map[kategori] || '📌';
}

function renderKegiatanCard(k) {
  const fotoHTML = k.foto
    ? `<img src="${k.foto}" alt="${k.judul}" loading="lazy" />`
    : `<span>${renderKategoriIcon(k.kategori)}</span>`;

  return `
    <article class="kegiatan-card">
      <div class="kegiatan-img">${fotoHTML}</div>
      <div class="kegiatan-body">
        <span class="kegiatan-tag">${k.kategori || 'Kegiatan'}</span>
        <h3 class="kegiatan-title">${k.judul}</h3>
        <p class="kegiatan-desc">${k.deskripsi}</p>
        <div class="kegiatan-meta">
          <span>📅 ${Fmt.tanggal(k.tanggal)}</span>
          <span>📍 ${k.lokasi}</span>
        </div>
      </div>
    </article>`;
}

function renderRantingCard(r) {
  return `
    <a href="pages/ranting.html#${Fmt.slug(r.nama)}" class="ranting-card">
      <div class="ranting-icon">🕌</div>
      <div class="ranting-name">${r.nama}</div>
      <div class="ranting-ketua">Ketua: ${r.ketua}</div>
    </a>`;
}

function renderPengurusCard(p) {
  const inisial = Fmt.inisial(p.nama);
  const avatarHTML = p.foto
    ? `<img src="${p.foto}" alt="${p.nama}" loading="lazy" />`
    : inisial;

  return `
    <div class="pengurus-card ${p.tipe || ''}">
      <div class="pengurus-avatar">${avatarHTML}</div>
      <div class="pengurus-jabatan">${p.jabatan}</div>
      <div class="pengurus-nama">${p.nama}</div>
      ${p.departemen && p.tipe === 'dept' ? `<div class="pengurus-periode">${p.departemen}</div>` : ''}
    </div>`;
}

function renderUpcomingBanner(k) {
  if (!k || !k.aktif) {
    document.getElementById('upcoming-banner').style.display = 'none';
    return;
  }
  document.getElementById('upcomingContent').innerHTML = `
    <div class="upcoming-label">📢 Kegiatan Mendatang</div>
    <div class="upcoming-content">
      <div class="upcoming-info">
        <div class="upcoming-title">${k.judul}</div>
        <div class="upcoming-meta">
          <span>📅 ${Fmt.tanggal(k.tanggal)}${k.waktu ? ' · ' + k.waktu : ''}</span>
          <span>📍 ${k.lokasi}</span>
        </div>
      </div>
      <div class="upcoming-cta">
        <a href="${k.link_daftar || '#'}" class="btn btn-gold">${k.teks_tombol || 'Selengkapnya'}</a>
      </div>
    </div>`;
}

function renderProfil(p) {
  const s = el => document.getElementById(el);
  if (s('jmlRanting') && p.jumlah_ranting) s('jmlRanting').textContent = p.jumlah_ranting;
  if (s('jmlAnggota') && p.jumlah_anggota) s('jmlAnggota').textContent = p.jumlah_anggota;
  if (s('jmlKegiatan') && p.jumlah_kegiatan) s('jmlKegiatan').textContent = p.jumlah_kegiatan;

  const waEl = document.getElementById('footerWa');
  const igEl = document.getElementById('footerIg');
  const fbEl = document.getElementById('footerFb');
  if (waEl && p.whatsapp) waEl.href = `https://wa.me/${p.whatsapp}`;
  if (igEl && p.instagram) igEl.href = p.instagram;
  if (fbEl && p.facebook) fbEl.href = p.facebook;
}

/* ============================================================
   INIT — jalankan semua render
   ============================================================ */

async function init() {
  try {
    // Jalankan paralel agar cepat
    const [profil, mendatang, kegiatan, ranting, pengurusPAC] = await Promise.all([
      AnsorData.getProfil(),
      AnsorData.getKegiatanMendatang(),
      AnsorData.getKegiatan({ highlight: true, limit: 3 }),
      AnsorData.getRanting(),
      AnsorData.getPengurusPAC({ limit: 8 }),
    ]);

    // Render masing-masing section
    renderProfil(profil);
    renderUpcomingBanner(mendatang);

    const kegEl = document.getElementById('kegiatanGrid');
    if (kegEl) {
      kegEl.innerHTML = kegiatan.length
        ? kegiatan.map(renderKegiatanCard).join('')
        : '<p style="color:var(--gray-400);text-align:center;grid-column:1/-1">Belum ada kegiatan.</p>';
    }

    const rantEl = document.getElementById('rantingStrip');
    if (rantEl) {
      rantEl.innerHTML = ranting.length
        ? ranting.map(renderRantingCard).join('')
        : '<p style="color:var(--gray-400);text-align:center;grid-column:1/-1">Belum ada data ranting.</p>';
    }

    const pgEl = document.getElementById('pengurusPreview');
    if (pgEl) {
      // Hanya tampilkan pimpinan inti (bukan dept) di preview
      const inti = pengurusPAC.filter(p => p.tipe !== 'dept').slice(0, 8);
      pgEl.innerHTML = inti.length
        ? inti.map(renderPengurusCard).join('')
        : '<p style="color:var(--gray-400);text-align:center;grid-column:1/-1">Belum ada data pengurus.</p>';
    }

  } catch (err) {
    console.error('[GP Ansor] Init error:', err);
  }
}

// Jalankan saat DOM siap
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
