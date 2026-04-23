import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { X, Phone, MessageCircle, CheckCircle2 } from 'lucide-react';

const included = [
  'Опытный сертифицированный оператор',
  'Страховка техники включена',
  'Техническая поддержка 24/7',
  'Доставка по Москве и МО',
];

function useIsMobile() {
  const [mobile, setMobile] = useState(() => window.innerWidth <= 720);
  useEffect(() => {
    const fn = () => setMobile(window.innerWidth <= 720);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);
  return mobile;
}

export default function EquipmentModal({ item, onClose }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return createPortal(
    <>
      {/* ── Backdrop ─────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        transition={{ duration: 0.28 }}
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,0.9)',
          backdropFilter: 'blur(10px)',
          zIndex: 3000,
        }}
      />

      {/* ══════════════════════════════════════════════════════════════
          MOBILE  — fullscreen slide-up
      ══════════════════════════════════════════════════════════════ */}
      {isMobile && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.38, ease: [0.32, 0.72, 0, 1] }}
          style={{
            position: 'fixed', inset: 0,
            zIndex: 3001,
            background: '#0f0f0f',
            display: 'flex', flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* ── Sticky top bar ─────────────────────────────────────── */}
          <div style={{
            flexShrink: 0,
            display: 'flex', alignItems: 'center',
            padding: '0 16px',
            height: 56,
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            background: 'rgba(15,15,15,0.95)',
            backdropFilter: 'blur(12px)',
            gap: 12,
          }}>
            <button
              onClick={onClose}
              style={{
                flexShrink: 0,
                width: 36, height: 36, borderRadius: '50%',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#aaa', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <X size={17} />
            </button>
            <span style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: 13, fontWeight: 800, color: '#e8e8e8',
              letterSpacing: '-0.01em',
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>
              {item.name}
            </span>
          </div>

          {/* ── Hero image ─────────────────────────────────────────── */}
          <div style={{
            flexShrink: 0, position: 'relative',
            height: 220, background: '#080808',
          }}>
            {!imgLoaded && (
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(90deg, #111 25%, #1c1c1c 50%, #111 75%)',
                backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite',
              }} />
            )}
            <img
              src={`/images/${item.image}`}
              alt={item.name}
              onLoad={() => setImgLoaded(true)}
              style={{
                width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                filter: 'brightness(0.85) saturate(0.9)',
                opacity: imgLoaded ? 1 : 0, transition: 'opacity 0.4s',
              }}
            />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(15,15,15,0.95) 0%, transparent 55%)',
            }} />

            {/* Price on image */}
            <div style={{
              position: 'absolute', bottom: 14, left: 16, right: 16,
              display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
            }}>
              <div>
                <div style={{ fontSize: 9, color: '#777', fontFamily: 'Montserrat, sans-serif', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 2 }}>
                  Аренда от
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                  <span style={{
                    fontSize: 26, fontWeight: 900, fontFamily: 'Montserrat, sans-serif',
                    background: 'linear-gradient(135deg, #c8a84b, #f0d882)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                    lineHeight: 1,
                  }}>
                    {item.priceFrom.toLocaleString('ru-RU')}
                  </span>
                  <span style={{ fontSize: 13, color: '#777' }}>₽/смена</span>
                </div>
              </div>
              <div style={{
                padding: '5px 10px',
                background: 'rgba(200,168,75,0.12)', border: '1px solid rgba(200,168,75,0.35)',
                borderRadius: 4, fontSize: 9, fontWeight: 700, color: '#c8a84b',
                fontFamily: 'Montserrat, sans-serif', letterSpacing: '0.1em', textTransform: 'uppercase',
              }}>
                В наличии
              </div>
            </div>
          </div>

          {/* ── Scrollable content ─────────────────────────────────── */}
          <div style={{
            flex: 1, overflowY: 'auto',
            padding: '20px 16px 16px',
            WebkitOverflowScrolling: 'touch',
          }}>
            {/* Description */}
            <p style={{
              fontSize: 13, color: '#777', lineHeight: 1.75, marginBottom: 20,
              paddingBottom: 20, borderBottom: '1px solid rgba(255,255,255,0.05)',
            }}>
              {item.description}
            </p>

            {/* Specs */}
            <div style={{ marginBottom: 20 }}>
              <div style={{
                fontSize: 10, fontWeight: 700, letterSpacing: '0.14em',
                textTransform: 'uppercase', color: '#555',
                fontFamily: 'Montserrat, sans-serif', marginBottom: 8,
              }}>
                Характеристики
              </div>
              <div style={{ border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8, overflow: 'hidden' }}>
                {Object.entries(item.specs).map(([key, val], i, arr) => (
                  <div key={key} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '10px 14px',
                    borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                    background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent',
                  }}>
                    <span style={{ fontSize: 12, color: '#666' }}>{key}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#e0e0e0', fontFamily: 'Montserrat, sans-serif', textAlign: 'right', marginLeft: 8 }}>{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Included */}
            <div style={{ marginBottom: 8 }}>
              <div style={{
                fontSize: 10, fontWeight: 700, letterSpacing: '0.14em',
                textTransform: 'uppercase', color: '#555',
                fontFamily: 'Montserrat, sans-serif', marginBottom: 8,
              }}>
                Включено в стоимость
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {included.map((text) => (
                  <div key={text} style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '10px 14px',
                    background: 'rgba(200,168,75,0.04)',
                    border: '1px solid rgba(200,168,75,0.1)',
                    borderRadius: 8,
                  }}>
                    <CheckCircle2 size={14} color="#c8a84b" style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: 12, color: '#888', lineHeight: 1.4 }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Fixed bottom CTA bar ───────────────────────────────── */}
          <div style={{
            flexShrink: 0,
            padding: '12px 16px',
            paddingBottom: 'max(12px, env(safe-area-inset-bottom))',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            background: 'rgba(15,15,15,0.97)',
            backdropFilter: 'blur(16px)',
            display: 'flex', gap: 10,
          }}>
            <a
              href="tel:+79009999999"
              style={{
                flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                padding: '15px',
                background: 'linear-gradient(135deg, #c8a84b, #9d7a28)',
                color: '#000', fontSize: 13, fontWeight: 800,
                letterSpacing: '0.08em', textTransform: 'uppercase',
                borderRadius: 10, fontFamily: 'Montserrat, sans-serif',
                textDecoration: 'none',
                boxShadow: '0 6px 24px rgba(200,168,75,0.35)',
                WebkitTapHighlightColor: 'transparent',
              }}
            >
              <Phone size={16} /> Позвонить
            </a>
            <a
              href="https://wa.me/79009999999"
              target="_blank" rel="noopener noreferrer"
              style={{
                flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                padding: '15px',
                background: 'rgba(255,255,255,0.05)',
                color: '#ccc', fontSize: 13, fontWeight: 700,
                letterSpacing: '0.06em', textTransform: 'uppercase',
                borderRadius: 10, fontFamily: 'Montserrat, sans-serif',
                textDecoration: 'none',
                border: '1px solid rgba(255,255,255,0.1)',
                WebkitTapHighlightColor: 'transparent',
              }}
            >
              <MessageCircle size={16} /> WhatsApp
            </a>
          </div>
        </motion.div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          DESKTOP — centered modal
      ══════════════════════════════════════════════════════════════ */}
      {!isMobile && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 3001,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '16px', pointerEvents: 'none',
        }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 40 }}
            transition={{ duration: 0.4, ease: [0.34, 1.1, 0.64, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{
              pointerEvents: 'auto',
              width: '100%', maxWidth: 980,
              maxHeight: '92vh',
              background: '#0f0f0f',
              border: '1px solid rgba(200,168,75,0.18)',
              borderRadius: 14,
              boxShadow: '0 40px 120px rgba(0,0,0,0.9)',
              display: 'grid',
              gridTemplateColumns: '1.1fr 1fr',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              style={{
                position: 'absolute', top: 14, right: 14, zIndex: 20,
                width: 38, height: 38, borderRadius: '50%',
                background: 'rgba(0,0,0,0.65)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#999', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backdropFilter: 'blur(8px)', transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(200,168,75,0.2)';
                e.currentTarget.style.borderColor = 'rgba(200,168,75,0.5)';
                e.currentTarget.style.color = '#c8a84b';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(0,0,0,0.65)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.color = '#999';
              }}
            >
              <X size={16} />
            </button>

            {/* ── Left: image ───────────────────────────────────────── */}
            <div style={{ position: 'relative', background: '#080808', overflow: 'hidden' }}>
              {!imgLoaded && (
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(90deg, #111 25%, #1a1a1a 50%, #111 75%)',
                  backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite',
                }} />
              )}
              <img
                src={`/images/${item.image}`}
                alt={item.name}
                onLoad={() => setImgLoaded(true)}
                style={{
                  width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                  filter: 'brightness(0.88) saturate(0.9)',
                  opacity: imgLoaded ? 1 : 0, transition: 'opacity 0.4s',
                }}
              />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(8,8,8,0.92) 0%, transparent 55%)',
              }} />

              {/* Ценник */}
              <div style={{
                position: 'absolute', bottom: 20, left: 20, right: 20,
                padding: '14px 18px',
                background: 'rgba(8,8,8,0.82)',
                border: '1px solid rgba(200,168,75,0.25)',
                borderRadius: 10, backdropFilter: 'blur(14px)',
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: 10, color: '#666', fontFamily: 'Montserrat, sans-serif', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>
                      Стоимость аренды
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                      <span style={{ fontSize: 11, color: '#c8a84b', fontFamily: 'Montserrat, sans-serif' }}>от</span>
                      <span style={{
                        fontSize: 32, fontWeight: 900, fontFamily: 'Montserrat, sans-serif',
                        background: 'linear-gradient(135deg, #c8a84b, #f0d882)',
                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                        lineHeight: 1,
                      }}>
                        {item.priceFrom.toLocaleString('ru-RU')}
                      </span>
                      <span style={{ fontSize: 14, color: '#666' }}>₽</span>
                    </div>
                    <div style={{ fontSize: 10, color: '#555', marginTop: 3 }}>за смену · 8 часов</div>
                  </div>
                  <div style={{
                    padding: '6px 12px',
                    background: 'rgba(200,168,75,0.1)', border: '1px solid rgba(200,168,75,0.3)',
                    borderRadius: 4, fontSize: 9, fontWeight: 700, color: '#c8a84b',
                    fontFamily: 'Montserrat, sans-serif', letterSpacing: '0.1em', textTransform: 'uppercase',
                  }}>
                    В наличии
                  </div>
                </div>
              </div>
            </div>

            {/* ── Right: details ───────────────────────────────────── */}
            <div style={{
              display: 'flex', flexDirection: 'column',
              overflowY: 'auto', background: '#0f0f0f',
            }}>
              <div style={{ padding: '32px 28px 0', flex: 1 }}>
                {/* Eyebrow */}
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  fontSize: 10, fontWeight: 700, letterSpacing: '0.2em',
                  textTransform: 'uppercase', color: '#c8a84b',
                  fontFamily: 'Montserrat, sans-serif', marginBottom: 8,
                }}>
                  <span style={{ display: 'inline-block', width: 16, height: 1, background: '#c8a84b' }} />
                  МЛС-СТРОЙ
                </div>

                <h2 style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: 'clamp(17px, 2vw, 22px)', fontWeight: 800,
                  color: '#f4f4f4', lineHeight: 1.25, marginBottom: 10,
                  letterSpacing: '-0.01em',
                }}>
                  {item.name}
                </h2>

                <p style={{
                  fontSize: 13, color: '#777', lineHeight: 1.75,
                  marginBottom: 20, paddingBottom: 20,
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                }}>
                  {item.description}
                </p>

                {/* Specs */}
                <div style={{ marginBottom: 18 }}>
                  <div style={{
                    fontSize: 10, fontWeight: 700, letterSpacing: '0.14em',
                    textTransform: 'uppercase', color: '#555',
                    fontFamily: 'Montserrat, sans-serif', marginBottom: 8,
                  }}>
                    Технические характеристики
                  </div>
                  <div style={{ border: '1px solid rgba(255,255,255,0.05)', borderRadius: 8, overflow: 'hidden' }}>
                    {Object.entries(item.specs).map(([key, val], i, arr) => (
                      <div key={key} style={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        padding: '9px 12px',
                        borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                        background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent',
                      }}>
                        <span style={{ fontSize: 12, color: '#666', flexShrink: 0, marginRight: 8 }}>{key}</span>
                        <span style={{ fontSize: 12, fontWeight: 700, color: '#e0e0e0', fontFamily: 'Montserrat, sans-serif', textAlign: 'right' }}>{val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Included */}
                <div style={{ marginBottom: 24 }}>
                  <div style={{
                    fontSize: 10, fontWeight: 700, letterSpacing: '0.14em',
                    textTransform: 'uppercase', color: '#555',
                    fontFamily: 'Montserrat, sans-serif', marginBottom: 8,
                  }}>
                    Включено в стоимость
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                    {included.map((text) => (
                      <div key={text} style={{
                        display: 'flex', alignItems: 'flex-start', gap: 8,
                        padding: '9px 12px',
                        background: 'rgba(200,168,75,0.04)',
                        border: '1px solid rgba(200,168,75,0.1)',
                        borderRadius: 6,
                      }}>
                        <CheckCircle2 size={13} color="#c8a84b" style={{ flexShrink: 0, marginTop: 1 }} />
                        <span style={{ fontSize: 11, color: '#888', lineHeight: 1.4 }}>{text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Desktop CTA — sticky bottom inside scroll container */}
              <div style={{
                padding: '0 28px 28px',
                display: 'flex', gap: 10,
                position: 'sticky', bottom: 0,
                background: 'linear-gradient(to bottom, transparent, #0f0f0f 28px)',
                paddingTop: 20,
              }}>
                <a
                  href="tel:+79009999999"
                  style={{
                    flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    padding: '14px',
                    background: 'linear-gradient(135deg, #c8a84b, #9d7a28)',
                    color: '#000', fontSize: 12, fontWeight: 800,
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                    borderRadius: 8, fontFamily: 'Montserrat, sans-serif',
                    textDecoration: 'none',
                    boxShadow: '0 6px 24px rgba(200,168,75,0.35)',
                    transition: 'all 0.25s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 8px 32px rgba(200,168,75,0.55)'}
                  onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 6px 24px rgba(200,168,75,0.35)'}
                >
                  <Phone size={14} /> Позвонить
                </a>
                <a
                  href="https://wa.me/79009999999"
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    padding: '14px',
                    background: 'transparent', color: '#ccc',
                    fontSize: 12, fontWeight: 700,
                    letterSpacing: '0.08em', textTransform: 'uppercase',
                    borderRadius: 8, fontFamily: 'Montserrat, sans-serif',
                    textDecoration: 'none',
                    border: '1px solid rgba(255,255,255,0.12)',
                    transition: 'all 0.25s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(200,168,75,0.35)';
                    e.currentTarget.style.color = '#c8a84b';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
                    e.currentTarget.style.color = '#ccc';
                  }}
                >
                  <MessageCircle size={14} /> WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      <style>{`
        @keyframes shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position:  200% 0; }
        }
      `}</style>
    </>,
    document.body
  );
}
