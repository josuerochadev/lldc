import type React from 'react';
import { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type FullScreenMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

const links = [
  { label: 'Nos offres', href: '#offers' },
  { label: 'Nos services', href: '#services' },
  { label: 'Le concept', href: '#concept' },
  { label: 'Nous contacter', href: '#contact' },
  { label: 'Prendre rendez‑vous', href: '#appointment' }, // com non-breaking hyphen
];

const FullScreenMenu: React.FC<FullScreenMenuProps> = ({ isOpen, onClose }) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 flex flex-col justify-between bg-orange p-6 pt-32 md:pt-36 3xl:pt-48"
        >
          {/* Center: Liste des liens */}
          <div
            ref={menuRef}
            className="mx-auto flex max-w-[95%] flex-col items-start space-y-2 sm:max-w-[80%] sm:space-y-6 lg:max-w-[70%]"
          >
            {links.map((link, index) => {
              const words = link.label.split(' ');
              const firstWord = words[0];
              const remainingWords = words.slice(1).join(' ');

              return (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="flex items-baseline py-1 text-left uppercase transition hover:scale-110 sm:py-0"
                  onClick={onClose}
                  whileHover={{ scale: 1.1 }}
                >
                  <span className="mr-4 text-base font-thin sm:text-2xl md:text-3xl 3xl:text-4xl">
                    {index + 1}.
                  </span>
                  <span className="text-2xl font-thin sm:text-4xl md:text-5xl 3xl:text-6xl">
                    {firstWord}
                  </span>
                  <span className="text-2xl font-extrabold sm:text-4xl md:text-5xl 3xl:text-6xl">
                    &nbsp;{remainingWords}
                  </span>
                </motion.a>
              );
            })}
          </div>

          {/* Bottom: Mini Footer */}
          <div className="space-y-2 text-center text-xs leading-relaxed">
            <h2 className="text-lg font-extrabold tracking-wide">
              <span className="font-thin">LA </span>LUNETTERIE{' '}
              <span className="font-thin">DU </span>COIN
            </h2>
            <p>24 Rue du Faubourg-de-Pierre, 67000 Strasbourg</p>
            <p>
              <a href="tel:+33388512440" className="underline underline-offset-4">
                03 88 51 24 40
              </a>
            </p>
            <p>Du lundi au samedi : 10 h–14 h / 15 h–19 h</p>
            <p>Dimanche : fermé</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FullScreenMenu;
