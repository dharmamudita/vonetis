'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { services, formatRupiah } from '@/lib/utils';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ArrowRight, ArrowLeft, Upload, CheckCircle2, Loader2 } from 'lucide-react';
import styles from './page.module.css';

export default function OrderPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ service: '', description: '', deadline: '', files: [], notes: '' });
  const [submitting, setSubmitting] = useState(false);

  function handleServiceSelect(serviceId) {
    setForm({ ...form, service: serviceId });
    setStep(2);
  }

  const selectedService = services.find((s) => s.id === form.service);

  return (
    <div className="page-wrapper">
      <section style={{ padding: 'var(--space-32) 0 var(--space-24)' }}>
        <div className="container" style={{ maxWidth: 800, margin: '0 auto' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 800, textAlign: 'center', marginBottom: 'var(--space-2)' }}>
            Buat <span className="gradient-text">Pesanan</span>
          </h1>
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: 'var(--space-8)' }}>
            Isi form di bawah untuk memesan layanan kami
          </p>

          {/* Progress Bar */}
          <div className={styles.progress}>
            {['Pilih Layanan', 'Detail Pesanan', 'Review', 'Selesai'].map((label, i) => (
              <div key={i} className={`${styles.progressStep} ${i + 1 <= step ? styles.progressActive : ''} ${i + 1 < step ? styles.progressDone : ''}`}>
                <div className={styles.progressDot}>
                  {i + 1 < step ? <CheckCircle2 size={16} /> : <span>{i + 1}</span>}
                </div>
                <span className={styles.progressLabel}>{label}</span>
              </div>
            ))}
          </div>

          {/* Step 1: Choose Service */}
          {step === 1 && (
            <div className={styles.stepContent}>
              <h2 className={styles.stepTitle}>Pilih Layanan</h2>
              <div className={styles.serviceGrid}>
                {services.map((s) => (
                  <button
                    key={s.id}
                    className={`glass-card ${styles.serviceOption} ${form.service === s.id ? styles.serviceSelected : ''}`}
                    onClick={() => handleServiceSelect(s.id)}
                  >
                    <div className={styles.serviceOptionIcon} style={{ background: s.gradient }}>
                      <span>{s.icon}</span>
                    </div>
                    <span className={styles.serviceOptionTitle}>{s.title}</span>
                    <span className={styles.serviceOptionPrice}>{formatRupiah(s.priceStart)}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Details */}
          {step === 2 && (
            <div className={styles.stepContent}>
              <h2 className={styles.stepTitle}>Detail Pesanan — {selectedService?.title}</h2>
              <div className={`glass-panel ${styles.formPanel}`}>
                <div className={styles.inputGroup}>
                  <label className="label">Deskripsi Pesanan *</label>
                  <textarea className="input textarea" placeholder="Jelaskan secara detail apa yang Anda butuhkan..." value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                </div>
                <div className={styles.inputGroup}>
                  <label className="label">Deadline *</label>
                  <input type="date" className="input" value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })} />
                </div>
                <div className={styles.inputGroup}>
                  <label className="label">Catatan Tambahan</label>
                  <textarea className="input textarea" placeholder="Catatan khusus (opsional)" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} style={{ minHeight: 80 }} />
                </div>
                <div className={styles.formActions}>
                  <button className="btn btn-ghost" onClick={() => setStep(1)}><ArrowLeft size={18} /> Kembali</button>
                  <button className="btn btn-primary" onClick={() => setStep(3)} disabled={!form.description || !form.deadline}><span>Lanjut</span> <ArrowRight size={18} /></button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {step === 3 && (
            <div className={styles.stepContent}>
              <h2 className={styles.stepTitle}>Review Pesanan</h2>
              <div className={`glass-panel ${styles.formPanel}`}>
                <div className={styles.reviewItem}>
                  <span className={styles.reviewLabel}>Layanan</span>
                  <span className={styles.reviewValue}>{selectedService?.icon} {selectedService?.title}</span>
                </div>
                <div className={styles.reviewItem}>
                  <span className={styles.reviewLabel}>Deskripsi</span>
                  <span className={styles.reviewValue}>{form.description}</span>
                </div>
                <div className={styles.reviewItem}>
                  <span className={styles.reviewLabel}>Deadline</span>
                  <span className={styles.reviewValue}>{form.deadline}</span>
                </div>
                {form.notes && (
                  <div className={styles.reviewItem}>
                    <span className={styles.reviewLabel}>Catatan</span>
                    <span className={styles.reviewValue}>{form.notes}</span>
                  </div>
                )}
                <div className={styles.reviewItem}>
                  <span className={styles.reviewLabel}>Estimasi Harga</span>
                  <span className={styles.reviewValue} style={{ fontSize: 'var(--text-xl)', fontWeight: 700, color: 'var(--accent-primary-light)' }}>
                    {formatRupiah(selectedService?.priceStart || 0)} ~
                  </span>
                </div>
                <div className={styles.formActions}>
                  <button className="btn btn-ghost" onClick={() => setStep(2)}><ArrowLeft size={18} /> Kembali</button>
                  <button className="btn btn-primary" onClick={async () => { 
                    if (!user) { router.push('/login'); return; } 
                    setSubmitting(true);
                    try {
                      await addDoc(collection(db, 'orders'), {
                        userId: user.uid,
                        serviceId: form.service,
                        serviceName: selectedService?.title || '',
                        description: form.description,
                        deadline: form.deadline,
                        notes: form.notes,
                        status: 'pending',
                        priceEstimate: selectedService?.priceStart || 0,
                        createdAt: serverTimestamp(),
                      });
                      setStep(4);
                    } catch (error) {
                      console.error("Error creating order:", error);
                      alert("Gagal membuat pesanan. Silakan coba lagi.");
                    } finally {
                      setSubmitting(false);
                    }
                  }} disabled={submitting}>
                    {submitting ? <Loader2 size={18} className="animate-spin" /> : <>Konfirmasi <CheckCircle2 size={18} /></>}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Success */}
          {step === 4 && (
            <div className={`${styles.stepContent} ${styles.successStep}`}>
              <div className={styles.successIcon}>✅</div>
              <h2 className={styles.stepTitle}>Pesanan Berhasil!</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-8)', textAlign: 'center' }}>
                Pesanan Anda telah diterima. Tim kami akan segera menghubungi Anda via chat untuk konfirmasi lebih lanjut.
              </p>
              <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center' }}>
                <Link href="/chat" className="btn btn-primary">Chat Admin</Link>
                <Link href="/dashboard" className="btn btn-secondary">Ke Dashboard</Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
