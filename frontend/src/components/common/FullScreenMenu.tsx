import type React from 'react';
import { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import MenuLinkItem from './MenuLinkItem';

import { LINKS } from '@/config/constants';

type FullScreenMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

const FullScreenMenu: React.FC<FullScreenMenuProps> = ({ isOpen, onClose }) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.nav
          id="main-menu"
          aria-modal="true"
          aria-label="Navigation principale"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-menu flex flex-col justify-between bg-violet/60 p-6 pt-32 backdrop-blur-[100px] md:pt-36 3xl:pt-48"
        >
          <div
            ref={menuRef}
            className="mx-auto flex max-w-[95%] flex-col items-start space-y-4 text-[clamp(1.2rem,2vw,3.5rem)] sm:max-w-[80%] sm:space-y-6 lg:max-w-[70%] 4xl:space-y-8"
          >
            {LINKS.map((link, index) => (
              <MenuLinkItem key={link.href} {...link} index={index} onClick={onClose} />
            ))}
          </div>

          <div className="space-y-2 text-center text-sm leading-relaxed md:text-base">
            <h2 className="text-lg font-extrabold tracking-wide">
              <span className="font-thin">LA</span>LUNETTERIE
              <span className="font-thin">DU</span>COIN
            </h2>
            <p>24 Rue du Faubourg-de-Pierre, 67000 Strasbourg</p>
            <p>
              <a href="tel:+33388512440" className="underline underline-offset-4">
                03 88 51 24 40
              </a>
            </p>
            <p>Du lundi au samedi : 10 h–14 h / 15 h–19 h</p>
            <p>Dimanche : fermé</p>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default FullScreenMenu;
