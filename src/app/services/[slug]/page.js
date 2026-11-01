'use client';

import { use } from 'react';
import Link from 'next/link';
import { services, formatRupiah, waLink } from '@/lib/utils';
import { CheckCircle2, MessageCircle } from 'lucide-react';
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
      {/* Hero Header */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <div className={styles.orb} style={{ background: `radial-gradient(circle, ${service.color}33 0%, transparent 70%)` }} />
        </div>
        <div className="container">
          <div className={styles.heroContent}>
            <div className={styles.heroIcon} style={{ background: service.gradient }}>
              <span>{service.icon}</span>
            </div>
            <h1 className={styles.heroTitle}>{service.title}</h1>
            <p className={styles.heroDesc}>{service.shortDesc}</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section">
        <div className="container">
          <div className={styles.contentGrid}>
            {/* Features & Workflow */}
            <div className={styles.mainContent}>
              <div className={styles.contentCard}>
                <h2 className={styles.contentTitle}>Apa yang Anda Dapatkan?</h2>
                <div className={styles.featureGrid}>
                  {service.features.map((f, i) => (
                    <div key={i} className={styles.featureItem}>
                      <CheckCircle2 size={18} style={{ color: service.color, flexShrink: 0 }} />
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
            </div>

            {/* Sidebar Pricing & CTA */}
            <div className={styles.sidebar}>
              <div className={`glass-panel ${styles.pricingBox}`}>
                <h3 className={styles.pricingTitle}>Detail Layanan</h3>
                <div className={styles.pricingValue}>
                  <span className={styles.pricingFrom}>Estimasi Mulai dari</span>
                  <span className={styles.pricingAmount} style={{ color: service.color }}>
                    {formatRupiah(service.priceStart)}
                  </span>
                </div>
                <ul className={styles.pricingFeatures}>
                  <li>✓ Konsultasi gratis</li>
                  <li>✓ Revisi hingga puas</li>
                  <li>✓ Garansi kualitas pengerjaan</li>
                  <li>✓ Support online 24/7</li>
                </ul>
                <Link href={`/order?service=${service.id}`} className="btn btn-primary w-full" style={{ justifyContent: 'center' }}>
                  Pesan Sekarang
                </Link>
                <a
                  href={waLink(`Halo VONETIS, saya ingin konsultasi mengenai layanan ${service.title}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary w-full"
                  style={{ justifyContent: 'center' }}
                >
                  <MessageCircle size={16} /> Tanya via WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className={styles.relatedSection}>
        <div className="container">
          <h2 className="section-title">Layanan <span className="gradient-text">Lainnya</span></h2>
          <div className={styles.relatedGrid}>
            {related.map((s) => (
              <Link href={`/services/${s.slug}`} key={s.id} className={`glass-card ${styles.relatedCard}`}>
                <div className={styles.relatedIcon} style={{ background: s.gradient }}>
                  <span>{s.icon}</span>
                </div>
                <h3 className={styles.relatedTitle}>{s.title}</h3>
                <p className={styles.relatedPrice}>Mulai {formatRupiah(s.priceStart)}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
