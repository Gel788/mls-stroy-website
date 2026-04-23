import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Wrench, Clock, MapPin, Star } from 'lucide-react';

const stats = [
  { icon: Wrench, value: 55, suffix: '+', label: 'Единиц техники', sub: 'в постоянном наличии' },
  { icon: Clock, value: 5, suffix: ' лет', label: 'На рынке', sub: 'опыт и репутация' },
  { icon: MapPin, value: 150, suffix: '+', label: 'Объектов', sub: 'выполнено в МО' },
  { icon: Star, value: 98, suffix: '%', label: 'Клиентов', sub: 'остаются с нами' },
];

function useCounter(end, duration, started) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [end, duration, started]);
  return count;
}

function StatItem({ stat, index }) {
  const [started, setStarted] = useState(false);
  const ref = useRef(null);
  const count = useCounter(stat.value, 1500, started);
  const Icon = stat.icon;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      style={{
        textAlign: 'center',
        padding: '40px 24px',
        position: 'relative',
      }}
    >
      {/* Icon */}
      <div style={{
        width: 56,
        height: 56,
        borderRadius: '50%',
        background: 'rgba(200,168,75,0.08)',
        border: '1px solid rgba(200,168,75,0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 20px',
      }}>
        <Icon size={22} color="#c8a84b" />
      </div>

      {/* Counter */}
      <div style={{
        fontFamily: 'Montserrat, sans-serif',
        fontSize: 'clamp(36px, 5vw, 54px)',
        fontWeight: 900,
        color: '#c8a84b',
        lineHeight: 1,
        marginBottom: 8,
        letterSpacing: '-0.02em',
      }}>
        {count}{stat.suffix}
      </div>
      <div style={{
        fontSize: 15,
        fontWeight: 600,
        color: '#ddd',
        fontFamily: 'Montserrat, sans-serif',
        marginBottom: 4,
      }}>
        {stat.label}
      </div>
      <div style={{ fontSize: 12, color: '#555' }}>{stat.sub}</div>

      {/* Divider */}
      {index < stats.length - 1 && (
        <div style={{
          position: 'absolute',
          right: 0,
          top: '20%',
          bottom: '20%',
          width: 1,
          background: 'linear-gradient(to bottom, transparent, rgba(200,168,75,0.15), transparent)',
        }} className="stat-divider" />
      )}
    </motion.div>
  );
}

export default function Stats() {
  return (
    <section style={{
      background: 'var(--bg-primary)',
      borderTop: '1px solid rgba(200,168,75,0.1)',
      borderBottom: '1px solid rgba(200,168,75,0.1)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        height: 300,
        background: 'radial-gradient(ellipse, rgba(200,168,75,0.04), transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        maxWidth: 1300,
        margin: '0 auto',
        padding: '0 24px',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 0,
        position: 'relative',
      }} className="stats-grid">
        {stats.map((stat, i) => (
          <StatItem key={stat.label} stat={stat} index={i} />
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .stat-divider { display: none; }
        }
        @media (max-width: 420px) {
          .stats-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
