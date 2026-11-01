'use client';

import { useState, useEffect } from 'react';
import { faqs, waLink, WHATSAPP_DISPLAY } from '@/lib/utils';
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

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

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
