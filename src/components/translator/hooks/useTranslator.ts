import { useState, useCallback } from 'react';

interface Language {
  code: string;
  name: string;
}

export const useTranslator = () => {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('auto');
  const [targetLanguage, setTargetLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(false);

  const charCount = sourceText.length;

  // Simulación de traducción (reemplazar con API real)
  const translateText = useCallback(async () => {
    if (!sourceText.trim()) return;
    
    setIsLoading(true);
    
    try {
      // Aquí iría la llamada a la API de Google Translate
      // Por ahora simulamos con un delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulación simple - en producción usar Google Translate API
      const mockTranslation = `[Traducido de ${sourceLanguage} a ${targetLanguage}]: ${sourceText}`;
      setTranslatedText(mockTranslation);
    } catch (error) {
      console.error('Error al traducir:', error);
      setTranslatedText('Error en la traducción');
    } finally {
      setIsLoading(false);
    }
  }, [sourceText, sourceLanguage, targetLanguage]);

  const swapLanguages = useCallback(() => {
    if (sourceLanguage === 'auto') return;
    
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);
    setSourceText(translatedText);
    setTranslatedText(sourceText);
  }, [sourceLanguage, targetLanguage, sourceText, translatedText]);

  const speakText = useCallback((text: string, language: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'auto' ? 'es-ES' : language;
      speechSynthesis.speak(utterance);
    }
  }, []);

  const clearText = useCallback(() => {
    setSourceText('');
    setTranslatedText('');
  }, []);

  return {
    sourceText,
    translatedText,
    sourceLanguage,
    targetLanguage,
    isLoading,
    charCount,
    setSourceText,
    setSourceLanguage,
    setTargetLanguage,
    translateText,
    swapLanguages,
    speakText,
    clearText
  };
};