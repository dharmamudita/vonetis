'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, AlertCircle, CheckCircle2, Mail, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import styles from './page.module.css';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { resetPassword } = useAuth();

  async function handleResetPassword(e) {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    
    try {
      await resetPassword(email);
      setSuccess('Link untuk mereset password telah dikirim ke email Anda. Silakan cek kotak masuk atau folder spam.');
    } catch (err) {
      console.error(err);
      setError(
        err.code === 'auth/user-not-found'
          ? 'Email tidak terdaftar'
          : 'Gagal mengirim link reset password. Pastikan email benar.'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.bg}>
        <div className={styles.orb1} />
        <div className={styles.orb2} />
      </div>

      <div className={styles.container} style={{ maxWidth: '500px' }}>
        <div className={styles.right} style={{ width: '100%', padding: 0 }}>
          
          <div className={`glass-panel-heavy ${styles.formCard}`}>
            <Link href="/login" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', marginBottom: 'var(--space-6)', fontSize: 'var(--text-sm)' }}>
              <ArrowLeft size={16} /> Kembali ke Login
            </Link>
            
            <h1 className={styles.formTitle}>Lupa Password</h1>
            <p className={styles.formSubtitle}>
              Masukkan email terdaftar Anda untuk menerima link reset password.
            </p>

            {error && (
              <div className={styles.error}>
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}
            
            {success ? (
              <div style={{ textAlign: 'center', padding: 'var(--space-4) 0' }}>
                <div style={{ display: 'inline-flex', padding: '16px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent-success)', marginBottom: '16px' }}>
                  <CheckCircle2 size={48} />
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>Email Terkirim!</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6', marginBottom: '24px' }}>
                  {success}
                </p>
                <Link href="/login" className="btn btn-primary w-full" style={{ justifyContent: 'center' }}>
                  Kembali ke Login
                </Link>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleResetPassword}>
                <div className={styles.inputGroup}>
                  <label className="label">Email Terdaftar</label>
                  <div className={styles.inputWrap}>
                    <Mail size={18} className={styles.inputIcon} />
                    <input 
                      type="email" 
                      className="input" 
                      placeholder="nama@email.com" 
                      value={email} 
                      onChange={e => setEmail(e.target.value)} 
                      required 
                      disabled={loading} 
                      style={{ paddingLeft: 40 }}
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-primary w-full" disabled={loading} style={{ justifyContent: 'center', marginTop: 'var(--space-4)' }}>
                  {loading ? <Loader2 size={20} className="animate-spin" /> : 'Kirim Link Reset'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
