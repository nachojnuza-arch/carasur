import React, { useState } from 'react';
import type { SiteContent } from '../types';

interface ContactSectionProps {
  content: SiteContent;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ content }) => {
  const contacto = content.contacto;
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: 'Consulta General',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSent(true);
  };

  return (
    <section className="space-y-12">
      {/* Header */}
      <div className="border-b border-[#e5e4e0] pb-6">
        <div className="text-[11px] font-mono uppercase tracking-[0.08em] text-[#8c8a85] mb-2">
          COMUNICACIÓN & VÍNCULOS INSTITUCIONALES
        </div>
        <h2 className="font-serif italic text-3xl sm:text-5xl text-[#111111] font-normal leading-tight">
          {contacto.title}
        </h2>
        <p className="mt-3 text-sm text-[#555452] font-sans max-w-3xl leading-relaxed">
          {contacto.description}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Info Column */}
        <div className="lg:col-span-5 space-y-8">
          <div className="rounded-3xl border border-[#e5e4e0] bg-[#ffffff] p-6 sm:p-8 space-y-6 shadow-sm">
            <h3 className="font-serif italic text-2xl text-[#111111]">
              Canales Directos
            </h3>

            <div className="space-y-4 text-xs font-mono">
              {contacto.email && (
                <div className="border-b border-[#e5e4e0] pb-3">
                  <span className="text-[#8c8a85] uppercase block text-[10px] mb-1">Correo Electrónico</span>
                  <a
                    href={`mailto:${contacto.email}`}
                    className="text-sm font-semibold text-[#111111] hover:underline"
                  >
                    {contacto.email}
                  </a>
                </div>
              )}

              {contacto.phone && (
                <div className="border-b border-[#e5e4e0] pb-3">
                  <span className="text-[#8c8a85] uppercase block text-[10px] mb-1">Teléfono / WhatsApp</span>
                  <span className="text-sm font-medium text-[#111111]">{contacto.phone}</span>
                </div>
              )}

              {contacto.location && (
                <div className="border-b border-[#e5e4e0] pb-3">
                  <span className="text-[#8c8a85] uppercase block text-[10px] mb-1">Sede</span>
                  <span className="text-sm text-[#555452]">{contacto.location}</span>
                </div>
              )}

              <div className="pt-2">
                <span className="text-[#8c8a85] uppercase block text-[10px] mb-2">Redes & Archivo</span>
                <div className="flex flex-wrap gap-2">
                  {contacto.instagram && (
                    <span className="px-3 py-1 bg-[#f9f9f8] border border-[#e5e4e0] text-[#111111] text-[11px] rounded-full">
                      IG: {contacto.instagram}
                    </span>
                  )}
                  {contacto.youtube && (
                    <span className="px-3 py-1 bg-[#f9f9f8] border border-[#e5e4e0] text-[#111111] text-[11px] rounded-full">
                      YT: {contacto.youtube}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#e5e4e0] bg-[#f9f9f8] p-5 text-xs text-[#555452] leading-relaxed">
            <strong className="text-[#111111] block mb-1 font-mono uppercase text-[10px]">
              Alianzas y Coproducciones
            </strong>
            Recibimos propuestas de coproducción cinematográfica, ensayos editoriales para dictamen y solicitudes de proyección comunitaria e institucional.
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl border border-[#e5e4e0] bg-[#ffffff] p-6 sm:p-8 shadow-sm">
            <div className="pb-4 mb-6 border-b border-[#e5e4e0] text-[10px] font-mono uppercase tracking-[0.08em] text-[#8c8a85]">
              FORMULARIO DE CONTACTO DIRECTO
            </div>

            {sent ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-12 h-12 rounded-full border border-[#111111] mx-auto flex items-center justify-center font-serif text-xl">
                  ✓
                </div>
                <h3 className="font-serif italic text-2xl text-[#111111]">
                  Mensaje Enviado
                </h3>
                <p className="text-xs text-[#555452] max-w-sm mx-auto">
                  Gracias por comunicarte con Cara Sur Productora. Nos pondremos en contacto a la brevedad.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-4 px-5 py-2 text-xs font-mono uppercase border border-[#111111] rounded-full hover:bg-[#111111] hover:text-white transition-colors"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-[0.08em] text-[#8c8a85] mb-1">
                    Nombre o Institución *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Tu nombre completo o entidad"
                    className="w-full bg-[#f9f9f8]/50 border border-[#e5e4e0] focus:border-[#111111] px-4 py-2.5 rounded-xl text-sm font-sans text-[#111111] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-[0.08em] text-[#8c8a85] mb-1">
                    Correo Electrónico *
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="tu@correo.com"
                    className="w-full bg-[#f9f9f8]/50 border border-[#e5e4e0] focus:border-[#111111] px-4 py-2.5 rounded-xl text-sm font-sans text-[#111111] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-[0.08em] text-[#8c8a85] mb-1">
                    Área de Interés
                  </label>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full bg-[#f9f9f8]/50 border border-[#e5e4e0] focus:border-[#111111] px-4 py-2.5 rounded-xl text-sm font-sans text-[#111111] focus:outline-none"
                  >
                    <option value="Consulta General">Consulta General</option>
                    <option value="Área Editorial / Libros">Área Editorial / Libros</option>
                    <option value="Área Audiovisual / Cine">Área Audiovisual / Cine</option>
                    <option value="Ciclo Pensar la Época">Ciclo Pensar la Época</option>
                    <option value="Prensa y Medios">Prensa y Medios</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-[0.08em] text-[#8c8a85] mb-1">
                    Mensaje *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Describí tu consulta o propuesta..."
                    className="w-full bg-[#f9f9f8]/50 border border-[#e5e4e0] focus:border-[#111111] px-4 py-2.5 rounded-xl text-sm font-sans text-[#111111] focus:outline-none transition-colors resize-none"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 text-xs font-mono uppercase tracking-wider bg-[#111111] text-[#f9f9f8] rounded-full hover:bg-[#333230] transition-colors shadow-sm"
                  >
                    Enviar Mensaje →
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
