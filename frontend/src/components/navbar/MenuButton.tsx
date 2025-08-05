import { useEffect, useState } from 'react';
import { forwardRef } from 'react';

import AnimatedItem from '@/components/motion/AnimatedItem';
import { fadeInDown } from '@/components/motion/variants/fade';

type MenuButtonProps = {
  isOpen: boolean;
  onClick: () => void;
};

const MenuButton = forwardRef<HTMLButtonElement, MenuButtonProps>(({ isOpen, onClick }, ref) => {
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    // Animation uniquement au tout premier render
    const timer = setTimeout(() => setHasAnimated(true), 500); // 500ms ≈ durée animation
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed left-0 right-0 z-overlay flex justify-start p-section-gap sm:justify-center">
      {!hasAnimated ? (
        <AnimatedItem variants={fadeInDown}>
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
      ) : (
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
      )}
    </div>
  );
});

export default MenuButton;
