'use client';

import { useEffect } from 'react';
import { testimonials } from '@/lib/utils';
import { Star } from 'lucide-react';
import styles from './page.module.css';

export default function TestimonialsPage() {
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
      <section className={styles.hero}>
        <div className={styles.heroBg}><div className={styles.orb1} /><div className={styles.orb2} /></div>
        <div className={`container ${styles.heroContent}`}>
          <h1 className={styles.heroTitle}>Testimoni <span className="gradient-text-hero">Klien</span></h1>
          <p className={styles.heroDesc}>Lihat apa yang dikatakan klien kami tentang layanan XATRA WORKS</p>
          <div className={styles.overallRating}>
            <div className={styles.ratingStars}>
              {[1,2,3,4,5].map((i) => <Star key={i} size={24} fill="#fbbf24" color="#fbbf24" />)}
            </div>
            <span className={styles.ratingValue}>4.9/5</span>
            <span className={styles.ratingCount}>dari 1200+ review</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.grid}>
            {[...testimonials, ...testimonials].map((t, index) => (
              <div key={index} className={`reveal glass-card ${styles.card}`} style={{ animationDelay: `${(index % 6) * 80}ms` }}>
                <div className={styles.cardHeader}>
                  <div className={styles.avatar}>{t.name[0]}</div>
                  <div>
                    <h3 className={styles.name}>{t.name}</h3>
                    <p className={styles.role}>{t.role}</p>
                  </div>
                </div>
                <div className={styles.stars}>
                  {Array.from({ length: t.rating }).map((_, i) => <Star key={i} size={14} fill="#fbbf24" color="#fbbf24" />)}
                </div>
                <p className={styles.text}>&ldquo;{t.text}&rdquo;</p>
                <span className="badge badge-primary">{t.service}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
