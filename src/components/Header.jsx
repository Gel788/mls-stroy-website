import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Menu, X, ChevronRight } from 'lucide-react';

const navLinks = [
  { href: '#catalog', label: 'Каталог техники' },
  { href: '#about', label: 'О компании' },
  { href: '#advantages', label: 'Преимущества' },
  { href: '#contact', label: 'Контакты' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <motion.header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: scrolled ? '12px 0' : '20px 0',
          background: scrolled
            ? 'rgba(8,8,8,0.97)'
            : 'linear-gradient(to bottom, rgba(8,8,8,0.8), transparent)',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(200,168,75,0.15)' : 'none',
          transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
        }}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <a href="#" onClick={(e) => handleNavClick(e, '#hero')} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <img
              src="/images/Secondary%20эмблема%20МЛС-СТРОЙ.pdf.png"
              alt="МЛС-СТРОЙ"
              style={{ height: 44, width: 'auto', filter: 'drop-shadow(0 0 8px rgba(200,168,75,0.3))' }}
            />
          </a>

          {/* Desktop nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 32 }} className="desktop-nav">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#aaa',
                  transition: 'color 0.3s',
                  fontFamily: 'Montserrat, sans-serif',
                }}
                onMouseEnter={(e) => (e.target.style.color = '#c8a84b')}
                onMouseLeave={(e) => (e.target.style.color = '#aaa')}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <a
              href="tel:+79009999999"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 14,
                fontWeight: 600,
                color: 'var(--gold)',
                fontFamily: 'Montserrat, sans-serif',
                letterSpacing: '0.02em',
              }}
            >
              <Phone size={16} />
              <span className="phone-text">+7 (900) 999-99-99</span>
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              style={{
                padding: '10px 22px',
                background: 'linear-gradient(135deg, var(--gold), var(--gold-dark))',
                color: '#000',
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                borderRadius: 2,
                fontFamily: 'Montserrat, sans-serif',
                boxShadow: '0 4px 20px rgba(200,168,75,0.25)',
                transition: 'all 0.3s',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => {
                e.target.style.boxShadow = '0 6px 30px rgba(200,168,75,0.5)';
                e.target.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.boxShadow = '0 4px 20px rgba(200,168,75,0.25)';
                e.target.style.transform = 'translateY(0)';
              }}
              className="cta-btn"
            >
              Заказать аренду
            </a>
            {/* Mobile menu toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ color: '#fff', display: 'none', padding: 4 }}
              className="menu-toggle"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: '80%',
              maxWidth: 320,
              background: '#0e0e0e',
              zIndex: 2000,
              padding: '80px 32px 40px',
              borderLeft: '1px solid rgba(200,168,75,0.15)',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}
          >
            <button
              onClick={() => setMenuOpen(false)}
              style={{ position: 'absolute', top: 24, right: 24, color: '#fff' }}
            >
              <X size={24} />
            </button>
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                  fontSize: 15,
                  fontWeight: 600,
                  color: '#ddd',
                  fontFamily: 'Montserrat, sans-serif',
                  letterSpacing: '0.05em',
                }}
              >
                {link.label}
                <ChevronRight size={16} color="#c8a84b" />
              </motion.a>
            ))}
            <div style={{ marginTop: 32 }}>
              <a
                href="tel:+79009999999"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  color: 'var(--gold)',
                  fontSize: 16,
                  fontWeight: 700,
                  fontFamily: 'Montserrat, sans-serif',
                }}
              >
                <Phone size={18} />
                +7 (900) 999-99-99
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile menu backdrop */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.7)',
              zIndex: 1999,
              backdropFilter: 'blur(4px)',
            }}
          />
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .menu-toggle { display: block !important; }
          .phone-text { display: none; }
          .cta-btn { display: none !important; }
        }
        @media (max-width: 480px) {
          .phone-text { display: none; }
        }
      `}</style>
    </>
  );
}
