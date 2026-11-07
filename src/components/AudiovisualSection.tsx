import React, { useState } from 'react';
import type { SiteContent, Project } from '../types';
import { getYouTubeEmbedUrl, getYouTubeThumbnail } from '../utils/youtube';
import { ShareInstagramButton } from './ShareInstagramModal';
import { LikeButton } from './LikeButton';

interface AudiovisualSectionProps {
  content: SiteContent;
  onOpenContact: () => void;
  initialSelectedFilm?: Project | null;
  onClearInitialSelectedFilm?: () => void;
}

export const AudiovisualSection: React.FC<AudiovisualSectionProps> = ({
  content,
  onOpenContact,
  initialSelectedFilm,
  onClearInitialSelectedFilm,
}) => {
  const [selectedFilm, setSelectedFilm] = useState<Project | null>(initialSelectedFilm || null);
  const av = content.audiovisual;

  React.useEffect(() => {
    if (initialSelectedFilm) {
      setSelectedFilm(initialSelectedFilm);
      if (onClearInitialSelectedFilm) {
        onClearInitialSelectedFilm();
      }
    }
  }, [initialSelectedFilm, onClearInitialSelectedFilm]);

  return (
    <section className="space-y-12">
      {/* Header */}
      <div className="border-b border-[#e5e4e0] pb-6">
        <div className="text-[11px] font-mono uppercase tracking-[0.08em] text-[#8c8a85] mb-2">
          ÁREA AUDIOVISUAL · CINE, DOCUMENTALES & OBRAS
        </div>
        <h2 className="font-serif italic text-3xl sm:text-5xl text-[#111111] font-normal leading-tight">
          {av.title}
        </h2>
        {av.subtitle && (
          <p className="font-serif italic text-lg sm:text-xl text-[#555452] mt-1">
            {av.subtitle}
          </p>
        )}
        <p className="mt-3 text-sm text-[#555452] font-sans max-w-3xl leading-relaxed">
          {av.description}
        </p>
      </div>

      {/* Grid of audiovisual projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {av.projects.map((proj) => {
          const ytThumb = proj.youtubeUrl ? getYouTubeThumbnail(proj.youtubeUrl) : null;
          const displayImage = proj.image || ytThumb;

          return (
            <article
              key={proj.id}
              className="rounded-2xl border border-[#e5e4e0] bg-[#ffffff] p-6 sm:p-8 flex flex-col justify-between hover:border-[#111111] transition-all hover:shadow-md group cursor-pointer"
              onClick={() => setSelectedFilm(proj)}
            >
              <div>
                {/* Top info */}
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#e5e4e0] text-[10px] font-mono uppercase tracking-[0.08em] text-[#8c8a85]">
                  <div className="flex items-center gap-2">
                    {proj.featured && (
                      <span className="px-2 py-0.5 rounded-full bg-red-600 text-white font-bold text-[9px]">
                        ★ DESTACADO
                      </span>
                    )}
                    <span className="font-semibold text-[#111111]">{proj.category || 'Audiovisual'}</span>
                  </div>
                  <span>{proj.year || '2025'}</span>
                </div>

                {/* Media Preview: Image / YouTube Thumbnail OR Graphic Box */}
                {displayImage ? (
                  <div className="rounded-xl overflow-hidden mb-5 aspect-[16/9] relative bg-black border border-[#e5e4e0] group-hover:border-[#111111] transition-colors">
                    <img
                      src={displayImage}
                      alt={proj.title}
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300 opacity-90 group-hover:opacity-100"
                      loading="lazy"
                    />
                    {proj.youtubeUrl && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-colors">
                        <div className="w-12 h-12 rounded-full bg-red-600/90 text-white flex items-center justify-center pl-1 shadow-lg group-hover:scale-110 transition-transform">
                          <span className="text-xl">▶</span>
                        </div>
                      </div>
                    )}
                    {proj.youtubeUrl && (
                      <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-white text-[9px] font-mono uppercase tracking-wider backdrop-blur-xs">
                        YouTube
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="bg-[#121212] border border-[#222222] rounded-xl mb-5 aspect-[16/9] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden shadow-sm">
                    <div className="absolute inset-0 opacity-20 film-grain pointer-events-none" />
                    <span className="text-[10px] font-mono text-[#8c8a85] uppercase tracking-widest block mb-1">
                      CARA SUR PRODUCCIÓN
                    </span>
                    <h4 className="font-serif italic text-2xl sm:text-3xl text-white group-hover:scale-[1.02] transition-transform">
                      {proj.title}
                    </h4>
                    <span className="text-[9px] font-mono text-white/50 uppercase tracking-widest mt-2">
                      {proj.category}
                    </span>
                  </div>
                )}

                <h3 className="font-serif italic text-2xl text-[#111111] font-normal mb-2">
                  {proj.title}
                </h3>

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

              {/* Bottom ledger */}
              <div className="pt-4 border-t border-[#e5e4e0] flex items-center justify-between text-xs font-mono">
                <span className="text-[#111111] uppercase tracking-wider text-[11px] group-hover:underline font-medium">
                  {proj.youtubeUrl ? '▶ Ver Video / Ficha →' : 'Ver Ficha Completa →'}
                </span>
                <div className="flex flex-wrap items-center gap-2" onClick={(e) => e.stopPropagation()}>
                  <LikeButton contentKey={`audiovisual:${proj.id}`} />
                  <ShareInstagramButton
                    title={proj.title}
                    category={proj.category}
                    type="audiovisual"
                    instagramHandle={content.contacto.instagram}
                    instagramUrl={proj.instagramUrl}
                    imageUrl={proj.image || (proj.youtubeUrl ? getYouTubeThumbnail(proj.youtubeUrl) || undefined : undefined)}
                  />
                  <button
                    type="button"
                    onClick={() => onOpenContact()}
                    className="px-4 py-1.5 text-[10px] uppercase tracking-wider bg-[#111111] text-[#f9f9f8] rounded-full hover:bg-[#333230] transition-colors"
                  >
                    Solicitar Copia
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {av.projects.length === 0 && (
        <div className="p-12 rounded-2xl border border-[#e5e4e0] bg-white text-center space-y-2">
          <p className="font-serif italic text-xl text-[#555452]">
            No hay obras registradas actualmente.
          </p>
          <p className="text-xs font-mono uppercase text-[#8c8a85]">
            Podés agregar nuevas obras y videos de YouTube desde el panel de administración local.
          </p>
        </div>
      )}

      {/* Film Detail Modal with Embedded YouTube Player */}
      {selectedFilm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-xs overflow-y-auto"
          style={{ backgroundColor: 'rgba(17, 17, 17, 0.88)' }}
          onClick={() => setSelectedFilm(null)}
        >
          <div
            className="w-full max-w-3xl bg-white rounded-3xl border border-[#111111] p-6 sm:p-8 space-y-6 text-[#111111] shadow-2xl my-auto max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#e5e4e0] text-[10px] font-mono uppercase text-[#8c8a85]">
              <span>CARA SUR · DOSSIER & REPRODUCTOR AUDIOVISUAL</span>
              <button
                onClick={() => setSelectedFilm(null)}
                className="text-xs text-[#111111] hover:opacity-60 uppercase font-mono px-3 py-1 rounded-full border border-[#e5e4e0]"
              >
                ✕ Cerrar
              </button>
            </div>

            {/* Embedded YouTube Player if YouTube URL exists */}
            {selectedFilm.youtubeUrl && getYouTubeEmbedUrl(selectedFilm.youtubeUrl) ? (
              <div className="rounded-2xl overflow-hidden aspect-[16/9] bg-black border border-[#111111] shadow-lg">
                <iframe
                  src={getYouTubeEmbedUrl(selectedFilm.youtubeUrl)!}
                  title={selectedFilm.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>
            ) : selectedFilm.image ? (
              <div className="rounded-2xl overflow-hidden aspect-[16/9] bg-black border border-[#111111]">
                <img
                  src={selectedFilm.image}
                  alt={selectedFilm.title}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="bg-black p-8 text-center text-white rounded-2xl border border-[#111111]">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#8c8a85] block mb-2">
                  FICHA DE PRODUCCIÓN
                </span>
                <h3 className="font-serif italic text-3xl sm:text-4xl text-white">
                  {selectedFilm.title}
                </h3>
                <p className="text-xs font-mono text-white/60 mt-2 uppercase">
                  {selectedFilm.category} · {selectedFilm.year}
                </p>
              </div>
            )}

            {/* Title & Metadata */}
            <div>
              <div className="text-xs font-mono text-[#8c8a85] uppercase tracking-wider mb-1">
                {selectedFilm.category} · {selectedFilm.year}
              </div>
              <h3 className="font-serif italic text-3xl text-[#111111]">
                {selectedFilm.title}
              </h3>
            </div>

            <p className="text-sm text-[#555452] font-sans leading-relaxed">
              {selectedFilm.description}
            </p>

            {selectedFilm.tags && selectedFilm.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-2">
                {selectedFilm.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-[10px] font-mono uppercase bg-[#f9f9f8] border border-[#e5e4e0] text-[#555452] rounded-full"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}

            <div className="pt-4 border-t border-[#e5e4e0] flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => {
                    setSelectedFilm(null);
                    onOpenContact();
                  }}
                  className="px-6 py-2.5 text-xs font-mono uppercase tracking-wider bg-[#111111] text-[#f9f9f8] rounded-full hover:bg-[#333230]"
                >
                  Solicitar Copia / Derechos de Exhibición
                </button>
                <ShareInstagramButton
                  title={selectedFilm.title}
                  category={selectedFilm.category}
                  type="audiovisual"
                  instagramHandle={content.contacto.instagram}
                  instagramUrl={selectedFilm.instagramUrl}
                  imageUrl={selectedFilm.image || (selectedFilm.youtubeUrl ? getYouTubeThumbnail(selectedFilm.youtubeUrl) || undefined : undefined)}
                />
                <LikeButton contentKey={`audiovisual:${selectedFilm.id}`} />
              </div>
              <button
                onClick={() => setSelectedFilm(null)}
                className="text-xs font-mono uppercase text-[#8c8a85] hover:text-[#111111]"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
