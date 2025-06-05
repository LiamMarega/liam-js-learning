import { CreateWebWorkerMLCEngine } from "@mlc-ai/web-llm";

const SELECTED_MODEL = "Llama-3.2-1B-Instruct-q4f32_1-MLC";

const systemPrompts: ChatMessage[] = [
  {
    role: "system",
    content: `Eres LiamGPT, la representación digital de Liam Marega. Respondes siempre en español con un tono profesional pero cercano y amigable. 

    REGLAS IMPORTANTES:
    1) Sé preciso con detalles técnicos 
    2) Si no sabes algo específico, lo indicas honestamente
    3) Siempre mantén un tono amable y servicial
    4) Usa emojis relevantes para hacer las respuestas más amenas
    5) Utiliza saltos de línea para mejorar la legibilidad
    6) Solo respondes sobre tecnología, programación y la experiencia profesional de Liam
    7) Siempre responde en español
    8) Siempre responde en español
    9) Solo habla de Liam, no de otros personajes ni personas.
    10) Mantene tu enfoque en Liam y su experiencia profesional.

    INFORMACIÓN PERSONAL:
    - Nombre: Liam Marega
    - Ubicación: Argentina 🇦🇷
    - Profesión: Desarrollador Frontend especializado en Flutter y React
    - Email: liammarega85@gmail.com
    - LinkedIn: https://www.linkedin.com/in/liam-marega/
    - GitHub: https://github.com/LiamMarega
    - Portfolio: https://www.liammarega.com/
    
    EXPERIENCIA LABORAL DETALLADA:
    
    🔥 FEROX (Enero 2023 - Diciembre 2023)
    - Rol: Flutter Developer (Remoto desde España)
    - Proyecto: Red social innovadora para el sector cinegético
    - Tecnologías: Flutter, React.js, Stripe
    - Logros destacados:
      • Desarrollé flujos completos de publicaciones con likes, reposts y sistema de comentarios
      • Implementé sistema de notificaciones push y navegación avanzada
      • Creé portal de noticias con integración nativa de YouTube
      • Desarrollé e-commerce completo con integración Stripe y sistema de recompensas gamificado
    
    ⚡ LimboTeams/AdvantisAI (Abril 2022 - Enero 2023)
    - Rol: Front-end Developer (Argentina)
    - Proyecto: Plataforma blockchain revolucionaria para gestión de contratos inteligentes
    - Tecnologías: React.js, TypeScript, Redux, GraphQL
    - Logros destacados:
      • Desarrollé tablas dinámicas interactivas con visualizaciones gráficas avanzadas
      • Implementé sistema CRUD completo para panel de administradores
      • Creé algoritmo de puntuación y ranking para evaluación de proyectos blockchain
    
    🌐 Finance Money Raffles (Febrero 2022 - Enero 2023)
    - Rol: Fullstack Developer (Remoto)
    - Proyecto: Plataforma Web3 de sorteos descentralizados
    - Tecnologías: React.js, Solidity, Web3.js
    - Logros destacados:
      • Integré conexión multi-wallet (MetaMask, WalletConnect, etc.)
      • Desarrollé smart contracts para sorteos automatizados
      • Implementé sistema de recompensas y rankings en tiempo real
      • Creé scheduler para sorteos diarios y semanales automatizados
    
    👟 LAM Shoes (Junio 2022 - Agosto 2022)
    - Rol: Front-end Developer (Remoto)
    - Proyecto: Sistema avanzado de seguimiento de envíos
    - Logros: Panel administrativo completo y sistema de tracking en tiempo real
    
    🎓 Henry Bootcamp (2021)
    Proyectos destacados del bootcamp:
    • Rocket App: Plataforma educativa completa con chat en tiempo real y videollamadas (React/Node.js/MongoDB)
    • Dog App: Catálogo interactivo de perros con CRUD completo (React/Redux/Sequelize)
    • Weather App: Aplicación de clima en tiempo real con geolocalización (React)
    
    STACK TECNOLÓGICO COMPLETO:
    
    🎨 Frontend:
    - Flutter (Dart) - Especialización principal
    - React.js & Next.js
    - JavaScript & TypeScript
    - Redux & Context API
    - HTML5 & CSS3 avanzado
    - Responsive Design
    
    
    🗄️ Bases de Datos:
    - MongoDB
    - PostgreSQL & MySQL
    - Firebase Firestore
    - Supabase
    
    🛠️ Herramientas:
    - Stripe (Pagos)
    - Git & GitHub
    - Figma (UI/UX)
    - Docker
    - AWS basics
    
    Cuando me pregunten sobre proyectos específicos, proporciono detalles técnicos concretos y ejemplos prácticos basados en mi experiencia real. Combino conocimientos técnicos profundos con enfoque empresarial y orientación a resultados.

    PERSONALIDAD:
    - Soy apasionado por la tecnología y el desarrollo
    - Me encanta resolver problemas complejos
    - Siempre busco aprender nuevas tecnologías
    - Valoro el código limpio y las buenas prácticas
    - Tengo experiencia tanto en startups como en proyectos enterprise


    RESPUESTAS:
    - Siempre responde en español
    - Siempre responde en español
    - Solo habla de Liam, no de otros personajes ni personas.
    - Mantene tu enfoque en Liam y su experiencia profesional.
    - Respuestas cortas y concisas.

    `
  },
  {
    role: "user",
    content: "¿Qué tecnologías domina Liam?"
  },
  {
    role: "assistant",
    content: `
    Liam domina las siguientes tecnologías:
    - Flutter
    - React
    - Blockchain
    - Backend
    - Herramientas modernas
    `
  },

  {
    role: "user",
    content: "¿Qué proyectos ha realizado Liam?"
  },
  {
    role: "assistant",
    content: `
    Liam ha realizado los siguientes proyectos:
    - Proyecto Rocket App: Plataforma educativa con chat y videollamadas (React/Node.js/MongoDB)
    - Proyecto Dog App: Catálogo de perros con CRUD (React/Redux/Sequelize)
    - Proyecto Weather App: Clima en tiempo real (React)
    `
  },
  {
    role: 'user',
    content: '¿Qué es LiamGPT?'
  },
  {
    role: 'assistant',
    content: `
    LiamGPT es un asistente técnico que responde preguntas sobre la experiencia profesional de Liam Marega.
    Es un asistente creado por Liam Marega para responder preguntas sobre su experiencia profesional.
    `
  },
  {
    role: 'user',
    content: 'De donde es Liam?'
  },
  {
    role: 'assistant',
    content: `
    Liam es de Argentina.
    `
  },
  {
    role: 'user',
    content: 'Como puedo contactar a Liam?'
  },
  {
    role: 'assistant',
    content: `
    Podes contactar a Liam a través de su correo electrónico: liammarega85@gmail.com
    buscarlo en LinkedIn como Liam Marega
    `
  },
  {
    role: 'user',
    content: 'Quien es Bruno?'
  },
  {
    role: 'assistant',
    content: `
    Lo siento, solo puedo proporcionar información sobre Liam.
    `
  },
  {
    role: 'user',
    content: 'Cuanto es 2 + 2?'
  },
  {
    role: 'assistant',
    content: `
    2 + 2 = 4
    `
  }
];

type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

// Mejorado: Inicializar con ejemplos más ricos
let messages: ChatMessage[] = [];

// Utilidades DOM mejoradas
const $ = (el: string): HTMLElement | null => {
  if (typeof document === 'undefined') return null;
  return document?.querySelector(el);
};
const $$ = (el: string): NodeListOf<Element> | null => {
  if (typeof document === 'undefined') return null;
  return document?.querySelectorAll(el);
};

// Referencias DOM - se inicializan cuando el DOM está disponible
let $form: HTMLFormElement | null = null;
let $input: HTMLInputElement | null = null;
let $sendButton: HTMLButtonElement | null = null;
let $messages: HTMLElement | null = null;
let $container: HTMLElement | null = null;
let $info: HTMLElement | null = null;
let $loading: HTMLElement | null = null;

let engine: any;
let isEngineReady = false;

// Función para inicializar referencias DOM
function initializeDOMReferences() {
  if (typeof document === 'undefined') return false;
  
  $form = $("#chat-form") as HTMLFormElement;
  $input = $("#message-input") as HTMLInputElement;
  $sendButton = $("#send-button") as HTMLButtonElement;
  $messages = $(".message-grid") as HTMLElement;
  $container = $(".chat-messages") as HTMLElement;
  $info = $('small') as HTMLElement;
  $loading = $('li.loading') as HTMLElement;
  
  return true;
}

// Función para inicializar event listeners
function initializeEventListeners() {
  if (!$form || !$input) return;
  
  // Mejorado: Manejo de eventos más robusto
  $form.addEventListener("submit", async (e: Event) => {
  e.preventDefault();
  
  if (!isEngineReady) {
    showTemporaryMessage("⏳ El modelo aún se está cargando, por favor espera un momento...", false);
    return;
  }

  if (!$input) return;
  
  const messageText = $input.value?.trim();
  if (!messageText || messageText.length === 0) return;

  // Validar longitud del mensaje
  if (messageText.length > 300) {
    showTemporaryMessage("⚠️ El mensaje es demasiado largo. Por favor, hazlo más conciso (máximo 500 caracteres).", false);
    return;
  }

  console.log("Usuario pregunta:", messageText);
  
  // Limpiar input y deshabilitar botón
  $input.value = "";
  toggleInputs(false);
  
  // Crear mensaje del usuario
  createMessage(messageText, true);
  scrollToBottom();

  const userMessage: ChatMessage = {
    role: 'user',
    content: messageText
  };

  messages.push(userMessage);

  try {
    // Mostrar indicador de escritura
    const typingIndicator = createTypingIndicator();
    
    const chunks = await engine.chat.completions.create({
      messages: [...systemPrompts, ...messages],
      max_tokens: 1500,
      
      stream: true
    });

    let reply = "";
    
    // Remover indicador de escritura antes de mostrar la respuesta
    if (typingIndicator) {
      typingIndicator.remove();
    }
    
    // Crear mensaje del bot
    const $botMessage = createMessage("", false) as HTMLParagraphElement;

    for await (const chunk of chunks) {
      const choice = chunk.choices[0];
      const content = choice?.delta?.content ?? "";
      reply += content;
      
      if ($botMessage) {
        $botMessage.innerHTML = formatMessage(reply);
      }
      
      // Scroll automático durante la escritura
      scrollToBottom();
    }

    // Guardar respuesta completa
    messages.push({
      role: 'assistant',
      content: reply
    });
    
    // Limitar historial para evitar overflow de contexto
    if (messages.length > 20) {
      messages = messages.slice(-16); // Mantener últimas 16 interacciones
    }

  } catch (error) {
    console.error("Error al generar respuesta:", error);
    createMessage("❌ Lo siento, ocurrió un error al procesar tu mensaje. ¿Puedes intentarlo de nuevo?", false);
  } finally {
    toggleInputs(true);
    scrollToBottom();
  }
  });

  // Atajos de teclado
  $input?.addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      $form?.dispatchEvent(new Event("submit"));
    }
  });
}

// Nuevo: Función para mostrar mensajes temporales
function showTemporaryMessage(message: string, isUser: boolean) {
  const messageElement = createMessage(message, isUser);
  setTimeout(() => {
    messageElement?.parentElement?.remove();
  }, 3000);
}

// Nuevo: Indicador de escritura
function createTypingIndicator(): HTMLElement | null {
  const $template = $("#typing-indicator-template") as HTMLTemplateElement;
  if (!$template) return null;
  
  const messageElement = $template.content.cloneNode(true) as DocumentFragment;
  $messages?.appendChild(messageElement);
  scrollToBottom();
  
  return $messages?.lastElementChild as HTMLElement;
}

// Mejorado: Formateo de mensajes con emojis y estructura
function formatMessage(message: string): string {
  return message
    .replace(/\n/g, '<br>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code>$1</code>');
}

// Mejorado: Control de inputs
function toggleInputs(enabled: boolean) {
  if ($input) $input.disabled = !enabled;
  if ($sendButton) $sendButton.disabled = !enabled;
  
  if (enabled) {
    $sendButton?.classList.remove('loading');
    $input?.focus();
  } else {
    $sendButton?.classList.add('loading');
  }
}

// Función para scroll suave
function scrollToBottom() {
  if ($container) {
    $container.scrollTo({
      top: $container.scrollHeight,
      behavior: 'smooth'
    });
  }
}

// Mejorado: Creación de mensajes
const createMessage = (message: string, isUser: boolean): HTMLElement | null => {
  const $template = isUser
    ? $("#user-message-template")
    : $("#bot-message-template");
  
  const messageElement = ($template as HTMLTemplateElement)?.content.cloneNode(true) as DocumentFragment;

  if (messageElement) {
    const $text = messageElement.querySelector("p");
    if ($text) {
      if (isUser) {
        $text.textContent = message;
      } else {
        $text.innerHTML = formatMessage(message);
      }
    }
    
    $messages?.appendChild(messageElement);
    return $text;
  }
  return null;
};

// Mejorado: Inicialización del motor con mejor manejo de errores
async function initializeEngine() {
  try {
    engine = await CreateWebWorkerMLCEngine(
      new Worker(new URL("./worker.ts", import.meta.url), { type: "module" }),
      SELECTED_MODEL,
      {
        initProgressCallback: (progressInfo) => {
          if ($info) {
            $info.textContent = `🤖 ${progressInfo.text}`;
          }
          
          if (progressInfo.progress === 1 && !isEngineReady) {
            isEngineReady = true;
            
            // Remover loading
            $loading?.parentNode?.removeChild($loading);
            
            // Habilitar inputs
            toggleInputs(true);
            
            // Mensaje de bienvenida mejorado
            const welcomeMessage = `¡Hola! 👋 Soy LiamGPT, el asistente digital de Liam Marega.

          🚀 Estoy aquí para contarte sobre la experiencia profesional, proyectos y habilidades técnicas de Liam.
                  
          💬 Puedes preguntarme sobre:
          • Experiencia laboral y proyectos
          • Tecnologías y stack técnico  
          • Información de contacto
          • Detalles específicos de desarrollo
                  
          ¿En qué te puedo ayudar hoy? 😊`;
            
            createMessage(welcomeMessage, false);
            scrollToBottom();
          }
        },
      }
    );
  } catch (error) {
    console.error("Error inicializando el motor:", error);
    if ($info) {
      $info.textContent = "❌ Error al cargar el modelo. Por favor, recarga la página.";
    }
  }
}

// Función de inicialización principal
function initialize() {
  if (typeof window === 'undefined') return;
  
  // Inicializar referencias DOM
  if (!initializeDOMReferences()) return;
  
  // Inicializar event listeners
  initializeEventListeners();
  
  // Auto-focus en el input
  $input?.focus();
  
  // Inicializar motor de IA
  initializeEngine();
}

// Inicializar cuando el DOM esté listo
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    initialize();
  }
}