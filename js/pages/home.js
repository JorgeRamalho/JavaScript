import { initShell, currentUser, TRACKS, LESSONS } from "../core/app.js";
import { ROUTES } from "../core/routes.js";

initShell("inicio");

document.querySelector("[data-cta-primary]").href = currentUser() ? ROUTES.aluno : ROUTES.cadastro;
document.querySelector("[data-cta-primary]").textContent = currentUser()
  ? "Continuar na área do aluno"
  : "Abrir matrícula";

document.querySelector("[data-home-tracks]").innerHTML = TRACKS.map((track) => {
  const aulas = LESSONS.filter((lesson) => lesson.track === track.id);
  return `
    <article class="card">
      <span class="track-chip track-${track.cor}">${track.nome}</span>
      <h3>${track.lema}</h3>
      <p>${aulas.length} ${aulas.length === 1 ? "aula" : "aulas"} em vídeo, da primeira escuta à prática na oficina.</p>
      <p class="legend">${aulas.map((aula) => aula.titulo).join(" · ")}</p>
    </article>
  `;
}).join("");
