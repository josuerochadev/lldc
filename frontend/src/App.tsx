// src/App.tsx

import Contact from './sections/Contact';
import Background from './components/common/Background';
import FloatingCTA from './components/common/FloatingCTA';

import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import Layout from '@/components/common/Layout';
import Hero from '@/sections/Hero';
import Offers from '@/sections/Offers';
import Concept from '@/sections/Concept';
import Services from '@/sections/Services';

export default function App() {
  useSmoothScroll();
  return (
    <>
      <Background />
      <div className="relative z-10">
        <Layout>
          <Hero />
          <Offers />
          <Services />
          <Concept />
          <Contact />
          <FloatingCTA />
        </Layout>
      </div>
    </>
  );
}
