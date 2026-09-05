'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Mail, Lock, Eye, EyeOff, User, Phone, AlertCircle, Loader2, CheckCircle2 } from 'lucide-react';
import styles from './page.module.css';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [successMsg, setSuccessMsg] = useState('');
  
  const { register, loginWithGoogle } = useAuth();
  const router = useRouter();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function getPasswordStrength() {
    const { password } = form;
    if (!password) return { level: 0, text: '', color: '' };
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    const levels = [
      { level: 1, text: 'Lemah', color: '#ef4444' },
      { level: 2, text: 'Cukup', color: '#f59e0b' },
      { level: 3, text: 'Baik', color: '#06b6d4' },
      { level: 4, text: 'Kuat', color: '#10b981' },
    ];
    return levels[score - 1] || { level: 0, text: '', color: '' };
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      setError('Password tidak cocok');
      return;
    }
    if (form.password.length < 6) {
      setError('Password minimal 6 karakter');
      return;
    }
    if (!form.phone || form.phone.length < 9) {
      setError('Nomor HP tidak valid');
      return;
    }

    setLoading(true);
    try {
      await register(form.email, form.password, form.name, form.phone);
      setSuccessMsg('Pendaftaran berhasil! Silakan cek kotak masuk Email Anda untuk memverifikasi akun sebelum Login.');
    } catch (err) {
      console.error(err);
      setError(
        err.code === 'auth/email-already-in-use'
          ? 'Email sudah terdaftar'
          : err.code === 'auth/weak-password'
          ? 'Password terlalu lemah'
          : 'Terjadi kesalahan. Silakan coba lagi.'
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setError('');
    try {
      await loginWithGoogle();
      router.push('/dashboard');
    } catch (err) {
      setError('Gagal daftar dengan Google');
    }
  }

  const strength = getPasswordStrength();

  return (
    <div className={styles.page}>
      <div className={styles.bg}>
        <div className={styles.orb1} />
        <div className={styles.orb2} />
      </div>

      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.leftContent}>
            <Link href="/" className={styles.logo}>
              <span className={styles.logoIcon}>✦</span>
              <span>XATRA<span className="gradient-text">WORKS</span></span>
            </Link>
            <h2 className={styles.leftTitle}>
              Bergabung dengan <span className="gradient-text-hero">XATRA WORKS</span>
            </h2>
            <p className={styles.leftDesc}>
              Daftar sekarang dan nikmati kemudahan memesan layanan kami. Gratis dan cepat!
            </p>
            <div className={styles.features}>
              {['Daftar gratis tanpa biaya', 'Akses semua layanan', 'Notifikasi progress pesanan', 'Histori lengkap transaksi'].map((f, i) => (
                <div key={i} className={styles.featureItem}>
                  <span className={styles.featureCheck}>✓</span>
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.right}>
            <div className={`glass-panel-heavy ${styles.formCard}`}>
              <h1 className={styles.formTitle}>Daftar</h1>
              <p className={styles.formSubtitle}>Buat akun baru XATRA WORKS</p>

              {error && (
                <div className={styles.error}>
                  <AlertCircle size={16} />
                  <span>{error}</span>
                </div>
              )}

              {successMsg ? (
                <div style={{ textAlign: 'center', padding: 'var(--space-6) 0' }}>
                  <div style={{ display: 'inline-flex', padding: '16px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent-success)', marginBottom: '16px' }}>
                    <CheckCircle2 size={48} />
                  </div>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>Pendaftaran Berhasil!</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6', marginBottom: '24px' }}>
                    {successMsg}
                  </p>
                  <Link href="/login" className="btn btn-primary w-full" style={{ justifyContent: 'center' }}>
                    Kembali ke Login
                  </Link>
                </div>
              ) : (
                <form className={styles.form} onSubmit={handleSubmit}>
                  <div className={styles.inputGroup}>
                    <label className="label">Nama Lengkap</label>
                    <div className={styles.inputWrap}>
                      <User size={18} className={styles.inputIcon} />
                      <input type="text" name="name" className="input" placeholder="Budi Santoso" value={form.name} onChange={handleChange} style={{ paddingLeft: 40 }} required disabled={loading} />
                    </div>
                  </div>

                  <div className={styles.inputGroup}>
                    <label className="label">Nomor WhatsApp</label>
                    <div className={styles.inputWrap}>
                      <Phone size={18} className={styles.inputIcon} />
                      <input type="tel" name="phone" className="input" placeholder="081234567890" value={form.phone} onChange={handleChange} style={{ paddingLeft: 40 }} required disabled={loading} />
                    </div>
                  </div>

                  <div className={styles.inputGroup}>
                    <label className="label">Email</label>
                    <div className={styles.inputWrap}>
                      <Mail size={18} className={styles.inputIcon} />
                      <input type="email" name="email" className="input" placeholder="budi@email.com" value={form.email} onChange={handleChange} style={{ paddingLeft: 40 }} required disabled={loading} />
                    </div>
                  </div>

                  <div className={styles.inputGroup}>
                    <label className="label">Password</label>
                    <div className={styles.inputWrap}>
                      <Lock size={18} className={styles.inputIcon} />
                      <input type={showPassword ? 'text' : 'password'} name="password" className="input" placeholder="Minimal 6 karakter" value={form.password} onChange={handleChange} style={{ paddingLeft: 40, paddingRight: 40 }} required disabled={loading} />
                      <button type="button" className={styles.eyeBtn} onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {form.password && (
                      <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
                        <div style={{ flex: 1, height: '4px', background: 'var(--glass-border)', borderRadius: '2px', overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${strength.level * 25}%`, background: strength.color, transition: 'all 0.3s ease' }} />
                        </div>
                        <span style={{ color: strength.color, fontWeight: 600 }}>{strength.text}</span>
                      </div>
                    )}
                  </div>

                  <div className={styles.inputGroup}>
                    <label className="label">Konfirmasi Password</label>
                    <div className={styles.inputWrap}>
                      <Lock size={18} className={styles.inputIcon} />
                      <input type={showPassword ? 'text' : 'password'} name="confirmPassword" className="input" placeholder="Ulangi password" value={form.confirmPassword} onChange={handleChange} style={{ paddingLeft: 40, paddingRight: 40 }} required disabled={loading} />
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary w-full" style={{ marginTop: 'var(--space-2)', justifyContent: 'center' }} disabled={loading}>
                    {loading ? <Loader2 size={20} className="animate-spin" /> : 'Daftar Sekarang'}
                  </button>
                </form>
              )}

              {!successMsg && (
                <>
                  <div className={styles.divider}><span>atau</span></div>

              <button className={`btn btn-secondary btn-lg w-full ${styles.googleBtn}`} onClick={handleGoogle} id="google-register-btn">
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Daftar dengan Google
              </button>
              </>
              )}

            <p className={styles.switchText}>
              Sudah punya akun?{' '}
              <Link href="/login" className={styles.switchLink}>Masuk di sini</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
