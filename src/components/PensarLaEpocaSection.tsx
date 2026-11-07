import React, { useState } from 'react';
import type { SiteContent, Episode } from '../types';
import { getYouTubeEmbedUrl } from '../utils/youtube';

interface PensarLaEpocaSectionProps {
  content: SiteContent;
  onOpenContact: () => void;
}

export const PensarLaEpocaSection: React.FC<PensarLaEpocaSectionProps> = ({
  content,
  onOpenContact,
}) => {
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);
  const ple = content.pensarLaEpoca;

  return (
    <section className="space-y-12">
      {/* Header */}
      <div className="border-b border-[#e5e4e0] pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[10px] font-mono uppercase tracking-[0.08em] text-[#8c8a85] mb-2">
          <span>CICLO DE ENTREVISTAS & CONVERSACIONES</span>
          <span>CARA SUR PRODUCCIONES</span>
        </div>
        <h2 className="font-serif italic text-3xl sm:text-5xl text-[#111111] font-normal leading-tight">
          {ple.title}
        </h2>
        {ple.subtitle && (
          <p className="font-serif italic text-lg sm:text-xl text-[#555452] mt-1">
            {ple.subtitle}
          </p>
        )}
        <p className="mt-3 text-sm text-[#555452] font-sans max-w-3xl leading-relaxed">
          {ple.description}
        </p>
      </div>

      {/* Featured Video Block: Pensar la Época Logo with softened rounded corners */}
      <div className="rounded-3xl border border-[#111111] bg-[#000000] p-6 sm:p-10 text-white shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Video Player */}
          <div className="lg:col-span-7 bg-[#0a0a0a] border border-[#333333] rounded-2xl overflow-hidden aspect-[16/9] flex items-center justify-center relative shadow-lg">
            <video
              src="/pensar-la-epoca.mp4"
              poster="/pensar-la-epoca-poster.jpg"
              autoPlay
              muted
              loop
              playsInline
              controls
              className="w-full h-full object-contain"
            />
            {/* Film Grain */}
            <div className="absolute inset-0 opacity-15 film-grain pointer-events-none" />
          </div>

          {/* Identity & Concept */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-red-600 rounded-full animate-pulse" />
              <span className="text-[10px] font-mono uppercase tracking-[0.12em] text-[#dadad9]">
                CICLO AUDIOVISUAL EN CURSO
              </span>
            </div>

            <h3 className="font-serif italic text-3xl sm:text-4xl leading-tight">
              Pensar la Época
            </h3>

            <p className="text-xs sm:text-[13px] text-[#dadad9] font-sans leading-relaxed">
              Un espacio de diálogo pausado y exhaustivo en tiempos de inmediatez. A través de entrevistas con referentes del arte, el pensamiento filosófico, la literatura y la política, el ciclo indaga en los dilemas estructurales que configuran nuestra realidad contemporánea.
            </p>

            <div className="pt-2 text-xs font-mono text-[#8c8a85] space-y-1">
              <div>FORMATO: Entrevistas en profundidad</div>
              <div>PRODUCCIÓN: Cara Sur</div>
              <div>DISTRIBUCIÓN: Plataformas digitales & archivo propio</div>
            </div>

            <div className="pt-4">
              <button
                onClick={onOpenContact}
                className="px-5 py-2.5 text-xs font-mono uppercase tracking-wider bg-[#ffffff] text-[#111111] rounded-full hover:bg-[#dadad9] transition-colors shadow-sm"
              >
                Proponer Invitado o Tema →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Episodes List */}
      <div>
        <div className="flex items-center justify-between pb-3 mb-6 border-b border-[#e5e4e0] text-xs font-mono text-[#8c8a85] uppercase">
          <span>Episodios & Conversaciones ({ple.episodes.length})</span>
          <span>Registro de Transmisión</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ple.episodes.map((ep) => (
            <div
              key={ep.id}
              className="rounded-2xl border border-[#e5e4e0] bg-white p-6 space-y-4 hover:border-[#111111] transition-all hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <button
                  type="button"
                  onClick={() => setSelectedEpisode(ep)}
                  className="w-full mb-4 rounded-xl overflow-hidden aspect-[16/9] relative bg-[#bbc6da] border border-[#e5e4e0] group cursor-pointer"
                >
                  <img
                    src="/pensar-la-epoca-logo.jpeg"
                    alt={ep.title}
                    className="w-full h-full object-contain group-hover:scale-[1.02] transition-transform"
                  />
                  {ep.videoUrl && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/5 group-hover:bg-transparent transition-colors pointer-events-none">
                      <div className="w-12 h-12 rounded-full bg-red-600/90 text-white flex items-center justify-center pl-1 shadow-lg group-hover:scale-110 transition-transform">
                        <span className="text-xl">▶</span>
                      </div>
                    </div>
                  )}
                  <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-white text-[9px] font-mono uppercase tracking-wider">
                    {ep.videoUrl ? 'Entrevista' : 'Próximamente'}
                  </div>
                </button>
                <div className="flex items-center justify-between text-[10px] font-mono text-[#8c8a85] uppercase pb-2 border-b border-[#e5e4e0]">
                  <span>{ep.date || 'Ciclo 2025'}</span>
                  <span>Invitado: {ep.guest}</span>
                </div>

                <h4 className="font-serif italic text-2xl text-[#111111] leading-tight mt-3 mb-2">
                  {ep.title}
                </h4>

                <p className="text-xs text-[#555452] font-sans leading-relaxed">
                  {ep.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#e5e4e0] flex items-center justify-between text-xs font-mono">
                <button
                  onClick={() => setSelectedEpisode(ep)}
                  className="text-[#111111] uppercase tracking-wider hover:underline text-[11px]"
                >
                  Detalles del Episodio →
                </button>
                {ep.videoUrl ? (
                  <a
                    href={ep.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-1.5 text-[10px] uppercase tracking-wider bg-[#111111] text-white rounded-full hover:bg-[#333230]"
                  >
                    YouTube ↗
                  </a>
                ) : (
                  <span className="text-[10px] text-[#8c8a85] uppercase px-2.5 py-0.5 bg-[#f9f9f8] rounded-full">
                    Próximamente disponible
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {ple.episodes.length === 0 && (
          <div className="p-12 rounded-2xl border border-[#e5e4e0] bg-white text-center space-y-2">
            <p className="font-serif italic text-xl text-[#555452]">
              No hay episodios registrados actualmente.
            </p>
            <p className="text-xs font-mono uppercase text-[#8c8a85]">
              Podés agregar nuevos episodios desde el panel de administración local.
            </p>
          </div>
        )}
      </div>

      {/* Episode Detail Modal */}
      {selectedEpisode && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-xs"
          style={{ backgroundColor: 'rgba(17, 17, 17, 0.88)' }}
          onClick={() => setSelectedEpisode(null)}
        >
          <div
            className="w-full max-w-2xl bg-white rounded-3xl border border-[#111111] p-6 sm:p-8 space-y-6 text-[#111111] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#e5e4e0] text-[10px] font-mono uppercase text-[#8c8a85]">
              <span>PENSAR LA ÉPOCA · ARCHIVO DE CONVERSACIONES</span>
              <button
                onClick={() => setSelectedEpisode(null)}
                className="text-xs text-[#111111] hover:opacity-60 uppercase font-mono px-2 py-0.5 rounded-full border border-[#e5e4e0]"
              >
                ✕ Cerrar
              </button>
            </div>

            <h3 className="font-serif italic text-3xl text-[#111111] leading-tight">
              {selectedEpisode.title}
            </h3>

            {/* Embedded YouTube video if available */}
            {selectedEpisode.videoUrl && getYouTubeEmbedUrl(selectedEpisode.videoUrl) ? (
              <div className="rounded-2xl overflow-hidden border border-[#111111] bg-black aspect-[16/9] shadow-md">
                <iframe
                  src={getYouTubeEmbedUrl(selectedEpisode.videoUrl)!}
                  title={selectedEpisode.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            ) : null}

            <div className="text-xs font-mono text-[#555452] space-y-1 bg-[#f9f9f8] p-3 rounded-xl border border-[#e5e4e0]">
              <div><strong className="text-[#111111]">Invitado/a:</strong> {selectedEpisode.guest}</div>
              <div><strong className="text-[#111111]">Fecha / Temporada:</strong> {selectedEpisode.date}</div>
              {selectedEpisode.videoUrl && (
                <div><strong className="text-[#111111]">Enlace de visualización:</strong> {selectedEpisode.videoUrl}</div>
              )}
            </div>

            <p className="text-sm text-[#555452] font-sans leading-relaxed">
              {selectedEpisode.description}
            </p>

            <div className="pt-4 border-t border-[#e5e4e0] flex items-center justify-between">
              {selectedEpisode.videoUrl ? (
                <a
                  href={selectedEpisode.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 text-xs font-mono uppercase tracking-wider bg-[#111111] text-[#f9f9f8] rounded-full hover:bg-[#333230]"
                >
                  Ver Episodio Completo ↗
                </a>
              ) : (
                <span className="text-xs font-mono text-[#8c8a85] uppercase">
                  Episodio en etapa de edición
                </span>
              )}
              <button
                onClick={() => setSelectedEpisode(null)}
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
