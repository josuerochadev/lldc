import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

/* -----------------------------------------------
   Lazy imports: cada página vira um chunk isolado
   (Vite gera nomes baseados no comentário magick)
   --------------------------------------------- */
const HomePage = lazy(() => import(/* webpackChunkName: "home"   */ '@/pages/HomePage'));
const OffersPage = lazy(() => import(/* webpackChunkName: "offers" */ '@/pages/OffersPage'));

/* Fallback simples – pode trocar por spinner ou skeleton */
function PageLoader() {
  return (
    <div className="flex h-screen w-full items-center justify-center text-primary">Loading…</div>
  );
}

export default function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/offres" element={<OffersPage />} />
        {/* 🔒 futuras rotas protegidas/lazy também entram aqui */}
      </Routes>
    </Suspense>
  );
}
