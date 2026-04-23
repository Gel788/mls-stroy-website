import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageCircle, X } from 'lucide-react';

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          style={{
            position: 'fixed',
            bottom: 28,
            right: 28,
            zIndex: 4000,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: 10,
          }}
        >
          {/* Expanded options */}
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
              >
                <a
                  href="tel:+79009999999"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '11px 18px',
                    background: '#111',
                    border: '1px solid rgba(200,168,75,0.25)',
                    borderRadius: 30,
                    color: '#ddd',
                    fontSize: 13,
                    fontWeight: 600,
                    fontFamily: 'Montserrat, sans-serif',
                    textDecoration: 'none',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#c8a84b'; e.currentTarget.style.color = '#c8a84b'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(200,168,75,0.25)'; e.currentTarget.style.color = '#ddd'; }}
                >
                  <Phone size={15} color="#c8a84b" />
                  Позвонить
                </a>
                <a
                  href="https://wa.me/79009999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '11px 18px',
                    background: '#111',
                    border: '1px solid rgba(200,168,75,0.25)',
                    borderRadius: 30,
                    color: '#ddd',
                    fontSize: 13,
                    fontWeight: 600,
                    fontFamily: 'Montserrat, sans-serif',
                    textDecoration: 'none',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#c8a84b'; e.currentTarget.style.color = '#c8a84b'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(200,168,75,0.25)'; e.currentTarget.style.color = '#ddd'; }}
                >
                  <MessageCircle size={15} color="#c8a84b" />
                  WhatsApp
                </a>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main button */}
          <button
            onClick={() => setOpen((o) => !o)}
            style={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #c8a84b, #9d7a28)',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 32px rgba(200,168,75,0.45)',
              transition: 'all 0.3s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 12px 40px rgba(200,168,75,0.65)'; e.currentTarget.style.transform = 'scale(1.08)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 8px 32px rgba(200,168,75,0.45)'; e.currentTarget.style.transform = 'scale(1)'; }}
          >
            <motion.div
              animate={{ rotate: open ? 45 : 0 }}
              transition={{ duration: 0.25 }}
            >
              {open ? <X size={22} color="#000" /> : <Phone size={22} color="#000" />}
            </motion.div>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
