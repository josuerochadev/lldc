// src/pages/NotFound.tsx

import { Link } from 'react-router-dom';

import Background from '@/components/common/Background';
import Layout from '@/components/common/Layout';
import SectionContainer from '@/components/common/SectionContainer';
import SectionTitle from '@/components/common/SectionTitle';

export default function NotFound() {
  return (
    <>
      <Background />
      <div className="relative z-10">
        <Layout>
          <SectionContainer className="py-section text-center">
            <SectionTitle title="Page non trouvée" />

            <div className="mt-title-gap space-y-section-sm">
              <p className="text-text-base max-w-prose mx-auto">
                Oups&nbsp;! La page que vous recherchez n’existe pas ou a été déplacée.
              </p>

              <Link
                to="/"
                className="button-primary inline-flex"
                aria-label="Revenir à la page d’accueil"
              >
                ← Retour à l’accueil
              </Link>
            </div>
          </SectionContainer>
        </Layout>
      </div>
    </>
  );
}