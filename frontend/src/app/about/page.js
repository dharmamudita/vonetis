'use client';

import { useEffect } from 'react';
import { services, stats } from '@/lib/utils';
import styles from './page.module.css';

export default function AboutPage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('revealed'); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const timeline = [
    { year: '2021', title: 'Berdiri', desc: 'XATRA WORKS didirikan dengan visi membantu mahasiswa dan profesional Indonesia.' },
    { year: '2022', title: 'Ekspansi', desc: 'Memperluas layanan ke video editing, foto editing, dan pembuatan website.' },
    { year: '2023', title: '1000+ Klien', desc: 'Mencapai milestone 1000 klien puas dari seluruh Indonesia.' },
    { year: '2024', title: 'AI Integration', desc: 'Menghadirkan layanan AI foto dan video generator pertama.' },
    { year: '2025', title: 'Platform Digital', desc: 'Meluncurkan platform digital dengan dashboard dan chat real-time.' },
  ];

  return (
    <div className="page-wrapper">
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroBg}><div className={styles.orb1} /><div className={styles.orb2} /></div>
        <div className={`container ${styles.heroContent}`}>
          <h1 className={styles.heroTitle}>Tentang <span className="gradient-text-hero">XATRA WORKS</span></h1>
          <p className={styles.heroDesc}>Kami adalah tim profesional yang berdedikasi membantu mahasiswa dan profesional Indonesia mencapai tujuan mereka melalui layanan berkualitas tinggi.</p>
        </div>
      </section>

      {/* Mission */}
      <section className="section">
        <div className="container">
          <div className={styles.missionGrid}>
            <div className="reveal">
              <div className={`glass-panel ${styles.missionCard}`}>
                <h3 className={styles.missionTitle}>🎯 Misi Kami</h3>
                <p>Menyediakan layanan jasa akademik dan kreatif berkualitas tinggi yang terjangkau, membantu setiap klien meraih hasil terbaik dengan kepuasan 100%.</p>
              </div>
            </div>
            <div className="reveal">
              <div className={`glass-panel ${styles.missionCard}`}>
                <h3 className={styles.missionTitle}>👁️ Visi Kami</h3>
                <p>Menjadi platform layanan jasa akademik dan kreatif #1 di Indonesia yang dipercaya jutaan pengguna dengan standar kualitas internasional.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="reveal">
            <h2 className="section-title">Perjalanan <span className="gradient-text">Kami</span></h2>
          </div>
          <div className={styles.timeline}>
            {timeline.map((item, i) => (
              <div key={i} className={`reveal ${styles.timelineItem}`}>
                <div className={styles.timelineYear}>{item.year}</div>
                <div className={styles.timelineDot} />
                <div className={`glass-card ${styles.timelineCard}`}>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section">
        <div className="container">
          <div className="reveal">
            <h2 className="section-title">Tim <span className="gradient-text">Kami</span></h2>
            <p className="section-subtitle">Para profesional di balik kesuksesan XATRA WORKS</p>
          </div>
          <div className={styles.teamGrid}>
            {[
              { name: 'Xatra', role: 'Founder & CEO', emoji: '👨‍💻' },
              { name: 'Tim Akademik', role: 'Academic Specialists', emoji: '📚' },
              { name: 'Tim Developer', role: 'Software Engineers', emoji: '💻' },
              { name: 'Tim Kreatif', role: 'Creative Directors', emoji: '🎨' },
            ].map((member, i) => (
              <div key={i} className={`reveal glass-card ${styles.teamCard}`}>
                <div className={styles.teamAvatar}>{member.emoji}</div>
                <h3 className={styles.teamName}>{member.name}</h3>
                <p className={styles.teamRole}>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
