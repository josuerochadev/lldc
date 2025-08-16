// src/components/common/PageHeader.tsx
import { Link } from 'react-router-dom';

import SectionTitle from '@/components/common/SectionTitle';

type Props = { title: string; backTo?: string };

export default function PageHeader({ title, backTo = '/' }: Props) {
  return (
    <header className="mb-title-gap">
      <SectionTitle title={title} />
      <h2 className="text-title-lg font-extrabold">
        <span className="font-thin">LA</span>
        LUNETTERIE
        <span className="font-thin">DU</span>
        COIN
      </h2>
      <nav aria-label="Fil d’Ariane" className="mt-word-gap">
        <Link
          to={backTo}
          className="focus-style inline-flex items-center gap-2 underline underline-offset-4 hover:no-underline"
          aria-label="Revenir à la page d’accueil"
        >
          ← Retour à l’accueil
        </Link>
      </nav>
    </header>
  );
}
