import type React from 'react';
import { useState, useEffect } from 'react';

import MenuButton from './MenuButton';
import FullScreenMenu from './FullScreenMenu';

const Navbar: React.FC = () => {
  const [menuActive, setMenuActive] = useState(false);
  const [menuRendered, setMenuRendered] = useState(false);

  useEffect(() => {
    if (menuActive) {
      setMenuRendered(true);
    } else {
      const timeout = setTimeout(() => setMenuRendered(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [menuActive]);

  const handleToggle = () => {
    // Bloqueia toggle durante o exit
    if (!menuActive && menuRendered) return;
    setMenuActive(!menuActive);
  };

  return (
    <>
      <MenuButton isOpen={menuActive} onClick={handleToggle} />
      <FullScreenMenu isOpen={menuActive} onClose={() => setMenuActive(false)} />
    </>
  );
};

export default Navbar;
