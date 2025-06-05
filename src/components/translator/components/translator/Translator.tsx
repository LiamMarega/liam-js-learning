import React, { useState } from 'react';
import { useTranslator } from '../../hooks/useTranslator';
import { TextArea } from '../texttarea/Texttarea';
import './styles.css';

export default function Translator() {
  const [testText, setTestText] = useState('');
  
  const {
    sourceText,
    translatedText,
    isSpanishToEnglish,
    isLoading,
    setSourceText,
    swapLanguages,
    clearText
  } = useTranslator();

  return (
      <div className="translator-container">
      
        
        {/* Language indicator */}
        <div className="language-controls">
          <span>{isSpanishToEnglish ? 'Español' : 'English'}</span>
          <button 
            className="swap-button"
            onClick={() => {
              swapLanguages();
            }}
            title="Intercambiar idiomas"
          >
            ⇄
          </button>
          <span>{isSpanishToEnglish ? 'English' : 'Español'}</span>
        </div>

        {/* Text Areas */}
        <div className="text-areas">
          <div className="input-section">
            <TextArea
              value={sourceText}
              onChange={setSourceText}
              placeholder={isSpanishToEnglish ? "Escribe en español..." : "Write in English..."}
              maxLength={100}
              showCounter={true}
              charCount={sourceText.length}
            />
            <button onClick={() => {
              clearText();
            }} disabled={!sourceText}>
              Limpiar
            </button>
          </div>

          <div className="output-section">
            <TextArea
              value={translatedText}
              placeholder={isLoading ? "Traduciendo..." : "Traducción aparecerá aquí..."}
              readOnly={true}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
  );
}