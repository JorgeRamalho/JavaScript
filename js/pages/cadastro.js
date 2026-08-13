import { currentUser, createStudent, hashPassword, login, saveUser, users, initShell } from "../core/app.js";
import { ROUTES } from "../core/routes.js";

const params = new URLSearchParams(location.search);
const modoEntrar = params.get("modo") === "entrar";

initShell("cadastro");

const form = document.querySelector("#form-cadastro");
const feedback = document.querySelector("#form-feedback");
const toggle = document.querySelector("[data-toggle-modo]");
const title = document.querySelector("[data-form-title]");
const submit = document.querySelector("[data-submit]");
const extraFields = document.querySelectorAll("[data-only-cadastro]");

function setModo(entrar) {
  document.body.dataset.modo = entrar ? "entrar" : "cadastro";
  title.textContent = entrar ? "Retomar a sessão" : "Abrir matrícula no Códice";
  submit.textContent = entrar ? "Entrar" : "Criar área do aluno";
  toggle.textContent = entrar ? "Ainda não tenho cadastro" : "Já tenho cadastro";
  extraFields.forEach((field) => {
    field.hidden = entrar;
    field.querySelectorAll("input, select").forEach((input) => {
      input.required = !entrar && input.dataset.required === "true";
      if (entrar) input.required = false;
    });
  });
}

setModo(modoEntrar);
toggle.addEventListener("click", () => {
  setModo(document.body.dataset.modo !== "entrar");
});

function show(state, message) {
  feedback.dataset.state = state;
  feedback.textContent = message;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  const email = String(data.email).trim().toLowerCase();
  const senha = String(data.senha);
  const entrar = document.body.dataset.modo === "entrar";

  if (!email.includes("@") || senha.length < 6) {
    show("error", "Informe um e-mail válido e uma senha com ao menos 6 caracteres.");
    return;
  }

  const passwordHash = await hashPassword(senha);
  const existing = users().find((user) => user.email === email);

  if (entrar) {
    if (!existing || existing.passwordHash !== passwordHash) {
      show("error", "E-mail ou senha não conferem.");
      return;
    }
    login(email);
    location.href = params.get("next") || ROUTES.aluno;
    return;
  }

  if (existing) {
    show("error", "Este e-mail já possui matrícula. Entre com a senha.");
    return;
  }

  if (senha !== String(data.confirma)) {
    show("error", "A confirmação de senha não coincide.");
    return;
  }

  if (!form.termos.checked) {
    show("error", "Aceite o compromisso de estudo para abrir a área do aluno.");
    return;
  }

  const student = createStudent({
    nome: data.nome,
    email,
    objetivo: data.objetivo,
    nivelPartida: data.nivelPartida,
    passwordHash,
  });
  saveUser(student);
  login(email);
  show("ok", "Matrícula criada. Abrindo a área do aluno…");
  location.href = ROUTES.aluno;
});

if (currentUser() && !modoEntrar) {
  show("ok", `Sessão ativa como ${currentUser().nome}. Você pode ir à área do aluno.`);
}
