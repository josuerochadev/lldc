// src/pages/NotFound.tsx
import Background from '@/components/common/Background';
import Layout from '@/components/common/Layout';
import SectionContainer from '@/components/common/SectionContainer';
import PageHeader from '@/components/common/PageHeader';

export default function NotFound() {
  return (
    <>
      <Background />
      <div className="relative z-base">
        <Layout>
          <SectionContainer className="pb-section pt-section-sm">
            {/* En-tête avec titre et lien retour */}
            <PageHeader title="Page non trouvée" />

            <p className="mx-auto mt-title-gap max-w-content text-text-base">
              Oups&nbsp;! La page que vous recherchez n’existe pas ou a été déplacée.
            </p>
          </SectionContainer>
        </Layout>
      </div>
    </>
  );
}
