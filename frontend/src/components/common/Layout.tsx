import type React from 'react';

import Navbar from '../navbar/Navbar';
import Footer from '../../sections/Footer';

import SkipLink from '@/components/common/SkipLink';


type LayoutProps = {
  children: React.ReactNode;
};

/**
 * Composant de disposition principal de l'application.
 *
 * Ce composant enveloppe le contenu de l'application avec une barre de navigation en haut
 * et un pied de page en bas. Il assure également que le contenu principal occupe au minimum
 * toute la hauteur de l'écran.
 *
 * @param children Les éléments React à afficher dans la section principale de la page.
 * @returns Le layout global avec la barre de navigation, le contenu principal et le pied de page.
 */

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="relative min-h-screen text-purple">
      <SkipLink />
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </div>
  );
}
