# Códice JS

Portal de estudos de JavaScript — do primeiro tipo à conclusão da trilha. Site estático (HTML, CSS e módulos ES), com sessão no `localStorage` e testes Playwright.

## Começar

```bash
npm install
npm run dev
```

Abre [http://127.0.0.1:4173](http://127.0.0.1:4173). A entrada do site é `index.html`.

```bash
npm test
```

## Raiz enxuta

Na raiz ficam só entrada e configuração:

| Arquivo | Papel |
| --- | --- |
| `index.html` | Página inicial (entrada pública) |
| `package.json` | Scripts e dependências de desenvolvimento |
| `package-lock.json` | Travamento de versões |
| `playwright.config.js` | Servidor de teste, projetos desktop/mobile |
| `.gitignore` | Ignora `node_modules`, relatórios e artefatos |
| `README.md` | Este guia |

O restante vive em pastas por responsabilidade. O mapa completo está em [`docs/estrutura.md`](docs/estrutura.md).

## Pastas

| Pasta | Conteúdo |
| --- | --- |
| [`pages/`](pages/) | Páginas HTML internas |
| [`js/`](js/) | Núcleo, dados e scripts por página |
| [`css/`](css/) | Tokens e folha principal |
| [`assets/`](assets/) | Favicons e ícones |
| [`tests/`](tests/) | Especificações Playwright |
| [`docs/`](docs/) | Documentação do repositório |
| [`tools/`](tools/) | Scripts auxiliares (reservada) |
| `.vscode/` | Preferências locais do editor |

## Rotas

Caminhos canônicos estão em `js/core/routes.js`. Não espalhe nomes de arquivo soltos nos scripts.

| URL | Página |
| --- | --- |
| `/index.html` | Início |
| `/pages/cadastro.html` | Matrícula e login |
| `/pages/docs.html` | Léxico da linguagem |
| `/pages/aluno.html` | Área do aluno (autenticada) |
| `/pages/sala.html` | Sala de aula (autenticada) |
| `/pages/exercicios.html` | Oficina (autenticada) |
| `/pages/evolucao.html` | Curva de aprendizado (autenticada) |

## Documentação

1. [Estrutura de pastas](docs/estrutura.md)
2. [Arquitetura](docs/arquitetura.md)
3. [Convenções](docs/convencoes.md)
