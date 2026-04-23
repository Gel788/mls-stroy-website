import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, MapPin, ChevronRight, Zap } from 'lucide-react';
import { equipment } from '../data/equipment';

const WORDS = ['СПЕЦТЕХНИКИ', 'ЭКСКАВАТОРОВ', 'ПОГРУЗЧИКОВ', 'КАТКОВ'];

// Топ-3 карточки для витрины
const featured = equipment.slice(0, 3);

export default function Hero() {
  const canvasRef = useRef(null);
  const [wordIdx, setWordIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  const [activeCard, setActiveCard] = useState(0);

  // Cycling word
  useEffect(() => {
    const t = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setWordIdx((i) => (i + 1) % WORDS.length);
        setVisible(true);
      }, 380);
    }, 2600);
    return () => clearInterval(t);
  }, []);

  // Auto-rotate featured card
  useEffect(() => {
    const t = setInterval(() => setActiveCard((i) => (i + 1) % featured.length), 3500);
    return () => clearInterval(t);
  }, []);

  // Particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);
    const pts = Array.from({ length: 65 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      r: Math.random() * 1.2 + 0.4,
      a: Math.random() * 0.3 + 0.06,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      pts.forEach((p) => {
        p.x = (p.x + p.vx + W) % W;
        p.y = (p.y + p.vy + H) % H;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,168,75,${p.a})`;
        ctx.fill();
      });
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(200,168,75,${0.055 * (1 - d / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    const onResize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', onResize); };
  }, []);

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: '#050505',
      }}
    >
      {/* BG */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'url(/images/1200x900.jpeg)',
        backgroundSize: 'cover', backgroundPosition: 'center 30%',
        opacity: 0.06, filter: 'grayscale(70%)',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 100% 80% at 50% 50%, transparent 20%, rgba(5,5,5,0.85) 100%)',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to right, rgba(5,5,5,0.98) 35%, rgba(5,5,5,0.7) 60%, rgba(5,5,5,0.15) 100%)',
      }} />

      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />

      {/* Accent lines */}
      {[38, 55, 72, 88].map((pct) => (
        <div key={pct} style={{
          position: 'absolute', top: 0, left: `${pct}%`,
          width: 1, height: '100%',
          background: 'linear-gradient(to bottom, transparent 0%, rgba(200,168,75,0.05) 30%, rgba(200,168,75,0.09) 60%, transparent 100%)',
          transform: 'skewX(-12deg)', pointerEvents: 'none',
        }} />
      ))}

      {/* ── MAIN CONTENT GRID ── */}
      <div style={{
        position: 'relative', zIndex: 2,
        maxWidth: 1300, margin: '0 auto',
        padding: '110px 24px 80px', width: '100%',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 40,
        alignItems: 'center',
      }} className="hero-grid">

        {/* ── LEFT: Text ── */}
        <div>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '7px 16px 7px 10px',
              border: '1px solid rgba(200,168,75,0.3)', borderRadius: 100,
              marginBottom: 28, background: 'rgba(200,168,75,0.06)', backdropFilter: 'blur(8px)',
            }}
          >
            <span style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 20, height: 20, borderRadius: '50%', background: 'rgba(200,168,75,0.2)',
            }}>
              <MapPin size={11} color="#c8a84b" />
            </span>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#c8a84b', fontFamily: 'Montserrat, sans-serif' }}>
              Москва и Московская область
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: 'clamp(36px, 5.5vw, 76px)',
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: '-0.03em',
              marginBottom: 22,
              color: '#fff',
            }}
          >
            АРЕНДА
            <br />
            <span style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #9d7a28 0%, #c8a84b 30%, #f0d882 55%, #c8a84b 78%, #9d7a28 100%)',
              backgroundSize: '200% 100%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'goldShimmer 4s linear infinite',
              minWidth: '7ch',
              transition: 'opacity 0.35s, transform 0.35s',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(8px)',
            }}>
              {WORDS[wordIdx]}
            </span>
            <br />
            <span style={{ color: 'rgba(255,255,255,0.9)' }}>В МОСКВЕ</span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.48 }}
            style={{ fontSize: 'clamp(14px, 1.5vw, 16px)', color: '#6a6a6a', lineHeight: 1.85, marginBottom: 36, maxWidth: 480 }}
          >
            Более <span style={{ color: '#bbb', fontWeight: 600 }}>20 единиц</span> в наличии —
            экскаваторы, погрузчики, катки, тягачи.
            Подача на объект{' '}
            <span style={{ color: '#bbb', fontWeight: 600 }}>от 2 часов</span>.
            Работаем официально по договору.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.62 }}
            style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 48 }}
          >
            <button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '15px 32px',
                background: 'linear-gradient(135deg, #c8a84b 0%, #e8c96a 50%, #9d7a28 100%)',
                backgroundSize: '200% 100%',
                color: '#000', fontSize: 12, fontWeight: 800,
                letterSpacing: '0.13em', textTransform: 'uppercase',
                borderRadius: 3, fontFamily: 'Montserrat, sans-serif',
                boxShadow: '0 8px 36px rgba(200,168,75,0.4)',
                border: 'none', cursor: 'pointer',
                transition: 'all 0.3s',
                animation: 'btnShimmer 3s ease infinite',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 14px 52px rgba(200,168,75,0.65)'; e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 8px 36px rgba(200,168,75,0.4)'; e.currentTarget.style.transform = 'translateY(0) scale(1)'; }}
            >
              Получить расчёт <ChevronRight size={14} />
            </button>
            <button
              onClick={() => document.querySelector('#catalog')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                padding: '15px 32px',
                background: 'rgba(255,255,255,0.04)',
                color: '#bbb', fontSize: 12, fontWeight: 600,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                borderRadius: 3, fontFamily: 'Montserrat, sans-serif',
                border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer',
                backdropFilter: 'blur(8px)', transition: 'all 0.3s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(200,168,75,0.4)'; e.currentTarget.style.color = '#c8a84b'; e.currentTarget.style.background = 'rgba(200,168,75,0.05)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#bbb'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
            >
              Весь каталог
            </button>
          </motion.div>

          {/* Mini stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85, duration: 0.7 }}
            style={{ display: 'flex', flexWrap: 'wrap' }}
          >
            {[
              { val: '20+', label: 'Единиц' },
              { val: '5 лет', label: 'На рынке' },
              { val: '24/7', label: 'Поддержка' },
              { val: '2 часа', label: 'Подача' },
            ].map((s, i) => (
              <div key={s.label} style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ padding: '0 20px', textAlign: i === 0 ? 'left' : 'center' }}>
                  <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(18px, 2vw, 24px)', fontWeight: 900, color: '#c8a84b', lineHeight: 1, marginBottom: 3 }}>
                    {s.val}
                  </div>
                  <div style={{ fontSize: 10, color: '#444', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'Montserrat, sans-serif' }}>
                    {s.label}
                  </div>
                </div>
                {i < 3 && <div style={{ width: 1, height: 28, background: 'rgba(255,255,255,0.07)' }} />}
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── RIGHT: Equipment showcase ── */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: 'relative' }}
          className="hero-showcase"
        >
          {/* Decorative ring */}
          <div style={{
            position: 'absolute',
            top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)',
            width: 420, height: 420, borderRadius: '50%',
            border: '1px solid rgba(200,168,75,0.07)',
            pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute',
            top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)',
            width: 340, height: 340, borderRadius: '50%',
            border: '1px solid rgba(200,168,75,0.05)',
            pointerEvents: 'none',
          }} />

          {/* Main featured image */}
          <div style={{
            position: 'relative',
            borderRadius: 12,
            overflow: 'hidden',
            border: '1px solid rgba(200,168,75,0.2)',
            boxShadow: '0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(200,168,75,0.06)',
            background: '#080808',
            aspectRatio: '4/3',
          }}>
            <AnimatePresence mode="wait">
              <motion.img
                key={activeCard}
                src={`/images/${featured[activeCard].image}`}
                alt={featured[activeCard].name}
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.7, ease: 'easeInOut' }}
                style={{
                  width: '100%', height: '100%',
                  objectFit: 'cover',
                  filter: 'brightness(0.85) saturate(0.85)',
                  display: 'block',
                }}
              />
            </AnimatePresence>

            {/* Overlay gradients */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(5,5,5,0.88) 0%, transparent 55%)',
              pointerEvents: 'none',
            }} />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(135deg, rgba(200,168,75,0.04), transparent 60%)',
              pointerEvents: 'none',
            }} />

            {/* Equipment label */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              padding: '20px 20px 16px',
            }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCard}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4 }}
                >
                  <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#c8a84b', fontFamily: 'Montserrat, sans-serif', marginBottom: 4 }}>
                    В наличии
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: '#f0f0f0', fontFamily: 'Montserrat, sans-serif', letterSpacing: '-0.01em', marginBottom: 2 }}>
                    {featured[activeCard].name}
                  </div>
                  <div style={{ fontSize: 12, color: '#888' }}>
                    от {featured[activeCard].priceFrom.toLocaleString('ru-RU')} ₽/смена
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Quick indicator */}
            <div style={{
              position: 'absolute', top: 14, right: 14,
              display: 'flex', alignItems: 'center', gap: 5,
              padding: '5px 10px',
              background: 'rgba(8,8,8,0.75)',
              border: '1px solid rgba(200,168,75,0.25)',
              borderRadius: 20, backdropFilter: 'blur(10px)',
            }}>
              <Zap size={10} color="#c8a84b" />
              <span style={{ fontSize: 9, fontWeight: 700, color: '#c8a84b', fontFamily: 'Montserrat, sans-serif', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Подача 2 ч.
              </span>
            </div>
          </div>

          {/* Dot indicators */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 16 }}>
            {featured.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveCard(i)}
                style={{
                  width: i === activeCard ? 24 : 6,
                  height: 6, borderRadius: 3,
                  background: i === activeCard ? '#c8a84b' : 'rgba(255,255,255,0.15)',
                  border: 'none', cursor: 'pointer',
                  transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
                  boxShadow: i === activeCard ? '0 0 10px rgba(200,168,75,0.5)' : 'none',
                }}
              />
            ))}
          </div>

          {/* Floating cards */}
          <motion.div
            animate={{ y: [-6, 6, -6] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              top: -24, right: -16,
              padding: '10px 14px',
              background: 'rgba(10,10,10,0.88)',
              border: '1px solid rgba(200,168,75,0.25)',
              borderRadius: 8, backdropFilter: 'blur(12px)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
              minWidth: 130,
            }}
          >
            <div style={{ fontSize: 9, color: '#666', fontFamily: 'Montserrat, sans-serif', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>Парк техники</div>
            <div style={{ fontSize: 22, fontWeight: 900, color: '#c8a84b', fontFamily: 'Montserrat, sans-serif', lineHeight: 1 }}>20+</div>
            <div style={{ fontSize: 10, color: '#555', marginTop: 2 }}>единиц</div>
          </motion.div>

          <motion.div
            animate={{ y: [6, -4, 6] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
            style={{
              position: 'absolute',
              bottom: 60, left: -20,
              padding: '10px 14px',
              background: 'rgba(10,10,10,0.88)',
              border: '1px solid rgba(200,168,75,0.2)',
              borderRadius: 8, backdropFilter: 'blur(12px)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
            }}
          >
            <div style={{ fontSize: 9, color: '#666', fontFamily: 'Montserrat, sans-serif', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>Режим работы</div>
            <div style={{ fontSize: 16, fontWeight: 900, color: '#c8a84b', fontFamily: 'Montserrat, sans-serif', lineHeight: 1 }}>24 / 7</div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll arrow */}
      <motion.button
        onClick={() => document.querySelector('#catalog')?.scrollIntoView({ behavior: 'smooth' })}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        style={{
          position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
          background: 'none', border: 'none', cursor: 'pointer', zIndex: 2,
        }}
      >
        <span style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#3a3a3a', fontFamily: 'Montserrat, sans-serif' }}>прокрутите</span>
        <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>
          <ArrowDown size={16} color="rgba(200,168,75,0.55)" />
        </motion.div>
      </motion.button>

      <style>{`
        @keyframes goldShimmer {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes btnShimmer {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @media (max-width: 860px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-showcase { display: none !important; }
        }
      `}</style>
    </section>
  );
}
