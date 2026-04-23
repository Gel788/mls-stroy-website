import { motion } from 'framer-motion';
import { Phone, ClipboardList, Truck, CheckCircle } from 'lucide-react';

const steps = [
  {
    num: '01',
    icon: Phone,
    title: 'Оставьте заявку',
    text: 'Позвоните или заполните форму на сайте. Менеджер перезвонит в течение 15 минут.',
  },
  {
    num: '02',
    icon: ClipboardList,
    title: 'Согласование',
    text: 'Подбираем нужную технику, уточняем сроки, объём работ и адрес объекта. Оформляем договор.',
  },
  {
    num: '03',
    icon: Truck,
    title: 'Выезд на объект',
    text: 'Доставляем технику с оператором в согласованное время. Подача от 2 часов.',
  },
  {
    num: '04',
    icon: CheckCircle,
    title: 'Работа выполнена',
    text: 'Принимаете работу, подписываем акт. Оплата по факту выполнения. Всё официально.',
  },
];

export default function HowItWorks() {
  return (
    <section
      style={{
        padding: '88px 0',
        background: 'var(--bg-primary)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle center glow */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700, height: 300,
        background: 'radial-gradient(ellipse, rgba(200,168,75,0.035), transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          style={{ textAlign: 'center', marginBottom: 60 }}
        >
          <span style={{
            display: 'inline-block',
            fontSize: 11, fontWeight: 700, letterSpacing: '0.2em',
            textTransform: 'uppercase', color: 'var(--gold)',
            fontFamily: 'Montserrat, sans-serif',
            marginBottom: 14, padding: '4px 14px',
            border: '1px solid rgba(200,168,75,0.25)', borderRadius: 2,
          }}>
            Просто и быстро
          </span>
          <h2 style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: 'clamp(26px, 4vw, 44px)',
            fontWeight: 800, color: '#f0f0f0',
            letterSpacing: '-0.02em', lineHeight: 1.1,
          }}>
            Как арендовать технику
          </h2>
          <div style={{
            width: 60, height: 2,
            background: 'linear-gradient(90deg, transparent, var(--gold), transparent)',
            margin: '18px auto 0',
          }} />
        </motion.div>

        {/* Steps grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 2,
          position: 'relative',
        }} className="steps-grid">

          {/* Connecting line */}
          <div style={{
            position: 'absolute',
            top: 44,
            left: '12.5%',
            right: '12.5%',
            height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(200,168,75,0.2) 15%, rgba(200,168,75,0.2) 85%, transparent)',
            pointerEvents: 'none',
            zIndex: 0,
          }} className="steps-line" />

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                style={{
                  padding: '32px 24px 28px',
                  textAlign: 'center',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                {/* Icon circle */}
                <div style={{
                  width: 64, height: 64, borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(200,168,75,0.12), rgba(200,168,75,0.04))',
                  border: '1px solid rgba(200,168,75,0.25)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 20px',
                  position: 'relative',
                  boxShadow: '0 0 30px rgba(200,168,75,0.06)',
                }}>
                  <Icon size={22} color="#c8a84b" />
                  {/* Step number */}
                  <div style={{
                    position: 'absolute', top: -8, right: -8,
                    width: 22, height: 22, borderRadius: '50%',
                    background: '#c8a84b',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 9, fontWeight: 900, color: '#000',
                    fontFamily: 'Montserrat, sans-serif',
                  }}>
                    {i + 1}
                  </div>
                </div>

                <h3 style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: 15, fontWeight: 800,
                  color: '#e8e8e8',
                  marginBottom: 10, letterSpacing: '-0.01em',
                }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: 13, color: '#666', lineHeight: 1.7 }}>
                  {step.text}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{ textAlign: 'center', marginTop: 48 }}
        >
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '14px 36px',
              background: 'linear-gradient(135deg, #c8a84b, #9d7a28)',
              color: '#000',
              fontSize: 12, fontWeight: 800,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              borderRadius: 3, fontFamily: 'Montserrat, sans-serif',
              border: 'none', cursor: 'pointer',
              boxShadow: '0 6px 32px rgba(200,168,75,0.35)',
              transition: 'all 0.3s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 12px 48px rgba(200,168,75,0.55)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 6px 32px rgba(200,168,75,0.35)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Оставить заявку →
          </button>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .steps-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 16px !important; }
          .steps-line { display: none !important; }
        }
        @media (max-width: 520px) {
          .steps-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
