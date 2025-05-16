import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { ROUTES_CONFIG } from '@/config/constants';
import Logo from '@/assets/logo/logo-eye.svg?react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const currentRoute = ROUTES_CONFIG.find((r) => r.path === location.pathname);

  return (
    /* `relative` para ancorar o overlay */
    <header className="relative isolate z-30 mt-8 flex w-full items-center justify-evenly gap-8 px-6 py-4">
      {/* --- EFEITO DE FUNDO --- */}
      {/* O elemento `span` com `aria-hidden` é usado para criar um efeito de fundo animado */}
      <span
        aria-hidden
        className="pointer-events-none absolute -top-32 -z-10 h-56 w-[160vw] -translate-x-1/2 animate-halo rounded-b-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow/60 via-orange/60 to-transparent blur-lg md:h-64 md:w-[140vw]"
      />

      {/* --- CONTEÚDO DO HEADER --- */}
      <Link to="/" aria-label="Retour à l'accueil">
        <Logo className="h-auto w-[clamp(30px,6vw,40px)] text-primary" />
      </Link>

      {currentRoute?.title && (
        <h1 className="text-center font-serif text-3xl text-primary sm:text-4xl md:text-5xl">
          {currentRoute.title.normal && (
            <span className="mr-1 font-normal">{currentRoute.title.normal}</span>
          )}
          <span className="font-extrabold">{currentRoute.title.bold}</span>
        </h1>
      )}

      {/* --- MENU BURGER --- */}
      <div className="relative">
        <button
          type="button"
          className="text-5xl text-primary"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          ☰
        </button>

        {menuOpen && (
          <nav className="absolute right-0 mt-2 rounded bg-white p-4 shadow-lg">
            <ul className="space-y-2">
              {ROUTES_CONFIG.map(({ path, navLabel }) => (
                <li key={path}>
                  <Link
                    to={path}
                    onClick={() => setMenuOpen(false)}
                    className="text-primary transition-colors hover:text-orange"
                  >
                    {navLabel}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
