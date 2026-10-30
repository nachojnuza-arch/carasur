import React from "react";
import type { SiteContent } from "../types";
import type { LegalModalTab } from "./LegalModal";

interface FooterProps {
  content: SiteContent;
  isLocalHost: boolean;
  hasAdminUI?: boolean;
  onOpenAdmin: () => void;
  onOpenLegal: (tab: LegalModalTab) => void;
}

export const Footer: React.FC<FooterProps> = ({
  content,
  isLocalHost,
  hasAdminUI = false,
  onOpenAdmin,
  onOpenLegal,
}) => {
  return (
    <footer className="mt-auto border-t border-[#e5e4e0] bg-[#f9f9f8] text-[#555452]">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-[#e5e4e0] text-xs font-sans">
          {/* Identity */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <img
                src="/logo-full-transparent.png"
                alt="Cara Sur"
                className="h-7 w-auto object-contain select-none"
              />
            </div>
            <p className="text-[11px] text-[#8c8a85] leading-relaxed">
              {content.site.tagline}
            </p>
            <div className="pt-1">
              <span className="inline-block text-[9px] font-mono uppercase tracking-wider text-green-900 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">
                Sitio libre de cookies de rastreo
              </span>
            </div>
          </div>

          {/* Production Areas */}
          <div className="space-y-2">
            <span className="font-mono text-[10px] uppercase text-[#111111] tracking-wider block font-bold">
              Producción
            </span>
            <p className="text-[11px]">Editorial y Ensayos Críticos</p>
            <p className="text-[11px]">Cine y Documental</p>
            <p className="text-[11px]">Ciclo "Pensar la Época"</p>
          </div>

          {/* Contact */}
          <div className="space-y-2">
            <span className="font-mono text-[10px] uppercase text-[#111111] tracking-wider block font-bold">
              Contacto
            </span>
            <p className="text-[11px] font-mono">{content.contacto.email}</p>
            <p className="text-[11px]">
              {content.contacto.location || "La Plata, Buenos Aires, Argentina"}
            </p>
            {content.contacto.phone && (
              <p className="text-[11px] font-mono">{content.contacto.phone}</p>
            )}
          </div>

          {/* Legal & Privacy */}
          <div className="space-y-2">
            <span className="font-mono text-[10px] uppercase text-[#111111] tracking-wider block font-bold">
              Marco Legal y Privacidad
            </span>
            <ul className="space-y-1.5 text-[11px]">
              <li>
                <button
                  onClick={() => onOpenLegal('terminos')}
                  className="text-[#555452] hover:text-[#111111] hover:underline transition-colors text-left"
                >
                  Términos y Propiedad Intelectual
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal('privacidad-cookies')}
                  className="text-[#555452] hover:text-[#111111] hover:underline transition-colors text-left"
                >
                  Privacidad y Cookies
                </button>
              </li>
            </ul>

            {isLocalHost && hasAdminUI && (
              <div className="pt-2">
                <button
                  onClick={onOpenAdmin}
                  className="inline-block font-mono text-[10px] uppercase tracking-wider text-[#111111] underline underline-offset-2 hover:opacity-75"
                >
                  Panel de Edición Local
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono text-[#8c8a85] uppercase">
          <span>{content.footer.copyright}</span>
          <div className="flex items-center gap-4 text-[9px]">
            <a href="/robots.txt" target="_blank" rel="noreferrer" className="hover:text-[#111111]">
              robots.txt
            </a>
            <span>·</span>
            <a href="/sitemap.xml" target="_blank" rel="noreferrer" className="hover:text-[#111111]">
              sitemap.xml
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
