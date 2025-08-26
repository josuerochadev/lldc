// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/globals.css';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from '@dr.pogodin/react-helmet';
import { LazyMotion } from 'framer-motion';

import App from './App';

import { MotionProvider } from '@/a11y/MotionProvider';
import ScrollToTop from '@/components/routing/ScrollToTop';
import { loadFeatures } from '@/lib/loadMotionFeatures';


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <MotionProvider>
          <LazyMotion features={loadFeatures} strict>
            <ScrollToTop />
            <App />
          </LazyMotion>
        </MotionProvider>
      </HelmetProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
