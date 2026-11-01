/**
 * Utility functions for VONETIS
 */
import { FileText, MonitorPlay, Trophy, FileBadge, GraduationCap, Video, Camera, Sparkles, Film } from 'lucide-react';

/**
 * Brand identity
 */
export const BRAND_NAME = 'VONETIS';
export const BRAND_COLOR = '#0284c7'; // Ocean Blue (Biru Laut)
export const BRAND_GRADIENT = 'linear-gradient(135deg, #0369a1, #0284c7)'; // Deep Ocean -> Vibrant Ocean

/**
 * WhatsApp contact (semua chat & pesanan diarahkan ke sini)
 */
export const WHATSAPP_NUMBER = '628973207214';
export const WHATSAPP_DISPLAY = '+62 897-3207-214';

/**
 * Social Media URLs
 */
export const INSTAGRAM_URL = 'https://www.instagram.com/vonetisofficial';
export const TIKTOK_URL = 'https://www.tiktok.com/@vonetisofficial';

/**
 * Build a wa.me link with optional pre-filled message
 * @param {string} [message]
 * @returns {string}
 */
export function waLink(message = '') {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/**
 * Format Indonesian Rupiah
 * @param {number} amount
 * @returns {string}
 */
export function formatRupiah(amount) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format date to Indonesian locale
 * @param {Date|string} date
 * @returns {string}
 */
export function formatDate(date) {
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));
}

/**
 * Format relative time (e.g., "2 jam lalu")
 * @param {Date|string} date
 * @returns {string}
 */
export function formatRelativeTime(date) {
  const now = new Date();
  const past = new Date(date);
  const diffMs = now - past;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) return 'Baru saja';
  if (diffMin < 60) return `${diffMin} menit lalu`;
  if (diffHour < 24) return `${diffHour} jam lalu`;
  if (diffDay < 7) return `${diffDay} hari lalu`;
  return formatDate(date);
}

/**
 * Slugify a string
 * @param {string} text
 * @returns {string}
 */
export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Truncate text with ellipsis
 * @param {string} text
 * @param {number} maxLength
 * @returns {string}
 */
export function truncate(text, maxLength = 100) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

/**
 * Generate a random ID
 * @returns {string}
 */
export function generateId() {
  return Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
}

/**
 * Debounce function
 * @param {Function} func
 * @param {number} delay
 * @returns {Function}
 */
export function debounce(func, delay = 300) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

/**
 * Service categories data
 */
export const services = [
  {
    id: 'tugas-kuliah',
    slug: 'tugas-kuliah',
    title: 'Tugas Kuliah & Pelajaran',
    shortDesc: 'Bantuan pengerjaan semua mata kuliah dan pelajaran sekolah',
    icon: <FileText size={24} />,
    color: BRAND_COLOR,
    gradient: BRAND_GRADIENT,
    features: ['Semua Mata Kuliah', 'Tepat Waktu', 'Original & Anti Plagiat', 'Revisi Gratis'],
    priceStart: 50000,
    options: [
      { name: 'Revisi Tugas', price: 50000 },
      { name: 'Buat / Kerjakan Baru', price: 100000 },
      { name: 'Konsultasi & Tutor Private', price: 75000 }
    ]
  },
  {
    id: 'website-aplikasi',
    slug: 'website-aplikasi',
    title: 'Website & Aplikasi Fullstack',
    shortDesc: 'Pembuatan website dan aplikasi dari nol sampai jadi, full responsive',
    icon: <MonitorPlay size={24} />,
    color: BRAND_COLOR,
    gradient: BRAND_GRADIENT,
    features: ['Full Responsive', 'Backend + Frontend', 'Database', 'Deploy & Hosting'],
    priceStart: 100000,
    options: [
      { name: 'Perbaikan Bug / Error', price: 100000 },
      { name: 'Tambah Fitur Kustom', price: 250000 },
      { name: 'Buat Website Baru (Fullstack)', price: 500000 }
    ]
  },
  {
    id: 'turnamen-nasional',
    slug: 'turnamen-nasional',
    title: 'Turnamen Tingkat Nasional',
    shortDesc: 'Proposal dan presentasi untuk kompetisi tingkat nasional',
    icon: <Trophy size={24} />,
    color: BRAND_COLOR,
    gradient: BRAND_GRADIENT,
    features: ['Proposal Lengkap', 'PPT Profesional', 'Riset Mendalam', 'Strategi Menang'],
    priceStart: 50000,
    options: [
      { name: 'Review & Revisi Proposal', price: 50000 },
      { name: 'Desain PPT Profesional', price: 100000 },
      { name: 'Buat Proposal Lengkap (Dari Nol)', price: 200000 }
    ]
  },
  {
    id: 'laporan-pkl-magang-kkn',
    slug: 'laporan-pkl-magang-kkn',
    title: 'Laporan PKL/Magang/KKN',
    shortDesc: 'Penulisan laporan praktik kerja dan KKN yang lengkap & profesional',
    icon: <FileBadge size={24} />,
    color: BRAND_COLOR,
    gradient: BRAND_GRADIENT,
    features: ['Format Standar', 'BAB Lengkap', 'Lampiran', 'Revisi Unlimited'],
    priceStart: 15000,
    options: [
      { name: 'Rapihin Format (Layouting)', price: 15000 },
      { name: 'Susun Kata / Proofreading', price: 35000 },
      { name: 'Revisi Konten / BAB', price: 50000 },
      { name: 'Buat Laporan Baru (Full)', price: 300000 }
    ]
  },
  {
    id: 'skripsi',
    slug: 'skripsi',
    title: 'Skripsi & Thesis',
    shortDesc: 'Bantuan penelitian dan penulisan skripsi dari awal sampai sidang',
    icon: <GraduationCap size={24} />,
    color: BRAND_COLOR,
    gradient: BRAND_GRADIENT,
    features: ['Bab 1-5 Lengkap', 'Anti Plagiat', 'Bimbingan', 'Revisi Sampai ACC'],
    priceStart: 15000,
    options: [
      { name: 'Rapihin Format / Margin', price: 15000 },
      { name: 'Susun Kata & Parafrase Anti Plagiat', price: 50000 },
      { name: 'Revisi Per Bab', price: 100000 },
      { name: 'Bimbingan & Buat Full (Bab 1-5)', price: 1000000 }
    ]
  },
  {
    id: 'video-editor',
    slug: 'video-editor',
    title: 'Video Editor',
    shortDesc: 'Editing video profesional untuk semua kebutuhan konten',
    icon: <Video size={24} />,
    color: BRAND_COLOR,
    gradient: BRAND_GRADIENT,
    features: ['Cut & Transition', 'Color Grading', 'Motion Graphics', 'Sound Design'],
    priceStart: 50000,
    options: [
      { name: 'Edit Simple (Tiktok / Reels)', price: 50000 },
      { name: 'Edit Vlog / Youtube Biasa', price: 100000 },
      { name: 'Edit Cinematic / Motion Graphic', price: 250000 }
    ]
  },
  {
    id: 'foto-editor',
    slug: 'foto-editor',
    title: 'Foto Editor',
    shortDesc: 'Retouching dan manipulasi foto berkualitas tinggi',
    icon: <Camera size={24} />,
    color: BRAND_COLOR,
    gradient: BRAND_GRADIENT,
    features: ['Retouching Pro', 'Background Remove', 'Composite', 'Batch Editing'],
    priceStart: 15000,
    options: [
      { name: 'Hapus Background / Retouch Basic', price: 15000 },
      { name: 'Color Grading / Filter Profesional', price: 25000 },
      { name: 'Manipulasi & Edit Kompleks', price: 50000 }
    ]
  },
  {
    id: 'ai-foto',
    slug: 'ai-foto',
    title: 'AI Foto Generator',
    shortDesc: 'Generate foto realistis menggunakan teknologi AI terdepan',
    icon: <Sparkles size={24} />,
    color: BRAND_COLOR,
    gradient: BRAND_GRADIENT,
    features: ['Hyper Realistic', 'Any Style', 'High Resolution', 'Commercial Use'],
    priceStart: 15000,
    options: [
      { name: 'Generate 5 Foto AI', price: 15000 },
      { name: 'Generate 20 Foto AI', price: 50000 },
      { name: 'Training Model AI Wajah Khusus', price: 150000 }
    ]
  },
  {
    id: 'ai-video',
    slug: 'ai-video',
    title: 'AI Video Generator',
    shortDesc: 'Buat video AI berdurasi panjang hingga berjam-jam',
    icon: <Film size={24} />,
    color: BRAND_COLOR,
    gradient: BRAND_GRADIENT,
    features: ['Durasi Berjam-jam', 'Script to Video', 'Voice Over AI', 'Multi Language'],
    priceStart: 50000,
    options: [
      { name: 'Generate Video Pendek AI (1 Menit)', price: 50000 },
      { name: 'Video Penjelasan / Presentasi AI', price: 150000 },
      { name: 'Video Panjang / Film Pendek AI', price: 300000 }
    ]
  }
];

/**
 * FAQ data
 */
export const faqs = [
  {
    question: 'Bagaimana cara memesan layanan di VONETIS?',
    answer: 'Cukup pilih layanan yang Anda butuhkan, isi form pemesanan dengan detail yang diperlukan, lalu pesanan akan otomatis dikirim ke WhatsApp admin kami untuk konfirmasi. Kami akan segera memproses pesanan Anda.',
  },
  {
    question: 'Berapa lama waktu pengerjaan?',
    answer: 'Waktu pengerjaan bervariasi tergantung kompleksitas project. Untuk tugas kuliah/harian biasanya 1-3 hari, website 3 hari - 1 minggu, dan skripsi 3 hari - 1 minggu. Kami selalu berusaha selesai sebelum deadline Anda.',
  },
  {
    question: 'Apakah ada jaminan anti plagiat?',
    answer: 'Ya! Semua pekerjaan kami dijamin original dan anti plagiat. Untuk skripsi dan laporan, kami menyertakan hasil pengecekan plagiarisme Turnitin/Plagscan.',
  },
  {
    question: 'Bagaimana sistem pembayaran?',
    answer: 'Kami menerima pembayaran via transfer bank (BCA, Mandiri, BRI, BNI), e-wallet (GoPay, OVO, Dana), dan lainnya. Pembayaran bisa full di awal atau DP 50% terlebih dahulu.',
  },
  {
    question: 'Apakah ada garansi revisi?',
    answer: 'Tentu! Kami memberikan garansi revisi gratis hingga Anda puas dengan hasilnya. Untuk skripsi, revisi berlaku sampai ACC dosen pembimbing.',
  },
  {
    question: 'Apakah data dan informasi saya aman?',
    answer: 'Kerahasiaan data klien adalah prioritas utama kami. Semua informasi dan hasil pekerjaan hanya kami simpan untuk keperluan pengerjaan dan tidak akan dibagikan kepada pihak lain.',
  },
];
