import type React from 'react';
import { useState, useEffect } from 'react';

import MenuButton from './MenuButton';
import FullScreenMenu from './FullScreenMenu';

const Navbar: React.FC = () => {
  const [menuRequested, setMenuRequested] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    if (menuRequested) {
      setMenuVisible(true);
    } else {
      const timeout = setTimeout(() => setMenuVisible(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [menuRequested]);

  const handleToggle = () => {
    // Bloqueia toggle durante o exit
    if (!menuRequested && menuVisible) return;
    setMenuRequested(!menuRequested);
  };

  return (
    <>
      <MenuButton isOpen={menuVisible} onClick={handleToggle} />
      <FullScreenMenu
        isOpen={menuRequested || menuVisible}
        onClose={() => setMenuRequested(false)}
      />
    </>
  );
};

export default Navbar;
