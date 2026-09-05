'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Camera, Save, Loader2 } from 'lucide-react';

export default function ProfilePage() {
  const { user, userData, loading } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ displayName: '', phone: '', email: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => { if (!loading && !user) router.push('/login'); }, [user, loading, router]);
  useEffect(() => {
    if (user) {
      setForm({ displayName: user.displayName || '', phone: userData?.phone || '', email: user.email || '' });
    }
  }, [user, userData]);

  if (loading || !user) return <div className="page-wrapper" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div className="skeleton" style={{ width: 200, height: 40 }} /></div>;

  function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => setSaving(false), 1500);
  }

  return (
    <div className="page-wrapper">
      <section style={{ padding: 'var(--space-32) 0 var(--space-16)' }}>
        <div className="container" style={{ maxWidth: 600, margin: '0 auto' }}>
          <Link href="/dashboard" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--space-6)' }}>
            <ArrowLeft size={16} /> Kembali ke Dashboard
          </Link>

          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 800, marginBottom: 'var(--space-8)' }}>
            Profil <span className="gradient-text">Saya</span>
          </h1>

          {/* Avatar */}
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
            <div style={{ width: 96, height: 96, borderRadius: '50%', background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto var(--space-4)', fontSize: 'var(--text-3xl)', fontWeight: 700, color: 'white', position: 'relative' }}>
              {user.photoURL ? <img src={user.photoURL} alt="" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} /> : (user.displayName || 'U')[0].toUpperCase()}
            </div>
            <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-xl)' }}>{user.displayName || 'User'}</p>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>{user.email}</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSave} className="glass-panel" style={{ padding: 'var(--space-8)', display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
            <div>
              <label className="label">Nama Lengkap</label>
              <input className="input" value={form.displayName} onChange={(e) => setForm({ ...form, displayName: e.target.value })} />
            </div>
            <div>
              <label className="label">Email</label>
              <input className="input" value={form.email} disabled style={{ opacity: 0.6 }} />
            </div>
            <div>
              <label className="label">Nomor HP</label>
              <input className="input" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="08xxxxxxxxxx" />
            </div>
            <button type="submit" className="btn btn-primary w-full" style={{ justifyContent: 'center' }} disabled={saving}>
              {saving ? <Loader2 size={18} className="animate-spin" /> : <><Save size={18} /> Simpan Perubahan</>}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
