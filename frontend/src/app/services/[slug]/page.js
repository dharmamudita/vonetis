'use client';

import { use } from 'react';
import Link from 'next/link';
import { services, formatRupiah } from '@/lib/utils';
import { ArrowRight, ArrowLeft, CheckCircle2, MessageCircle } from 'lucide-react';
import styles from './page.module.css';

export default function ServiceDetailPage({ params }) {
  const { slug } = use(params);
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return (
      <div className="page-wrapper" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: 'var(--text-4xl)', marginBottom: 'var(--space-4)' }}>Layanan Tidak Ditemukan</h1>
          <Link href="/services" className="btn btn-primary">Lihat Semua Layanan</Link>
        </div>
      </div>
    );
  }

  // Get related services (same category or nearby)
  const related = services.filter((s) => s.id !== service.id).slice(0, 3);

  return (
    <div className="page-wrapper">
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <div className={styles.orb} style={{ background: `radial-gradient(circle, ${service.color}33 0%, transparent 70%)` }} />
        </div>
        <div className={`container ${styles.heroContent}`}>
          <Link href="/services" className={styles.backLink}>
            <ArrowLeft size={16} />
            Semua Layanan
          </Link>
          <div className={styles.heroIcon} style={{ background: service.gradient }}>
            <span>{service.icon}</span>
          </div>
          <h1 className={styles.heroTitle}>{service.title}</h1>
          <p className={styles.heroDesc}>{service.shortDesc}</p>
          <div className={styles.heroCtas}>
            <Link href="/order" className="btn btn-primary btn-lg">
              Pesan Sekarang <ArrowRight size={20} />
            </Link>
            <Link href="/chat" className="btn btn-secondary btn-lg">
              <MessageCircle size={20} /> Tanya Dulu
            </Link>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section">
        <div className="container">
          <div className={styles.contentGrid}>
            {/* Features */}
            <div className={styles.mainContent}>
              <div className={styles.contentCard}>
                <h2 className={styles.contentTitle}>Apa yang Anda Dapatkan?</h2>
                <div className={styles.featureGrid}>
                  {service.features.map((f, i) => (
                    <div key={i} className={styles.featureItem}>
                      <CheckCircle2 size={20} style={{ color: service.color, flexShrink: 0 }} />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.contentCard}>
                <h2 className={styles.contentTitle}>Proses Pengerjaan</h2>
                <div className={styles.processSteps}>
                  {['Konsultasi & Diskusi', 'Pembayaran DP/Full', 'Pengerjaan Dimulai', 'Review & Revisi', 'Serah Terima'].map((step, i) => (
                    <div key={i} className={styles.processStep}>
                      <div className={styles.stepNumber} style={{ background: service.gradient }}>{i + 1}</div>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {service.options && service.options.length > 0 && (
                <div className={styles.contentCard}>
                  <h2 className={styles.contentTitle}>Pilihan Paket & Harga</h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                    {service.options.map((opt, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-3)', background: 'var(--glass-bg)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--glass-border)' }}>
                        <span style={{ fontWeight: 500, color: 'var(--text-primary)', fontSize: 'var(--text-sm)' }}>{opt.name}</span>
                        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--green)', fontSize: 'var(--text-base)' }}>{formatRupiah(opt.price)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className={styles.sidebar}>
              <div className={`glass-panel ${styles.pricingBox}`}>
                <h3 className={styles.pricingTitle}>Harga</h3>
                <div className={styles.pricingValue}>
                  <span className={styles.pricingFrom}>Mulai dari</span>
                  <span className={styles.pricingAmount} style={{ color: service.color }}>
                    {formatRupiah(service.priceStart)}
                  </span>
                </div>
                <ul className={styles.pricingFeatures}>
                  <li>✓ Konsultasi gratis</li>
                  <li>✓ Revisi hingga puas</li>
                  <li>✓ Garansi kualitas</li>
                  <li>✓ Support 24/7</li>
                </ul>
                <Link href="/order" className="btn btn-primary w-full" style={{ justifyContent: 'center' }}>
                  Pesan Sekarang
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <h2 className="section-title">Layanan <span className="gradient-text">Lainnya</span></h2>
          <div className={styles.relatedGrid}>
            {related.map((s) => (
              <Link href={`/services/${s.slug}`} key={s.id} className={`glass-card ${styles.relatedCard}`}>
                <div className={styles.relatedIcon} style={{ background: s.gradient }}>
                  <span>{s.icon}</span>
                </div>
                <h3 className={styles.relatedTitle}>{s.title}</h3>
                <p className={styles.relatedPrice}>{formatRupiah(s.priceStart)}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
