'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function AdminUsersPage() {
  return (
    <div className="page-wrapper">
      <section style={{ padding: 'var(--space-8) 0 var(--space-16)' }}>
        <div className="container">
          <Link href="/admin" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--space-6)' }}>
            <ArrowLeft size={16} /> Kembali ke Admin
          </Link>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 800, marginBottom: 'var(--space-6)' }}>
            Kelola <span className="gradient-text">Users</span>
          </h1>

          <div className="glass-panel" style={{ padding: 'var(--space-6)', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--text-sm)' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
                  <th style={{ padding: 'var(--space-3)', textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 500 }}>Nama</th>
                  <th style={{ padding: 'var(--space-3)', textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 500 }}>Email</th>
                  <th style={{ padding: 'var(--space-3)', textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 500 }}>Role</th>
                  <th style={{ padding: 'var(--space-3)', textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 500 }}>Tanggal Daftar</th>
                  <th style={{ padding: 'var(--space-3)', textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 500 }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={5} style={{ padding: 'var(--space-12)', textAlign: 'center', color: 'var(--text-tertiary)' }}>
                    Belum ada pengguna terdaftar
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
