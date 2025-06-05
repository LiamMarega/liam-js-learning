# DeepL API Integration Setup

This guide will help you set up the DeepL API integration for your translator component.

## 1. Get Your DeepL API Key

1. Go to [DeepL Account](https://www.deepl.com/account/summary)
2. Sign up for a DeepL account if you don't have one
3. Choose between:
   - **API Free**: 500,000 characters/month free
   - **API Pro**: Paid plan with higher limits

## 2. Configure Environment Variables

1. Copy the `env.example` file to `.env`:
   ```bash
   cp env.example .env
   ```

2. Edit the `.env` file and add your DeepL API key:
   ```env
   DEEPL_API_KEY=your_actual_api_key_here
   ```

   **Importante**: En Astro, usamos `DEEPL_API_KEY` (sin prefijo) para que la variable solo sea accesible desde el servidor, manteniendo la seguridad de tu API key.

## 3. API Key Format

DeepL API keys have different formats:
- **API Free**: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx:fx`
- **API Pro**: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`

## 4. Supported Languages

The translator now supports all DeepL languages including:
- English, Spanish, French, German, Italian
- Portuguese (PT/BR), Russian, Japanese, Korean
- Chinese, Dutch, Polish, Swedish, Danish
- Norwegian, Finnish, Greek, Czech, Slovak
- And many more!

## 5. Features

- **Real-time translation** using DeepL's high-quality neural networks
- **Language auto-detection** for source text
- **Error handling** with user-friendly messages
- **Character count** tracking
- **Language swapping** functionality
- **Text-to-speech** support

## 6. Usage

The `useTranslator` hook now includes:
- `translateText()` - Translates text using DeepL API
- `error` - Error state for handling API issues
- All existing functionality (swap, speak, clear, etc.)

## 7. API Endpoints

- **API Free**: `https://api-free.deepl.com`
- **API Pro**: `https://api.deepl.com`

The library automatically uses the correct endpoint based on your API key format.

## 8. Testing

After setup, test the integration:
1. Start your development server: `npm run dev`
2. Enter some text in the translator
3. Select source and target languages
4. Click translate to see DeepL's high-quality translations

## 9. Troubleshooting

- **"DeepL API key not configured"**: Check your `.env` file
- **"Language not supported"**: Verify language codes in `src/components/translator/lib/languages.ts`
- **API errors**: Check your DeepL account quota and API key validity 