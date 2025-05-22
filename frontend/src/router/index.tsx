import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

/* -----------------------------------------------
   Lazy imports: cada página vira um chunk isolado
   (Vite gera nomes baseados no comentário magick)
   --------------------------------------------- */
const HomePage = lazy(() => import(/* webpackChunkName: "home"   */ '@/sections/Hero'));
const OffersPage = lazy(() => import(/* webpackChunkName: "offers" */ '@/sections/Offers'));

export default function AppRoutes() {
  return (
    <Suspense>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/offres" element={<OffersPage />} />
        {/* 🔒 futuras rotas protegidas/lazy também entram aqui */}
      </Routes>
    </Suspense>
  );
}
