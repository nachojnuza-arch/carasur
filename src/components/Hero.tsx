import React from 'react';
import type { SiteContent, Project } from '../types';
import { FeaturedShowcase } from './FeaturedShowcase';

interface HeroProps {
  content: SiteContent;
  onNavigateSection: (section: 'editorial' | 'audiovisual' | 'pensar-la-epoca' | 'contacto') => void;
  onOpenEditorialModal?: (project: Project) => void;
  onOpenAudiovisualModal?: (project: Project) => void;
}

export const Hero: React.FC<HeroProps> = ({
  content,
  onNavigateSection,
  onOpenEditorialModal,
  onOpenAudiovisualModal,
}) => {
  return (
    <section className="space-y-12 sm:space-y-16">
      {/* Top Header Strip */}
      <div className="border-b border-[#e5e4e0] pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[10px] font-mono uppercase tracking-[0.08em] text-[#8c8a85] mb-4">
          <span>CARA SUR · PRODUCTORA INDEPENDIENTE</span>
          <span>EDITORIAL & AUDIOVISUAL</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8">
            <h1 className="font-serif italic text-4xl sm:text-6xl lg:text-7xl font-normal text-[#111111] leading-[1.08] text-balance">
              {content.hero.title}
            </h1>
            <p className="font-serif italic text-xl sm:text-2xl text-[#555452] mt-3">
              {content.hero.subtitle}
            </p>
          </div>

          <div className="lg:col-span-4">
            <p className="text-xs sm:text-[13px] text-[#555452] font-sans leading-relaxed border-l border-[#e5e4e0] pl-4">
              {content.hero.description}
            </p>
          </div>
        </div>

        {/* Informative Stats Ribbon */}
        <div className="mt-8 pt-4 border-t border-[#e5e4e0] grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono text-[#555452]">
          <div className="p-3 bg-white/60 rounded-xl border border-[#e5e4e0]/60">
            <span className="text-[10px] text-[#8c8a85] uppercase block">Área 01</span>
            <span className="font-semibold text-[#111111] text-sm">Producción Editorial</span>
          </div>
          <div className="p-3 bg-white/60 rounded-xl border border-[#e5e4e0]/60">
            <span className="text-[10px] text-[#8c8a85] uppercase block">Área 02</span>
            <span className="font-semibold text-[#111111] text-sm">Creación Audiovisual</span>
          </div>
          <div className="p-3 bg-white/60 rounded-xl border border-[#e5e4e0]/60">
            <span className="text-[10px] text-[#8c8a85] uppercase block">Ciclo Especial</span>
            <span className="font-semibold text-[#111111] text-sm">Pensar la Época</span>
          </div>
          <div className="p-3 bg-white/60 rounded-xl border border-[#e5e4e0]/60">
            <span className="text-[10px] text-[#8c8a85] uppercase block">Enfoque</span>
            <span className="font-semibold text-[#111111] text-sm">Pensamiento Crítico</span>
          </div>
        </div>
      </div>

      {/* Featured Section: Latest Publication / Latest Audiovisual Spotlight */}
      <FeaturedShowcase
        content={content}
        onOpenEditorialModal={onOpenEditorialModal || (() => onNavigateSection('editorial'))}
        onOpenAudiovisualModal={onOpenAudiovisualModal || (() => onNavigateSection('audiovisual'))}
        onNavigateSection={onNavigateSection}
      />

      {/* Main Showcase / Visual Feature with Video Logo */}
      <div className="rounded-3xl border border-[#e5e4e0] bg-[#ffffff] p-6 sm:p-10 shadow-sm">
        <div className="flex items-center justify-between pb-3 mb-6 border-b border-[#e5e4e0] text-[10px] font-mono uppercase tracking-[0.08em] text-[#8c8a85]">
          <span className="font-semibold text-[#111111]">IDENTIDAD & PROYECTOS</span>
          <span>BUENOS AIRES · ARCHIVO & DISTRIBUCIÓN</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Video Container (Softened rounded-2xl) */}
          <div className="lg:col-span-7 bg-[#0d0d0d] border border-[#e5e4e0] rounded-2xl relative overflow-hidden aspect-[16/9] flex items-center justify-center shadow-inner">
            <video
              src="/cara-sur.mp4"
              poster="/logo-poster.jpg"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-contain"
            />
            {/* Subtle grain */}
            <div className="absolute inset-0 opacity-10 film-grain pointer-events-none" />
            <div className="absolute bottom-3 right-4 font-mono text-[9px] uppercase tracking-wider text-white/50 pointer-events-none">
              CARA SUR
            </div>
          </div>

          {/* Descriptive Area */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="px-3 py-1 inline-flex items-center bg-[#f9f9f8] border border-[#e5e4e0] text-[#111111] text-[10px] font-mono uppercase tracking-[0.08em] font-semibold rounded-full">
                  EDITORIAL
                </span>
                <span className="px-3 py-1 inline-flex items-center bg-[#f9f9f8] border border-[#e5e4e0] text-[#111111] text-[10px] font-mono uppercase tracking-[0.08em] font-semibold rounded-full">
                  AUDIOVISUAL
                </span>
                <span className="px-3 py-1 inline-flex items-center bg-[#f9f9f8] border border-[#e5e4e0] text-[#555452] text-[10px] font-mono uppercase tracking-[0.08em] rounded-full">
                  DOCUMENTAL & ENSAYO
                </span>
              </div>

              <h2 className="font-serif italic text-3xl sm:text-4xl text-[#111111] font-normal leading-tight">
                Una mirada propia sobre la época
              </h2>
              <p className="text-xs sm:text-[13px] text-[#555452] font-sans leading-relaxed mt-4">
                En Cara Sur articulamos el lenguaje cinematográfico y la palabra impresa para explorar las preguntas culturales, políticas y estéticas que nos atraviesan. Nuestras producciones nacen del diálogo constante entre la investigación sensible y el rigor formal.
              </p>
            </div>

            <div className="border-t border-[#e5e4e0] pt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigateSection('editorial')}
                className="px-5 py-2.5 text-xs font-mono uppercase tracking-[0.08em] border border-[#111111] text-[#111111] rounded-full hover:bg-[#111111] hover:text-[#f9f9f8] transition-colors"
              >
                Explorar Editorial →
              </button>
              <button
                onClick={() => onNavigateSection('audiovisual')}
                className="px-5 py-2.5 text-xs font-mono uppercase tracking-[0.08em] bg-[#111111] text-[#f9f9f8] border border-[#111111] rounded-full hover:bg-[#333230] transition-colors shadow-sm"
              >
                Catálogo Audiovisual →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Quote */}
      <div className="py-10 border-t border-b border-[#e5e4e0] my-8">
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <blockquote className="font-serif italic text-2xl sm:text-3xl text-[#111111] leading-relaxed">
            «Pensar, producir y narrar desde el sur: donde la imagen y el texto se encuentran para interpelar el presente.»
          </blockquote>
          <cite className="block text-xs font-mono uppercase tracking-[0.08em] text-[#8c8a85] not-italic">
            — Cara Sur Productora
          </cite>
        </div>
      </div>
    </section>
  );
};
