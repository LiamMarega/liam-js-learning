// DeepL supported languages based on the official documentation
// https://developers.deepl.com/docs/getting-started/supported-languages

export interface Language {
  code: string;
  name: string;
  deeplCode: string;
}

export const SUPPORTED_LANGUAGES: Language[] = [
  { code: 'auto', name: 'Detect Language', deeplCode: '' },
  { code: 'en', name: 'English', deeplCode: 'en-US' },
  { code: 'es', name: 'Spanish', deeplCode: 'es' },
  { code: 'fr', name: 'French', deeplCode: 'fr' },
  { code: 'de', name: 'German', deeplCode: 'de' },
  { code: 'it', name: 'Italian', deeplCode: 'it' },
  { code: 'pt', name: 'Portuguese', deeplCode: 'pt-PT' },
  { code: 'pt-br', name: 'Portuguese (Brazil)', deeplCode: 'pt-BR' },
  { code: 'ru', name: 'Russian', deeplCode: 'ru' },
  { code: 'ja', name: 'Japanese', deeplCode: 'ja' },
  { code: 'zh', name: 'Chinese (Simplified)', deeplCode: 'zh' },
  { code: 'ko', name: 'Korean', deeplCode: 'ko' },
  { code: 'nl', name: 'Dutch', deeplCode: 'nl' },
  { code: 'pl', name: 'Polish', deeplCode: 'pl' },
  { code: 'sv', name: 'Swedish', deeplCode: 'sv' },
  { code: 'da', name: 'Danish', deeplCode: 'da' },
  { code: 'no', name: 'Norwegian', deeplCode: 'nb' },
  { code: 'fi', name: 'Finnish', deeplCode: 'fi' },
  { code: 'el', name: 'Greek', deeplCode: 'el' },
  { code: 'cs', name: 'Czech', deeplCode: 'cs' },
  { code: 'sk', name: 'Slovak', deeplCode: 'sk' },
  { code: 'sl', name: 'Slovenian', deeplCode: 'sl' },
  { code: 'et', name: 'Estonian', deeplCode: 'et' },
  { code: 'lv', name: 'Latvian', deeplCode: 'lv' },
  { code: 'lt', name: 'Lithuanian', deeplCode: 'lt' },
  { code: 'hu', name: 'Hungarian', deeplCode: 'hu' },
  { code: 'ro', name: 'Romanian', deeplCode: 'ro' },
  { code: 'bg', name: 'Bulgarian', deeplCode: 'bg' },
  { code: 'hr', name: 'Croatian', deeplCode: 'hr' },
  { code: 'uk', name: 'Ukrainian', deeplCode: 'uk' },
  { code: 'tr', name: 'Turkish', deeplCode: 'tr' },
  { code: 'id', name: 'Indonesian', deeplCode: 'id' },
  { code: 'ar', name: 'Arabic', deeplCode: 'ar' },
];

export const mapLanguageToDeepL = (languageCode: string): string | null => {
  const language = SUPPORTED_LANGUAGES.find(lang => lang.code === languageCode);
  return language ? language.deeplCode : null;
};

export const isLanguageSupported = (languageCode: string): boolean => {
  return SUPPORTED_LANGUAGES.some(lang => lang.code === languageCode);
}; 