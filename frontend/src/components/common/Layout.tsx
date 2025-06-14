import type React from 'react';

import Navbar from './Navbar';
import Footer from './Footer';

type LayoutProps = {
  children: React.ReactNode;
  observeRef?: React.RefObject<HTMLElement>;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="relative min-h-screen font-sans text-primary">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
