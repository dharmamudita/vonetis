'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { services, formatRupiah, waLink } from '@/lib/utils';
import { ArrowRight, Sparkles, Zap, Shield, CheckCircle2, ArrowUpRight } from 'lucide-react';
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
    
    // Subtle 3D tilt
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -3;
    const rotateY = ((x - centerX) / centerX) * 3;
    
    divRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
  };

  const handleMouseLeave = () => {
    if (!divRef.current) return;
    divRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  return (
    <div 
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`glass-card ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export default function HomePage() {
  const cursorRef = useRef(null);

  useEffect(() => {
    // Custom cursor glow
    const handleGlobalMouseMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener('mousemove', handleGlobalMouseMove);
    
    // Scroll reveal
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('revealed'); }),
      { threshold: 0.08, rootMargin: '0px 0px -60px 0px' }
    );
    document.querySelectorAll('.reveal, .reveal-stagger').forEach((el) => obs.observe(el));
    
    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      obs.disconnect();
    };
  }, []);

  return (
    <div className={styles.page}>
      <div ref={cursorRef} className="cursor-glow" />

      {/* ======== ULTRA HERO ======== */}
      <section className={styles.hero} id="hero-section">
        <div className={styles.heroBg}>
          <div className={styles.orbPrimary} />
          <div className={styles.orbSecondary} />
          <div className={styles.meshGrid} />
        </div>

        <div className={`container ${styles.heroContent}`}>
          <div className={styles.badgeWrap}>
            <div className={`badge badge-premium reveal`}>
              <Sparkles size={14} /> 
              <span>Platform Layanan #1 Indonesia</span>
            </div>
          </div>

          <h1 className={`${styles.heroTitle} reveal`} style={{ transitionDelay: '0.1s' }}>
            Transformasi <span className="gradient-text-hero">Kreatif & Akademik</span><br />
            Tanpa Batas
          </h1>

          <p className={`${styles.heroSubtitle} reveal`} style={{ transitionDelay: '0.2s' }}>
            Dari tugas kompleks hingga mahakarya AI Visual. Kami memberikan kualitas 
            <strong> Ultra Premium</strong> untuk setiap baris kode, pixel, dan kata yang kami buat.
          </p>

          <div className={`${styles.heroCtas} reveal`} style={{ transitionDelay: '0.3s' }}>
            <Link href="/services" className="btn btn-primary btn-lg">
              Eksplorasi Layanan <ArrowRight size={18} />
            </Link>
            <a
              href={waLink('Halo VONETIS, saya ingin konsultasi gratis.')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-lg"
            >
              Konsultasi Gratis
            </a>
          </div>

          <div className={`${styles.trustBar} reveal`} style={{ transitionDelay: '0.4s' }}>
            {[
              { icon: <Shield size={16} />, text: 'Garansi 100% Aman' },
              { icon: <Zap size={16} />, text: 'Pengerjaan Kilat' },
              { icon: <CheckCircle2 size={16} />, text: 'Revisi Gratis' },
            ].map((item, i) => (
              <div key={i} className={styles.trustItem}>
                <div className={styles.trustIconWrap}>{item.icon}</div>
                <span className={styles.trustText}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======== BENTO GRID SERVICES ======== */}
      <section className={`section ${styles.servicesSection}`}>
        <div className="container">
          <div className="reveal">
            <span className="section-label">Layanan Eksklusif</span>
            <h2 className="section-title">Solusi Terintegrasi</h2>
            <p className="section-subtitle">Satu platform untuk semua kebutuhan digital dan akademik Anda dengan standar kualitas tertinggi.</p>
          </div>

          <div className={`${styles.bentoGrid} reveal-stagger`}>
            {services.slice(0, 5).map((service, index) => (
              <SpotlightCard 
                key={service.id} 
                className={`${styles.bentoCard} ${index === 0 ? styles.bentoLarge : ''}`}
              >
                <div className={styles.bentoInner}>
                  <div className={styles.bentoHeader}>
                    <div className={styles.iconBox}>
                      {service.icon}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {index === 0 && (
                        <span className={styles.popularBadge}>★ Terpopuler</span>
                      )}
                      <ArrowUpRight className={styles.bentoArrow} size={24} />
                    </div>
                  </div>
                  <div className={styles.bentoBody}>
                    <h3 className={styles.bentoTitle}>{service.title}</h3>
                    <p className={styles.bentoDesc}>{service.shortDesc}</p>
                  </div>
                  <div className={styles.bentoFooter}>
                    <div className={styles.bentoPrice}>
                      <span className={styles.bentoPriceLabel}>Mulai dari</span>
                      <span className={styles.bentoPriceValue}>{formatRupiah(service.priceStart)}</span>
                    </div>
                    <Link href={`/services/${service.slug}`} className={styles.bentoLink}>
                      Pelajari Lebih Lanjut
                    </Link>
                  </div>
                </div>
              </SpotlightCard>
            ))}
            
            <SpotlightCard className={`${styles.bentoCard} ${styles.bentoCta}`}>
              <div className={styles.bentoCtaInner}>
                <h3 className={styles.bentoCtaTitle}>Lihat Semua Layanan</h3>
                <p className={styles.bentoCtaDesc}>Jelajahi 9+ layanan premium kami yang dirancang khusus untuk Anda.</p>
                <Link href="/services" className="btn btn-primary">
                  Eksplorasi Sekarang
                </Link>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </section>

      {/* ======== PREMIUM WHY US ======== */}
      <section className="section">
        <div className="container">
          <div className="reveal">
            <span className="section-label">Keunggulan VONETIS</span>
            <h2 className="section-title">Standar <span className="gradient-text">Premium</span></h2>
          </div>
          
          <div className={`${styles.whyGrid} reveal-stagger`}>
            {(() => {
              const whyChooseUs = [
                { title: 'Kualitas Tanpa Kompromi', desc: 'Setiap project dikerjakan oleh expert dengan standar industri tertinggi.', icon: <Sparkles size={28} color="var(--emerald)" /> },
                { title: 'Kecepatan Presisi', desc: 'Selesai tepat waktu tanpa mengorbankan detail dan kualitas akhir.', icon: <Zap size={28} color="var(--emerald)" /> },
                { title: 'Garansi Kepuasan', desc: 'Revisi terstruktur hingga hasil benar-benar sesuai dengan ekspektasi Anda.', icon: <Shield size={28} color="var(--emerald)" /> },
              ];
              return whyChooseUs.map((item, i) => (
                <SpotlightCard key={i} className={styles.whyCard}>
                  <div className={styles.whyIcon}>{item.icon}</div>
                  <h3 className={styles.whyTitle}>{item.title}</h3>
                  <p className={styles.whyDesc}>{item.desc}</p>
                </SpotlightCard>
              ));
            })()}
          </div>
        </div>
      </section>

      {/* ======== CTA ======== */}
      <section className={styles.ctaSection}>
        <div className="container">
          <SpotlightCard className={`${styles.ctaCard} reveal`}>
            <div className={styles.ctaContent}>
              <h2 className={styles.ctaTitle}>Siap Merealisasikan Ide Anda?</h2>
              <p className={styles.ctaSubtitle}>Mari berkolaborasi untuk menciptakan karya luar biasa bersama tim ahli kami.</p>
              <div className={styles.ctaActions}>
                <Link href="/order" className="btn btn-primary btn-lg">Mulai Project Baru</Link>
                <Link href="/contact" className="btn btn-secondary btn-lg">Hubungi Sales</Link>
              </div>
            </div>
            {/* Visual elements inside CTA */}
            <div className={styles.ctaGlow1} />
            <div className={styles.ctaGlow2} />
          </SpotlightCard>
        </div>
      </section>
    </div>
  );
}
