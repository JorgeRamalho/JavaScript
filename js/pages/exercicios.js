import { currentUser, completeExercise, initShell, requireAuth, EXERCISES, TRACKS } from "../core/app.js";

const user = requireAuth();
if (!user) throw new Error("auth");
initShell("exercicios");

const list = document.querySelector("[data-exercise-list]");
const stage = document.querySelector("[data-stage]");
let current = EXERCISES[0];

function isDone(id) {
  return currentUser().exerciciosConcluidos.includes(id);
}

function renderList() {
  list.innerHTML = EXERCISES.map((exercise) => {
    const track = TRACKS.find((item) => item.id === exercise.track);
    return `
      <button class="quiz-option" type="button" data-ex="${exercise.id}" aria-current="${exercise.id === current.id}">
        <span class="track-chip track-${track.cor}">${track.nome}</span>
        <strong>${exercise.titulo}</strong>
        <span class="legend">${isDone(exercise.id) ? "Concluído" : exercise.tipo === "quiz" ? "Questão" : "Código"}</span>
      </button>
    `;
  }).join("");
  list.querySelectorAll("[data-ex]").forEach((button) => {
    button.addEventListener("click", () => {
      current = EXERCISES.find((item) => item.id === button.dataset.ex);
      paint();
    });
  });
}

function same(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

async function runCode(source) {
  const name = current.starter.match(/function\s+(\w+)/)[1];
  const fn = new Function(`${source}\n; return ${name};`)();
  const results = [];
  for (const teste of current.testes) {
    const raw = fn(...teste.args);
    const value = teste.async ? await raw : raw;
    results.push({ ok: same(value, teste.esperado), value, esperado: teste.esperado });
  }
  return results;
}

function paint() {
  renderList();
  const done = isDone(current.id);
  if (current.tipo === "quiz") {
    stage.innerHTML = `
      <p class="eyebrow">${done ? "Resolvido" : "Questão objetiva"}</p>
      <h2>${current.titulo}</h2>
      <p>${current.enunciado}</p>
      <div data-options></div>
      <p class="form-feedback" data-quiz-feedback ${done ? 'data-state="ok"' : ""}>${done ? current.explicacao : ""}</p>
    `;
    const box = stage.querySelector("[data-options]");
    current.opcoes.forEach((opcao, index) => {
      const button = document.createElement("button");
      button.className = "quiz-option";
      button.type = "button";
      button.textContent = opcao;
      button.disabled = done;
      if (done && index === current.correta) button.classList.add("is-right");
      button.addEventListener("click", () => {
        const ok = index === current.correta;
        button.classList.add(ok ? "is-right" : "is-wrong");
        stage.querySelector("[data-quiz-feedback]").dataset.state = ok ? "ok" : "error";
        stage.querySelector("[data-quiz-feedback]").textContent = ok
          ? current.explicacao
          : "Ainda não. Releia o enunciado e tente de novo.";
        if (ok) {
          completeExercise(current.id);
          paint();
        }
      });
      box.append(button);
    });
    return;
  }

  stage.innerHTML = `
    <p class="eyebrow">${done ? "Resolvido" : "Atividade de código"}</p>
    <h2>${current.titulo}</h2>
    <p>${current.enunciado}</p>
    <label class="field">
      <span>Editor JavaScript</span>
      <textarea class="editor" id="editor" spellcheck="false">${current.starter}</textarea>
    </label>
    <div class="cta-row">
      <button class="btn btn-gold" type="button" data-run ${done ? "disabled" : ""}>Corrigir atividade</button>
    </div>
    <p class="form-feedback" data-code-feedback></p>
  `;
  stage.querySelector("[data-run]")?.addEventListener("click", async () => {
    const feedback = stage.querySelector("[data-code-feedback]");
    try {
      const results = await runCode(document.querySelector("#editor").value);
      const failed = results.filter((item) => !item.ok);
      if (failed.length) {
        feedback.dataset.state = "error";
        feedback.textContent = `Falhou ${failed.length} teste(s). Último retorno: ${JSON.stringify(failed[0].value)} · esperado ${JSON.stringify(failed[0].esperado)}`;
        return;
      }
      completeExercise(current.id);
      feedback.dataset.state = "ok";
      feedback.textContent = "Todos os testes passaram. XP creditado na barra de status.";
      paint();
    } catch (error) {
      feedback.dataset.state = "error";
      feedback.textContent = `Erro de execução: ${error.message}`;
    }
  });
}

paint();
