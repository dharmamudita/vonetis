# XATRA WORKS

Project platform digital serbaguna yang terdiri dari **Frontend (Next.js 16)** dan **Backend (Laravel 12 Chat API)**.

---

## 📁 Struktur Direktori

```
XATRA WORKS/
├── frontend/        # Next.js 16 App Router (Turbopack, Framer Motion, Firebase)
└── backend/         # Laravel 12 Chat & Reverb WebSocket API
```

---

## 🚀 Panduan Deploy di Vercel

Karena repository ini memuat `frontend` dan `backend`, ikuti langkah mudah berikut saat deploy ke Vercel:

1. Buka [Vercel Dashboard](https://vercel.com/new).
2. Pilih repository **`dharmamudita/xatra-works`** dan klik **Import**.
3. Di bagian **Configure Project**:
   - Cari baris **Root Directory** dan klik **Edit**.
   - Pilih folder **`frontend`** lalu klik **Continue**.
4. Di bagian **Environment Variables**, tambahkan konfigurasi Firebase dan variabel yang ada pada file `.env.local.example`.
5. Klik **Deploy**!
