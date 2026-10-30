import React, { useState, useEffect } from 'react';
import type { SiteContent, Project } from '../types';
import { ShareInstagramButton } from './ShareInstagramModal';

interface EditorialSectionProps {
  content: SiteContent;
  onOpenContact: () => void;
  initialSelectedProject?: Project | null;
  onClearInitialSelectedProject?: () => void;
}

// Formatted Article Renderer: preserves paragraphs, subheadings, blockquotes, indentations
function FormattedArticleContent({ text }: { text: string }) {
  if (!text || !text.trim()) {
    return (
      <div className="py-8 text-center bg-[#f9f9f8] rounded-2xl border border-[#e5e4e0] p-6 space-y-2">
        <p className="font-serif italic text-lg text-[#555452]">
          No hay texto redactado para esta publicación.
        </p>
        <p className="text-xs font-mono uppercase text-[#8c8a85]">
          Podés redactar el texto o importarlo desde un archivo en el administrador local.
        </p>
      </div>
    );
  }

  // Split into paragraphs by double newline (or more)
  const paragraphs = text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className="space-y-6 font-serif text-[#111111] leading-relaxed">
      {paragraphs.map((para, idx) => {
        // Detect section headers: starts with # or is short uppercase without dot
        const isHeader =
          para.startsWith('#') ||
          (para.length < 80 && !para.includes('.') && para === para.toUpperCase() && /[A-Z]/.test(para)) ||
          /^([0-9]+\.|Capítulo|Sección|Parte|I\.|II\.|III\.|IV\.|V\.)\s+/i.test(para);

        // Detect quotes: starts with > or starts/ends with quotes
        const isQuote =
          para.startsWith('>') ||
          para.startsWith('«') ||
          (para.startsWith('"') && para.endsWith('"')) ||
          (para.startsWith('“') && para.endsWith('”'));

        if (isHeader) {
          const headerClean = para.replace(/^#+\s*/, '');
          return (
            <h4
              key={idx}
              className="font-serif italic text-xl sm:text-2xl text-[#111111] font-semibold pt-4 pb-1 border-b border-[#e5e4e0]"
            >
              {headerClean}
            </h4>
          );
        }

        if (isQuote) {
          const quoteClean = para.replace(/^[>«"“\s]+|[»"”\s]+$/g, '');
          return (
            <blockquote
              key={idx}
              className="border-l-2 border-[#111111] pl-4 sm:pl-6 my-4 italic font-serif text-lg sm:text-xl text-[#333230] leading-relaxed bg-[#f9f9f8] py-3 rounded-r-xl"
            >
              «{quoteClean}»
            </blockquote>
          );
        }

        // Regular paragraph: preserve internal single linebreaks
        return (
          <p
            key={idx}
            className="text-base sm:text-[17px] leading-[1.8] text-[#222221] whitespace-pre-line tracking-[0.01em]"
          >
            {para}
          </p>
        );
      })}
    </div>
  );
}

export const EditorialSection: React.FC<EditorialSectionProps> = ({
  content,
  onOpenContact,
  initialSelectedProject,
  onClearInitialSelectedProject,
}) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(initialSelectedProject || null);
  const [copySuccess, setCopySuccess] = useState(false);

  const editorial = content.editorial;

  useEffect(() => {
    if (initialSelectedProject) {
      setSelectedProject(initialSelectedProject);
      if (onClearInitialSelectedProject) {
        onClearInitialSelectedProject();
      }
    }
  }, [initialSelectedProject, onClearInitialSelectedProject]);

  const handleCopyText = (text: string) => {
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(text).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2500);
    });
  };

  return (
    <section className="space-y-12">
      {/* Header */}
      <div className="border-b border-[#e5e4e0] pb-6">
        <div className="text-[11px] font-mono uppercase tracking-[0.08em] text-[#8c8a85] mb-2">
          ÁREA EDITORIAL · PUBLICACIONES, ENSAYOS & NOTAS
        </div>
        <h2 className="font-serif italic text-3xl sm:text-5xl text-[#111111] font-normal leading-tight">
          {editorial.title}
        </h2>
        {editorial.subtitle && (
          <p className="font-serif italic text-lg sm:text-xl text-[#555452] mt-1">
            {editorial.subtitle}
          </p>
        )}
        <p className="mt-3 text-sm text-[#555452] font-sans max-w-3xl leading-relaxed">
          {editorial.description}
        </p>
      </div>

      {/* Projects & Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {editorial.projects.map((proj) => (
          <article
            key={proj.id}
            onClick={() => setSelectedProject(proj)}
            className="rounded-2xl border border-[#e5e4e0] bg-[#ffffff] p-6 sm:p-8 flex flex-col justify-between hover:border-[#111111] transition-all hover:shadow-md cursor-pointer group"
          >
            <div>
              {/* Top Tag strip */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#e5e4e0] text-[10px] font-mono uppercase tracking-[0.08em] text-[#8c8a85]">
                <div className="flex items-center gap-2">
                  {proj.featured && (
                    <span className="px-2 py-0.5 rounded-full bg-red-600 text-white font-bold text-[9px]">
                      ★ DESTACADO
                    </span>
                  )}
                  <span className="font-semibold text-[#111111]">{proj.category || 'Publicación'}</span>
                </div>
                <span>{proj.year || 'Edición'}</span>
              </div>

              {/* Cover Media: Uploaded Image OR Book Spine */}
              {proj.image ? (
                <div className="mb-6 rounded-xl overflow-hidden border border-[#e5e4e0] aspect-[16/9] relative bg-black/5">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                    loading="lazy"
                  />
                  {proj.fullText && (
                    <div className="absolute top-2 right-2 bg-black/80 text-white text-[9px] font-mono uppercase tracking-wider px-2 py-1 rounded-md backdrop-blur-xs flex items-center gap-1">
                      <span>Lectura disponible</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-[#191919] text-[#f9f9f8] p-6 mb-6 rounded-xl border border-[#111111] relative overflow-hidden aspect-[16/7] flex flex-col justify-between shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-[#8c8a85]">
                      CARA SUR EDITORIAL
                    </span>
                    {proj.fullText && (
                      <span className="text-[8px] font-mono uppercase bg-white/20 text-white px-2 py-0.5 rounded">
                        LECTURA DISPONIBLE
                      </span>
                    )}
                  </div>
                  <div>
                    <h4 className="font-serif italic text-2xl text-white leading-tight">
                      {proj.title}
                    </h4>
                  </div>
                  <div className="text-[10px] font-mono text-[#dadad9] uppercase">
                    {proj.author ? `Por ${proj.author} · ` : ''}{proj.category}
                  </div>
                </div>
              )}

              <h3 className="font-serif italic text-2xl text-[#111111] font-normal mb-1 group-hover:text-black transition-colors">
                {proj.title}
              </h3>

              {proj.author && (
                <p className="text-xs text-[#8c8a85] font-mono uppercase mb-2">
                  Autoría: <span className="text-[#111111]">{proj.author}</span>
                </p>
              )}

              <p className="text-xs sm:text-[13px] text-[#555452] font-sans leading-relaxed mb-4 line-clamp-3">
                {proj.description}
              </p>

              {/* Tags */}
              {proj.tags && proj.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {proj.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-0.5 text-[9px] font-mono uppercase bg-[#f9f9f8] border border-[#e5e4e0] text-[#555452] rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-[#e5e4e0] flex items-center justify-between text-xs font-mono">
              <span className="text-[#111111] uppercase tracking-wider group-hover:underline text-[11px] font-medium flex items-center gap-1.5">
                <span>Leer Nota Completa</span>
                <span>→</span>
              </span>

              <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                <ShareInstagramButton
                  title={proj.title}
                  category={proj.category}
                  type="editorial"
                  author={proj.author}
                  instagramHandle={content.contacto.instagram}
                  instagramUrl={proj.instagramUrl}
                  imageUrl={proj.image}
                />
                <button
                  onClick={onOpenContact}
                  className="px-4 py-1.5 text-[10px] uppercase tracking-wider bg-[#111111] text-[#f9f9f8] rounded-full hover:bg-[#333230] transition-colors"
                >
                  Consultar
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {editorial.projects.length === 0 && (
        <div className="p-12 rounded-2xl border border-[#e5e4e0] bg-white text-center space-y-2">
          <p className="font-serif italic text-xl text-[#555452]">
            No hay publicaciones registradas actualmente.
          </p>
          <p className="text-xs font-mono uppercase text-[#8c8a85]">
            Podés agregar nuevas publicaciones y notas escritas desde el panel de administración local.
          </p>
        </div>
      )}

      {/* Full Modal Detail: In-page Clean Reading Experience */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-xs overflow-y-auto"
          style={{ backgroundColor: 'rgba(17, 17, 17, 0.88)' }}
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="w-full max-w-3xl bg-white rounded-3xl border border-[#111111] p-6 sm:p-10 space-y-6 text-[#111111] shadow-2xl my-auto max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header bar */}
            <div className="flex items-center justify-between pb-3 border-b border-[#e5e4e0] text-[10px] font-mono uppercase text-[#8c8a85]">
              <span>CARA SUR · LECTURA EDITORIAL</span>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-xs text-[#111111] hover:opacity-60 uppercase font-mono px-3 py-1 rounded-full border border-[#e5e4e0]"
              >
                ✕ Cerrar Lectura
              </button>
            </div>

            {/* Title & Metadata */}
            <div>
              <div className="text-xs font-mono text-[#8c8a85] uppercase tracking-wider mb-2">
                {selectedProject.category} · {selectedProject.year}
              </div>
              <h3 className="font-serif italic text-3xl sm:text-4xl text-[#111111] leading-tight">
                {selectedProject.title}
              </h3>
              {selectedProject.subtitle && (
                <p className="font-serif italic text-lg sm:text-xl text-[#555452] mt-1">
                  {selectedProject.subtitle}
                </p>
              )}
              {selectedProject.author && (
                <p className="text-xs font-mono uppercase text-[#111111] mt-2">
                  Por <span className="font-bold">{selectedProject.author}</span>
                </p>
              )}
            </div>

            {/* Featured Image if present */}
            {selectedProject.image && (
              <div className="rounded-2xl overflow-hidden border border-[#e5e4e0] max-h-[360px] w-full">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Synopsis / Copete */}
            {selectedProject.description && (
              <div className="border-t border-b border-[#e5e4e0] py-4 bg-[#fcfcfb] px-4 rounded-xl">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#8c8a85] block mb-1">
                  SÍNTESIS EDITORIAL
                </span>
                <p className="text-sm font-sans text-[#555452] leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>
            )}

            {/* Body of the Article */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-[#8c8a85] border-b border-[#e5e4e0] pb-2">
                <span>CUERPO DE LA NOTA · LECTURA COMPLETA</span>
                {selectedProject.fullText && (
                  <button
                    onClick={() => handleCopyText(selectedProject.fullText || '')}
                    className="text-[10px] font-mono uppercase text-[#555452] hover:text-[#111111] border border-[#e5e4e0] px-3 py-1 rounded-full hover:bg-[#f0f0ee] transition-colors"
                  >
                    {copySuccess ? 'Texto Copiado' : 'Copiar Texto'}
                  </button>
                )}
              </div>

              <FormattedArticleContent text={selectedProject.fullText || selectedProject.description} />
            </div>

            {/* Tags */}
            {selectedProject.tags && selectedProject.tags.length > 0 && (
              <div className="pt-2 flex flex-wrap gap-1.5">
                {selectedProject.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-[10px] font-mono uppercase bg-[#f9f9f8] border border-[#e5e4e0] text-[#555452] rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Actions Footer */}
            <div className="pt-6 border-t border-[#e5e4e0] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setSelectedProject(null);
                    onOpenContact();
                  }}
                  className="px-6 py-2.5 text-xs font-mono uppercase tracking-wider bg-[#111111] text-[#f9f9f8] rounded-full hover:bg-[#333230]"
                >
                  Consultar Ejemplar / Derechos
                </button>
                <ShareInstagramButton
                  title={selectedProject.title}
                  category={selectedProject.category}
                  type="editorial"
                  author={selectedProject.author}
                  instagramHandle={content.contacto.instagram}
                  instagramUrl={selectedProject.instagramUrl}
                  imageUrl={selectedProject.image}
                />
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-xs font-mono uppercase text-[#8c8a85] hover:text-[#111111]"
              >
                Cerrar Lectura
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
