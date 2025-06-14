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
  { label: 'Prendre rendez-vous', href: '#appointment' },
];

const FullScreenMenu: React.FC<FullScreenMenuProps> = ({ isOpen, onClose }) => {
  const menuRef = useRef<HTMLDivElement>(null);

  // Detecta clique fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-orange flex justify-center items-center"
        >
          <div ref={menuRef} className="flex flex-col items-start mx-auto space-y-0">
            {links.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                className="text-6xl font-extrabold uppercase transition hover:scale-110 text-left"
                onClick={onClose}
                whileHover={{ scale: 1.1 }}
              >
                {link.label}
              </motion.a>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FullScreenMenu;