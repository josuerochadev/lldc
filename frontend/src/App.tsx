// src/App.tsx
import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

import Contact from './sections/Contact';
import Appointments from './sections/Appointments';

import Layout from '@/components/common/Layout';
import Hero from '@/sections/Hero';
import Offers from '@/sections/Offers';
import Photos from '@/sections/Photos';
import Concept from '@/sections/Concept';
import Services from '@/sections/Services';
import Testimonials from '@/sections/Testimonials';

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1, // ligeiramente mais rápido, mantendo fluidez
      easing: (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2), // EaseInOutCubic
      wheelMultiplier: 1.15, // um pouco mais ágil em desktop
      touchMultiplier: 1.2, // resposta mais rápida em mobile
      smoothWheel: true,
      gestureOrientation: 'vertical',
      infinite: false,
    });

    let animationFrame: number;

    const raf = (time: number) => {
      lenis.raf(time);
      animationFrame = requestAnimationFrame(raf);
    };

    animationFrame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrame);
      lenis.destroy();
    };
  }, []);

  return (
    <Layout>
      <Hero />
      <Offers />
      <Services />
      <Testimonials />
      <Concept />
      <Photos />
      <Contact />
      <Appointments />
    </Layout>
  );
}
