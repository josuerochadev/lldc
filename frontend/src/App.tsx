import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import ConditionsDeVente from './pages/ConditionsDeVente';
import MentionsLegales from './pages/MentionsLegales';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/mentions-legales" element={<MentionsLegales />} />
      <Route path="/conditions-de-vente" element={<ConditionsDeVente />} />
    </Routes>
  );
}
