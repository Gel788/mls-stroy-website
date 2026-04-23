import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { X, Phone, MessageCircle, CheckCircle2 } from 'lucide-react';

const included = [
  'Опытный сертифицированный оператор',
  'Страховка техники включена',
  'Техническая поддержка 24/7',
  'Доставка по Москве и МО',
];

function useIsMobile() {
  const [mobile, setMobile] = useState(() => window.innerWidth <= 680);
  useEffect(() => {
    const fn = () => setMobile(window.innerWidth <= 680);
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

  // Разные анимации: desktop — scale из центра, mobile — slide снизу
  const modalVariants = isMobile
    ? {
        initial: { opacity: 0, y: '100%' },
        animate: { opacity: 1, y: 0 },
        exit:    { opacity: 0, y: '100%' },
        transition: { duration: 0.38, ease: [0.32, 0.72, 0, 1] },
      }
    : {
        initial: { opacity: 0, scale: 0.92, y: 40 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit:    { opacity: 0, scale: 0.92, y: 40 },
        transition: { duration: 0.4, ease: [0.34, 1.1, 0.64, 1] },
      };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,0.88)',
          backdropFilter: 'blur(10px)',
          zIndex: 3000,
        }}
      />

      {/* Centering / bottom-sheet wrapper */}
      <div
        style={{
          position: 'fixed', inset: 0,
          zIndex: 3001,
          display: 'flex',
          alignItems: isMobile ? 'flex-end' : 'center',
          justifyContent: 'center',
          padding: isMobile ? 0 : '16px',
          pointerEvents: 'none',
        }}
      >
        <motion.div
          {...modalVariants}
          onClick={(e) => e.stopPropagation()}
          style={{
            pointerEvents: 'auto',
            width: '100%',
            maxWidth: isMobile ? '100%' : 960,
            /* На мобиле — максимальная высота и скролл всего контейнера */
            maxHeight: isMobile ? '92vh' : '92vh',
            overflowY: isMobile ? 'auto' : 'hidden',
            background: '#0f0f0f',
            border: '1px solid rgba(200,168,75,0.18)',
            borderRadius: isMobile ? '16px 16px 0 0' : 12,
            boxShadow: '0 40px 120px rgba(0,0,0,0.9)',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
          }}
        >
          {/* Мобильный drag-handle */}
          {isMobile && (
            <div style={{
              width: 36, height: 4, borderRadius: 2,
              background: 'rgba(255,255,255,0.15)',
              margin: '12px auto 0',
              flexShrink: 0,
            }} />
          )}

          {/* Кнопка закрытия */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute', top: isMobile ? 10 : 14, right: 14,
              zIndex: 20, width: 38, height: 38, borderRadius: '50%',
              background: 'rgba(0,0,0,0.65)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#999',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', transition: 'all 0.2s',
              backdropFilter: 'blur(8px)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(200,168,75,0.25)';
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

          {/* ── Тело: grid на десктопе, column на мобиле ── */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1.1fr 1fr',
              flex: 1,
              /* На десктопе правая панель скроллится, на мобиле скроллится весь модал */
              overflowY: isMobile ? 'visible' : 'hidden',
              minHeight: 0,
            }}
          >
            {/* ── Фото ── */}
            <div style={{
              position: 'relative',
              background: '#080808',
              minHeight: isMobile ? 220 : 360,
              maxHeight: isMobile ? 260 : 'none',
              overflow: 'hidden',
              flexShrink: 0,
            }}>
              {!imgLoaded && (
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(90deg, #111 25%, #1a1a1a 50%, #111 75%)',
                  backgroundSize: '200% 100%',
                  animation: 'shimmer 1.5s infinite',
                }} />
              )}
              <img
                src={`/images/${item.image}`}
                alt={item.name}
                onLoad={() => setImgLoaded(true)}
                style={{
                  width: '100%', height: '100%',
                  objectFit: 'cover', display: 'block',
                  filter: 'brightness(0.88) saturate(0.9)',
                  opacity: imgLoaded ? 1 : 0,
                  transition: 'opacity 0.4s',
                }}
              />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(8,8,8,0.92) 0%, transparent 55%)',
                pointerEvents: 'none',
              }} />

              {/* Ценник */}
              <div style={{
                position: 'absolute', bottom: 16, left: 16, right: 16,
                padding: '12px 16px',
                background: 'rgba(8,8,8,0.82)',
                border: '1px solid rgba(200,168,75,0.25)',
                borderRadius: 8, backdropFilter: 'blur(14px)',
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: 10, color: '#666', fontFamily: 'Montserrat, sans-serif', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 3 }}>
                      Стоимость аренды
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                      <span style={{ fontSize: 10, color: '#c8a84b', fontFamily: 'Montserrat, sans-serif' }}>от</span>
                      <span style={{
                        fontSize: isMobile ? 24 : 30, fontWeight: 900,
                        fontFamily: 'Montserrat, sans-serif',
                        background: 'linear-gradient(135deg, #c8a84b, #f0d882)',
                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                        lineHeight: 1,
                      }}>
                        {item.priceFrom.toLocaleString('ru-RU')}
                      </span>
                      <span style={{ fontSize: 13, color: '#666' }}>₽</span>
                    </div>
                    <div style={{ fontSize: 10, color: '#555', marginTop: 2 }}>за смену · 8 часов</div>
                  </div>
                  <div style={{
                    padding: '5px 10px',
                    background: 'rgba(200,168,75,0.1)', border: '1px solid rgba(200,168,75,0.3)',
                    borderRadius: 4, fontSize: 9, fontWeight: 700, color: '#c8a84b',
                    fontFamily: 'Montserrat, sans-serif', letterSpacing: '0.1em', textTransform: 'uppercase',
                  }}>
                    В наличии
                  </div>
                </div>
              </div>
            </div>

            {/* ── Детали ── */}
            <div style={{
              padding: isMobile ? '20px 16px 24px' : '32px 28px 28px',
              overflowY: isMobile ? 'visible' : 'auto',
              display: 'flex', flexDirection: 'column', gap: 0,
              background: '#0f0f0f',
            }}>
              {/* Eyebrow + title */}
              <div>
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
                  fontSize: isMobile ? 18 : 'clamp(18px, 2.2vw, 24px)',
                  fontWeight: 800, color: '#f4f4f4',
                  lineHeight: 1.2, marginBottom: 10, letterSpacing: '-0.01em',
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
              </div>

              {/* Характеристики */}
              <div style={{ marginBottom: 18 }}>
                <div style={{
                  fontSize: 10, fontWeight: 700, letterSpacing: '0.14em',
                  textTransform: 'uppercase', color: '#555',
                  fontFamily: 'Montserrat, sans-serif', marginBottom: 8,
                }}>
                  Технические характеристики
                </div>
                <div style={{ border: '1px solid rgba(255,255,255,0.05)', borderRadius: 8, overflow: 'hidden' }}>
                  {Object.entries(item.specs).map(([key, val], i) => (
                    <div
                      key={key}
                      style={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        padding: '9px 12px',
                        borderBottom: i < Object.keys(item.specs).length - 1
                          ? '1px solid rgba(255,255,255,0.04)' : 'none',
                        background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent',
                      }}
                    >
                      <span style={{ fontSize: 12, color: '#666', flexShrink: 0, marginRight: 8 }}>{key}</span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: '#e0e0e0', fontFamily: 'Montserrat, sans-serif', textAlign: 'right' }}>{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Включено */}
              <div style={{ marginBottom: 20 }}>
                <div style={{
                  fontSize: 10, fontWeight: 700, letterSpacing: '0.14em',
                  textTransform: 'uppercase', color: '#555',
                  fontFamily: 'Montserrat, sans-serif', marginBottom: 8,
                }}>
                  Включено в стоимость
                </div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                  gap: 6,
                }}>
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

              {/* CTA кнопки */}
              <div style={{ display: 'flex', gap: 10, marginTop: 'auto' }}>
                <a
                  href="tel:+79009999999"
                  style={{
                    flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    padding: '14px',
                    background: 'linear-gradient(135deg, #c8a84b, #9d7a28)',
                    color: '#000', fontSize: 12, fontWeight: 800,
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                    borderRadius: 6, fontFamily: 'Montserrat, sans-serif',
                    textDecoration: 'none',
                    boxShadow: '0 6px 24px rgba(200,168,75,0.35)',
                    transition: 'all 0.25s',
                    WebkitTapHighlightColor: 'transparent',
                  }}
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
                    borderRadius: 6, fontFamily: 'Montserrat, sans-serif',
                    textDecoration: 'none',
                    border: '1px solid rgba(255,255,255,0.12)',
                    transition: 'all 0.25s',
                    WebkitTapHighlightColor: 'transparent',
                  }}
                >
                  <MessageCircle size={14} /> WhatsApp
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position:  200% 0; }
        }
      `}</style>
    </>
  );
}
