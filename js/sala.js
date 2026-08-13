import {
  currentUser,
  completeLesson,
  initShell,
  requireAuth,
  TRACKS,
  LESSONS,
} from "./app.js";
import { lessonById, lessonsByTrack, nextLesson, prevLesson } from "./curriculum.js";

const user = requireAuth();
if (!user) throw new Error("auth");
initShell("sala");

const params = new URLSearchParams(location.search);
let current = lessonById(params.get("aula") || user.aulaAtual);

function renderSyllabus() {
  const host = document.querySelector("[data-syllabus]");
  host.innerHTML = TRACKS.map((track) => {
    const aulas = lessonsByTrack(track.id);
    return `
      <details ${track.id === current.track ? "open" : ""}>
        <summary>${track.nome} <span class="legend">— ${track.lema}</span></summary>
        ${aulas
          .map((aula) => {
            const done = user.aulasConcluidas.includes(aula.id);
            return `<button class="lesson-btn ${done ? "is-done" : ""}" type="button" data-aula="${aula.id}" aria-current="${aula.id === current.id}">${aula.ordem}. ${aula.titulo}</button>`;
          })
          .join("")}
      </details>
    `;
  }).join("");
  host.querySelectorAll("[data-aula]").forEach((button) => {
    button.addEventListener("click", () => {
      current = lessonById(button.dataset.aula);
      history.replaceState({}, "", `sala.html?aula=${current.id}`);
      paint();
    });
  });
}

function paint() {
  document.querySelector("[data-player]").innerHTML = `
    <iframe
      src="https://www.youtube.com/embed/${current.videoId}"
      title="${current.titulo}"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
      loading="lazy"
    ></iframe>
  `;
  document.querySelector("[data-lesson-title]").textContent = current.titulo;
  document.querySelector("[data-lesson-track]").textContent = TRACKS.find((t) => t.id === current.track).nome;
  document.querySelector("[data-lesson-time]").textContent = current.duracao;
  document.querySelector("[data-lesson-summary]").textContent = current.resumo;
  document.querySelector("[data-lesson-notes]").textContent = current.notas;
  const done = currentUser().aulasConcluidas.includes(current.id);
  const mark = document.querySelector("[data-complete]");
  mark.disabled = done;
  mark.textContent = done ? "Aula concluída" : "Marcar aula como concluída";
  renderSyllabus();
}

document.querySelector("[data-complete]").addEventListener("click", () => {
  completeLesson(current.id);
  paint();
});

document.querySelector("[data-prev]").addEventListener("click", () => {
  current = prevLesson(current.id);
  history.replaceState({}, "", `sala.html?aula=${current.id}`);
  paint();
});

document.querySelector("[data-next]").addEventListener("click", () => {
  current = nextLesson(current.id);
  history.replaceState({}, "", `sala.html?aula=${current.id}`);
  paint();
});

paint();
