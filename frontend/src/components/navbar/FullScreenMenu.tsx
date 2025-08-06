import { useRef, useEffect } from 'react';
import type React from 'react';

import Footer from '../../sections/Footer';

import MenuLinkItem from './MenuLinkItem';

import AnimatedItem from '@/components/motion/AnimatedItem';
import { fadeInDown } from '@/components/motion/variants/fade';
import { LINKS } from '@/config/constants';


type FullScreenMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

const FullScreenMenu: React.FC<FullScreenMenuProps> = ({ isOpen, onClose }) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }

    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    }

    // Gestion du focus à l’ouverture pour l’accessibilité
    menuRef.current?.focus();

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <nav
      id="main-menu"
      aria-label="Navigation principale"
      tabIndex={-1}
      className="fixed inset-0 z-menu flex min-h-dvh flex-col overflow-y-auto bg-light-green/60 px-container-x pt-[8rem] backdrop-blur-[100px]"
    >
      {/* Wrapper pour le menu */}
      <div ref={menuRef} className="flex w-full flex-1 flex-col items-center justify-center">
        {/* Groupe des liens principaux */}
        <section aria-label="Navigation principale" className="w-fit space-y-4 text-left">
          <ul>
            {LINKS.map((link, i) => (
              <li key={link.href}>
                <AnimatedItem
                  key={link.href}
                  index={i}
                  duration={0.4}
                  variant={fadeInDown}
                  className="block"
                >
                  <MenuLinkItem {...link} index={i} onClick={onClose} />
                </AnimatedItem>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Footer du menu */}
      <footer className="w-full">
        <AnimatedItem
          index={LINKS.length}
          duration={0.4}
          variant={fadeInDown}
          className="p-section-gap"
        >
          <Footer variant="menu" className="text-purple" />
        </AnimatedItem>
      </footer>
    </nav>
  );
};

export default FullScreenMenu;
