# Pustaka Digital Pribadi 📚

## Description

Pustaka Digital Pribadi adalah sebuah aplikasi web modern dan responsif yang berfungsi sebagai katalog untuk mengelola dan melacak koleksi buku pribadi. Proyek ini dikembangkan sebagai *Single Page Application* (SPA) yang berjalan sepenuhnya di sisi klien (browser), memastikan kecepatan, privasi, dan aksesibilitas bahkan saat offline. Semua data disimpan secara lokal di browser pengguna menggunakan `localStorage`, menghilangkan kebutuhan akan *database* atau *backend*.

## Technologies Used

  * **HTML5:** Membangun struktur dokumen yang semantik dan aksesibel.
    
  * **CSS3:** Mendesain antarmuka yang modern dan responsif menggunakan Flexbox dan Grid, serta animasi untuk interaksi yang lebih hidup.
    
  * **JavaScript (ES6+):** Menjadi inti dari semua logika aplikasi, ditulis dengan pendekatan berbasis kelas (OOP) untuk kode yang lebih terstruktur, modular, dan mudah dikelola.
    
  * **Web Storage API (`localStorage`):** Menyimpan semua data buku dan preferensi pengguna secara persisten di browser.

## Features

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
      * **Ekspor & Impor Data:** Mencadangkan dan memulihkan seluruh koleksi buku melalui file `.json`.
      * **Target Membaca:** Menetapkan target baca bulanan dan melacak progresnya secara visual.
      * **Dasbor Statistik:** Melihat ringkasan data seperti total buku, jumlah buku selesai, dan total halaman yang telah dibaca.
      * **Antarmuka Modern:** Dilengkapi *scroll lock* saat modal aktif untuk pengalaman pengguna yang lebih mulus.

## Setup Instructions

Navigasi ke dalam folder proyek yang telah diunduh, lalu buka langsung file `index.html` menggunakan browser modern seperti Google Chrome atau Mozilla Firefox. Tidak ada proses *build* atau dependensi yang diperlukan untuk menjalankan aplikasi ini.


## AI Support Explanation

Dalam pengembangan proyek ini, IBM Granite digunakan sebagai **asisten pengembangan** untuk meningkatkan efisiensi dan kualitas kode. Berikut adalah cara penggunaannya:

  * **Code Generation:** AI digunakan untuk menghasilkan HTML dan struktur dasar CSS yang terbukti dapat mempercepat fase setup awal proyek.
    
  * **Logic & Algorithm Assistance:** Saat merancang fungsi untuk menyimpan dan memuat data dari `localStorage`, AI dikonsultasikan untuk mendapatkan praktik terbaik dalam serialisasi dan deserialisasi data.
    
  * **Debugging:** AI membantu mengidentifikasi dan menyelesaikan *bug* dengan cepat, seperti saat memperbaiki *bug* di mana status buku tidak diperbarui dengan benar.
    
  * **Code Refactoring:** Setelah fungsionalitas dasar selesai, AI digunakan untuk me-*refactor* kode agar lebih modular.


Website ini dapat diakses pada link berikut: `https://personal-digital-library.netlify.app/`
