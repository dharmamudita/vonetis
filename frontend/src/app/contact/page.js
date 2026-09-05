'use client';

import { useState, useEffect } from 'react';
import { faqs } from '@/lib/utils';
import { MapPin, Mail, Phone, Clock, Send, ChevronDown } from 'lucide-react';
import styles from './page.module.css';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('revealed'); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setForm({ name: '', email: '', subject: '', message: '' });
  }

  return (
    <div className="page-wrapper">
      <section className={styles.hero}>
        <div className={styles.heroBg}><div className={styles.orb1} /><div className={styles.orb2} /></div>
        <div className={`container ${styles.heroContent}`}>
          <h1 className={styles.heroTitle}>Hubungi <span className="gradient-text-hero">Kami</span></h1>
          <p className={styles.heroDesc}>Ada pertanyaan? Jangan ragu untuk menghubungi kami. Tim support kami siap membantu 24/7.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.grid}>
            {/* Contact Info */}
            <div className={`reveal ${styles.infoCol}`}>
              <h2 className={styles.infoTitle}>Informasi Kontak</h2>
              <div className={styles.infoList}>
                {[
                  { icon: <Mail size={20} />, label: 'Email', value: 'hello@xatraworks.com' },
                  { icon: <Phone size={20} />, label: 'WhatsApp', value: '+62 812-3456-7890' },
                  { icon: <MapPin size={20} />, label: 'Lokasi', value: 'Indonesia' },
                  { icon: <Clock size={20} />, label: 'Jam Kerja', value: '24/7 Online' },
                ].map((item, i) => (
                  <div key={i} className={styles.infoItem}>
                    <div className={styles.infoIcon}>{item.icon}</div>
                    <div>
                      <p className={styles.infoLabel}>{item.label}</p>
                      <p className={styles.infoValue}>{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="reveal">
              <form className={`glass-panel-heavy ${styles.formCard}`} onSubmit={handleSubmit} id="contact-form">
                <h2 className={styles.formTitle}>Kirim Pesan</h2>
                <div className={styles.formGroup}>
                  <label className="label">Nama</label>
                  <input className="input" placeholder="Nama Anda" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                </div>
                <div className={styles.formGroup}>
                  <label className="label">Email</label>
                  <input type="email" className="input" placeholder="email@anda.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                </div>
                <div className={styles.formGroup}>
                  <label className="label">Subjek</label>
                  <input className="input" placeholder="Subjek pesan" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} required />
                </div>
                <div className={styles.formGroup}>
                  <label className="label">Pesan</label>
                  <textarea className="input textarea" placeholder="Tulis pesan Anda..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
                </div>
                <button type="submit" className="btn btn-primary btn-lg w-full" style={{ justifyContent: 'center' }}>
                  {submitted ? '✓ Terkirim!' : <><Send size={18} /> Kirim Pesan</>}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" style={{ background: 'var(--bg-secondary)' }} id="faq">
        <div className="container container-narrow">
          <div className="reveal">
            <h2 className="section-title">Pertanyaan <span className="gradient-text">Umum</span></h2>
          </div>
          <div className={`reveal ${styles.faqList}`}>
            {faqs.map((faq, i) => (
              <details key={i} className={styles.faqItem}>
                <summary className={styles.faqQuestion}>
                  <span>{faq.question}</span>
                  <ChevronDown size={20} className={styles.faqChevron} />
                </summary>
                <div className={styles.faqAnswer}><p>{faq.answer}</p></div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
