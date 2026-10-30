import { useState, useEffect, useCallback } from 'react';
import defaultContent from '../data/content.json';
import type { SiteContent } from '../types';

export function useContent() {
  const [content, setContent] = useState<SiteContent>(defaultContent as SiteContent);
  const [loading, setLoading] = useState(false);
  const [isLocalAvailable, setIsLocalAvailable] = useState<boolean | null>(null);

  // Check if we are running in a localhost / 127.0.0.1 browser environment
  const isLocalHost =
    typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1');

  const fetchContent = useCallback(async () => {
    if (!isLocalHost) {
      // In non-local environment, strictly use static bundled content
      setIsLocalAvailable(false);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch('/api/content', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        setContent(data);
        setIsLocalAvailable(true);
      } else {
        setIsLocalAvailable(false);
      }
    } catch {
      setIsLocalAvailable(false);
    } finally {
      setLoading(false);
    }
  }, [isLocalHost]);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  const saveContent = async (updatedContent: SiteContent): Promise<{ success: boolean; error?: string }> => {
    if (!isLocalHost) {
      return { success: false, error: 'Guardado solo disponible en entorno local' };
    }

    try {
      // 1. Fetch fresh CSRF token from local server
      const csrfRes = await fetch('/api/csrf-token');
      if (!csrfRes.ok) {
        setIsLocalAvailable(false);
        return {
          success: false,
          error: 'No se pudo conectar con el servidor local en el puerto 3001. Verificá que esté en ejecución.',
        };
      }
      const { token } = await csrfRes.json();

      // 2. Send update with CSRF header
      const postRes = await fetch('/api/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-csrf': token,
        },
        body: JSON.stringify(updatedContent),
      });

      if (!postRes.ok) {
        const errData = await postRes.json();
        return { success: false, error: errData.error || 'Error al guardar los cambios' };
      }

      setContent(updatedContent);
      setIsLocalAvailable(true);
      return { success: true };
    } catch (err: any) {
      setIsLocalAvailable(false);
      return { success: false, error: err.message || 'Error de conexión con el servidor local' };
    }
  };

  const uploadFile = async (
    file: File
  ): Promise<{
    success: boolean;
    url?: string;
    originalName?: string;
    extractedText?: string;
    error?: string;
  }> => {
    if (!isLocalHost) {
      return { success: false, error: 'Subida de archivos solo permitida en entorno local' };
    }

    try {
      const csrfRes = await fetch('/api/csrf-token');
      if (!csrfRes.ok) {
        return { success: false, error: 'No se pudo obtener el token de seguridad CSRF' };
      }
      const { token } = await csrfRes.json();

      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'x-admin-csrf': token,
        },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || 'Error al subir el archivo' };
      }

      return {
        success: true,
        url: data.url,
        originalName: data.originalName,
      };
    } catch (err: any) {
      return { success: false, error: err.message || 'Error de red al subir el archivo' };
    }
  };

  // Extract text from an uploaded document (PDF, TXT, MD) without storing the file permanently
  const extractTextFromDocument = async (
    file: File
  ): Promise<{ success: boolean; text?: string; originalName?: string; error?: string }> => {
    if (!isLocalHost) {
      return { success: false, error: 'La extracción de documentos solo está disponible en entorno local' };
    }

    try {
      const csrfRes = await fetch('/api/csrf-token');
      if (!csrfRes.ok) {
        return { success: false, error: 'No se pudo obtener el token de seguridad CSRF' };
      }
      const { token } = await csrfRes.json();

      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/extract-document-text', {
        method: 'POST',
        headers: {
          'x-admin-csrf': token,
        },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || 'Error al extraer texto del documento' };
      }

      return {
        success: true,
        text: data.text,
        originalName: data.originalName,
      };
    } catch (err: any) {
      return { success: false, error: err.message || 'Error de conexión con el servidor local' };
    }
  };

  return {
    content,
    loading,
    isLocalAvailable,
    isLocalHost,
    reloadContent: fetchContent,
    saveContent,
    uploadFile,
    extractTextFromDocument,
  };
}
