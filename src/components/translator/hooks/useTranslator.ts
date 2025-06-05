import { useState, useCallback, useEffect } from 'react';

export const useTranslator = () => {
  
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isSpanishToEnglish, setIsSpanishToEnglish] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Función para traducir usando la API
  const translateText = useCallback(async (text: string) => {
    if (!text.trim()) {
      setTranslatedText('');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const sourceLanguage = isSpanishToEnglish ? 'es' : 'en';
      const targetLanguage = isSpanishToEnglish ? 'en' : 'es';

      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          sourceLanguage,
          targetLanguage,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Translation failed');
      }

      setTranslatedText(data.translatedText);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Translation error');
      setTranslatedText('');
    } finally {
      setIsLoading(false);
    }
  }, [isSpanishToEnglish]);

  // Efecto para traducir cuando cambia el texto o idioma
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      translateText(sourceText);
    }, 500); // Debounce de 500ms

    return () => clearTimeout(timeoutId);
  }, [sourceText, translateText]);

  const handleSetSourceText = useCallback((text: string) => {
    setSourceText(text);
  }, []);

  const swapLanguages = useCallback(() => {
    setIsSpanishToEnglish(!isSpanishToEnglish);
    setSourceText(translatedText);
    setTranslatedText(sourceText);
  }, [isSpanishToEnglish, sourceText, translatedText]);

  const clearText = useCallback(() => {
    setSourceText('');
    setTranslatedText('');
    setError(null);
  }, []);

  return {
    sourceText,
    translatedText,
    isSpanishToEnglish,
    isLoading,
    error,
    setSourceText: handleSetSourceText,
    swapLanguages,
    clearText
  };
};