import { motion } from 'framer-motion';
import { Phone, Mail, MapPin } from 'lucide-react';

const links = [
  { href: '#catalog', label: 'Каталог техники' },
  { href: '#about', label: 'О компании' },
  { href: '#advantages', label: 'Преимущества' },
  { href: '#contact', label: 'Контакты' },
];

const equipment = [
  'Экскаваторы', 'Погрузчики', 'Бульдозеры',
  'Краны и подъёмники', 'Дорожные катки',
  'Тягачи и грузовики', 'Прицепы', 'Спецтехника',
];

export default function Footer() {
  const handleNav = (e, href) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer style={{
      background: '#060606',
      borderTop: '1px solid rgba(200,168,75,0.12)',
      padding: '60px 0 0',
    }}>
      <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.2fr', gap: 48, marginBottom: 48 }} className="footer-grid">

          {/* Brand */}
          <div>
            <img
              src="/images/Secondary%20эмблема%20МЛС-СТРОЙ.pdf.png"
              alt="МЛС-СТРОЙ"
              style={{ height: 50, marginBottom: 20, filter: 'drop-shadow(0 0 8px rgba(200,168,75,0.2))' }}
            />
            <p style={{ fontSize: 13, color: '#555', lineHeight: 1.8, maxWidth: 280, marginBottom: 24 }}>
              Аренда спецтехники в Москве и Московской области. Собственный парк — более 55 единиц. Работаем официально.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              {['ВК', 'ТГ', 'WA'].map((s) => (
                <div key={s} style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  border: '1px solid rgba(200,168,75,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 11,
                  fontWeight: 700,
                  color: '#555',
                  fontFamily: 'Montserrat, sans-serif',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#c8a84b'; e.currentTarget.style.color = '#c8a84b'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(200,168,75,0.2)'; e.currentTarget.style.color = '#555'; }}
                >
                  {s}
                </div>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#c8a84b', fontFamily: 'Montserrat, sans-serif', marginBottom: 20 }}>
              Навигация
            </div>
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNav(e, link.href)}
                style={{
                  display: 'block',
                  fontSize: 13,
                  color: '#555',
                  marginBottom: 12,
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.target.style.color = '#c8a84b')}
                onMouseLeave={(e) => (e.target.style.color = '#555')}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Техника */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#c8a84b', fontFamily: 'Montserrat, sans-serif', marginBottom: 20 }}>
              Техника
            </div>
            {equipment.map((e) => (
              <a
                key={e}
                href="#catalog"
                onClick={(ev) => handleNav(ev, '#catalog')}
                style={{ display: 'block', fontSize: 13, color: '#555', marginBottom: 12, transition: 'color 0.2s' }}
                onMouseEnter={(ev) => (ev.target.style.color = '#c8a84b')}
                onMouseLeave={(ev) => (ev.target.style.color = '#555')}
              >
                {e}
              </a>
            ))}
          </div>

          {/* Contacts */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#c8a84b', fontFamily: 'Montserrat, sans-serif', marginBottom: 20 }}>
              Контакты
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <a href="tel:+79009999999" style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#888', fontSize: 14, textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#c8a84b')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#888')}>
                <Phone size={15} color="#c8a84b" />
                +7 (900) 999-99-99
              </a>
              <a href="mailto:info@mls-stroy.ru" style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#888', fontSize: 14, textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#c8a84b')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#888')}>
                <Mail size={15} color="#c8a84b" />
                info@mls-stroy.ru
              </a>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, color: '#666', fontSize: 13 }}>
                <MapPin size={15} color="#c8a84b" style={{ flexShrink: 0, marginTop: 2 }} />
                Москва и Московская область
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.05)',
          padding: '20px 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 10,
        }}>
          <span style={{ fontSize: 12, color: '#333' }}>
            © {new Date().getFullYear()} МЛС-СТРОЙ. Все права защищены.
          </span>
          <span style={{ fontSize: 12, color: '#333' }}>
            Аренда спецтехники в Москве и МО
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
        }
        @media (max-width: 500px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
