# Arquitetura

Códice JS é um site estático servido da raiz do repositório (`npx serve . -p 4173`). Não há bundler nem backend: o navegador resolve módulos ES e o estado vive no `localStorage`.

## Camadas

```
HTML (index.html + pages/)
        │
        ▼
js/pages/*  ──►  js/core/app.js  ──►  js/data/*
        │              │
        │              ▼
        └──────► js/core/routes.js
```

1. **Marcação** — cada tela declara shell (`header`, barra de status, `main`, `footer`) e pontos `data-*`.
2. **Página** — o script em `js/pages/` preenche a tela e liga eventos.
3. **Núcleo** — `app.js` autentica, calcula XP/liga e desenha chrome compartilhado.
4. **Rotas** — `routes.js` é a única fonte de caminhos. Links e `location.href` passam por ele.
5. **Dados** — currículo e verbetes são módulos exportados, sem fetch.

## Sessão

| Chave | Conteúdo |
| --- | --- |
| `codice.users` | Lista de alunos (hash SHA-256 da senha) |
| `codice.session` | E-mail da sessão ativa |

`requireAuth()` redireciona para `/pages/cadastro.html?modo=entrar&next=...` quando não há sessão. O `next` é o `pathname` atual, para voltar à tela pedida.

## Folha de estilo

`styles.css` importa `tokens.css`. As páginas apontam só para `/css/styles.css`. Tokens (`--gold`, `--font-display`, `--grad-aurora`) alimentam a identidade e os testes de tipografia.

## Testes

Playwright sobe o mesmo servidor da pasta raiz (`playwright.config.js`). Os specs usam URLs absolutas a partir de `/` (`/index.html`, `/pages/sala.html`, `/assets/favicon.svg`).

## Por que esta forma

- **Raiz enxuta** — HTML interno não compete com `package.json` e `index.html`.
- **Um arquivo, um lugar** — página, script e dado não se misturam.
- **Caminhos absolutos no HTML** (`/css/...`, `/js/pages/...`, `/assets/...`) — a profundidade da pasta não quebra o link.
- **Imports relativos no JS** — o navegador resolve módulos a partir do arquivo, não da URL da página.
