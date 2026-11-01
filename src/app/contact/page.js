'use client';

import { useState, useEffect } from 'react';
import { faqs, waLink, WHATSAPP_DISPLAY, INSTAGRAM_URL, TIKTOK_URL } from '@/lib/utils';
import { MapPin, Mail, Phone, Clock, Send, ChevronDown, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import styles from './page.module.css';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [feedbackMsg, setFeedbackMsg] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('revealed'); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('loading');
    setFeedbackMsg('');

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || '66ca6f81-326a-44a3-bf3b-f9e48f8f5bd6';

    // Fallback otomatis ke WhatsApp jika access key belum diisi di .env.local
    if (!accessKey) {
      const message = [
        'Halo VONETIS,',
        '',
        `*Nama:* ${form.name}`,
        `*Email:* ${form.email}`,
        `*Subjek:* ${form.subject}`,
        '',
        form.message,
      ].join('\n');
      window.open(waLink(message), '_blank', 'noopener,noreferrer');
      setStatus('success');
      setFeedbackMsg('WhatsApp telah dibuka dengan draf pesan Anda.');
      setTimeout(() => setStatus('idle'), 6000);
      setForm({ name: '', email: '', subject: '', message: '' });
      return;
    }

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: form.name,
          email: form.email,
          subject: form.subject || `Pesan Baru dari ${form.name} (VONETIS)`,
          message: form.message,
          from_name: 'VONETIS Website Contact Form',
        }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus('success');
        setFeedbackMsg('Pesan berhasil terkirim ke email admin! Kami akan membalas ke email Anda secepatnya.');
        setForm({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus('idle'), 7000);
      } else {
        setStatus('error');
        setFeedbackMsg(data.message || 'Gagal mengirim pesan. Silakan coba lagi atau hubungi via WhatsApp.');
      }
    } catch (err) {
      console.error('Web3Forms submit error:', err);
      setStatus('error');
      setFeedbackMsg('Terjadi gangguan jaringan. Silakan hubungi kami langsung via WhatsApp.');
    }
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
                  { icon: <Mail size={20} />, label: 'Email', value: 'officialvonetis@gmail.com', href: 'mailto:officialvonetis@gmail.com' },
                  { icon: <Phone size={20} />, label: 'WhatsApp', value: WHATSAPP_DISPLAY, href: waLink() },
                  {
                    icon: (
                      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                      </svg>
                    ),
                    label: 'Instagram',
                    value: '@vonetisofficial',
                    href: INSTAGRAM_URL,
                  },
                  {
                    icon: (
                      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.12-3.44-3.17-3.8-5.46-.4-2.51.33-5.06 2.01-6.93 1.51-1.67 3.73-2.67 5.96-2.73.04 1.42-.04 2.85.03 4.27-1.33.16-2.62.83-3.43 1.89-.9 1.15-1.18 2.75-.72 4.14.44 1.25 1.54 2.22 2.84 2.5 1.15.26 2.39.06 3.4-.56.9-.53 1.56-1.4 1.83-2.4.15-.55.2-1.12.2-1.69V.02z" />
                      </svg>
                    ),
                    label: 'TikTok',
                    value: '@vonetisofficial',
                    href: TIKTOK_URL,
                  },
                  { icon: <MapPin size={20} />, label: 'Lokasi', value: 'Indonesia' },
                  { icon: <Clock size={20} />, label: 'Jam Kerja', value: '24/7 Online' },
                ].map((item, i) => (
                  <div key={i} className={styles.infoItem}>
                    <div className={styles.infoIcon}>{item.icon}</div>
                    <div>
                      <p className={styles.infoLabel}>{item.label}</p>
                      {item.href ? (
                        <a href={item.href} target="_blank" rel="noopener noreferrer" className={styles.infoValue}>{item.value}</a>
                      ) : (
                        <p className={styles.infoValue}>{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="reveal">
              <form className={`glass-panel-heavy ${styles.formCard}`} onSubmit={handleSubmit} id="contact-form">
                <h2 className={styles.formTitle}>Kirim Pesan</h2>

                {status === 'success' && (
                  <div className={styles.alertSuccess}>
                    <CheckCircle2 size={18} style={{ flexShrink: 0 }} />
                    <span>{feedbackMsg}</span>
                  </div>
                )}

                {status === 'error' && (
                  <div className={styles.alertError}>
                    <AlertCircle size={18} style={{ flexShrink: 0 }} />
                    <span>{feedbackMsg}</span>
                  </div>
                )}

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

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn btn-primary btn-lg w-full"
                  style={{ justifyContent: 'center' }}
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Mengirim Pesan...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Kirim Pesan ke Email
                    </>
                  )}
                </button>

                <div className={styles.orDivider}>
                  <span>atau</span>
                </div>

                <a
                  href={waLink('Halo VONETIS, saya ingin konsultasi langsung.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary w-full"
                  style={{ justifyContent: 'center' }}
                >
                  <Phone size={18} />
                  Chat Langsung via WhatsApp
                </a>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.faqSection} id="faq">
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
