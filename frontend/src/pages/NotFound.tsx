// src/pages/NotFound.tsx
import Background from '@/components/common/Background';
import Layout from '@/components/common/Layout';
import SectionContainer from '@/components/common/SectionContainer';
import PageHeader from '@/components/common/PageHeader';

export default function NotFound() {
  return (
    <>
      <Background />
      <div className="relative z-10">
        <Layout>
          <SectionContainer className="pt-section-sm pb-section">
            {/* En-tête avec titre et lien retour */}
            <PageHeader title="Page non trouvée" />

            <p className="mt-title-gap mx-auto max-w-content text-text-base">
              Oups&nbsp;! La page que vous recherchez n’existe pas ou a été déplacée.
            </p>
          </SectionContainer>
        </Layout>
      </div>
    </>
  );
}