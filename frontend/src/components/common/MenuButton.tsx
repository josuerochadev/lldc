import type React from 'react';
import { motion } from 'framer-motion';

type MenuButtonProps = {
  isOpen: boolean;
  onClick: () => void;
};

const MenuButton: React.FC<MenuButtonProps> = ({ isOpen, onClick }) => {
  return (
    <div className="fixed left-0 right-0 top-gutter z-50 flex justify-start sm:justify-center">
      <motion.button
        type="button"
        aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        aria-expanded={isOpen}
        aria-controls="main-menu"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6, ease: 'easeOut' }}
        className="px-4 text-lg font-extrabold uppercase focus:outline-none sm:text-xl md:text-2xl"
        onClick={onClick}
      >
        {isOpen ? 'Fermer' : 'Menu'}
      </motion.button>
    </div>
  );
};

export default MenuButton;
