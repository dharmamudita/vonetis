import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HydrationFix from '@/components/HydrationFix';

export const metadata = {
  title: {
    default: 'VONETIS — Solusi Lengkap Jasa Akademik & Kreatif',
    template: '%s | VONETIS',
  },
  description:
    'VONETIS menyediakan layanan jasa tugas kuliah, pembuatan website & aplikasi fullstack, proposal turnamen nasional, laporan PKL/magang/KKN, skripsi, video editor, foto editor, AI foto & video generator. Kualitas premium, harga terjangkau.',
  keywords: [
    'jasa tugas kuliah',
    'jasa pembuatan website',
    'jasa skripsi',
    'jasa video editor',
    'jasa foto editor',
    'AI video generator',
    'jasa proposal turnamen',
    'jasa laporan PKL',
    'VONETIS',
  ],
  authors: [{ name: 'VONETIS' }],
  icons: {
    icon: [
      { url: '/branding/vonetis_triple_crown_icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32' },
    ],
    shortcut: '/favicon.ico',
    apple: '/branding/vonetis_triple_crown_icon_192.png',
  },
  openGraph: {
    title: 'VONETIS — Solusi Lengkap Jasa Akademik & Kreatif',
    description:
      'Layanan lengkap untuk tugas kuliah, website, skripsi, editing, dan AI content. Kualitas terjamin.',
    type: 'website',
    locale: 'id_ID',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className="noise-overlay" suppressHydrationWarning>
        <HydrationFix />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
