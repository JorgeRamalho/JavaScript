import { createStudent, currentUser, EXERCISES, hashPassword, initShell, LESSONS, login, saveUser, TRACKS, users } from "../core/app.js";
import { exerciciosUrl, ROUTES } from "../core/routes.js";

initShell("inicio");

const ORBITS = [
  { badge: "01", verb: "Fundar", trackId: "iniciante" },
  { badge: "02", verb: "Encadear", trackId: "intermediario" },
  { badge: "03", verb: "Modelar", trackId: "avancado", tone: "gold" },
  { badge: "04", verb: "Concluir", trackId: "conclusao", tone: "mint" },
];

const board = document.querySelector("[data-orbit-board]");
if (board) {
  board.innerHTML = ORBITS.map((orbit) => {
    const track = TRACKS.find((item) => item.id === orbit.trackId);
    const aulas = LESSONS.filter((lesson) => lesson.track === orbit.trackId);
    const tone = orbit.tone ? ` badge-${orbit.tone}` : "";
    return `
      <article class="orbit-card orbit-${orbit.trackId}">
        <span class="badge${tone}">${orbit.badge}</span>
        <strong>${orbit.verb}</strong>
        <p>${track?.lema ?? ""} · ${aulas.length} ${aulas.length === 1 ? "aula" : "aulas"}</p>
      </article>
    `;
  }).join("");
}

const primary = document.querySelector("[data-cta-primary]");
if (primary && currentUser()) {
  primary.href = ROUTES.aluno;
  primary.textContent = "Continuar na área do aluno";
}

const LAB_TRACKS = [
  {
    trackId: "iniciante",
    nivel: "Nível 01",
    resumo: "console.log, tipos, const/let, arrays e o primeiro script.",
  },
  {
    trackId: "intermediario",
    nivel: "Nível 02",
    resumo: "Funções, DOM, eventos e o fluxo com if/else.",
  },
  {
    trackId: "avancado",
    nivel: "Nível 03",
    resumo: "Laços, microtasks, Promises e o ritmo do runtime.",
  },
  {
    trackId: "conclusao",
    nivel: "Ateliê",
    resumo: "Algoritmos, palíndromo e o ofício depois da trilha.",
  },
];

const labTracks = document.querySelector("[data-lab-tracks]");
if (labTracks) {
  labTracks.innerHTML = LAB_TRACKS.map((item) => {
    const track = TRACKS.find((entry) => entry.id === item.trackId);
    const atividades = EXERCISES.filter((exercise) => exercise.track === item.trackId);
    const count = atividades.length;
    return `
      <article class="lab-card lab-card-${item.trackId}">
        <span class="lab-pill">${item.nivel}</span>
        <h3>${track?.nome ?? item.trackId}</h3>
        <p>${item.resumo}</p>
        <div class="lab-card-foot">
          <span>${count} ${count === 1 ? "atividade" : "atividades"}</span>
          <a href="${exerciciosUrl({ trilha: item.trackId })}">Entrar no bloco →</a>
        </div>
      </article>
    `;
  }).join("");
}

const spotlight = document.querySelector("[data-lab-spotlight]");
if (spotlight) {
  const featured = LAB_TRACKS.map((item) =>
    EXERCISES.find((exercise) => exercise.track === item.trackId)
  ).filter(Boolean);
  spotlight.innerHTML = featured
    .map(
      (exercise) => `
        <a class="lab-spot lab-spot-${exercise.track}" href="${exerciciosUrl({ ex: exercise.id })}">
          <code>${exercise.snippet}</code>
          <em>${exercise.destaque}</em>
        </a>
      `
    )
    .join("");
}

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

function inspectValue(value) {
  if (value === undefined) return "undefined";
  if (typeof value === "function") return value.toString();
  if (typeof value === "symbol") return value.toString();
  try {
    const json = JSON.stringify(value);
    return json ?? String(value);
  } catch {
    return String(value);
  }
}

async function runSnippet(code) {
  const prints = [];
  const fakeConsole = {
    log: (...args) => prints.push(args.map(inspectValue).join(" ")),
    info: (...args) => prints.push(args.map(inspectValue).join(" ")),
    warn: (...args) => prints.push(args.map(inspectValue).join(" ")),
    error: (...args) => prints.push(args.map(inspectValue).join(" ")),
  };
  try {
    let result;
    try {
      result = await new Function("console", `"use strict"; return (async () => (${code}))();`)(fakeConsole);
    } catch {
      result = await new Function("console", `"use strict"; return (async () => { ${code} })();`)(fakeConsole);
    }
    return { prints, result, error: null };
  } catch (error) {
    return { prints, result: undefined, error: error instanceof Error ? error.message : String(error) };
  }
}

function initPlayConsole() {
  const log = document.querySelector("[data-console-log]");
  const form = document.querySelector("[data-console-form]");
  const input = document.querySelector("[data-console-input]");
  const clear = document.querySelector("[data-console-clear]");
  if (!log || !form || !input) return;

  const history = [];
  let cursor = 0;

  function append(kind, text) {
    const line = document.createElement("span");
    line.className = kind;
    line.textContent = text;
    log.append(document.createTextNode(log.childNodes.length ? "\n" : ""));
    log.append(line);
    log.scrollTop = log.scrollHeight;
  }

  append("is-tip", "Console do Códice. Digite um comando e pressione Enter.");
  append("is-tip", "Dica: comece com typeof 'Códice' ou clique num exemplo ao lado.");

  async function execute(raw) {
    const code = raw.trim();
    if (!code) return;
    history.push(code);
    cursor = history.length;
    append("is-in", `› ${code}`);
    if (code === "clear" || code === "cls") {
      log.replaceChildren();
      append("is-tip", "Tela limpa. Pode continuar.");
      return;
    }
    if (code === "help") {
      append("is-tip", "Escreva expressões: 2 + 2, typeof 3, [1,2,3].length");
      append("is-tip", "clear limpa a tela. Seta ↑ recupera o comando anterior.");
      return;
    }
    const outcome = await runSnippet(code);
    for (const print of outcome.prints) append("is-print", `log ${print}`);
    if (outcome.error) {
      append("is-err", `erro ${outcome.error}`);
      return;
    }
    append("is-out", `← ${inspectValue(outcome.result)}`);
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const code = input.value;
    input.value = "";
    await execute(code);
  });

  input.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (!history.length) return;
      cursor = Math.max(0, cursor - 1);
      input.value = history[cursor] ?? "";
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      cursor = Math.min(history.length, cursor + 1);
      input.value = history[cursor] ?? "";
    }
  });

  clear?.addEventListener("click", () => {
    log.replaceChildren();
    append("is-tip", "Tela limpa. Pode continuar.");
    input.focus();
  });

  document.querySelectorAll("[data-console-example]").forEach((button) => {
    button.addEventListener("click", async () => {
      input.value = button.dataset.consoleExample ?? "";
      input.focus();
      await execute(input.value);
      input.value = "";
    });
  });
}

initPlayConsole();

function ageFrom(isoDate) {
  const born = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(born.getTime())) return 0;
  const now = new Date();
  let age = now.getFullYear() - born.getFullYear();
  const month = now.getMonth() - born.getMonth();
  if (month < 0 || (month === 0 && now.getDate() < born.getDate())) age -= 1;
  return age;
}

function digitsOnly(value) {
  return String(value ?? "").replace(/\D/g, "");
}

const enrollForm = document.querySelector("#form-matricula");
const enrollFeedback = document.querySelector("#matricula-feedback");
const hoursInput = document.querySelector("[data-hours]");
const hoursOut = document.querySelector("[data-hours-out]");

if (hoursInput && hoursOut) {
  const paintHours = () => {
    hoursOut.textContent = `${hoursInput.value}h`;
  };
  hoursInput.addEventListener("input", paintHours);
  paintHours();
}

if (enrollForm && currentUser()) {
  enrollForm.querySelector("[data-enroll-submit]").disabled = true;
  if (enrollFeedback) {
    enrollFeedback.dataset.state = "ok";
    enrollFeedback.textContent = `Sessão ativa como ${currentUser().nome}. A matrícula já está aberta.`;
  }
}

enrollForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!enrollFeedback) return;
  const show = (state, message) => {
    enrollFeedback.dataset.state = state;
    enrollFeedback.textContent = message;
  };

  if (currentUser()) {
    show("ok", "Você já possui matrícula neste navegador.");
    return;
  }

  const data = Object.fromEntries(new FormData(enrollForm));
  const interesses = [...enrollForm.querySelectorAll('input[name="interesses"]:checked')].map((item) => item.value);
  const email = String(data.email).trim().toLowerCase();
  const emailConfirma = String(data.emailConfirma).trim().toLowerCase();
  const senha = String(data.senha);
  const foto = enrollForm.foto?.files?.[0];

  if (data.nome.trim().length < 3) {
    show("error", "Informe o nome completo.");
    return;
  }
  if (digitsOnly(data.cpf).length !== 11) {
    show("error", "Informe um CPF com 11 dígitos.");
    return;
  }
  if (ageFrom(data.nascimento) < 13) {
    show("error", "A matrícula não está disponível para menores de 13 anos.");
    return;
  }
  if (!email.includes("@") || email !== emailConfirma) {
    show("error", "Os e-mails não coincidem ou são inválidos.");
    return;
  }
  if (senha.length < 6 || senha !== String(data.confirma)) {
    show("error", "A senha precisa ter ao menos 6 caracteres e coincidir com a confirmação.");
    return;
  }
  if (digitsOnly(data.cep).length !== 8) {
    show("error", "Informe um CEP com 8 dígitos.");
    return;
  }
  if (!data.turno || !data.computador || !data.nodejs) {
    show("error", "Marque turno, computador e se já instalou o Node.js.");
    return;
  }
  if (!enrollForm.maioridade.checked || !enrollForm.termos.checked) {
    show("error", "Aceite a declaração de idade e o compromisso de estudo.");
    return;
  }
  if (users().some((user) => user.email === email)) {
    show("error", "Este e-mail já possui matrícula. Entre pela página de cadastro.");
    return;
  }

  const student = createStudent({
    nome: data.nomeSocial?.trim() || data.nome,
    email,
    objetivo: data.objetivo,
    nivelPartida: data.nivelPartida,
    passwordHash: await hashPassword(senha),
    perfil: {
      nomeRegistro: data.nome.trim(),
      nomeSocial: String(data.nomeSocial ?? "").trim(),
      cpf: digitsOnly(data.cpf),
      nascimento: data.nascimento,
      telefone: String(data.telefone).trim(),
      cep: digitsOnly(data.cep),
      logradouro: data.logradouro.trim(),
      numero: String(data.numero).trim(),
      complemento: String(data.complemento ?? "").trim(),
      bairro: data.bairro.trim(),
      cidade: data.cidade.trim(),
      uf: data.uf,
      escolaridade: data.escolaridade,
      ocupacao: data.ocupacao,
      origem: data.origem,
      horasSemana: Number(data.horasSemana),
      turno: data.turno,
      computador: data.computador,
      nodejs: data.nodejs,
      interesses,
      portfolio: String(data.portfolio ?? "").trim(),
      motivacao: String(data.motivacao).trim(),
      acessibilidade: String(data.acessibilidade ?? "").trim(),
      newsletter: Boolean(data.newsletter),
      foto: foto ? foto.name : "",
    },
  });
  saveUser(student);
  login(email);
  show("ok", "Matrícula criada. Abrindo a área do aluno…");
  location.href = ROUTES.aluno;
});
