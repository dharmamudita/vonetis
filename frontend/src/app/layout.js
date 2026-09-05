import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { AuthProvider } from '@/context/AuthContext';

export const metadata = {
  title: {
    default: 'XATRA WORKS — Solusi Lengkap Jasa Akademik & Kreatif',
    template: '%s | XATRA WORKS',
  },
  description:
    'XATRA WORKS menyediakan layanan jasa tugas kuliah, pembuatan website & aplikasi fullstack, proposal turnamen nasional, laporan PKL/magang/KKN, skripsi, video editor, foto editor, AI foto & video generator. Kualitas premium, harga terjangkau.',
  keywords: [
    'jasa tugas kuliah',
    'jasa pembuatan website',
    'jasa skripsi',
    'jasa video editor',
    'jasa foto editor',
    'AI video generator',
    'jasa proposal turnamen',
    'jasa laporan PKL',
    'XATRA WORKS',
  ],
  authors: [{ name: 'XATRA WORKS' }],
  openGraph: {
    title: 'XATRA WORKS — Solusi Lengkap Jasa Akademik & Kreatif',
    description:
      'Layanan lengkap untuk tugas kuliah, website, skripsi, editing, dan AI content. Kualitas terjamin.',
    type: 'website',
    locale: 'id_ID',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="noise-overlay">
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
