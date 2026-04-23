import { motion } from 'framer-motion';
import { Truck, FileText, Users, DollarSign, Settings, CalendarCheck } from 'lucide-react';

const advantages = [
  {
    icon: Truck,
    title: 'Собственный парк',
    text: 'Вся техника в нашей собственности. Никакой субаренды — вы работаете напрямую с владельцем.',
    number: '01',
  },
  {
    icon: Users,
    title: 'Квалифицированные операторы',
    text: 'Профессиональные машинисты с допусками и опытом работы на всех видах спецтехники.',
    number: '02',
  },
  {
    icon: DollarSign,
    title: 'Прозрачные цены',
    text: 'Чёткий прайс без скрытых платежей. Оплата по факту, официальные договоры и акты.',
    number: '03',
  },
  {
    icon: Settings,
    title: 'Техническое обслуживание',
    text: 'Регулярные ТО и контроль состояния — вы получаете только исправную, готовую к работе технику.',
    number: '04',
  },
  {
    icon: CalendarCheck,
    title: 'Гибкие сроки аренды',
    text: 'Аренда от 1 смены до нескольких месяцев. Долгосрочные договоры с выгодными условиями.',
    number: '05',
  },
  {
    icon: FileText,
    title: 'Полная документация',
    text: 'Работаем официально: договор, акты, счета. Удобно для юрлиц и принятия НДС к зачёту.',
    number: '06',
  },
];

export default function Advantages() {
  return (
    <section
      id="advantages"
      style={{
        padding: '100px 0',
        background: 'var(--bg-secondary)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 200,
        background: 'linear-gradient(to top, rgba(200,168,75,0.03), transparent)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: 64 }}
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
            Почему МЛС-СТРОЙ
          </span>
          <h2 style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: 'clamp(26px, 4vw, 46px)',
            fontWeight: 800,
            color: '#f0f0f0',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
          }}>
            Наши преимущества
          </h2>
          <div style={{ width: 60, height: 2, background: 'linear-gradient(90deg, transparent, var(--gold), transparent)', margin: '20px auto 0' }} />
        </motion.div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 20,
        }} className="adv-grid">
          {advantages.map((adv, i) => {
            const Icon = adv.icon;
            return (
              <motion.div
                key={adv.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
                style={{
                  padding: '32px 28px',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: 6,
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.35s',
                  cursor: 'default',
                }}
                whileHover={{ y: -4 }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(200,168,75,0.25)';
                  e.currentTarget.style.boxShadow = '0 20px 50px rgba(0,0,0,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Large number watermark */}
                <div style={{
                  position: 'absolute',
                  top: -10,
                  right: 16,
                  fontSize: 80,
                  fontWeight: 900,
                  color: 'rgba(200,168,75,0.04)',
                  fontFamily: 'Montserrat, sans-serif',
                  lineHeight: 1,
                  pointerEvents: 'none',
                  userSelect: 'none',
                }}>
                  {adv.number}
                </div>

                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: 8,
                  background: 'rgba(200,168,75,0.07)',
                  border: '1px solid rgba(200,168,75,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 20,
                }}>
                  <Icon size={20} color="#c8a84b" />
                </div>

                <h3 style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: 16,
                  fontWeight: 700,
                  color: '#e8e8e8',
                  marginBottom: 10,
                }}>
                  {adv.title}
                </h3>
                <p style={{ fontSize: 13, color: '#777', lineHeight: 1.7 }}>
                  {adv.text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .adv-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          .adv-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
