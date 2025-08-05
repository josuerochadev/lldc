// src/components/common/FullScreenMenu.tsx

import type React from 'react';
import { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Footer from '../../sections/Footer';

import MenuLinkItem from './MenuLinkItem';

import AnimatedItem from '@/components/motion/AnimatedItem';
import { fadeInUp } from '@/components/motion/variants/fade';
import { LINKS } from '@/config/constants';
import { menuItemVariants, menuStaggerVariants } from '@/components/motion/variants/menu';

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
          tabIndex={-1}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-menu flex min-h-dvh flex-col overflow-y-auto bg-light-green/60 px-container-x pt-[8rem] backdrop-blur-[100px]"
        >
          {/* Header com padding e espaçamento seguros */}
          <motion.div
            ref={menuRef}
            variants={menuStaggerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="flex w-full flex-1 flex-col items-center justify-center"
          >
            <div className="w-fit space-y-4 text-left">
              {LINKS.map((link, index) => (
                <motion.div key={link.href} variants={menuItemVariants}>
                  <MenuLinkItem {...link} index={index} onClick={onClose} />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Footer com padding e espaçamento seguros */}
          <AnimatedItem variants={fadeInUp} delay={0.6} className="p-section-gap">
            <Footer variant="menu" className="text-purple" />
          </AnimatedItem>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default FullScreenMenu;
