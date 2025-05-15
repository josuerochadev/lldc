// frontend/src/layout/Layout.tsx

import { useLocation } from 'react-router-dom';
import type { ReactNode } from 'react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Background from '@/components/Background';

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-primary font-sans text-primary">
      <Background />

      <div className="relative z-10 flex flex-1 flex-col">
        {!isHome && <Header />}
        <main className="flex flex-1 flex-col">{children}</main>
        {/* Footer escondido inicialmente na homepage */}
        {!isHome && <Footer />}
      </div>

      {/* Footer visível somente com scroll na homepage */}
      {isHome && (
        <div className="mt-auto">
          <Footer />
        </div>
      )}
    </div>
  );
}
