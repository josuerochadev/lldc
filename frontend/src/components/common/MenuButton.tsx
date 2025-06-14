import type React from 'react';
import { motion } from 'framer-motion';

type MenuButtonProps = {
  isOpen: boolean;
  onClick: () => void;
};

const MenuButton: React.FC<MenuButtonProps> = ({ isOpen, onClick }) => {
  return (
    <motion.button
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.6, ease: 'easeOut' }}
      className="
        fixed z-50 text-3xl font-extrabold uppercase text-primary focus:outline-none
        top-6 left-6 
        sm:left-1/2 sm:-translate-x-1/2
      "
      onClick={onClick}
    >
      {isOpen ? 'Fermer' : 'Menu'}
    </motion.button>
  );
};

export default MenuButton;