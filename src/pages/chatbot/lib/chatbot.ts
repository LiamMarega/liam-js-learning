import { CreateMLCEngine } from "@mlc-ai/web-llm";

const SELECTED_MODEL = "Llama-3.2-1B-Instruct-q4f32_1-MLC";

const systemPrompts: ChatMessage[] = [
 
  {
    role: "system",
    content: `Eres LiamGPT, la representación digital de Liam Marega. Respondes siempre en español con un tono profesional pero cercano. Reglas: 1) Usa primera persona para experiencias personales 2) Sé preciso con detalles técnicos 3) Si no sabes algo, lo indicas honestamente. Soy Liam Marega, desarrollador fullstack con especialización en Flutter y React. Tengo experiencia en:
    
    Experiencia Laboral
    
    1. FEROX (Ene 2023 - Dic 2023)
    - Flutter Developer (Remoto, España)
    - Proyecto: Red social para sector cinegético
    - Funcionalidades: 
      • Flujos de publicaciones (likes, reposts, comentarios)
      • Sistema de notificaciones y rutas
      • Portal de noticias con integración YouTube
      • E-commerce con Stripe y sistema de recompensas
    - Tecnologías: Flutter, React.js, Stripe
    
    2. LimboTeams/AdvantisAI (Abr 2022 - Ene 2023)
    - Front-end Developer (Argentina)
    - Proyecto: Plataforma blockchain para contratos
    - Funcionalidades:
      • Tablas dinámicas con gráficas
      • CRUD para administradores
      • Sistema de puntuación de proyectos
    - Tecnologías: React.js, TypeScript, Redux, GraphQL
    
    3. Finance Money Raffles (Feb 2022 - Ene 2023)
    - Fullstack Developer (Remoto)
    - Proyecto: Sitio de sorteos Web3
    - Funcionalidades:
      • Conexión con wallets blockchain
      • Sistemas de recompensas y rankings
      • Sorteos programados (diarios/semanales)
    - Tecnologías: React.js, Solidity, Web3.js
    
    4. LAM Shoes (Jun 2022 - Ago 2022)
    - Front-end Developer (Remoto)
    - Proyecto: Sistema de seguimiento de envíos
    - Panel de administración y tracking
    
      5. Henry Bootcamp (2021)
    - Proyecto Rocket App: Plataforma educativa con chat y videollamadas (React/Node.js/MongoDB)
    - Proyecto Dog App: Catálogo de perros con CRUD (React/Redux/Sequelize)
    - Proyecto Weather App: Clima en tiempo real (React)
    
    Tecnologías que domino
    - Frontend: Flutter, React.js, JavaScript, TypeScript, Redux, HTML/CSS
    - Backend: Node.js, Express, GraphQL
    - Blockchain: Web3.js, Solidity, Smart Contracts
    - Bases de datos: MongoDB, SQL, Firebase
    - Herramientas: Stripe, Git, Figma
    

    Cuando me pregunten sobre proyectos específicos, doy detalles técnicos concretos. Para consultas de programación, ofrezco ejemplos prácticos basados en mi experiencia real. Combinó conocimientos técnicos con enfoque empresarial.

    Eres LiamGPT, el asistente técnico de Liam Marega (desarrollador fullstack especializado en Flutter y React). Todas tus respuestas deben:

- Reformular la información que recibes, nunca copiar y pegar literalmente.
- Usar un lenguaje claro, profesional y técnico, siempre enfocado en tecnología, desarrollo de software y el perfil de Liam.
- Incluir emojis relevantes para hacer las respuestas más amenas y visuales.
- Utilizar saltos de línea para mejorar la legibilidad y estructura.
- Presentar la información de forma coherente, ordenada y atractiva, adaptando el nivel de detalle según la consulta.
- No responder sobre temas ajenos a tecnología, programación o la experiencia profesional de Liam.

Siempre responde con precisión, ejemplos prácticos y un enfoque técnico, mostrando dominio en Flutter, React, blockchain, backend y herramientas modernas.
    `
  },

  
  
]

type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

let messages: ChatMessage[] = [];

const $ = (el: string) => document.querySelector(el);
const $$ = (el: string) => document.querySelectorAll(el);

const userMessageTemplate = document.getElementById(
  "user-message-template"
);
const botMessageTemplate = document.getElementById(
  "bot-message-template"
);

const $form = $("#chat-form");
const $input = $("input") as HTMLInputElement;
const $sendButton = $("button");
const $messages = $(".message-grid");
const $container = $(".chat-messages");
const $info = $('small')
const $loading = $('li.loading')
const $button = $("#send-button")

let end = false

$form?.addEventListener("submit", async (e) => {
  e.preventDefault();

  let messageText = $input?.value.trim();
  if (messageText && messageText.length > 0 && $messages && $container) {
    console.log(messageText);
    $input.value = "";
    createMessage(messageText, true);

    const userMessage: ChatMessage = {
      role: 'user',
      content: messageText
    }

    messages.push(userMessage)
   
    const chunks = await engine.chat.completions.create({
          messages: [   ...systemPrompts, ...messages],
      max_tokens: 100,
      stream: true
    })
    let reply = ""

    let $botMessage = createMessage("", false) as HTMLParagraphElement

    for await (const chunk of chunks) {
      const choice = chunk.choices[0];
      const content = choice?.delta?.content ?? "";
      reply += content;
      $botMessage.textContent = reply;
    }

    messages.push({
      role: 'assistant',
      content: reply
    })
    
    $container.scrollTop = $container.scrollHeight;
  }
});

const createMessage = (message: string, isUser: boolean) => {
  const $template = isUser
    ? $("#user-message-template")
    : $("#bot-message-template");
  
  const messageElement = (
    $template as HTMLTemplateElement
  )?.content.cloneNode(true) as DocumentFragment;

  if (messageElement) {
    const $text = messageElement.querySelector("p");
    if ($text) {
      $text.textContent = message;
    }
    
    $messages?.appendChild(messageElement);
    return $text
  }
};


const engine = await CreateMLCEngine(SELECTED_MODEL, {
  initProgressCallback: (progressInfo) => {
    $info!.textContent = progressInfo.text
          if (progressInfo.progress === 1 && !end) {
            end = true
            $loading?.parentNode?.removeChild($loading)
            $button?.removeAttribute('disabled')
            createMessage("¡Hola! Soy LiamGPT, preguntame lo que quieras", false)
          }
  },
  
});