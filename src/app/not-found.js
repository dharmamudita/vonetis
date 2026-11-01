'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="page-wrapper" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-6)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(56, 189, 248, 0.1) 0%, transparent 60%)', filter: 'blur(60px)', zIndex: 0 }} />
      
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-6)' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(4rem, 15vw, 7rem)', fontWeight: 900, color: 'var(--green)', lineHeight: 1, letterSpacing: '-0.05em' }}>
          404
        </h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 5vw, 2rem)', fontWeight: 800, color: 'var(--text-primary)' }}>
            Halaman Tidak Ditemukan
          </h2>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', maxWidth: '400px', margin: '0 auto', lineHeight: 1.6 }}>
            Maaf, halaman yang Anda cari mungkin telah dipindahkan atau sudah tidak tersedia.
          </p>
        </div>
        
        <Link href="/" className="btn btn-primary btn-lg" style={{ marginTop: 'var(--space-4)' }}>
          <ArrowLeft size={18} /> Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
