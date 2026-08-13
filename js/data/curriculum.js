export const TRACKS = [
  {
    id: "iniciante",
    nome: "Iniciante",
    lema: "A gramática da linguagem",
    cor: "iniciante",
  },
  {
    id: "intermediario",
    nome: "Intermediário",
    lema: "O ritmo da aplicação",
    cor: "intermediario",
  },
  {
    id: "avancado",
    nome: "Avançado",
    lema: "A arquitetura por trás do runtime",
    cor: "avancado",
  },
  {
    id: "conclusao",
    nome: "Conclusão",
    lema: "Do estudo ao ofício",
    cor: "conclusao",
  },
];

export const LESSONS = [
  {
    id: "js-100s",
    track: "iniciante",
    ordem: 1,
    titulo: "JavaScript em 100 segundos",
    videoId: "DHjqpvDnNGE",
    duracao: "2 min",
    resumo:
      "Um mapa mental da linguagem: de onde veio, para que serve no navegador e por que ela é a porta de entrada da web.",
    notas:
      "JavaScript é uma linguagem interpretada, dinâmica e multi-paradigma. Neste portal ela é o único objeto de estudo — da sintaxe ao runtime.",
  },
  {
    id: "sintaxe-mosh",
    track: "iniciante",
    ordem: 2,
    titulo: "Sintaxe, console e primeiros programas",
    videoId: "W6NZfCO5SIk",
    duracao: "1 h",
    resumo: "Variáveis, tipos primitivos, operadores e o hábito de ler o que o console devolve.",
    notas:
      "Prefira const. Use let só quando o valor precisa mudar. Evite var. Nomeie no português do domínio ou em inglês consistente — nunca misture sem critério.",
  },
  {
    id: "crash-traversy",
    track: "iniciante",
    ordem: 3,
    titulo: "Crash course: do zero ao DOM",
    videoId: "hdI2bqOjy3c",
    duracao: "1 h 40 min",
    resumo: "Funções, arrays, objetos e a primeira conversa com o documento HTML.",
    notas:
      "Função é trecho reutilizável. Array guarda sequência. Objeto guarda pares chave/valor. O DOM é a árvore viva da página.",
  },
  {
    id: "fcc-fundamentos",
    track: "iniciante",
    ordem: 4,
    titulo: "Fundamentos completos (curso longo)",
    videoId: "PkZNo7MFNFg",
    duracao: "3 h",
    resumo: "A aula-âncora da trilha iniciante: condições, laços, funções e estruturas de dados.",
    notas:
      "Assista em blocos de 25 minutos. Pause e reescreva cada exemplo com as suas palavras. Conclusão desta aula libera o módulo intermediário com mais XP.",
  },
  {
    id: "dom-crash",
    track: "intermediario",
    ordem: 5,
    titulo: "DOM Crash Course",
    videoId: "0SJE9dYdpps",
    duracao: "1 h",
    resumo: "Seleção de nós, eventos, criação de elementos e a interface como estado.",
    notas:
      "querySelector encontra. addEventListener escuta. createElement constrói. textContent é mais seguro que innerHTML para texto puro.",
  },
  {
    id: "async-crash",
    track: "intermediario",
    ordem: 6,
    titulo: "Assincronismo: callbacks, promises e async/await",
    videoId: "PoRJizFvM7s",
    duracao: "25 min",
    resumo: "Por que o JavaScript não espera — e como você espera com elegância.",
    notas:
      "Callback é função passada para ser chamada depois. Promise representa um valor futuro. async/await é açúcar que lê como código síncrono.",
  },
  {
    id: "event-loop",
    track: "avancado",
    ordem: 7,
    titulo: "O event loop, explicado",
    videoId: "8aGhZQkoFbQ",
    duracao: "27 min",
    resumo: "Call stack, task queue e microtasks: o relógio interno do runtime.",
    notas:
      "JavaScript é single-thread no seu código. Concorrência nasce da fila de tarefas. Promises entram na microtask queue — por isso resolvem antes de setTimeout(0).",
  },
  {
    id: "algoritmos-fcc",
    track: "conclusao",
    ordem: 8,
    titulo: "Algoritmos e estruturas — projeto de conclusão",
    videoId: "jS4aFq5-91M",
    duracao: "3 h",
    resumo: "A prova prática: resolver problemas, nomear bem e entregar um raciocínio visível.",
    notas:
      "Conclusão do Códice: escolha um kata, escreva testes mentais, implemente, refatore. Marque a aula só quando o exercício final da trilha estiver verde.",
  },
];

export const EXERCISES = [
  {
    id: "ex-tipos",
    aulaId: "sintaxe-mosh",
    track: "iniciante",
    tipo: "quiz",
    titulo: "Tipos e declarações",
    enunciado: "Qual declaração cria uma vinculação que não pode ser reatribuída?",
    opcoes: ["var nome = 'Ada'", "let nome = 'Ada'", "const nome = 'Ada'", "nome := 'Ada'"],
    correta: 2,
    explicacao: "const impede reatribuição da variável. O valor interno de objetos ainda pode mutar.",
  },
  {
    id: "ex-array",
    aulaId: "crash-traversy",
    track: "iniciante",
    tipo: "codigo",
    titulo: "Dobrar valores",
    enunciado:
      "Implemente dobrar(lista) que recebe um array de números e devolve outro array com cada valor multiplicado por 2. Não mutar o original.",
    starter: "function dobrar(lista) {\n  // seu código\n}\n",
    testes: [
      { args: [[1, 2, 3]], esperado: [2, 4, 6] },
      { args: [[]], esperado: [] },
    ],
  },
  {
    id: "ex-dom",
    aulaId: "dom-crash",
    track: "intermediario",
    tipo: "quiz",
    titulo: "Eventos do documento",
    enunciado: "Qual método registra um ouvinte sem sobrescrever outros ouvintes já existentes?",
    opcoes: [
      "elemento.onclick = fn",
      "elemento.addEventListener('click', fn)",
      "elemento.attach('click', fn)",
      "document.on('click', fn)",
    ],
    correta: 1,
    explicacao: "addEventListener empilha ouvintes. A propriedade onclick substitui o anterior.",
  },
  {
    id: "ex-promise",
    aulaId: "async-crash",
    track: "intermediario",
    tipo: "codigo",
    titulo: "Somar depois",
    enunciado:
      "Implemente somarDepois(a, b) que devolve uma Promise resolvida com a + b após usar Promise.resolve (sem setTimeout).",
    starter: "function somarDepois(a, b) {\n  // seu código\n}\n",
    testes: [
      { args: [2, 3], esperado: 5, async: true },
      { args: [10, -4], esperado: 6, async: true },
    ],
  },
  {
    id: "ex-loop",
    aulaId: "event-loop",
    track: "avancado",
    tipo: "quiz",
    titulo: "Fila de microtasks",
    enunciado: "O que costuma rodar primeiro: uma Promise resolvida ou um setTimeout(fn, 0)?",
    opcoes: [
      "setTimeout, sempre",
      "A Promise (microtask) antes do timeout (macrotask)",
      "Depende do navegador, sem regra",
      "Os dois no mesmo instante",
    ],
    correta: 1,
    explicacao:
      "Depois da stack esvaziar, o motor drena a microtask queue (Promises) antes da próxima macrotask (timeouts).",
  },
  {
    id: "ex-final",
    aulaId: "algoritmos-fcc",
    track: "conclusao",
    tipo: "codigo",
    titulo: "Palíndromo",
    enunciado:
      "Implemente ehPalindromo(texto) que ignore espaços e maiúsculas. 'Roma me tem amor' deve ser verdadeiro.",
    starter: "function ehPalindromo(texto) {\n  // seu código\n}\n",
    testes: [
      { args: ["ovo"], esperado: true },
      { args: ["Roma me tem amor"], esperado: true },
      { args: ["Códice"], esperado: false },
    ],
  },
];

export const XP_AULA = 50;
export const XP_EXERCICIO = 40;
export const XP_POR_NIVEL = 200;

export function lessonsByTrack(trackId) {
  return LESSONS.filter((lesson) => lesson.track === trackId);
}

export function lessonById(id) {
  return LESSONS.find((lesson) => lesson.id === id) ?? LESSONS[0];
}

export function nextLesson(currentId) {
  const index = LESSONS.findIndex((lesson) => lesson.id === currentId);
  return LESSONS[Math.min(index + 1, LESSONS.length - 1)];
}

export function prevLesson(currentId) {
  const index = LESSONS.findIndex((lesson) => lesson.id === currentId);
  return LESSONS[Math.max(index - 1, 0)];
}
