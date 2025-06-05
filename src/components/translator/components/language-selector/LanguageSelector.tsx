import React from 'react';
import './styles.css';

interface LanguageSelectorProps {
  value: string;
  onChange: (value: string) => void;
  showDetect?: boolean;
}

const languages = [
  { code: 'es', name: 'Español' },
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'it', name: 'Italiano' },
  { code: 'pt', name: 'Português' },
  { code: 'ru', name: 'Русский' },
  { code: 'ja', name: '日本語' },
  { code: 'ko', name: '한국어' },
  { code: 'zh', name: '中文' },
];

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  value, 
  onChange, 
  showDetect = false 
}) => {
  return (
    <div className="language-selector">
      <div className="selector-wrapper">
        <span className="globe-icon">🌐</span>
        <select 
          value={value} 
          onChange={(e) => onChange(e.target.value)}
          className="language-select"
        >
          {showDetect && <option value="auto">Detectar idioma</option>}
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
        <span className="dropdown-arrow">▼</span>
      </div>
    </div>
  );
};