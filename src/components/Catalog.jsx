import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { equipment, categories } from '../data/equipment';
import EquipmentModal from './EquipmentModal';

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

  return (
    <section
      id="catalog"
      style={{
        padding: '100px 0',
        background: 'var(--bg-secondary)',
        position: 'relative',
      }}
    >
      {/* Top gradient fade */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 80, background: 'linear-gradient(to bottom, var(--bg-primary), transparent)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 24px' }}>

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: 56, textAlign: 'center' }}
        >
          <span style={{
            display: 'inline-block',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            fontFamily: 'Montserrat, sans-serif',
            marginBottom: 14,
            padding: '4px 14px',
            border: '1px solid rgba(200,168,75,0.25)',
            borderRadius: 2,
          }}>
            Парк техники
          </span>
          <h2 style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: 'clamp(28px, 4vw, 48px)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            color: '#f0f0f0',
            lineHeight: 1.1,
          }}>
            Каталог спецтехники
          </h2>
          <div style={{
            width: 60,
            height: 2,
            background: 'linear-gradient(90deg, transparent, var(--gold), transparent)',
            margin: '20px auto 0',
          }} />
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            display: 'flex',
            gap: 8,
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginBottom: 48,
          }}
        >
          {categories.map((cat) => {
            const isActive = cat.id === activeCategory;
            const count = cat.id === 'all' ? equipment.length : equipment.filter(e => e.category === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  padding: '8px 20px',
                  fontSize: 12,
                  fontWeight: 600,
                  fontFamily: 'Montserrat, sans-serif',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  borderRadius: 2,
                  border: isActive ? '1px solid var(--gold)' : '1px solid rgba(255,255,255,0.1)',
                  background: isActive ? 'rgba(200,168,75,0.12)' : 'transparent',
                  color: isActive ? 'var(--gold)' : '#777',
                  transition: 'all 0.25s',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = 'rgba(200,168,75,0.3)';
                    e.currentTarget.style.color = '#bbb';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.color = '#777';
                  }
                }}
              >
                {cat.label}
                <span style={{
                  fontSize: 10,
                  background: isActive ? 'rgba(200,168,75,0.2)' : 'rgba(255,255,255,0.06)',
                  color: isActive ? 'var(--gold)' : '#555',
                  borderRadius: 10,
                  padding: '1px 7px',
                }}>
                  {count}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Grid */}
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

function EquipmentCard({ item, index, onClick }) {
  const [hovered, setHovered] = useState(false);
  const catLabel = categories.find(c => c.id === item.category)?.label
    .replace('Экскаваторы','Экскаватор')
    .replace('Погрузчики','Погрузчик')
    .replace('Катки','Каток')
    .replace('Грузовой транспорт','Транспорт')
    .replace('Прицепы','Прицеп') || item.category;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.45, delay: index * 0.05, ease: 'easeOut' }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? '#181818' : '#131313',
        border: `1px solid ${hovered ? 'rgba(200,168,75,0.35)' : 'rgba(255,255,255,0.06)'}`,
        borderRadius: 10,
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
        transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: hovered
          ? '0 24px 70px rgba(0,0,0,0.6), 0 0 0 1px rgba(200,168,75,0.08), inset 0 1px 0 rgba(200,168,75,0.06)'
          : '0 4px 20px rgba(0,0,0,0.2)',
        position: 'relative',
      }}
    >
      {/* Image container */}
      <div style={{ position: 'relative', height: 230, overflow: 'hidden', background: '#080808' }}>
        <img
          src={`/images/${item.image}`}
          alt={item.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.7s cubic-bezier(0.4,0,0.2,1), filter 0.5s',
            transform: hovered ? 'scale(1.1)' : 'scale(1)',
            filter: hovered ? 'brightness(0.95) saturate(1.1)' : 'brightness(0.78) saturate(0.9)',
            display: 'block',
          }}
        />

        {/* Gradient */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(8,8,8,0.92) 0%, rgba(8,8,8,0.3) 50%, transparent 100%)',
          transition: 'opacity 0.4s',
        }} />

        {/* Gold shimmer on hover */}
        {hovered && (
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(200,168,75,0.06) 0%, transparent 60%)',
            pointerEvents: 'none',
          }} />
        )}

        {/* Category badge */}
        <div style={{
          position: 'absolute',
          top: 12,
          left: 12,
          padding: '5px 11px',
          background: 'rgba(8,8,8,0.8)',
          border: '1px solid rgba(200,168,75,0.3)',
          borderRadius: 3,
          fontSize: 9,
          fontWeight: 800,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: '#c8a84b',
          fontFamily: 'Montserrat, sans-serif',
          backdropFilter: 'blur(10px)',
        }}>
          {catLabel}
        </div>

        {/* "Подробнее" hover overlay */}
        <div style={{
          position: 'absolute',
          bottom: 14,
          right: 14,
          padding: '7px 14px',
          background: 'linear-gradient(135deg, rgba(200,168,75,0.95), rgba(157,122,40,0.95))',
          borderRadius: 4,
          fontSize: 10,
          fontWeight: 800,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: '#000',
          fontFamily: 'Montserrat, sans-serif',
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'translateY(0)' : 'translateY(8px)',
          transition: 'all 0.3s',
          boxShadow: '0 4px 16px rgba(200,168,75,0.4)',
        }}>
          Подробнее →
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '18px 20px 20px' }}>
        <h3 style={{
          fontFamily: 'Montserrat, sans-serif',
          fontSize: 14,
          fontWeight: 800,
          color: hovered ? '#fff' : '#e0e0e0',
          lineHeight: 1.3,
          marginBottom: 6,
          letterSpacing: '-0.01em',
          transition: 'color 0.3s',
        }}>
          {item.name}
        </h3>
        <p style={{
          fontSize: 12,
          color: '#666',
          lineHeight: 1.65,
          marginBottom: 16,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {item.description}
        </p>

        {/* Price row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: 14,
          borderTop: '1px solid rgba(255,255,255,0.05)',
        }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 3 }}>
            <span style={{ fontSize: 10, color: '#555', fontFamily: 'Montserrat, sans-serif' }}>от</span>
            <span style={{
              fontSize: 22,
              fontWeight: 900,
              fontFamily: 'Montserrat, sans-serif',
              background: hovered
                ? 'linear-gradient(135deg, #c8a84b, #f0d882)'
                : 'linear-gradient(135deg, #b8941f, #c8a84b)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              transition: 'all 0.3s',
              lineHeight: 1,
            }}>
              {item.priceFrom.toLocaleString('ru-RU')}
            </span>
            <span style={{ fontSize: 11, color: '#555' }}>₽</span>
          </div>
          <span style={{
            fontSize: 10,
            color: '#555',
            fontFamily: 'Montserrat, sans-serif',
          }}>
            / смена
          </span>
        </div>
      </div>
    </motion.div>
  );
}
