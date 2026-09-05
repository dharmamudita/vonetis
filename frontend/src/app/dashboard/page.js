'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Package, MessageCircle, User, Clock, CheckCircle2, AlertCircle, TrendingUp } from 'lucide-react';
import styles from './page.module.css';

export default function DashboardPage() {
  const { user, userData, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push('/login');
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="page-wrapper" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="skeleton" style={{ width: 200, height: 40 }} />
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <section style={{ padding: 'var(--space-32) 0 var(--space-16)' }}>
        <div className="container">
          {/* Welcome */}
          <div className={styles.welcome}>
            <div className={styles.welcomeLeft}>
              <h1 className={styles.welcomeTitle}>
                Halo, <span className="gradient-text">{user.displayName || 'User'}</span> 👋
              </h1>
              <p className={styles.welcomeDesc}>
                Selamat datang di dashboard Anda. Kelola pesanan dan pantau progress dari sini.
              </p>
            </div>
            <Link href="/order" className="btn btn-primary">
              <Package size={18} />
              Buat Pesanan Baru
            </Link>
          </div>

          {/* Stats Cards */}
          <div className={styles.statsGrid}>
            {[
              { icon: <Package size={22} />, label: 'Total Pesanan', value: '0', color: 'var(--accent-primary)' },
              { icon: <Clock size={22} />, label: 'Dalam Proses', value: '0', color: 'var(--accent-warning)' },
              { icon: <CheckCircle2 size={22} />, label: 'Selesai', value: '0', color: 'var(--accent-success)' },
              { icon: <MessageCircle size={22} />, label: 'Pesan Baru', value: '0', color: 'var(--accent-secondary)' },
            ].map((stat, i) => (
              <div key={i} className={`glass-card ${styles.statCard}`}>
                <div className={styles.statIcon} style={{ color: stat.color }}>{stat.icon}</div>
                <div>
                  <p className={styles.statValue}>{stat.value}</p>
                  <p className={styles.statLabel}>{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <h2 className={styles.sectionTitle}>Aksi Cepat</h2>
          <div className={styles.quickGrid}>
            {[
              { href: '/order', icon: '📦', title: 'Buat Pesanan', desc: 'Pesan layanan baru' },
              { href: '/chat', icon: '💬', title: 'Chat Admin', desc: 'Tanya langsung' },
              { href: '/dashboard/orders', icon: '📋', title: 'Riwayat Pesanan', desc: 'Lihat semua pesanan' },
              { href: '/dashboard/profile', icon: '👤', title: 'Edit Profil', desc: 'Kelola akun Anda' },
            ].map((action, i) => (
              <Link key={i} href={action.href} className={`glass-card ${styles.quickCard}`}>
                <span className={styles.quickIcon}>{action.icon}</span>
                <h3 className={styles.quickTitle}>{action.title}</h3>
                <p className={styles.quickDesc}>{action.desc}</p>
              </Link>
            ))}
          </div>

          {/* Recent Activity */}
          <h2 className={styles.sectionTitle}>Aktivitas Terbaru</h2>
          <div className={`glass-panel ${styles.emptyState}`}>
            <AlertCircle size={48} style={{ color: 'var(--text-tertiary)' }} />
            <p>Belum ada aktivitas. Mulai dengan membuat pesanan pertama Anda!</p>
            <Link href="/order" className="btn btn-primary">Buat Pesanan</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
