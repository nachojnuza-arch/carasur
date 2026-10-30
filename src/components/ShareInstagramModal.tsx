import React from 'react';

interface ShareInstagramProps {
  title?: string;
  category?: string;
  type?: 'editorial' | 'audiovisual';
  author?: string;
  instagramHandle?: string;
  instagramUrl?: string;
  imageUrl?: string;
  className?: string;
  label?: string;
}

export const ShareInstagramButton: React.FC<ShareInstagramProps> = ({
  instagramUrl,
  className = '',
  label = 'Compartir en IG',
}) => {
  // If there is no Instagram post link provided, hide the button completely
  if (!instagramUrl || !instagramUrl.trim()) {
    return null;
  }

  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(instagramUrl.trim(), '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      type="button"
      onClick={handleShareClick}
      title="Abrir publicación en Instagram para compartir"
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider text-[#666562] hover:text-[#111111] border border-[#e5e4e0] hover:border-[#111111] bg-white hover:bg-[#f5f4f0] transition-colors cursor-pointer ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-3 h-3 text-[#666562] group-hover:text-[#111111] transition-colors"
      >
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
      <span className="font-medium">{label}</span>
      <span className="text-[9px] text-[#8c8a85]">↗</span>
    </button>
  );
};
