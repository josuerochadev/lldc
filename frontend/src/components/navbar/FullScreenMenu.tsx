import type React from 'react';
import { useRef, useEffect } from 'react';

import Footer from '../../sections/Footer';

import MenuLinkItem from './MenuLinkItem';

import AnimatedItem from '@/components/motion/AnimatedItem';
import { LINKS } from '@/config/constants';
import { DEFAULT_STAGGER } from '@/components/motion/AnimatedItem';

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

  if (!isOpen) return null;

  return (
    <nav
      id="main-menu"
      aria-label="Navigation principale"
      tabIndex={-1}
      className="fixed inset-0 z-menu flex min-h-dvh flex-col overflow-y-auto bg-light-green/60 px-container-x pt-[8rem] backdrop-blur-[100px]"
    >
      <div
        ref={menuRef}
        className="flex w-full flex-1 flex-col items-center justify-center"
      >
        <div className="w-fit space-y-4 text-left">
          {LINKS.map((link, i) => (
            <AnimatedItem
              index={i}
              stagger={DEFAULT_STAGGER}
              duration={0.4}
              key={link.href}
              className="block"
            >
              <MenuLinkItem {...link} index={i} onClick={onClose} />
            </AnimatedItem>
          ))}
        </div>
      </div>

      {/* Footer animé après les liens */}
      <AnimatedItem
        index={LINKS.length}
        stagger={DEFAULT_STAGGER}
        duration={0.4}
        className="p-section-gap"
      >
        <Footer variant="menu" className="text-purple" />
      </AnimatedItem>
    </nav>
  );
};

export default FullScreenMenu;