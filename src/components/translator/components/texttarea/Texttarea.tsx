import React from 'react';
import './styles.css';

interface TextAreaProps {
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
  readOnly?: boolean;
  showCounter?: boolean;
  charCount?: number;
  isLoading?: boolean;
}

export const TextArea: React.FC<TextAreaProps> = ({
  value,
  onChange,
  placeholder,
  maxLength = 500,
  readOnly = false,
  showCounter = false,
  charCount = 0,
  isLoading = false
}) => {
  
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <div className="textarea-container">
      <textarea
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        maxLength={maxLength}
        readOnly={readOnly}
        className={`custom-textarea ${isLoading ? 'loading' : ''}`}
      />
      {showCounter && (
        <div className="char-counter">
          {charCount} / {maxLength}
        </div>
      )}
    </div>
  );
};