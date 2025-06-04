import React from 'react';
import { useTranslator } from '../../hooks/useTranslator';
import { LanguageSelector } from '../language-selector/LanguageSelector';
import { TextArea } from '../texttarea/Texttarea';
import { ActionButtons } from '../action-button/ActionButton';
import './styles.css';

export default function Translator() {
  const {
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
  } = useTranslator();

  return (
      <div className="translator-container">
        {/* Language Selectors */}
        <div className="language-controls">
          <LanguageSelector
            value={sourceLanguage}
            onChange={setSourceLanguage}
            showDetect={true}
          />
          <button 
            className="swap-button"
            onClick={swapLanguages}
            title="Intercambiar idiomas"
          >
            ⇄
          </button>
          <LanguageSelector
            value={targetLanguage}
            onChange={setTargetLanguage}
            showDetect={false}
          />
        </div>

        {/* Text Areas */}
        <div className="text-areas">
          <div className="input-section">
            <TextArea
              value={sourceText}
              onChange={setSourceText}
              placeholder="Escribe o pega el texto aquí..."
              maxLength={5000}
              showCounter={true}
              charCount={charCount}
            />
            <ActionButtons
              onSpeak={() => speakText(sourceText, sourceLanguage)}
              onClear={clearText}
              showClear={sourceText.length > 0}
            />
          </div>

          <div className="output-section">
            <div className="translation-header">Traducción</div>
            <TextArea
              value={translatedText}
              placeholder={isLoading ? "Traduciendo..." : ""}
              readOnly={true}
              isLoading={isLoading}
            />
            {translatedText && (
              <ActionButtons
                onSpeak={() => speakText(translatedText, targetLanguage)}
                showClear={false}
              />
            )}
          </div>
        </div>

        {/* File Upload Area */}
        {/* <div className="file-upload-area">
          <p>Arrastra y suelta aquí archivos PDF, Word (.docx) o PowerPoint (.pptx) para traducirlos.</p>
        </div> */}

        {/* Translate Button */}
        <div className="translate-section">
          <button 
            className="translate-button"
            onClick={translateText}
            disabled={!sourceText.trim() || isLoading}
          >
            {isLoading ? "Traduciendo..." : "Traducir"}
          </button>
        </div>
      </div>
  );
}