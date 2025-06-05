import type { APIRoute } from 'astro';
import * as deepl from 'deepl-node';
import { mapLanguageToDeepL } from '../../components/translator/lib/languages';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    // Obtener la API key desde las variables de entorno del servidor
    const authKey = import.meta.env.DEEPL_API_KEY;
    
    if (!authKey) {
      return new Response(JSON.stringify({ 
        error: 'DeepL API key not configured on server' 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Verificar que el request tenga contenido
    const contentType = request.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return new Response(JSON.stringify({ 
        error: 'Content-Type must be application/json' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Parsear el cuerpo de la petición con manejo de errores
    let requestData;
    try {
      requestData = await request.json();
    } catch (jsonError) {
      return new Response(JSON.stringify({ 
        error: 'Invalid JSON in request body' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { text, sourceLanguage, targetLanguage } = requestData;

    if (!text || !targetLanguage) {
      return new Response(JSON.stringify({ 
        error: 'Text and target language are required' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Inicializar cliente DeepL
    const deeplClient = new deepl.DeepLClient(authKey);

    // Mapear códigos de idioma
    const sourceLang = sourceLanguage === 'auto' ? null : mapLanguageToDeepL(sourceLanguage);
    const targetLang = mapLanguageToDeepL(targetLanguage);

    if (!targetLang) {
      return new Response(JSON.stringify({ 
        error: `Target language '${targetLanguage}' is not supported by DeepL` 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Realizar la traducción
    const result = await deeplClient.translateText(
      text,
      sourceLang as deepl.SourceLanguageCode | null,
      targetLang as deepl.TargetLanguageCode
    );

    // Como enviamos un solo texto, result será un TextResult único
    const translationResult = Array.isArray(result) ? result[0] : result;
    
    return new Response(JSON.stringify({ 
      translatedText: translationResult.text,
      detectedSourceLanguage: translationResult.detectedSourceLang
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error: any) {
    console.error('Translation error:', error);
    
    return new Response(JSON.stringify({ 
      error: error.message || 'Translation failed' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}; 