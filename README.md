# 📚 Pustaka Digital Pribadi

Sebuah aplikasi web modern dan responsif yang berfungsi sebagai katalog untuk mengelola dan melacak koleksi buku pribadi. Proyek ini merupakan pengembangan web front-end, khususnya operasi CRUD (Create, Read, Update, Delete) yang ditingkatkan dengan fitur-fitur modern untuk pengalaman pengguna yang lebih baik.

-----

## ✨ Fitur Unggulan

Aplikasi ini mengimplementasikan fungsionalitas CRUD secara lengkap dengan berbagai peningkatan:

  * **Tambah Buku (Create):** Menambahkan data buku baru melalui *modal popup* yang interaktif, dilengkapi dengan validasi input untuk memastikan integritas data.
    
  * **Baca & Cari Buku (Read):**
      * Menampilkan koleksi buku dalam format kartu yang menarik.
      * **Pencarian Real-time:** Menemukan buku secara instan berdasarkan judul, penulis, atau kategori.
      * **Filter Lanjutan:** Menyaring buku berdasarkan status (Semua, Sedang Dibaca, Selesai) atau berdasarkan kategori spesifik.
        
  * **Perbarui Data (Update):**
      * Memperbarui progres membaca halaman secara langsung pada kartu buku.
      * Menandai buku sebagai "Selesai Dibaca" dengan satu klik.
      * **Fitur Edit:** Mengubah semua detail buku (judul, penulis, dll.) melalui *modal popup* yang intuitif.
        
  * **Hapus Buku (Delete):** Menghapus buku dari koleksi dengan aman menggunakan dialog konfirmasi untuk mencegah kehilangan data yang tidak disengaja.
    
  * **Fitur Tambahan:**
      * **Ekspor & Impor Data:** Mencadangkan dan memulihkan seluruh koleksi buku melalui file `.json`, memungkinkan transfer data antar perangkat.
      * **Target Membaca:** Menetapkan target baca bulanan dan melacak progresnya secara visual.
      * **Dasbor Statistik:** Melihat ringkasan data seperti total buku, jumlah buku selesai, dan total halaman yang telah dibaca.

-----

## 🛠️ Teknologi & Arsitektur

  * **HTML5:** Membangun struktur dokumen yang semantik dan aksesibel.
  * **CSS3:** Mendesain antarmuka yang modern dan responsif menggunakan Flexbox dan Grid, serta animasi untuk interaksi yang lebih hidup.
  * **JavaScript (ES6+):** Menjadi inti dari semua logika aplikasi, ditulis dengan pendekatan **berbasis kelas (OOP)** untuk kode yang lebih terstruktur, modular, dan mudah dikelola.
  * **Web Storage API (`localStorage`):** Menyimpan semua data buku dan preferensi pengguna secara persisten di browser.
