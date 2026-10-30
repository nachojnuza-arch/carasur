import React, { useState, useEffect } from 'react';
import type { Project } from './types';
import { useContent } from './hooks/useContent';
import { Header, ActiveSection } from './components/Header';
import { Hero } from './components/Hero';
import { EditorialSection } from './components/EditorialSection';
import { AudiovisualSection } from './components/AudiovisualSection';
import { PensarLaEpocaSection } from './components/PensarLaEpocaSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AdminView } from '@admin-view';
import { LegalModal, LegalModalTab } from './components/LegalModal';

export default function App() {
  const {
    content,
    isLocalHost,
    isLocalAvailable,
    reloadContent,
    saveContent,
    uploadFile,
    extractTextFromDocument,
  } = useContent();
  const [activeSection, setActiveSection] = useState<ActiveSection>('inicio');
  const [initialEditorialProject, setInitialEditorialProject] = useState<Project | null>(null);
  const [initialAudiovisualProject, setInitialAudiovisualProject] = useState<Project | null>(null);

  // Legal Modal State (Términos, Privacidad & Cookies, Seguridad, Sitemap)
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalModalTab, setLegalModalTab] = useState<LegalModalTab>('terminos');

  const hasAdminUI = isLocalHost && Boolean(typeof __HAS_ADMIN_UI__ !== 'undefined' && __HAS_ADMIN_UI__);

  // Handle URL hash changes (direct links to sections, admin or legal modals)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase().replace(/^#/, '');

      if (hash === 'admin') {
        if (hasAdminUI) {
          setActiveSection('admin');
        }
      } else if (['editorial', 'audiovisual', 'pensar-la-epoca', 'contacto'].includes(hash)) {
        setActiveSection(hash as ActiveSection);
      } else if (hash === 'terminos') {
        setLegalModalTab('terminos');
        setLegalModalOpen(true);
      } else if (hash === 'privacidad' || hash === 'cookies' || hash === 'seguridad') {
        setLegalModalTab('privacidad-cookies');
        setLegalModalOpen(true);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [hasAdminUI]);

  const handleNavigate = (section: ActiveSection) => {
    setActiveSection(section);
    if (section === 'admin') {
      window.location.hash = 'admin';
    } else {
      if (window.location.hash === '#admin') {
        window.history.pushState(null, '', window.location.pathname);
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenFeaturedEditorial = (proj: Project) => {
    setInitialEditorialProject(proj);
    handleNavigate('editorial');
  };

  const handleOpenFeaturedAudiovisual = (proj: Project) => {
    setInitialAudiovisualProject(proj);
    handleNavigate('audiovisual');
  };

  const handleOpenLegalModal = (tab: LegalModalTab) => {
    setLegalModalTab(tab);
    setLegalModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f9f9f8] text-[#111111] flex flex-col font-sans selection:bg-[#111111] selection:text-[#f9f9f8]">
      {/* Top Header */}
      <Header
        activeSection={activeSection}
        onNavigate={handleNavigate}
        isLocalHost={isLocalHost}
        hasAdminUI={hasAdminUI}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-[1440px] w-full mx-auto px-5 sm:px-8 lg:px-12 py-8 sm:py-12">
        {activeSection === 'inicio' && (
          <Hero
            content={content}
            onNavigateSection={(sec) => handleNavigate(sec)}
            onOpenEditorialModal={handleOpenFeaturedEditorial}
            onOpenAudiovisualModal={handleOpenFeaturedAudiovisual}
          />
        )}

        {activeSection === 'editorial' && (
          <EditorialSection
            content={content}
            onOpenContact={() => handleNavigate('contacto')}
            initialSelectedProject={initialEditorialProject}
            onClearInitialSelectedProject={() => setInitialEditorialProject(null)}
          />
        )}

        {activeSection === 'audiovisual' && (
          <AudiovisualSection
            content={content}
            onOpenContact={() => handleNavigate('contacto')}
            initialSelectedFilm={initialAudiovisualProject}
            onClearInitialSelectedFilm={() => setInitialAudiovisualProject(null)}
          />
        )}

        {activeSection === 'pensar-la-epoca' && (
          <PensarLaEpocaSection
            content={content}
            onOpenContact={() => handleNavigate('contacto')}
          />
        )}

        {activeSection === 'contacto' && (
          <ContactSection content={content} />
        )}

        {activeSection === 'admin' && hasAdminUI && (
          <AdminView
            content={content}
            isLocalHost={isLocalHost}
            isLocalAvailable={isLocalAvailable}
            onSave={saveContent}
            onUploadFile={uploadFile}
            onExtractTextFromDocument={extractTextFromDocument}
            onBackToSite={() => handleNavigate('inicio')}
            onReloadContent={reloadContent}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        content={content}
        isLocalHost={isLocalHost}
        hasAdminUI={hasAdminUI}
        onOpenAdmin={() => handleNavigate('admin')}
        onOpenLegal={handleOpenLegalModal}
      />

      {/* Legal & Policies Modal */}
      <LegalModal
        isOpen={legalModalOpen}
        initialTab={legalModalTab}
        onClose={() => setLegalModalOpen(false)}
        onNavigateSection={(sec) => handleNavigate(sec as ActiveSection)}
      />
    </div>
  );
}
