import { forwardRef } from 'react';

import FadeInUpDown from '@/components/motion/FadeInUpDown';

type MenuButtonProps = {
  isOpen: boolean;
  onClick: () => void;
};

const MenuButton = forwardRef<HTMLButtonElement, MenuButtonProps>(({ isOpen, onClick }, ref) => {
  return (
    <div className="fixed left-0 right-0 z-overlay flex justify-start p-section-gap sm:justify-center">
      <FadeInUpDown>
        <button
          ref={ref}
          type="button"
          id="menu-toggle"
          onClick={onClick}
          aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={isOpen}
          aria-controls="main-menu"
          className="menu-toggle-button hover:font-black focus-visible:rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-light-green"
        >
          {isOpen ? 'Fermer' : 'Menu'}
        </button>
      </FadeInUpDown>
    </div>
  );
});

export default MenuButton;
