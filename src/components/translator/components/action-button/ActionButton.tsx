import React from 'react';
import './styles.css';

interface ActionButtonsProps {
  onSpeak?: () => void;
  onClear?: () => void;
  showClear?: boolean;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onSpeak,
  onClear,
  showClear = false
}) => {
  return (
    <div className="action-buttons">
      {onSpeak && (
        <button 
          className="action-button speak-button"
          onClick={onSpeak}
          title="Reproducir audio"
        >
          🔊
        </button>
      )}
      {showClear && onClear && (
        <button 
          className="action-button clear-button"
          onClick={onClear}
          title="Limpiar texto"
        >
          🗑️
        </button>
      )}
    </div>
  );
};