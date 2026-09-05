'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { services, formatRupiah } from '@/lib/utils';
import { CheckCircle2, ArrowRight, X } from 'lucide-react';
import styles from './page.module.css';

export default function PricingPage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('revealed'); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const plans = [
    {
      name: 'Basic',
      desc: 'Untuk kebutuhan sederhana',
      price: 50000,
      gradient: 'linear-gradient(135deg, #3b82f6, #60a5fa)',
      features: [
        { text: 'Tugas kuliah standar', included: true },
        { text: 'Revisi 2x', included: true },
        { text: 'Deadline 3-7 hari', included: true },
        { text: 'Chat support', included: true },
        { text: 'Priority handling', included: false },
        { text: 'Source code', included: false },
      ],
      popular: false,
    },
    {
      name: 'Pro',
      desc: 'Pilihan terpopuler',
      price: 200000,
      gradient: 'linear-gradient(135deg, #7c3aed, #a78bfa)',
      features: [
        { text: 'Semua layanan tersedia', included: true },
        { text: 'Revisi unlimited', included: true },
        { text: 'Deadline fleksibel', included: true },
        { text: 'Priority support 24/7', included: true },
        { text: 'Priority handling', included: true },
        { text: 'Source code included', included: true },
      ],
      popular: true,
    },
    {
      name: 'Enterprise',
      desc: 'Untuk project besar',
      price: null,
      gradient: 'linear-gradient(135deg, #06b6d4, #67e8f9)',
      features: [
        { text: 'Project skala besar', included: true },
        { text: 'Revisi unlimited', included: true },
        { text: 'Dedicated team', included: true },
        { text: 'Priority support 24/7', included: true },
        { text: 'Custom solution', included: true },
        { text: 'NDA & garansi khusus', included: true },
      ],
      popular: false,
    },
  ];

  return (
    <div className="page-wrapper">
      <section className={styles.hero}>
        <div className={styles.heroBg}><div className={styles.orb1} /><div className={styles.orb2} /></div>
        <div className={`container ${styles.heroContent}`}>
          <h1 className={styles.heroTitle}>Harga <span className="gradient-text-hero">Transparan</span></h1>
          <p className={styles.heroDesc}>Pilih paket yang sesuai dengan kebutuhan dan budget Anda</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.pricingGrid}>
            {plans.map((plan, i) => (
              <div key={i} className={`reveal ${styles.card} ${plan.popular ? styles.cardPopular : ''}`}>
                {plan.popular && <div className={styles.popularBadge}>Paling Populer</div>}
                <div className={styles.cardHeader}>
                  <h3 className={styles.planName}>{plan.name}</h3>
                  <p className={styles.planDesc}>{plan.desc}</p>
                  <div className={styles.planPrice}>
                    {plan.price ? (
                      <>
                        <span className={styles.priceLabel}>Mulai dari</span>
                        <span className={styles.priceAmount}>{formatRupiah(plan.price)}</span>
                      </>
                    ) : (
                      <span className={styles.priceAmount}>Hubungi Kami</span>
                    )}
                  </div>
                </div>
                <div className={styles.featureList}>
                  {plan.features.map((f, j) => (
                    <div key={j} className={`${styles.featureItem} ${!f.included ? styles.featureDisabled : ''}`}>
                      {f.included ? <CheckCircle2 size={16} className={styles.featureCheck} /> : <X size={16} className={styles.featureX} />}
                      <span>{f.text}</span>
                    </div>
                  ))}
                </div>
                <Link href="/order" className={`btn ${plan.popular ? 'btn-primary' : 'btn-secondary'} w-full`} style={{ justifyContent: 'center' }}>
                  Pilih {plan.name} <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Per-Service Pricing */}
      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="reveal">
            <h2 className="section-title">Harga per <span className="gradient-text">Layanan</span></h2>
          </div>
          <div className={styles.serviceTable}>
            {services.map((s, i) => (
              <div key={s.id} className={`reveal glass-card ${styles.serviceRow}`}>
                <div className={styles.serviceLeft}>
                  <span className={styles.serviceIcon}>{s.icon}</span>
                  <span className={styles.serviceName}>{s.title}</span>
                </div>
                <div className={styles.serviceRight}>
                  <span className={styles.servicePrice}>{formatRupiah(s.priceStart)}</span>
                  <Link href={`/services/${s.slug}`} className="btn btn-ghost btn-sm">Detail</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
