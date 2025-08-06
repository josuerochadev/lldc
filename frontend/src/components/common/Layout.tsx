import type React from 'react';

import Navbar from '../navbar/Navbar';
import Footer from '../../sections/Footer';

type LayoutProps = {
  children: React.ReactNode;
};

/**
 * Composant de disposition principal de l'application.
 *
 * Ce composant enveloppe le contenu de l'application avec une barre de navigation en haut
 * et un pied de page en bas. Il assure également que le contenu principal occupe au moins
 * la hauteur de l'écran.
 *
 * @param {LayoutProps} props - Les propriétés du composant, incluant les éléments enfants à afficher.
 * @returns {JSX.Element} Le composant de disposition avec la barre de navigation, le contenu principal et le pied de page.
 */

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="relative min-h-screen text-purple">
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </div>
  );
}
