import React from 'react';
import type { SiteContent } from '../types';

export interface AdminViewProps {
  content: SiteContent;
  isLocalHost: boolean;
  isLocalAvailable: boolean | null;
  onSave: (updated: SiteContent) => Promise<{ success: boolean; error?: string }>;
  onUploadFile: (file: File) => Promise<{
    success: boolean;
    url?: string;
    originalName?: string;
    error?: string;
  }>;
  onExtractTextFromDocument: (file: File) => Promise<{
    success: boolean;
    text?: string;
    originalName?: string;
    error?: string;
  }>;
  onBackToSite: () => void;
  onReloadContent?: () => void;
}

/**
 * AdminStub se utiliza en compilaciones públicas y repositorios donde
 * el panel de administración local no está presente.
 */
export const AdminView: React.FC<AdminViewProps> = () => null;
