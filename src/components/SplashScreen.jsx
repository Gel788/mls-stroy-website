import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SplashScreen({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('loading'); // 'loading' | 'done'

  useEffect(() => {
    let val = 0;
    const interval = setInterval(() => {
      val += Math.random() * 18 + 4;
      if (val >= 100) {
        val = 100;
        clearInterval(interval);
        setProgress(100);
        setTimeout(() => setPhase('done'), 500);
        setTimeout(() => onDone(), 1200);
      } else {
        setProgress(Math.floor(val));
      }
    }, 80);
    return () => clearInterval(interval);
  }, [onDone]);

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: '#060606',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Background grid lines */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(200,168,75,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(200,168,75,0.04) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            maskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, black, transparent)',
          }} />

          {/* Center glow */}
          <div style={{
            position: 'absolute',
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(200,168,75,0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          {/* Rotating ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            style={{
              position: 'absolute',
              width: 280,
              height: 280,
              borderRadius: '50%',
              border: '1px solid transparent',
              borderTopColor: 'rgba(200,168,75,0.3)',
              borderRightColor: 'rgba(200,168,75,0.1)',
            }}
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
            style={{
              position: 'absolute',
              width: 320,
              height: 320,
              borderRadius: '50%',
              border: '1px solid transparent',
              borderBottomColor: 'rgba(200,168,75,0.15)',
              borderLeftColor: 'rgba(200,168,75,0.08)',
            }}
          />

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
            style={{ position: 'relative', zIndex: 2, marginBottom: 40 }}
          >
            <img
              src="/images/Secondary%20эмблема%20МЛС-СТРОЙ.pdf.png"
              alt="МЛС-СТРОЙ"
              style={{
                height: 90,
                width: 'auto',
                filter: 'drop-shadow(0 0 30px rgba(200,168,75,0.5)) drop-shadow(0 0 60px rgba(200,168,75,0.2))',
              }}
            />
          </motion.div>

          {/* Company name */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{ position: 'relative', zIndex: 2, textAlign: 'center', marginBottom: 12 }}
          >
            <div style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: 'clamp(22px, 4vw, 32px)',
              fontWeight: 900,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              background: 'linear-gradient(135deg, #c8a84b, #f0d882, #9d7a28)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              МЛС-СТРОЙ
            </div>
          </motion.div>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.5, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            style={{
              position: 'relative',
              zIndex: 2,
              fontSize: 11,
              fontFamily: 'Montserrat, sans-serif',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#888',
              marginBottom: 56,
            }}
          >
            Аренда спецтехники · Москва и МО
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            style={{ position: 'relative', zIndex: 2, width: 200 }}
          >
            <div style={{
              height: 1,
              background: 'rgba(255,255,255,0.06)',
              borderRadius: 1,
              overflow: 'hidden',
            }}>
              <motion.div
                style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, #9d7a28, #c8a84b, #f0d882)',
                  borderRadius: 1,
                  boxShadow: '0 0 10px rgba(200,168,75,0.6)',
                }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut', duration: 0.1 }}
              />
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: 10,
              fontSize: 10,
              fontFamily: 'Montserrat, sans-serif',
              letterSpacing: '0.1em',
            }}>
              <span style={{ color: '#444' }}>Загрузка</span>
              <span style={{ color: '#c8a84b', fontWeight: 700 }}>{progress}%</span>
            </div>
          </motion.div>

          {/* Corner decorations */}
          {[
            { top: 24, left: 24 },
            { top: 24, right: 24 },
            { bottom: 24, left: 24 },
            { bottom: 24, right: 24 },
          ].map((pos, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.05 }}
              style={{
                position: 'absolute',
                ...pos,
                width: 20,
                height: 20,
                borderTop: Object.keys(pos).includes('bottom') ? 'none' : '1px solid rgba(200,168,75,0.3)',
                borderBottom: Object.keys(pos).includes('top') ? 'none' : '1px solid rgba(200,168,75,0.3)',
                borderLeft: Object.keys(pos).includes('right') ? 'none' : '1px solid rgba(200,168,75,0.3)',
                borderRight: Object.keys(pos).includes('left') ? 'none' : '1px solid rgba(200,168,75,0.3)',
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
