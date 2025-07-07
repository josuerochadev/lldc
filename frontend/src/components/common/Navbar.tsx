import type React from 'react';
import { useState, useEffect, useRef } from 'react';

import MenuButton from './MenuButton';
import FullScreenMenu from './FullScreenMenu';

const Navbar: React.FC = () => {
  const [menuActive, setMenuActive] = useState(false);
  const [menuRendered, setMenuRendered] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Controla renderização do menu (para evitar toggle duplo)
  useEffect(() => {
    if (menuActive) {
      setMenuRendered(true);
    } else {
      const timeout = setTimeout(() => setMenuRendered(false), 300); // mesmo tempo que a animação de saída
      return () => clearTimeout(timeout);
    }
  }, [menuActive]);

  const handleToggle = () => {
    if (!menuActive && menuRendered) return; // previne reabertura no click duplo
    setMenuActive(!menuActive);
  };

  const handleClose = () => {
    setMenuActive(false);
    buttonRef.current?.focus();
  };

  return (
    <>
      <MenuButton isOpen={menuActive} onClick={handleToggle} ref={buttonRef} />
      {menuRendered && <FullScreenMenu isOpen={menuActive} onClose={handleClose} />}
    </>
  );
};

export default Navbar;
