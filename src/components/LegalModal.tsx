import React, { useState, useEffect } from 'react';

export type LegalModalTab = 'terminos' | 'privacidad-cookies';

interface LegalModalProps {
  isOpen: boolean;
  initialTab?: LegalModalTab;
  onClose: () => void;
  onNavigateSection?: (section: string) => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  initialTab = 'terminos',
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<LegalModalTab>(initialTab);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-xs overflow-y-auto"
      style={{ backgroundColor: 'rgba(17, 17, 17, 0.88)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl bg-white rounded-3xl border border-[#111111] p-6 sm:p-10 space-y-6 text-[#111111] shadow-2xl my-auto max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-[#e5e4e0] text-[10px] font-mono uppercase text-[#8c8a85]">
          <span>Cara Sur · Marco Institucional y Legal</span>
          <button
            onClick={onClose}
            className="text-xs text-[#111111] hover:opacity-60 uppercase font-mono px-3 py-1 rounded-full border border-[#e5e4e0]"
          >
            Cerrar
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-[#e5e4e0] pb-3">
          <button
            onClick={() => setActiveTab('terminos')}
            className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-colors ${
              activeTab === 'terminos'
                ? 'bg-[#111111] text-white shadow-xs'
                : 'bg-[#f0f0ee] text-[#555452] hover:text-[#111111]'
            }`}
          >
            Términos y Propiedad Intelectual
          </button>
          <button
            onClick={() => setActiveTab('privacidad-cookies')}
            className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-colors ${
              activeTab === 'privacidad-cookies'
                ? 'bg-[#111111] text-white shadow-xs'
                : 'bg-[#f0f0ee] text-[#555452] hover:text-[#111111]'
            }`}
          >
            Privacidad y Cookies
          </button>
        </div>

        {/* TAB 1: TÉRMINOS & CONDICIONES */}
        {activeTab === 'terminos' && (
          <div className="space-y-6 text-[#222221] font-sans">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#8c8a85] block mb-1">
                Marco Legal y Derechos de Autor
              </span>
              <h3 className="font-serif italic text-2xl sm:text-3xl text-[#111111]">
                Términos y Condiciones de Uso
              </h3>
              <p className="text-xs font-mono text-[#8c8a85] mt-1">
                Cara Sur Productora · La Plata, Buenos Aires, Argentina
              </p>
            </div>

            <div className="space-y-4 text-sm leading-relaxed text-[#333230]">
              <div className="p-4 bg-[#fcfcfb] rounded-xl border border-[#e5e4e0] space-y-2">
                <h4 className="font-semibold text-[#111111] text-xs font-mono uppercase">
                  1. Titularidad y Propiedad Intelectual
                </h4>
                <p>
                  Todas las obras audiovisuales, documentales, series, montajes, publicaciones editoriales, ensayos críticos, textos, fotografías, marcas y logotipos exhibidos en esta plataforma son propiedad exclusiva de <strong>Cara Sur Productora</strong> o cuentan con la debida cesión y autorización de sus respectivos autores.
                </p>
                <p className="text-xs text-[#666563]">
                  Quedan amparados bajo la <strong>Ley de Propiedad Intelectual N° 11.723 de la República Argentina</strong> y los tratados internacionales de derechos de autor (Convenio de Berna y OMPI).
                </p>
              </div>

              <div className="p-4 bg-[#fcfcfb] rounded-xl border border-[#e5e4e0] space-y-2">
                <h4 className="font-semibold text-[#111111] text-xs font-mono uppercase">
                  2. Uso Permitido y Régimen de Citas
                </h4>
                <p>
                  Se autoriza la consulta, lectura y visualización libre de los contenidos de este sitio para fines personales, educativos, de investigación o de divulgación cultural sin fines de lucro.
                </p>
                <p>
                  Cualquier cita textual, académica o reseña periodística deberá consignar obligatoriamente la mención de autoría y procedencia: <em>«Cara Sur Productora (carasurproductora.com.ar)»</em>.
                </p>
              </div>

              <div className="p-4 bg-[#fcfcfb] rounded-xl border border-[#e5e4e0] space-y-2">
                <h4 className="font-semibold text-[#111111] text-xs font-mono uppercase">
                  3. Prohibiciones Expresas
                </h4>
                <p>
                  Queda prohibida la descarga indebida, reproducción comercial, sincronización, edición, remezcla o distribución pública de las obras audiovisuales y textos editoriales sin el consentimiento previo y por escrito de la productora.
                </p>
              </div>

              <div className="p-4 bg-[#fcfcfb] rounded-xl border border-[#e5e4e0] space-y-2">
                <h4 className="font-semibold text-[#111111] text-xs font-mono uppercase">
                  4. Licenciamiento, Festivales y Exhibiciones Comunitarias
                </h4>
                <p>
                  Para coordinar proyecciones especiales, participación en festivales de cine, muestras comunitarias, acuerdos de coproducción o adquisición de derechos editoriales, los interesados pueden comunicarse a través del correo oficial: <strong className="font-mono text-[#111111]">carasurproductora@gmail.com</strong>.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PRIVACIDAD & COOKIES */}
        {activeTab === 'privacidad-cookies' && (
          <div className="space-y-6 text-[#222221] font-sans">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#8c8a85] block mb-1">
                Compromiso Ético con la Privacidad
              </span>
              <h3 className="font-serif italic text-2xl sm:text-3xl text-[#111111]">
                Política de Privacidad y Cookies
              </h3>
              <p className="text-xs font-mono text-[#8c8a85] mt-1">
                Conforme a la Ley Nacional 25.326 de Protección de Datos Personales
              </p>
            </div>

            <div className="space-y-4 text-sm leading-relaxed text-[#333230]">
              <div className="p-5 bg-[#f5fbf6] rounded-xl border border-[#cbe4d0] space-y-2">
                <div className="text-green-900 font-mono text-xs uppercase font-bold tracking-wider">
                  Sitio Libre de Cookies de Rastreo
                </div>
                <p className="text-[#2b5233]">
                  En Cara Sur consideramos que la cultura y la lectura no deben estar condicionadas a la vigilancia digital. <strong>Esta plataforma web no utiliza cookies de seguimiento publicitario, ni cookies de terceros para perfilado, ni píxeles de redes sociales.</strong>
                </p>
                <p className="text-xs text-[#3f6d48]">
                  Por esta razón no mostramos avisos invasivos de consentimiento de cookies: no instalamos ningún mecanismo que requiera ser bloqueado.
                </p>
              </div>

              <div className="p-4 bg-[#fcfcfb] rounded-xl border border-[#e5e4e0] space-y-2">
                <h4 className="font-semibold text-[#111111] text-xs font-mono uppercase">
                  Reproducción de Video con Privacidad Avanzada
                </h4>
                <p>
                  Los videos alojados en YouTube se integran utilizando el estándar <code className="bg-gray-100 px-1 py-0.5 rounded font-mono text-xs">youtube-nocookie.com</code> (Modo de Privacidad Mejorada). Esto garantiza que YouTube no almacene identificadores ni cookies en el navegador del usuario a menos que éste decida reproducir el video voluntariamente.
                </p>
              </div>

              <div className="p-4 bg-[#fcfcfb] rounded-xl border border-[#e5e4e0] space-y-2">
                <h4 className="font-semibold text-[#111111] text-xs font-mono uppercase">
                  Tratamiento de Datos de Contacto
                </h4>
                <p>
                  Cualquier información provista al contactarnos mediante correo electrónico o teléfono es tratada con estricta confidencialidad. <strong>Cara Sur jamás comercializa, cede ni transfiere datos de contacto a terceros.</strong>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Footer actions */}
        <div className="pt-4 border-t border-[#e5e4e0] flex items-center justify-between">
          <span className="text-[10px] font-mono text-[#8c8a85] uppercase">
            Cara Sur Productora · Edición y Cine Independiente
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-mono uppercase tracking-wider bg-[#111111] text-[#f9f9f8] rounded-full hover:bg-[#333230]"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
