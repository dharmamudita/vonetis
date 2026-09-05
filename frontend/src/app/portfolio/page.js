'use client';

import { useState, useEffect } from 'react';
import { services } from '@/lib/utils';
import styles from './page.module.css';

export default function PortfolioPage() {
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('revealed'); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const portfolioItems = [
    { id: 1, title: 'E-Commerce Platform', category: 'website-aplikasi', gradient: 'linear-gradient(135deg, #2563eb, #60a5fa)' },
    { id: 2, title: 'Skripsi Teknik Informatika', category: 'skripsi', gradient: 'linear-gradient(135deg, #8b5cf6, #c4b5fd)' },
    { id: 3, title: 'Brand Video Campaign', category: 'video-editor', gradient: 'linear-gradient(135deg, #ef4444, #f87171)' },
    { id: 4, title: 'Product Photography', category: 'foto-editor', gradient: 'linear-gradient(135deg, #ec4899, #f472b6)' },
    { id: 5, title: 'AI Generated Artwork', category: 'ai-foto', gradient: 'linear-gradient(135deg, #06b6d4, #67e8f9)' },
    { id: 6, title: 'Mobile Banking App', category: 'website-aplikasi', gradient: 'linear-gradient(135deg, #10b981, #34d399)' },
    { id: 7, title: 'Proposal Lomba Nasional', category: 'turnamen-nasional', gradient: 'linear-gradient(135deg, #f59e0b, #fbbf24)' },
    { id: 8, title: 'Laporan KKN Desa Digital', category: 'laporan-pkl-magang-kkn', gradient: 'linear-gradient(135deg, #10b981, #34d399)' },
    { id: 9, title: 'AI Explainer Video', category: 'ai-video', gradient: 'linear-gradient(135deg, #8b5cf6, #06b6d4)' },
  ];

  const filtered = filter === 'all' ? portfolioItems : portfolioItems.filter((p) => p.category === filter);

  return (
    <div className="page-wrapper">
      <section className={styles.hero}>
        <div className={styles.heroBg}><div className={styles.orb1} /><div className={styles.orb2} /></div>
        <div className={`container ${styles.heroContent}`}>
          <h1 className={styles.heroTitle}>Portfolio <span className="gradient-text-hero">Kami</span></h1>
          <p className={styles.heroDesc}>Karya terbaik dari tim XATRA WORKS untuk berbagai klien</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {/* Filter */}
          <div className={styles.filters}>
            <button className={`${styles.filterBtn} ${filter === 'all' ? styles.filterActive : ''}`} onClick={() => setFilter('all')}>Semua</button>
            {services.slice(0, 6).map((s) => (
              <button key={s.id} className={`${styles.filterBtn} ${filter === s.id ? styles.filterActive : ''}`} onClick={() => setFilter(s.id)}>
                {s.icon} {s.title.split(' ')[0]}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className={styles.grid}>
            {filtered.map((item, i) => (
              <div key={item.id} className={`reveal ${styles.card}`} style={{ animationDelay: `${i * 80}ms` }}>
                <div className={styles.cardImage} style={{ background: item.gradient }}>
                  {/* Emptied to let the beautiful gradient shine without emojis */}
                </div>
                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <span className="badge badge-primary">{services.find((s) => s.id === item.category)?.title || item.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
