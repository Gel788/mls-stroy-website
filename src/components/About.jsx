import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Headphones, Award } from 'lucide-react';

const pillars = [
  { icon: ShieldCheck, title: 'Надёжность', text: 'Вся техника в собственности компании, проходит регулярное ТО и готова к работе в любой момент.' },
  { icon: Zap, title: 'Оперативность', text: 'Подача техники на объект в течение нескольких часов с момента оформления заявки.' },
  { icon: Headphones, title: 'Поддержка 24/7', text: 'Наша диспетчерская служба работает круглосуточно — всегда на связи для решения любых вопросов.' },
  { icon: Award, title: 'Опыт и качество', text: 'Более 5 лет на рынке аренды спецтехники Москвы и МО. Доверяют крупные застройщики и подрядчики.' },
];

export default function About() {
  return (
    <section
      id="about"
      style={{
        padding: '100px 0',
        background: 'var(--bg-primary)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Декоративная линия */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(200,168,75,0.2), transparent)',
      }} />

      <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }} className="about-grid">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8 }}
          >
            <span style={{
              display: 'inline-block',
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              fontFamily: 'Montserrat, sans-serif',
              marginBottom: 16,
              padding: '4px 14px',
              border: '1px solid rgba(200,168,75,0.25)',
              borderRadius: 2,
            }}>
              О компании
            </span>
            <h2 style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: 'clamp(26px, 3.5vw, 44px)',
              fontWeight: 800,
              color: '#f0f0f0',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              marginBottom: 24,
            }}>
              МЛС-СТРОЙ —<br />
              <span style={{
                background: 'linear-gradient(135deg, #c8a84b, #e8c96a)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                надёжный партнёр
              </span>
              <br />
              в строительстве
            </h2>
            <p style={{ fontSize: 15, color: '#888', lineHeight: 1.8, marginBottom: 20 }}>
              Компания МЛС-СТРОЙ специализируется на аренде строительной и дорожной спецтехники в Москве и Московской области. Мы работаем с застройщиками, дорожными подрядчиками, коммунальными службами и частными заказчиками.
            </p>
            <p style={{ fontSize: 15, color: '#888', lineHeight: 1.8, marginBottom: 32 }}>
              Наш парк включает более 20 единиц современной техники от ведущих мировых производителей: JCB, SUNWARD, AMMANN, XCMG, ZOOMLION, DAF и других. Весь флот в собственности — без субаренды и посредников.
            </p>

            {/* CTA */}
            <button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                padding: '14px 36px',
                background: 'transparent',
                color: '#c8a84b',
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                borderRadius: 2,
                fontFamily: 'Montserrat, sans-serif',
                border: '1px solid rgba(200,168,75,0.4)',
                cursor: 'pointer',
                transition: 'all 0.3s',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(200,168,75,0.08)';
                e.currentTarget.style.boxShadow = '0 0 30px rgba(200,168,75,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Связаться с нами →
            </button>
          </motion.div>

          {/* Right — pillars */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {pillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  style={{
                    padding: '24px 20px',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    borderRadius: 6,
                    transition: 'all 0.3s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(200,168,75,0.25)';
                    e.currentTarget.style.background = 'var(--bg-card-hover)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border)';
                    e.currentTarget.style.background = 'var(--bg-card)';
                  }}
                >
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: 6,
                    background: 'rgba(200,168,75,0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 14,
                  }}>
                    <Icon size={18} color="#c8a84b" />
                  </div>
                  <div style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: '#ddd',
                    fontFamily: 'Montserrat, sans-serif',
                    marginBottom: 8,
                  }}>
                    {p.title}
                  </div>
                  <div style={{ fontSize: 12, color: '#666', lineHeight: 1.65 }}>
                    {p.text}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </section>
  );
}
