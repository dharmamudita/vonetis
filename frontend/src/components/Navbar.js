'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Menu, X, ChevronDown, User, LogOut, LayoutDashboard, MessageCircle, Package } from 'lucide-react';
import styles from './Navbar.module.css';

const navLinks = [
  { href: '/services', label: 'Layanan' },
  { href: '/pricing', label: 'Harga' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/about', label: 'Tentang' },
  { href: '/testimonials', label: 'Testimoni' },
  { href: '/contact', label: 'Kontak' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); setUserMenuOpen(false); }, [pathname]);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`} id="navbar">
      <div className={`container ${styles.inner}`}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <span className={styles.logoMark}>
            <span className={styles.logoIcon}>✦</span>
          </span>
          <span className={styles.logoText}>
            XATRA<span className={styles.logoAccent}>WORKS</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className={styles.nav}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.navLink} ${pathname === link.href ? styles.navLinkActive : ''}`}
            >
              <span>{link.label}</span>
              {pathname === link.href && <span className={styles.navDot} />}
            </Link>
          ))}
        </nav>

        {/* Right Side */}
        <div className={styles.right}>
          {user ? (
            <div className={styles.userMenu}>
              <button className={styles.userBtn} onClick={() => setUserMenuOpen(!userMenuOpen)} id="user-menu-btn">
                <div className={styles.userAvatar}>
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="" className={styles.userAvatarImg} />
                  ) : (
                    <span>{(user.displayName || 'U')[0]}</span>
                  )}
                  <span className={styles.onlineDot} />
                </div>
                <ChevronDown size={14} className={`${styles.chevron} ${userMenuOpen ? styles.chevronOpen : ''}`} />
              </button>

              {userMenuOpen && (
                <div className={styles.dropdown}>
                  <div className={styles.dropdownHeader}>
                    <p className={styles.dropdownName}>{user.displayName || 'User'}</p>
                    <p className={styles.dropdownEmail}>{user.email}</p>
                  </div>
                  <div className={styles.dropdownDivider} />
                  <Link href="/dashboard" className={styles.dropdownItem}><LayoutDashboard size={16} /> Dashboard</Link>
                  <Link href="/chat" className={styles.dropdownItem}><MessageCircle size={16} /> Chat</Link>
                  <Link href="/dashboard/orders" className={styles.dropdownItem}><Package size={16} /> Pesanan</Link>
                  <Link href="/dashboard/profile" className={styles.dropdownItem}><User size={16} /> Profil</Link>
                  <div className={styles.dropdownDivider} />
                  <button className={`${styles.dropdownItem} ${styles.dropdownLogout}`} onClick={logout}><LogOut size={16} /> Keluar</button>
                </div>
              )}
            </div>
          ) : (
            <div className={styles.authBtns}>
              <Link href="/login" className={styles.loginBtn}>Masuk</Link>
              <Link href="/register" className={`btn btn-primary ${styles.registerBtn}`}>
                <span>Daftar</span>
              </Link>
            </div>
          )}

          {/* Mobile Toggle */}
          <button className={styles.mobileToggle} onClick={() => setMobileOpen(!mobileOpen)} id="mobile-menu-btn">
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className={styles.mobileNav}>
          <div className={styles.mobileNavInner}>
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={`${styles.mobileLink} ${pathname === link.href ? styles.mobileLinkActive : ''}`}>
                {link.label}
                {pathname === link.href && <span className={styles.mobileLinkDot} />}
              </Link>
            ))}
            <div className={styles.dropdownDivider} />
            {!user ? (
              <div className={styles.mobileAuthBtns}>
                <Link href="/login" className="btn btn-secondary w-full" style={{ justifyContent: 'center' }}>Masuk</Link>
                <Link href="/register" className="btn btn-primary w-full" style={{ justifyContent: 'center' }}>Daftar</Link>
              </div>
            ) : (
              <Link href="/dashboard" className="btn btn-primary w-full" style={{ justifyContent: 'center' }}>Dashboard</Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
