import { currentUser, derived, initShell, requireAuth, TRACKS, LESSONS, EXERCISES } from "./app.js";
import { lessonsByTrack } from "./curriculum.js";

const user = requireAuth();
if (!user) throw new Error("auth");

initShell("aluno");
const stats = derived(user);

document.querySelector("[data-greet]").textContent = `Olá, ${user.nome.split(" ")[0]}.`;
document.querySelector("[data-objetivo]").textContent = user.objetivo;
document.querySelector("[data-continue-title]").textContent = stats.aulaAtual.titulo;
document.querySelector("[data-continue-track]").textContent = stats.trilha;
document.querySelector("[data-continue-link]").href = `sala.html?aula=${stats.aulaAtual.id}`;
document.querySelector("[data-ring]").style.setProperty("--p", String(stats.progresso));
document.querySelector("[data-ring-label]").textContent = `${stats.progresso}%`;

const tracksHost = document.querySelector("[data-tracks]");
tracksHost.innerHTML = TRACKS.map((track) => {
  const aulas = lessonsByTrack(track.id);
  const feitas = aulas.filter((aula) => user.aulasConcluidas.includes(aula.id)).length;
  return `
    <article class="card">
      <span class="track-chip track-${track.cor}">${track.nome}</span>
      <h3>${track.lema}</h3>
      <p>${feitas} de ${aulas.length} aulas concluídas nesta trilha.</p>
      <p class="legend">${aulas.map((aula) => aula.titulo).join(" · ")}</p>
    </article>
  `;
}).join("");

const feed = document.querySelector("[data-feed]");
const recentLessons = [...user.aulasConcluidas].reverse().slice(0, 4);
const recentExercises = [...user.exerciciosConcluidos].reverse().slice(0, 3);
feed.innerHTML =
  recentLessons.length === 0 && recentExercises.length === 0
    ? `<article class="card"><h3>Nenhuma atividade ainda</h3><p>Entre na sala de aula e marque a primeira lição. A curva de aprendizado nasce desse gesto.</p></article>`
    : [
        ...recentLessons.map((id) => {
          const lesson = LESSONS.find((item) => item.id === id);
          return `<article class="card activity-item"><span class="track-chip track-${lesson.track}">Aula</span><div><h3>${lesson.titulo}</h3><p class="legend">Concluída na trilha ${lesson.track}</p></div></article>`;
        }),
        ...recentExercises.map((id) => {
          const exercise = EXERCISES.find((item) => item.id === id);
          return `<article class="card activity-item"><span class="track-chip track-conclusao">Oficina</span><div><h3>${exercise.titulo}</h3><p class="legend">${exercise.enunciado}</p></div></article>`;
        }),
      ].join("");
