/**
 * Utility functions for XATRA WORKS
 */
import { FileText, MonitorPlay, Trophy, FileBadge, GraduationCap, Video, Camera, Sparkles, Film } from 'lucide-react';

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
    color: '#7c3aed',
    gradient: 'linear-gradient(135deg, #7c3aed, #a78bfa)',
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
    color: '#2563eb',
    gradient: 'linear-gradient(135deg, #2563eb, #60a5fa)',
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
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
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
    color: '#10b981',
    gradient: 'linear-gradient(135deg, #10b981, #34d399)',
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
    color: '#8b5cf6',
    gradient: 'linear-gradient(135deg, #8b5cf6, #c4b5fd)',
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
    color: '#ef4444',
    gradient: 'linear-gradient(135deg, #ef4444, #f87171)',
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
    color: '#ec4899',
    gradient: 'linear-gradient(135deg, #ec4899, #f472b6)',
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
    color: '#06b6d4',
    gradient: 'linear-gradient(135deg, #06b6d4, #67e8f9)',
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
    color: '#8b5cf6',
    gradient: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
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
 * Testimonials data
 */
export const testimonials = [
  {
    id: 1,
    name: 'Rina Amelia',
    role: 'Mahasiswi Teknik Informatika',
    avatar: null,
    rating: 5,
    text: 'Website yang dibuat sangat profesional dan sesuai dengan keinginan saya. Deadline tepat waktu dan komunikasi sangat baik. Highly recommended!',
    service: 'Website & Aplikasi',
  },
  {
    id: 2,
    name: 'Ahmad Fauzi',
    role: 'Mahasiswa Manajemen',
    avatar: null,
    rating: 5,
    text: 'Skripsi saya selesai dengan sempurna. Anti plagiat dan bimbingan sampai ACC dosen. Terima kasih XATRA WORKS!',
    service: 'Skripsi',
  },
  {
    id: 3,
    name: 'Dewi Safitri',
    role: 'Content Creator',
    avatar: null,
    rating: 5,
    text: 'Video editing-nya keren banget! Color grading dan transisi sangat smooth. Konten saya jadi lebih profesional.',
    service: 'Video Editor',
  },
  {
    id: 4,
    name: 'Budi Santoso',
    role: 'Mahasiswa Teknik Mesin',
    avatar: null,
    rating: 5,
    text: 'Proposal turnamen nasional kami berhasil lolos seleksi berkat bantuan XATRA WORKS. PPT-nya juga sangat menarik.',
    service: 'Turnamen Nasional',
  },
  {
    id: 5,
    name: 'Siti Nurhaliza',
    role: 'Mahasiswi Akuntansi',
    avatar: null,
    rating: 4,
    text: 'Tugas-tugas kuliah saya selalu selesai tepat waktu. Kualitas pekerjaan sangat baik dan harga terjangkau.',
    service: 'Tugas Kuliah',
  },
  {
    id: 6,
    name: 'Rizky Pratama',
    role: 'Startup Founder',
    avatar: null,
    rating: 5,
    text: 'AI Video generator-nya luar biasa! Bisa bikin video marketing berdurasi panjang dengan kualitas tinggi.',
    service: 'AI Video Generator',
  },
];

/**
 * Stats data
 */
export const stats = [
  { label: 'Proyek Selesai', value: 2500, suffix: '+' },
  { label: 'Klien Puas', value: 1200, suffix: '+' },
  { label: 'Rating', value: 4.9, suffix: '/5' },
  { label: 'Tahun Pengalaman', value: 5, suffix: '+' },
];

/**
 * FAQ data
 */
export const faqs = [
  {
    question: 'Bagaimana cara memesan layanan di XATRA WORKS?',
    answer: 'Cukup pilih layanan yang Anda butuhkan, isi form pemesanan dengan detail yang diperlukan, lalu hubungi kami via chat untuk konfirmasi. Kami akan segera memproses pesanan Anda.',
  },
  {
    question: 'Berapa lama waktu pengerjaan?',
    answer: 'Waktu pengerjaan bervariasi tergantung kompleksitas project. Untuk tugas kuliah biasanya 1-3 hari, website 1-4 minggu, dan skripsi 1-3 bulan. Kami selalu berusaha selesai sebelum deadline Anda.',
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
