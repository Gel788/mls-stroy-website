import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutGrid, Hammer, ArrowUpFromLine, Mountain,
  RotateCw, MoveUp, Truck, Package, Wrench, X,
} from 'lucide-react';
import { equipment, categories } from '../data/equipment';
import EquipmentModal from './EquipmentModal';

const CAT_ICONS = {
  all:        LayoutGrid,
  excavator:  Hammer,
  loader:     ArrowUpFromLine,
  bulldozer:  Mountain,
  roller:     RotateCw,
  crane:      MoveUp,
  truck:      Truck,
  trailer:    Package,
  special:    Wrench,
};

const CAT_SINGULAR = {
  all:        '',
  excavator:  'Экскаватор',
  loader:     'Погрузчик',
  bulldozer:  'Бульдозер',
  roller:     'Каток',
  crane:      'Кран',
  truck:      'Транспорт',
  trailer:    'Прицеп',
  special:    'Спецтехника',
};

// ─── Animated count ─────────────────────────────────────────────────────────
function AnimatedCount({ value }) {
  const [display, setDisplay] = useState(value);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    setAnimating(true);
    const timeout = setTimeout(() => {
      setDisplay(value);
      setAnimating(false);
    }, 180);
    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <motion.span
      key={value}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      style={{
        display: 'inline-block',
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 800,
        fontSize: 15,
        color: 'var(--gold)',
      }}
    >
      {display}
    </motion.span>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────
export default function Catalog() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(
    () =>
      activeCategory === 'all'
        ? equipment
        : equipment.filter((e) => e.category === activeCategory),
    [activeCategory]
  );

  const activeCatLabel = categories.find(c => c.id === activeCategory)?.label || '';

  return (
    <section
      id="catalog"
      style={{ padding: '100px 0', background: 'var(--bg-secondary)', position: 'relative' }}
    >
      {/* Top gradient */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 100,
        background: 'linear-gradient(to bottom, var(--bg-primary), transparent)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 24px' }}>

        {/* ── Section header ────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: 52, textAlign: 'center' }}
        >
          <span style={{
            display: 'inline-block', fontSize: 11, fontWeight: 700,
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'var(--gold)', fontFamily: 'Montserrat, sans-serif',
            marginBottom: 14, padding: '4px 14px',
            border: '1px solid rgba(200,168,75,0.25)', borderRadius: 2,
          }}>
            Парк техники
          </span>
          <h2 style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800,
            letterSpacing: '-0.02em', color: '#f0f0f0', lineHeight: 1.1,
          }}>
            Каталог спецтехники
          </h2>
          <div style={{
            width: 60, height: 2,
            background: 'linear-gradient(90deg, transparent, var(--gold), transparent)',
            margin: '20px auto 0',
          }} />
        </motion.div>

        {/* ── Filters ───────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          style={{ marginBottom: 40 }}
        >
          {/* Chips */}
          <div style={{
            display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center',
          }}>
            {categories.map((cat) => {
              const isActive = cat.id === activeCategory;
              const count = cat.id === 'all'
                ? equipment.length
                : equipment.filter(e => e.category === cat.id).length;
              const Icon = CAT_ICONS[cat.id];

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.borderColor = 'rgba(200,168,75,0.35)';
                      e.currentTarget.style.background  = 'rgba(200,168,75,0.04)';
                      e.currentTarget.querySelector('.flabel').style.color = '#bbb';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)';
                      e.currentTarget.style.background  = 'rgba(255,255,255,0.025)';
                      e.currentTarget.querySelector('.flabel').style.color = '#666';
                    }
                  }}
                  style={{
                    position: 'relative',
                    display: 'flex', alignItems: 'center', gap: 7,
                    padding: '10px 18px',
                    borderRadius: 10,
                    border: `1px solid ${isActive ? 'transparent' : 'rgba(255,255,255,0.09)'}`,
                    background: isActive ? 'transparent' : 'rgba(255,255,255,0.025)',
                    cursor: 'pointer', outline: 'none',
                    transition: 'border-color 0.22s, background 0.22s',
                    WebkitTapHighlightColor: 'transparent',
                    zIndex: 0,
                  }}
                >
                  {/* Sliding gold pill */}
                  {isActive && (
                    <motion.div
                      layoutId="filterPill"
                      style={{
                        position: 'absolute', inset: 0, borderRadius: 10, zIndex: -1,
                        background: 'linear-gradient(135deg, #c8a84b 0%, #e8cc60 100%)',
                        boxShadow: '0 4px 18px rgba(200,168,75,0.42), 0 0 0 1px rgba(200,168,75,0.18)',
                      }}
                      transition={{ type: 'spring', stiffness: 440, damping: 36 }}
                    />
                  )}

                  {/* Icon */}
                  {Icon && (
                    <Icon
                      size={14}
                      style={{
                        color: isActive ? '#000' : '#555',
                        flexShrink: 0,
                        pointerEvents: 'none',
                        transition: 'color 0.2s',
                      }}
                    />
                  )}

                  {/* Label */}
                  <span
                    className="flabel"
                    style={{
                      fontFamily: 'Montserrat, sans-serif',
                      fontSize: 12, fontWeight: 700, letterSpacing: '0.05em',
                      color: isActive ? '#000' : '#666',
                      whiteSpace: 'nowrap', pointerEvents: 'none',
                      transition: 'color 0.22s',
                    }}
                  >
                    {cat.label}
                  </span>

                  {/* Count */}
                  <span style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: 10, fontWeight: 800, lineHeight: 1.5,
                    padding: '1px 7px', borderRadius: 20, minWidth: 22, textAlign: 'center',
                    background: isActive ? 'rgba(0,0,0,0.16)' : 'rgba(255,255,255,0.05)',
                    color: isActive ? 'rgba(0,0,0,0.6)' : '#444',
                    pointerEvents: 'none', transition: 'all 0.22s',
                  }}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Results meta */}
          <div style={{
            marginTop: 20, display: 'flex', alignItems: 'center',
            justifyContent: 'center', gap: 8,
          }}>
            <span style={{ fontSize: 12, color: '#3a3a3a', fontFamily: 'Montserrat, sans-serif' }}>
              Показано
            </span>
            <AnimatedCount value={filtered.length} />
            <span style={{ fontSize: 12, color: '#3a3a3a', fontFamily: 'Montserrat, sans-serif' }}>
              {filtered.length === equipment.length ? 'единиц' : `из ${equipment.length}`}
            </span>

            <AnimatePresence>
              {activeCategory !== 'all' && (
                <motion.button
                  key="reset"
                  initial={{ opacity: 0, scale: 0.75 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.75 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setActiveCategory('all')}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 5,
                    padding: '4px 11px 4px 9px', borderRadius: 20,
                    border: '1px solid rgba(200,168,75,0.28)',
                    background: 'rgba(200,168,75,0.07)',
                    color: 'var(--gold)', cursor: 'pointer',
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: 11, fontWeight: 600,
                    transition: 'all 0.2s', outline: 'none',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(200,168,75,0.14)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(200,168,75,0.07)';
                  }}
                >
                  <X size={11} strokeWidth={2.5} />
                  Сбросить
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* ── Grid ──────────────────────────────────────────────────────── */}
        <motion.div
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 20,
          }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <EquipmentCard
                key={item.id}
                item={item}
                index={i}
                onClick={() => setSelected(item)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        <AnimatePresence>
          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{
                textAlign: 'center', padding: '80px 0',
                fontFamily: 'Montserrat, sans-serif',
                color: '#444',
              }}
            >
              <div style={{ fontSize: 40, marginBottom: 16 }}>🔍</div>
              <p style={{ fontSize: 14, fontWeight: 600 }}>В этой категории нет техники</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <EquipmentModal item={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

// ─── Equipment Card ──────────────────────────────────────────────────────────
function EquipmentCard({ item, index, onClick }) {
  const [hovered, setHovered] = useState(false);
  const catLabel = CAT_SINGULAR[item.category] || item.category;

  // Cap stagger so 55 cards don't take >0.5s to appear
  const delay = Math.min(index * 0.045, 0.42);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 28, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.88, y: -12, transition: { duration: 0.22 } }}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? '#181818' : '#131313',
        border: `1px solid ${hovered ? 'rgba(200,168,75,0.4)' : 'rgba(255,255,255,0.06)'}`,
        borderRadius: 12,
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'background 0.3s, border-color 0.35s, transform 0.35s cubic-bezier(0.4,0,0.2,1), box-shadow 0.35s',
        transform: hovered ? 'translateY(-7px)' : 'translateY(0)',
        boxShadow: hovered
          ? '0 28px 72px rgba(0,0,0,0.65), 0 0 0 1px rgba(200,168,75,0.07), inset 0 1px 0 rgba(200,168,75,0.05)'
          : '0 4px 20px rgba(0,0,0,0.2)',
        position: 'relative',
        willChange: 'transform',
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', height: 220, overflow: 'hidden', background: '#0a0a0a' }}>
        <img
          src={`/images/${item.image}`}
          alt={item.name}
          loading="lazy"
          style={{
            width: '100%', height: '100%', objectFit: 'cover', display: 'block',
            transition: 'transform 0.7s cubic-bezier(0.4,0,0.2,1), filter 0.5s',
            transform: hovered ? 'scale(1.08)' : 'scale(1)',
            filter: hovered ? 'brightness(1) saturate(1.1)' : 'brightness(0.75) saturate(0.85)',
          }}
        />

        {/* Gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(6,6,6,0.95) 0%, rgba(6,6,6,0.2) 55%, transparent 100%)',
        }} />

        {/* Gold shimmer on hover */}
        {hovered && (
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(135deg, rgba(200,168,75,0.07) 0%, transparent 55%)',
            pointerEvents: 'none',
          }} />
        )}

        {/* Category badge */}
        <div style={{
          position: 'absolute', top: 12, left: 12,
          padding: '5px 11px',
          background: 'rgba(6,6,6,0.82)',
          border: '1px solid rgba(200,168,75,0.28)',
          borderRadius: 4,
          fontSize: 9, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase',
          color: '#c8a84b', fontFamily: 'Montserrat, sans-serif',
          backdropFilter: 'blur(12px)',
        }}>
          {catLabel}
        </div>

        {/* CTA hover pill */}
        <div style={{
          position: 'absolute', bottom: 14, right: 14,
          padding: '7px 15px',
          background: 'linear-gradient(135deg, rgba(200,168,75,0.96), rgba(157,122,40,0.96))',
          borderRadius: 5,
          fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase',
          color: '#000', fontFamily: 'Montserrat, sans-serif',
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'translateY(0)' : 'translateY(10px)',
          transition: 'opacity 0.28s, transform 0.28s',
          boxShadow: '0 6px 20px rgba(200,168,75,0.5)',
          pointerEvents: 'none',
        }}>
          Подробнее →
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '18px 20px 20px' }}>
        <h3 style={{
          fontFamily: 'Montserrat, sans-serif',
          fontSize: 14, fontWeight: 800, lineHeight: 1.3, marginBottom: 7,
          letterSpacing: '-0.01em',
          color: hovered ? '#fff' : '#e0e0e0',
          transition: 'color 0.3s',
        }}>
          {item.name}
        </h3>
        <p style={{
          fontSize: 12, color: '#5a5a5a', lineHeight: 1.65, marginBottom: 16,
          display: '-webkit-box', WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>
          {item.description}
        </p>

        {/* Spec preview — first 2 specs */}
        {item.specs && (
          <div style={{
            display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14,
          }}>
            {Object.entries(item.specs).slice(0, 2).map(([k, v]) => (
              <span key={k} style={{
                fontSize: 10, fontFamily: 'Montserrat, sans-serif',
                padding: '3px 9px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 4, color: '#4a4a4a',
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                maxWidth: 160,
              }}>
                {v}
              </span>
            ))}
          </div>
        )}

        {/* Price row */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          paddingTop: 13, borderTop: '1px solid rgba(255,255,255,0.05)',
        }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 3 }}>
            <span style={{ fontSize: 10, color: '#444', fontFamily: 'Montserrat, sans-serif' }}>от</span>
            <span style={{
              fontSize: 22, fontWeight: 900, fontFamily: 'Montserrat, sans-serif', lineHeight: 1,
              background: hovered
                ? 'linear-gradient(135deg, #c8a84b, #f0d882)'
                : 'linear-gradient(135deg, #b8941f, #c8a84b)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              transition: 'all 0.3s',
            }}>
              {item.priceFrom.toLocaleString('ru-RU')}
            </span>
            <span style={{ fontSize: 11, color: '#444' }}>₽</span>
          </div>
          <span style={{ fontSize: 10, color: '#3a3a3a', fontFamily: 'Montserrat, sans-serif' }}>
            / смена
          </span>
        </div>
      </div>
    </motion.div>
  );
}
