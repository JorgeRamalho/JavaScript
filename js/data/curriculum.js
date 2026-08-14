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
    titulo: "O que o JavaScript é capaz de fazer",
    videoId: "1-w1RfGIov4",
    duracao: "11 min",
    resumo:
      "Abertura do Curso em Vídeo com o Prof. Gustavo Guanabara: o que o JavaScript faz no navegador e por que ele é a porta de entrada da web.",
    notas:
      "Trilha oficial do Curso em Vídeo. Assista na ordem da playlist, pause e refaça cada exemplo no seu computador.",
  },
  {
    id: "sintaxe-mosh",
    track: "iniciante",
    ordem: 2,
    titulo: "Criando o seu primeiro script",
    videoId: "OmmJBfcMJA8",
    duracao: "aula #04",
    resumo: "Do HTML ao primeiro arquivo .js: onde o script vive e como o navegador o executa.",
    notas:
      "Prefira const. Use let só quando o valor precisa mudar. Evite var. Nomeie com critério e teste no console a cada linha.",
  },
  {
    id: "crash-traversy",
    track: "iniciante",
    ordem: 3,
    titulo: "Variáveis e tipos primitivos",
    videoId: "Vbabsye7mWo",
    duracao: "aula #05",
    resumo: "Number, string e boolean: como guardar valor, nomear bem e ler o que o programa devolve.",
    notas:
      "Função é trecho reutilizável. Array guarda sequência. Objeto guarda pares chave/valor. Comece pelos primitivos desta aula.",
  },
  {
    id: "fcc-fundamentos",
    track: "iniciante",
    ordem: 4,
    titulo: "Tratamento de dados",
    videoId: "OJgu_KCCUSY",
    duracao: "aula #06",
    resumo: "Converter, formatar e exibir dados: Number, String e o diálogo com o usuário.",
    notas:
      "Assista em blocos. Pause e reescreva cada exemplo com as suas palavras. Conclusão desta aula libera o módulo intermediário com mais XP.",
  },
  {
    id: "dom-crash",
    track: "intermediario",
    ordem: 5,
    titulo: "Introdução ao DOM",
    videoId: "WWZX8RWLxIk",
    duracao: "aula #09",
    resumo: "A árvore do documento: window, document, seleção de nós e a primeira conversa com o HTML.",
    notas:
      "querySelector encontra. addEventListener escuta. createElement constrói. textContent é mais seguro que innerHTML para texto puro.",
  },
  {
    id: "async-crash",
    track: "intermediario",
    ordem: 6,
    titulo: "Condições (parte 1)",
    videoId: "cOdG4eACN2A",
    duracao: "aula #11",
    resumo: "if, else e o fluxo que decide: condições simples e compostas no JavaScript.",
    notas:
      "Compare com ===. Leia a condição em voz alta antes de escrever o bloco. Depois, ligue o mesmo raciocínio a um campo do formulário.",
  },
  {
    id: "event-loop",
    track: "avancado",
    ordem: 7,
    titulo: "Repetições (parte 1)",
    videoId: "5rZqYPKIwkY",
    duracao: "aula #13",
    resumo: "while e do...while: fazer o mesmo trecho várias vezes sem copiar código.",
    notas:
      "Todo laço precisa de condição de parada. Teste o contador no console. for entra na sequência da playlist — pratique os três.",
  },
  {
    id: "algoritmos-fcc",
    track: "conclusao",
    ordem: 8,
    titulo: "Próximos passos",
    videoId: "roP93FA-NgU",
    duracao: "aula #17",
    resumo: "Encerramento do curso básico: o que já foi coberto e para onde seguir depois do Guanabara.",
    notas:
      "Conclusão do Códice: revise os PDFs e os exercícios do repositório oficial, marque a aula e feche a oficina com o desafio final.",
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
