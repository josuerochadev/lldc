import type React from 'react';
import { useRef, useEffect } from 'react';

import Footer from '../../sections/Footer';

import MenuLinkItem from './MenuLinkItem';

import { useClickOutside } from '@/hooks/useClickOutside';
import AnimatedItem from '@/components/motion/AnimatedItem';
import { fadeInDown } from '@/components/motion/variants/fade';
import { LINKS } from '@/config/constants';

type FullScreenMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

/**
 * Composant `FullScreenMenu`
 *
 * Affiche un menu de navigation plein écran, accessible et animé, qui s'ouvre en superposition.
 *
 * Fonctionnalités principales :
 * - Affichage conditionnel selon l’état `isOpen`.
 * - Fermeture automatique lors d’un clic en dehors du menu ou à l’appui sur la touche Échap.
 * - Gestion du focus à l’ouverture pour l’accessibilité.
 * - Affichage d’une liste de liens principaux animés et d’un pied de page personnalisé.
 *
 * Props :
 * @param {boolean} isOpen - Indique si le menu est ouvert.
 * @param {() => void} onClose - Fonction appelée pour fermer le menu.
 *
 * Accessibilité :
 * - Utilise `aria-label` et `tabIndex` pour une meilleure navigation clavier.
 * - Gère le focus et la fermeture via la touche Échap.
 *
 * @component
 */
const FullScreenMenu: React.FC<FullScreenMenuProps> = ({ isOpen, onClose }) => {
  const menuRef = useRef<HTMLDivElement>(null);

  // Gère la fermeture au clic hors du menu uniquement si ouvert
  useClickOutside(menuRef, () => onClose(), isOpen);

  useEffect(() => {
    if (!isOpen) return;

    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }

    // Gestion du focus à l'ouverture
    menuRef.current?.focus();

    // Empêche le scroll du body quand le menu est ouvert
    document.body.style.overflow = 'hidden';

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <nav
      id="main-menu"
      aria-label="Navigation principale"
      tabIndex={-1}
      className="fixed inset-0 z-menu flex min-h-dvh touch-pan-y flex-col overflow-y-auto bg-light-green/60 px-container-x pt-[8rem] backdrop-blur-[100px]"
    >
      {/* Wrapper pour le menu */}
      <div ref={menuRef} className="flex w-full flex-1 flex-col items-center justify-center">
        {/* Groupe des liens principaux */}
        <section
          aria-label="Navigation principale"
          className="w-fit space-y-6 text-left sm:space-y-4"
        >
          <ul>
            {LINKS.map((link, i) => (
              <li key={link.href} className="touch-manipulation">
                <AnimatedItem
                  key={link.href}
                  index={i}
                  duration={0.4}
                  variant={fadeInDown}
                  className="block py-2 sm:py-0"
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
