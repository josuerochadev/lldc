import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from '@dr.pogodin/react-helmet';

import App from './App';

import { MotionProvider } from '@/a11y/MotionProvider';
import ScrollToTop from '@/components/routing/ScrollToTop';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <MotionProvider>
          <QueryClientProvider client={queryClient}>
            <ScrollToTop />
            <App />
            {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
          </QueryClientProvider>
        </MotionProvider>
      </HelmetProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
