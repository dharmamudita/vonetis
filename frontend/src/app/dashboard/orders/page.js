'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Loader2, CheckCircle2, Clock } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { formatRupiah } from '@/lib/utils';

export default function OrdersPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => { if (!loading && !user) router.push('/login'); }, [user, loading, router]);

  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, 'orders'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ordersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setOrders(ordersData);
      setLoadingOrders(false);
    }, (err) => {
      console.error('Error fetching orders:', err);
      setLoadingOrders(false);
    });

    return () => unsubscribe();
  }, [user]);

  if (loading || !user) return <div className="page-wrapper" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Loader2 className="animate-spin text-green" size={32} /></div>;

  return (
    <div className="page-wrapper">
      <section style={{ padding: 'var(--space-32) 0 var(--space-16)' }}>
        <div className="container">
          <Link href="/dashboard" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--space-6)' }}>
            <ArrowLeft size={16} /> Kembali ke Dashboard
          </Link>

          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 800, marginBottom: 'var(--space-6)' }}>
            Riwayat <span className="gradient-text">Pesanan</span>
          </h1>

          {loadingOrders ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: 'var(--space-12)' }}>
              <Loader2 className="animate-spin text-green" size={32} />
            </div>
          ) : orders.length === 0 ? (
            <div className="glass-panel" style={{ padding: 'var(--space-12)', textAlign: 'center' }}>
              <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-4)' }}>Belum ada pesanan. Mulai buat pesanan pertama Anda!</p>
              <Link href="/order" className="btn btn-primary">Buat Pesanan</Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              {orders.map(order => (
                <div key={order.id} className="glass-card" style={{ padding: 'var(--space-5)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--glass-border)', paddingBottom: 'var(--space-3)' }}>
                    <div>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-lg)' }}>{order.serviceName}</h3>
                      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>ID: {order.id.slice(0, 8).toUpperCase()}</p>
                    </div>
                    <span style={{ 
                      display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '4px 12px', borderRadius: '99px', fontSize: 'var(--text-xs)', fontWeight: 600,
                      background: order.status === 'completed' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                      color: order.status === 'completed' ? 'var(--accent-success)' : 'var(--accent-warning)'
                    }}>
                      {order.status === 'completed' ? <CheckCircle2 size={14} /> : <Clock size={14} />}
                      {order.status === 'pending' ? 'Menunggu Konfirmasi' : order.status === 'process' ? 'Sedang Diproses' : order.status === 'completed' ? 'Selesai' : order.status}
                    </span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                    <p><strong>Deskripsi:</strong> {order.description}</p>
                    <p><strong>Deadline:</strong> {order.deadline}</p>
                    {order.notes && <p><strong>Catatan:</strong> {order.notes}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
