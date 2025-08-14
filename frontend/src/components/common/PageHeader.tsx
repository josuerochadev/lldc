// src/components/common/PageHeader.tsx
import { Link } from 'react-router-dom';

import SectionTitle from '@/components/common/SectionTitle';

type Props = { title: string; backTo?: string };

export default function PageHeader({ title, backTo = '/' }: Props) {
  return (
    <header className="mb-title-gap">
      <SectionTitle title={title} />
      <nav aria-label="Fil d’Ariane" className="mt-word-gap">
        <Link
          to={backTo}
          className="inline-flex items-center gap-2 underline underline-offset-4 hover:no-underline focus-style"
          aria-label="Revenir à la page d’accueil"
        >
          ← Retour à l’accueil
        </Link>
      </nav>
    </header>
  );
}