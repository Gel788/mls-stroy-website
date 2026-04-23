import { useRef } from 'react';
import { motion } from 'framer-motion';

const items = [
  { text: 'JCB', type: 'brand' },
  { text: 'Аренда экскаваторов', type: 'service' },
  { text: 'SUNWARD', type: 'brand' },
  { text: 'Дорожные работы', type: 'service' },
  { text: 'AMMANN', type: 'brand' },
  { text: 'Аренда погрузчиков', type: 'service' },
  { text: 'XCMG', type: 'brand' },
  { text: 'Строительные объекты', type: 'service' },
  { text: 'KOMATSU', type: 'brand' },
  { text: 'Аренда бульдозеров', type: 'service' },
  { text: 'LIEBHERR', type: 'brand' },
  { text: 'Аренда кранов', type: 'service' },
  { text: 'ZOOMLION', type: 'brand' },
  { text: 'Аренда катков', type: 'service' },
  { text: 'DAF', type: 'brand' },
  { text: 'Перевозка грузов', type: 'service' },
  { text: 'DEVELON', type: 'brand' },
  { text: 'Москва и МО', type: 'service' },
  { text: 'BOMAG', type: 'brand' },
  { text: 'Асфальтирование', type: 'service' },
  { text: 'HITACHI', type: 'brand' },
  { text: 'Земляные работы', type: 'service' },
  { text: 'CATERPILLAR', type: 'brand' },
  { text: 'Работа 24/7', type: 'service' },
  { text: 'PUTZMEISTER', type: 'brand' },
  { text: 'Бетонные работы', type: 'service' },
  { text: 'SHANTUI', type: 'brand' },
  { text: '55+ единиц техники', type: 'service' },
];

// Дублируем для бесшовного скролла
const repeated = [...items, ...items, ...items];

export default function Ticker() {
  return (
    <div
      style={{
        background: '#0a0a0a',
        borderTop: '1px solid rgba(200,168,75,0.12)',
        borderBottom: '1px solid rgba(200,168,75,0.12)',
        overflow: 'hidden',
        position: 'relative',
        padding: '14px 0',
      }}
    >
      {/* Fade edges */}
      <div style={{
        position: 'absolute', top: 0, left: 0, width: 120, height: '100%',
        background: 'linear-gradient(to right, #0a0a0a, transparent)',
        zIndex: 2, pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: 0, right: 0, width: 120, height: '100%',
        background: 'linear-gradient(to left, #0a0a0a, transparent)',
        zIndex: 2, pointerEvents: 'none',
      }} />

      <motion.div
        animate={{ x: ['0%', '-33.33%'] }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: 'linear',
          repeatType: 'loop',
        }}
        style={{ display: 'flex', alignItems: 'center', gap: 0, whiteSpace: 'nowrap', width: 'max-content' }}
      >
        {repeated.map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
            <span
              style={{
                padding: '0 28px',
                fontSize: item.type === 'brand' ? 13 : 12,
                fontWeight: item.type === 'brand' ? 800 : 500,
                fontFamily: 'Montserrat, sans-serif',
                letterSpacing: item.type === 'brand' ? '0.12em' : '0.06em',
                textTransform: 'uppercase',
                color: item.type === 'brand' ? '#c8a84b' : '#555',
                lineHeight: 1,
              }}
            >
              {item.text}
            </span>
            {/* Dot separator */}
            <span style={{
              width: 3,
              height: 3,
              borderRadius: '50%',
              background: 'rgba(200,168,75,0.25)',
              flexShrink: 0,
            }} />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
