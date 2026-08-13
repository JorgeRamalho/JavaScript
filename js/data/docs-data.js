export const DOCS = [
  {
    id: "tipos",
    track: "iniciante",
    titulo: "Tipos e valores",
    kicker: "A gramática",
    aulaId: "sintaxe-mosh",
    tags: ["typeof", "primitivos", "null", "undefined"],
    resumo: "Sete tipos primitivos e o tipo object. O valor e o tipo não são a mesma coisa.",
    blocos: [
      {
        tipo: "p",
        texto:
          "JavaScript distingue valor de tipo. typeof devolve uma string com o nome do tipo — e mente em um caso célebre: typeof null === \"object\", herança da primeira implementação.",
      },
      {
        tipo: "h3",
        texto: "Primitivos",
      },
      {
        tipo: "lista",
        itens: [
          "string — texto entre aspas simples, duplas ou crases.",
          "number — inteiros e decimais no mesmo tipo; NaN também é number.",
          "bigint — inteiros sem teto de 2⁵³, escritos com n: 10n.",
          "boolean — true ou false.",
          "undefined — ausência de valor atribuído.",
          "null — ausência intencional.",
          "symbol — identificador único, raro no início.",
        ],
      },
      {
        tipo: "code",
        caption: "Ler o tipo sem se deixar enganar por null",
        codigo: `typeof "Códice"      // "string"
typeof 42            // "number"
typeof undefined     // "undefined"
typeof null          // "object"  ← exceção histórica
Array.isArray([])    // true
Number.isNaN(NaN)    // true`,
      },
      {
        tipo: "nota",
        texto:
          "Não compare com == quando os tipos podem divergir. Prefira ===. Para arrays, use Array.isArray — typeof [] é \"object\".",
      },
    ],
  },
  {
    id: "declaracoes",
    track: "iniciante",
    titulo: "const, let e var",
    kicker: "Vinculações",
    aulaId: "sintaxe-mosh",
    tags: ["const", "let", "var", "escopo", "hoisting"],
    resumo: "Três jeitos de nomear um valor. No Códice, const é o padrão; let é a exceção; var é o arquivo morto.",
    blocos: [
      {
        tipo: "p",
        texto:
          "Uma declaração cria uma vinculação entre um nome e um valor. const impede reatribuir o nome. let permite. var ignora bloco e hoje só aparece em código legado.",
      },
      {
        tipo: "code",
        caption: "Escopo de bloco",
        codigo: `const trilha = "iniciante";
let xp = 0;

if (true) {
  const trilha = "avançado"; // outra vinculação
  xp = 40;
}

// trilha continua "iniciante"
// xp vale 40`,
      },
      {
        tipo: "lista",
        itens: [
          "const em objetos não congela o conteúdo: o nome não muda, as propriedades podem.",
          "let e const não existem antes da linha (Temporal Dead Zone).",
          "var é içada e pertence à função inteira — fonte clássica de bugs em laços.",
        ],
      },
      {
        tipo: "nota",
        texto: "Se o valor precisa mudar, o nome já denuncia: let indice, let tentativas. O resto é const.",
      },
    ],
  },
  {
    id: "funcoes",
    track: "iniciante",
    titulo: "Funções",
    kicker: "Trechos reutilizáveis",
    aulaId: "crash-traversy",
    tags: ["function", "arrow", "retorno", "parâmetros"],
    resumo: "Função é um valor que se executa. Declaração, expressão e seta não são sinônimos em todos os detalhes.",
    blocos: [
      {
        tipo: "p",
        texto:
          "A declaração function nome() {} é içada. A expressão const nome = function () {} não é. A seta const nome = () => {} não tem this próprio nem arguments.",
      },
      {
        tipo: "code",
        caption: "Três formas, um contrato",
        codigo: `function dobrar(n) {
  return n * 2;
}

const triplicar = function (n) {
  return n * 3;
};

const metade = (n) => n / 2;`,
      },
      {
        tipo: "nota",
        texto:
          "Se a função não devolve nada, o retorno é undefined. return sem valor também. Arrow de uma expressão retorna essa expressão; com chaves, o return precisa ser explícito.",
      },
    ],
  },
  {
    id: "arrays",
    track: "iniciante",
    titulo: "Arrays e transformação",
    kicker: "Sequências",
    aulaId: "crash-traversy",
    tags: ["map", "filter", "reduce", "imutabilidade"],
    resumo: "Array é lista ordenada. No Códice, preferimos métodos que devolvem lista nova em vez de mutar a original.",
    blocos: [
      {
        tipo: "p",
        texto:
          "map transforma cada item. filter escolhe. reduce acumula. slice copia. push e splice alteram o original — use só quando a mutação for o objetivo.",
      },
      {
        tipo: "code",
        caption: "Dobrar sem mutar",
        codigo: `const origem = [1, 2, 3];
const dobro = origem.map((n) => n * 2);
// origem continua [1, 2, 3]
// dobro é [2, 4, 6]

const pares = origem.filter((n) => n % 2 === 0);
const soma = origem.reduce((acc, n) => acc + n, 0);`,
      },
      {
        tipo: "nota",
        texto:
          "A oficina pede exatamente isso em dobrar(lista): devolver outro array. Mutar o argumento falha o espírito do exercício mesmo que o retorno coincida.",
      },
    ],
  },
  {
    id: "objetos",
    track: "iniciante",
    titulo: "Objetos e destruturação",
    kicker: "Pares chave/valor",
    aulaId: "crash-traversy",
    tags: ["objeto", "destruturação", "spread", "referência"],
    resumo: "Objeto guarda propriedades. Atribuição copia a referência, não o conteúdo.",
    blocos: [
      {
        tipo: "p",
        texto:
          "Dois nomes apontando para o mesmo objeto veem a mesma mutação. Para copiar o primeiro nível, use spread: const copia = { ...original }.",
      },
      {
        tipo: "code",
        caption: "Ler com destruturação",
        codigo: `const aula = { id: "tipos", track: "iniciante", xp: 50 };
const { id, track } = aula;
const eco = { ...aula, xp: 90 };`,
      },
    ],
  },
  {
    id: "dom",
    track: "intermediario",
    titulo: "DOM e seleção",
    kicker: "A árvore da página",
    aulaId: "dom-crash",
    tags: ["querySelector", "textContent", "createElement"],
    resumo: "O DOM é o documento vivo. Selecionar, ler, criar e inserir nós é o ofício da interface.",
    blocos: [
      {
        tipo: "lista",
        itens: [
          "document.querySelector(css) — o primeiro que casar.",
          "document.querySelectorAll(css) — NodeList, não Array. Converta com [...lista] se precisar de map.",
          "textContent — texto puro, seguro contra injeção.",
          "innerHTML — interpreta marcação; só com conteúdo em que você confia.",
        ],
      },
      {
        tipo: "code",
        caption: "Criar um nó e anexar",
        codigo: `const nota = document.createElement("p");
nota.className = "legend";
nota.textContent = "Aula marcada.";
document.querySelector("main").append(nota);`,
      },
    ],
  },
  {
    id: "eventos",
    track: "intermediario",
    titulo: "Eventos",
    kicker: "O documento escuta",
    aulaId: "dom-crash",
    tags: ["addEventListener", "preventDefault", "delegação"],
    resumo: "addEventListener empilha ouvintes. A propriedade onclick substitui o anterior.",
    blocos: [
      {
        tipo: "p",
        texto:
          "O evento sobe da origem até o document (bubbling). Dá para ouvir no pai e decidir pelo event.target — delegação, útil em listas que crescem.",
      },
      {
        tipo: "code",
        caption: "Ouvinte que não apaga os outros",
        codigo: `const botao = document.querySelector("[data-complete]");
botao.addEventListener("click", (evento) => {
  evento.preventDefault();
  // marcar aula
});`,
      },
      {
        tipo: "nota",
        texto: "Na oficina, a questão objetiva desta trilha cobra exatamente addEventListener versus onclick.",
      },
    ],
  },
  {
    id: "async",
    track: "intermediario",
    titulo: "Promises e async/await",
    kicker: "O valor futuro",
    aulaId: "async-crash",
    tags: ["Promise", "async", "await", "then", "catch"],
    resumo: "Promise representa um valor que ainda não chegou. async/await lê esse valor como se a linha esperasse.",
    blocos: [
      {
        tipo: "p",
        texto:
          "Estados: pending, fulfilled, rejected. then encadeia o sucesso. catch, a falha. await só existe dentro de async function (ou módulo de topo, nos runtimes modernos).",
      },
      {
        tipo: "code",
        caption: "Somar depois, sem setTimeout",
        codigo: `function somarDepois(a, b) {
  return Promise.resolve(a + b);
}

async function usar() {
  const total = await somarDepois(2, 3);
  return total; // 5
}`,
      },
      {
        tipo: "nota",
        texto:
          "await em uma Promise rejeitada lança. Envolva em try/catch. Nunca ignore uma Promise — o erro some no vazio.",
      },
    ],
  },
  {
    id: "fetch",
    track: "intermediario",
    titulo: "Fetch e JSON",
    kicker: "Conversar com a rede",
    aulaId: "async-crash",
    tags: ["fetch", "json", "HTTP", "headers"],
    resumo: "fetch devolve Promise de Response. O corpo ainda precisa ser lido: .json() ou .text().",
    blocos: [
      {
        tipo: "code",
        caption: "GET e leitura do corpo",
        codigo: `const resposta = await fetch("/api/aulas");
if (!resposta.ok) {
  throw new Error(\`HTTP \${resposta.status}\`);
}
const aulas = await resposta.json();`,
      },
      {
        tipo: "lista",
        itens: [
          "resposta.ok é true para 200–299. 404 não lança sozinho.",
          "JSON.parse lê string. JSON.stringify escreve string.",
          "POST pede method, headers e body em string.",
        ],
      },
    ],
  },
  {
    id: "event-loop",
    track: "avancado",
    titulo: "Event loop",
    kicker: "O relógio do runtime",
    aulaId: "event-loop",
    tags: ["call stack", "microtask", "macrotask", "setTimeout"],
    resumo: "Uma thread de JavaScript. Concorrência nasce das filas, não de threads no seu código.",
    blocos: [
      {
        tipo: "p",
        texto:
          "A call stack executa o que está na frente. Quando esvazia, o motor drena a fila de microtasks (Promises) antes da próxima macrotask (setTimeout, eventos de UI).",
      },
      {
        tipo: "code",
        caption: "Ordem clássica",
        codigo: `console.log("A");
setTimeout(() => console.log("C"), 0);
Promise.resolve().then(() => console.log("B"));
console.log("D");
// A, D, B, C`,
      },
      {
        tipo: "nota",
        texto:
          "Por isso uma Promise resolvida passa na frente de setTimeout(fn, 0). A oficina avançada pergunta exatamente isso.",
      },
    ],
  },
  {
    id: "closures",
    track: "avancado",
    titulo: "Closures",
    kicker: "Memória da função",
    aulaId: "event-loop",
    tags: ["closure", "escopo", "fábrica"],
    resumo: "Uma função lembra o escopo onde foi criada, mesmo depois desse escopo ter \"acabado\".",
    blocos: [
      {
        tipo: "code",
        caption: "Contador encapsulado",
        codigo: `function criarContador() {
  let n = 0;
  return function proximo() {
    n += 1;
    return n;
  };
}

const tick = criarContador();
tick(); // 1
tick(); // 2`,
      },
      {
        tipo: "p",
        texto:
          "n não é global. Só o retorno de criarContador o vê. É o mecanismo por trás de fábricas, módulos antigos e de muito estado em interface.",
      },
    ],
  },
  {
    id: "modulos",
    track: "conclusao",
    titulo: "Módulos ES",
    kicker: "Arquivos como contrato",
    aulaId: "algoritmos-fcc",
    tags: ["import", "export", "type=module"],
    resumo: "O Códice inteiro é um conjunto de módulos. Cada arquivo exporta o que o outro pode importar.",
    blocos: [
      {
        tipo: "code",
        caption: "O padrão deste portal",
        codigo: `// js/data/curriculum.js
export const LESSONS = [ /* ... */ ];
export function lessonById(id) { /* ... */ }

// js/pages/docs.js
import { LESSONS } from "../data/curriculum.js";`,
      },
      {
        tipo: "lista",
        itens: [
          "O script no HTML precisa de type=\"module\".",
          "import é estático e içado; caminhos são relativos ao arquivo.",
          "export default existe, mas named exports deixam o contrato visível.",
        ],
      },
      {
        tipo: "nota",
        texto:
          "Módulo roda em modo estrito. this no topo é undefined. Variáveis do arquivo não vazam para o window.",
      },
    ],
  },
  {
    id: "erros",
    track: "conclusao",
    titulo: "Erros e palíndromos",
    kicker: "Ofício final",
    aulaId: "algoritmos-fcc",
    tags: ["try", "catch", "throw", "algoritmo"],
    resumo: "throw interrompe. try/catch contém. O exercício de conclusão pede um predicado claro, não um truque.",
    blocos: [
      {
        tipo: "code",
        caption: "Normalizar antes de comparar",
        codigo: `function ehPalindromo(texto) {
  const limpo = texto.toLowerCase().replaceAll(" ", "");
  return limpo === [...limpo].reverse().join("");
}

ehPalindromo("Roma me tem amor"); // true`,
      },
      {
        tipo: "p",
        texto:
          "Ignorar maiúsculas e espaços é parte do enunciado. Teste o caso curto (\"ovo\"), o caso com frase e o caso que deve falhar (\"Códice\").",
      },
    ],
  },
];
