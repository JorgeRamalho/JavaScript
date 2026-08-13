import { initShell, TRACKS } from "./app.js";
import { lessonById } from "./curriculum.js";
import { DOCS } from "./docs-data.js";

initShell("docs");

const toc = document.querySelector("[data-docs-toc]");
const stage = document.querySelector("[data-docs-stage]");
const search = document.querySelector("#docs-busca");
const count = document.querySelector("[data-docs-count]");

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function haystack(doc) {
  const blocos = doc.blocos
    .map((bloco) => [bloco.texto, bloco.codigo, bloco.caption, ...(bloco.itens ?? [])].filter(Boolean).join(" "))
    .join(" ");
  return `${doc.titulo} ${doc.resumo} ${doc.tags.join(" ")} ${blocos}`.toLowerCase();
}

function matches(doc, query) {
  if (!query) return true;
  return haystack(doc).includes(query.trim().toLowerCase());
}

function renderBloco(bloco) {
  if (bloco.tipo === "p") return `<p>${escapeHtml(bloco.texto)}</p>`;
  if (bloco.tipo === "h3") return `<h3>${escapeHtml(bloco.texto)}</h3>`;
  if (bloco.tipo === "nota") {
    return `<aside class="doc-callout"><p class="eyebrow">Nota do Códice</p><p>${escapeHtml(bloco.texto)}</p></aside>`;
  }
  if (bloco.tipo === "lista") {
    return `<ul class="doc-list">${bloco.itens.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
  }
  if (bloco.tipo === "code") {
    return `
      <figure class="doc-code">
        <figcaption>
          <span>${escapeHtml(bloco.caption)}</span>
          <button class="btn btn-ghost" type="button" data-copy>Copiar</button>
        </figcaption>
        <pre><code>${escapeHtml(bloco.codigo)}</code></pre>
      </figure>
    `;
  }
  return "";
}

function currentId(filtered) {
  const hash = location.hash.replace("#", "");
  if (filtered.some((doc) => doc.id === hash)) return hash;
  return filtered[0]?.id ?? DOCS[0].id;
}

function render() {
  const query = search.value;
  const filtered = DOCS.filter((doc) => matches(doc, query));
  count.textContent = `${filtered.length} de ${DOCS.length} verbetes`;

  if (!filtered.length) {
    toc.innerHTML = "";
    stage.innerHTML = `<p class="lede">Nenhum verbete casa com “${escapeHtml(query)}”.</p>`;
    return;
  }

  const activeId = currentId(filtered);

  toc.innerHTML = TRACKS.map((track) => {
    const docs = filtered.filter((doc) => doc.track === track.id);
    if (!docs.length) return "";
    return `
      <details open>
        <summary>${track.nome}</summary>
        ${docs
          .map(
            (doc) =>
              `<a href="#${doc.id}" class="lesson-btn" aria-current="${doc.id === activeId}">${doc.titulo}</a>`
          )
          .join("")}
      </details>
    `;
  }).join("");

  const doc = DOCS.find((item) => item.id === activeId) ?? filtered[0];
  if (!doc) {
    stage.innerHTML = `<p class="lede">Nenhum verbete casa com “${escapeHtml(query)}”.</p>`;
    return;
  }

  const aula = lessonById(doc.aulaId);
  const track = TRACKS.find((item) => item.id === doc.track);
  stage.innerHTML = `
    <p class="eyebrow">${doc.kicker}</p>
    <div class="lesson-meta">
      <span class="track-chip track-${track.cor}">${track.nome}</span>
      <span class="legend">${doc.tags.map((tag) => `#${tag}`).join(" ")}</span>
    </div>
    <h2 id="${doc.id}">${escapeHtml(doc.titulo)}</h2>
    <p class="lede">${escapeHtml(doc.resumo)}</p>
    ${doc.blocos.map(renderBloco).join("")}
    <p class="doc-related">
      Aula ligada:
      <a href="sala.html?aula=${aula.id}">${escapeHtml(aula.titulo)}</a>
    </p>
  `;

  stage.querySelectorAll("[data-copy]").forEach((button) => {
    button.addEventListener("click", async () => {
      const code = button.closest("figure").querySelector("code").textContent;
      await navigator.clipboard.writeText(code);
      button.textContent = "Copiado";
      setTimeout(() => {
        button.textContent = "Copiar";
      }, 1400);
    });
  });
}

search.addEventListener("input", () => {
  history.replaceState({}, "", "docs.html");
  render();
});

window.addEventListener("hashchange", render);
render();
