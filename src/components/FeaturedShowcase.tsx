import React, { useState } from 'react';
import type { SiteContent, Project } from '../types';
import { getYouTubeThumbnail, getYouTubeEmbedUrl } from '../utils/youtube';
import { ShareInstagramButton } from './ShareInstagramModal';
import { LikeButton } from './LikeButton';

interface FeaturedShowcaseProps {
  content: SiteContent;
  onOpenEditorialModal: (project: Project) => void;
  onOpenAudiovisualModal: (project: Project) => void;
  onNavigateSection: (section: 'editorial' | 'audiovisual' | 'pensar-la-epoca') => void;
}

export const FeaturedShowcase: React.FC<FeaturedShowcaseProps> = ({
  content,
  onOpenEditorialModal,
  onOpenAudiovisualModal,
  onNavigateSection,
}) => {
  const editorialProjects = content.editorial.projects || [];
  const audiovisualProjects = content.audiovisual.projects || [];

  // Determine featured or latest items
  // 1. Check if user marked any specific project with featured: true
  // 2. Otherwise default to the newest (last in array or first)
  const featuredEditorial =
    editorialProjects.find((p) => p.featured) ||
    (editorialProjects.length > 0 ? editorialProjects[editorialProjects.length - 1] : null);

  const featuredAudiovisual =
    audiovisualProjects.find((p) => p.featured) ||
    (audiovisualProjects.length > 0 ? audiovisualProjects[audiovisualProjects.length - 1] : null);

  // Featured episode from the "Pensar la Época" cycle:
  // 1. Check if the admin marked a specific episode with featured: true
  // 2. Otherwise default to the latest episode with video
  const pleEpisodes = content.pensarLaEpoca.episodes || [];
  const featuredPensarLaEpocaEpisode =
    [...pleEpisodes].reverse().find((e) => e.featured) ||
    [...pleEpisodes].reverse().find((e) => e.videoUrl) ||
    null;

  const [activeTab, setActiveTab] = useState<'all' | 'editorial' | 'audiovisual'>('all');
  const [showFeaturedPleVideo, setShowFeaturedPleVideo] = useState(false);

  if (!featuredEditorial && !featuredAudiovisual && !featuredPensarLaEpocaEpisode) {
    return null;
  }

  const igHandle = content.contacto.instagram || '@carasur.lp';

  return (
    <section className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#e5e4e0]">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
          <h3 className="font-mono text-xs font-bold uppercase tracking-[0.12em] text-[#111111]">
            SECCIÓN DESTACADA · NOVEDADES & ÚLTIMOS LANZAMIENTOS
          </h3>
        </div>

        {/* Tab Filter */}
        <div className="flex items-center gap-1 bg-[#f0f0ee] p-1 rounded-full border border-[#e5e4e0] self-start sm:self-auto text-[10px] font-mono uppercase">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1 rounded-full transition-colors ${
              activeTab === 'all'
                ? 'bg-[#111111] text-white shadow-xs'
                : 'text-[#555452] hover:text-[#111111]'
            }`}
          >
            Ver Ambos
          </button>
          <button
            onClick={() => setActiveTab('editorial')}
            className={`px-3 py-1 rounded-full transition-colors ${
              activeTab === 'editorial'
                ? 'bg-[#111111] text-white shadow-xs'
                : 'text-[#555452] hover:text-[#111111]'
            }`}
          >
            Última Publicación
          </button>
          <button
            onClick={() => setActiveTab('audiovisual')}
            className={`px-3 py-1 rounded-full transition-colors ${
              activeTab === 'audiovisual'
                ? 'bg-[#111111] text-white shadow-xs'
                : 'text-[#555452] hover:text-[#111111]'
            }`}
          >
            Último Audiovisual
          </button>
        </div>
      </div>

      {/* Grid of Featured Highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* EDITORIAL SPOTLIGHT */}
        {featuredEditorial && (activeTab === 'all' || activeTab === 'editorial') && (
          <div
            onClick={() => onOpenEditorialModal(featuredEditorial)}
            className="rounded-3xl border border-[#e5e4e0] bg-white p-6 sm:p-8 flex flex-col justify-between hover:border-[#111111] transition-all hover:shadow-lg cursor-pointer group relative overflow-hidden"
          >
            <div>
              {/* Top Banner */}
              <div className="flex items-center justify-between pb-3 mb-5 border-b border-[#e5e4e0] text-[10px] font-mono uppercase tracking-wider text-[#8c8a85]">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-[#111111] text-white font-bold text-[9px]">
                    ★ DESTACADO
                  </span>
                  <span className="text-[#111111] font-semibold">ÁREA EDITORIAL</span>
                </div>
                <span>{featuredEditorial.year || 'Edición actual'}</span>
              </div>

              {/* Cover Image or Graphic Plate */}
              {featuredEditorial.image ? (
                <div className="mb-6 rounded-2xl overflow-hidden border border-[#e5e4e0] aspect-[16/9] relative bg-black/5 group-hover:scale-[1.01] transition-transform">
                  <img
                    src={featuredEditorial.image}
                    alt={featuredEditorial.title}
                    className="w-full h-full object-cover"
                  />
                  {featuredEditorial.fullText && (
                    <div className="absolute top-3 right-3 bg-black/80 text-white text-[9px] font-mono uppercase px-2.5 py-1 rounded-md backdrop-blur-xs flex items-center gap-1">
                      <span>Lectura disponible</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-[#181818] text-white p-6 mb-6 rounded-2xl border border-[#111111] aspect-[16/7] flex flex-col justify-between shadow-sm">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-[#8c8a85]">
                    CARA SUR EDITORIAL · LANZAMIENTO
                  </span>
                  <h4 className="font-serif italic text-2xl sm:text-3xl text-white">
                    {featuredEditorial.title}
                  </h4>
                  <span className="text-[10px] font-mono text-[#dadad9] uppercase">
                    {featuredEditorial.author ? `Por ${featuredEditorial.author} · ` : ''}
                    {featuredEditorial.category || 'Ensayo'}
                  </span>
                </div>
              )}

              {/* Details */}
              <div className="space-y-2 mb-4">
                <div className="text-[10px] font-mono text-[#8c8a85] uppercase tracking-wider">
                  {featuredEditorial.category}
                </div>
                <h3 className="font-serif italic text-2xl sm:text-3xl text-[#111111] font-normal leading-tight group-hover:text-black">
                  {featuredEditorial.title}
                </h3>
                {featuredEditorial.subtitle && (
                  <p className="font-serif italic text-base text-[#555452]">
                    {featuredEditorial.subtitle}
                  </p>
                )}
                {featuredEditorial.author && (
                  <p className="text-xs font-mono uppercase text-[#111111]">
                    Autoría: <span className="font-bold">{featuredEditorial.author}</span>
                  </p>
                )}
                <p className="text-xs sm:text-[13px] text-[#555452] font-sans leading-relaxed pt-1 line-clamp-3">
                  {featuredEditorial.description}
                </p>
              </div>
            </div>

            {/* Bottom Actions + Instagram Share */}
            <div
              className="pt-4 border-t border-[#e5e4e0] flex flex-wrap items-center justify-between gap-3"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => onOpenEditorialModal(featuredEditorial)}
                className="px-5 py-2 text-xs font-mono uppercase tracking-wider bg-[#111111] text-white rounded-full hover:bg-[#333230] transition-colors shadow-xs"
              >
                Leer Publicación →
              </button>

              <div className="flex items-center gap-2">
                <LikeButton contentKey={`editorial:${featuredEditorial.id}`} />
                <ShareInstagramButton
                  title={featuredEditorial.title}
                  category={featuredEditorial.category}
                  type="editorial"
                  author={featuredEditorial.author}
                  instagramHandle={igHandle}
                  instagramUrl={featuredEditorial.instagramUrl}
                  imageUrl={featuredEditorial.image}
                />
              </div>
            </div>
          </div>
        )}

        {/* AUDIOVISUAL SPOTLIGHT */}
        {featuredAudiovisual && (activeTab === 'all' || activeTab === 'audiovisual') && (
          <div
            onClick={() => onOpenAudiovisualModal(featuredAudiovisual)}
            className="rounded-3xl border border-[#e5e4e0] bg-white p-6 sm:p-8 flex flex-col justify-between hover:border-[#111111] transition-all hover:shadow-lg cursor-pointer group relative overflow-hidden"
          >
            <div>
              {/* Top Banner */}
              <div className="flex items-center justify-between pb-3 mb-5 border-b border-[#e5e4e0] text-[10px] font-mono uppercase tracking-wider text-[#8c8a85]">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-red-600 text-white font-bold text-[9px]">
                    ★ DESTACADO
                  </span>
                  <span className="text-[#111111] font-semibold">ÁREA AUDIOVISUAL</span>
                </div>
                <span>{featuredAudiovisual.year || '2025'}</span>
              </div>

              {/* Video Thumbnail or Visual Container */}
              {(() => {
                const ytThumb = featuredAudiovisual.youtubeUrl
                  ? getYouTubeThumbnail(featuredAudiovisual.youtubeUrl)
                  : null;
                const displayImg = featuredAudiovisual.image || ytThumb;

                return displayImg ? (
                  <div className="mb-6 rounded-2xl overflow-hidden border border-[#e5e4e0] aspect-[16/9] relative bg-black group-hover:scale-[1.01] transition-transform">
                    <img
                      src={displayImg}
                      alt={featuredAudiovisual.title}
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                      <div className="w-14 h-14 rounded-full bg-red-600 text-white flex items-center justify-center pl-1 shadow-xl group-hover:scale-110 transition-transform">
                        <span className="text-2xl">▶</span>
                      </div>
                    </div>
                    {featuredAudiovisual.youtubeUrl && (
                      <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded bg-black/80 text-white text-[9px] font-mono uppercase tracking-wider backdrop-blur-xs">
                        YouTube
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="bg-[#111111] text-white p-6 mb-6 rounded-2xl border border-[#222222] aspect-[16/7] flex flex-col justify-between shadow-sm relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20 film-grain pointer-events-none" />
                    <span className="text-[9px] font-mono uppercase tracking-widest text-[#8c8a85]">
                      CARA SUR PRODUCCIÓN · ESTRENO
                    </span>
                    <h4 className="font-serif italic text-2xl sm:text-3xl text-white">
                      {featuredAudiovisual.title}
                    </h4>
                    <span className="text-[10px] font-mono text-white/50 uppercase">
                      {featuredAudiovisual.category || 'Obra Audiovisual'}
                    </span>
                  </div>
                );
              })()}

              {/* Details */}
              <div className="space-y-2 mb-4">
                <div className="text-[10px] font-mono text-[#8c8a85] uppercase tracking-wider">
                  {featuredAudiovisual.category}
                </div>
                <h3 className="font-serif italic text-2xl sm:text-3xl text-[#111111] font-normal leading-tight group-hover:text-black">
                  {featuredAudiovisual.title}
                </h3>
                {featuredAudiovisual.subtitle && (
                  <p className="font-serif italic text-base text-[#555452]">
                    {featuredAudiovisual.subtitle}
                  </p>
                )}
                <p className="text-xs sm:text-[13px] text-[#555452] font-sans leading-relaxed pt-1 line-clamp-3">
                  {featuredAudiovisual.description}
                </p>
              </div>
            </div>

            {/* Bottom Actions + Instagram Share */}
            <div
              className="pt-4 border-t border-[#e5e4e0] flex flex-wrap items-center justify-between gap-3"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => onOpenAudiovisualModal(featuredAudiovisual)}
                className="px-5 py-2 text-xs font-mono uppercase tracking-wider bg-[#111111] text-white rounded-full hover:bg-[#333230] transition-colors shadow-xs"
              >
                Ver Obra / Video →
              </button>

              <div className="flex items-center gap-2">
                <LikeButton contentKey={`audiovisual:${featuredAudiovisual.id}`} />
                <ShareInstagramButton
                  title={featuredAudiovisual.title}
                  category={featuredAudiovisual.category}
                  type="audiovisual"
                  instagramHandle={igHandle}
                  instagramUrl={featuredAudiovisual.instagramUrl}
                  imageUrl={featuredAudiovisual.image || (featuredAudiovisual.youtubeUrl ? getYouTubeThumbnail(featuredAudiovisual.youtubeUrl) || undefined : undefined)}
                />
              </div>
            </div>
          </div>
        )}

        {/* PENSAR LA ÉPOCA SPOTLIGHT — auto-linked from cycle episodes */}
        {featuredPensarLaEpocaEpisode &&
          (activeTab === 'all' || activeTab === 'audiovisual') && (
            <div
              onClick={() => onNavigateSection('pensar-la-epoca')}
              className="rounded-3xl border border-[#111111] bg-white p-6 sm:p-8 flex flex-col justify-between hover:border-[#111111] transition-all hover:shadow-lg cursor-pointer group relative overflow-hidden"
            >
              <div>
                {/* Top Banner */}
                <div className="flex items-center justify-between pb-3 mb-5 border-b border-[#e5e4e0] text-[10px] font-mono uppercase tracking-wider text-[#8c8a85]">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-red-600 text-white font-bold text-[9px]">
                      ★ DESTACADO
                    </span>
                    <span className="text-[#111111] font-semibold">CICLO · PENSAR LA ÉPOCA</span>
                  </div>
                  <span>{featuredPensarLaEpocaEpisode.year || 'Ciclo actual'}</span>
                </div>

                {/* Portada del video — click para reproducir la entrevista */}
                <div className="mb-6 rounded-2xl overflow-hidden border border-[#e5e4e0] aspect-[16/9] relative bg-[#bbc6da] group-hover:scale-[1.01] transition-transform">
                  {showFeaturedPleVideo &&
                  featuredPensarLaEpocaEpisode.videoUrl &&
                  getYouTubeEmbedUrl(featuredPensarLaEpocaEpisode.videoUrl) ? (
                    <iframe
                      src={getYouTubeEmbedUrl(featuredPensarLaEpocaEpisode.videoUrl)!}
                      title={featuredPensarLaEpocaEpisode.title}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (
                          featuredPensarLaEpocaEpisode.videoUrl &&
                          getYouTubeEmbedUrl(featuredPensarLaEpocaEpisode.videoUrl)
                        ) {
                          setShowFeaturedPleVideo(true);
                        } else {
                          onNavigateSection('pensar-la-epoca');
                        }
                      }}
                      aria-label={`Reproducir ${featuredPensarLaEpocaEpisode.title}`}
                      className="absolute inset-0 w-full h-full cursor-pointer group/cover"
                    >
                      <img
                        src="/pensar-la-epoca-logo.jpeg"
                        alt={featuredPensarLaEpocaEpisode.title}
                        className="w-full h-full object-contain group-hover/cover:scale-[1.02] transition-transform"
                      />
                      {featuredPensarLaEpocaEpisode.videoUrl && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/5 group-hover/cover:bg-transparent transition-colors pointer-events-none">
                          <div className="w-16 h-16 rounded-full bg-red-600/90 text-white flex items-center justify-center pl-1 shadow-xl group-hover/cover:scale-110 transition-transform">
                            <span className="text-2xl">▶</span>
                          </div>
                        </div>
                      )}
                      <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded bg-black/80 text-white text-[10px] font-mono uppercase tracking-wider pointer-events-none">
                        Entrevista
                      </div>
                    </button>
                  )}
                </div>

                {/* Details */}
                <div className="space-y-2 mb-4">
                  <div className="text-[10px] font-mono text-[#8c8a85] uppercase tracking-wider">
                    Ciclo de Entrevistas
                  </div>
                  <h3 className="font-serif italic text-2xl sm:text-3xl text-[#111111] font-normal leading-tight group-hover:text-black">
                    {featuredPensarLaEpocaEpisode.title}
                  </h3>
                  {featuredPensarLaEpocaEpisode.guest && (
                    <p className="text-xs font-mono uppercase text-[#111111]">
                      Invitado/a: <span className="font-bold">{featuredPensarLaEpocaEpisode.guest}</span>
                    </p>
                  )}
                  <p className="text-xs sm:text-[13px] text-[#555452] font-sans leading-relaxed pt-1 line-clamp-3">
                    {featuredPensarLaEpocaEpisode.description}
                  </p>
                </div>
              </div>

              {/* Bottom Actions + Instagram Share */}
              <div
                className="pt-4 border-t border-[#e5e4e0] flex flex-wrap items-center justify-between gap-3"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => onNavigateSection('pensar-la-epoca')}
                  className="px-5 py-2 text-xs font-mono uppercase tracking-wider bg-[#111111] text-white rounded-full hover:bg-[#333230] transition-colors shadow-xs"
                >
                  Ir al Ciclo →
                </button>

                <div className="flex items-center gap-2">
                  <LikeButton contentKey={`ple:${featuredPensarLaEpocaEpisode.id}`} />
                  <ShareInstagramButton
                    title={featuredPensarLaEpocaEpisode.title}
                    category="Ciclo de Entrevistas"
                    type="audiovisual"
                    instagramHandle={igHandle}
                    instagramUrl={undefined}
                    imageUrl={featuredPensarLaEpocaEpisode.image || (featuredPensarLaEpocaEpisode.videoUrl ? getYouTubeThumbnail(featuredPensarLaEpocaEpisode.videoUrl) || undefined : undefined)}
                  />
                </div>
              </div>
            </div>
          )}
      </div>
    </section>
  );
};
