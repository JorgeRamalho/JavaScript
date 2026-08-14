import { initShell, TRACKS, LESSONS } from "../core/app.js";

initShell("inicio");

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

const CODE_REEL = [
  { code: `typeof "Códice"`, out: `"string"` },
  { code: `const xp = 50`, out: `undefined` },
  { code: `xp + 40`, out: `90` },
  { code: `"JavaScript".slice(4)`, out: `"Script"` },
  { code: `[1, 2, 3].map((n) => n * 2)`, out: `[2, 4, 6]` },
  { code: `[4, 11, 8].filter((n) => n >= 10)`, out: `[11]` },
  { code: `[1, 2, 3, 4].reduce((a, n) => a + n, 0)`, out: `10` },
  { code: `Object.keys({ aula: 1, ok: true })`, out: `["aula", "ok"]` },
  { code: `Math.max(3, 18, 7)`, out: `18` },
  { code: `Boolean("")`, out: `false` },
  { code: `"sala de aula".includes("aula")`, out: `true` },
  { code: `const dobro = (n) => n * 2`, out: `undefined` },
  { code: `dobro(8)`, out: `16` },
  { code: `JSON.stringify({ trilha: "DOM" })`, out: `'{"trilha":"DOM"}'` },
  { code: `await Promise.resolve(2 + 2)`, out: `4` },
];

function escapeHtml(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function formatLines(items, cursor = "") {
  const body = items
    .map((line) => {
      if (line.startsWith("›")) return `<span class="is-in">${escapeHtml(line)}</span>`;
      if (line.startsWith("←")) return `<span class="is-out">${escapeHtml(line)}</span>`;
      return escapeHtml(line);
    })
    .join("\n");
  return `${body}${cursor ? `<span class="is-cursor">${cursor}</span>` : ""}`;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function playCodeScreen() {
  const host = document.querySelector("[data-code-reel]");
  if (!host) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const lines = [];

  function paint(cursor = "") {
    host.innerHTML = formatLines(lines, cursor);
    host.scrollTop = host.scrollHeight;
  }

  if (reduce) {
    host.innerHTML = formatLines(CODE_REEL.flatMap((item) => [`› ${item.code}`, `← ${item.out}`, ""]));
    return;
  }

  let index = 0;
  while (document.contains(host)) {
    if (document.hidden) {
      await sleep(400);
      continue;
    }
    const item = CODE_REEL[index % CODE_REEL.length];
    let typed = "";
    lines.push("");
    for (const char of `› ${item.code}`) {
      typed += char;
      lines[lines.length - 1] = typed;
      paint("▍");
      await sleep(28);
    }
    await sleep(220);
    lines.push(`← ${item.out}`);
    paint();
    await sleep(700);
    if (lines.length > 16) lines.splice(0, 2);
    index += 1;
  }
}

playCodeScreen();
