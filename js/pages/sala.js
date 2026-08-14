import {
  currentUser,
  completeLesson,
  initShell,
  requireAuth,
  TRACKS,
  LESSONS,
} from "../core/app.js";
import { lessonById, nextLesson, prevLesson } from "../data/curriculum.js";
import { salaUrl, youtubeEmbedUrl } from "../core/routes.js";

initShell("sala");

const params = new URLSearchParams(location.search);
let current = lessonById(params.get("aula") || currentUser()?.aulaAtual);

function pad(ordem) {
  return String(ordem).padStart(2, "0");
}

function concludedIds() {
  return currentUser()?.aulasConcluidas ?? [];
}

function renderSyllabus() {
  const host = document.querySelector("[data-syllabus]");
  const doneIds = concludedIds();
  host.innerHTML = LESSONS.map((aula) => {
    const track = TRACKS.find((item) => item.id === aula.track);
    const done = doneIds.includes(aula.id);
    const active = aula.id === current.id;
    return `
      <button
        class="lesson-card ${done ? "is-done" : ""} ${active ? "is-current" : ""}"
        type="button"
        data-aula="${aula.id}"
        aria-current="${active ? "true" : "false"}"
      >
        <span class="lesson-num">${pad(aula.ordem)}</span>
        <span class="lesson-copy">
          <span class="lesson-title">${aula.titulo}</span>
          <span class="legend">${track.nome} · ${aula.duracao}</span>
        </span>
        <span class="lesson-mark" aria-hidden="true"></span>
      </button>
    `;
  }).join("");
  host.querySelectorAll("[data-aula]").forEach((button) => {
    button.addEventListener("click", () => {
      current = lessonById(button.dataset.aula);
      history.replaceState({}, "", salaUrl(current.id));
      paint();
    });
  });
}

function paint() {
  const track = TRACKS.find((item) => item.id === current.track);
  const done = concludedIds().includes(current.id);
  document.querySelector("[data-player]").innerHTML = `
    <iframe
      src="${youtubeEmbedUrl(current.videoId)}"
      title="${current.titulo}"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
      loading="lazy"
    ></iframe>
  `;
  document.querySelector("[data-lesson-kicker]").textContent = `${track.nome} — ${track.lema}`;
  document.querySelector("[data-lesson-title]").textContent = current.titulo;
  document.querySelector("[data-lesson-meta]").textContent = `${current.duracao} · aula ${current.ordem} de ${LESSONS.length}`;
  document.querySelector("[data-lesson-summary]").textContent = current.resumo;
  document.querySelector("[data-lesson-notes]").textContent = current.notas;
  const mark = document.querySelector("[data-complete]");
  mark.disabled = done;
  mark.textContent = done ? "Aula concluída" : "Marcar como concluída";
  renderSyllabus();
}

document.querySelector("[data-complete]").addEventListener("click", () => {
  if (!currentUser()) {
    history.replaceState({}, "", salaUrl(current.id));
    requireAuth();
    return;
  }
  completeLesson(current.id);
  paint();
});

document.querySelector("[data-prev]").addEventListener("click", () => {
  current = prevLesson(current.id);
  history.replaceState({}, "", salaUrl(current.id));
  paint();
});

document.querySelector("[data-next]").addEventListener("click", () => {
  current = nextLesson(current.id);
  history.replaceState({}, "", salaUrl(current.id));
  paint();
});

paint();
