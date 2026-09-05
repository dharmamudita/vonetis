'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { Package, MessageCircle, Users, TrendingUp, DollarSign, ShoppingBag, BarChart3 } from 'lucide-react';

export default function AdminDashboard() {
  const { user, userData, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) router.push('/login');
      // In production, check for admin role
    }
  }, [user, loading, router]);

  if (loading) return <div className="page-wrapper" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div className="skeleton" style={{ width: 200, height: 40 }} /></div>;

  const adminStats = [
    { icon: <DollarSign size={22} />, label: 'Revenue Bulan Ini', value: 'Rp 0', color: 'var(--accent-success)', bg: 'rgba(16,185,129,0.1)' },
    { icon: <ShoppingBag size={22} />, label: 'Pesanan Baru', value: '0', color: 'var(--accent-primary)', bg: 'rgba(124,58,237,0.1)' },
    { icon: <MessageCircle size={22} />, label: 'Chat Aktif', value: '0', color: 'var(--accent-secondary)', bg: 'rgba(6,182,212,0.1)' },
    { icon: <Users size={22} />, label: 'Total Users', value: '0', color: 'var(--accent-warning)', bg: 'rgba(245,158,11,0.1)' },
  ];

  return (
    <div className="page-wrapper">
      <section style={{ padding: 'var(--space-8) 0 var(--space-16)' }}>
        <div className="container">
          <div style={{ marginBottom: 'var(--space-8)' }}>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 800, marginBottom: 'var(--space-2)' }}>
              Admin <span className="gradient-text">Panel</span>
            </h1>
            <p style={{ color: 'var(--text-secondary)' }}>Kelola pesanan, chat, dan pengguna</p>
          </div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-4)', marginBottom: 'var(--space-10)' }}>
            {adminStats.map((stat, i) => (
              <div key={i} className="glass-card" style={{ padding: 'var(--space-5)', display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                <div style={{ width: 48, height: 48, borderRadius: 'var(--radius-lg)', background: stat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: stat.color }}>
                  {stat.icon}
                </div>
                <div>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 800 }}>{stat.value}</p>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Links */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-4)' }}>
            {[
              { href: '/admin/orders', icon: <Package size={24} />, title: 'Kelola Pesanan', desc: 'Lihat dan proses semua pesanan', color: 'var(--accent-primary)' },
              { href: '/admin/chat', icon: <MessageCircle size={24} />, title: 'Chat Panel', desc: 'Kelola semua percakapan dengan klien', color: 'var(--accent-secondary)' },
              { href: '/admin/users', icon: <Users size={24} />, title: 'Kelola Users', desc: 'Manajemen pengguna dan role', color: 'var(--accent-warning)' },
            ].map((item, i) => (
              <Link key={i} href={item.href} className="glass-card" style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}>
                <div style={{ color: item.color }}>{item.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>{item.title}</h3>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
