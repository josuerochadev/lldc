// src/App.tsx

import Contact from './sections/Contact';
import Appointments from './sections/Appointments';
import Background from './components/common/Background';

import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import Layout from '@/components/common/Layout';
import Hero from '@/sections/Hero';
import Offers from '@/sections/Offers';
// import Photos from '@/sections/Photos';
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
          {/* <Photos /> */}
          <Contact />
          <Appointments />
        </Layout>
      </div>
    </>
  );
}
