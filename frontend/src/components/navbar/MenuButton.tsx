import { forwardRef } from 'react';

import { fadeInDown } from '@/components/motion/variants/fade';
import AnimatedItem from '@/components/motion/AnimatedItem';

type MenuButtonProps = {
  isOpen: boolean;
  onClick: () => void;
};

const MenuButton = forwardRef<HTMLButtonElement, MenuButtonProps>(({ isOpen, onClick }, ref) => {
  return (
    <div className="fixed left-0 right-0 z-overlay flex justify-start p-section-gap sm:justify-center">
      <AnimatedItem variant={fadeInDown} duration={0.6} viewport={{ once: true }}>
        <button
          ref={ref}
          type="button"
          id="menu-toggle"
          onClick={onClick}
          aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={isOpen}
          aria-controls="main-menu"
          className="menu-toggle-button focus-style hover:font-black"
        >
          {isOpen ? 'Fermer' : 'Menu'}
        </button>
      </AnimatedItem>
    </div>
  );
});

export default MenuButton;