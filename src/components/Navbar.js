'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, MessageCircle } from 'lucide-react';
import { waLink } from '@/lib/utils';
import styles from './Navbar.module.css';

const navLinks = [
  { href: '/', label: 'Beranda' },
  { href: '/services', label: 'Layanan' },
  { href: '/order', label: 'Pesan' },
  { href: '/contact', label: 'Kontak' },
];

const WA_GREETING = 'Halo VONETIS, saya ingin bertanya tentang layanan Anda.';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`} id="navbar">
      <div className={`container ${styles.inner}`}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <span className={styles.logoMark}>
            <span className={styles.logoIcon}>V</span>
          </span>
          <span className={styles.logoText}>
            VONE<span className={styles.logoAccent}>TIS</span>
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
            </Link>
          ))}
        </nav>

        {/* Right Side */}
        <div className={styles.right}>
          <a
            href={waLink(WA_GREETING)}
            target="_blank"
            rel="noopener noreferrer"
            className={`btn btn-primary ${styles.ctaBtn}`}
          >
            <MessageCircle size={16} />
            <span>Chat WhatsApp</span>
          </a>

          {/* Mobile Toggle */}
          <button className={styles.mobileToggle} onClick={() => setMobileOpen(!mobileOpen)} id="mobile-menu-btn" aria-label="Menu">
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className={styles.mobileNav}>
          <div className={styles.mobileNavInner}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.mobileLink} ${pathname === link.href ? styles.mobileLinkActive : ''}`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
                {pathname === link.href && <span className={styles.mobileLinkDot} />}
              </Link>
            ))}
            <div className={styles.mobileCta}>
              <a
                href={waLink(WA_GREETING)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary w-full"
                style={{ justifyContent: 'center' }}
                onClick={() => setMobileOpen(false)}
              >
                <MessageCircle size={18} /> Chat WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
