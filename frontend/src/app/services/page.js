'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { services, formatRupiah } from '@/lib/utils';
import { ArrowRight, Search } from 'lucide-react';
import { useRef, useCallback } from 'react';
import styles from './page.module.css';

// Premium Spotlight Hover Effect for Cards
function SpotlightCard({ children, className = '', ...props }) {
  const divRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Set variables for spotlight in CSS
    divRef.current.style.setProperty('--mouse-x', `${x}px`);
    divRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <Link 
      ref={divRef}
      onMouseMove={handleMouseMove}
      className={`${styles.card} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}

export default function ServicesPage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('revealed'); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="page-wrapper">
      {/* Hero Banner */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <div className={styles.orb1} />
          <div className={styles.orb2} />
        </div>
        <div className={`container ${styles.heroContent}`}>
          <h1 className={styles.heroTitle}>
            Semua <span className="gradient-text-hero">Layanan</span> Kami
          </h1>
          <p className={styles.heroSubtitle}>
            9+ layanan profesional untuk memenuhi kebutuhan akademik, kreatif, dan teknologi Anda
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section">
        <div className="container">
          <div className={styles.grid}>
            {services.map((service, index) => (
              <SpotlightCard
                href={`/services/${service.slug}`}
                key={service.id}
                className="reveal"
                style={{ animationDelay: `${index * 80}ms` }}
                id={`service-${service.id}`}
              >
                <div className={styles.cardBody}>
                  <div className={styles.iconWrap}>
                    <span className={styles.icon}>{service.icon}</span>
                  </div>

                  <h2 className={styles.cardTitle}>{service.title}</h2>
                  <p className={styles.cardDesc}>{service.shortDesc}</p>

                  <ul className={styles.featureList}>
                    {service.features.map((f, i) => (
                      <li key={i} className={styles.featureItem}>
                        <span className={styles.featureCheck}>✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className={styles.cardFooter}>
                    <div>
                      <span className={styles.priceLabel}>Mulai dari</span>
                      <span className={styles.price}>{formatRupiah(service.priceStart)}</span>
                    </div>
                    <div className={styles.cardArrow}>
                      <ArrowRight size={18} />
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className={styles.bottomCta}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="reveal">
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 800, marginBottom: 'var(--space-4)' }}>
              Tidak Menemukan yang Anda Cari?
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-8)', maxWidth: 500, margin: '0 auto var(--space-8)' }}>
              Hubungi kami untuk mendiskusikan kebutuhan Anda. Kami bisa mengerjakan project custom sesuai permintaan.
            </p>
            <Link href="/chat" className="btn btn-primary btn-lg">
              Chat dengan Admin
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
