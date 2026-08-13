import { currentUser, derived, initShell, requireAuth, TRACKS, LESSONS, EXERCISES } from "./app.js";

const user = requireAuth();
if (!user) throw new Error("auth");

initShell("evolucao");
const stats = derived(user);

const points = [
  [60, 310],
  [200, 250],
  [340, 180],
  [500, 210],
  [640, 120],
  [780, 150],
  [920, 90],
  [1060, 70],
];

const d = `M ${points[0].join(" ")} C 120 300, 150 270, ${points[1].join(" ")}
  S 280 200, ${points[2].join(" ")}
  S 430 220, ${points[3].join(" ")}
  S 580 140, ${points[4].join(" ")}
  S 720 160, ${points[5].join(" ")}
  S 860 80, ${points[6].join(" ")}
  S 1000 60, ${points[7].join(" ")}`;

const doneRatio = stats.aulasCount / LESSONS.length;
const offset = Math.round(1400 * (1 - doneRatio));

document.querySelector("[data-curve]").innerHTML = `
  <svg class="curve-svg" viewBox="0 0 1120 380" role="img" aria-labelledby="curveTitle curveDesc">
    <title id="curveTitle">Curva de aprendizado do Códice JS</title>
    <desc id="curveDesc">Linha do iniciante à conclusão com ${stats.aulasCount} aulas concluídas.</desc>
    <defs>
      <linearGradient id="goldFlow" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#e8c547" />
        <stop offset="45%" stop-color="#ff7a3c" />
        <stop offset="100%" stop-color="#3ee0a0" />
      </linearGradient>
    </defs>
    <path class="rail" d="${d}" />
    <path class="flow" d="${d}" style="--curve-offset:${offset}" />
    ${LESSONS.map((lesson, index) => {
      const [x, y] = points[index];
      const done = user.aulasConcluidas.includes(lesson.id);
      return `
        <a class="node" href="sala.html?aula=${lesson.id}">
          <circle cx="${x}" cy="${y}" r="${done ? 14 : 10}" fill="${done ? "#3ee0a0" : "#181822"}" />
          <text x="${x}" y="${y + 32}" text-anchor="middle">${index + 1}. ${lesson.titulo.split(":")[0].slice(0, 18)}</text>
        </a>
      `;
    }).join("")}
  </svg>
`;

document.querySelector("[data-evo-stats]").innerHTML = `
  <article class="card"><p class="eyebrow">Nível</p><h3>${stats.nivel}</h3><p class="legend">${stats.xpNoNivel} / ${stats.xpProximo} XP neste patamar</p></article>
  <article class="card"><p class="eyebrow">Cobertura</p><h3>${stats.progresso}%</h3><p class="legend">${stats.aulas} aulas · ${stats.exercicios} exercícios</p></article>
  <article class="card"><p class="eyebrow">Liga</p><h3>${stats.liga}</h3><p class="legend">Sequência de ${stats.streak} dia(s) · ${stats.conquistas} conquistas</p></article>
  <article class="card"><p class="eyebrow">Trilha vigente</p><h3>${stats.trilha}</h3><p class="legend">${stats.modulo}</p></article>
`;

document.querySelector("[data-tracks-legend]").innerHTML = TRACKS.map((track) => {
  const aulas = LESSONS.filter((lesson) => lesson.track === track.id);
  const feitas = aulas.filter((aula) => user.aulasConcluidas.includes(aula.id)).length;
  const exs = EXERCISES.filter((item) => item.track === track.id);
  const exFeitos = exs.filter((item) => user.exerciciosConcluidos.includes(item.id)).length;
  return `
    <article class="card">
      <span class="track-chip track-${track.cor}">${track.nome}</span>
      <h3>${track.lema}</h3>
      <p>Aulas ${feitas}/${aulas.length} · Oficina ${exFeitos}/${exs.length}</p>
    </article>
  `;
}).join("");
