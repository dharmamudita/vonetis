import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HydrationFix from '@/components/HydrationFix';

export const metadata = {
  metadataBase: new URL('https://vonetisofficial.store'),
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
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/branding/vonetis_triple_crown_icon.svg', type: 'image/svg+xml' },
      { url: '/icon-48.png', sizes: '48x48', type: 'image/png' },
      { url: '/icon-96.png', sizes: '96x96', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'VONETIS — Solusi Lengkap Jasa Akademik & Kreatif',
    description:
      'Layanan lengkap untuk tugas kuliah, website, skripsi, editing, dan AI content. Kualitas terjamin.',
    url: 'https://vonetisofficial.store',
    siteName: 'VONETIS',
    type: 'website',
    locale: 'id_ID',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'VONETIS Official Brand Card',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VONETIS — Solusi Lengkap Jasa Akademik & Kreatif',
    description:
      'Layanan lengkap untuk tugas kuliah, website, skripsi, editing, dan AI content. Kualitas terjamin.',
    images: ['/og-image.jpg'],
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
