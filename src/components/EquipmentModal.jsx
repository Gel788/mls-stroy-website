import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { X, Phone, MessageCircle, CheckCircle2, ChevronRight } from 'lucide-react';

const included = [
  'Опытный сертифицированный оператор',
  'Страховка техники включена',
  'Техническая поддержка 24/7',
  'Доставка по Москве и МО',
];

export default function EquipmentModal({ item, onClose }) {
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <>
      {/* Backdrop — клик снаружи закрывает */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.88)',
          backdropFilter: 'blur(12px)',
          zIndex: 3000,
        }}
      />

      {/* Centering wrapper (flexbox, не transform!) */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 3001,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px',
          pointerEvents: 'none',
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 40 }}
          transition={{ duration: 0.4, ease: [0.34, 1.1, 0.64, 1] }}
          onClick={(e) => e.stopPropagation()}
          style={{
            pointerEvents: 'auto',
            width: '100%',
            maxWidth: 960,
            maxHeight: '92vh',
            background: '#0f0f0f',
            border: '1px solid rgba(200,168,75,0.2)',
            borderRadius: 12,
            overflow: 'hidden',
            boxShadow: '0 50px 150px rgba(0,0,0,0.9), 0 0 0 1px rgba(200,168,75,0.05)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Close */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: 14,
              right: 14,
              zIndex: 20,
              width: 38,
              height: 38,
              borderRadius: '50%',
              background: 'rgba(0,0,0,0.6)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#999',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s',
              backdropFilter: 'blur(8px)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(200,168,75,0.25)';
              e.currentTarget.style.borderColor = 'rgba(200,168,75,0.5)';
              e.currentTarget.style.color = '#c8a84b';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(0,0,0,0.6)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
              e.currentTarget.style.color = '#999';
            }}
          >
            <X size={16} />
          </button>

          {/* Body */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.1fr 1fr',
              overflowY: 'auto',
              flex: 1,
            }}
            className="modal-body"
          >
            {/* ── LEFT: image + price ── */}
            <div style={{ position: 'relative', background: '#080808', minHeight: 360, overflow: 'hidden' }}>
              {/* Skeleton loader */}
              {!imgLoaded && (
                <div style={{
                  position: 'absolute',
                  inset: 0,
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
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  filter: 'brightness(0.88) saturate(0.9)',
                  transition: 'opacity 0.4s',
                  opacity: imgLoaded ? 1 : 0,
                }}
              />

              {/* Gradient overlays */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to right, transparent 60%, rgba(15,15,15,0.7))',
                pointerEvents: 'none',
              }} />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(8,8,8,0.9) 0%, transparent 50%)',
                pointerEvents: 'none',
              }} />

              {/* Price card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                style={{
                  position: 'absolute',
                  bottom: 20,
                  left: 20,
                  right: 20,
                  padding: '16px 20px',
                  background: 'rgba(8,8,8,0.8)',
                  border: '1px solid rgba(200,168,75,0.25)',
                  borderRadius: 8,
                  backdropFilter: 'blur(16px)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: 10, color: '#666', fontFamily: 'Montserrat, sans-serif', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 4 }}>
                      Стоимость аренды
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                      <span style={{ fontSize: 11, color: '#c8a84b', fontFamily: 'Montserrat, sans-serif' }}>от</span>
                      <span style={{
                        fontSize: 30,
                        fontWeight: 900,
                        fontFamily: 'Montserrat, sans-serif',
                        background: 'linear-gradient(135deg, #c8a84b, #f0d882)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        lineHeight: 1,
                      }}>
                        {item.priceFrom.toLocaleString('ru-RU')}
                      </span>
                      <span style={{ fontSize: 14, color: '#666' }}>₽</span>
                    </div>
                    <div style={{ fontSize: 11, color: '#555', marginTop: 2 }}>за смену · 8 часов</div>
                  </div>
                  <div style={{
                    padding: '6px 12px',
                    background: 'rgba(200,168,75,0.1)',
                    border: '1px solid rgba(200,168,75,0.3)',
                    borderRadius: 4,
                    fontSize: 10,
                    fontWeight: 700,
                    color: '#c8a84b',
                    fontFamily: 'Montserrat, sans-serif',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}>
                    В наличии
                  </div>
                </div>
              </motion.div>
            </div>

            {/* ── RIGHT: details ── */}
            <div style={{
              padding: '36px 28px 28px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: 0,
              background: '#0f0f0f',
            }}>
              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
              >
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#c8a84b',
                  fontFamily: 'Montserrat, sans-serif',
                  marginBottom: 10,
                }}>
                  <span style={{ display: 'inline-block', width: 20, height: 1, background: '#c8a84b' }} />
                  МЛС-СТРОЙ
                </div>
                <h2 style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: 'clamp(18px, 2.2vw, 24px)',
                  fontWeight: 800,
                  color: '#f4f4f4',
                  lineHeight: 1.2,
                  marginBottom: 12,
                  letterSpacing: '-0.015em',
                }}>
                  {item.name}
                </h2>
                <p style={{
                  fontSize: 13,
                  color: '#777',
                  lineHeight: 1.75,
                  marginBottom: 24,
                  paddingBottom: 24,
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                }}>
                  {item.description}
                </p>
              </motion.div>

              {/* Specs */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                style={{ marginBottom: 22 }}
              >
                <div style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: '#555',
                  fontFamily: 'Montserrat, sans-serif',
                  marginBottom: 10,
                }}>
                  Технические характеристики
                </div>
                <div style={{
                  border: '1px solid rgba(255,255,255,0.05)',
                  borderRadius: 8,
                  overflow: 'hidden',
                }}>
                  {Object.entries(item.specs).map(([key, val], i) => (
                    <div
                      key={key}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '10px 14px',
                        borderBottom: i < Object.keys(item.specs).length - 1
                          ? '1px solid rgba(255,255,255,0.04)'
                          : 'none',
                        background: i % 2 === 0
                          ? 'rgba(255,255,255,0.02)'
                          : 'transparent',
                        transition: 'background 0.2s',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(200,168,75,0.04)')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent')}
                    >
                      <span style={{ fontSize: 12, color: '#666' }}>{key}</span>
                      <span style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: '#e0e0e0',
                        fontFamily: 'Montserrat, sans-serif',
                      }}>
                        {val}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Included */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28 }}
                style={{ marginBottom: 24 }}
              >
                <div style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: '#555',
                  fontFamily: 'Montserrat, sans-serif',
                  marginBottom: 10,
                }}>
                  Включено в стоимость
                </div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 8,
                }}>
                  {included.map((text) => (
                    <div
                      key={text}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 8,
                        padding: '10px 12px',
                        background: 'rgba(200,168,75,0.04)',
                        border: '1px solid rgba(200,168,75,0.1)',
                        borderRadius: 6,
                      }}
                    >
                      <CheckCircle2 size={13} color="#c8a84b" style={{ flexShrink: 0, marginTop: 1 }} />
                      <span style={{ fontSize: 11, color: '#888', lineHeight: 1.4 }}>{text}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                style={{ display: 'flex', gap: 10, marginTop: 'auto' }}
              >
                <a
                  href="tel:+79009999999"
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    padding: '14px',
                    background: 'linear-gradient(135deg, #c8a84b, #9d7a28)',
                    color: '#000',
                    fontSize: 12,
                    fontWeight: 800,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    borderRadius: 6,
                    fontFamily: 'Montserrat, sans-serif',
                    textDecoration: 'none',
                    boxShadow: '0 6px 24px rgba(200,168,75,0.35)',
                    transition: 'all 0.25s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 10px 36px rgba(200,168,75,0.55)';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 6px 24px rgba(200,168,75,0.35)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <Phone size={14} />
                  Позвонить
                </a>
                <a
                  href="https://wa.me/79009999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    padding: '14px',
                    background: 'transparent',
                    color: '#ccc',
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    borderRadius: 6,
                    fontFamily: 'Montserrat, sans-serif',
                    textDecoration: 'none',
                    border: '1px solid rgba(255,255,255,0.12)',
                    transition: 'all 0.25s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(200,168,75,0.45)';
                    e.currentTarget.style.color = '#c8a84b';
                    e.currentTarget.style.background = 'rgba(200,168,75,0.06)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
                    e.currentTarget.style.color = '#ccc';
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <MessageCircle size={14} />
                  WhatsApp
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @media (max-width: 680px) {
          .modal-body {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}
