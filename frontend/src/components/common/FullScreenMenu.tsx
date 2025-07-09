// src/components/common/FullScreenMenu.tsx

import type React from 'react';
import { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import MenuLinkItem from './MenuLinkItem';
import Footer from './Footer';

import { LINKS } from '@/config/constants';
import { menuItemVariants, menuStaggerVariants } from '@/components/motion/menuVariants';

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
  className="fixed inset-0 z-menu flex flex-col bg-light-green/60 px-container-x pt-[8rem] backdrop-blur-[100px] overflow-y-auto"
>
  <motion.div
    ref={menuRef}
    variants={menuStaggerVariants}
    initial="hidden"
    animate="visible"
    exit="hidden"
    className="mx-auto flex w-full max-w-content flex-1 flex-col items-start gap-y-1"
  >
    {LINKS.map((link, index) => (
      <motion.div key={link.href} variants={menuItemVariants}>
        <MenuLinkItem {...link} index={index} onClick={onClose} />
      </motion.div>
    ))}
  </motion.div>

  {/* Footer com padding e espaçamento seguros */}
  <div className="px-4 pb-8 pt-4">
    <Footer variant="menu" className="text-purple" />
  </div>
</motion.nav>
      )}
    </AnimatePresence>
  );
};

export default FullScreenMenu;
