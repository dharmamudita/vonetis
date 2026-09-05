'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Mail, Lock, Eye, EyeOff, AlertCircle, Loader2 } from 'lucide-react';
import styles from './page.module.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, loginWithGoogle } = useAuth();
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      router.push('/dashboard');
    } catch (err) {
      setError(
        err.code === 'auth/invalid-credential'
          ? 'Email atau password salah'
          : err.code === 'auth/user-not-found'
          ? 'Akun tidak ditemukan'
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
      setError('Gagal login dengan Google');
    }
  }

  return (
    <div className={styles.page}>
      {/* Background Effects */}
      <div className={styles.bg}>
        <div className={styles.orb1} />
        <div className={styles.orb2} />
      </div>

      <div className={styles.container}>
        {/* Left — Illustration / Branding */}
        <div className={styles.left}>
          <div className={styles.leftContent}>
            <Link href="/" className={styles.logo}>
              <span className={styles.logoIcon}>✦</span>
              <span>XATRA<span className="gradient-text">WORKS</span></span>
            </Link>
            <h2 className={styles.leftTitle}>
              Selamat Datang <span className="gradient-text-hero">Kembali</span>
            </h2>
            <p className={styles.leftDesc}>
              Login ke akun Anda untuk mengakses dashboard, melacak pesanan, dan chat dengan tim kami.
            </p>
            <div className={styles.features}>
              {['Dashboard personal', 'Tracking pesanan real-time', 'Chat langsung dengan admin', 'Riwayat transaksi'].map((f, i) => (
                <div key={i} className={styles.featureItem}>
                  <span className={styles.featureCheck}>✓</span>
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right — Form */}
        <div className={styles.right}>
          <div className={`glass-panel-heavy ${styles.formCard}`}>
            <h1 className={styles.formTitle}>Masuk</h1>
            <p className={styles.formSubtitle}>Masuk ke akun XATRA WORKS Anda</p>

            {error && (
              <div className={styles.error}>
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className={styles.form} id="login-form">
              <div className={styles.inputGroup}>
                <label className="label" htmlFor="email">Email</label>
                <div className={styles.inputWrap}>
                  <Mail size={18} className={styles.inputIcon} />
                  <input
                    type="email"
                    id="email"
                    className="input"
                    placeholder="nama@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ paddingLeft: '44px' }}
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label className="label" htmlFor="password">Password</label>
                <div className={styles.inputWrap}>
                  <Lock size={18} className={styles.inputIcon} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    className="input"
                    placeholder="Masukkan password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ paddingLeft: '44px', paddingRight: '44px' }}
                  />
                  <button
                    type="button"
                    className={styles.eyeBtn}
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className={styles.forgotRow}>
                <Link href="/forgot-password" className={styles.forgotLink}>
                  Lupa password?
                </Link>
              </div>

              <button type="submit" className="btn btn-primary btn-lg w-full" disabled={loading} id="login-submit-btn" style={{ justifyContent: 'center' }}>
                {loading ? <Loader2 size={20} className="animate-spin" /> : 'Masuk'}
              </button>
            </form>

            {/* Divider */}
            <div className={styles.divider}>
              <span>atau</span>
            </div>

            {/* Google Login */}
            <button className={`btn btn-secondary btn-lg w-full ${styles.googleBtn}`} onClick={handleGoogle} id="google-login-btn">
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Masuk dengan Google
            </button>

            <p className={styles.switchText}>
              Belum punya akun?{' '}
              <Link href="/register" className={styles.switchLink}>Daftar sekarang</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
