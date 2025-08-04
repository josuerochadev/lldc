import { forwardRef } from 'react';

import MenuButtonEntrance from '@/components/motion/MenuButtonEntrance';

type MenuButtonProps = {
  isOpen: boolean;
  onClick: () => void;
};

const MenuButton = forwardRef<HTMLButtonElement, MenuButtonProps>(({ isOpen, onClick }, ref) => {
  return (
    <div className="fixed left-0 right-0 z-overlay flex justify-start p-section-gap sm:justify-center">
      <MenuButtonEntrance>
        <button
          ref={ref}
          type="button"
          id="menu-toggle"
          onClick={onClick}
          aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={isOpen}
          aria-controls="main-menu"
          className="menu-toggle-button hover:font-black focus-style"
        >
          {isOpen ? 'Fermer' : 'Menu'}
        </button>
      </MenuButtonEntrance>
    </div>
  );
});

export default MenuButton;
