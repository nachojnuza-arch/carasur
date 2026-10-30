export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  author?: string;
  description: string;
  fullText?: string;
  year?: string | number;
  tags?: string[];
  category?: string;
  link?: string;
  youtubeUrl?: string;
  pdfUrl?: string;
  pdfName?: string;
  image?: string;
  instagramUrl?: string;
  featured?: boolean;
}

export interface Episode {
  id: string;
  title: string;
  guest: string;
  description: string;
  year?: string | number;
  date?: string;
  videoUrl?: string;
  image?: string;
}

export interface SiteContent {
  site: {
    name: string;
    tagline: string;
  };
  hero: {
    title: string;
    subtitle: string;
    description: string;
    featuredBadge?: string;
    featuredMode?: 'auto' | 'manual';
  };
  editorial: {
    title: string;
    subtitle?: string;
    description: string;
    projects: Project[];
  };
  audiovisual: {
    title: string;
    subtitle?: string;
    description: string;
    projects: Project[];
  };
  pensarLaEpoca: {
    title: string;
    subtitle?: string;
    description: string;
    episodes: Episode[];
  };
  contacto: {
    title: string;
    description: string;
    email: string;
    phone: string;
    instagram: string;
    youtube: string;
    location?: string;
  };
  footer: {
    copyright: string;
    description: string;
  };
}
