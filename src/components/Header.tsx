import React from 'react';

export type ActiveSection = 'inicio' | 'editorial' | 'audiovisual' | 'pensar-la-epoca' | 'contacto' | 'admin';

interface HeaderProps {
  activeSection: ActiveSection;
  onNavigate: (section: ActiveSection) => void;
  isLocalHost: boolean;
  hasAdminUI?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeSection,
  onNavigate,
  isLocalHost,
  hasAdminUI = false,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#f9f9f8]/95 backdrop-blur-md border-b border-[#e5e4e0]">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 h-20 flex items-center justify-between gap-8">
        {/* Brand / Logo Top-Left (Natural, fluid & not boxed-in) */}
        <button
          onClick={() => onNavigate('inicio')}
          className="flex items-center gap-3.5 text-left transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#111111] group"
        >
          {/* Authentic Cara Sur Logo - Transparent & Scaled */}
          <div className="flex items-center">
            <img
              src="/logo-full-transparent.png"
              alt="Cara Sur Productora"
              className="h-8 sm:h-9 md:h-10 w-auto object-contain select-none transition-transform duration-200 group-hover:scale-[1.02]"
              loading="eager"
            />
          </div>
          <div className="hidden sm:block border-l border-[#e5e4e0] pl-3 py-0.5">
            <span className="text-[9px] font-mono uppercase tracking-[0.16em] text-[#8c8a85] block leading-snug">
              Editorial &<br />Audiovisual
            </span>
          </div>
        </button>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs uppercase tracking-[0.08em] font-medium text-[#555452]">
          <button
            onClick={() => onNavigate('inicio')}
            className={`whitespace-nowrap transition-colors py-1 relative ${
              activeSection === 'inicio'
                ? 'text-[#111111] font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#111111] after:rounded-full'
                : 'hover:text-[#111111]'
            }`}
          >
            Inicio
          </button>

          <button
            onClick={() => onNavigate('editorial')}
            className={`whitespace-nowrap transition-colors py-1 relative ${
              activeSection === 'editorial'
                ? 'text-[#111111] font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#111111] after:rounded-full'
                : 'hover:text-[#111111]'
            }`}
          >
            Editorial
          </button>

          <button
            onClick={() => onNavigate('audiovisual')}
            className={`whitespace-nowrap transition-colors py-1 relative ${
              activeSection === 'audiovisual'
                ? 'text-[#111111] font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#111111] after:rounded-full'
                : 'hover:text-[#111111]'
            }`}
          >
            Audiovisual
          </button>

          <button
            onClick={() => onNavigate('pensar-la-epoca')}
            className={`whitespace-nowrap transition-colors py-1 relative ${
              activeSection === 'pensar-la-epoca'
                ? 'text-[#111111] font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#111111] after:rounded-full'
                : 'hover:text-[#111111]'
            }`}
          >
            Pensar la Época
          </button>

          <button
            onClick={() => onNavigate('contacto')}
            className={`whitespace-nowrap transition-colors py-1 relative ${
              activeSection === 'contacto'
                ? 'text-[#111111] font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#111111] after:rounded-full'
                : 'hover:text-[#111111]'
            }`}
          >
            Contacto
          </button>
        </nav>

        {/* Right Action / Admin Local indicator */}
        <div className="flex items-center gap-3 shrink-0">
          {isLocalHost && hasAdminUI && (
            <button
              onClick={() => onNavigate('admin')}
              className={`px-3.5 py-1.5 text-[10px] font-mono uppercase tracking-[0.08em] rounded-full border transition-colors ${
                activeSection === 'admin'
                  ? 'bg-[#111111] text-[#f9f9f8] border-[#111111]'
                  : 'bg-white text-[#111111] border-[#e5e4e0] hover:border-[#111111] hover:bg-[#111111] hover:text-[#f9f9f8]'
              }`}
              title="Panel de administración local seguro"
            >
              [ ⚙️ Admin Local ]
            </button>
          )}

          <button
            onClick={() => onNavigate('contacto')}
            className="px-5 py-2 text-[11px] font-medium uppercase tracking-[0.08em] bg-[#111111] text-[#f9f9f8] border border-[#111111] rounded-full hover:bg-[#333230] transition-colors whitespace-nowrap shadow-sm"
          >
            Contactar
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden flex items-center overflow-x-auto px-4 py-2.5 border-t border-[#e5e4e0] gap-4 text-[11px] uppercase tracking-wider text-[#555452]">
        <button
          onClick={() => onNavigate('inicio')}
          className={`whitespace-nowrap py-1 ${activeSection === 'inicio' ? 'text-[#111111] font-semibold underline' : ''}`}
        >
          Inicio
        </button>
        <button
          onClick={() => onNavigate('editorial')}
          className={`whitespace-nowrap py-1 ${activeSection === 'editorial' ? 'text-[#111111] font-semibold underline' : ''}`}
        >
          Editorial
        </button>
        <button
          onClick={() => onNavigate('audiovisual')}
          className={`whitespace-nowrap py-1 ${activeSection === 'audiovisual' ? 'text-[#111111] font-semibold underline' : ''}`}
        >
          Audiovisual
        </button>
        <button
          onClick={() => onNavigate('pensar-la-epoca')}
          className={`whitespace-nowrap py-1 ${activeSection === 'pensar-la-epoca' ? 'text-[#111111] font-semibold underline' : ''}`}
        >
          Pensar la Época
        </button>
        <button
          onClick={() => onNavigate('contacto')}
          className={`whitespace-nowrap py-1 ${activeSection === 'contacto' ? 'text-[#111111] font-semibold underline' : ''}`}
        >
          Contacto
        </button>
        {isLocalHost && hasAdminUI && (
          <button
            onClick={() => onNavigate('admin')}
            className={`whitespace-nowrap py-1 font-mono text-[10px] ${activeSection === 'admin' ? 'text-[#111111] font-bold underline' : 'text-[#8c8a85]'}`}
          >
            [Admin]
          </button>
        )}
      </div>
    </header>
  );
};
