import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Button from '@/components/common/Button';

export default function FloatingCTA() {
  const [show, setShow] = useState(false);
  const [bottomOffset, setBottomOffset] = useState(24);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Observa o botão da hero section
  useEffect(() => {
    const ctaBtn = document.getElementById('hero-cta');
    if (!ctaBtn) return;

    const observer = new window.IntersectionObserver(([entry]) => setShow(!entry.isIntersecting), {
      root: null,
      threshold: 0.1,
    });

    observer.observe(ctaBtn);
    return () => observer.disconnect();
  }, []);

  // Calcula o offset em relação ao footer
  useEffect(() => {
    const footer = document.getElementById('footer');
    if (!footer) return;

    const handleScroll = () => {
      if (!ctaRef.current || !footer) return;
      const footerRect = footer.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      if (footerRect.top < windowHeight) {
        const overlap = windowHeight - footerRect.top;
        setBottomOffset(overlap + 24);
      } else {
        setBottomOffset(24);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Motion variants para animação (fade + up)
  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    exit: { opacity: 0, y: 50, transition: { duration: 0.4 } },
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          ref={ctaRef}
          className="fixed right-6 z-50"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={variants}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          style={{
            bottom: `${bottomOffset}px`,
            pointerEvents: 'auto',
          }}
        >
          <a
            href="https://calendly.com/josuexr"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Prendre rendez-vous"
          >
            <Button>Prendre rendez-vous</Button>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
