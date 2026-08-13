# Convenções

## O que pode ficar na raiz

Somente entrada e configuração: `index.html`, `package.json`, `package-lock.json`, `playwright.config.js`, `.gitignore`, `README.md`.

Não coloque na raiz: páginas internas, CSS, scripts, favicons, relatórios ou rascunhos.

## Nova página

1. Crie `pages/<nome>.html` com os mesmos `link` absolutos de assets e CSS das outras telas.
2. Crie `js/pages/<nome>.js` e importe o núcleo de `../core/app.js`.
3. Registre a URL em `js/core/routes.js`.
4. Se a tela entra no menu, acrescente em `PAGES` dentro de `js/core/app.js`.
5. Atualize `tests/portal.spec.js` e o inventário em `docs/estrutura.md`.

## Novo script compartilhado

- Lógica de sessão, chrome ou pontuação → `js/core/`.
- Listas de aulas, exercícios ou verbetes → `js/data/`.
- Comportamento de uma tela só → `js/pages/`.

## Novo asset

Coloque o arquivo em `assets/` e referencie `/assets/<arquivo>`. Atualize o teste de favicon se o ícone público mudar.

## Links

No JavaScript, use `ROUTES` ou `salaUrl()` de `js/core/routes.js`. Evite strings soltas (`"sala.html"`).

No HTML estático, use o caminho absoluto (`/pages/sala.html`).

## Imports

```js
import { initShell } from "../core/app.js";
import { ROUTES } from "../core/routes.js";
import { LESSONS } from "../data/curriculum.js";
```

Caminhos de `import` são relativos ao arquivo `.js`, não à URL da página.

## Testes

Novas rotas públicas entram em `PUBLIC_PAGES`. Telas autenticadas passam por `matricular()` antes do `goto`.
