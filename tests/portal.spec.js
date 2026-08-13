const { test, expect } = require("@playwright/test");

const PUBLIC_PAGES = [
  {
    path: "/index.html",
    title: /Códice JS/i,
    h1: /arquivo vivo/i,
    description: /JavaScript/i,
  },
  {
    path: "/cadastro.html",
    title: /Cadastro/i,
    h1: /matrícula|sessão/i,
    description: /matrícula|aluno/i,
  },
  {
    path: "/docs.html",
    title: /Documentação/i,
    h1: /léxico da linguagem/i,
    description: /Documentação de JavaScript/i,
  },
];

const STATUS_LABELS = [
  "Aluno",
  "Nível",
  "XP",
  "Progresso",
  "Trilha",
  "Aula atual",
  "Aulas",
  "Exercícios",
  "Sequência",
  "Tempo",
  "Liga",
  "Conquistas",
  "Objetivo",
];

async function matricular(page, suffix = `${Date.now()}-${Math.random().toString(16).slice(2)}`) {
  const email = `ada.${suffix}@codice.js`;
  await page.goto("/cadastro.html");
  await page.getByLabel("Nome completo").fill("Ada Lovelace");
  await page.getByLabel("E-mail").fill(email);
  await page.getByLabel("Senha", { exact: true }).fill("helixjs");
  await page.getByLabel("Confirmar senha").fill("helixjs");
  await page.getByLabel("Objetivo").selectOption("Construir interfaces");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Criar área do aluno" }).click();
  await expect(page).toHaveURL(/aluno/);
  return email;
}

test.describe("SEO", () => {
  for (const pageMeta of PUBLIC_PAGES) {
    test(`${pageMeta.path} tem título, descrição, idioma e um H1`, async ({ page }) => {
      await page.goto(pageMeta.path);
      await expect(page).toHaveTitle(pageMeta.title);
      await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
      const description = page.locator('meta[name="description"]');
      await expect(description).toHaveAttribute("content", pageMeta.description);
      const content = await description.getAttribute("content");
      expect(content.length).toBeGreaterThan(50);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("h1")).toHaveText(pageMeta.h1);
      await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
      await expect(page.locator('meta[name="viewport"]')).toHaveAttribute(
        "content",
        /width=device-width/
      );
    });
  }

  test("home publica dados estruturados de Course", async ({ page }) => {
    await page.goto("/index.html");
    const jsonLd = await page.locator('script[type="application/ld+json"]').textContent();
    const data = JSON.parse(jsonLd);
    expect(data["@type"]).toBe("Course");
    expect(data.inLanguage).toBe("pt-BR");
  });
});

test.describe("Layout e identidade visual", () => {
  test("header, barra de status e footer na ordem correta", async ({ page }) => {
    await page.goto("/index.html");
    await expect(page.locator(".site-header")).toBeVisible();
    await expect(page.locator(".status-bar")).toBeVisible();
    await expect(page.locator(".site-footer")).toBeVisible();
    const order = await page.evaluate(() => {
      const header = document.querySelector(".site-header");
      const status = document.querySelector(".status-bar");
      const main = document.querySelector("main");
      return (
        header.compareDocumentPosition(status) & Node.DOCUMENT_POSITION_FOLLOWING &&
        status.compareDocumentPosition(main) & Node.DOCUMENT_POSITION_FOLLOWING
      );
    });
    expect(order).toBeTruthy();
  });

  test("barra de status exibe todas as variáveis", async ({ page }) => {
    await page.goto("/index.html");
    for (const label of STATUS_LABELS) {
      await expect(page.locator(".status-var dt", { hasText: label })).toBeVisible();
    }
    await expect(page.locator(".status-var")).toHaveCount(STATUS_LABELS.length);
    const fits = await page.locator(".status-bar").evaluate((el) => el.scrollWidth <= el.clientWidth + 1);
    expect(fits).toBeTruthy();
  });

  test("tipografia e tokens CSS3 estão ativos", async ({ page }) => {
    await page.goto("/index.html");
    const fonts = await page.evaluate(() => {
      const styles = getComputedStyle(document.body);
      const h1 = getComputedStyle(document.querySelector("h1"));
      return {
        body: styles.fontFamily,
        h1: h1.fontFamily,
        gold: styles.getPropertyValue("--gold").trim(),
        display: styles.getPropertyValue("--font-display"),
        grad: styles.getPropertyValue("--grad-aurora"),
      };
    });
    expect(fonts.body).toMatch(/Figtree/i);
    expect(fonts.h1).toMatch(/Fraunces/i);
    expect(fonts.gold).toBe("#e8c547");
    expect(fonts.display).toMatch(/Fraunces/i);
    expect(fonts.grad).toMatch(/linear-gradient/i);
  });

  test("favicon svg e ico estão ligados e respondem", async ({ page, request }) => {
    const svg = await request.get("/favicon.svg");
    const ico = await request.get("/favicon.ico");
    expect(svg.ok()).toBeTruthy();
    expect(ico.ok()).toBeTruthy();
    expect(svg.headers()["content-type"]).toMatch(/svg/i);
    await page.goto("/index.html");
    await expect(page.locator('link[rel="icon"][href="favicon.svg"]')).toHaveCount(1);
    await expect(page.locator('link[rel="icon"][href="favicon.ico"]')).toHaveCount(1);
    await expect(page.locator('link[rel="apple-touch-icon"]')).toHaveAttribute("href", "apple-touch-icon.png");
  });
});

test.describe("Usabilidade e UX", () => {
  test("skip link e rótulos de formulário", async ({ page }) => {
    await page.goto("/cadastro.html");
    await expect(page.locator(".skip-link")).toHaveAttribute("href", "#conteudo");
    await expect(page.getByLabel("Nome completo")).toBeVisible();
    await expect(page.getByLabel("E-mail")).toBeVisible();
    await expect(page.getByLabel("Senha", { exact: true })).toBeVisible();
    await expect(page.getByLabel("Objetivo")).toBeVisible();
    await expect(page.getByRole("button", { name: "Criar área do aluno" })).toBeVisible();
  });

  test("cadastro cria sessão e atualiza variáveis", async ({ page }) => {
    await matricular(page);
    await expect(page.locator("h1")).toContainText("Ada");
    await expect(page.locator(".status-var", { hasText: "Ada" }).first()).toBeVisible();
    await expect(page.locator(".status-var dd").filter({ hasText: "Construir interfaces" })).toBeVisible();
    await expect(page.locator(".progress-ring")).toBeVisible();
  });
});

test.describe("Funcionalidade da trilha", () => {
  test("sala de aula carrega vídeo e conclui aula", async ({ page }) => {
    await matricular(page, `sala-${Date.now()}`);
    await page.goto("/sala.html");
    await expect(page.locator("h1")).toContainText(/iniciante à conclusão/i);
    await expect(page.locator(".player-frame iframe")).toHaveAttribute("src", /youtube\.com\/embed/);
    await page.getByRole("button", { name: "Marcar aula como concluída" }).click();
    await expect(page.getByRole("button", { name: "Aula concluída" })).toBeDisabled();
    await expect(page.locator(".status-var dd").filter({ hasText: "1/8" }).first()).toBeVisible();
  });

  test("oficina corrige quiz e credita exercício", async ({ page }) => {
    await matricular(page, `ex-${Date.now()}`);
    await page.goto("/exercicios.html");
    await expect(page.locator("h1")).toContainText(/Exercícios/i);
    await page.getByRole("button", { name: "const nome = 'Ada'" }).click();
    await expect(page.locator("[data-quiz-feedback]")).toContainText(/const impede/i);
    await expect(page.locator(".status-var dd").filter({ hasText: "1/6" })).toBeVisible();
  });

  test("curva de aprendizado renderiza SVG com nós", async ({ page }) => {
    await matricular(page, `evo-${Date.now()}`);
    await page.goto("/evolucao.html");
    await expect(page.locator("h1")).toContainText(/curva/i);
    await expect(page.locator(".curve-svg")).toBeVisible();
    await expect(page.locator(".curve-svg .node")).toHaveCount(8);
  });
});

test.describe("Documentação", () => {
  test("sumário, artigo e busca por termo", async ({ page }) => {
    await page.goto("/docs.html");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/léxico/i);
    await expect(page.getByLabel("Buscar na documentação")).toBeVisible();
    await expect(page.locator("[data-docs-toc] a")).toHaveCount(13);
    await expect(page.locator("[data-docs-stage] h2")).toBeVisible();
    await expect(page.locator(".doc-code code").first()).toBeVisible();
    await page.getByLabel("Buscar na documentação").fill("event loop");
    await expect(page.locator("[data-docs-count]")).toContainText(/1 de 13/);
    await expect(page.locator("[data-docs-stage] h2")).toHaveText(/Event loop/i);
  });
});

test.describe("Responsividade", () => {
  test("home não transborda em 375px", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/index.html");
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(8);
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator(".status-bar")).toBeVisible();
    const barFits = await page.locator(".status-bar").evaluate((el) => el.scrollWidth <= el.clientWidth + 1);
    expect(barFits).toBeTruthy();
  });

  test("cadastro empilha colunas no mobile", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/cadastro.html");
    const columns = await page.locator(".form-shell").evaluate((el) => getComputedStyle(el).gridTemplateColumns);
    expect(columns.split(" ").length).toBe(1);
  });
});
