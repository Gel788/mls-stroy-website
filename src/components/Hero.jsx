import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, MapPin, ChevronRight } from 'lucide-react';

const WORDS = ['СПЕЦТЕХНИКИ', 'ЭКСКАВАТОРОВ', 'ПОГРУЗЧИКОВ', 'КАТКОВ'];

export default function Hero() {
  const canvasRef = useRef(null);
  const [wordIdx, setWordIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  // Word cycle
  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setWordIdx((i) => (i + 1) % WORDS.length);
        setVisible(true);
      }, 400);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  // Particles canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    const pts = Array.from({ length: 70 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.2 + 0.4,
      a: Math.random() * 0.35 + 0.08,
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
          if (d < 130) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(200,168,75,${0.06 * (1 - d / 130)})`;
            ctx.lineWidth = 0.6;
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
      {/* BG image */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'url(/images/1200x900.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center 30%',
        opacity: 0.08,
        filter: 'grayscale(60%)',
      }} />

      {/* Dark vignette */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, rgba(5,5,5,0.8) 100%)',
      }} />

      {/* Side gradient */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to right, rgba(5,5,5,0.97) 45%, rgba(5,5,5,0.5) 75%, rgba(5,5,5,0.2) 100%)',
      }} />

      {/* Particles */}
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />

      {/* Diagonal accent lines */}
      {[40, 60, 80].map((pct) => (
        <div key={pct} style={{
          position: 'absolute',
          top: 0,
          left: `${pct}%`,
          width: 1,
          height: '100%',
          background: 'linear-gradient(to bottom, transparent 0%, rgba(200,168,75,0.06) 40%, rgba(200,168,75,0.1) 60%, transparent 100%)',
          transform: 'skewX(-15deg)',
          pointerEvents: 'none',
        }} />
      ))}

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, maxWidth: 1300, margin: '0 auto', padding: '120px 24px 80px', width: '100%' }}>
        <div style={{ maxWidth: 820 }}>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '7px 16px 7px 10px',
              border: '1px solid rgba(200,168,75,0.3)',
              borderRadius: 100,
              marginBottom: 32,
              background: 'rgba(200,168,75,0.06)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <span style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 20, height: 20, borderRadius: '50%',
              background: 'rgba(200,168,75,0.2)',
            }}>
              <MapPin size={11} color="#c8a84b" />
            </span>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#c8a84b', fontFamily: 'Montserrat, sans-serif' }}>
              Москва и Московская область
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: 'clamp(38px, 7vw, 88px)',
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: '-0.03em',
              marginBottom: 20,
              color: '#fff',
            }}
          >
            АРЕНДА
            <br />
            <span style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #9d7a28 0%, #c8a84b 35%, #f0d882 60%, #c8a84b 80%, #9d7a28 100%)',
              backgroundSize: '200% 100%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'goldShimmer 4s linear infinite',
              minWidth: 200,
              transition: 'opacity 0.4s',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(10px)',
            }}>
              {WORDS[wordIdx]}
            </span>
            <br />
            <span style={{ color: 'rgba(255,255,255,0.92)' }}>В МОСКВЕ</span>
          </motion.h1>

          {/* Sub text */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            style={{
              fontSize: 'clamp(14px, 1.8vw, 17px)',
              color: '#7a7a7a',
              lineHeight: 1.8,
              marginBottom: 44,
              maxWidth: 520,
            }}
          >
            Более <span style={{ color: '#c0c0c0', fontWeight: 600 }}>20 единиц</span> спецтехники в постоянном наличии —
            экскаваторы, погрузчики, катки, тягачи.
            Подача на объект от <span style={{ color: '#c0c0c0', fontWeight: 600 }}>2 часов</span>.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 56 }}
          >
            <button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '16px 36px',
                background: 'linear-gradient(135deg, #c8a84b 0%, #e8c96a 50%, #9d7a28 100%)',
                backgroundSize: '200% 100%',
                color: '#000',
                fontSize: 12,
                fontWeight: 800,
                letterSpacing: '0.13em',
                textTransform: 'uppercase',
                borderRadius: 3,
                fontFamily: 'Montserrat, sans-serif',
                boxShadow: '0 8px 40px rgba(200,168,75,0.4)',
                transition: 'all 0.35s',
                border: 'none',
                cursor: 'pointer',
                animation: 'btnShimmer 3s ease infinite',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 14px 60px rgba(200,168,75,0.65)';
                e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 8px 40px rgba(200,168,75,0.4)';
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
              }}
            >
              Получить расчёт <ChevronRight size={14} />
            </button>
            <button
              onClick={() => document.querySelector('#catalog')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                padding: '16px 36px',
                background: 'rgba(255,255,255,0.04)',
                color: '#ccc',
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                borderRadius: 3,
                fontFamily: 'Montserrat, sans-serif',
                border: '1px solid rgba(255,255,255,0.12)',
                transition: 'all 0.3s',
                cursor: 'pointer',
                backdropFilter: 'blur(8px)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(200,168,75,0.4)';
                e.currentTarget.style.color = '#c8a84b';
                e.currentTarget.style.background = 'rgba(200,168,75,0.06)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
                e.currentTarget.style.color = '#ccc';
                e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
              }}
            >
              Смотреть каталог
            </button>
          </motion.div>

          {/* Mini stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            style={{ display: 'flex', gap: 0, flexWrap: 'wrap' }}
          >
            {[
              { val: '20+', label: 'Единиц' },
              { val: '7', label: 'Категорий' },
              { val: '24/7', label: 'Поддержка' },
              { val: '5 лет', label: 'На рынке' },
            ].map((s, i) => (
              <div key={s.label} style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ padding: '0 24px', textAlign: i === 0 ? 'left' : 'center' }}>
                  <div style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: 'clamp(20px, 2.5vw, 28px)',
                    fontWeight: 900,
                    color: '#c8a84b',
                    lineHeight: 1,
                    marginBottom: 4,
                  }}>
                    {s.val}
                  </div>
                  <div style={{ fontSize: 10, color: '#555', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'Montserrat, sans-serif' }}>
                    {s.label}
                  </div>
                </div>
                {i < 3 && <div style={{ width: 1, height: 32, background: 'rgba(255,255,255,0.08)' }} />}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll arrow */}
      <motion.button
        onClick={() => document.querySelector('#catalog')?.scrollIntoView({ behavior: 'smooth' })}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{
          position: 'absolute', bottom: 30, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
          background: 'none', border: 'none', cursor: 'pointer', zIndex: 2,
        }}
      >
        <span style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#444', fontFamily: 'Montserrat, sans-serif' }}>
          прокрутите
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} color="rgba(200,168,75,0.6)" />
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
      `}</style>
    </section>
  );
}
