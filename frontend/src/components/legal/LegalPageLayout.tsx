import type { ReactNode } from 'react';

import Layout from '@/components/common/Layout';
import SectionContainer from '@/components/common/SectionContainer';
import PageHeader from '@/components/common/PageHeader';
import { Seo } from '@/seo/Seo';

type LegalPageLayoutProps = {
  title: string;
  seoDescription: string;
  canonicalPath: string;
  children: ReactNode;
  lastUpdated?: string;
};

/**
 * Layout réutilisable pour les pages légales (Mentions légales, CGV, etc.)
 * 
 * Centralise la structure commune des pages légales avec :
 * - SEO optimisé
 * - Header avec navigation de retour
 * - Structure d'article accessible
 * - Date de mise à jour optionnelle
 * 
 * @component
 * @param {LegalPageLayoutProps} props - Les propriétés du composant
 * @returns {JSX.Element} Layout complet pour page légale
 */
export default function LegalPageLayout({
  title,
  seoDescription,
  canonicalPath,
  children,
  lastUpdated,
}: LegalPageLayoutProps) {
  return (
    <>
      <Seo
        title={title}
        description={seoDescription}
        canonicalPath={canonicalPath}
      />
      <div className="relative z-base">
        <Layout>
          <SectionContainer className="pt-section-md pb-section">
            <PageHeader title={title} />
            <article className="max-w-content space-y-section-gap">
              {lastUpdated && (
                <p className="text-sm text-gray-600 border-l-4 border-gray-300 pl-4">
                  <strong>Dernière mise à jour :</strong> {lastUpdated}
                </p>
              )}
              {children}
            </article>
          </SectionContainer>
        </Layout>
      </div>
    </>
  );
}