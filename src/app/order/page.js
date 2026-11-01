'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { services, formatRupiah, waLink } from '@/lib/utils';
import { ArrowRight, ArrowLeft, CheckCircle2, MessageCircle } from 'lucide-react';
import styles from './page.module.css';

const EMPTY_FORM = { service: '', name: '', description: '', deadline: '' };

function buildOrderMessage(form, service) {
  const lines = [
    'Halo VONETIS, saya ingin memesan layanan:',
    '',
    `*Nama:* ${form.name}`,
    `*Layanan:* ${service?.title || '-'}`,
    `*Deadline:* ${form.deadline}`,
    '',
    '*Deskripsi:*',
    form.description,
    '',
    `Estimasi harga mulai dari: ${formatRupiah(service?.priceStart ?? 0)}`,
  ];
  return lines.join('\n');
}

export default function OrderPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(EMPTY_FORM);

  // Pre-select service from ?service=<id> (e.g. from the service detail page)
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get('service');
    if (id && services.some((s) => s.id === id)) {
      setForm((f) => ({ ...f, service: id }));
      setStep(2);
    }
  }, []);

  function handleServiceSelect(serviceId) {
    setForm({ ...form, service: serviceId });
    setStep(2);
  }

  const selectedService = services.find((s) => s.id === form.service);
  const orderLink = waLink(buildOrderMessage(form, selectedService));

  function handleConfirm() {
    window.open(orderLink, '_blank', 'noopener,noreferrer');
    setStep(4);
  }

  return (
    <div className="page-wrapper">
      <section className={styles.orderSection}>
        <div className="container" style={{ maxWidth: 800, margin: '0 auto' }}>
          <div className={styles.orderHeader}>
            <h1 className={styles.orderTitle}>
              Buat <span className="gradient-text">Pesanan</span>
            </h1>
            <p className={styles.orderSubtitle}>
              Isi form di bawah, pesanan Anda akan langsung dikirim ke WhatsApp admin kami
            </p>
          </div>

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
                {services.map((s, index) => (
                  <button
                    key={s.id}
                    className={`glass-card ${styles.serviceOption} ${form.service === s.id ? styles.serviceSelected : ''}`}
                    onClick={() => handleServiceSelect(s.id)}
                  >
                    <div className={styles.serviceOptionIcon} style={{ background: s.gradient }}>
                      <span>{s.icon}</span>
                    </div>
                    <div className={styles.serviceOptionText}>
                      <div className={styles.serviceOptionTitleRow}>
                        <span className={styles.serviceOptionTitle}>{s.title}</span>
                        {index === 0 && <span className={styles.popularBadge}>★ Terpopuler</span>}
                      </div>
                      <span className={styles.serviceOptionPrice}>Mulai {formatRupiah(s.priceStart)}</span>
                    </div>
                  </button>
                ))}
              </div>
              <div className={styles.customOrderNote}>
                <p>Tidak menemukan layanan yang sesuai? <a href={waLink('Halo VONETIS, saya ingin konsultasi project custom.')} target="_blank" rel="noopener noreferrer">Konsultasi Project Custom via WhatsApp →</a></p>
              </div>
            </div>
          )}

          {/* Step 2: Details */}
          {step === 2 && (
            <div className={styles.stepContent}>
              <h2 className={styles.stepTitle}>Detail Pesanan — {selectedService?.title}</h2>
              <div className={`glass-panel ${styles.formPanel}`}>
                <div className={styles.inputGroup}>
                  <label className="label" htmlFor="order-name">Nama Anda *</label>
                  <input id="order-name" className="input" placeholder="Nama lengkap" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className={styles.inputGroup}>
                  <label className="label" htmlFor="order-desc">Deskripsi Pesanan *</label>
                  <textarea id="order-desc" className="input textarea" placeholder="Jelaskan secara detail apa yang Anda butuhkan..." value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                </div>
                <div className={styles.inputGroup}>
                  <label className="label" htmlFor="order-deadline">Deadline *</label>
                  <input id="order-deadline" type="date" className="input" value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })} />
                </div>
                <div className={styles.formActions}>
                  <button className="btn btn-ghost" onClick={() => setStep(1)}><ArrowLeft size={18} /> Kembali</button>
                  <button className="btn btn-primary" onClick={() => setStep(3)} disabled={!form.name.trim() || !form.description.trim() || !form.deadline}><span>Lanjut</span> <ArrowRight size={18} /></button>
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
                  <span className={styles.reviewLabel}>Nama</span>
                  <span className={styles.reviewValue}>{form.name}</span>
                </div>
                <div className={styles.reviewItem}>
                  <span className={styles.reviewLabel}>Layanan</span>
                  <span className={styles.reviewValue}>{selectedService?.title}</span>
                </div>
                <div className={styles.reviewItem}>
                  <span className={styles.reviewLabel}>Deskripsi</span>
                  <span className={styles.reviewValue}>{form.description}</span>
                </div>
                <div className={styles.reviewItem}>
                  <span className={styles.reviewLabel}>Deadline</span>
                  <span className={styles.reviewValue}>{form.deadline}</span>
                </div>
                <div className={styles.reviewItem}>
                  <span className={styles.reviewLabel}>Estimasi Harga</span>
                  <span className={styles.reviewValue} style={{ fontSize: 'var(--text-xl)', fontWeight: 700, color: 'var(--green)' }}>
                    Mulai {formatRupiah(selectedService?.priceStart ?? 0)}
                  </span>
                </div>
                <div className={styles.formActions}>
                  <button className="btn btn-ghost" onClick={() => setStep(2)}><ArrowLeft size={18} /> Kembali</button>
                  <button className="btn btn-primary" onClick={handleConfirm}>
                    <MessageCircle size={18} /> Kirim ke WhatsApp
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Success */}
          {step === 4 && (
            <div className={`${styles.stepContent} ${styles.successStep}`}>
              <div className={styles.successIcon}><CheckCircle2 size={56} /></div>
              <h2 className={styles.stepTitle}>Pesanan Siap Dikirim!</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-8)', textAlign: 'center' }}>
                WhatsApp telah dibuka dengan detail pesanan Anda. Tekan <strong>kirim</strong> di WhatsApp agar admin kami bisa segera memproses pesanan.
                Jika WhatsApp tidak terbuka, klik tombol di bawah.
              </p>
              <div className={styles.successActions}>
                <a href={orderLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  <MessageCircle size={18} /> Buka WhatsApp
                </a>
                <button className="btn btn-secondary" onClick={() => { setForm(EMPTY_FORM); setStep(1); }}>
                  Buat Pesanan Lain
                </button>
                <Link href="/" className="btn btn-ghost">Ke Beranda</Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
