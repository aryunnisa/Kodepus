# Kodepus - Tugas 2 FrontendLab

Kodepus adalah prototipe antarmuka platform pencarian kos dan kontrakan. Proyek ini dibuat untuk memenuhi Tugas 2 FrontendLab dengan HTML semantik, CSS murni, dan JavaScript murni tanpa framework.

## Fitur dan komponen

1. **Header dan navigasi utama**
   - Logo Kodepus dan navigasi responsif.
   - Tombol hamburger pada layar kecil.
   - Status menu diumumkan melalui `aria-expanded` dan hubungan tombol-menu melalui `aria-controls`.
   - Menu dapat ditutup dengan tombol `Escape`; fokus dikembalikan ke tombol hamburger.

2. **Kartu properti dan badge verifikasi**
   - Menampilkan nama, lokasi, harga, fasilitas, dan badge "Terverifikasi".
   - Tombol simpan menggunakan `aria-label`, `aria-pressed`, dan `data-id`.
   - Status simpan diperbarui langsung menggunakan JavaScript.

3. **Form filter dan pencarian**
   - Filter lokasi, jenis penghuni (Putra/Putri/Campur), harga maksimal, dan fasilitas.
   - Validasi lokasi, pesan galat, `aria-describedby`, `aria-live="polite"`, dan `aria-invalid`.
   - Form mencegah submit bawaan browser dengan `event.preventDefault()`.
   - Fokus berpindah ke kolom pertama yang mengalami galat.
   - Hasil filter ditampilkan tanpa memuat ulang halaman.

4. **CTA Hubungi Pemilik**
   - Tombol dinonaktifkan selama simulasi proses.
   - `aria-busy="true"` dan teks "Menghubungkan…" ditampilkan saat proses berlangsung.
   - Elemen `role="status"` mengumumkan hasil kepada teknologi bantu.
   - Setelah jeda, tombol aktif kembali.

5. **Footer aksesibel**
   - Menggunakan elemen semantik `<footer>`.
   - Memuat deskripsi platform, tautan navigasi sekunder, dan hak cipta © 2026 Kodepus.
   - Warna teks dan latar dipilih agar kontras dan mudah dibaca.

## Struktur direktori

```text
kodepus/
├── index.html
├── styles.css
├── script.js
└── README.md
```

## Cara menjalankan secara lokal

### Opsi 1: Membuka langsung di browser

1. Unduh atau clone repositori.
2. Pastikan `index.html`, `styles.css`, dan `script.js` berada di folder yang sama.
3. Buka `index.html` menggunakan browser.

### Opsi 2: Menggunakan Visual Studio Code

1. Buka folder proyek `kodepus` di Visual Studio Code.
2. Pasang ekstensi **Live Server** jika belum tersedia.
3. Klik kanan `index.html`.
4. Pilih **Open with Live Server**.

Tidak diperlukan instalasi Node.js, package manager, server backend, atau database untuk menjalankan prototipe ini.

## Penerapan aksesibilitas

- Menggunakan elemen HTML semantik seperti `header`, `nav`, `main`, `section`, `article`, `form`, `fieldset`, `legend`, dan `footer`.
- Tombol navigasi menggunakan `aria-expanded` dan `aria-controls`.
- Tombol favorit menggunakan `aria-label` yang spesifik dan `aria-pressed` untuk menyampaikan status.
- Pesan validasi dihubungkan dengan input melalui `aria-describedby`.
- Input yang tidak valid diberi `aria-invalid="true"`.
- Pesan hasil dan status proses diumumkan melalui `aria-live="polite"` atau `role="status"`.
- Navigasi keyboard mendukung tombol `Escape` untuk menutup menu dan mengembalikan fokus.
- Gaya `:focus-visible` membantu pengguna keyboard mengetahui elemen yang sedang dipilih.
- Media query `prefers-reduced-motion` mengurangi animasi bagi pengguna yang mengaktifkan preferensi tersebut.

## Catatan implementasi

- Data kos pada proyek ini merupakan data contoh untuk demonstrasi frontend.
- Filter lokasi, jenis penghuni, harga, dan fasilitas bekerja pada tiga kartu contoh yang tersedia.
- Fitur simpan kos hanya memperbarui status pada halaman yang sedang dibuka; belum menggunakan database atau penyimpanan permanen.
- Tombol Hubungi Pemilik menjalankan simulasi status memuat. Belum ada integrasi WhatsApp atau backend.
- Untuk mengaktifkan kontak WhatsApp, diperlukan nomor pemilik yang benar dan integrasi tautan WhatsApp yang sesuai.
- Badge "Terverifikasi" pada data contoh merupakan elemen demonstrasi, bukan hasil verifikasi properti sungguhan.

## Teknologi

- HTML5
- CSS3
- Vanilla JavaScript
