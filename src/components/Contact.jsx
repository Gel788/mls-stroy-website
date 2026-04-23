import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', service: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1200);
  };

  const inputStyle = {
    width: '100%',
    padding: '14px 16px',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 4,
    color: '#e0e0e0',
    fontSize: 14,
    fontFamily: 'Inter, sans-serif',
    outline: 'none',
    transition: 'border-color 0.25s, box-shadow 0.25s',
    boxSizing: 'border-box',
  };

  return (
    <section
      id="contact"
      style={{
        padding: '100px 0',
        background: 'var(--bg-primary)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background decorative */}
      <div style={{
        position: 'absolute',
        top: '50%',
        right: -200,
        width: 600,
        height: 600,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(200,168,75,0.04), transparent 70%)',
        transform: 'translateY(-50%)',
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
            Свяжитесь с нами
          </span>
          <h2 style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: 'clamp(26px, 4vw, 46px)',
            fontWeight: 800,
            color: '#f0f0f0',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
          }}>
            Оставьте заявку
          </h2>
          <p style={{ fontSize: 15, color: '#666', marginTop: 12, maxWidth: 480, margin: '12px auto 0' }}>
            Менеджер перезвонит вам в течение 15 минут и ответит на все вопросы
          </p>
          <div style={{ width: 60, height: 2, background: 'linear-gradient(90deg, transparent, var(--gold), transparent)', margin: '20px auto 0' }} />
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 60, alignItems: 'start' }} className="contact-grid">

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3 style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: 22,
              fontWeight: 700,
              color: '#e0e0e0',
              marginBottom: 8,
            }}>
              Контактная информация
            </h3>
            <p style={{ fontSize: 14, color: '#666', lineHeight: 1.7, marginBottom: 36 }}>
              Работаем по Москве и всей Московской области. Готовы выехать на объект для осмотра и консультации.
            </p>

            {[
              { icon: Phone, label: 'Телефон', value: '+7 (900) 999-99-99', href: 'tel:+79009999999' },
              { icon: Mail, label: 'E-mail', value: 'info@mls-stroy.ru', href: 'mailto:info@mls-stroy.ru' },
              { icon: MapPin, label: 'Регион работы', value: 'Москва и Московская область', href: null },
            ].map(({ icon: Icon, label, value, href }) => (
              <div key={label} style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 16,
                marginBottom: 28,
                padding: '18px 20px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 6,
              }}>
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: 8,
                  background: 'rgba(200,168,75,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Icon size={17} color="#c8a84b" />
                </div>
                <div>
                  <div style={{ fontSize: 11, color: '#555', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'Montserrat, sans-serif', marginBottom: 3 }}>{label}</div>
                  {href ? (
                    <a href={href} style={{ fontSize: 15, fontWeight: 600, color: '#ddd', transition: 'color 0.2s' }}
                      onMouseEnter={(e) => (e.target.style.color = '#c8a84b')}
                      onMouseLeave={(e) => (e.target.style.color = '#ddd')}>
                      {value}
                    </a>
                  ) : (
                    <span style={{ fontSize: 14, color: '#ddd' }}>{value}</span>
                  )}
                </div>
              </div>
            ))}

            {/* Working hours */}
            <div style={{
              padding: '20px',
              background: 'rgba(200,168,75,0.05)',
              border: '1px solid rgba(200,168,75,0.2)',
              borderRadius: 6,
            }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#c8a84b', fontFamily: 'Montserrat, sans-serif', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>
                Режим работы
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 13, color: '#888' }}>Пн – Пт</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#ccc' }}>08:00 – 20:00</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 13, color: '#888' }}>Сб – Вс</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#ccc' }}>09:00 – 18:00</span>
              </div>
              <div style={{ marginTop: 10, fontSize: 12, color: '#c8a84b' }}>
                ● Диспетчер — круглосуточно
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 8,
              padding: '40px 36px',
            }}
          >
            {sent ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  <CheckCircle size={60} color="#c8a84b" style={{ margin: '0 auto 20px' }} />
                </motion.div>
                <h3 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 22, fontWeight: 700, color: '#e0e0e0', marginBottom: 10 }}>
                  Заявка отправлена!
                </h3>
                <p style={{ fontSize: 14, color: '#777', lineHeight: 1.7 }}>
                  Наш менеджер свяжется с вами в ближайшее время.
                </p>
                <button
                  onClick={() => setSent(false)}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(200,168,75,0.08)'; e.currentTarget.style.borderColor = 'rgba(200,168,75,0.55)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(200,168,75,0.3)'; }}
                  onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.97)'; }}
                  onMouseUp={(e)   => { e.currentTarget.style.transform = 'scale(1)'; }}
                  style={{
                    marginTop: 24, padding: '11px 28px',
                    background: 'transparent',
                    border: '1px solid rgba(200,168,75,0.3)',
                    borderRadius: 8,
                    color: '#c8a84b',
                    fontSize: 12, fontWeight: 700,
                    cursor: 'pointer',
                    fontFamily: 'Montserrat, sans-serif',
                    letterSpacing: '0.08em',
                    transition: 'all 0.22s',
                    WebkitTapHighlightColor: 'transparent',
                  }}
                >
                  Отправить ещё
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: 20,
                  fontWeight: 700,
                  color: '#e0e0e0',
                  marginBottom: 6,
                }}>
                  Заявка на аренду
                </h3>
                <p style={{ fontSize: 13, color: '#666', marginBottom: 28, lineHeight: 1.6 }}>
                  Заполните форму — мы свяжемся с вами и подберём оптимальное решение
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#666', fontFamily: 'Montserrat, sans-serif', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>
                      Ваше имя *
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Иван Иванов"
                      style={inputStyle}
                      onFocus={(e) => { e.target.style.borderColor = 'rgba(200,168,75,0.5)'; e.target.style.boxShadow = '0 0 0 3px rgba(200,168,75,0.05)'; }}
                      onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.boxShadow = 'none'; }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#666', fontFamily: 'Montserrat, sans-serif', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>
                      Телефон *
                    </label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      placeholder="+7 (___) ___-__-__"
                      type="tel"
                      style={inputStyle}
                      onFocus={(e) => { e.target.style.borderColor = 'rgba(200,168,75,0.5)'; e.target.style.boxShadow = '0 0 0 3px rgba(200,168,75,0.05)'; }}
                      onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.boxShadow = 'none'; }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: 14 }}>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#666', fontFamily: 'Montserrat, sans-serif', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>
                    Нужная техника
                  </label>
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    style={{ ...inputStyle, cursor: 'pointer', appearance: 'none' }}
                    onFocus={(e) => { e.target.style.borderColor = 'rgba(200,168,75,0.5)'; e.target.style.boxShadow = '0 0 0 3px rgba(200,168,75,0.05)'; }}
                    onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.boxShadow = 'none'; }}
                  >
                    <option value="">— Выберите категорию —</option>
                    <option>Экскаватор</option>
                    <option>Погрузчик</option>
                    <option>Дорожный каток</option>
                    <option>Грузовой транспорт</option>
                    <option>Прицеп / Тяжеловоз</option>
                    <option>Спецтехника</option>
                    <option>Не определился</option>
                  </select>
                </div>

                <div style={{ marginBottom: 24 }}>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#666', fontFamily: 'Montserrat, sans-serif', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>
                    Комментарий
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Опишите задачу, объём работ, адрес объекта..."
                    style={{ ...inputStyle, resize: 'vertical', minHeight: 100 }}
                    onFocus={(e) => { e.target.style.borderColor = 'rgba(200,168,75,0.5)'; e.target.style.boxShadow = '0 0 0 3px rgba(200,168,75,0.05)'; }}
                    onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.boxShadow = 'none'; }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  onMouseEnter={(e) => { if (!loading) { e.currentTarget.style.boxShadow = '0 12px 44px rgba(200,168,75,0.55)'; e.currentTarget.style.transform = 'translateY(-2px)'; } }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 6px 30px rgba(200,168,75,0.28)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                  onMouseDown={(e) => { if (!loading) { e.currentTarget.style.transform = 'translateY(1px) scale(0.98)'; e.currentTarget.style.boxShadow = '0 3px 16px rgba(200,168,75,0.25)'; } }}
                  onMouseUp={(e)   => { if (!loading) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 44px rgba(200,168,75,0.55)'; } }}
                  style={{
                    width: '100%', padding: '16px',
                    background: loading ? 'rgba(200,168,75,0.35)' : 'linear-gradient(135deg, #c8a84b, #9d7a28)',
                    color: '#000',
                    fontSize: 13, fontWeight: 800,
                    letterSpacing: '0.12em', textTransform: 'uppercase',
                    borderRadius: 8,
                    fontFamily: 'Montserrat, sans-serif',
                    border: 'none',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    boxShadow: '0 6px 30px rgba(200,168,75,0.28)',
                    transition: 'transform 0.25s cubic-bezier(0.34,1.2,0.64,1), box-shadow 0.25s',
                    WebkitTapHighlightColor: 'transparent',
                  }}
                >
                  {loading ? (
                    <span style={{ opacity: 0.7 }}>Отправка...</span>
                  ) : (
                    <><Send size={15} /> Отправить заявку</>
                  )}
                </button>

                <p style={{ fontSize: 11, color: '#444', textAlign: 'center', marginTop: 14, lineHeight: 1.6 }}>
                  Нажимая «Отправить», вы соглашаетесь с обработкой персональных данных
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
        input::placeholder, textarea::placeholder { color: #3a3a3a; }
      `}</style>
    </section>
  );
}
