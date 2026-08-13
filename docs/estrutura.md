# Estrutura de pastas

A raiz permanece enxuta: entrada (`index.html`) e configuração. Cada pasta abaixo tem um inventário por arquivo.

```
Projeto-JavaScript/
├── index.html
├── package.json
├── package-lock.json
├── playwright.config.js
├── .gitignore
├── README.md
├── assets/
├── css/
├── docs/
├── js/
│   ├── core/
│   ├── data/
│   └── pages/
├── pages/
├── tests/
├── tools/
└── .vscode/
```

## `assets/` — mídia estática

| Arquivo | Papel |
| --- | --- |
| `favicon.ico` | Ícone 32×32 para abas clássicas |
| `favicon.svg` | Ícone vetorial (qualquer tamanho) |
| `favicon-32.png` | PNG auxiliar de 32px |
| `apple-touch-icon.png` | Ícone iOS / atalho |

URLs públicas: `/assets/...`. Não deixe ícones na raiz.

## `css/` — apresentação

| Arquivo | Papel |
| --- | --- |
| `tokens.css` | Paleta, tipografia, espaços, raios |
| `styles.css` | Layout, componentes e páginas; importa `tokens.css` |

URL pública: `/css/styles.css`.

## `js/core/` — núcleo compartilhado

| Arquivo | Papel |
| --- | --- |
| `routes.js` | Mapa único de URLs e helper `salaUrl` |
| `app.js` | Sessão, XP, header, barra de status, footer, `PAGES` |

## `js/data/` — conteúdo estático

| Arquivo | Papel |
| --- | --- |
| `curriculum.js` | Trilhas, aulas, exercícios e pontuação |
| `docs-data.js` | Verbetes do léxico público |

## `js/pages/` — um script por tela

| Arquivo | Página que o carrega |
| --- | --- |
| `home.js` | `/index.html` |
| `cadastro.js` | `/pages/cadastro.html` |
| `docs.js` | `/pages/docs.html` |
| `aluno.js` | `/pages/aluno.html` |
| `sala.js` | `/pages/sala.html` |
| `exercicios.js` | `/pages/exercicios.html` |
| `evolucao.js` | `/pages/evolucao.html` |

## `pages/` — HTML interno

| Arquivo | Função |
| --- | --- |
| `cadastro.html` | Matrícula e retorno de sessão |
| `docs.html` | Documentação da linguagem (pública) |
| `aluno.html` | Painel autenticado |
| `sala.html` | Player e sumário de aulas |
| `exercicios.html` | Quiz e atividades de código |
| `evolucao.html` | Curva SVG de progresso |

A home fica em `/index.html` na raiz de propósito: é o único HTML de entrada.

## `tests/`

| Arquivo | Papel |
| --- | --- |
| `portal.spec.js` | SEO, layout, UX, trilha, docs e responsividade |

## `docs/`

Este diretório. Ver [README.md](README.md).

## `tools/`

Reservada para scripts de build, geração de ícones ou checagens. Ver `tools/README.md`.

## Fora do versionamento

`node_modules/`, `playwright-report/` e `test-results/` são gerados. Não entram no Git.
